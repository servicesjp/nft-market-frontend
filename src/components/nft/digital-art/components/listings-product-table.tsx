
import { showErrorToast, showSuccessToast } from "@/components/toast";
import { CURRENCY_ETHER, MARKETPLACE } from "@/constants/env";
import { __ } from "@/helpers/common";
import { MarketplaceContract } from "@/hooks/contract/places/marketplace-contract";
import { useERC20 } from "@/hooks/useERC20";
import { UserContext } from "@/modules/provider/user-info-provider";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import { formatPrice, isCorrectNetwork, isSameNetwork, isWalletConnected } from "@/modules/utils";
import { truncarText } from "@/utils";
import { TransactionType } from "@/hooks/types/contracts/events"
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { waitForTransaction } from "wagmi/actions";
import { ERC20Contract } from "@/hooks/contract/erc20";
import { useApiTokens } from "@/hooks/moralis"
import { useTransactionApi } from "@/hooks/useApi";
export interface IListingsProductTable {
  product: any;
  listings: any[];
  onBuyListing?: any;
}

export function ListingsProductTable({
  product,
  listings,
  onBuyListing,
}: IListingsProductTable) {
  
  const [loadingBuy, setLoadingBuy] = useState<boolean>(false);
  const { chain, address, fetchBalance, isConnected, switchNetwork } =
    useContext(WalletConnectContext);
    const { loggedIn } = useContext(UserContext);
    const { BuyItemWithERC20Market, BuyItemMarket } =
    MarketplaceContract();
    const { getAllowance } = useApiTokens();
    const { CancelListingMarket } =
    MarketplaceContract();
    const {ApproveTokens} = ERC20Contract()
    const { getTokenDetails } = useERC20()
    const transactionApi = useTransactionApi()
  
  async function cancelFromListing(listing: any) {
    if(!loggedIn) {
      showErrorToast("User Not Log In")
      return
    }
    try {
      setLoadingBuy(true);
      const statusWallet = isWalletConnected(!isConnected);
      const statusNet = isCorrectNetwork(chain);
      if (!statusWallet || !statusNet) return;
      const isSameNet = isSameNetwork(chain, product?.chainId);
      if (!isSameNet) await switchNetwork?.(product?.chainId);
      const nftAddress = product.nftContractAddress

      const values = [nftAddress, product?.tokenId?.toString()];
      const { hash } = await CancelListingMarket(values);
      const { status } = await waitForTransaction({ hash });
      if (status != "success") {
        showErrorToast(__("cancel_list_failed"));
        return;
      }
      
      showSuccessToast(__("cancel_successful"));

    } catch (error) {
    } finally {
      setLoadingBuy(false);
    }
  }

  async function buyFromListing(listing: any) {
    if (!loggedIn) {
      showErrorToast("User Not Log In");
      return;
    }
    try {
      setLoadingBuy(true);
      const statusWallet = isWalletConnected(!isConnected);
      const statusNet = isCorrectNetwork(chain);
      if (!statusWallet || !statusNet) return;
      const isSameNet = isSameNetwork(chain, product?.chainId);
      if (!isSameNet) await switchNetwork?.(product?.chainId);
      let isStableCoin = false;
      const priceItem =
        parseInt(listing?.pricePerItem) * parseInt(listing?.quantity);
      const payToken = listing?.payToken;
      const tokenId = product?.tokenId;
      const nftAddressContract = product.nftContractAddress
      const addressMarket = MARKETPLACE[chain.id]
      if (payToken != CURRENCY_ETHER) {
        isStableCoin = true;
        const params = {
          chainId: chain?.id,
          address: payToken,
          ownerAddress: address,
          spenderAddress: addressMarket,
        };
        const { result } = await getAllowance(params);
        let statusTransaction = "";
        if (parseFloat(result?.allowance) < priceItem) {
          const { value } = await fetchBalance({
            address,
            token: payToken,
            chain: chain?.id,
          });
          if (parseFloat(value) < priceItem) {
            showErrorToast("Not Enought Token");
            return;
          }
          const {hash} = await ApproveTokens(listing?.payToken , [addressMarket, value])
          const { status } = await waitForTransaction({ hash });
          statusTransaction = status;
        }
      }

      let hashTransaction = "";

      if (isStableCoin) {
        const values: any = [
          nftAddressContract,
          tokenId,
          payToken,
          listing?.sellerAddress,
        ];
        console.log('values',values)
        const { hash } = await BuyItemWithERC20Market(values);
        hashTransaction = hash;
      } else {
        const values: any = [nftAddressContract, tokenId, listing?.sellerAddress];
        const { hash } = await BuyItemMarket(values, priceItem);
        hashTransaction = hash;
      }
      await transactionApi.saveTransactionByUser({
        userAddress: address,
        transactionHash: hashTransaction,
        chainId: chain?.id,
        eventType: TransactionType.SOLD_ITEM,
        nftContractAddress: nftAddressContract,
        tokenId: tokenId,
        productId: product?.id,
        quantity: listing?.quantity.toNumber()
      });
    } catch (error) {
    } finally {
      setLoadingBuy(false);
    }
  }


  return (
    <Card
      w={"100%"}
      height={"fit-content"}
      variant={{ base: "unstyled", md: "elevated" }}
      border={{base: "none", md: "1px solid #dddddd"}}
      borderRadius="4px"
    >
      <CardBody>
        <AccordionItem my={{base: "24px", md: "0"}}>
          <h2>
            <AccordionButton py={{base: "14px", md: "0"}} borderBottom={{base: "2px solid #E6E6E6", md: "none"}}>
              <Box as="span" flex="1" textAlign="left">
                <Box
                  fontWeight={"500"}
                  fontSize={{ base: "20px", md: "16px" }}
                  color="gray.800"
                >
                  {__("listings")}
                </Box>
              </Box>
              <AccordionIcon w="30px" h="30px" color="#231F20"/>
            </AccordionButton>
          </h2>
          <AccordionPanel p={"0px"}>
            <TableContainer>
              <Table
                variant="simple"
                colorScheme="table"
                fontSize="14px"
                borderColor="gray.100"
              >
                <Thead>
                  <Tr>
                    <Th>{__("price")}</Th>
                    <Th>{__("quantity")}</Th>
                    <Th>{__("from")}</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {listings?.length > 0 ? (
                    listings?.map((listing: any, index: number) => {
                      return (
                        <Tr key={index} gap={""}>
                          <Td alignContent={"center"}>
                            {formatPrice(
                              parseInt(listing?.pricePerItem) *
                                parseInt(listing?.quantity),
                              listing?.payToken,
                              getTokenDetails(
                                product?.chainId,
                                listing?.payToken
                              ).decimals
                            )}{" "}
                            {`${
                              getTokenDetails(
                                product?.chainId,
                                listing?.payToken?.toString()
                              )?.symbol
                            }`}
                          </Td>

                          <Td>{listing?.quantity.toString()}</Td>
                          <Td>{`@${truncarText(
                            listing?.sellerAddress,
                            10
                          )}`}</Td>
                          <Td>
                            {isConnected && loggedIn && address ? (
                              <>
                                {listing?.sellerAddress?.toLowerCase() ==
                                address.toLowerCase() ? (
                                  <Button
                                    colorScheme={"red.500"}
                                    isLoading={loadingBuy}
                                    loadingText={__("loading") + "..."}
                                    onClick={() => cancelFromListing(listing)}
                                  >
                                    {__("cancel_list")}
                                  </Button>
                                ) : (
                                  <Button
                                    isLoading={loadingBuy}
                                    loadingText={__("loading") + "..."}
                                    onClick={() => buyFromListing(listing)}
                                  >
                                    {__("buy_now")}
                                  </Button>
                                )}
                              </>
                            ) : (
                              <Button
                                isLoading={loadingBuy}
                                loadingText={__("loading") + "..."}
                                onClick={() => buyFromListing(listing)}
                              >
                                {__("buy_now")}
                              </Button>
                            )}
                          </Td>
                        </Tr>
                      );
                    })
                  ) : (
                    <Tr>
                      <Td colSpan={4}>
                        <Center textAlign={"center"} w={"100%"}>
                          {__("no_data_found")}
                        </Center>
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </AccordionPanel>
        </AccordionItem>
      </CardBody>
    </Card>
  );
}