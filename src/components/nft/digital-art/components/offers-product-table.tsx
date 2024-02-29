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
import {
  formatPrice,
  isCorrectNetwork,
  isSameNetwork,
  isWalletConnected,
} from "@/modules/utils";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import { useContext, useState } from "react";
import { MARKETPLACE} from "@/constants/env";
import { showErrorToast, showSuccessToast } from "@/components/toast";
import { ERC20Contract } from "@/hooks/contract/erc20";
import { useOfferApi } from "@/hooks/useApi";
import { __ } from "@/helpers/common";
import DateDifference from "@/components/date-difference";
import { NFT1155Contract } from "@/hooks/contract/nft/nft1155-contract";
import { NFT721Contract } from "@/hooks/contract/nft/nft721-contract";
import { MarketplaceContract } from "@/hooks/contract/places/marketplace-contract";
import { useTransactionApi } from "@/hooks/useApi";
import { useERC20 } from "@/hooks/useERC20";
import { UserContext } from "@/modules/provider/user-info-provider";
import { TransactionExecutionError } from "viem";
import { TransactionType } from "@/hooks/types/contracts/events";
export interface IOffersProductTable {
  product: any;
  offers: any[];
  fetchData: any;
  owners: any[];
  metadata: any;
}

export function OffersProductTable({
  product,
  offers,
  fetchData,
  owners,
  metadata,
}: IOffersProductTable) {
  const [loading, setLoading] = useState<boolean>(false);
  const { chain, signer, address, fetchBalance, isConnected, switchNetwork } =
    useContext(WalletConnectContext);
  const { loggedIn } = useContext(UserContext);
  const { AcceptOfferMarket, CancelOfferMarket } = MarketplaceContract();
  const { acceptOffer, cancelOffer } = useOfferApi();
  const { getTokenDetails } = useERC20();
  const { ApproveTokens } = ERC20Contract();
  const { RedeemNFT721, SetApprovalForAllNFT721 } = NFT721Contract();
  const { RedeemNFT1155, SetApprovalForAllNFT1155, BalanceOfNFT1155 } =
    NFT1155Contract();
  const transactionApi = useTransactionApi();
  async function acceptFromOffer(currentOffer: any) {
    if (!loggedIn) {
      showErrorToast("User Not Log In");
      return;
    }
    try {
      setLoading(true);
      const statusWallet = isWalletConnected(!isConnected);
      const statusNet = isCorrectNetwork(chain);
      if (!statusWallet || !statusNet) return;
      const isSameNet = isSameNetwork(chain, product?.chainId);
      if (!isSameNet) await switchNetwork?.(product?.chainId);

      const marketAddress = MARKETPLACE[chain?.id];
      const approval: any = [marketAddress, true];
      const nftAddress = product.nftContractAddress;
      const tokenId = product?.tokenId;
      const acceptOfferData: any = [
        nftAddress,
        tokenId.toString(),
        currentOffer?.buyerAddress?.address,
      ];
      const { hash } = await AcceptOfferMarket(acceptOfferData);
      showSuccessToast("Your transaction is on proccess!");
      await transactionApi.saveTransactionByUser({
        userAddress: address,
        transactionHash: hash,
        chainId: chain?.id,
        eventType: TransactionType.SOLD_ITEM,
        nftContractAddress: nftAddress,
        tokenId: tokenId,
        productId: product.id,
        quantity: parseInt(currentOffer.quantity.toString())
      });
    } catch (error: any) {
      if (error instanceof TransactionExecutionError) {
        showErrorToast(error?.details);
        console.log(error);
        return;
      }
      console.log(error);
      showErrorToast(error?.message);
    } finally {
      setLoading(false);
    }
  }

  async function cancelFromOffer(currentOffer: any) {
    try {
      if (
        currentOffer?.buyerAddress?.address.toLowerCase() !=
        address.toLowerCase()
      ) {
        showErrorToast("You are not owner of this offer");
        return;
      }
      setLoading(true);
      const chainId = product?.chainId;
      const statusWallet = isWalletConnected(!isConnected);
      const statusNet: any = isCorrectNetwork(chain);
      if (!statusWallet || !statusNet) return;
      const isSameNet = isSameNetwork(chain, chainId);
      if (!isSameNet) await switchNetwork?.(chainId);
      const nftAddress = product.nftContractAddress;
      const cancelOfferData = [nftAddress, product?.tokenId?.toString()];

      const { hash } = await CancelOfferMarket(cancelOfferData);
      await transactionApi.saveTransactionByUser({
        userAddress: address,
        transactionHash: hash,
        chainId: chain?.id,
        eventType: TransactionType.CANCEL_OFFER,
        nftContractAddress: nftAddress,
        tokenId: product?.tokenId,
        productId: product.id,
        quantity: parseInt(currentOffer.quantity.toString())
      });
    } catch (error: any) {
      if (error instanceof TransactionExecutionError) {
        showErrorToast(error?.details);
        console.log(error);
        return;
      }
      console.log(error);
      showErrorToast(error?.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card
      w={"100%"}
      height={"fit-content"}
      variant={{ base: "unstyled", md: "elevated" }}
      border={{ base: "none", md: "1px solid #dddddd" }}
      borderRadius="4px"
    >
      <CardBody>
        <AccordionItem my={{ base: "24px", md: "0" }}>
          <h2>
            <AccordionButton
              py={{ base: "14px", md: "0" }}
              borderBottom={{ base: "2px solid #E6E6E6", md: "none" }}
            >
              <Box as="span" flex="1" textAlign="left" fontWeight={"semibold"}>
                <Box
                  fontWeight={"500"}
                  fontSize={{ base: "20px", md: "16px" }}
                  color="gray.800"
                >
                  {__("offers")}
                </Box>
              </Box>
              <AccordionIcon w="30px" h="30px" color="#231F20" />
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
                    <Th>{__("expiry")}</Th>
                    <Th></Th>
                    {isConnected && loggedIn && address && <Th></Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {offers?.length > 0 ? (
                    offers?.map((offer: any, index: number) => {
                      return (
                        <Tr key={index} gap={""}>
                          <Td alignContent={"center"}>
                            {formatPrice(
                              parseInt(offer?.price) *
                                parseInt(offer?.quantity),
                              offer?.currencyAddress,
                              getTokenDetails(
                                product?.chainId,
                                offer?.currencyAddress.toString()
                              ).decimals
                            )}{" "}
                            {`${
                              getTokenDetails(
                                product?.chainId,
                                offer?.currencyAddress?.toString()
                              )?.symbol
                            }`}
                          </Td>

                          <Td>{offer?.quantity}</Td>
                          <Td>{`@${offer?.buyerAddress?.user?.username}`}</Td>
                          <Td>
                            <DateDifference date={offer?.expiry} />
                          </Td>
                          {isConnected && loggedIn && address && (
                            <Td>
                              {offer?.buyerAddress?.address.toLowerCase() ==
                                address.toLowerCase() && (
                                <Button
                                  colorScheme={"red.500"}
                                  isLoading={loading}
                                  loadingText={__("loading") + "..."}
                                  onClick={() => cancelFromOffer(offer)}
                                >
                                  {__("cancel_offer")}
                                </Button>
                              )}
                              {owners.includes(address.toLowerCase()) && (
                                <Button
                                  isLoading={loading}
                                  loadingText={__("loading") + "..."}
                                  onClick={() => acceptFromOffer(offer)}
                                >
                                  {__("accept_offer")}
                                </Button>
                              )}
                            </Td>
                          )}
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
