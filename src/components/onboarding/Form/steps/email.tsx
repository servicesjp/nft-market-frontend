
import { Box,FormControl, FormLabel, Input  } from "@chakra-ui/react";
import {  Field,  FieldProps } from "formik";
function Email(props: any) {
    const { email }: any =
    props.formField;


  return (
    <Box width={"100%"}>
        <Box mb={"28px"} className="Euclid Circular A"
        fontSize={"24px"} fontWeight={600}  color={"primary.250"}>{email.title}</Box>
        <Field name={email.name}>
            {({ field, form }: FieldProps) => (
              <FormControl isInvalid={!!form.errors.subject && !!form.touched.subject}>
                <FormLabel 
                className="SF Pro Text"
                fontSize={"16px"}
                fontWeight={500}
                lineHeight={"20px"}
                mb={"12px"}
                color={"primary.200"}>{email.label}</FormLabel>
                <Input {...field} placeholder={email.placeholder} minW={"100%"} width={"100%"} bg={"white"} />
                {form.errors.email ?  (
                  <span style={{color:"red", fontSize:"12px"}}><>{form.errors.email}</></span>
                ): null}
              </FormControl>
            )}
          </Field>
    </Box>
  );
}

export default Email
