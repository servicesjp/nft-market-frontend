import MarketplaceFabIcon from "@/assets/marketplace/market-fab-button.svg";
import { __ } from "@/helpers/common";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import SearchIcon from "@/assets/marketplace/search-icon.svg";
import FiltersIcon from "@/assets/marketplace/filters-icon.svg";
import FilterDrawer from "@/components/filter/filter-drawer";
import {  useRef, useState } from "react";
import { NftType, NftTypeByName } from "@/types/NftType";
import NFtTypeSelector from "./nft-type-selector";
import NftFilters, { NftFiltersProps } from "@/components/nft/nft-filters";
import { Product } from "@/types/nft/product";
import { formatPrice } from "../utils";
import { useRouter } from "next/router";



export interface MarketFloatingActionButtonProps {
  nftFilterProps: NftFiltersProps;
  searchResults: Product[];
}

export default function MarketFloatingActionButton({
  nftFilterProps,
  searchResults,
  
}: MarketFloatingActionButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
 

  return (
    <>
      <Box
        position="fixed"
        right="28px"
        bottom="1rem"
        bg="white"
        onClick={onOpen}
        color="white"
        boxSize={"56px"}
        boxShadow="xl"
        border={"1px solid var(--text-light, #E6E6E6);"}
        rounded="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <MarketplaceFabIcon />
      </Box>
      <Drawer
        blockScrollOnMount={true}
        autoFocus={false}
        placement={"bottom"}
        onClose={() => {
          onClose();
          setInputFocused(false);
        }}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent borderTopRadius={"24px"}>
          <DrawerHeader borderBottomWidth="1px" py={"24px"}>
            <InputGroup size={"md"}>
              <InputLeftElement>
                <SearchIcon />
              </InputLeftElement>
              <Input
                ref={inputRef}
                onChange={(e) => nftFilterProps.setSearchQuery(e.target.value)}
                onFocus={() => setInputFocused(true)}
                placeholder={__(
                  nftFilterProps.nftType === NftType.DIGITAL_ART
                    ? "search_digital_art"
                    : "search_experience"
                )}
              />
              {!inputFocused && (
                <InputRightAddon bgColor={"white"} p={"10px"}>
                  <FilterDrawer
                    filters={[]}
                    onApply={() => {
                      onClose();
                    }}
                    filterDrawerItem={<FiltersIcon fill="#0047BB" />}
                    showFooterButtons={false}
                    drawerPlacement="bottom"
                    drawerHeaderTitle={__(
                      nftFilterProps.nftType === NftType.DIGITAL_ART
                        ? "search_digital_art"
                        : "search_experience"
                    )}
                  >
                    <NftFilters {...nftFilterProps} />
                  </FilterDrawer>
                </InputRightAddon>
              )}
            </InputGroup>
          </DrawerHeader>
          <DrawerBody pt={"24px"} pb={"32px"}>
            {inputRef.current && inputFocused ? (
              <SearchResult
                currentInputRef={inputRef.current}
                searchResults={searchResults}
                nftType={nftFilterProps.nftType}
              />
            ) : (
              <NFtTypeSelector
                nftType={nftFilterProps.nftType}
                onSelect={onClose}
              />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}



function SearchResult({ currentInputRef, searchResults, nftType }: { currentInputRef: HTMLInputElement, searchResults: Product[], nftType: NftType }) {
  const router = useRouter();
  return (
    <VStack align={"flex-start"} gap={"24px"}   w={"100%"}  maxH={"70vh"}>
      <Text fontSize={"16px"} fontWeight={"500"}>
        Results
      </Text>
      <Box w={"100%"} onTouchMoveCapture={() => currentInputRef.blur()}>
        {searchResults.map((product) => {
          return <SearchResultCard key={product.id} product={product} onClick={() => {
            router.push(
              `/nft/${NftTypeByName[nftType]}/${product.id}`
            )
          }}/>;
        })}
      </Box>
    </VStack>
  );
}

function SearchResultCard({ product, onClick }: { product: Product, onClick: () => void }) {
  const price =
  product.price === null
    ? __("coming_soon_nft")
    : formatPrice(
        product.price,
        product.currencyAddress,
        product.currencyDecimals
      ) +
      " " +
      product.symbolCurrency;

    return (
      <HStack w={"100%"} py={"12px"} justify={"space-between"} onClick={onClick} cursor={"pointer"}>
        <HStack gap={"12px"}>
          <Image
            borderRadius="8px"
            boxSize="44px"
            src={
              product.mediaAssets && product.mediaAssets[0]
                ? product.mediaAssets[0]?.path
                : "/nft/cardimg.jpg"
            }
            alt={product.name}
          />
          <VStack align={"flex-start"} gap={"4px"}>
            <Text fontWeight={"500"}>{product.name}</Text>
            <Text fontSize={"14px"} color={"gray.500"}>
              @{product?.owner?.username}
            </Text>
          </VStack>
        </HStack>
        <Text fontWeight={"500"} color={"primary.100"}>
          {price}
        </Text>
      </HStack>
    );
}

