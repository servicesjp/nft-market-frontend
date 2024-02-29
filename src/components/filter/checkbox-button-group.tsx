import React from 'react';
import { Box, Grid, useCheckboxGroup } from '@chakra-ui/react';

interface Option {
  value: string;
  label: string;
}

interface CheckboxButtonGroupProps {
  options: Option[];
  values: string[];
  onChange: (values: string[]) => void;
}

const CheckboxButtonGroup: React.FC<CheckboxButtonGroupProps> = ({ options, values, onChange }) => {
  const { getCheckboxProps } = useCheckboxGroup({
    defaultValue: values,
    onChange,
  });

  return (
    <Grid gap="12px" templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(2, 1fr)" }}>
      {options.map((option) => {
        const checkbox = getCheckboxProps({ value: option.value });
        const _isChecked = values.includes(option.value);
        const { isChecked, ...checkboxProps } = checkbox;


        return (
          <Box
            key={option.value}
            h="48px"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={_isChecked ? "primary.100" : "white"}
            border="1px solid"
            borderColor={"primary.100"}
            color={_isChecked ? "white" : "primary.100"}
            fontWeight="500"
            _hover={{
              borderColor: _isChecked ? "primary.100" : "primary.70",
              color: _isChecked ? "primary.10" : "primary.70"
            }}
            mr={2}
            cursor="pointer"
            textAlign="center"
            onClick={() => {
              if (checkbox.onChange) {
                checkbox.onChange(option.value as any);
              }
            }}
          >
            {option.label}
            <input {...checkboxProps} style={{ display: "none", position: "absolute", opacity: 0 }} />
          </Box>
        );
      })}
    </Grid>
  );
};

export default CheckboxButtonGroup;
