import { Box, InputProps } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Input } from "./input";

import Eye from '@/assets/icons/eye.svg'
import EyeCrossed from '@/assets/icons/eye-slash.svg'
  
export const PassswordInput = ({ ...rest }: InputProps ) => {
  const [ showPassword, setShowPassword ] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
    // reset focus to input element
    inputRef.current?.focus()
  }
  const toggleIcon = <Box cursor={'pointer'} onClick={toggleShowPassword}>
    { showPassword ? <EyeCrossed/> : <Eye/> }
  </Box>
  return <Input forwardedRef={inputRef} type={ showPassword ? 'text' : 'password'} rightElement={toggleIcon} {...rest} />
};