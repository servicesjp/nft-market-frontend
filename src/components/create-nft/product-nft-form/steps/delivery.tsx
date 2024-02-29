// import { PriceInput } from "@/components/price-input";
import useResponsive from "@/hooks/useResponsive";
import {
  Box,
  Divider,
  Flex, FormControl, FormErrorMessage, FormLabel, Radio, RadioGroup,
  Text
} from "@chakra-ui/react";
import { ChakraStylesConfig, Select } from "chakra-react-select";
import { Field } from "formik";
import { motion } from "framer-motion";

function Delivery({ previous, formField }: any) {
  const { delivery, deliveryDetail, currency, pricePerPerson } = formField;

  const { isMobile, isTablet } = useResponsive();

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

  return (
    <motion.div
      initial={{ opacity: 0, x: previous ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Flex flexDir={"column"} width={"100%"} gap={"14px"}>

        {/* Delivery */}
        <Field name={delivery.name}>
          {({ field, form }: any) => (
            <FormControl
              isInvalid={
                form.errors.delivery && form.touched.delivery
              }
            >
              <FormLabel
                fontSize={"16px"}
                fontWeight={"600"}
                htmlFor={delivery.name}
              >
                {delivery.label}
              </FormLabel>
              {delivery.subLabel && (
                <Text
                  color="#6B6B6B"
                  fontSize="14px"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="140%"
                  textAlign={"justify"}
                >
                  {delivery.subLabel}
                </Text>
              )}

              <RadioGroup {...field} w={"100%"} h={"100%"}>
                <Flex
                  flexDir={'column'}
                >
                  {delivery.options.map((option: any, index: number) => (
                    <>
                      {index > 0 ? <Divider my={'16px'} /> : ''}
                      <Box
                        display="flex"
                        flexDirection={"column"}
                        key={index}
                        borderRadius={"4px"}
                        gap={'12px'}
                        p={'16px'}
                        justifyContent={"center"}
                        alignContent={'center'}
                        bg={"#FFFFFF"}
                        _hover={{
                          border: "1px solid #0026E6",
                          backgroundColor: "rgba(0, 38, 230, 0.06)",
                          color: "#000A3D",
                        }}
                        {...(option.value === field.value
                          ? {
                              border: "1px solid #0026E6",
                              backgroundColor: "rgba(0, 38, 230, 0.06)",
                              color: "#000A3D",
                            }
                          : {
                              border: "1px solid #FFF",
                              backgroundColor: "white",
                            })}
                      >
                        <Radio
                          width={"100%"}
                          
                          textAlign={"justify"}
                          display={"flex"}
                          justifyContent={"start"}
                          {...field}
                          value={option.value}
                        >
                          <Text
                            color='#231C35'
                            fontSize='16px'
                            fontStyle='normal'
                            fontWeight='600'
                            lineHeight='124%'
                          >
                            {option.label}
                          </Text>
                          <Text
                            color="#6B6B6B"
                            fontSize="14px"
                            fontStyle="normal"
                            fontWeight="400"
                            lineHeight="140%"
                            textAlign={"justify"}
                          >
                            {option.desc}
                          </Text>
                        </Radio>


                      </Box>
                      {
                        option.options && option.value === field.value ? 
                        <Field name={deliveryDetail.name}>
                            {({ field, form }: any) => (
                              <FormControl>
                                <Flex
                                  flexDir={'column'}
                                  ml={'40px'}
                                  mt={'12px'}
                                  gap={'12px'}
                                >
                                <Text
                                  color='#231C35'
                                  fontSize='16px'
                                  fontStyle='normal'
                                  fontWeight='600'
                                  lineHeight='124%'
                                >
                                  {option.subLabel}
                                </Text>
                                <Select
                                  chakraStyles={chakraStyles}
                                  name={deliveryDetail.name}
                                  placeholder={deliveryDetail.placeholder}
                                  variant="outline"
                                  useBasicStyles
                                  options={delivery.options[0].options}
                                  value={
                                    delivery.options[0].options
                                      ? delivery.options[0].options.find((subOption: any) => subOption.value === field.value)
                                      : ''
                                  }
                                  onChange={(subOption : any) => {
                                    form.setFieldValue(deliveryDetail.name, subOption ? subOption.value : '');
                                  }}
                                />
                                
                                <FormErrorMessage>{form.errors.delivery}</FormErrorMessage>
                                </Flex>
                              </FormControl>
                            )}
                        </Field>
                        :
                        ''
                      }
                    </>
                  ))}
                </Flex>
              </RadioGroup>

              <FormErrorMessage>{form.errors.delivery}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

        {/* Pricing */}
        {/* <PriceInput currency={currency} price={pricePerPerson}></PriceInput> */}

      </Flex>
    </motion.div>
  );
}

export default Delivery;
