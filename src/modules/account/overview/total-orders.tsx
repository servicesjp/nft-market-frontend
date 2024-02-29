import { 
  Box,
  Flex,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import ComparativeChart from '@/components/chart/comparative';

interface TotalOrdersProps {
  totalOrders: number;
  changePercentage: number;
}

const TotalOrders: React.FC<TotalOrdersProps> = ({ totalOrders, changePercentage }) => {
  const isNegative = changePercentage < 0;
  const TagIcon = isNegative ? TriangleDownIcon : TriangleUpIcon;
  const tagBg = isNegative ? 'red.400' : 'green.50'
  const tagText = isNegative ? 'red.500' : 'green.400'

  return (
    <VStack spacing={5} p="5" alignItems="flex-start">
      <Flex justifyContent="space-between" w="full">
        <Text fontWeight="normal">Total online visitors</Text>
        {/* <Button size="sm" variant="outline" colorScheme="teal">
          View report
        </Button> */}
      </Flex>

      <Flex alignItems="center">
        <Text fontSize="3xl" fontWeight="medium" mr={2}>
          {totalOrders}
        </Text>
        <Tag bg={tagBg} borderRadius="full" border="none" color={tagText} p="2" fontSize="12px">
          <TagLeftIcon as={TagIcon}/>
          <TagLabel>{changePercentage}%</TagLabel>
        </Tag>
      </Flex>

      <Box width="full">
        <Text p={4}></Text>
        <ComparativeChart
          data={commissionChartData}
          height={300}
          showXAxis={true}
          showYAxis={false}
        />
      </Box>
    </VStack>
  );
};

export default TotalOrders;

const commissionChartData = {
  current: [
    { date: '00:00', value: 32 },
    { date: '01:00', value: 25 },
    { date: '02:00', value: 18 },
    { date: '03:00', value: 20 },
    { date: '04:00', value: 28 },
    { date: '05:00', value: 22 },
    { date: '06:00', value: 31 },
    { date: '07:00', value: 29 },
    { date: '08:00', value: 24 },
    { date: '09:00', value: 33 },
    { date: '10:00', value: 35 },
  ],
  old: [
    { date: '00:00', value: 30 },
    { date: '01:00', value: 22 },
    { date: '02:00', value: 19 },
    { date: '03:00', value: 17 },
    { date: '04:00', value: 26 },
    { date: '05:00', value: 21 },
    { date: '06:00', value: 27 },
    { date: '07:00', value: 30 },
    { date: '08:00', value: 23 },
    { date: '09:00', value: 31 },
    { date: '10:00', value: 28 },
  ]
};