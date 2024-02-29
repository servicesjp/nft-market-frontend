import {
    Card,
    CardBody,
    Heading,
    Image,
    Stack,
    useDisclosure,
    useMediaQuery,
  } from "@chakra-ui/react";
  import { useRouter } from "next/router";
  import { useState } from "react";
import {TypeTxTicket} from "@/types/TypeTxTicket"
import { NFTInfoType, NftType, NftTypeByName } from "@/types/NftType"
function TicketCard({ data = {} }: any) {
    const router = useRouter();
    const [isTablet] = useMediaQuery("(max-width: 1024px)");
    const [isHovering, setIsHovered] = useState(false);
    const {
      isOpen: isModalTicketOpen,
      onOpen: openModalTicket,
      onClose: onModalTicketClose,
    } = useDisclosure();
    const {
      isOpen: isModalTxOpen,
      onOpen: openModalTxTicket,
      onClose: onModalTxTicketClose,
    } = useDisclosure();

    const onMouseEnter = () => {
      if (!isTablet) setIsHovered(true);
    };
    const onMouseLeave = () => {
      if (!isTablet) setIsHovered(false);
    };
    const addAttribute = (tickets: any[], typeTicket:any)=> {
      return tickets? tickets.map((ticket:any)=> ({ ticket, type: typeTicket})) : []
    }

    const cancelTicket = addAttribute(data?.cancelTickets, TypeTxTicket.cancel)
    const buyTicket = addAttribute(data?.purchases, TypeTxTicket.buy)
    const joinTickets = [...cancelTicket, ...buyTicket]
    return (
      <Card
        key={data.id}
        overflow={"hidden"}
        cursor={"pointer"}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        _hover={{
          transform: "translateY(-4px)",
        }}
        transition="all 0.3s ease 0s"
        onClick={() => {
          // openModalTicket()
          router.push(`/nft-purchased/${NftTypeByName[NftType.EXPERIENCE]}/${NFTInfoType[NftType.EXPERIENCE]}/${data?.id}`)
        }}
      >
        <CardBody
          padding="8px"
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
  
          <Image
            aspectRatio="1"
            maxH={"450px"}
            bg="gray.50"
            fit={"cover"}
            src={

                data?.ipfsImageUrl
                ? data?.ipfsImageUrl
                : "/nft/cardimg.jpg"
            }
            alt={data?.name}
            borderRadius="md"
          />
          <Stack
            position="relative"
            spacing="0"
            transition="all 0.2s ease 0s"
            padding={"8px 0 0"}
            backgroundColor="white"
            minH="60px"
            justifyContent={"flex-end"}
            fontSize="14px"
            h={"fit-content"}
          >
            <Heading fontSize="14px" display="flex" gap="6px">
              {" "}
              @{data?.name}
            </Heading>
          </Stack>
        </CardBody>
      </Card>
    );
  }
  
  export default TicketCard;
  