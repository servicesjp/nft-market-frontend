import useResponsive from "@/hooks/useResponsive";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import { ChakraStylesConfig, Select } from "chakra-react-select";
import { Field } from "formik";
import { motion } from "framer-motion";
import style from "./step-info.module.css";
import { useEffect, useState } from "react";
import { useCategoryApi } from "@/hooks/useApi";
import { NftType } from "@/types/NftType";
import { __ } from "@/helpers/common";

function GeneralInfo({ previous, formField }: any) {
  const { category, experienceTitle, description, serviceInclude, additionalInfo } = formField;

  const { isMobile } = useResponsive();

  const { getCategories } = useCategoryApi()
  const [categoriesOptions, setCategoriesOptions] = useState<any[]>([])

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

  async function getExpCategories() {
    try {
      const response = await getCategories({
        nftType: NftType.EXPERIENCE
      })
  
      const data: any[] = response.data
      const newCategoriesOptions = data.map((category: any) => {
        return {
          label: __(category?.translateKey),
          value: category?.id
        }
      })

      setCategoriesOptions(newCategoriesOptions)
      
    } catch (error: any) {
      console.log(error);
      
    }
    
  }

  useEffect(() => {
    getExpCategories()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: previous ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Flex flexDir={"column"} width={"100%"} gap={"14px"}>
        <Field name={category.name}>
          {({ field, form }: any) => (
            <FormControl
              isInvalid={form.errors.category && form.touched.category}
            >
              <FormLabel
                fontSize={"16px"}
                fontWeight={"600"}
                htmlFor={category.name}
              >
                {category.label}
              </FormLabel>

              <Select
                chakraStyles={chakraStyles}
                name={category.name}
                placeholder={category.placeholder}
                variant="outline"
                useBasicStyles
                options={categoriesOptions}
                value={
                  categoriesOptions
                    ? categoriesOptions.find(
                        (option: any) => option.value === field.value
                      )
                    : ""
                }
                onChange={(option: any) => {
                  form.setFieldValue(category.name, option ? option.value : "");
                }}
              />

              <FormErrorMessage>{form.errors.category}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

        <Field name={experienceTitle.name}>
          {({ field, form }: any) => (
            <FormControl
              isInvalid={
                form.errors[experienceTitle.name] &&
                form.touched[experienceTitle.name]
              }
            >
              <FormLabel
                fontSize={"16px"}
                fontWeight={"600"}
                htmlFor={experienceTitle.name}
              >
                {experienceTitle.label}
              </FormLabel>
              <Input
                {...field}
                id={experienceTitle.name}
                placeholder={experienceTitle.placeholder}
              />
              <FormErrorMessage>
                {form.errors[experienceTitle.name]}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>

        <Field name={description.name}>
          {({ field, form }: any) => (
            <FormControl
              isInvalid={form.errors.description && form.touched.description}
            >
              <FormLabel
                fontSize={"16px"}
                fontWeight={"600"}
                htmlFor={description.name}
              >
                {description.label}
              </FormLabel>
              {description.subLabel && (
                <Text
                  color="#6B6B6B"
                  fontSize="14px"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="140%"
                  textAlign={"justify"}
                >
                  {description.subLabel}
                </Text>
              )}
              <Textarea
                {...field}
                id={description.name}
                placeholder={description.placeholder}
              />
              <FormErrorMessage>{form.errors.description}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

        {/* Additional info */}
        <Field name={additionalInfo.name}>
          {({ field, form }: any) => (
            <FormControl
              isInvalid={
                form.errors.additionalInfo && form.touched.additionalInfo
              }
            >
              <Flex flexDir={"row"} gap={"8px"} justifyContent={"start"}>

                <Flex flexDir={"column"} alignItems={"start"}>
                  <Text fontSize={"16px"} fontWeight={"600"}>
                    {additionalInfo.label}
                  </Text>

                  {additionalInfo.subLabel && (
                    <Text
                      w={"90%"}
                      color="#6B6B6B"
                      fontSize="14px"
                      fontStyle="normal"
                      fontWeight="400"
                      lineHeight="140%"
                      textAlign={"justify"}
                    >
                      {additionalInfo.subLabel}
                    </Text>
                  )}
                </Flex>
              </Flex>
              <Textarea
                {...field}
                id={additionalInfo.name}
                placeholder={additionalInfo.placeholder}
              />
              <FormErrorMessage>{form.errors.additionalInfo}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

        <Field name={serviceInclude.name}>
          {({ field, form }: any) => (
            <FormControl
              isInvalid={
                form.errors.serviceInclude && form.touched.serviceInclude
              }
            >
              <FormLabel
                fontSize={"16px"}
                fontWeight={"600"}
                htmlFor={serviceInclude.name}
              >
                {serviceInclude.label}
              </FormLabel>
              {serviceInclude.subLabel && (
                <Text
                  color="#6B6B6B"
                  fontSize="14px"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="140%"
                  textAlign={"justify"}
                >
                  {serviceInclude.subLabel}
                </Text>
              )}

              <CheckboxGroup
                {...field}
                value={field.value}
                onChange={(value) => form.setFieldValue(field.name, value)}
                w={"100%"}
                h={"100%"}
              >
                <SimpleGrid
                  columns={isMobile ? 2 : 3}
                  spacing={"16px"}
                  w={"100%"}
                  h={"100%"}
                  justifyContent={isMobile ? "center" : "start"}
                >
                  {serviceInclude.options.map((value: any, index: number) => (
                    <Box
                      display="flex"
                      flexDirection={"row"}
                      key={index}
                      borderRadius={"4px"}
                      boxShadow={"0px 4px 12px rgba(150, 150, 150, 0.1)"}
                      gap={"12px"}
                      p={"16px"}
                      justifyContent={"center"}
                      bg={"#FFFFFF"}
                      // _hover={{
                      //   border: "1px solid #0026E6",
                      //   backgroundColor: "rgba(0, 38, 230, 0.06)",
                      //   color: "#000A3D",
                      // }}

                      {...(field.value.includes(value.value)
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
                      <Checkbox
                        width={"100%"}
                        textAlign={"justify"}
                        display={"flex"}
                        justifyContent={"start"}
                        // className={`radiofield ${style.radiofield} w-full h-full`}
                        className={`customRadio ${style.customRadio}`}
                        {...field}
                        value={value.value}
                      >
                        <Image src={value.icon} alignSelf={"start"} alt="" />
                        {value.label}
                      </Checkbox>
                    </Box>
                  ))}
                </SimpleGrid>
              </CheckboxGroup>

              <FormErrorMessage>{form.errors.serviceInclude}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Flex>
    </motion.div>
  );
}

export default GeneralInfo;
