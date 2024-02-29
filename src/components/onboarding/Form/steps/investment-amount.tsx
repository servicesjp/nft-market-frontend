
import { Box,FormControl, FormLabel, Input  } from "@chakra-ui/react";
import {  Field,  FieldProps } from "formik";
import SearchImage from "@/modules/onboarding/search";
import {
  ChakraStylesConfig,
  Select,
} from "chakra-react-select";
function InvestmentAmount(props: any) {
    const { investmentAmount, currencyType }: any =
    props.formField;

    const options = [
        {
          label: "BNB",
          value: "BNB"
        },
        {
          label: "BUSD",
          value: "BUSD"
        },
        {
          label: "USDT",
          value: "USDT"
        },
        {
          label: "USDC",
          value: "USDC"
        }
      ];
  
      const chakraStyles: ChakraStylesConfig = {
        dropdownIndicator: (provided, state) => ({
          ...provided,
          background: state.isFocused ? "blue.100" : provided.background,
          color:"primary.100",
          backgroundColor:"white",
          p: 0,
          w: "40px",
  
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isFocused || state.isSelected ? "rgba(214, 221, 255, 0.3)" : "white",
          color: state.isFocused ||  state.isSelected ? "primary.100" : "#999FBB",
        })
      };
  return (
    <Box width={"100%"}>
        <Box mb={"28px"} className="Euclid Circular A"
        fontSize={"24px"} fontWeight={600} color={"primary.250"}>{investmentAmount.title}</Box>
        <Field name={investmentAmount.name}>
            {({ field, form }: FieldProps) => (
              <FormControl isInvalid={!!form.errors.subject && !!form.touched.subject}>
                <FormLabel 
                className="SF Pro Text"
                fontSize={"16px"}
                fontWeight={500}
                lineHeight={"20px"}
                mb={"12px"}
                color={"primary.200"}>{investmentAmount.label}</FormLabel>
                <Input {...field} placeholder={investmentAmount.placeholder} minW={"100%"} width={"100%"} bg={"white"} />
                {form.errors.investmentAmount ?  (
                  <span style={{color:"red", fontSize:"12px"}}><>{form.errors.investmentAmount}</></span>
                ): null}
              </FormControl>
            )}
          </Field>
          <Field name={currencyType.name}>
          {({ field, form }: FieldProps) => {
            return (
              <FormControl
                isInvalid={!!form.errors.subject && !!form.touched.subject}
                py={4}
              >
                <FormLabel className="SF Pro Text"
                fontSize={"16px"}
                fontWeight={500}
                lineHeight={"20px"}
                mb={"12px"}
                color={"primary.200"}>{currencyType.label}</FormLabel>
                <Select
                components={{
                  DropdownIndicator: SearchImage,
                }}
                  className="bg-white"
                  chakraStyles={chakraStyles}
                  name={field.name}
                  placeholder={currencyType.placeholder}
                  options={options}
                  value={
                    options
                      ? options.find((option) => option.value === field.value)
                      : ""
                  }
                  onChange={(option: any) =>
                    form.setFieldValue(field.name, option?.value)
                  }
                  onBlur={field.onBlur}
                />
                {form.errors.currencyType ?  (
                  <span style={{color:"red", fontSize:"12px"}}><>{form.errors.currencyType}</></span>
                ): null}
              </FormControl>
            );
          }}
        </Field>
    </Box>
  );
}

export default InvestmentAmount
