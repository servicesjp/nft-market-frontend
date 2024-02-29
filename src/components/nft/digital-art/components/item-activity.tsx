import { __ } from "@/helpers/common";
import { formatPrice } from "@/modules/utils";
import {
  TransactionActivityType,
  TransactionStatus,
} from "@/types/TransactionActivityEnums";

import {
  Box,
  Card,
  HStack,
  Heading,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { useERC20 } from "@/hooks/useERC20";

function ItemActivity({ item, activities }: any) {
  const { getTokenDetails } = useERC20()
  function formatActivityType(
    activityType: TransactionActivityType,
    status: TransactionStatus
  ) {
    if (activityType === TransactionActivityType.Listing || activityType == TransactionActivityType.Offer) {
      switch (status) {
        case TransactionStatus.NORMAL:
          return <Text fontWeight={"medium"}>{__(activityType)}</Text>;
        case TransactionStatus.SOLD:
          return (
            <Text fontWeight={"medium"} textColor={"green"}>
              {__(activityType)}
            </Text>
          );
        case TransactionStatus.CANCELED:
          return (
            <Text fontWeight={"medium"} textColor={"red"}>
              {__(activityType)}
            </Text>
          );
      }
    } else {
      return <Text fontWeight={"medium"}>{__(activityType)}</Text>;
    }
  }


  return (
    <Stack spacing="24px">
      <Heading
        as="h3"
        fontWeight={"500"}
        fontSize={{ base: "20px", md: "16px" }}
        color="gray.800"
      >
        {__("item_activity")}
      </Heading>
      <Card>
        <Box>
          <TableContainer>
            <Table variant="simple" colorScheme="table">
              <Thead>
                <Tr>
                  <Th fontSize={"14px"} textTransform={"capitalize"}>
                    {__("event")}
                  </Th>
                  <Th fontSize={"14px"} textTransform={"capitalize"}>
                    {__("unit_price")}
                  </Th>
                  <Th fontSize={"14px"} textTransform={"capitalize"}>
                    {__("quantity")}
                  </Th>
                  <Th fontSize={"14px"} textTransform={"capitalize"}>
                    {__("from")}
                  </Th>
                  <Th fontSize={"14px"} textTransform={"capitalize"}>
                    {__("to")}
                  </Th>
                  <Th fontSize={"14px"} textTransform={"capitalize"}>
                    {__("date")}
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {activities?.map((activity: any, index: any) => (
                  <Tr key={index}>
                    <Td>
                      <HStack>
                        {/* type activity */}
                        {formatActivityType(
                          activity?.activityType,
                          activity?.status
                        )}
                      </HStack>
                    </Td>
                    <Td>
                      {" "}
                      <HStack>
                        <span>
                          {formatPrice(
                            activity?.price,
                            activity?.currencyAddress,
                            getTokenDetails(
                              item?.chainId,
                              activity?.currencyAddress
                            ).decimals
                          )}{" "}
                          {
                            getTokenDetails(
                              item?.chainId,
                              activity?.currencyAddress
                            ).symbol
                          }
                        </span>
                      </HStack>
                    </Td>
                    <Td>{activity?.amount || "-"}</Td>
                    <Td>{activity?.fromUserAddress?.user?.username || "-"}</Td>
                    <Td>{activity?.toUserAddress?.user?.username || "-"}</Td>
                    <Td>
                      <Text color="primary.100">
                        {moment.utc(activity?.createdAt).fromNow()}
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </Stack>
  );
}

export default ItemActivity;
