import MEbreadcrumb, { IBreadCrumbData } from "@/components/MEbreadcrumb";
import {
  Box,
  Flex,
  Text,
  Card,
  CardBody,
  // Button,
  Divider,
  Image as Img
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import Responsive from "@/hooks/useResponsive";
import { __ } from "@/helpers/common";
import moment from "moment";
import { useInfoTicketsApi } from "@/hooks/useApi";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import Spinner from "@/components/spinner";
import useApiIPFS from "@/hooks/useIpfs";
import QRCode from "easyqrcodejs";
import { useRouter } from "next/router";
import {ExperienceContract} from "@/hooks/contract/nft/experience-contract";
import { authSession } from "@/modules/auth/auth-session";
import { showErrorToast, showSuccessToast } from "@/components/toast";
import { UserContext } from "@/modules/provider/user-info-provider";
import {
  formatPrice,
  isCorrectNetwork,
  isSameNetwork,
  isWalletConnected,
} from "@/modules/utils";
// import { InfoTicketsStatus } from "@/types/InfoTicketsStatus";
import { NftType, NftTypeByName } from "@/types/NftType";
import { BurnInfoTicketDTO } from "@/hooks/types/info-tickets/BurnInfoTicketDTO";
import { waitForTransaction } from 'wagmi/actions';
import { useERC20 } from "@/hooks/useERC20";
interface IPFS {
  name: string;
  description: string;
  image: string;
}
export default function ExperiencePurchased({ ticketId }: any) {
  const { isMobile } = Responsive();
  const { getOneInfoTicketsById, burnTicketsById, approveInfoTicketByEventOwner } = useInfoTicketsApi();
  const router = useRouter();
  const { userId, nftUser } = useContext(UserContext);
  const {getTokenDetails} = useERC20()
  const currentUrl = process.env.NEXT_PUBLIC_NFT_URL + router.asPath;
  const { chain, address, fetchBalance, isConnected, switchNetwork } =
    useContext(WalletConnectContext);
  const { enterEventAndBurnTicket, buyerInfo  } = ExperienceContract();
  const [authenticated, setAuthenticated] = useState<boolean>(
    authSession.hasSession
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isBuyer, setIsBuyer] = useState<boolean>(false);
  const [loadingBurn, setLoadingBurn] = useState<boolean>(false)
  const [loadingApprove, setLoadingApprove] = useState<boolean>(false)
  const [dataTicket, setDataTicket] = useState<any>(undefined);
  const [infoBuyTicket, setInfoBuyTicket] = useState<any>(0);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [assetImage, setAssetImage] = useState<IPFS>({
    name: "",
    description: "",
    image: "",
  });
  
  const [activities, setActivities] = useState<any[]>([]);
  const [breadcrumb, setBreadcrumb] = useState<IBreadCrumbData[]>([
    { text: "Account", link: "/account" },
    { text: "Info Ticket", link: "#", isCurrentPage: true },
  ]);
  const { readLinkIPFS } = useApiIPFS();
  const qrcodeDOM = useRef(null);

  let qrcode: any = null;
  async function generate(textQr: string) {
    if (qrcode) {
      qrcode.clear();
    }
    const sizeQr = 200;
    const options = {
      text: textQr,
      width: sizeQr,
      height: sizeQr,
      crossOrigin: "anonymous",
      colorDark: "black",
      // backgroundImage: backgroundImageUrl,
    };
    if (qrcodeDOM.current) {
      qrcode = await new QRCode(qrcodeDOM.current, options);
    }
  }
  const spaceBetwCont = "22px";

  async function fetchDataInfoTickets() {
    let data
    try {
      data = await getOneInfoTicketsById(ticketId, address);
      setDataTicket(data?.data);
      getBuyerInfo(data?.data?.chainId, [address, data?.data?.uniqueEventId])
    } catch (error: any) {
      router.push("/404")
    }

    return data
  }

  useEffect(() => {
    (async () => {
      try {
        setLoadingPage(true);
        setLoading(true);
        let response;
        let data: any = await fetchDataInfoTickets()

        const assets = data?.data?.experienceInstance?.experience?.product?.mediaAssets;
        const primaryMedia = assets?.find(
          (media: any) => media.contentType === 0
        );
        // if (primaryMedia?.ipfs) {
        //   response = await readLinkIPFS(primaryMedia?.ipfs);
        //   setAssetImage(response);
        // }

        const preloadImage = new Image();
        preloadImage.src = data?.data?.ipfsImageUrl;
        preloadImage.onload = async () => {
          await generate( currentUrl);
          setLoading(false);
        };
        setLoading(false);
      } catch (error) {
      } finally {
        setLoadingPage(false);
      }
    })();
    return () => {
      qrcodeDOM.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(()=>{

  },[])

  const getBuyerInfo = async (chain: any, values: any[])=>{
    const { result } = await buyerInfo(chain, values)
    setInfoBuyTicket(result)
  }

  function getLocationExperience(mapPoint: any) {
    if (mapPoint) {
      const location = JSON.parse(mapPoint)[0];
      return location ? location?.addressName : "";
    }
    return "";
  }


  async function saveApprove() {
    try {

      setLoadingApprove(true)
      const response = await approveInfoTicketByEventOwner(ticketId, {
        userAddress: address
      })

      if (response.data) {
        showSuccessToast(__('operation_saved_successfully'))
        await fetchDataInfoTickets()
      } else {
        throw Error(__('operation_not_saved'))
      }

    } catch (error) {
      if (error instanceof Error) showErrorToast(error.message)
      console.log(error);
    } finally {
      setLoadingApprove(false)
    }
  }

  async function saveBurnTicket(data: BurnInfoTicketDTO) {
    try {
      const response = await burnTicketsById(ticketId, data)

      if (response.data) {
        showSuccessToast(__('operation_saved_successfully'))
        await fetchDataInfoTickets()
      } else {
        throw Error(__('operation_not_saved'))
      }

    } catch (error) {
      if (error instanceof Error) showErrorToast(error.message)
      console.log(error);
    }
  }

  async function enterAndburnTicket() {
    try {
      if (dataTicket) {
        if (!authenticated) {
          showErrorToast("User Not Log In");
          return;
        }
        isWalletConnected(!isConnected);
        const status = isCorrectNetwork(chain);
        const isSameNet = isSameNetwork(
          chain,
          dataTicket?.experienceInstance?.experience?.product?.chainId
        );
        switchNetwork?.(dataTicket?.experienceInstance?.experience?.product?.chainId);
        if (!status) return;
        if (!isSameNet) return;
        setLoadingBurn(true)
        const eventId =
          dataTicket?.experienceInstance?.uniqueEventId;

        const { hash } = await enterEventAndBurnTicket(eventId)
        let transactionReceipt = await waitForTransaction({ hash })

        if (transactionReceipt.status == 'success') {
          showSuccessToast("Transaction Successfully")
          const data: BurnInfoTicketDTO = {
            transactionHash: hash,
            userAddress: address,
          }
          await saveBurnTicket(data)
        } else {
          showErrorToast('Transaction failed')
        }

      }
    } catch (error) {
      showErrorToast('Transaction failed')
      console.log(error);
    } finally {
      setLoadingBurn(false)
    }
  }

  const goNftByType = (id:string, typeNft: NftType)=>{

    const nameNft = NftTypeByName[typeNft];

    if (nameNft) {
      router.push(`/nft/${nameNft}/${id}`);
    } else {
      router.push("/marketplace/experience");
    }

  }

  // main return
  return (
    <>
      {loadingPage ? (
        <Spinner />
      ) : (
        <>
          <Flex flexDirection={"column"} gap={"8px"}>
            <MEbreadcrumb items={breadcrumb}></MEbreadcrumb>
            <Text fontSize={"32px"} fontWeight={"medium"}>
              Overview Info Ticket
            </Text>
            <Text>Welcome to NFT Ticket</Text>
          </Flex>
          <Flex flexDirection={isMobile ? "column" : "row"} gap={"40px"}>
            <Flex {...(isMobile ? { width: "100%" } : { flexBasis: "50%" })}>
              <Card border={"1.5px solid #EAEDEF"} width={"100%"}>
                <CardBody
                  p={spaceBetwCont}
                  borderRadius={"4px"}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={spaceBetwCont}
                >
                  <Text fontWeight={"medium"}>Ticket Details</Text>
                  <Flex
                    gap={spaceBetwCont}
                    flexDirection={isMobile ? "column" : "row"}
                  >
                    <Flex
                      flexDirection={"column"}
                      alignItems={"center"}
                      {...(isMobile ? { width: "100%" } : { flexBasis: "50%" })}
                      gap={spaceBetwCont}
                    >
                      {loading ? (
                        <Box textAlign={"center"}>
                          <Spinner />
                        </Box>
                      ) : (
                        <Box ref={qrcodeDOM}></Box>
                      )}

                      <Text textAlign={"center"}>
                        This QR code is for you to redeem your experience.
                      </Text>
                    </Flex>
                    <Flex
                      flexDirection={"column"}
                      {...(isMobile ? { width: "100%" } : { flexBasis: "50%" })}
                      gap={"16px"}
                    >
                      <Text fontWeight={"medium"}>EXPERIENCE</Text>
                      <Flex flexDirection={"column"} gap={"12px"}>
                        <Text
                          w={"100%"}
                          display={"flex"}
                          justifyContent={"space-between"}
                        >
                          {" "}
                          <Text as="span">
                            {moment
                              .utc(
                                dataTicket
                                  ?.startTime * 1000
                              )
                              .local()
                              .format("dd, D MMM HH:mm")}
                          </Text>{" "}
                          <Text as="span" fontWeight={"medium"}>
                            {dataTicket?.name}
                          </Text>
                        </Text>
                        <Text
                          w={"100%"}
                          display={"flex"}
                          justifyContent={"space-between"}
                        >
                          {getLocationExperience(
                            dataTicket?.experienceInstance?.experience
                              ?.mapPoints
                          )}
                        </Text>
                        <Divider />
                      </Flex>

                      <Text fontWeight={"medium"}>Dear Owner</Text>
                      <Flex flexDirection={"column"} gap={"12px"}>
                        <Text
                          w={"100%"}
                          display={"flex"}
                          justifyContent={"space-between"}
                        >
                          {" "}
                          <Text as="span">N° Tickets</Text>{" "}
                          <Text as="span" fontWeight={"medium"}>
                            {infoBuyTicket?.noOfTickets?.toString()}
                          </Text>
                          <Text as="span">Total Price</Text>{" "}
                          <Text as="span" fontWeight={"medium"}>
                            {
                              formatPrice(infoBuyTicket?.amount?.toString(), 
                              dataTicket?.payoutCurrency,
                              getTokenDetails(dataTicket?.chainId, dataTicket?.payoutCurrency)?.decimals )
                            } {" "} {getTokenDetails(dataTicket?.chainId, dataTicket?.payoutCurrency)?.symbol}
                          </Text>
                        </Text>
                        <Divider />
                      </Flex>

                      <Text>Your purchase was successfully.</Text>
                      <Flex flexDirection={"column"} gap={"8px"}>
                        {/* {
                          isBuyer &&
                          <Button
                            onClick={() => enterAndburnTicket()}
                            colorScheme="red.100"
                            isLoading={loadingBurn}
                            loadingText={__("loading") + "..."}
                            isDisabled={dataTicket?.infoTicketsStatus != InfoTicketsStatus.INITIAL}
                          >
                            {
                              dataTicket?.infoTicketsStatus == InfoTicketsStatus.INITIAL ?
                                'Burn NFT'
                                :
                                dataTicket?.infoTicketsStatus
                            }
                          </Button>
                        } */}
                        {/* {
                          (isOwner) && <Button
                            onClick={() => saveApprove()}
                            colorScheme="green.400"
                            isLoading={loadingApprove}
                            loadingText={__("loading") + "..."}
                            isDisabled={dataTicket?.infoTicketsStatus != InfoTicketsStatus.BURNED}
                          >
                            {
                              dataTicket?.infoTicketsStatus == InfoTicketsStatus.BURNED ?
                                'Approve Enter'
                                :
                                dataTicket?.infoTicketsStatus
                            }
                          </Button>
                        } */}
                      </Flex>
                    </Flex>
                  </Flex>
                </CardBody>
              </Card>
            </Flex>
            <Flex {...(isMobile ? { width: "100%" } : { flexBasis: "50%" })}>
              <Card border={"1.5px solid #EAEDEF"} width={"100%"}>
                <CardBody
                  p={spaceBetwCont}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={"8px"}
                >
                  <Box
                    w={"100%"}
                    maxH={"264px"}
                    overflow={"hidden"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Img src={dataTicket?.ipfsImageUrl} alt="Event" />
                  </Box>
                  <Box>
                    <Text 
                      fontSize={"18px"} 
                      fontWeight={"medium"}
                      _hover={
                        {
                          fontWeight: '700',
                          textDecoration: 'underline',
                          transition: 'all 0.5s ease',
                          cursor: 'pointer',
                        }
                      }
                      onClick={()=> goNftByType(dataTicket?.experienceInstance?.experience?.product?.id, dataTicket?.experienceInstance?.experience?.product?.nftType)}
                    >
                      {dataTicket?.experienceInstance?.experience?.product?.name}
                    </Text>
                    <Text color={"gray.400"}>
                      {dataTicket?.experienceInstance?.experience?.product?.description}
                    </Text>
                  </Box>
                </CardBody>
              </Card>
            </Flex>
          </Flex>
          {/* <Text fontSize={"20px"} fontWeight={"medium"}>
            Transactions
          </Text>
          <Box>
            <Card>
              <TableContainer>
                <Table variant="simple" colorScheme="table">
                  <Thead>
                    <Tr>
                      <Th fontSize={"14px"} textTransform={"capitalize"}>
                        ID
                      </Th>
                      <Th fontSize={"14px"} textTransform={"capitalize"}>
                        Txn Hash
                      </Th>
                      <Th fontSize={"14px"} textTransform={"capitalize"}>
                        Method
                      </Th>
                      <Th fontSize={"14px"} textTransform={"capitalize"}>
                        {__("date")}
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {activities?.map((activity: any, index: any) => (
                      <Tr key={index}>
                        <Td>{index + 1}</Td>
                        <Td>
                          <Link
                            isExternal
                            href={`${WEB_SCAN_HASH[
                              dataTicket?.experienceInstance?.experience?.product?.chainId
                              ]
                              }${activity?.ticket?.transaction?.transactionHash}`}
                          >
                            <Text
                              color={
                                activity?.type == TypeTxTicket.buy
                                  ? ""
                                  : "red.100"
                              }
                            >
                              {truncarText(
                                activity?.ticket?.transaction?.transactionHash,
                                isMobile ? 14 : 19
                              )}
                            </Text>
                          </Link>
                        </Td>
                        <Td
                          color={
                            activity?.type == TypeTxTicket.buy
                              ? "primary.100"
                              : "red.100"
                          }
                        >
                          {activity?.type == TypeTxTicket.buy
                            ? "Buy Ticket"
                            : "Cancel Ticket"}
                        </Td>
                        <Td>
                          <Text color="primary.100">
                            {moment
                              .utc(activity?.ticket?.transaction?.createdAt)
                              .fromNow()}
                          </Text>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Card>
          </Box> */}
        </>
      )}
    </>
  );
}
