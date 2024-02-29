import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { isValidDate } from "@/modules/utils";
import { Field, Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import moment from "moment";
import { chains } from "@/modules/provider/wallet-provider";
import {
  __,
  //  __replacePlaceholder
} from "@/helpers/common";
import { useERC20 } from "@/hooks/useERC20";
import { CURRENCY, CURRENCY_ETHER, DECIMALS_SIX, DECIMALS_TWO } from "@/constants/env";
import { ChakraStylesConfig, Select } from "chakra-react-select";
interface IOfferModal {
  disabled: boolean,
  item: any;
  onClick: (values: any) => Promise<void>;
  userOfferAlready: boolean;
  metadata:any
}

function OfferModal({ disabled, item, onClick, userOfferAlready, metadata }: IOfferModal) {
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: onModalClose,
  } = useDisclosure();

  const { chain, signer, address, switchNetwork } =
    useContext(WalletConnectContext);
const { getTokenDetails} = useERC20()
  const [currencyOptions, setCurrenyOptions] = useState<any[]>([]);
  const [blockchainOptions, setBlockchainOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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
  const useFormFields = {
    quantity: {
      name: "quantity",
      initialValue: 1,
      label: __("quantity"),
      placeholder: __("quantity"),
    },
    blockchain: {
      name: "blockchain",
      initialValue: "",
      placeholder: __("blockchain_label"),
      label: __("blockchain_label"),
    },
    currency: {
      name: "currency",
      initialValue: "",
      label: __("price"),
      placeholder: "USDT",
      options: [],
    },
    price: {
      name: "price",
      initialValue: "",
      suffix: "",
      placeholder: "0",
      label: "price",
    },
    expiry: {
      name: "expiry",
      initialValue: new Date(Date.now() + 60 * 1000),
      label: __("expiration_date"),
    },
  };

  const useInitialValues: any = {
    [useFormFields.quantity.name]: useFormFields.quantity.initialValue,
    [useFormFields.blockchain.name]: useFormFields.blockchain.initialValue,
    [useFormFields.currency.name]: useFormFields.currency.initialValue,
    [useFormFields.price.name]:useFormFields.price.initialValue,
    [useFormFields.expiry.name]: useFormFields.expiry.initialValue,
  };

  const validationSchema = Yup.object().shape({
    [useFormFields.quantity.name]: Yup.number()
      .required(__("required"))
      .positive(__("must_be_positive"))
      .max(
        metadata?.amount,
        `Number must be less or equal ${metadata?.amount} to make the operation.`
      ),
    [useFormFields.blockchain.name]: Yup.string().required(
      __("blockchain_required")
    ),
    [useFormFields.currency.name]: Yup.string().required(
      __("select_a_currency")
    ),
    [useFormFields.price.name]: Yup.string()
      .required("Required.")
      .test({
        name: "maxDecimals",
        test: function (value) {
          if (value === undefined) {
            return false;
          }
          const blockchainValue = this.parent[useFormFields.currency.name] as string;
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
    [useFormFields.expiry.name]: Yup.date()
      .required(__("required"))
      .typeError(__("field_required"))
      .min(new Date(), "Expiry time must be after the current time"),
  });

  const convertChainsToSelectArray = (chainId: any) => {
    const foundChain = chains.find((chain) => chain.id == chainId);
    const chainOption = {
      value: foundChain ? foundChain.id : "",
      label: foundChain ? foundChain.name.toUpperCase() : "",
    };
    return [chainOption];
  };
  useEffect(() => {
    setBlockchainOptions(convertChainsToSelectArray(item?.chainId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  return (
    <Box w={"100%"}>
      <Button
        isDisabled={userOfferAlready || disabled}
        onClick={() => openModal()}
        isLoading={loading}
        loadingText={__("loading") + "..."}
      >
        {__("make_offer")}
      </Button>
      <Box zIndex={"1000"}>
        <Modal
          isCentered
          motionPreset="slideInBottom"
          isOpen={loading ? true : isModalOpen}
          onClose={onModalClose}
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
                {__("make_offer")}
              </Text>

              <Text textAlign={"center"}>{__("operation_offer_desc")}</Text>

              <Formik
                initialValues={useInitialValues}
                validationSchema={validationSchema}
                onSubmit={async ({ quantity, price, currency, expiry }) => {
                  try {
                    setLoading(true);
                    await onClick?.({ quantity, price, currency, expiry });
                    
                    onModalClose();
                  } catch (error) {
                    console.log("error on offer: ", error);
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                <Form>
                  <Flex flexDir={"column"} gap={"24px"}>
                    <Field name={useFormFields.quantity.name}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            !!form.errors.quantity && !!form.touched.quantity
                          }
                        >
                          <FormLabel>{useFormFields.quantity.label}</FormLabel>
                          <Input
                            type="number"
                            {...field}
                            id={useFormFields.quantity.name}
                            placeholder={useFormFields.quantity.placeholder}
                          />
                          <FormErrorMessage>
                            {form.errors.quantity}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name={useFormFields.blockchain.name}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.blockchain && form.touched.blockchain
                          }
                        >
                          <FormLabel
                            fontSize={"16px"}
                            fontWeight={"600"}
                            htmlFor={useFormFields.blockchain.name}
                          >
                            {useFormFields.blockchain.label}
                          </FormLabel>

                          <Select
                            name={useFormFields.blockchain.name}
                            chakraStyles={chakraStyles}
                            placeholder={useFormFields.blockchain.placeholder}
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
                                useFormFields.blockchain.name,
                                option ? option.value : null
                              );
                              const newCurrencyOptions =
                                getCurrenciesByBlockchain(option?.value);
                              setCurrenyOptions(newCurrencyOptions);

                              form.setFieldValue(
                                useFormFields.currency.name,
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

                    <Field name={useFormFields.currency.name}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            !!form.errors.currency && !!form.touched.currency
                          }
                        >
                          <Select
                            name={useFormFields.currency.name}
                            placeholder={useFormFields.currency.placeholder}
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
                                useFormFields.currency.name,
                                option ? option.value : ""
                              );
                            }}
                            onBlur={field.onBlur}
                          />
                        </FormControl>
                      )}
                    </Field>

                    <Field name={useFormFields.price.name}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.price && form.touched.price}
                        >
                          <FormLabel>{useFormFields.price.label}</FormLabel>
                          <Input
                            {...field}
                            id={useFormFields.price.name}
                            placeholder={useFormFields.price.placeholder}
                            disabled={!form.values[useFormFields.currency.name]}
                          />
                          <FormErrorMessage>
                            {form.errors.price}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name={useFormFields.expiry.name}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.expiry && form.touched.expiry}
                        >
                          <FormLabel
                            fontSize={"16px"}
                            htmlFor={useFormFields.expiry.name}
                          >
                            {useFormFields.expiry.label}
                          </FormLabel>
                          <Input
                            type="datetime-local"
                            {...field}
                            id={useFormFields.expiry.name}
                            value={moment(field.value).format(
                              "YYYY-MM-DDTHH:mm"
                            )}
                            onChange={(event) => {
                              if (isValidDate(event.target.value)) {
                                form.setFieldValue(
                                  useFormFields.expiry.name,
                                  new Date(event.target.value)
                                );
                              }
                            }}
                          />
                          <FormErrorMessage>
                            {form.errors.expiry}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Button
                      w="100%"
                      mb="8px"
                      bgColor={"primary.100"}
                      color="primary.10"
                      borderRadius={4}
                      type="submit"
                      isLoading={loading}
                      loadingText={__("loading") + "..."}
                    >
                      {__("make_offer")}
                    </Button>
                  </Flex>
                </Form>
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}

export default OfferModal;
