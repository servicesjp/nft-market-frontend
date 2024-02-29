import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Stack,
  Flex,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import style from "./team.module.css"
import WalletTickIcon from '@/assets/icons/wallet-tick.svg';
import UserProfileIcon from '@/assets/icons/users-profile.svg';
import { Field, FieldProps } from "formik";
function CapitalProject(props: any) {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isTablet] = useMediaQuery("(max-width: 1024px)");
  const { capitalProject }: any = props.formField;
  const values = [
  {value:"1", label:"Equity capital"},
  {value:"2", label:"Third-party capital"}];

  function updateComponent(num: any){
    switch (num) {
      case 0:
        return <WalletTickIcon />;
      case 1:
        return <UserProfileIcon/>;
      default:
        return <div></div>;
    }
  }
  return (
    <Box width={"100%"}>
      <Box
        mb={"28px"} className="Euclid Circular A"
        fontSize={"24px"} fontWeight={600} 
        color={"primary.250"}
      >
        {capitalProject.title}
      </Box>
      <Field name={capitalProject.name}>
        {({ field, form }: FieldProps) => (
          <FormControl
            isInvalid={!!form.errors.subject && !!form.touched.subject}
          >
            <FormLabel
              className="SF Pro Text"
              fontSize={"16px"}
              fontWeight={500}
              lineHeight={"20px"}
              color={"gray.100"}
            >
              {capitalProject.label}
            </FormLabel>
            <RadioGroup {...field}>
              <Stack spacing={4} direction='column' width={"100%"} 
              className={`stack ${style.stack}`}>
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
                  size={"lg"}
                  display={"flex"} 
                  flexDirection={"row-reverse"} 
                  justifyContent={"space-between"} 
                  px={"10px"}
                  m={0}
                  {...field} 
                    value={value.value}>
                      <Flex gap={2} >
                      
                      <Box>{updateComponent(index)}</Box>  
                    <Text fontSize={"16px"} color={"gray.400"}>
                      {value.label}
                  </Text>
                      
                      </Flex>
                    
                  </Radio>
                </Box>
              ))}
              </Stack>
            </RadioGroup>
            {form.errors.capitalProject ? (
              <span style={{ color: "red", fontSize: "12px" }}>
                <>{form.errors.capitalProject}</>
              </span>
            ) : null}
          </FormControl>
        )}
      </Field>
    </Box>
  );
}

export default CapitalProject;
