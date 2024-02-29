import MultipleFileInput from "@/components/MultipleFileInput";
import useResponsive from "@/hooks/useResponsive";
import { Flex, FormControl, FormErrorMessage, FormLabel, Input, Text, Textarea } from "@chakra-ui/react";
import { ChakraStylesConfig, Select } from "chakra-react-select";
import { Field } from "formik";
import { motion } from 'framer-motion';
import { useState } from "react";

function GeneralInfo({ previous, formField } : any) {  
  const {
    photos,
    title,
    description,
    tags,
  } = formField
  
  const { isMobile, isTablet } = useResponsive();

  const [selectedRadios, setSelectedRadios] = useState<string[]>([]);

  const handleRadioChange = (value: string) => {
    setSelectedRadios((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };

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
  
  return (
    <motion.div
    initial={{ opacity: 0, x: previous ? -20: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.3 }}
    >
      <Flex flexDir={"column"} width={"100%"} gap={"24px"}>

        <MultipleFileInput formField={photos} />

        <Field name={title.name}>
          {({ field, form }: any) => (
            <FormControl isInvalid={form.errors[title.name] && form.touched[title.name]}>
              <FormLabel 
                fontSize={'16px'}
                fontWeight={'600'}
                htmlFor={title.name}
              >
                {title.label}
              </FormLabel>
              <Input {...field} id={title.name} placeholder={title.placeholder} />
              <FormErrorMessage>{form.errors[title.name]}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        
        <Field name={description.name}>
          {({ field, form }: any) => (
            <FormControl isInvalid={form.errors.description && form.touched.description}>
              <FormLabel 
                fontSize={'16px'}
                fontWeight={'600'}
                htmlFor={description.name}
              >
                {description.label}
              </FormLabel>
              {
                description.subLabel &&
                <Text
                  color='#6B6B6B'
                  fontSize='14px'
                  fontStyle='normal'
                  fontWeight='400'
                  lineHeight='140%'
                  textAlign={'justify'}
                >
                  {description.subLabel}
                </Text>
              }
              <Textarea {...field} id={description.name} placeholder={description.placeholder} />
              <FormErrorMessage>{form.errors.description}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

        <Field name={tags.name}>
          {({ field, form }: any) => (
            <FormControl isInvalid={form.errors.tags && form.touched.tags}>
              <FormLabel 
                fontSize={'16px'}
                fontWeight={'600'}
                htmlFor={tags.name}
              >
                {tags.label}
                </FormLabel>
              
              <Select
                isMulti
                chakraStyles={chakraStyles}
                name={tags.name}
                placeholder={tags.placeholder}
                variant="outline"
                useBasicStyles
                options={tags.options}
                value={
                  tags.options
                    ? tags.options.filter((option : any) => field.value.indexOf(option.value) >= 0)
                    : []
                }
                onChange={(selectedOptions) => {
                  form.setFieldValue(tags.name, selectedOptions ? selectedOptions.map((option : any) => option.value) : []);
                }}
              />
              
              <FormErrorMessage>{form.errors.tags}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Flex>
    </motion.div>
  );
}

export default GeneralInfo;
