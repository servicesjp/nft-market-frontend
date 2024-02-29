import { showErrorToast, showSuccessToast } from "@/components/toast";
import { __ } from "@/helpers/common";
import {ERC20Contract} from "@/hooks/contract/erc20";
import { CancelTicketsDTO } from "@/hooks/types/experience-instance/CancelTicketsDTO";
import { useExperienceInstanceApi } from "@/hooks/useApi";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import {
  isCorrectNetwork,
  isSameNetwork,
  isWalletConnected,
} from "@/modules/utils";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { HttpStatusCode } from "axios";
import { Field, Form, Formik, useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import * as Yup from "yup";

import { waitForTransaction } from 'wagmi/actions';
import { ExperienceContract } from "@/hooks/contract/nft/experience-contract";

export default function CancelTicketsModal({
  product,
  experienceInstance,
  fetchData,
}: any) {
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: onModalClose,
  } = useDisclosure();

  const { address, isConnected, chain, switchNetwork } =
    useContext(WalletConnectContext);

  const [myTicketsInfo, setMyTicketsInfo] = useState<any>(null);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const { cancelTicketsExperienceInstance } = useExperienceInstanceApi()

  const { cancelTickets } = ExperienceContract();
  const { approveTokens } = ERC20Contract();

  useEffect(() => {
    setMyTicketsInfo(experienceInstance?.infoTickets?.[0])

  }, [experienceInstance])

  const formFields = {
    adultTickets: {
      name: "adultTickets",
      initialValue: 0,
      title: __("how_many_people_can_take_tour"),
      label: __("adults"),
    },
    childrenTickets: {
      name: "childrenTickets",
      initialValue: 0,
      label: __("children"),
    },
  };

  const initialValues = {
    [formFields.adultTickets.name]: formFields.adultTickets.initialValue,
    [formFields.childrenTickets.name]: formFields.childrenTickets.initialValue,
  };

  const validationSchema = Yup.object().shape({
    [formFields.adultTickets.name]: Yup.number()
      .min(0, __("adult_tickets_must_be_positive"))
      .max(
        myTicketsInfo?.noOfAdultTickets,
        `${__("only_remaining")} ${myTicketsInfo?.noOfAdultTickets
        }`
      )
      .required(__("adult_tickets_required")),
    [formFields.childrenTickets.name]: Yup.number()
      .min(0, __("children_tickets_must_be_positive"))
      .max(
        myTicketsInfo?.noOfChildTickets,
        `${__("only_remaining")} ${myTicketsInfo?.noOfChildTickets
        }`
      )
      .required(__("children_tickets_required")),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => { },
  });

  const saveCancelTickets = async (expInstanceId: string, data: CancelTicketsDTO) => {
    const res = await cancelTicketsExperienceInstance(expInstanceId, data);

    if (res.status === HttpStatusCode.Ok && res.data) {
      showSuccessToast(__("save_successfully"));
      fetchData();
      onModalClose();
    } else {
      showErrorToast(__("error_on_petition"));
      console.log(res);
    }
  }

  const handleSubmit = async (values: any) => {
    try {
      if (values.adultTickets + values.childrenTickets <= 0) {
        showErrorToast("Sum of tickets can't be zero.")
        return;
      }

      isWalletConnected(!isConnected);
      const status = isCorrectNetwork(chain);
      const isSameNet = isSameNetwork(chain, product?.chainId);
      switchNetwork?.(product?.chainId)
      if (!status || !isSameNet) return;


      const ticket: any = [
        experienceInstance?.uniqueEventId.toString(),
        values.adultTickets.toString(),
        values.childrenTickets.toString(),
      ];
      // console.log("ticket arr", ticket);

      const { hash } = await cancelTickets(ticket)
      let transactionReceipt = await waitForTransaction({ hash })

      if (transactionReceipt.status == 'success') {
        const data: CancelTicketsDTO = {
          transactionHash: hash,
          buyerAddress: address,
          noOfAdultTickets: values.adultTickets,
          noOfChildTickets: values.childrenTickets,
        };
        await saveCancelTickets(experienceInstance?.id, data);
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
        <Button
          onClick={() => openModal()
          }
          isDisabled={((new Date(experienceInstance?.startTime).getTime() / 1000) < (new Date().getTime() / 1000))}
          colorScheme="red.500"
          isLoading={loadingButton}
          loadingText={__("loading") + "..."}
        >
          {__("cancel")}
        </Button>
        <Box zIndex={"modal"}>
          <Modal
            isCentered
            motionPreset="slideInBottom"
            isOpen={loadingButton ? true : isModalOpen}
            onClose={onModalClose}
            scrollBehavior={"inside"}
          >
            <ModalOverlay bg="black.300" backdropFilter="blur(10px)" />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody
                display={"flex"}
                flexDir={"column"}
                gap={"24px"}
                my={"24px"}
              >
                <Text textAlign={"center"} fontSize={"24px"} fontWeight={"600"}>
                  {/* {__("cancel_tickets")} */}
                  {'Cancel Tickets'}
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
                        {/* <FormLabel
                          fontSize={"16px"}
                          fontWeight={"600"}
                          mb={"30px"}
                        >
                          {formFields.adultTickets.title}
                        </FormLabel> */}
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
                                  {`${formFields.adultTickets.label} (${myTicketsInfo?.noOfAdultTickets} tickets)`}
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
                                        field.value - 1 === -1
                                          ? 0
                                          : field.value - 1
                                      )
                                    }
                                    cursor={"pointer"}
                                  ></Image>
                                  <Text>{`${field.value}`}</Text>
                                  {/* <Text>{productInstance?.experienceInstance?.remainningLimitAdult}</Text> */}
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
                        {/* Children Tickets */}
                        <Field name={formFields.childrenTickets.name}>
                          {({ field, form }: any) => (
                            <FormControl
                              isInvalid={
                                form.errors.childrenTickets &&
                                form.touched.childrenTickets
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
                                  htmlFor={formFields.childrenTickets.name}
                                >
                                  {`${formFields.childrenTickets.label} (${myTicketsInfo?.noOfChildTickets} tickets)`}
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
                                        formFields.childrenTickets.name,
                                        field.value - 1 === -1
                                          ? 0
                                          : field.value - 1
                                      )
                                    }
                                    cursor={"pointer"}
                                  ></Image>
                                  <Text>{field.value}</Text>
                                  <Image
                                    src="/nft/add-icon.svg"
                                    alt="add-icon"
                                    onClick={() =>
                                      form.setFieldValue(
                                        formFields.childrenTickets.name,
                                        field.value + 1
                                      )
                                    }
                                    cursor={"pointer"}
                                  ></Image>
                                </HStack>
                              </Flex>

                              {form.errors.childrenTickets ? (
                                <Box style={{ color: "red", fontSize: "12px" }}>
                                  <>{form.errors.childrenTickets}</>
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
                        colorScheme="red.500"
                        color="primary.10"
                        borderRadius={4}
                        type="submit"
                        isLoading={loadingButton}
                        loadingText={__("loading") + "..."}
                      >
                        {`${__("cancel")} tickets`}
                      </Button>
                    </Flex>
                  </Form>
                </Formik>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </>
  );
}
