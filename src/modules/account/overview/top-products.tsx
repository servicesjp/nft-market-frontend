import { Box, Flex, Text, VStack, Icon } from '@chakra-ui/react';
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';

export interface ProductItem {
  name: string;
  unitsSold: number;
  changePercentage: number;
}

export interface TopProductsProps {
  items: ProductItem[];
}
const TopProducts: React.FC<TopProductsProps> = ({ items }) => {
  return (
    <VStack spacing={4} p="5" alignItems="stretch">
      <Text>Top products by units sold</Text>
      {items.map((item, index) => {
        const isNegative = item.changePercentage < 0;
        const tagText = isNegative ? 'red.500' : 'green.400'
        const TriangleIcon = isNegative ? TriangleDownIcon : TriangleUpIcon;
        
        return (
          <Flex key={index} justifyContent="space-between">
            <Text fontWeight="300">{item.name}</Text>
            <Box>
              <Text as="span" fontWeight="400">
                {item.unitsSold.toLocaleString()}
              </Text>
              <Icon as={TriangleIcon} color={tagText} mx={1} />
              <Text as="span" color={tagText} fontWeight="300">
                {Math.abs(item.changePercentage).toFixed(2)}%
              </Text>
            </Box>
          </Flex>
        );
      })}
    </VStack>
  );
};
export default TopProducts;