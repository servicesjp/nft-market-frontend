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

interface VisitorSummaryProps {
  totalVisitors: number;
  changePercentage: number;
}
interface CommissionHistoryChart {
  Date: string;
  USDAmount: number;
}

const VisitorSummary: React.FC<VisitorSummaryProps> = ({ totalVisitors, changePercentage }) => {
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
          {totalVisitors}
        </Text>
        <Tag bg={tagBg} borderRadius="full" border="none" color={tagText} p="2" fontSize="12px">
          <TagLeftIcon as={TagIcon}/>
          <TagLabel>{changePercentage}%</TagLabel>
        </Tag>
      </Flex>

      <Box width="full">
        <Text p={4}>SALES OVER TIME</Text>
        
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

export default VisitorSummary;

const commisionChartData = {current: [
  { date: '00:00', value: 20 },
  { date: '01:00', value: 10 },
  { date: '02:00', value: 15 },
  { date: '03:00', value: 5 },
  { date: '04:00', value: 20 },
  { date: '05:00', value: 10 },
  { date: '06:00', value: 15 },
  { date: '07:00', value: 5 },
  { date: '08:00', value: 10 },
  { date: '09:00', value: 25 },
  { date: '10:00', value: 30 },
], old: [
  { date: '00:00', value: 10 },
  { date: '01:00', value: 40 },
  { date: '02:00', value: 5 },
  { date: '03:00', value: 5 },
  { date: '04:00', value: 2 },
  { date: '05:00', value: 4 },
  { date: '06:00', value: 7 },
  { date: '07:00', value: 10 },
  { date: '08:00', value: 14 },
  { date: '09:00', value: 25 },
  { date: '10:00', value: 15 },
]}