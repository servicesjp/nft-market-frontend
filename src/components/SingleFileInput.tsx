import React, { ChangeEvent } from 'react';
import { Field, useField } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage, Text, Image, Flex, Box } from '@chakra-ui/react';
import { showErrorToast } from './toast';
import { __ } from '@/helpers/common';

interface SingleFileInputProps {
  formField: any;
  id?: string;
}


const SingleFileInput: React.FC<SingleFileInputProps> = ({
  formField,
  ...props
}) => {
  const [field, meta, helpers] = useField<File[]>(formField.name);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = Array.from(event.target.files || [])[0];
    if (file) {
      const fileName = file.name.toLowerCase();
      const fileExtension = fileName.split(".").pop(); // Get the file extension
      if (formField.supportedFileTypes.includes(fileExtension)) {
        helpers.setValue([file]);
      } else {
        showErrorToast(
          __('selected_file_not_supported')
        );
        event.target.value = "";
      }
    }
  };

  return (
    <Field name={formField.name}>
      {({ field, form }: any) => (
        <FormControl
          isInvalid={
            form.errors[formField.name] && form.touched[formField.name]
          }
        >
          <Flex width="100%" flexDir={"row"} gap={"16px"}>
            <Box flex="1" w="100%" gap={"8px"}>
              <FormLabel m={0} htmlFor={formField.name}>
                <Text
                  cursor={"pointer"}
                  as="span"
                  fontWeight="400"
                  className={"cross"}
                  borderRadius={"4px"}
                  color="gray.400"
                  display="flex"
                  flexDirection="column"
                  textAlign={"center"}
                  h={"165px"}
                  backgroundImage={
                    field.value && field.value.length > 0
                      ? URL.createObjectURL(field.value[0])
                      : ""
                  }
                  backgroundSize={"cover"}
                >
                  <Image
                    src={formField.icon}
                    opacity={field?.value?.length > 0 ? 0 : 1}
                    alt="file"
                  />
                </Text>

                <Input
                  id={formField.name}
                  display={"none"}
                  type="file"
                  {...field}
                  value={[]}
                  onChange={handleFileChange}
                />
              </FormLabel>
            </Box>

            {/* <Flex flex="1" flexDirection="column" gap={'13px'}>
              <Flex flex="1" flexDirection="row" gap={'16px'}>
                <Box bg="green" h="100%" flex="1">
                  Div 1
                </Box>
                <Box bg="green" h="100%" flex="1">
                  Div 2
                </Box>
              </Flex>
              <Flex flex="1" flexDirection="row" gap={'16px'}>
                <Box bg="green" h="100%" flex="1">
                  Div 3
                </Box>
                <Box bg="green" h="100%" flex="1">
                  Div 4
                </Box>
              </Flex>
            </Flex> */}
          </Flex>

          <FormErrorMessage>{form.errors[formField.name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default SingleFileInput;
