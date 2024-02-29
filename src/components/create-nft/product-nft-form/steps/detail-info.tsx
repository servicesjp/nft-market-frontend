import useResponsive from "@/hooks/useResponsive";
import { Box, Flex, FormControl, FormErrorMessage, FormLabel, Radio, RadioGroup, SimpleGrid, Text } from "@chakra-ui/react";
import { ChakraStylesConfig, Select } from "chakra-react-select";
import { Field } from "formik";
import { motion } from 'framer-motion';
import { useState } from "react";


function DetailInfo({ previous, formField } : any) {  
  const {
    category,
    brand,
    condition,
    color,
  } = formField
  
  const { isMobile, isTablet } = useResponsive();

  const [checked, setChecked] = useState<boolean>(false);

  const chakraStyles: ChakraStylesConfig = {
    dropdownIndicator: (provided, state) => ({
      ...provided,
      background: state.isFocused ? "blue.100" : "primary.100",
      color:"primary.100",
      backgroundColor:"white",
      p: 0,
      w: "40px",

    }),
    downChevron: (provided, state) => ({
      color: "#999FBB"

    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused || state.isSelected ? "rgba(214, 221, 255, 0.3)" : "white",
      color: state.isFocused ||  state.isSelected ? "primary.100" : "#999FBB",
    })
  };

  function optionNFTChecked(field : any, value : string) {    
    return field.value.includes(value);
  }
  // const formik : any = useFormikContext();
  // console.log(formik.values);
  
  return (
    <motion.div
    initial={{ opacity: 0, x: previous ? -20: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.3 }}
    >
      <Flex flexDir={"column"} width={"100%"} gap={"24px"}>

        <Field name={category.name}>
          {({ field, form }: any) => (
            <FormControl isInvalid={form.errors.category && form.touched.category}>
              <FormLabel 
                fontSize={'16px'}
                fontWeight={'600'}
                htmlFor={category.name}
              >
                {category.label}
                </FormLabel>
              
                {
                category.subLabel &&
                <Text
                  color='#6B6B6B'
                  fontSize='14px'
                  fontStyle='normal'
                  fontWeight='400'
                  lineHeight='140%'
                  textAlign={'justify'}
                >
                  {category.subLabel}
                </Text>
              }

              <Select
                chakraStyles={chakraStyles}
                name={category.name}
                placeholder={category.placeholder}
                variant="outline"
                useBasicStyles
                options={category.options}
                value={
                  category.options
                    ? category.options.find((option: any) => option.value === field.value)
                    : ''
                }
                onChange={(option : any) => {
                  form.setFieldValue(category.name, option ? option.value : '');
                }}
              />
              
              <FormErrorMessage>{form.errors.category}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

        <Field name={brand.name}>
          {({ field, form }: any) => (
            <FormControl isInvalid={form.errors.brand && form.touched.brand}>
              <FormLabel 
                fontSize={'16px'}
                fontWeight={'600'}
                htmlFor={brand.name}
              >
                {brand.label}
                </FormLabel>
              
                {
                brand.subLabel &&
                <Text
                  color='#6B6B6B'
                  fontSize='14px'
                  fontStyle='normal'
                  fontWeight='400'
                  lineHeight='140%'
                  textAlign={'justify'}
                >
                  {brand.subLabel}
                </Text>
              }

              <Select
                chakraStyles={chakraStyles}
                name={brand.name}
                placeholder={brand.placeholder}
                variant="outline"
                useBasicStyles
                options={brand.options}
                value={
                  brand.options
                    ? brand.options.find((option: any) => option.value === field.value)
                    : ''
                }
                onChange={(option : any) => {
                  form.setFieldValue(brand.name, option ? option.value : '');
                }}
              />
              
              <FormErrorMessage>{form.errors.brand}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

        <Field name={condition.name}>
          {({ field, form }: any) => (
            <FormControl
              isInvalid={
                form.errors.condition && form.touched.condition
              }
            >
              <FormLabel
                fontSize={"16px"}
                fontWeight={"600"}
                htmlFor={condition.name}
              >
                {condition.label}
              </FormLabel>
              {condition.subLabel && (
                <Text
                  color="#6B6B6B"
                  fontSize="14px"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="140%"
                  textAlign={"justify"}
                >
                  {condition.subLabel}
                </Text>
              )}

              <RadioGroup {...field} w={"100%"} h={"100%"}>
                <SimpleGrid
                  columns={isMobile ? 1 : 2}
                  spacing={'16px'}
                  w={"100%"}
                  h={"100%"}
                  justifyContent={isMobile ? "center" : "start"}
                >
                  {condition.options.map((value: any, index: number) => (
                    <Box
                      display="flex"
                      flexDirection={"row"}
                      key={index}
                      borderRadius={"4px"}
                      boxShadow={"0px 4px 12px rgba(150, 150, 150, 0.1)"}
                      // {...(isMobile
                      //   ? { minW: "96px", height: "56px" }
                      //   : isTablet
                      //   ? { minW: "116px", height: "60px" }
                      //   : { minWidth: "136px", height: "64px" })}
                      gap={'12px'}
                      p={'16px'}
                      justifyContent={"center"}
                      bg={"#FFFFFF"}
                      _hover={{
                        border: "1px solid #0026E6",
                        backgroundColor: "rgba(0, 38, 230, 0.06)",
                        color: "#000A3D",
                      }}
                      {...(value.value == field.value
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
                        value={value.value}
                      >
                        {value.label}
                      </Radio>
                    </Box>
                  ))}
                </SimpleGrid>
              </RadioGroup>

              <FormErrorMessage>{form.errors.condition}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

        <Field name={color.name}>
          {({ field, form }: any) => (
            <FormControl isInvalid={form.errors.color && form.touched.color}>
              <FormLabel 
                fontSize={'16px'}
                fontWeight={'600'}
                htmlFor={color.name}
              >
                {color.label}
                </FormLabel>
              
                {
                color.subLabel &&
                <Text
                  color='#6B6B6B'
                  fontSize='14px'
                  fontStyle='normal'
                  fontWeight='400'
                  lineHeight='140%'
                  textAlign={'justify'}
                >
                  {color.subLabel}
                </Text>
              }

              <Select
                chakraStyles={chakraStyles}
                name={color.name}
                placeholder={color.placeholder}
                variant="outline"
                useBasicStyles
                options={color.options}
                value={
                  color.options
                    ? color.options.find((option: any) => option.value === field.value)
                    : ''
                }
                onChange={(option : any) => {
                  form.setFieldValue(color.name, option ? option.value : '');
                }}
              />
              
              <FormErrorMessage>{form.errors.color}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        
      </Flex>
    </motion.div>
  );
}

export default DetailInfo;
