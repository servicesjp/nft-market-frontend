import {
  Box,
  FormControl,
  RadioGroup,
  Radio,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import style from "./team.module.css"
function Team(props: any) {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isTablet] = useMediaQuery("(max-width: 1024px)");
  const { team }: any = props.formField;
  const values = [{value:"1", label:"1"},
  {value:"2", label:" 2 to 5"},
  {value:"3", label:"6 to 10"},
  {value:"4", label:"11 to 25"},
  {value:"5", label:"26 to 50"},
  {value:"6", label:"+100"}];
  return (
    <Box width={"100%"}>
      <Box
        mb={"28px"} className="Euclid Circular A"
        fontSize={"24px"} fontWeight={600}
        color={"primary.250"}
      >
        {team.title}
      </Box>
      <Field name={team.name}>
        {({ field, form }: FieldProps) => (
          <FormControl
            isInvalid={!!form.errors.subject && !!form.touched.subject}
          >
            <RadioGroup {...field}>
              <Stack spacing={4} direction='row' display={"flex"} flexWrap={"wrap"}>
              {values.map((value, index) => (
                <Box
                  display="flex"
                  flexDirection={"row"}
                  key={index}
                  // py={"20px"}
                  // px={"10px"}
                  
                  borderRadius={"4px"}
                  boxShadow={"0px 4px 12px rgba(150, 150, 150, 0.1)"}
                  // width={"fit-content"}
                  {...(isMobile?{minW:"96px", height:"56px"}: isTablet? {minW:"116px", height:"60px"}: {minWidth:"136px", height:"64px"})}
                  gap={3}
                  justifyContent={"center"}
                  bg={"#FFFFFF"}
                  _hover={{
                    border:"1px solid #0026E6",
                    backgroundColor:"rgba(0, 38, 230, 0.06)",
                    color:"#000A3D"
                  }}

                  {...(value.value == field.value? {
                    border:"1px solid #0026E6",
                    backgroundColor:"rgba(0, 38, 230, 0.06)",
                    color:"#000A3D"
                  }: {
                    backgroundColor:"white"
                  })}
                >
                  <Radio width={"100%"} bg={"red"} textAlign={"center"} display={"flex"} justifyContent={"center"}
                  className={`radiofield ${style.radiofield} w-full h-full`} 
                  {...field} 
                  value={value.value}>
                    {value.label}
                  </Radio>
                </Box>
              ))}
              </Stack>
            </RadioGroup>
            {form.errors.team ? (
              <span style={{ color: "red", fontSize: "12px" }}>
                <>{form.errors.team}</>
              </span>
            ) : null}
          </FormControl>
        )}
      </Field>
    </Box>
  );
}

export default Team;
