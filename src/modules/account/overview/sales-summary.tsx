import ComparativeChart from '@/components/chart/comparative';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
} from '@chakra-ui/react';

interface SalesSummaryProps {
  totalSales: number;
  changePercentage: number;
}
const SalesSummary: React.FC<SalesSummaryProps> =  ({ totalSales, changePercentage }) => {
  const isNegative = changePercentage < 0;
  const TagIcon = isNegative ? TriangleDownIcon : TriangleUpIcon;
  const tagBg = isNegative ? 'red.400' : 'green.50'
  const tagText = isNegative ? 'red.500' : 'green.400'
  
  return (
    <VStack spacing={5} p="5" alignItems="left">

      <Text fontWeight="normal">Total Sales</Text>
      
      <Flex alignItems="center">
        <Text fontSize="3xl" fontWeight="medium" mr={2}>
          {totalSales}
        </Text>
        <Tag bg={tagBg} borderRadius="full" border="none" color={tagText} p="2" fontSize="12px">
          <TagLeftIcon as={TagIcon}/>
          <TagLabel>{changePercentage}%</TagLabel>
        </Tag>
      </Flex>

      <VStack>
        <HStack w="100%" alignItems="center" justifyContent="space-between">
          <Text fontWeight="light">Meteor Marketplace </Text>
          <Text>$1000.00 </Text>
          <Text fontWeight="normal" color="green.500" fontSize="12px">+0.53%</Text>
        </HStack>
        <HStack w="100%" alignItems="center" justifyContent="space-between">
          <Text fontWeight="light">Meteor Marketplace </Text>
          <Text>$1000.00 </Text>
          <Text fontWeight="normal" color="green.500" fontSize="12px">+0.53%</Text>
        </HStack>
      </VStack>

      <Box width="full">
        <Text p={4}>SALES OVER TIME</Text>
        <ComparativeChart
          data={commissionChartData}
          height={230}
          showXAxis={true}
          showYAxis={false}
        />
      </Box>
    </VStack>
  );
};

export default SalesSummary;
const commissionChartData = {
  current: [
    { date: '00:00', value: 45 },
    { date: '01:00', value: 35 },
    { date: '02:00', value: 40 },
    { date: '03:00', value: 30 },
    { date: '04:00', value: 25 },
    { date: '05:00', value: 50 },
    { date: '06:00', value: 45 },
    { date: '07:00', value: 40 },
    { date: '08:00', value: 55 },
    { date: '09:00', value: 60 },
    { date: '10:00', value: 65 },
  ],
  old: [
    { date: '00:00', value: 42 },
    { date: '01:00', value: 38 },
    { date: '02:00', value: 36 },
    { date: '03:00', value: 34 },
    { date: '04:00', value: 33 },
    { date: '05:00', value: 30 },
    { date: '06:00', value: 45 },
    { date: '07:00', value: 47 },
    { date: '08:00', value: 49 },
    { date: '09:00', value: 52 },
    { date: '10:00', value: 55 },
  ]
};