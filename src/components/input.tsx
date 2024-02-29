import {
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";

import { ReactNode, RefObject } from "react";

import styles from "./input.module.css";

export const Input = ({
  leftElement,
  rightElement,
  placeHolder,
  forwardedRef,
  ...rest
}: InputProps) => {
  return (
    <InputGroup className={styles.inputGroup}>
      {leftElement && (
        <InputLeftElement h="100%">{leftElement}</InputLeftElement>
      )}
      <ChakraInput
        _placeholder={{
          fontSize: 16,
        }}
        paddingLeft={leftElement ? "48px" : "16px"}
        paddingRight={rightElement ? "48px" : "16px"}
        backgroundColor="white.100"
        border="2px solid #D6DDFF"
        ref={forwardedRef}
        placeholder={placeHolder}
        {...rest}
      />
      {rightElement && (
        <InputRightElement className={styles.rightElement} h="100%">
          {rightElement}
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export interface InputProps extends ChakraInputProps {
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  placeHolder?: string;
  forwardedRef?: RefObject<HTMLInputElement>;
}
