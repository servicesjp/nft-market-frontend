import { CURRENCY } from "@/constants/env";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { ChakraStylesConfig, Select } from "chakra-react-select";
import { Field, useFormikContext } from "formik";
import { useContext, useEffect, useState } from "react";

interface PriceInputProps {
  blockchain: any,
  currency: any,
  price?: any,
  disabledBlockCurrency?: boolean,
}

export const PriceInput = ({blockchain, currency, price, disabledBlockCurrency = false} : PriceInputProps) => {
  
  const [currencyOptions, setCurrenyOptions] = useState<any[]>([]);

  const [blockchainOptions, setBlockchainOptions] = useState<any[]>()

  const { chains }: any =
    useContext(WalletConnectContext);

  const formik = useFormikContext()

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

  function convertChainsToSelectArray() {
    const chainsOptions = chains.map((chain : any) => ({
      value: chain.id,
      label: chain.name.toUpperCase(),
    }));
    
    return chainsOptions
  }

  function getCurrenciesByBlockchain(chainId: number) {
    const currencies = CURRENCY[chainId]
    const optionsCurrencies: any = []

    if(currencies){
      const listCurrencies = Object.entries(currencies)
      listCurrencies.forEach(([key, value])=>{
        optionsCurrencies.push({label: key, value})
      })
    }
    return optionsCurrencies
  }

  function handleBlockchainChange(option: any) {

    formik.setFieldValue(blockchain.name, option ? option.value : null);

    const newCurrencyOptions = getCurrenciesByBlockchain(option?.value)
    setCurrenyOptions(newCurrencyOptions)
    
    formik.setFieldValue(currency.name, newCurrencyOptions && newCurrencyOptions?.length > 0 ? newCurrencyOptions[0]?.value : '')
  }

  useEffect(() => {

    setBlockchainOptions(convertChainsToSelectArray())
    setCurrenyOptions(getCurrenciesByBlockchain(blockchain?.initialValue))
    // handleBlockchainChange({ value: blockchain?.initialValue })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Blockchain */}
      <Field name={blockchain.name}>
        {({ field, form }: any) => (
          <FormControl isInvalid={form.errors.blockchain && form.touched.blockchain}>
            <FormLabel 
              fontSize={'16px'}
              fontWeight={'600'}
              htmlFor={blockchain.name}
            >
              {blockchain.label}
              </FormLabel>
            
              {
              blockchain.subLabel &&
              <Text
                color='#6B6B6B'
                fontSize='14px'
                fontStyle='normal'
                fontWeight='400'
                lineHeight='140%'
                textAlign={'justify'}
              >
                {blockchain.subLabel}
              </Text>
            }

            <Select
              name={blockchain.name}
              chakraStyles={chakraStyles}
              placeholder={blockchain.placeholder}
              variant="outline"
              useBasicStyles
              options={blockchainOptions}
              isDisabled={disabledBlockCurrency}
              value={
                blockchainOptions
                  ? blockchainOptions.find((option : any) => option.value === field.value)
                  : ''
              }
              onChange={async (option : any) => handleBlockchainChange(option)}
              onBlur={field.onBlur}
            />
            
            <FormErrorMessage>{form.errors.blockchain}</FormErrorMessage>
          </FormControl>
        )}
      </Field>

      {/* Currency and Price */}
      <Flex flexDir={"column"}>
        <FormLabel fontSize={"16px"} fontWeight={"600"} htmlFor={currency.name}>
          {currency.label}
        </FormLabel>

        {currency.subLabel && (
          <Text
            color="#6B6B6B"
            fontSize="14px"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="140%"
            textAlign={"justify"}
          >
            {currency.subLabel}
          </Text>
        )}

        {/* Inputs */}
        <Flex flexDir={"row"} gap={"16px"} w={"100%"}>

          {/* Currency */}
          <Box minW={"30%"}>
            <Field name={currency.name}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={!!form.errors.currency && !!form.touched.currency}
                >
                  <Select
                    chakraStyles={chakraStyles}
                    name={currency.name}
                    placeholder={currency.placeholder}
                    variant="outline"
                    useBasicStyles
                    options={currencyOptions}
                    value={
                      currencyOptions && field.value !== ''
                      ? currencyOptions.find(
                        (option: any) => option.value === field.value
                        )
                        : ""
                      }
                    isDisabled={disabledBlockCurrency}
                    onChange={(option: any) => {
                      form.setFieldValue(
                        currency.name,
                        option ? option.value : ""
                      );
                    }}
                    onBlur={field.onBlur}
                  />
                </FormControl>
              )}
            </Field>
          </Box>

          {/* Price */}
          {
            price &&
            <Box minW={"20%"} w={"40%"} alignSelf={"end"}>
              <Field name={price.name}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.price && !!form.touched.price
                    }
                  >
                    <InputGroup>
                      <Input 
                        {...field}  
                        id={price.name} 
                        placeholder={price.placeholder}
                      />
                    </InputGroup>
                  </FormControl>
                )}
              </Field>
            </Box>
          }
        </Flex>

        {/* Errors */}
        <Flex flexDir={"row"} gap={"16px"} w={"100%"}>
          {/* Currency */}
          <Box minW={"30%"}>
            <Field name={currency.name}>
              {({ form }: any) => (
                <FormControl
                  isInvalid={form.errors.currency && form.touched.currency}
                >
                  <FormErrorMessage>{form.errors.currency}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Box>
          {/* price */}
          {
            price &&
            <Box minW={"20%"} w={"40%"} alignSelf={"end"}>
              <Field name={price.name}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={
                      form.errors.price && form.touched.price
                    }
                  >
                    <FormErrorMessage>
                      {form.errors.price}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
          }
        </Flex>
      </Flex>
    </>
  );
};
