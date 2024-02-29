import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

interface FilterDrawerItemProps {
  children?: ReactNode;
  registerCustomFilter?: (filterName: string, value: any) => void;
}
const FilterDrawerItem: React.FC<FilterDrawerItemProps> = ({ children, registerCustomFilter }) => {
  const isCustomComponent = React.isValidElement(children) && typeof children.type === 'function';

  return (
    <Box p={4}>
      {isCustomComponent && registerCustomFilter
        ? React.cloneElement(children as React.ReactElement, { registerCustomFilter }) 
        : children}
    </Box>
  );
};
export default FilterDrawerItem;