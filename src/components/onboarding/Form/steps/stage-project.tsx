
import { Box, FormControl, FormLabel,
  } from "@chakra-ui/react";
// import SearchImage from "@/modules/launchpad/search";
import SearchImage from "@/modules/onboarding/search";
  import {
    ChakraStylesConfig,
    Select,
  } from "chakra-react-select";
  import { Field, FieldProps } from "formik"
  function StageProject(props: any) {
      const { stageProject }: any =
      props.formField;
  
      const options = [
        {
          label: "3 Stages",
          value: "3"
        },
        {
            label: "4 Stages",
            value: "4"
          },
          {
            label: "5 Stages",
            value: "5"
          },
          {
            label: "6 Stages",
            value: "6"
          },
          {
            label: "7 Stages",
            value: "7"
          },
          {
            label: "8 Stages",
            value: "8"
          },
          {
            label: "9 Stages",
            value: "9"
          },
          {
            label: "10 Stages",
            value: "10"
          },

      ];
  
      const chakraStyles: ChakraStylesConfig = {
        dropdownIndicator: (provided: any, state: any) => ({
          ...provided,
          background: state.isFocused ? "blue.100" : provided.background,
          color:"primary.100",
          backgroundColor:"white",
          p: 0,
          w: "40px",
  
        }),
        option: (provided: any, state: any) => ({
          ...provided,
          backgroundColor: state.isFocused || state.isSelected ? "rgba(214, 221, 255, 0.3)" : "white",
          color: state.isFocused ||  state.isSelected ? "primary.100" : "#999FBB",
        })
      };
    return (
      <Box width={"100%"}>
          <Box mb={"28px"} className="Euclid Circular A"
        fontSize={"24px"} fontWeight={600} color={"primary.250"}>{stageProject.title}</Box>
         <Field name={stageProject.name}>
            {({ field, form }: FieldProps) => {
              return (
                <FormControl
                  isInvalid={!!form.errors.subject && !!form.touched.subject}
                >
                  <FormLabel className="SF Pro Text"
                  fontSize={"16px"}
                  fontWeight={500}
                  lineHeight={"20px"}
                  mb={"12px"}
                  color={"primary.200"}>{stageProject.label}</FormLabel>
                  <Select
                  components={{
                    DropdownIndicator: SearchImage,
                  }}
                    className="bg-white"
                    chakraStyles={chakraStyles}
                    name={field.name}
                    placeholder={stageProject.placeholder}
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
                  {form.errors.stageProject ?  (
                    <span style={{color:"red", fontSize:"12px"}}><>{form.errors.stageProject}</></span>
                  ): null}
                </FormControl>
              );
            }}
          </Field>
      </Box>
    );
  }
  
  export default StageProject
  