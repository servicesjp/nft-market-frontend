import InputMask from 'react-input-mask';
import { Input } from '@chakra-ui/react';

const MaskedInput = ({ mask, ...props }:any) => (
  <InputMask mask={mask} {...props}>
    {(inputProps: any) => <Input {...inputProps} />}
  </InputMask>
);

export default MaskedInput;