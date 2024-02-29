import { Box, Button, Center, Collapse, Divider, HStack, Input, InputGroup, InputLeftElement, Select, Show, SimpleGrid, Spinner, Stack, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MainLayout } from "@/layouts/main-layout";
import WrappedContent from "@/layouts/wrapped-content";
import Custom404 from "../404";
import Image from "next/image";
import { NftType, getNFTTypeByName } from "@/types/NftType";
import { useGetCategory } from "@/hooks/api/use-get-categories";
import { Category } from "@/types/nft/category";
import { useState } from "react";
import { __ } from "@/helpers/common";
import { ExperienceCard } from "@/components/cards/experience-card";
import { DigitalArtCard } from "@/components/cards/digital-art-card";
import MarketFloatingActionButton from "@/modules/market/market-floating-action-button";
import NFtTypeSelector from "@/modules/market/nft-type-selector";
import NftFilters from "@/components/nft/nft-filters";
import { ProductSortType, ProductSortTypeArrayOptions } from "@/types/ProductSortType";
import SearchIcon from "@/assets/marketplace/search-icon.svg";
import FiltersIcon from "@/assets/marketplace/filters-icon.svg";
import { useInfiniteGetProducts } from "@/hooks/api/use-infinite-get-products";
import React from "react";
import { MarketplaceBanners } from "@/components/marketplace/marketplace-banners";
import { useProductsApi } from "@/hooks/useApi";

export default function NftTypeMarketplace() {
  //filters
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currencyType, setCurrencyType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<number>(ProductSortType.RecentlyListed);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const { testChatInvitation } = useProductsApi();

  // pagination
  const [limit, setLimit] = useState<number>(8);
  const router = useRouter();
  const { type } = router.query;
  const nftType: NftType = getNFTTypeByName(type);
  const filterToggle = useDisclosure({ defaultIsOpen: true });

  const {
    data: infiniteProductsList,
    isLoading: isLoadingInfiniteProducts,
    isError: isErrorInfiniteProducts,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteGetProducts({
    q: searchQuery,
    ...(currencyType !== "all" && { currencyType: currencyType }),
    nftType,
    s: sortBy,
    ...(ratingFilter !== 0 && { rating: ratingFilter }),
    limit: limit,
  });


  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategory(nftType);

  const categoriesList: Category[] = [
    { id: "all", name: "All", translateKey: "all" },
    ...(categories ?? []),
  ];

  const sortByOptions = ProductSortTypeArrayOptions;

  if (!nftType) {
    return <Custom404 />;
  }

  console.log({ testChatInvitation })

  return (
    <MainLayout paddingX="0" marginY="0">
      <WrappedContent>
        <VStack w={"100%"} gap={"24px"}>
          <Show below="md">
            <MarketplaceBanners nftType={nftType} />
          </Show>
          <VStack
            px={"24px"}
            gap={"24px"}
            w={"100%"}
            py={{ base: "24px", md: "40px" }}
          >
            <Show above="md">
              <NFtTypeSelector nftType={nftType} />
            </Show>
            <HStack gap={"24px"} w={"100%"} align={"flex-start"}>
              <Show above="md">
                <Collapse
                  in={filterToggle.isOpen}
                  animateOpacity={true}
                  style={{
                    display: "flex",
                    flex: "1",
                    maxWidth: "288px",
                    width: "100%",
                  }}
                >
                  <NftFilters
                    nftType={nftType}
                    currencyType={currencyType}
                    ratingFilter={ratingFilter}
                    setCurrencyType={setCurrencyType}
                    setRatingFilter={setRatingFilter}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                  />
                </Collapse>
              </Show>
              <VStack w={"100%"} flex={1} gap={"24px"}>
                {/* {nftType === NftType.EXPERIENCE && (
                  <CategoriesSwitchable
                    categories={categoriesList}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                )} */}
                <Show above="md">
                  <HStack align={"center"} w="100%" gap={"16px"}>
                    <Box
                      cursor={"pointer"}
                      onClick={filterToggle.onToggle}
                      border={"1px solid #231C35"}
                      p="10px"
                      bg={filterToggle.isOpen ? "#F3F3F3" : "transparent"}
                      borderRadius={"4px"}
                    >
                      <FiltersIcon fill="#231C35" />
                    </Box>
                    <InputGroup size={"lg"}>
                      <InputLeftElement>
                        <SearchIcon />
                      </InputLeftElement>
                      <Input
                        fontSize={"16px"}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={__(
                          nftType === NftType.DIGITAL_ART
                            ? "search_digital_art"
                            : "search_experience"
                        )}
                      />
                    </InputGroup>
                    <Select
                      size={"lg"}
                      maxW={"288px"}
                      fontSize={"16px"}
                      onChange={(event: any) => {
                        console.log("option", event.target.value);
                        setSortBy(event.target.value);
                      }}
                    >
                      {sortByOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {__(option.label)}
                        </option>
                      ))}
                    </Select>
                  </HStack>
                </Show>
                {isLoadingInfiniteProducts && (
                  <Center w={"100%"} my={"20vh"}>
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="primary.100"
                      size="xl"
                    />
                  </Center>
                )}

                {(infiniteProductsList?.pages.length === 0 ||
                  isErrorInfiniteProducts) &&
                  !infiniteProductsList && (
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      minH="300px"
                    >
                      <Image
                        height="80"
                        width="80"
                        src="/images/data-notfound.svg"
                        alt={__("not_found")}
                      />
                      <Text color="gray.400" fontSize="14px">
                        {__("no_records_found").replace(/\.$/, "")}
                      </Text>
                    </Box>
                  )}
                <SimpleGrid
                  columns={
                    nftType === NftType.EXPERIENCE
                      ? {
                        base: 1,
                        sm: 2,
                        md: filterToggle.isOpen ? 1 : 2,
                        lg: filterToggle.isOpen ? 3 : 4,
                      }
                      : {
                        base: 2,
                        sm: 3,
                        md: filterToggle.isOpen ? 2 : 3,
                        lg: filterToggle.isOpen ? 3 : 4,
                      }
                  }
                  gridGap={{ base: "15px", md: "24px" }}
                >
                  {infiniteProductsList?.pages?.map((page, i) => (
                    <React.Fragment key={i}>
                      {page.items.map((product) => (
                        <Box key={product.id} w={"100%"}>
                          {nftType === NftType.EXPERIENCE ? (
                            <ExperienceCard data={product} />
                          ) : (
                            <DigitalArtCard data={product} />
                          )}
                          <Divider />
                        </Box>
                      ))}
                    </React.Fragment>
                  ))}
                </SimpleGrid>
                {hasNextPage && !isLoadingInfiniteProducts && (
                  <Button
                    maxW={"240px"}
                    isDisabled={!hasNextPage}
                    isLoading={isFetchingNextPage}
                    onClick={() => {
                      fetchNextPage();
                    }}
                  >
                    {__("view_more")}
                  </Button>
                )}
              </VStack>
            </HStack>
          </VStack>
        </VStack>
        <Show below="md">
          <MarketFloatingActionButton
            nftFilterProps={{
              nftType,
              currencyType,
              ratingFilter,
              setCurrencyType,
              setRatingFilter,
              setSearchQuery,
              searchQuery,
            }}
            searchResults={
              searchQuery !== "" && infiniteProductsList?.pages[0].items
                ? infiniteProductsList?.pages[0].items
                : []
            }
          />
        </Show>
      </WrappedContent>
    </MainLayout>
  );
}
