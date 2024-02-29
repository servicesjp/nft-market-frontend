import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Avatar,
  useColorModeValue,
  StackDivider,
  Circle,
  Stack,
} from '@chakra-ui/react';
import { useNotificationApi } from '@/hooks/nft/useNotificationApi';
import { WalletConnectContext } from '../provider/wallet-connect-provider';

const NotificationsList: React.FC = () => {
  const bg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const [notifications, setNotifications] = useState([]);
  const { getNotificationAllByUser } = useNotificationApi();

  const { address } =
    useContext(WalletConnectContext);

  useEffect(() => {

    getNotificationAllByUser().then((res: any) => {
      setNotifications(res.items)
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box bg={bg} borderRadius="lg" p={0} boxShadow="md" w="100%">
      <Text fontSize="md" fontWeight="500" m={4}>Notifications</Text>
      <VStack spacing={4} divider={<StackDivider borderColor={borderColor} my="0 !important" />}>
        {notifications.map((notification: any, index) => (
          <NotificationItem key={index} {...notification} id={index} />
        ))}
      </VStack>
    </Box>
  );
};

export default NotificationsList;


const NotificationItem = ({id, content, actioned, createdAt, read}: any) => {
  const { message, product } = JSON.parse(content);

  return (
  <Box key={id} p={3} bg={read ? "blue.10" : "white"} w="100%" px="30px">
    <Stack direction="row" spacing={3} align="center" w="100%">
      <Avatar name={''}>
        <Circle display={actioned ? "visible" : "none"} size="15px" bg="primary.100" position="absolute" right="0" top="0" border="2px solid" borderColor={read ? "blue.10" : "white"} />
      </Avatar>

      <Box flex="1">
        {/* <Text fontWeight="bold">{product?.tokenId}</Text> */}
        <Text fontSize="sm">{product?.tokenId} {message}</Text>
        <Text fontSize="xs" color="gray.500">{createdAt}</Text>
      </Box>
    </Stack>
  </Box>
)}