import MultipleFileInput from "@/components/MultipleFileInput";
import { Flex, FormControl, FormErrorMessage, FormLabel, Text } from "@chakra-ui/react";
import { Field } from "formik";
import { motion } from "framer-motion";

function FilesStep({ previous, formField }: any) {
  const { photos, profile } = formField;

  return (
    <motion.div
      initial={{ opacity: 0, x: previous ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Flex flexDir={"column"} width={"100%"} gap={"24px"}>
        <Field name={photos.name}>
          {({ field, form }: any) => (
            <FormControl
              isInvalid={
                form.errors[photos.name] && form.touched[photos.name]
              }
            >
              <FormLabel
                fontSize={"16px"}
                fontWeight={"600"}
                htmlFor={photos.name}
              >
                {photos.label}
              </FormLabel>
              {photos.subLabel && (
                <Text
                  color="#6B6B6B"
                  fontSize="14px"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="140%"
                  textAlign={"justify"}
                >
                  {photos.subLabel}
                </Text>
              )}
              <MultipleFileInput
                formField={photos}
              />
              <FormErrorMessage>{form.errors[photos.name]}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

        <Field name={profile.name}>
          {({ field, form }: any) => (
            <FormControl
              isInvalid={
                form.errors[profile.name] && form.touched[profile.name]
              }
            >
              <FormLabel
                fontSize={"16px"}
                fontWeight={"600"}
                htmlFor={profile.name}
              >
                {profile.label}
              </FormLabel>
              {profile.subLabel && (
                <Text
                  color="#6B6B6B"
                  fontSize="14px"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="140%"
                  textAlign={"justify"}
                >
                  {profile.subLabel}
                </Text>
              )}
              <MultipleFileInput
                formField={profile}
              />
              <FormErrorMessage>{form.errors[profile.name]}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Flex>
    </motion.div>
  );
}

export default FilesStep;
