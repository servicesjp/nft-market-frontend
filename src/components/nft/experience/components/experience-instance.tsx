import { __ } from "@/helpers/common";
import { Text, Flex, Box, Divider, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import moment from "moment";
import BuyTicketsModal from "../buy-tickets-modal";
// import CancelTicketsModal from "../cancel-tickets-modal";
import { useERC20 } from "@/hooks/useERC20";
import { ExperienceContract } from "@/hooks/contract/nft/experience-contract";
import { formatPrice } from "@/modules/utils";
import { NameChain } from "@/constants/env";
export function ExperienceInstance({
  product,
  experienceInstance,
  expInstances,
  i,
  fetchExpInstances,
}: any) {
    const [infoEvent, setInfoEvent] = useState<any>({})
  const { getTokenDetails } = useERC20();
  const { eventInfo } = ExperienceContract();
  useEffect(()=>{
    getEventInfo()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const getEventInfo = async ()=>{
    try {
        const { result } = await eventInfo(experienceInstance?.chainId, experienceInstance.uniqueEventId)
        setInfoEvent(result)
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <Stack gap="8px" key={"instance-" + i}>
      <Flex justifyContent="space-between">
        <Text fontSize="14px" fontWeight="medium">
          {`${moment
            .utc(experienceInstance?.startTime * 1000)
            .local()
            .format("dd, D MMM")} - ${moment
            .utc(experienceInstance?.endTime * 1000)
            .local()
            .format("dd, D MMM")}`}
        </Text>
        <Text fontSize="14px" color="gray.400">
          <Text display="inline" fontWeight="medium" as="span">
            {`${formatPrice(
              experienceInstance?.pricePerPerson,
              experienceInstance?.payoutCurrency,
              getTokenDetails(
                experienceInstance?.chainId,
                experienceInstance?.payoutCurrency
              ).decimals
            )} ${experienceInstance?.symbolCurrency} ${
              getTokenDetails(
                experienceInstance?.chainId,
                experienceInstance?.payoutCurrency
              ).symbol
            }`}
          </Text>{" "}
          {__("per_person")}
        </Text>
      </Flex>

      <Flex justifyContent="space-between">
        <Text color="gray.400" fontSize="14px">
          {`${moment
            .utc(experienceInstance?.startTime * 1000)
            .local()
            .format("HH:mm")} - ${moment
            .utc(experienceInstance?.endTime * 1000)
            .local()
            .format("HH:mm")}`}
        </Text>
      </Flex>
      {/* Buy Tickets */}
      <Box w={"100%"}>
        <BuyTicketsModal
          product={product}
          isDisabled={
            (parseInt(infoEvent?.remainningTickets?.toString())<=
                0) ||
                parseInt(infoEvent?.endTime?.toString())  <
              parseInt((new Date().getTime() / 1000).toString())
          }
          experienceInstance={experienceInstance}
          fetchData={fetchExpInstances}
          remainningTickets={parseInt(infoEvent?.remainningTickets?.toString())}
        />
      </Box>

      {/* Cancel tickets */}
      {/* {
                    (hasTicketsOnEvent(experienceInstance) && address) && (
                      <Box w={"100%"}>
                        <CancelTicketsModal
                          product={product}
                          experienceInstance={experienceInstance}
                          fetchData={fetchExpInstances}
                        />
                      </Box>
                    )
                  } */}
      <Flex flexDir={"column"} justifyContent="space-between">
        <Flex justifyContent="space-between">
          <Text color="gray.400" fontSize="14px">
            { `${NameChain(experienceInstance.chainId)} Tickets Sold: ${infoEvent?.remainningTickets?.toString()} of ${infoEvent?.totalTickets?.toString()}`}
          </Text>
        </Flex>
      </Flex>

      {i !== expInstances.length - 1 ? <Divider></Divider> : null}
    </Stack>
  );
}
