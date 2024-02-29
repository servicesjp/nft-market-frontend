import React from 'react';
import { Box, Flex, Text, VStack, Icon } from '@chakra-ui/react';
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';

export interface StatItem {
  label: string;
  value: string | number;
  changePercentage: number;
}

export interface StatListWithChangeProps {
  title: string;
  items: StatItem[];
  textColor?: string;
}

const StatListWithChange: React.FC<StatListWithChangeProps> = ({ title, items, textColor }) => {
  return (
    <VStack spacing={4} p="5" alignItems="stretch">
      <Flex justifyContent="space-between" w="full">
        <Text>{title}</Text>
      </Flex>
      {items.map((item, index) => {
        const isNegative = item.changePercentage < 0;
        const tagText = isNegative ? 'red.500' : 'green.400'
        const TriangleIcon = isNegative ? TriangleDownIcon : TriangleUpIcon;

        return (
          <Flex key={index} justifyContent="space-between">
            <Text fontWeight="300" color={textColor}>{item.label}</Text>
            <Box>
              <Text as="span" fontWeight="400">
                {typeof item.value === 'number' ? `$${item.value.toLocaleString()}` : item.value}
              </Text>
              <Icon as={TriangleIcon} color={tagText} mx={1} />
              <Text as="span" color={tagText} fontWeight="400">
                {item.changePercentage.toFixed(2)}%
              </Text>
            </Box>
          </Flex>
        );
      })}
    </VStack>
  );
};

export default StatListWithChange;
