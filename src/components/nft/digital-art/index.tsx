import ShareSocialNetworks from "@/components/common/share-social-network";
import { showErrorToast, showSuccessToast } from "@/components/toast";
import {
  CURRENCY_ETHER,
  MARKETPLACE,
  NameChain,
  WEB_SCAN,
} from "@/constants/env";
import { __ } from "@/helpers/common";
import { NFT1155Contract } from "@/hooks/contract/nft/nft1155-contract";
import { NFT721Contract } from "@/hooks/contract/nft/nft721-contract";
import { ExperienceContract } from "@/hooks/contract/nft/experience-contract";
import { MarketplaceContract } from "@/hooks/contract/places/marketplace-contract";
import { useApiNFT, useApiTokens } from "@/hooks/moralis";
import { useProductsApi, useTransactionApi } from "@/hooks/useApi";
import { useNotificationApi } from "@/hooks/nft";
import useApiIPFS from "@/hooks/useIpfs";
import Responsive from "@/hooks/useResponsive";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import {
  dateToUnixTime,
  formatPrice,
  isCorrectNetwork,
  isSameNetwork,
  isWalletConnected,
  truncateAddress,
} from "@/modules/utils";
import { ApprovalStatus } from "@/types/ApprovalStatus";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Badge,
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  Hide,
  Image,
  Link,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { NftContractType } from "@/types/NftType";
import { HttpStatusCode } from "axios";
import { parseUnits } from "ethers/lib/utils.js";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { MdCircle, MdOutlineVisibility } from "react-icons/md";
import { TransactionExecutionError } from "viem";
import { waitForTransaction } from "wagmi/actions";
import { ListingsProductTable } from "./components/listings-product-table";
import { UserContext } from "@/modules/provider/user-info-provider";
import ListingModal from "./components/listing-modal";
import OfferModal from "./components/offer-modal";
import { useERC20 } from "@/hooks/useERC20";
import { formatDate } from "@/utils/time-formatting";
import { TokenChart } from "./components/token-chart";
import { ERC20Contract } from "@/hooks/contract/erc20";
import ItemActivity from "./components/item-activity";
import { WebSocketProvider } from "@/modules/provider/websocket-provider";
import {
  TransactionType
} from "@/hooks/types/contracts/events";
import ShareIcon from "@/assets/icons/share.svg";
import LeftArrowIcon from "@/assets/icons/arrow-simple-left.svg";
import { OffersProductTable } from "./components/offers-product-table";
import { ImageModal } from "./components/image-modal";
interface IDigitalArt {
  digitalArtData: any;
}
export default function DigitalArt({ digitalArtData }: IDigitalArt) {
  const { chain, address, isConnected, fetchBalance, switchNetwork } =
    useContext(WalletConnectContext);
  const { socket } = useContext(WebSocketProvider);

  useEffect(() => {
    socket?.on("update", (data: any) => {
      console.log("Mensaje recibido:", data);
    });
    console.log("socket", socket);
    // Limpieza al desmontar el componente o en otras circunstancias si es necesario
    return () => {
      socket?.off("update");
    };
  }, [socket]);
  useEffect(()=>{
    console.log('hola', socket)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected])
  const router = useRouter();
  const currentUrl = process.env.NEXT_PUBLIC_NFT_URL + router.asPath;
  const [loading, setLoading] = useState<boolean>(false);
  const { loggedIn } = useContext(UserContext);
  const [isVoucher, _] = useState<any>(digitalArtData?.nftVoucher);
  const [loadingMint, setLoadingMint] = useState<boolean>(false);
  const [currentPrice, setCurrentPrice] = useState<any>(0);
  const [symbolCurrency, setSymbolCurrency] = useState<string>("");
  const [owners, setOwners] = useState<any[]>([]);
  const [ipfsStruct, setIpfsStruct] = useState<any>({});
  const [listingsList, setListingsList] = useState<any[]>([]);
  const [offersList, setOfferList] = useState<any[]>([]);
  const [activities, setActivities] = useState([]);
  const [metadata, setMetadata] = useState<any>({});
  const [balances, setBalances] = useState<any[]>([]);
  const imageModelDisclosure = useDisclosure();
  const { getTokenDetails } = useERC20();
  const transactionApi = useTransactionApi();
  const { readLinkIPFS } = useApiIPFS();
  const { getAllowance } = useApiTokens();
  const { getOwnersByTokenId, getNFTMetadata } = useApiNFT();
  const { RedeemNFT721, SetApprovalForAllNFT721, TokenURINFT721 } = NFT721Contract();
  const { RedeemNFT1155, SetApprovalForAllNFT1155, BalanceOfNFT1155, TokenURINFT1155 } =
    NFT1155Contract();
    const {SetApprovalForAllNFTExperience} = ExperienceContract()
  const { isMobile } = Responsive();
  const { ListItemMarket, GetListItemDetails, CreateOfferMarket } =
    MarketplaceContract();
  const {
    getActivity,
    getOffersByProductId,
    sendToApproveDigitalArtNft,
    getListingsByProduct,
  } = useProductsApi();
  const { testNotificacion } = useNotificationApi()
  const { ApproveTokens } = ERC20Contract();
  const [accodionIndex, setAccordionIndex] = useState<number[]>();

  useEffect(() => {
    getOwners();
    getActivities();
    fetchOffersProduct();
    getLastPrice();
    getLinkIpfs();
    if (!isVoucher) {
      getMetadata();
    }
    setAccordionIndex([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLinkIpfs = async () => {
    try {
      const uri = digitalArtData?.mediaAssets[0].ipfs
      const data = await readLinkIPFS(uri);
      setIpfsStruct(data);
      
    } catch (error) {
      console.log(error);
    }
  };
  const getOwners = async () => {
    try {
      const chainId = digitalArtData?.chainId 
      const addressNft = digitalArtData?.nftContractAddress
      const tokenId = digitalArtData?.tokenId;
      if (isVoucher) {
        //voucher
        const owner = digitalArtData?.ownerAddress?.address.toLowerCase();
        setOwners([owner]);
      } else {
        //minted
        const { result } = await getOwnersByTokenId({
          chainId,
          addressNft,
          tokenId,
        });
        const ownersList = result.map((token: any) =>
          token?.owner_of.toLowerCase()
        );
        setOwners([...ownersList]);
        await getItemListed(addressNft, tokenId, chainId, result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLastPrice = () => {
    const chainId = digitalArtData?.chainId;
    if (isVoucher) {
      const price = isVoucher?.minPrice;
      const currency = isVoucher?.currencyAddress;
      const { decimals, symbol } = getTokenDetails(chainId, currency);
      const currentPrice = formatPrice(price, currency, decimals);
      setCurrentPrice(currentPrice);
      setSymbolCurrency(symbol);
    } else {
      const lastSale = digitalArtData?.lastSale;
      const currency = lastSale?.currencyAddress;
      const price = lastSale?.price;
      const { decimals, symbol } = getTokenDetails(chainId, currency);
      const currentPrice = formatPrice(price, currency, decimals);
      setCurrentPrice(currentPrice);
      setSymbolCurrency(symbol);
    }
  };

  const handleListing = async (
    _quantity: number,
    _price: number,
    currencyAddress: string
  ) => {
    try {
      if (!loggedIn) {
        showErrorToast("User Not Log In");
        return;
      }
      const chainId = digitalArtData?.chainId;
      const statusWallet = isWalletConnected(!isConnected);
      const statusNet: any = isCorrectNetwork(chain);
      if (!statusWallet || !statusNet) return;
      const isSameNet = isSameNetwork(chain, chainId);
      if (!isSameNet) await switchNetwork?.(chainId);
      const isNFT1155 = digitalArtData?.nftContractType == NftContractType.NFT1155 ;
      const nftAddress = digitalArtData?.nftContractAddress;
      const marketAddress = MARKETPLACE[chain?.id];
      const approval: any = [marketAddress, true];
      const { decimals: decimalsToken } = getTokenDetails(
        chainId,
        currencyAddress
      );
      if (isNFT1155) {
        // NFT1155
        const { hash } = await SetApprovalForAllNFT1155(approval);
        const { status } = await waitForTransaction({ hash });
        if (status != "success") {
          showErrorToast("Error Approve Tokens");
          return;
        }
      } else {
        // NFT721
        const { hash } = await SetApprovalForAllNFT721(approval);
        const { status } = await waitForTransaction({ hash });
        if (status != "success") {
          showErrorToast("Error Approve Tokens");
          return;
        }
      }
      showSuccessToast(__("approval_success_wait_for_transaction"));
      const isNativeToken = currencyAddress == CURRENCY_ETHER;
      const params = isNativeToken
        ? {
            address,
            chain: chain?.id,
          }
        : {
            address,
            token: currencyAddress,
            chain: chain?.id,
          };
      const { decimals } = await fetchBalance(params);
      if (!decimals) {
        showErrorToast(__("balance_not_found"));
        return;
      }

      const price = parseUnits(_price.toString(), decimalsToken);
      const startingTime = Math.floor(new Date().getTime() / 1000);
      const listItemData = [
        nftAddress,
        digitalArtData?.tokenId?.toString(),
        _quantity.toString(),
        currencyAddress,
        price.toString(),
        startingTime.toString(),
      ];
      const { hash } = await ListItemMarket(listItemData);
      await transactionApi.saveTransactionByUser({
        userAddress: address,
        transactionHash: hash,
        chainId: chain?.id,
        eventType: TransactionType.LIST_ITEM,
        nftContractAddress: digitalArtData?.nftContractAddress,
        tokenId: digitalArtData?.tokenId,
        productId: digitalArtData?.id,
        quantity: _quantity
      });
      fetchData();
    } catch (error) {
      if (error instanceof TransactionExecutionError) {
        showErrorToast(error?.details);
        console.log(error);
        return;
      }
      console.log(error);
      showErrorToast("Something went wrong!");
    }
  };

  const handleMakeOffer = async ({
    quantity,
    price,
    currency,
    expiry,
  }: any) => {
    try {
      if (!loggedIn) {
        showErrorToast("User Not Log In");
        return;
      }
      const chainId = digitalArtData?.chainId;
      const statusWallet = isWalletConnected(!isConnected);
      const statusNet = isCorrectNetwork(chain);
      if (!statusWallet || !statusNet) return;
      const isSameNet = isSameNetwork(chain, chainId);
      if (!isSameNet) await switchNetwork?.(chainId);
      const nftAddress = digitalArtData?.nftContractAddress;
      const marketAddress = MARKETPLACE[chain?.id];
      const { decimals: decimalsToken } = getTokenDetails(chainId, currency);
      const isNativeToken = currency == CURRENCY_ETHER;
      const priceCalItem = parseUnits(price.toString(), decimalsToken);
      const totalPrice = parseInt(priceCalItem.toString()) * parseInt(quantity);
      const paramsToken = isNativeToken
        ? {
            address,
            chain: chain?.id,
          }
        : {
            address,
            token: currency,
            chain: chain?.id,
          };
      if (!isNativeToken) {
        const params = {
          chainId: chain?.id,
          address: currency,
          ownerAddress: address,
          spenderAddress: marketAddress,
        };
        const { result } = await getAllowance(params);
        if (parseFloat(result?.allowance) < totalPrice) {
          const { value } = await fetchBalance(paramsToken);
          if (parseFloat(value) < totalPrice) {
            showErrorToast("Not Enought Token");
            return;
          }
          const { hash } = await ApproveTokens(currency, [
            marketAddress,
            value,
          ]);
          const { status } = await waitForTransaction({ hash });
          if (status != "success") {
            showErrorToast("Error Approve Tokens");
            return;
          }
        }
      }
      const { value } = await fetchBalance(paramsToken);
      if (!value) {
        showErrorToast(__("balance_not_found"));
        return;
      }
      if (parseFloat(value) < totalPrice) {
        showErrorToast("Not Enought Token");
        return;
      }

      const offerData = [
        nftAddress,
        digitalArtData?.tokenId?.toString(),
        currency,
        quantity.toString(),
        totalPrice.toString(),
        dateToUnixTime(expiry).toString(),
      ];

      const { hash } = await CreateOfferMarket(offerData);
      await transactionApi.saveTransactionByUser({
        userAddress: address,
        transactionHash: hash,
        chainId: chain?.id || digitalArtData?.chainId,
        eventType: TransactionType.CREATE_OFFER,
        nftContractAddress: digitalArtData?.nftContractAddress || nftAddress,
        tokenId: digitalArtData?.tokenId,
        productId: digitalArtData?.id,
        quantity
      });
      showSuccessToast("Your transaction is on proccess!");
    } catch (error) {
      if (error instanceof TransactionExecutionError) {
        showErrorToast(error?.details);
        return;
      }
      console.log(error);
      showErrorToast("Something went wrong!");
    }
  };

  const handleFirstBuy = async () => {
    try {
      setLoadingMint(true);
      const statusWallet = isWalletConnected(!isConnected);
      const status = isCorrectNetwork(chain);
      if (!statusWallet || !status) return;
      const isSameNet = isSameNetwork(chain, digitalArtData?.chainId);
      if (!isSameNet) await switchNetwork?.(digitalArtData?.chainId);
      let isStableCoin = false;
      const currencyAddress = digitalArtData?.nftVoucher?.currencyAddress;
      const minPrice = digitalArtData?.nftVoucher?.minPrice;
      const isNFT1155 = digitalArtData?.nftContractType == NftContractType.NFT1155 ;
      const addressContract = digitalArtData?.nftContractAddress;
      if (currencyAddress != CURRENCY_ETHER) {
        isStableCoin = true;
        const params = {
          chainId: chain?.id,
          address: currencyAddress,
          ownerAddress: address,
          spenderAddress: addressContract,
        };
        const { result } = await getAllowance(params);
        if (
          parseFloat(result?.allowance) <
          parseFloat((minPrice * parseInt(digitalArtData?.amount)).toString())
        ) {
          const balanceTokens = await fetchBalance({
            address,
            token: currencyAddress,
            chain: chain?.id,
          });
          console.log("balanceTokens", balanceTokens)
          if (parseFloat(balanceTokens?.value) < parseFloat(minPrice)) {
            showErrorToast("Not Enought Token");
            return;
          }

          const { hash } = await ApproveTokens(currencyAddress, [
            addressContract,
            balanceTokens?.value,
          ]);
          const { status } = await waitForTransaction({ hash });
          if (status != "success") {
            showErrorToast("Error Approve Tokens");
            return;
          }
        }
      }
      const balanceTokens = await fetchBalance({
        address,
        chain: chain?.id,
      });
      if (parseFloat(balanceTokens?.value) < parseFloat(minPrice)) {
        showErrorToast("Not Enought Token");
        return;
      }
      if (isNFT1155) {
        const voucher1155: any = [
          digitalArtData.name,
          digitalArtData.description,
          digitalArtData?.nftVoucher.tokenId,
          digitalArtData?.nftVoucher.royalty.toString(),
          digitalArtData.amount,
          digitalArtData?.nftVoucher.minPrice.toString(),
          digitalArtData?.nftVoucher.uri,
          digitalArtData.creatorAddress.address,
          digitalArtData?.nftVoucher?.currencyAddress,
          digitalArtData?.nftVoucher.nonce,
          digitalArtData?.nftVoucher.signature,
        ];
        const { hash } = await RedeemNFT1155(
          voucher1155,
          isStableCoin,
          minPrice.toString()
        );

        await transactionApi.saveTransactionByUser({
          userAddress: address,
          transactionHash: hash,
          chainId: chain?.id,
          eventType: TransactionType.MINT,
          nftContractAddress: digitalArtData?.nftVoucher?.nftContractAddress,
          tokenId: digitalArtData?.nftVoucher?.tokenId,
          productId: digitalArtData?.id,
          quantity: digitalArtData?.amount,
        });
      } else {
        const voucher721: any = [
          digitalArtData.name,
          digitalArtData.description,
          digitalArtData?.nftVoucher.tokenId,
          digitalArtData?.nftVoucher.royalty.toString(),
          digitalArtData?.nftVoucher.minPrice.toString(),
          digitalArtData?.nftVoucher.uri,
          digitalArtData.creatorAddress.address,
          digitalArtData?.nftVoucher?.currencyAddress,
          digitalArtData?.nftVoucher.nonce,
          digitalArtData?.nftVoucher.signature,
        ];
        const { hash } = await RedeemNFT721(
          voucher721,
          isStableCoin,
          minPrice.toString()
        );
        await transactionApi.saveTransactionByUser({
          userAddress: address,
          transactionHash: hash,
          chainId: chain?.id,
          eventType: TransactionType.MINT,
          nftContractAddress: digitalArtData?.nftVoucher?.nftContractAddress,
          tokenId: digitalArtData?.nftVoucher?.tokenId,
          productId: digitalArtData?.id,
          quantity: digitalArtData?.amount
        });
      }
      showSuccessToast("Your transaction is on proccess!");
      fetchData();
    } catch (error) {
      if (error instanceof TransactionExecutionError) {
        showErrorToast(error?.details);
        return;
      }
      console.log(error);
      showErrorToast("Something went wrong!");
    } finally {
      setLoadingMint(false);
    }
  };

  const fetchData = () => {
    setTimeout(()=> {
      getActivities();
      fetchOffersProduct();
      getOwners();
    }, 5000)
  }

  const handleSendToApprove = async (product: any) => {
    try {
      setLoading(true);
      if (!isConnected) {
        showErrorToast("Please, connect your wallet.");
        return;
      }
      const response: any = await sendToApproveDigitalArtNft(product?.id, {
        userAddress: address,
      });

      if (response.data) {
        showSuccessToast("NFT send to admin for approval.");
      } else {
        showErrorToast("Error on send to admin for approval.");
      }

      fetchData();
    } catch (error: any) {
      showErrorToast("Something went wrong on send to approve");
    } finally {
      setLoading(false);
    }
  };

  const getMetadata = async () => {
    try {
      const chainId = digitalArtData?.chainId;
      const addressNft = digitalArtData?.nftContractAddress
      const tokenId = digitalArtData?.tokenId;
      const { result } = await getNFTMetadata({ chainId, addressNft, tokenId });
      setMetadata(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getItemListed = async (
    nftAddress: string,
    tokenId: string,
    chainId: number,
    arrayOwners: any[]
  ) => {
    try {
      const array: any = [];
      for (const owner of arrayOwners) {
        const values: any = [nftAddress, tokenId, owner?.owner_of];
        const { result } = await GetListItemDetails(chainId, values);
        if (result && result[0] > 0) {
          const params = {
            ...result,
            sellerAddress: owner?.owner_of,
          };
          array.push(params);
        }
      }
      setListingsList(array);
    } catch (error) {
      console.log(error);
    }
  };
  const getActivities = async () => {
    try {
      const { data } = await getActivity(digitalArtData?.id);
      setActivities(data?.items);
    } catch (error) {
      console.log(error);
    }
  };

  const getListings = async () => {
    try {
      const params = {
        pageSize: 10,
        page:1
      }

      const { data } = await getListingsByProduct(digitalArtData?.id, params )
    } catch (error) {
      console.log(error)
    }
  }

  const fetchOffersProduct = async () => {
    try {
      const params = {
        limit: 10,
        offset: 0,
      };
      const { status, data } = await getOffersByProductId(
        digitalArtData?.id,
        params
      );

      if (status === HttpStatusCode.Ok && data) {
        setOfferList(data.items);
      } else {
        throw Error("error");
      }
    } catch (error) {
      showErrorToast("Error getting offers");
    }
  };
  const getPropertyOwner = async () => {
    try {
      const chainId = digitalArtData?.chainId;
      const tokenId = digitalArtData?.tokenId;
      if (owners && owners?.length > 1) {
        const arrayProperty = [];
        for (const owner of owners) {
          const balance = await BalanceOfNFT1155(chainId, [owner, tokenId]);
          arrayProperty.push({
            balance: balance,
            owner,
          });
        }
        setBalances(arrayProperty);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ImageModal
        disclosure={imageModelDisclosure}
        imageSrc={
          ipfsStruct?.image
            ? ipfsStruct?.image: metadata?.normalized_metadata?.image ? metadata?.normalized_metadata?.image : "/images/image-by-defect.jpg"
        }
        alt={
          ipfsStruct?.name
            ? ipfsStruct?.name: "default alt"
        }
      />
      <Accordion
        index={accodionIndex}
        allowMultiple
        onChange={(expandedIndex: number[]) => {
          setAccordionIndex(expandedIndex);
        }}
      >
        <Flex flexDirection={"column"} gap={"40px"}>
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            width={"100%"}
            gap={{ base: "40px", md: "64px" }}
          >
            <Flex
              align={"center"}
              w={"100%"}
              flex={0.8}
              flexDirection={"column"}
              gap={"16px"}
            >
              <Hide above="md">
                <HStack w={"100%"} justify={"space-between"}>
                  <Button
                    p={"10px"}
                    variant="outline"
                    onClick={() => router.back()}
                    border={"2px solid #DDE3EE"}
                    w={"48px"}
                  >
                    <LeftArrowIcon />
                  </Button>
                  <Text fontWeight={"500"} fontSize={"16px"}>
                    View Art
                  </Text>
                  <Button
                    p={"10px"}
                    visibility={"hidden"}
                    variant="outline"
                    border={"2px solid #DDE3EE"}
                    w={"48px"}
                  >
                    <ShareIcon />
                  </Button>
                </HStack>
              </Hide>
              <Box maxHeight={"520px"} w="100%" h="100%" position="relative">
                <Badge bg="blackAlpha.400" color="white" px="4" py="2" position="absolute" top="2" left="2" fontSize="lg">
                  x{isVoucher ? digitalArtData?.amount : metadata?.amount}
                </Badge>
                <Image
                  onClick={imageModelDisclosure.onOpen}
                  src={
                    ipfsStruct?.image
                      ? ipfsStruct?.image: metadata?.normalized_metadata?.image ?
                      metadata?.normalized_metadata?.image : "/images/image-by-defect.jpg"
                  }
                  alt={
                    ipfsStruct?.name
                      ? ipfsStruct?.name
                      : "default alt"
                  }
                  boxShadow=" 0px 2px 4px rgba(0, 0, 0, 0.2)"
                  objectFit="contain"
                  objectPosition={"center center"}
                  width={"100%"}
                  height={"100%"}
                />
              </Box>
            </Flex>
            <Flex
              flexDirection={"column"}
              flex={1}
              gap="40px"
              justifyContent={"center"}
            >
              <Stack gap={"24px"} w={"100%"}>
                <Heading as={"h1"}>
                  {ipfsStruct?.name}
                </Heading>
                <Text fontSize="14px" opacity={"0.8"}>
                  {isVoucher ? __("property_of") : __("minted_by")}{" "}
                  <Text
                    fontWeight="medium"
                    color="primary.100"
                    as="span"
                    display={"inline"}
                    wordBreak={"break-all"}
                  >
                    {`@${owners}`}
                  </Text>
                </Text>
              </Stack>
              <Stack gap={"24px"}>
                <Flex fontSize="14px" gap="40px" opacity={"0.8"}>
                  <Text display="flex" alignItems="center" gap="6px">
                    <MdOutlineVisibility size="24px" />
                    {digitalArtData?.visitsCount
                      ? digitalArtData?.visitsCount
                      : 0}{" "}
                    {__("visualizations")}
                  </Text>
                </Flex>
                <Flex gap="16px" flexWrap="wrap">
                  {digitalArtData?.tags &&
                    digitalArtData?.tags
                      .split(",")
                      .map((tag: string, i: number) => (
                        <Box
                          key={"digitalArtData.tags-" + i}
                          borderRadius="4px"
                          color="primary.100"
                          border="1px solid"
                          borderColor="primary.100"
                          display="flex"
                          alignItems="center"
                          lineHeight={"140%"}
                          padding="6px 16px"
                          gap="8px"
                        >
                          <MdCircle size="8px" />{" "}
                          <Text fontWeight={"500"} fontSize="12px">
                            {tag}
                          </Text>
                        </Box>
                      ))}
                </Flex>
              </Stack>
              <Stack gap="8px">
                <Text fontSize="16px" color="gray.100">
                  {listingsList.length > 0
                    ? __("actual_price")
                    : __("historic_price")}
                </Text>
                <Flex fontSize="16px" alignItems="center" gap="8px">
                  <Text fontSize="32px" fontWeight="medium" mr="8px">
                    {`${currentPrice} ${symbolCurrency}`}
                  </Text>
                </Flex>
              </Stack>
              <Flex gap="24px">
                {/* connected */}
                {isConnected &&
                  loggedIn &&
                  (isVoucher ? (
                    isVoucher?.onSale ? (
                      <>
                        {digitalArtData?.approvalStatus ===
                        ApprovalStatus.APPROVED ? (
                          <Button
                            loadingText={__("loading") + "..."}
                            isLoading={loadingMint}
                            onClick={() => handleFirstBuy()}
                            // onClick={()=>testNotificacion()}
                          >
                            Buy Item
                          </Button>
                        ) : (
                          <>
                            {owners.includes(address.toLowerCase()) && (
                              <Button w={"100%"} isDisabled={true}>
                                {digitalArtData?.approvalStatus ==
                                  ApprovalStatus.WAITING &&
                                  __("waiting_for_approval_three_dots")}
                                {digitalArtData?.approvalStatus ==
                                  ApprovalStatus.DENIED &&
                                  __("Product was rejected by admin")}
                              </Button>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {owners.includes(address.toLowerCase()) && (
                          <Button
                            w={"100%"}
                            isLoading={loading}
                            loadingText={__("loading") + "..."}
                            onClick={() => handleSendToApprove(digitalArtData)}
                            // onClick={() => testNotification()}
                          >
                            {__("send_to_approve")}
                          </Button>
                        )}
                      </>
                    )
                  ) : (
                    <>
                      {owners.includes(address.toLowerCase()) ? (
                        <ListingModal
                          disabled={digitalArtData?.nftContractType == NftContractType.EXPERIENCE}
                          item={digitalArtData}
                          userAlreadyListed={listingsList?.length > 0}
                          onClick={handleListing}
                          metadata={metadata}
                        />
                      ) : (
                        <OfferModal
                        disabled={digitalArtData?.nftContractType == NftContractType.EXPERIENCE}
                          item={digitalArtData}
                          userOfferAlready={false}
                          onClick={handleMakeOffer}
                          metadata={metadata}
                        />
                      )}
                    </>
                  ))}
                {/* Not connected */}
                {!isConnected &&
                  (isVoucher ? (
                    <>
                      {isVoucher?.onSale ? (
                        <>
                          {digitalArtData?.approvalStatus ===
                          ApprovalStatus.APPROVED ? (
                            <Button
                              loadingText={__("loading") + "..."}
                              isLoading={loadingMint}
                              onClick={() => handleFirstBuy()}
                            >
                              Buy Item
                            </Button>
                          ) : (
                            <Button w={"100%"} isDisabled={true}>
                              {digitalArtData?.approvalStatus ==
                                ApprovalStatus.WAITING &&
                                __("waiting_for_approval_three_dots")}
                              {digitalArtData?.approvalStatus ==
                                ApprovalStatus.DENIED &&
                                __("Product was rejected by admin")}
                            </Button>
                          )}
                        </>
                      ) : (
                        <>{/* Not show */}</>
                      )}
                    </>
                  ) : (
                    <OfferModal
                    disabled={digitalArtData?.nftContractType == NftContractType.EXPERIENCE}
                      item={digitalArtData}
                      userOfferAlready={false}
                      onClick={handleMakeOffer}
                      metadata={metadata}
                    />
                  ))}
              </Flex>
            </Flex>
          </Flex>
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            width={"100%"}
            gap={{ base: "40px", md: "64px" }}
          >
            <Flex flex={0.8} justify={"center"}>
              <Card
                px={{ base: "0px", md: "20px" }}
                w={"100%"}
                height={"fit-content"}
                variant={{ base: "unstyled", md: "elevated" }}
              >
                <CardBody>
                  <Stack spacing="0">
                    <Text
                      fontWeight="500"
                      fontSize={{ base: "20px", md: "16px" }}
                    >
                      {__("description")}
                    </Text>
                    <Text pt={"8px"} fontSize="14px" opacity={"0.8"}>
                      {__("by")}{" "}
                      <Text
                        fontWeight="medium"
                        color="primary.100"
                        as="span"
                        display={"inline"}
                        wordBreak={"break-all"}
                      >
                        {`@${owners}`}
                      </Text>
                    </Text>
                    <Text
                      as="span"
                      mt={"24px"}
                      fontSize="14px"
                      color="gray.400"
                    >
                      {ipfsStruct?.description}
                    </Text>
                  </Stack>
                  <Flex my={"24px"}>
                    <ShareSocialNetworks
                      title={
                        ipfsStruct?.name
                      }
                      shareRoute={currentUrl}
                    />
                  </Flex>
                  <AccordionItem my={"24px"}>
                    <h2>
                      <AccordionButton
                        py={{ base: "14px", md: "0" }}
                        borderBottom={{ base: "2px solid #E6E6E6", md: "none" }}
                      >
                        <Box as="span" flex="1" textAlign="left">
                          <Box
                            fontWeight={"500"}
                            fontSize={{ base: "20px", md: "16px" }}
                            color="gray.800"
                          >
                            {__("details")}
                          </Box>
                        </Box>
                        <AccordionIcon w="30px" h="30px" color="#231F20" />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel p="0">
                      <Stack spacing="16px" pt={"24px"}>
                        <Flex justifyContent={"space-between"}>
                          <Text>{__("contract_address")}</Text>
                          <Text fontWeight="medium">
                            <Link
                              isExternal
                              href={`${WEB_SCAN[digitalArtData?.chainId]}${
                                digitalArtData?.nftContractAddress
                              }`}
                            >
                              {" "}
                              {truncateAddress(
                                  digitalArtData?.nftContractAddress
                                  )}
                            </Link>
                          </Text>
                        </Flex>
                        <Flex justifyContent={"space-between"}>
                          <Text>{__("token_id")}</Text>
                          <Text fontWeight="medium">
                            {digitalArtData?.tokenId}
                          </Text>
                        </Flex>
                        <Flex justifyContent={"space-between"}>
                          <Text>{__("token_standard")}</Text>
                          <Text fontWeight="medium">
                            {isVoucher
                              ? digitalArtData?.amount > 1
                                ? "ERC-1155"
                                : "ERC-721"
                              : metadata?.contract_type}
                          </Text>
                        </Flex>
                        <Flex justifyContent={"space-between"}>
                          <Text>{__("chain")}</Text>
                          <Text fontWeight="medium">
                            {NameChain(digitalArtData?.chainId)}
                          </Text>
                        </Flex>

                        <Flex justifyContent={"space-between"}>
                          <Text>{__("last_updated")}</Text>
                          <Text fontWeight="medium">
                            {isVoucher
                              ? digitalArtData?.updatedAt
                                ? formatDate(digitalArtData?.updatedAt)
                                : digitalArtData?.updatedAt
                              : formatDate(metadata?.last_metadata_syn)}
                          </Text>
                        </Flex>
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                  <Box display={{ base: "block", md: "none" }}>
                    <TokenChart product={digitalArtData} />
                    <ListingsProductTable
                      listings={listingsList}
                      product={digitalArtData}
                    />
                    <OffersProductTable
                      offers={offersList}
                      product={digitalArtData}
                      fetchData={fetchOffersProduct}
                      owners={owners}
                      metadata={metadata}
                    />
                  </Box>
                </CardBody>
              </Card>
            </Flex>
            <Flex
              display={{ base: "none", md: "flex" }}
              flex={1}
              gap={"40px"}
              flexDirection={"column"}
              overflow={"auto"}
            >
              <TokenChart product={digitalArtData} />
              <ListingsProductTable
                listings={listingsList}
                product={digitalArtData}
              />
              <OffersProductTable
                offers={offersList}
                product={digitalArtData}
                fetchData={fetchOffersProduct}
                owners={owners}
                metadata={metadata}
              />
            </Flex>
          </Flex>
          <ItemActivity item={digitalArtData} activities={activities} />
        </Flex>
      </Accordion>
    </>
  );
}
