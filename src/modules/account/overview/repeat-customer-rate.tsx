import React from 'react';
import { Box, Flex, Tag, TagLabel, TagLeftIcon, Text, VStack } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import ComparativeChart from '@/components/chart/comparative';

interface RepeatCustomerRateProps {
  rate: number;
  changePercentage: number;
}

const RepeatCustomerRate: React.FC<RepeatCustomerRateProps> = ({ rate, changePercentage }) => {  const isNegative = changePercentage < 0;
  const TagIcon = isNegative ? TriangleDownIcon : TriangleUpIcon;
  const tagBg = isNegative ? 'red.400' : 'green.50'
  const tagText = isNegative ? 'red.500' : 'green.400'
  
  return (
    <VStack spacing={5} p="5" alignItems="flex-start">
      <Text fontSize="sm" fontWeight="normal" color="gray.600">Repeat customer rate</Text>
      <Flex alignItems="center">
        <Text fontSize="3xl" fontWeight="medium" mr={2}>
          {rate}
        </Text>
        <Tag bg={tagBg} borderRadius="full" border="none" color={tagText} p="2" fontSize="12px">
          <TagLeftIcon as={TagIcon}/>
          <TagLabel>{changePercentage}%</TagLabel>
        </Tag>
      </Flex>

      <Box width="full">
        <Text p={4}>CUSTOMERS</Text>

        <ComparativeChart
          data={commisionChartData}
          height={300}
          showXAxis={true}
          showYAxis={false}
        />
      </Box>
    </VStack>
  );
};

export default RepeatCustomerRate;

const commisionChartData = {
  current: [
    { date: '00:00', value: 12 },
    { date: '01:00', value: 17 },
    { date: '02:00', value: 22 },
    { date: '03:00', value: 8 },
    { date: '04:00', value: 19 },
    { date: '05:00', value: 14 },
    { date: '06:00', value: 20 },
    { date: '07:00', value: 11 },
    { date: '08:00', value: 18 },
    { date: '09:00', value: 30 },
    { date: '10:00', value: 25 },
  ],
  old: [
    { date: '00:00', value: 13 },
    { date: '01:00', value: 20 },
    { date: '02:00', value: 10 },
    { date: '03:00', value: 7 },
    { date: '04:00', value: 15 },
    { date: '05:00', value: 12 },
    { date: '06:00', value: 17 },
    { date: '07:00', value: 9 },
    { date: '08:00', value: 14 },
    { date: '09:00', value: 28 },
    { date: '10:00', value: 16 },
  ]
};