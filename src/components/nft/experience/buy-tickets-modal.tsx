import { showErrorToast, showSuccessToast } from "@/components/toast";
import { CURRENCY_ETHER } from "@/constants/env";
import { __ } from "@/helpers/common";
import { ERC20Contract } from "@/hooks/contract/erc20";
import { ExperienceContract } from "@/hooks/contract/nft/experience-contract";
import { useApiTokens } from "@/hooks/moralis";
import { useExperienceInstanceApi } from "@/hooks/useApi";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import {
  isCorrectNetwork,
  isSameNetwork,
  isWalletConnected,
} from "@/modules/utils";
import { EventReq } from "@/types/EventReq";
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { HttpStatusCode } from "axios";
import { Field, Form, Formik, useFormik } from "formik";
import { useContext, useState } from "react";
import { waitForTransaction } from "wagmi/actions";
import * as Yup from "yup";
import { useTransactionApi } from "@/hooks/useApi";
import { TransactionType } from "@/hooks/types/contracts/events";

export default function BuyTickets({
  product,
  isDisabled,
  experienceInstance,
  fetchData,
  remainningTickets,
}: any) {
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: onModalClose,
  } = useDisclosure();

  const { address, isConnected, chain, fetchBalance, switchNetwork } =
    useContext(WalletConnectContext);

  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const { ApproveTokens } = ERC20Contract();
  const { getAllowance } = useApiTokens();
  const { buyTicketsExperienceInstance } = useExperienceInstanceApi();
  const { buyTicket } = ExperienceContract();
  const transactionApi = useTransactionApi();
  const formFields = {
    adultTickets: {
      name: "adultTickets",
      initialValue: 1,
      title: __("how_many_people_can_take_tour"),
      label: __("adults"),
    },
  };

  const initialValues = {
    [formFields.adultTickets.name]: formFields.adultTickets.initialValue,
  };

  const validationSchema = Yup.object().shape({
    [formFields.adultTickets.name]: Yup.number()
      .positive(__("adult_tickets_must_be_positive"))
      .max(remainningTickets, `${__("only_remaining")} ${remainningTickets}`)
      .required(__("adult_tickets_required")),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {},
  });

  const saveBuyExpInstance = async (
    expInstanceId: string,
    data: any
  ) => {
    const res = await buyTicketsExperienceInstance(expInstanceId, data);

    if (res.status === HttpStatusCode.Ok && res.data) {
      showSuccessToast(__("save_successfully"));
      fetchData();
      onModalClose();
    } else {
      showErrorToast(__("error_on_petition"));
      console.log(res);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      isWalletConnected(!isConnected);
      const status = isCorrectNetwork(chain);
      const isSameNet = isSameNetwork(chain, experienceInstance?.chainId);
      switchNetwork?.(experienceInstance?.chainId);
      if (!status || !isSameNet) return;

      const totalAmount = values.adultTickets;
      const totalPrice = Number(
        experienceInstance?.pricePerPerson * parseInt(totalAmount)
      );

      let isStableCoin = false;
      const payoutCurrency = experienceInstance?.payoutCurrency;
      if (payoutCurrency != CURRENCY_ETHER) {
        const price = experienceInstance?.pricePerPerson;

        isStableCoin = true;
        const params = {
          chainId: chain?.id,
          address: payoutCurrency,
          ownerAddress: address,
          spenderAddress: experienceInstance?.contractAddress,
        };
        const { result } = await getAllowance(params);
        if (parseFloat(result?.allowance) < totalPrice) {
          const balanceTokens = await fetchBalance({
            address,
            token: payoutCurrency,
          });

          if (parseFloat(balanceTokens?.value) < parseFloat(price)) {
            showErrorToast("Not Enought Token");
            return;
          }
          const { hash } = await ApproveTokens(payoutCurrency, [
            experienceInstance?.contractAddress,
            balanceTokens?.value,
          ]);

          const transactionReceipt = await waitForTransaction({ hash });

          if (transactionReceipt.status == "reverted") {
            showErrorToast(__("tokens_not_approved"));
            return;
          }
          showSuccessToast(__("success_token_approval_please_wait"));
        }
      }

      const ticket: any = [
        experienceInstance?.uniqueEventId.toString(),
        values.adultTickets.toString(),
      ];

      const { hash } = await buyTicket(ticket, isStableCoin, totalPrice);
      
      const transactionReceipt = await waitForTransaction({ hash });

      if (transactionReceipt.status == "success") {
        
        await transactionApi.saveTransactionInstanceByUser({
          userAddress: address,
          transactionHash: hash,
          price: experienceInstance?.pricePerPerson,
          chainId: chain?.id,
          eventType: TransactionType.MINT,
          nftContractAddress: experienceInstance?.contractAddress,
          tokenId: parseInt(experienceInstance?.uniqueEventId.toString()),
          productId: product?.id,
          quantity: totalAmount,
        });
        const data: any = {
          buyerAddress: address,
          path: product?.mediaAssets?.find(
            (media: any) => media.contentType === 0
          )?.ipfs
        };
        await saveBuyExpInstance(experienceInstance?.id, data)
        
      } else {
        showErrorToast(__("not_success_on_transaction"));
      }
    } catch (error) {
      showErrorToast(`${__("erros")}: ${error}`);
      console.log(error);
    }
  };

  return (
    <>
      <Box w={"100%"}>
        {isConnected ? (
          <>
            {experienceInstance?.eventReq === EventReq.Accepted ? (
              <Button
                onClick={() => openModal()}
                isLoading={loadingButton}
                loadingText={__("loading") + "..."}
                isDisabled={isDisabled}
              >
                {isDisabled ? __("sold_out") : __("buy")}
              </Button>
            ) : experienceInstance?.eventReq === EventReq.Generated ? (
              <Button onClick={() => openModal()} isDisabled={true}>
                {__("waiting_for_approval_three_dots")}
              </Button>
            ) : null}
          </>
        ) : null}

        <Box zIndex={"modal"}>
          <Drawer
            placement="right"
            isOpen={loadingButton ? true : isModalOpen}
            onClose={onModalClose}
            size="md"
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>{__("buy_tickets")}</DrawerHeader>

              <DrawerBody display={"flex"} flexDir={"column"} gap={"24px"}>
                <Text textAlign={"center"} fontSize={"24px"} fontWeight={"600"}>
                  {__("buy_tickets")}
                </Text>

                <Formik
                  initialValues={formik.initialValues}
                  validationSchema={validationSchema}
                  onSubmit={async (values) => {
                    try {
                      setLoadingButton(true);
                      await handleSubmit(values);
                    } catch (error) {
                    } finally {
                      setLoadingButton(false);
                    }
                  }}
                >
                  <Form>
                    <Flex flexDir={"column"} gap={"24px"}>
                      <>
                        <FormLabel
                          fontSize={"16px"}
                          fontWeight={"600"}
                          mb={"30px"}
                        >
                          {formFields.adultTickets.title}
                        </FormLabel>
                        {/* Adult Tickets */}
                        <Field name={formFields.adultTickets.name}>
                          {({ field, form }: any) => (
                            <FormControl
                              isInvalid={
                                form.errors.adultTickets &&
                                form.touched.adultTickets
                              }
                            >
                              <Flex
                                w={"100%"}
                                flexDir={"row"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                              >
                                <FormLabel
                                  fontSize={"16px"}
                                  htmlFor={formFields.adultTickets.name}
                                >
                                  {`${formFields.adultTickets.label} (${remainningTickets} tickets)`}
                                </FormLabel>

                                <HStack
                                  justifyContent={"space-between"}
                                  gap={"12px"}
                                  minW={"100px"}
                                >
                                  <Image
                                    alt="substract-icon"
                                    src="/nft/substract-icon.svg"
                                    onClick={() =>
                                      form.setFieldValue(
                                        formFields.adultTickets.name,
                                        field.value - 1 === 0
                                          ? 1
                                          : field.value - 1
                                      )
                                    }
                                    cursor={"pointer"}
                                  ></Image>
                                  <Text>{`${field.value}`}</Text>
                                  <Image
                                    alt="add-icon"
                                    src="/nft/add-icon.svg"
                                    onClick={() =>
                                      form.setFieldValue(
                                        formFields.adultTickets.name,
                                        field.value + 1
                                      )
                                    }
                                    cursor={"pointer"}
                                  ></Image>
                                </HStack>
                              </Flex>

                              {form.errors.adultTickets ? (
                                <Box style={{ color: "red", fontSize: "12px" }}>
                                  <>{form.errors.adultTickets}</>
                                </Box>
                              ) : null}
                            </FormControl>
                          )}
                        </Field>
                        <Divider></Divider>
                      </>
                      <Button
                        w="100%"
                        mb="8px"
                        bgColor={"primary.100"}
                        color="primary.10"
                        borderRadius={4}
                        type="submit"
                        isLoading={loadingButton}
                        loadingText={__("loading") + "..."}
                      >
                        {__("buy_tickets")}
                      </Button>
                    </Flex>
                  </Form>
                </Formik>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      </Box>
    </>
  );
}
