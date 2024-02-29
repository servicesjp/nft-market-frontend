import { __ } from "@/helpers/common";
import { ProcessStatus } from "@/hooks/types/transaction/ProcessStatus";

import {
  Box,
  Button,
  Card,
  Heading,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr
} from "@chakra-ui/react";
import { getEnumKeyByEnumValue, shortenHash } from "../utils";
import { useContext, useEffect, useState } from "react";
import { useTransactionApi } from "@/hooks/useApi";
import { WalletConnectContext } from "../provider/wallet-connect-provider";
import { TransactionByUserDTO } from "@/hooks/types/transaction/TransactionByUserDTO";
import { authSession } from "../auth/auth-session";

function TransactionTable() {
  const [myTransactions, setMyTransactions] = useState<any[]>([]);
  const [loadingRefresh, setLoadingRefresh] = useState(false)

  const { address } =
    useContext(WalletConnectContext);
  const transactionApi = useTransactionApi()

  const getTransactionsByUser = async () => {
    try {
      const params: TransactionByUserDTO = {
        limit: 9,
        offset: 0,
        userAddress: address,
      };
      const response = await transactionApi.getTransactionsByUser(params);
      setMyTransactions(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      if (authSession.hasSession) {
        getTransactionsByUser();
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = async (transaction: any) => {
    setLoadingRefresh(true)
    try {

      const result = await transactionApi.refreshTransactionByUser(transaction?.id, {
        userAddress: address
      })

      console.log(`transaction ${result}`);


    } catch (error: any) {
      console.log(error);
    } finally {
      setLoadingRefresh(false)
    }
  }

  return (
    <Stack spacing="24px">
      <Heading as="h3" fontSize="16px">
        {__("my_transactions")}
      </Heading>
      <Card>
        <Box>
          <TableContainer>
            <Table variant="simple" colorScheme="table">
              <Thead>
                <Tr>
                  <Th fontSize={"14px"} textTransform={"capitalize"}>
                    {__("event_type")}
                  </Th>
                  <Th fontSize={"14px"} textTransform={"capitalize"}>
                    {__("process_status")}
                  </Th>
                  <Th fontSize={"14px"} textTransform={"capitalize"}>
                    {__("transaction_hash")}
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {myTransactions?.map((transaction: any, index: any) => (
                  <Tr key={index}>
                    <Td>{transaction?.eventType || "-"}</Td>
                    <Td>{getEnumKeyByEnumValue(ProcessStatus, transaction?.processStatus) || "-"}</Td>
                    <Td>
                      <Tooltip label={transaction?.transactionHash} placement="top">
                        {shortenHash(transaction?.transactionHash) || "-"}
                      </Tooltip>
                    </Td>

                    <Td>
                      <Button
                        isLoading={loadingRefresh}
                        isDisabled={transaction?.transactionConfirmed}
                        loadingText={__("loading") + "..."}
                        onClick={() => handleRefresh(transaction)}
                      >
                        {__("refresh")}
                      </Button>
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

export default TransactionTable;
