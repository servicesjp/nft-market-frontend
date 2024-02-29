import { __ } from "@/helpers/common";
import { useCityApi, useCountryApi } from "@/hooks/useCountry";
import useResponsive from "@/hooks/useResponsive";
import { getNftTypeOptionsForMerchantRequest } from "@/types/NftType";
import { Box, Checkbox, CheckboxGroup, Flex, FormControl, FormLabel, Input, Stack, Text, Textarea, useTheme } from "@chakra-ui/react";
import { ChakraStylesConfig, Select } from "chakra-react-select";
import { Field, FieldProps } from "formik";
import { useEffect, useState } from "react";

function MerchantApplication(props: any) {
  const { 
    fullName,
    country,
    city,
    identityCardType,
    identityCardNumber,
    reason,
    businessDescription,
    nftTypes,
  }: any = props.formField;
  
  const { isMobile, isTablet } = useResponsive();

  const { getAllCountriesLikeOptions } = useCountryApi();
  const { getCitiesByCountryLikeOptions } = useCityApi();

  const [countriesOptions, setCountriesOptions] = useState<any>([])

  const [citiesOptions, setCitiesOptions] = useState<any>([])

  const [identityTypesOptions, setIdentityTypesOptions] = useState<any>([
    {
      label: 'DNI',
      value: "DNI",
    },
    {
      label: __('foreigner_card'),
      value: "Foreigner's card",
    },
    {
      label: __('passport'),
      value: "Passport",
    },
    {
      label: "RUC",
      value: "RUC",
    }
  ])
  
  // const nftOptions = [
  //   {value:"1", label:"Experience"},
  //   {value:"2", label:"Products"},
  //   {value:"3", label:"Digital art"},
  // ];
  const [nftOptions, setNftOptions] = useState<any[]>(getNftTypeOptionsForMerchantRequest())  

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

  useEffect(
    () => {
      const resultCountries = getAllCountriesLikeOptions()
      setCountriesOptions(resultCountries)
    }, []
  )
  
  const theme = useTheme();
  const gradientColor = theme.colors.gradient;

  return (
    <Flex flexDir={"column"} width={"100%"} gap={"24px"}>
      <Box
        fontSize={"24px"}
        fontWeight={500}
        color={"primary.250"}
        mt={'40px'}
        mb={'12px'}
      >
        {__('merchant_application_form')}
      </Box>

      {/* Full name fields */}
      <Flex
        flexDir={isMobile ? 'column': 'row'}
        gap={"24px"}
        w={"100%"}
      >
        <Box w={'100%'}>
          <Field name={fullName.name}>
            {({ field, form }: FieldProps) => (
              <FormControl
                isInvalid={!!form.errors.subject && !!form.touched.subject}
              >
                <FormLabel
                  mb={"12px"}
                  fontSize={"16px"}
                  fontWeight={500}
                  lineHeight={"20px"}
                  color={"primary.200"}
                >
                  {fullName.label}
                </FormLabel>
                
                <Input
                  {...field}
                  borderRadius={'4px'}
                  border={'1.5px solid #DDE3EE'}
                  placeholder={fullName.placeholder}
                  minW={"100%"}
                  width={"100%"}
                  bg={"white"}
                />
                
                {form.errors.fullName ? (
                  <Box 
                    style={{ color: "red", fontSize: "12px" }}
                    mx={"16px"}
                  >
                    <>{form.errors.fullName}</>
                  </Box>
                ) : null}
              
              </FormControl>
            )}
          </Field>
        </Box>
      </Flex>

      {/* Country and City fields */}
      <Flex
        flexDir={isMobile ? 'column': 'row'}
        gap={"24px"}
        w={"100%"}
      >
        <Box w={isMobile ? "100%": "50%"}>
          <Field name={country.name}>
            {({ field, form }: FieldProps) => (
              <FormControl
                isInvalid={!!form.errors.subject && !!form.touched.subject}
              >
                <FormLabel
                  mb={"12px"}
                  fontSize={"16px"}
                  fontWeight={500}
                  lineHeight={"20px"}
                  color={"primary.200"}
                >
                  {country.label}
                </FormLabel>
                
                <Select
                  className="bg-white"
                  chakraStyles={chakraStyles}
                  name={field.name}
                  placeholder={country.placeholder}
                  options={countriesOptions}
                  value={
                    countriesOptions
                      ? countriesOptions.find((option:any) => option?.value?.id === field?.value?.id)
                      : ""
                  }
                  onChange={(option: any) =>{
                    
                    form.setFieldValue(field.name, option?.value)

                    // reset options city
                    const resultCities = getCitiesByCountryLikeOptions(option?.value?.id)
                    
                    setCitiesOptions(resultCities)

                    // reset value city
                    form.setFieldValue(city.name, resultCities.length > 0 ? resultCities[0]?.value : '')
                    // console.log('resultCities[0]', resultCities[0]);
                    
                  }
                  }
                  onBlur={field.onBlur}
                />
                
                {form.errors.country ? (
                  <Box 
                    style={{ color: "red", fontSize: "12px" }}
                    mx={"16px"}
                  >
                    <>{form.errors.country}</>
                  </Box>
                ) : null}
              
              </FormControl>
            )}
          </Field>
        </Box>

        <Box w={isMobile ? "100%": "50%"}>
          <Field name={city.name}>
            {({ field, form }: FieldProps) => (
              <FormControl
                isInvalid={!!form.errors.subject && !!form.touched.subject}
              >
                <FormLabel
                  mb={"12px"}
                  fontSize={"16px"}
                  fontWeight={500}
                  lineHeight={"20px"}
                  color={"primary.200"}
                >
                  {city.label}
                </FormLabel>

                <Select
                  className="bg-white"
                  chakraStyles={chakraStyles}
                  name={field.name}
                  placeholder={city.placeholder}
                  options={citiesOptions}
                  value={
                    citiesOptions
                      ? citiesOptions.find((option:any) => option?.value?.id === field?.value?.id)
                      : ""
                  }
                  onChange={(option: any) =>{
                    
                    form.setFieldValue(field.name, option?.value)
                  }
                  }
                  onBlur={field.onBlur}
                />
                
                {form.errors.city ? (
                  <Box 
                    style={{ color: "red", fontSize: "12px" }}
                    mx={"16px"}
                  >
                    <>{form.errors.city}</>
                  </Box>
                ) : null}
              
              </FormControl>
            )}
          </Field>
        </Box>
      </Flex>
      
      {/* Identity Type and number fields */}
      <Flex
        flexDir={isMobile ? 'column': 'row'}
        gap={"24px"}
        w={"100%"}
      >
        <Box w={isMobile ? "100%": "40%"}>
          <Field name={identityCardType.name}>
            {({ field, form }: FieldProps) => (
              <FormControl
                isInvalid={!!form.errors.subject && !!form.touched.subject}
              >
                <FormLabel
                  mb={"12px"}
                  fontSize={"16px"}
                  fontWeight={500}
                  lineHeight={"20px"}
                  color={"primary.200"}
                >
                  {identityCardType.label}
                </FormLabel>
                
                <Select
                  className="bg-white"
                  chakraStyles={chakraStyles}
                  name={field.name}
                  placeholder={identityCardType.placeholder}
                  options={identityTypesOptions}
                  value={
                    identityTypesOptions
                      ? identityTypesOptions.find((option:any) => option.value === field.value)
                      : ""
                  }
                  onChange={(option: any) =>{
                    
                    form.setFieldValue(field.name, option?.value)
                  }
                  }
                  onBlur={field.onBlur}
                />
                
                {form.errors.identityType ? (
                  <Box 
                    style={{ color: "red", fontSize: "12px" }}
                    mx={"16px"}
                  >
                    <>{form.errors.identityType}</>
                  </Box>
                ) : null}
              
              </FormControl>
            )}
          </Field>
        </Box>

        <Box w={isMobile ? "100%": "60%"}>
          <Field name={identityCardNumber.name}>
            {({ field, form }: FieldProps) => (
              <FormControl
                isInvalid={!!form.errors.subject && !!form.touched.subject}
              >
                {
                  !isMobile && (

                    <FormLabel
                      mb={"12px"}
                      fontSize={"16px"}
                      fontWeight={500}
                      lineHeight={"20px"}
                      color={"primary.200"}
                      opacity={0}
                    >
                      {identityCardNumber.label}
                    </FormLabel>
                  )
                }

                <Input
                  {...field}
                  borderRadius={'4px'}
                  border={'1.5px solid #DDE3EE'}
                  placeholder={identityCardNumber.placeholder}
                  minW={"100%"}
                  width={"100%"}
                  bg={"white"}
                />
                
                {form.errors.identity ? (
                  <Box 
                    style={{ color: "red", fontSize: "12px" }}
                    mx={"16px"}
                  >
                    <>{form.errors.identity}</>
                  </Box>
                ) : null}
              
              </FormControl>
            )}
          </Field>
        </Box>
      </Flex>
      
      {/* merchant reason field */}
      <Flex
        flexDir={isMobile ? 'column': 'row'}
        gap={"24px"}
        w={"100%"}
      >
        <Box w={"100%"}>
          <Field name={reason.name}>
            {({ field, form }: FieldProps) => (
              <FormControl
                isInvalid={!!form.errors.subject && !!form.touched.subject}
              >
                <FormLabel
                  mb={"12px"}
                  fontSize={"16px"}
                  fontWeight={500}
                  lineHeight={"20px"}
                  color={"primary.200"}
                >
                  {reason.label}
                </FormLabel>
                
                <Textarea
                  {...field}
                  resize={'none'}
                  placeholder={reason.placeholder}
                />
                
                {form.errors.reason ? (
                  <Box 
                    style={{ color: "red", fontSize: "12px" }}
                    mx={"16px"}
                  >
                    <>{form.errors.reason}</>
                  </Box>
                ) : null}
              
              </FormControl>
            )}
          </Field>
        </Box>
      </Flex>

      {/* businessDescription field */}
      <Flex
        flexDir={isMobile ? 'column': 'row'}
        gap={"24px"}
        w={"100%"}
      >
        <Box w={"100%"}>
          <Field name={businessDescription.name}>
            {({ field, form }: FieldProps) => (
              <FormControl
                isInvalid={!!form.errors.subject && !!form.touched.subject}
              >
                <FormLabel
                  mb={"12px"}
                  fontSize={"16px"}
                  fontWeight={500}
                  lineHeight={"20px"}
                  color={"primary.200"}
                >
                  {businessDescription.label}
                </FormLabel>
                
                <Textarea
                  {...field}
                  resize={'none'}
                  placeholder={businessDescription.placeholder}
                />
                
                {form.errors.businessDescription ? (
                  <Box 
                    style={{ color: "red", fontSize: "12px" }}
                    mx={"16px"}
                  >
                    <>{form.errors.businessDescription}</>
                  </Box>
                ) : null}
              
              </FormControl>
            )}
          </Field>
        </Box>
      </Flex>

      {/* nft fields */}
      <Flex
        gap={"24px"}
        w={"100%"}
      >
        <Field 
          name={nftTypes.name}
        >
          {({ field, form }: FieldProps) => (
            <FormControl
              isInvalid={!!form.errors.subject && !!form.touched.subject}
            >
              
              <FormLabel
                mb={"12px"}
                fontSize={"16px"}
                fontWeight={500}
                lineHeight={"20px"}
                color={"primary.200"}
              >
                {nftTypes.label}
              </FormLabel>

              <CheckboxGroup
                {...field} 
                value={field.value}
                onChange={(value) => form.setFieldValue(field.name, value)}
              >
                <Stack 
                  spacing={'24px'} 
                  direction={isMobile ? 'column': 'row'}
                  width={"100%"}
                >
                  {
                    nftOptions.map((value, index)=>(
                      <Box
                      key={index}
                      px={'16px'}
                      py={'12px'}
                      borderRadius={"4px"}
                      border={optionNFTChecked(field, value?.value) ? '1.5px solid #0047BB' : '1.5px solid #DDE3EE'}
                      width={"100%"}
                      gap={3}
                      bg={"#FFFFFF"}
                    >
                      <Checkbox 
                        // className={`customRadio ${style.customRadio}`}
                        {...field}
                        // icon={<CustomIcon />}
                        // iconSize={0}
                        display={"flex"} 
                        flexDirection={"row"} 
                        gap={'4px'}
                        value={value.value}
                      > 
                        <Text 
                          fontSize={"14px"}
                          color={"gray.400"}
                          textAlign={'center'}
                        >
                          {value.label}
                        </Text>
                      </Checkbox>
                    </Box>
                    ))
                  }
                </Stack>
              </CheckboxGroup>
              
              {form.errors.nftType ? (
                <Box 
                  style={{ color: "red", fontSize: "12px" }}
                  mx={"16px"}
                >
                  <>{form.errors.nftType}</>
                </Box>
              ) : null}
            
            </FormControl>
          )}
        </Field>
      </Flex>
    </Flex>
  );
}

export default MerchantApplication;
