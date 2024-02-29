import React, { FC, useState } from 'react';
import { 
  Button,
  Grid,
  GridItem,
  GridItemProps,
  HStack, 
  Heading, 
  Stack,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import LoginRequired from "@/components/required/login-required";
import { MainLayout } from "@/layouts/main-layout";
import WrappedContent from "@/layouts/wrapped-content";
import MEbreadcrumb, { IBreadCrumbData } from '@/components/MEbreadcrumb';
import SalesSummary from '@/modules/account/overview/sales-summary';
import VisitorSummary from '@/modules/account/overview/visitor-summary';
import TotalOrders from '@/modules/account/overview/total-orders';
import RepeatCustomerRate from '@/modules/account/overview/repeat-customer-rate';
import TopProducts, { ProductItem } from '@/modules/account/overview/top-products';
import StatListWithChange, { StatItem } from '@/modules/account/overview/stat-list-with-change';


const OverviewDashboard = () => {
  const router = useRouter();

  const [breadcrumb, setBreadcrumb] = useState<IBreadCrumbData[]>([
    { text: "Account", link: "/account" },
    { text: "Profile NFT", link: "/account" },
    { text: "Overview", link: "#", isCurrentPage: true },
  ]);

  const GridItemTemplate: FC<GridItemProps> = ({ children, ...props }) => (
    <GridItem
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      bg="white"
      minH="200px"
      {...props}
    >
      {children}
    </GridItem>
  );
  return (
    <LoginRequired>
      <MainLayout>
        <WrappedContent>
          <MEbreadcrumb py="0" items={breadcrumb}></MEbreadcrumb>

          <HStack>
            <Stack>
              <Heading>Overview Dashboard</Heading>
              <Text fontSize="16px">Welcome to NFT dashboard</Text>
            </Stack>
          </HStack>

          <Grid
            templateColumns={{base: "repeat(1, 1fr)", md: "repeat(12, 1fr)"}}
            rowGap={6}
            columnGap={5}
          >
            <GridItemTemplate colSpan={[12, 4, 4]}>
              <SalesSummary totalSales={1440.23} changePercentage={85.3} />
            </GridItemTemplate>
            <GridItemTemplate colSpan={[12, 4, 4]}>
              <VisitorSummary totalVisitors={300} changePercentage={-20} />
            </GridItemTemplate>
            <GridItemTemplate colSpan={[12, 4, 4]}>
              <RepeatCustomerRate rate={5.43} changePercentage={84.6} />
            </GridItemTemplate>
            
            <GridItemTemplate colSpan={[12, 4, 7]}>
              <TotalOrders totalOrders={10} changePercentage={82.2} />
            </GridItemTemplate>
            <GridItemTemplate colSpan={[12, 4, 5]}>
              <TopProducts items={productItems} />
            </GridItemTemplate>

            <GridItemTemplate colSpan={[12, 4, 4]}>
              <StatListWithChange items={deviceVisitItems} title={'Online store visits by device type'} />
            </GridItemTemplate>
            <GridItemTemplate colSpan={[12, 4, 4]}>
              <StatListWithChange items={salesBySocialSources} title={'Sales by social sources'} />
            </GridItemTemplate>
            <GridItemTemplate colSpan={[12, 4, 4]}>
              <StatListWithChange items={topLandingPagesByVisits} title={'Top landing pages by visits'} textColor="primary.100" />
            </GridItemTemplate>
          </Grid>
        </WrappedContent>
      </MainLayout>
    </LoginRequired>
  );
};

export default OverviewDashboard;


const productItems: ProductItem[] = [
  {
    name: "A gastronomic trip through Peruvian flavors.",
    unitsSold: 643,
    changePercentage: 0.53,
  },
  {
    name: "Astral Nav",
    unitsSold: 78,
    changePercentage: 0.53,
  },
  {
    name: "MacBook Pro 2020",
    unitsSold: 2,
    changePercentage: 0.53,
  },
  {
    name: "A gastronomic trip through Peruvian flavors.",
    unitsSold: 643,
    changePercentage: 0.53,
  },
  {
    name: "Astral Nav",
    unitsSold: 78,
    changePercentage: 0.53,
  },
  {
    name: "MacBook Pro 2020",
    unitsSold: 2,
    changePercentage: -0.53,
  },
  {
    name: "Astral Nav",
    unitsSold: 78,
    changePercentage: 0.53,
  },
];

const deviceVisitItems: StatItem[] = [
  {
    label: "Desktop",
    value: 1000.00,
    changePercentage: 0.53,
  },
  {
    label: "Mobile",
    value: 60.00,
    changePercentage: 0.23,
  },
  {
    label: "Tablet",
    value: 60.00,
    changePercentage: 0.23,
  },
];
const salesBySocialSources: StatItem[] = [
  {
    label: "Facebook",
    value: 1000.00,
    changePercentage: 0.53,
  },
  {
    label: "Instagram",
    value: 60.00,
    changePercentage: 0.23,
  },
  {
    label: "Twitter",
    value: 60.00,
    changePercentage: 0.23,
  },
  {
    label: "LinkedIn",
    value: 60.00,
    changePercentage: 0.23,
  },
];

const topLandingPagesByVisits: StatItem[] = [
  {
    label: "/products/MacBookPro...",
    value: 14235,
    changePercentage: 0.53,
  },
  {
    label: "/products/MacBookPro...",
    value: 14235,
    changePercentage: 0.53,
  },
  {
    label: "/products/MacBookPro...",
    value: 14235,
    changePercentage: 0.53,
  },
  {
    label: "/products/MacBookPro...",
    value: 14235,
    changePercentage: 0.53,
  },
];
