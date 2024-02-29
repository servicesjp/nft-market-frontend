import {
    Box,
    FormControl,
    Stack,
    useMediaQuery,
    CheckboxGroup,
    Checkbox ,
  } from "@chakra-ui/react";
  import style from "./team.module.css"
  import { Field, FieldProps } from "formik";
  function Consulting(props: any) {
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const [isTablet] = useMediaQuery("(max-width: 1024px)");
    const { consulting }: any = props.formField;
    const values = [
    {value:"1", label:"Marketing and Business"},
    {value:"2", label:"Finance and Legal"},
    {value:"3", label:"No, I have everything I need"}];
  
    return (
      <Box width={"100%"}>
        <Box
          mb={"28px"} className="Euclid Circular A"
          fontSize={"24px"} fontWeight={600}
          color={"primary.250"}
        >
          {consulting.title}
        </Box>
        <Field name={consulting.name}>
          {({ field, form }: FieldProps) => (
            <FormControl
              isInvalid={!!form.errors.subject && !!form.touched.subject}
            >
              {/* <RadioGroup {...field}>
                <Stack spacing={4} direction='column' width={"100%"}>
                {values.map((value, index) => (
                  <Box
                    key={index}
                    py={"20px"}
                    px={"10px"}
                    borderRadius={"4px"}
                    boxShadow={"0px 4px 12px rgba(150, 150, 150, 0.1)"}
                    width={"100%"}
                    gap={3}
                    bg={"#FFFFFF"}
                  >
                    <Radio 
                    className={`customRadio ${style.customRadio}`}
                    display={"flex"} 
                    flexDirection={"row-reverse"} 
                    justifyContent={"space-between"} 
                    {...field} 
                      value={value.value}>
                        {value.label}
                    </Radio>
                  </Box>
                ))}
                </Stack>
              </RadioGroup> */}
              <CheckboxGroup {...field} value={field.value} onChange={(value) => form.setFieldValue(field.name, value)} >
              <Stack spacing={4} direction='column' width={"100%"}>
                {
                  values.map((value, index)=>(
                    <Box
                    key={index}
                    py={"20px"}
                    px={"10px"}
                    borderRadius={"4px"}
                    boxShadow={"0px 4px 12px rgba(150, 150, 150, 0.1)"}
                    width={"100%"}
                    gap={3}
                    bg={"#FFFFFF"}
                  >
                    <Checkbox 
                    className={`customRadio ${style.customRadio}`}
                    type="checkbox"
                    display={"flex"} 
                    flexDirection={"row-reverse"} 
                    justifyContent={"space-between"} 
                    {...field} 
                      value={value.value}> {value.label}</Checkbox>
                  </Box>
                  ))
                }
              </Stack>
              </CheckboxGroup>
              {form.errors.consulting ? (
                <span style={{ color: "red", fontSize: "12px" }}>
                  <>{form.errors.consulting}</>
                </span>
              ) : null}
            </FormControl>
          )}
        </Field>
      </Box>
    );
  }
  
  export default Consulting;
  