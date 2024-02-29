import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
// import { NFTVoucherQuantity, NFTVoucherSimple } from "@/types/NFTVoucher";
import { Form, Field, Formik } from "formik";
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
import { ChakraStylesConfig, Select } from "chakra-react-select";
import { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { CURRENCY, CURRENCY_ETHER, DECIMALS_SIX, DECIMALS_TWO } from "@/constants/env";
import { __ } from "@/helpers/common";
import { chains } from "@/modules/provider/wallet-provider";

interface IListingModal {
  disabled: boolean,
  item: any;
  onClick: (_quantity: number, _price: number, currencyAddress: string) => void;
  userAlreadyListed: boolean;
  metadata: any
}

function ListingModal({ disabled, item, onClick, userAlreadyListed, metadata }: IListingModal) {
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: onModalClose,
  } = useDisclosure();

  const { chain, address, isConnected, switchNetwork } =
    useContext(WalletConnectContext);

  const [currencyOptions, setCurrenyOptions] = useState<any[]>([]);
  const [blockchainOptions, setBlockchainOptions] = useState<any[]>([]);
  const [loadingListing, setLoadingListing] = useState<boolean>(false);

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
    quantityList: {
      name: "quantityList",
      initialValue: 1,
    },
    blockchain: {
      name: "blockchain",
      initialValue: "",
      placeholder: __('blockchain_label'),
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
    },
  };

  const useInitialValues: any = {
    [useFormFields.quantityList.name]: useFormFields.quantityList.initialValue,
    [useFormFields.blockchain.name]: useFormFields.blockchain.initialValue,
    [useFormFields.currency.name]: useFormFields.currency.initialValue,
    [useFormFields.price.name]:useFormFields.price.initialValue,
  };
  const validationSchema = Yup.object().shape({
    [useFormFields.quantityList.name]: Yup.number()
      .required("Required.")
      .positive("Number must be positive.")
      .max(
        metadata?.amount,
        `Number must be less or equal ${metadata?.amount} to make the operation.`
      ),
      [useFormFields.blockchain.name]: Yup.string().required(__("blockchain_required")),
      [useFormFields.currency.name]: Yup.string().required(__("select_a_currency")),
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
        isDisabled={userAlreadyListed || disabled}
        onClick={() => openModal()}
        isLoading={loadingListing}
        variant="outline"
        loadingText={__("loading") + "..."}
      >
        {__("list_sell")}
      </Button>
      <Box zIndex={"1000"}>
        <Modal
          isCentered
          motionPreset="slideInBottom"
          isOpen={loadingListing ? true : isModalOpen}
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
                {__("listing_marketplace")}
              </Text>

              <Text textAlign={"center"}>{__("operation_list_desc")}</Text>

              <Formik
                initialValues={useInitialValues}
                validationSchema={validationSchema}
                onSubmit={async ({ quantityList, price, currency }) => {
                  try {
                    setLoadingListing(true);
                    await onClick?.(quantityList, price, currency);
                    onModalClose();
                  } catch (error) {
                    console.log(error)
                  } finally {
                    setLoadingListing(false);
                  }
                }}
              >
                  <Form>
                  <Flex flexDir={"column"} gap={"24px"}>
                    <Field name={useFormFields.quantityList.name}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.quantityList &&
                            form.touched.quantityList
                          }
                        >
                          <FormLabel>{__("quantity")}</FormLabel>
                          <Input
                            type="number"
                            {...field}
                            id={"quantityList"}
                            placeholder={"1"}
                          />
                          <FormErrorMessage>
                            {form.errors.quantityList}
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
                            placeholder={
                              useFormFields.blockchain.placeholder
                            }
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
                            <FormLabel>{__("price")}</FormLabel>
  
                            <Input  {...field} id={"price"} placeholder={useFormFields.price.placeholder} 
                            disabled={!form.values[useFormFields.currency.name]}/>
                            <FormErrorMessage>
                              {form.errors.price}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                    </Field>

                    <Button
                      bgColor={"primary.100"}
                      color="primary.10"
                      borderRadius={4}
                      type="submit"
                      isLoading={loadingListing}
                      loadingText={__("loading") + "..."}
                    >
                      {__("list")}
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

export default ListingModal;
