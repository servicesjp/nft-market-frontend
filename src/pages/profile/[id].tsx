import WrappedContent from "@/layouts/wrapped-content";
import { useProductsApi, useUserApi } from "@/hooks/useApi";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Image,
  Spinner,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useResponsive from "@/hooks/useResponsive";
import { DigitalArtList } from "@/modules/account/digital-art-list";
import { __ } from "@/helpers/common";
import router from "next/router";
import { PublicUserInfoCard } from "@/components/profile/public-user-info-card";
import { CleanLayout } from "@/layouts/clean-layout";
import HeaderSemiContent from "@/layouts/header-semi-content";
import { PublicInfoBanner } from "@/components/profile/public-info-banner";

function ProfilePage() {
  const [userIdParam, setUserIdParam] = useState<any>(router.query.id);
  const [currentUserPublic, setCurrentUserPublic] = useState<any>(null);
  const { isMobile } = useResponsive();


  const { fetchUserPubilc } = useUserApi();
  const { manyProductsByUserId } = useProductsApi();
  const [publicNfts, setPublicNfts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [firstLoading, setFirstLoading] = useState<boolean>(true);

  /// pagination
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(9);
  const [page, setPage] = useState<number>(1);
  const [reachedLimited, setReachedLimited] = useState<boolean>(false);

  const fetchProductsByUserId = async () => {

    setIsLoading(true);
    
    try {
      const initPage = 1;
      const initOffset = 0;
      setReachedLimited(false);
      const params = {
        limit: limit,
        offset: initOffset,
      };
      const listResult = await manyProductsByUserId(userIdParam, params);
      if (listResult) {
        setPublicNfts(listResult?.items);
  
        const newPage = initPage + 1;
        setPage(newPage);
        setOffset((newPage - 1) * limit);
  
        if (listResult.items.length === 0 || listResult.count <= (listResult.limit + listResult.offset)) {
            setReachedLimited(true);
        }
      }
    } catch (error) {
      console.log(error);
      setReachedLimited(true)
    } finally {
      setIsLoading(false)
      setFirstLoading(false)
    }
  };

  const getUserPublic = async () => {
    const user = await fetchUserPubilc(userIdParam);
    if (!user) {
      router.push("/marketplace/experience");
    } else {
      setCurrentUserPublic(user);
    }
  };

  const addedProductsToArray = async () => {
    const newPage = page + 1;
    setPage(newPage);
    setOffset((newPage - 1) * limit);

    setIsLoading(true);
    try {
      
      setReachedLimited(false);
      const params = {
        limit: limit,
        offset: offset,
      };
      const listResult = await manyProductsByUserId(userIdParam, params);
      if (listResult) {
        setPublicNfts((arr) => arr.concat(listResult?.items));
  
        if (listResult.items.length === 0 || listResult.count <= (listResult.limit + listResult.offset)) {
          setReachedLimited(true);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getUserPublic();
    fetchProductsByUserId();
  }, []);

  const tabs = ["Experiences List", "About us", "Associated User", "News and Events"];

  return (
    <CleanLayout>

      <Box mt="92px">
        <PublicInfoBanner nftUser={currentUserPublic} />
      </Box>

      <Container maxW='container.xl' mt="24px">
        <Flex
          gap={{ base: "6px", lg: "64px" }}
          w={"100%"}
          minH="50vh"
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Stack flex="1">
            <Tabs position="relative" variant="unstyled">
              <TabList {...(isMobile ? { overflowX: "scroll" } : {})}>
                {tabs.map((tab, index) => (
                  <Tab
                    key={index}
                    whiteSpace={"nowrap"}
                    _selected={{
                      fontWeight: "500"
                    }}
                  >
                    {__(`${tab}`)}
                  </Tab>
                ))}
              </TabList>

              <TabIndicator
                mt="-1.5px"
                height="4px"
                bg="primary.100"
                borderRadius="8px 8px 0 0"
              />
              <TabPanels>
                <TabPanel p="40px 0 0" px={"4px"}>
                  {
                    firstLoading ? <></>
                    :
                    <DigitalArtList voucher={false}                    // list={publicNfts}
                    ></DigitalArtList>
                  }
                  <Flex w={"170px"} flexDir={"row"} my={"20px"} mx={"auto"}>
                    {reachedLimited ? (
                      <></>
                    ) : isLoading ? (
                      <Center w={"100%"} mb={"50vh"}>
                        <Spinner
                          thickness="4px"
                          speed="0.65s"
                          emptyColor="gray.200"
                          color="primary.100"
                          size="xl"
                        />
                      </Center>
                    ) : (
                      <Box w="100%" mt={"10px"}>
                        <Button
                          onClick={async () => {
                            await addedProductsToArray();
                          }}
                        >
                          {__("view_more")}
                        </Button>
                      </Box>
                    )}
                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Flex>
      </Container>
    </CleanLayout>
  );
}

export default ProfilePage;
