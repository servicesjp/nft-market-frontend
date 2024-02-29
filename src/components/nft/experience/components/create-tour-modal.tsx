import { useProductsApi } from "@/hooks/useApi";
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
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { HttpStatusCode } from "axios";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";
import { showErrorToast, showSuccessToast } from "@/components/toast";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import { useContext, useEffect, useState } from "react";
import { isCorrectNetwork, isValidDate, isWalletConnected } from "@/modules/utils";
import { EventReq } from "@/types/EventReq";
import { parseUnits } from "ethers/lib/utils.js";
import { CURRENCY, CURRENCY_ETHER, DECIMALS_SIX, DECIMALS_TWO, EXPERIENCE } from "@/constants/env";
import { __ } from "@/helpers/common";
import { ApprovalStatus } from "@/types/ApprovalStatus";
import moment from "moment";
import { CreateExpInstanceDTO } from "@/hooks/types/experience-instance/CreateExpInstanceDTO";
import { ExperienceContract, readContractExp } from "@/hooks/contract/nft/experience-contract";
import { waitForTransaction } from 'wagmi/actions';
import { UserContext } from "@/modules/provider/user-info-provider"
import { useERC20 } from "@/hooks/useERC20"
import { chains } from "@/modules/provider/wallet-provider";
import { ChakraStylesConfig, Select } from "chakra-react-select";
export default function CreateTourModal({ product, fetchData }: any) {
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: onModalClose,
  } = useDisclosure();
  const [uriIPFS, SetUriIPFS] = useState<any>("")
  const [loadingButton, setLoadingButton] = useState<boolean>(false)
  const [currencyOptions, setCurrenyOptions] = useState<any[]>([]);
  const [blockchainOptions, setBlockchainOptions] = useState<any[]>([]);
  const { createExperienceInstance } = useProductsApi();
  const { createEvent } = ExperienceContract();
  const { loggedIn } = useContext(UserContext);
  const { getTokenDetails } = useERC20();

  const { address, isConnected, chain, switchNetwork } =
    useContext(WalletConnectContext);
  useEffect(() => {
    const primaryMedia = product?.mediaAssets?.find(
      (media: any) => media.contentType === 0
    );
    SetUriIPFS(primaryMedia?.ipfs)
    setBlockchainOptions(convertChainsToSelectArray());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])
  const chakraStyles: ChakraStylesConfig = {
    dropdownIndicator: (provided, state) => ({
      ...provided,
      background: state.isFocused ? "blue.100" : "primary.100",
      color: "primary.100",
      backgroundColor: "white",
      p: 0,
      w: "40px",
    }),
    downChevron: (provided, state) => ({
      color: "#999FBB",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor:
        state.isFocused || state.isSelected
          ? "rgba(214, 221, 255, 0.3)"
          : "white",
      color: state.isFocused || state.isSelected ? "primary.100" : "#999FBB",
    }),
  };
  const formFields = {
    totalTickets: {
      name: "totalTickets",
      initialValue: 1,
      title: "How many people can take the tour?",
      label: __("adults"),
    },
    startHour: {
      name: "startHour",
      initialValue: new Date(),
      label: __("hours"),
    },

    endHour: {
      name: "endHour",
      initialValue: new Date(Date.now() + 3600 * 1000),
      label: __("hours"),
    },

    blockchain: {
      name: "blockchain",
      initialValue: "",
      label: __("blockchain"),
      placeholder: "BSC",
    },

    currency: {
      name: "currency",
      label: __("experience_price"),
      subLabel: __("price_per_person"),
      placeholder: "USDT",
      initialValue: product?.currencyAddress,
      options: [],
    },
    price: {
      name: "price",
      label: __("experience_price"),
      subLabel: __("price_per_person"),
      initialValue:
        0,
      suffix: "",
      placeholder: "0",
    },
  };

  const validationSchema = Yup.object().shape({
    [formFields.totalTickets.name]: Yup.number()
      .positive(__("adult_tickets_must_be_positive"))
      .required(__("adult_tickets_required")),
    [formFields.startHour.name]: Yup.date()
      .required("Select a valid date and time")
      .min(new Date(), "Start time must be after the current time"),
    [formFields.endHour.name]: Yup.date()
      .required("Select a valid date and time")
      .min(
        Yup.ref(formFields.startHour.name),
        "End time must be after start time"
      ),
    [formFields.blockchain.name]: Yup.string().required(__("blockchain_required")),
    [formFields.currency.name]: Yup.string().required(__("select_a_currency")),
    [formFields.price.name]: Yup.string()
      .required("Required.")
      .required("Required.")
      .test({
        name: "maxDecimals",
        test: function (value) {
          if (value === undefined) {
            return false;
          }
          const blockchainValue = this.parent[formFields.currency.name] as string;
          const isNativeToken = blockchainValue?.toLowerCase() == CURRENCY_ETHER.toLowerCase();
          const maxDecimals = isNativeToken ? DECIMALS_SIX : DECIMALS_TWO;
          const decimalCount = (String(value).split(".")[1] || "").length;
          if (decimalCount <= maxDecimals) {
            return true;
          } else {
            throw new Yup.ValidationError(
              `Max ${maxDecimals} decimals`,
              value,
              this.path
            );
          }
        },
      })
      .test(
        "mustBeNumber",
        "Must be a number",
        (value) => !isNaN(parseFloat(value))
      )
      .test(
        "noNegative",
        "Must not be negative",
        (value) => Math.sign(parseFloat(value)) !== -1
      )
      .test("incorrectNumber", "Invalid number format", (value) =>
        /^(0|[1-9]\d*)(\.\d+)?$/.test(String(value))
      ),
  });

  const convertChainsToSelectArray = () => {
    const chainsOptions = chains.map((chain: any) => ({
      value: chain.id,
      label: chain.name.toUpperCase(),
    }));

    return chainsOptions
  };
  const getCurrenciesByBlockchain = (chainId: number): any[] => {
    const currencies = CURRENCY[chainId];
    const optionsCurrencies: any = [];

    if (currencies) {
      const listCurrencies = Object.entries(currencies);
      listCurrencies.forEach(([key, value]) => {
        optionsCurrencies.push({ label: key, value });
      });
    }
    return optionsCurrencies;
  };

  const initialValues: any = {
    [formFields.totalTickets.name]: formFields.totalTickets.initialValue,
    [formFields.startHour.name]: formFields.startHour.initialValue,
    [formFields.endHour.name]: formFields.endHour.initialValue,
    [formFields.blockchain.name]: formFields.blockchain.initialValue,
    [formFields.currency.name]: formFields.currency.initialValue,
    [formFields.price.name]: formFields.price.initialValue,
  }


  const saveCreateEvent = async (expInstance: CreateExpInstanceDTO) => {

    try {

      const res = await createExperienceInstance(product?.id, expInstance);

      if (res.status === HttpStatusCode.Ok && res.data) {
        showSuccessToast(__("event_save_success"));
        fetchData();
        onModalClose();
      } else {
        showErrorToast(__("error_on_petition"));
        console.log(res);
      }

    } catch (error) {
      console.log(error);
      showErrorToast(__("error_saving_operation"));
    }

  }

  const handleCreateEvent = async (values: any) => {
    try {

      if (!loggedIn) {
        showErrorToast("User Not Log In");
        return;
      }
      const chainId = values.blockchain
      const statusWallet = isWalletConnected(!isConnected);
      const statusNet: any = isCorrectNetwork(chain);
      if (!statusWallet || !statusNet) return;
      const payoutCurrency = values.currency
      const { decimals } = getTokenDetails(chainId, payoutCurrency);
      const price = parseUnits(values.price.toString(), decimals);
      const expInstance = {
        creatorAddress: address,
        contractAddress: EXPERIENCE[chainId],
        uniqueEventId: -1,
        totalTickets: values.totalTickets,
        startTime: parseInt((values.startHour / 1000).toString()),
        endTime: parseInt((values.endHour / 1000).toString()),
        pricePerPerson: parseInt(price.toString()),
        payoutCurrency,
        chainId,
        transactionHash: '', // temp value
      };

      const eventBlockchain: any = [
        values.totalTickets,
        parseInt((values.startHour / 1000).toString()),
        parseInt((values.endHour / 1000).toString()),
        price,
        payoutCurrency,
        address,
        uriIPFS,
        0,
        values.totalTickets,
        EventReq.NotGenerated.toString(),
      ];
      const { hash } = await createEvent(eventBlockchain)
      const { logs, status } = await waitForTransaction({ hash })
      if (status != "success") {
        showErrorToast("Error create Event");
        return;
      }
      showSuccessToast(`Transaction on blockchain successfully.`);
      const { args } = readContractExp(values.blockchain).interface.parseLog(logs[0])
      const uniqueTicket = args[0]?.toString()
      expInstance.uniqueEventId = uniqueTicket?.toString(); // save uniqueeventId
      expInstance.transactionHash = hash
      await saveCreateEvent(expInstance)
    } catch (error) {
      showErrorToast(`${__("error")}: ${error}`);
    }
  };

  // main return
  return (
    <>
      <Box w={"100%"}>
        <Button
          onClick={() => openModal()}
          isLoading={loadingButton}
          loadingText={__("loading") + "..."}
          isDisabled={product?.approvalStatus !== ApprovalStatus.APPROVED}
        >
          {product?.approvalStatus === ApprovalStatus.APPROVED ?
            __("create_event")
            : product?.approvalStatus === ApprovalStatus.DENIED ?
              "Experience is denied by admin"
              :
              __('waiting_for_approval_three_dots')
          }
        </Button>
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
              <DrawerHeader>{__("create_tour")}</DrawerHeader>

              <DrawerBody
                display={"flex"}
                flexDir={"column"}
                gap={"24px"}
                my={"24px"}
              >
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={async (values) => {
                    try {
                      setLoadingButton(true);
                      await handleCreateEvent(values);
                    } catch (error) {
                    } finally {
                      setLoadingButton(false);
                    }
                  }}
                >
                  <Form>
                    <Flex flexDir={"column"} gap={"24px"}>
                      <>
                        <>
                          <FormLabel
                            fontSize={"16px"}
                            fontWeight={"600"}
                            mb={"30px"}
                          >
                            {formFields.totalTickets.title}
                          </FormLabel>
                          {/* quantity Tickets */}
                          <Field name={formFields.totalTickets.name}>
                            {({ field, form }: any) => (
                              <FormControl
                                isInvalid={
                                  form.errors.totalTickets &&
                                  form.touched.totalTickets
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
                                    htmlFor={formFields.totalTickets.name}
                                  >
                                    {formFields.totalTickets.label}
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
                                          formFields.totalTickets.name,
                                          field.value - 1 === 0
                                            ? 1
                                            : field.value - 1
                                        )
                                      }
                                      cursor={"pointer"}
                                    ></Image>
                                    <Text>{field.value}</Text>
                                    <Image
                                      alt="add-icon"
                                      src="/nft/add-icon.svg"
                                      onClick={() =>
                                        form.setFieldValue(
                                          formFields.totalTickets.name,
                                          field.value + 1
                                        )
                                      }
                                      cursor={"pointer"}
                                    ></Image>
                                  </HStack>
                                </Flex>

                                {form.errors.totalTickets ? (
                                  <Box
                                    style={{ color: "red", fontSize: "12px" }}
                                  >
                                    <>{form.errors.totalTickets}</>
                                  </Box>
                                ) : null}
                              </FormControl>
                            )}
                          </Field>
                          <Divider></Divider>
                        </>
                        {/* Hours */}
                        <>
                          <Flex flexDir={"column"}>
                            <FormLabel
                              fontSize={"16px"}
                              htmlFor={formFields.startHour.name}
                            >
                              {__("start_date")}
                            </FormLabel>

                            {/* Inputs */}
                            <Flex
                              flexDir={"column"}
                              gap={"16px"}
                              w={"100%"}
                              alignItems={"start"}
                            >
                              <Field name={formFields.startHour.name}>
                                {({ field, form }: FieldProps<any>) => (
                                  <FormControl
                                    isInvalid={
                                      !!form.errors.startHour &&
                                      !!form.touched.startHour
                                    }
                                  >
                                    <Input
                                      {...field}
                                      type="datetime-local"
                                      id={formFields.startHour.name}
                                      value={moment(field.value).format('YYYY-MM-DDTHH:mm')}
                                      onChange={(event) => {
                                        if (isValidDate(event.target.value)) {
                                          form.setFieldValue(formFields.startHour.name, new Date(event.target.value))
                                        }
                                      }}

                                    />
                                  </FormControl>
                                )}
                              </Field>

                              <Field name={formFields.endHour.name}>
                                {({ field, form }: any) => (
                                  <FormControl
                                    isInvalid={
                                      form.errors.endHour &&
                                      form.touched.endHour
                                    }
                                  >
                                    <FormLabel
                                      fontSize={"16px"}
                                      htmlFor={formFields.endHour.name}
                                    >
                                      {__("end_date")}
                                    </FormLabel>
                                    <Input
                                      type="datetime-local"
                                      {...field}
                                      id={formFields.endHour.name}
                                      value={moment(field.value).format('YYYY-MM-DDTHH:mm')}
                                      onChange={(event) => {
                                        if (isValidDate(event.target.value)) {
                                          form.setFieldValue(formFields.endHour.name, new Date(event.target.value))
                                        }
                                      }}
                                    />
                                  </FormControl>
                                )}
                              </Field>
                            </Flex>

                            {/* Errors */}
                            <Flex
                              flexDir={"column"}
                              gap={"5px"}
                              w={"100%"}
                              mt="2px"
                              alignItems={"center"}
                            >
                              <Field name={formFields.startHour.name}>
                                {({ field, form }: any) => (
                                  <FormControl
                                    isInvalid={
                                      form.errors.startHour &&
                                      form.touched.startHour
                                    }
                                  >
                                    <FormErrorMessage>
                                      {form.errors.startHour}
                                    </FormErrorMessage>
                                  </FormControl>
                                )}
                              </Field>

                              <Field name={formFields.endHour.name}>
                                {({ field, form }: any) => (
                                  <FormControl
                                    isInvalid={
                                      form.errors.endHour &&
                                      form.touched.endHour
                                    }
                                  >
                                    <FormErrorMessage>
                                      {form.errors.endHour}
                                    </FormErrorMessage>
                                  </FormControl>
                                )}
                              </Field>
                            </Flex>
                          </Flex>
                        </>

                        <Field name={formFields.blockchain.name}>
                          {({ field, form }: any) => (
                            <FormControl
                              isInvalid={
                                form.errors.blockchain && form.touched.blockchain
                              }
                            >
                              <FormLabel
                                fontSize={"16px"}
                                fontWeight={"600"}
                                htmlFor={formFields.blockchain.name}
                              >
                                {formFields.blockchain.label}
                              </FormLabel>

                              <Select
                                name={formFields.blockchain.name}
                                chakraStyles={chakraStyles}
                                placeholder={formFields.blockchain.placeholder}
                                variant="outline"
                                options={blockchainOptions}
                                value={
                                  blockchainOptions
                                    ? blockchainOptions.find(
                                      (option: any) =>
                                        option.value === field.value
                                    )
                                    : ""
                                }
                                onChange={async (option: any) => {
                                  form.setFieldValue(
                                    formFields.blockchain.name,
                                    option ? option.value : null
                                  );
                                  const newCurrencyOptions =
                                    getCurrenciesByBlockchain(option?.value);
                                  setCurrenyOptions(newCurrencyOptions);

                                  form.setFieldValue(
                                    formFields.currency.name,
                                    ""
                                  );
                                }}
                                onBlur={field.onBlur}
                              />

                              <FormErrorMessage>
                                {form.errors.blockchain}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <Field name={formFields.currency.name}>
                          {({ field, form }: any) => (
                            <FormControl
                              isInvalid={
                                !!form.errors.currency && !!form.touched.currency
                              }
                            >
                              <Select
                                name={formFields.currency.name}
                                placeholder={formFields.currency.placeholder}
                                variant="outline"
                                chakraStyles={chakraStyles}
                                options={currencyOptions}
                                value={
                                  currencyOptions && field.value !== ""
                                    ? currencyOptions.find(
                                      (option: any) =>
                                        option.value === field.value
                                    )
                                    : ""
                                }
                                onChange={(option: any) => {
                                  form.setFieldValue(
                                    formFields.currency.name,
                                    option ? option.value : ""
                                  );
                                }}
                                onBlur={field.onBlur}
                              />
                            </FormControl>
                          )}
                        </Field>

                        <Field name={formFields.price.name}>
                          {({ field, form }: any) => (
                            <FormControl
                              isInvalid={form.errors.price && form.touched.price}
                            >
                              <FormLabel>{formFields.price.label}</FormLabel>
                              <Input
                                {...field}
                                id={formFields.price.name}
                                placeholder={formFields.price.placeholder}
                                disabled={!form.values[formFields.currency.name]}
                              />
                              <FormErrorMessage>
                                {form.errors.price}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
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
                        {__("create")}
                      </Button>
                    </Flex>
                  </Form>
                </Formik>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      </Box>{" "}
    </>
  );
}
