import {
  AspectRatio,
  Box,
  Image,
  Heading,
  Text,
  Center,
  Button,
  Stack,
  Select,
  Input,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
  HStack,
  Tabs,
  TabPanels,
  TabList,
  Tab,
  TabIndicator,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Grid,
  GridItem,
  Icon,
  Card,
  CardBody,
  Avatar,
  Link,
} from "@chakra-ui/react";
import { MainLayout } from "@/layouts/main-layout";
import WrappedContent from "@/layouts/wrapped-content";
import HeaderContent from "@/layouts/header-content";
// import Header from "@/modules/home/header";
import { SearchIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useState } from "react";
import CardGridCollection from "@/components/cards/card-grid-collection";
import { Flex } from "@chakra-ui/react";

const merchantInfoCard = ({ isExpanded, toggleExpanded }: any) => (
  <Card w="100%" mt="-200px" mb={{ base: "0px", lg: "200px" }}>
    <CardBody p="40px">
      <Stack alignItems="center">
        <Image
          my="16px"
          maxW="116px"
          src="/nft/cardimg.jpg"
          alt="Dan Abramov"
          borderRadius="full"
        />
        <Center gap="2">
          <Text fontSize="24px" fontWeight="medium">
            Name Here
          </Text>
          <Image align="right" src="/nft/nft-verified-icon.png" />
        </Center>
        <Text color="gray.400">Lima, Peru</Text>
        <Stack>
          <Heading as="h6" size="xs" mb={2}>
            About Us
          </Heading>
          <Text fontSize="14px" noOfLines={isExpanded ? undefined : 5}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>

          <Button
            w="100%"
            mb="20px"
            color={"primary.100"}
            variant="link"
            fontSize="14px"
            onClick={toggleExpanded}
          >
            {isExpanded ? "Close" : "Learn More"}
          </Button>

          <Button
            w="100%"
            mb="8px"
            bgColor={"primary.100"}
            color="primary.10"
            borderRadius={4}
          >
            {" "}
            Edit Profile{" "}
          </Button>
          <Button
            w="100%"
            bgColor={"white"}
            color={"primary.100"}
            borderColor={"primary.100"}
            borderRadius={4}
          >
            {" "}
            Edit Profile{" "}
          </Button>
        </Stack>
        <Center>
          <Text fontSize="14px" mt="10px" textTransform="uppercase">
            Host at Meteor since 2022
          </Text>
        </Center>
      </Stack>
    </CardBody>
  </Card>
);

const personalInfoTabPanel = () => (
  <TabPanel p="40px 0 0">
    <Stack spacing="24px">
      <Text fontSize="16px" fontWeight="medium">
        Presentation Video
      </Text>
      <AspectRatio maxH="320px" ratio={1}>
        <iframe
          title="naruto"
          src={"https://www.youtube.com/embed/QhBnZ6NPOY0"}
          allowFullScreen
        />
      </AspectRatio>
    </Stack>
    <Stack spacing="24px" mt="24px">
      <Text fontSize="16px" fontWeight="medium">
        Best Qualities
      </Text>
      <Flex gap="24px" flexDirection={{ base: "column", lg: "row" }}>
        <Box
          border="2px solid #DDE3EE"
          bg="#F7FAFD"
          p="14px 16px"
          borderRadius="4px"
        >
          <Text fontSize="16px">Unique in life</Text>
        </Box>
        <Box
          border="2px solid #DDE3EE"
          bg="#F7FAFD"
          p="14px 16px"
          borderRadius="4px"
        >
          <Text fontSize="16px">Host with excellent qualifications</Text>
        </Box>
        <Box
          border="2px solid #DDE3EE"
          bg="#F7FAFD"
          p="14px 16px"
          borderRadius="4px"
        >
          <Text fontSize="16px">Flexibility to cancel</Text>
        </Box>
      </Flex>
    </Stack>
  </TabPanel>
);

const collectionsTabPanel = () => (
  <TabPanel p="40px 0 0">
    <Box>
      <Flex
        direction="column"
        flexDirection={{ base: "column", md: "row" }}
        gap={4}
        align="center"
        py={8}
      >
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color={"blue.100"} />}
          />
          <Input
            type="text"
            placeholder="Search"
            htmlSize={10}
            borderColor={"blue.100"}
          />
        </InputGroup>
        <Select placeholder="Experience" borderColor={"blue.100"}>
          {" "}
          Experience
        </Select>
        <Select placeholder="Date" borderColor={"blue.100"}>
          {" "}
          Date
        </Select>
        <Select placeholder="Price" borderColor={"blue.100"}>
          {" "}
          Price
        </Select>
      </Flex>
    </Box>

    {/* <CardGridCollection
      key="merchantProfileCollectiongrip"
      products={mockData as Array<never>}
      cols={3}
      options={{ gap: 12 }}
    >
      <ProductViewCard />
    </CardGridCollection> */}

    {/* <CardGridCollection products={mockData as Array<never>} cols={3}></CardGridCollection> */}
  </TabPanel>
);

const ActivityListComponent = (data: any) => (
  <Stack spacing="40px" position="relative">
    {data.map((d: any, i: number) => (
      <Flex
        alignItems={"center"}
        gap="12px"
        zIndex="2"
        flexDirection={{ base: "column", lg: "row" }}
      >
        <Box w="90px" bg="#f4f6f9">
          <Text>{d.date}</Text>
        </Box>
        <Box mr="12px">
          <Icon viewBox="0 0 200 200" boxSize="6">
            <path
              fill="#0047BB"
              d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
            />
          </Icon>
        </Box>
        <Flex
          alignItems={"center"}
          border="2px solid #DDE3EE"
          bg="#F7FAFD"
          padding="12px 24px"
          borderRadius="4px"
          flex="1"
          columnGap="12px"
        >
          <Icon viewBox="0 0 200 200" boxSize="4">
            <path
              fill="#00CFB4"
              d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
            />
          </Icon>
          <Avatar name="Dein Gastgeber: Ole" src={d.avatar} />
          <Text dangerouslySetInnerHTML={{ __html: d.message }}></Text>
          <Link href="#">
            <Text color={"primary.100"} fontWeight="medium">
              Please reply
            </Text>
          </Link>
        </Flex>
      </Flex>
    ))}
    <Box
      bg="#DDE3EE"
      w="2px"
      h="calc(100% - 70px)"
      position="absolute"
      top="37px"
      left={{ base: "calc(50% - 7px)", lg: "113px" }}
    />
  </Stack>
);

const activity = [
  {
    date: "Jun 9, 2023",
    avatar: "https://bit.ly/sage-adebayo",
    message: "<p><strong>Mad Jack</strong> added you to the board.</p>",
  },
  {
    date: "May 21, 2023",
    avatar: "https://bit.ly/sage-adebayo",
    message: "<p><strong>Mad Jack</strong> added you to the board.</p>",
  },
  {
    date: "Jun 9, 2023",
    avatar: "https://bit.ly/sage-adebayo",
    message: "<p><strong>Mad Jack</strong> added you to the board.</p>",
  },
  {
    date: "May 21, 2023",
    avatar: "https://bit.ly/sage-adebayo",
    message: "<p><strong>Mad Jack</strong> added you to the board.</p>",
  },
];
const activityTabPanel = () => (
  <TabPanel p="40px 0 0">{ActivityListComponent(activity)}</TabPanel>
);

const offersTabPanel = () => (
  <TabPanel p="40px 0 0">
    <TableContainer>
      <Table variant="simple" fontSize="14px" borderColor="gray.100">
        <Thead>
          <Tr>
            <Th>N°</Th>
            <Th>Product</Th>
            <Th>Artist</Th>
            <Th>Date</Th>
            <Th>Price</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>001</Td>
            <Td>Astro Nova</Td>
            <Td>shsfdsfdfj</Td>
            <Td>2023-17-20</Td>
            <Td>10 ETH</Td>
            <Td>
              <Button
                bg="orange.100"
                color="orange.300"
                rounded="full"
                px={4}
                py={2}
                fontSize="14px"
                fontWeight="300"
              >
                Pending
              </Button>
            </Td>
            <Td>
              <Link>
                <Text color={"blue"}>
                  Details <Icon as={ExternalLinkIcon} fontSize="12px" />
                </Text>
              </Link>
            </Td>
          </Tr>
          <Tr>
            <Td>001</Td>
            <Td>Astro Nova</Td>
            <Td>shsfdsfdfj</Td>
            <Td>2023-17-20</Td>
            <Td>10 ETH</Td>
            <Td>
              <Button
                bg="orange.100"
                color="orange.300"
                rounded="full"
                px={4}
                py={2}
                fontSize="14px"
                fontWeight="300"
              >
                Pending
              </Button>
            </Td>
            <Td>
              <Link>
                <Text color={"blue"}>
                  Details <Icon as={ExternalLinkIcon} fontSize="12px" />
                </Text>
              </Link>
            </Td>
          </Tr>
          <Tr>
            <Td>001</Td>
            <Td>Astro Nova</Td>
            <Td>shsfdsfdfj</Td>
            <Td>2023-17-20</Td>
            <Td>10 ETH</Td>
            <Td>
              <Button
                bg="orange.100"
                color="orange.300"
                rounded="full"
                px={4}
                py={2}
                fontSize="14px"
                fontWeight="300"
              >
                Pending
              </Button>
            </Td>
            <Td>
              <Link>
                <Text color={"blue"}>
                  Details <Icon as={ExternalLinkIcon} fontSize="12px" />
                </Text>
              </Link>
            </Td>
          </Tr>
          <Tr>
            <Td>001</Td>
            <Td>Astro Nova</Td>
            <Td>shsfdsfdfj</Td>
            <Td>2023-17-20</Td>
            <Td>10 ETH</Td>
            <Td>
              <Button
                bg="orange.100"
                color="orange.300"
                rounded="full"
                px={4}
                py={2}
                fontSize="14px"
                fontWeight="300"
              >
                Pending
              </Button>
            </Td>
            <Td>
              <Link>
                <Text color={"blue"}>
                  Details <Icon as={ExternalLinkIcon} fontSize="12px" />
                </Text>
              </Link>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  </TabPanel>
);

// const sellingTabPanel = () => (
//     <TabPanel p="40px 0 0">

//     </TabPanel>
// )

const Merchant = ({ item, text }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <MainLayout>
      <HeaderContent>
        <Box mt={104} w="100%" overflow="hidden">
          <Image
            width={"100%"}
            height={300}
            src="/nft/cardimg.jpg"
            alt="Dan Abramov"
            objectFit="cover"
          />
        </Box>
      </HeaderContent>
      <WrappedContent>
        <Flex
          gap={{ base: "6px", lg: "64px" }}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Box w={{ base: "100%", lg: "392px" }} minW="300px">
            {merchantInfoCard({ isExpanded, toggleExpanded })}
          </Box>
          <Stack flex="1" mt="32px" style={{ overflowX: "auto" }}>
            <Tabs position="relative" variant="unstyled">
              <TabList>
                <Tab>Personal Info</Tab>
                <Tab>Collections</Tab>
                <Tab>Activity</Tab>
                <Tab>Offers Made</Tab>
                {/* <Tab>Selling NFT</Tab> */}
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="4px"
                bg="primary.100"
                borderRadius="2px 2px 0 0"
              />
              <TabPanels>
                {personalInfoTabPanel()}
                {collectionsTabPanel()}
                {activityTabPanel()}
                {offersTabPanel()}
                {/* {sellingTabPanel()} */}
              </TabPanels>
            </Tabs>
          </Stack>
        </Flex>
      </WrappedContent>
    </MainLayout>
  );
};

export default Merchant;
