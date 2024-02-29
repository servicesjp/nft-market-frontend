import React from 'react';
import { Box, Grid, useRadioGroup } from '@chakra-ui/react';
import { __ } from "@/helpers/common";

interface Option {
  value: string;
  label: string;
}

interface RadioButtonGroupProps {
  options: Option[];
  value: string; // Cambiado de defaultValue a value
  onChange: (value: string) => void;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  options,
  value,
  onChange,
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: value, // Usamos el valor actual aquí
    onChange,
  });

  const group = getRootProps();

  return (
    <Grid
      {...group}
      gap="12px"
      templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(2, 1fr)" }}
    >
      {options.map((option) => {
        const radio = getRadioProps({ value: option.value });
        const { isChecked, ...radioProps } = radio;

        return (
          <Box
            key={option.value}
            h="48px"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={value === option.value ? "primary.100" : "white"}
            border="1px solid"
            borderColor={"primary.100"}
            fontWeight="500"
            color={value === option.value ? "white" : "primary.100"}
            _hover={{
              borderColor:
                value === option.value ? "primary.100" : "primary.70",
              color: value === option.value ? "primary.10" : "primary.70",
            }}
            mr={2}
            cursor="pointer"
            textAlign="center"
            onClick={() => {
              if (radio.onChange) {
                radio.onChange(option.value as any);
              }
            }}
          >
            {__(option.label)}
            <input
              {...radioProps}
              style={{ display: "none", position: "absolute", opacity: 0 }}
            />
          </Box>
        );
      })}
    </Grid>
  );
};

export default RadioButtonGroup;
