import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  Box,
  Stack,
  Avatar,
  Text,
  Badge,
  Circle,
} from '@chakra-ui/react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { useNotificationApi } from '@/hooks/nft/useNotificationApi';
import { WalletConnectContext } from '@/modules/provider/wallet-connect-provider';
import { useRouter } from 'next/router';

const NotificationButton = ({fixed, isWhite, menuColor="black"}: {fixed?: boolean; isWhite?: boolean; menuColor?: string}) => {
  const { testNotificacion, getNotificationAllByUser } = useNotificationApi();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const router = useRouter();

  const handleViewAllNotifications = () => {
    router.push('/account/notifications');
  };
  const { address, isConnected } =
    useContext(WalletConnectContext);
  const openPopover = () => setIsOpen(!isOpen);
  const closePopover = () => setIsOpen(false);
  useEffect(() => {
    if(isConnected) {
      getNotificationAllByUser().then((res: any) => {
        if (res?.items && Array.isArray(res?.items)) {
          setNotifications(res?.items?.slice(0, 5));
        }
      });
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Popover isOpen={isOpen} onClose={closePopover} placement='bottom'>
      <PopoverTrigger>
        <Button variant="ghost" onClick={openPopover} position="relative">
          <IoNotificationsOutline size="1.5em" color={
            (scrollY > 0 && fixed) || isWhite
              ? "black"
              : !isWhite
                ? "white"
                : menuColor
          }/>
          {notifications?.length > 0 && (
            <Badge bg="primary.100" color="white" pt="0.5" position="absolute" top="1" right="1">
              {notifications.length > 9 ? "+9" : notifications.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent bg="white" boxShadow="md" borderRadius="md" w="472px">
        <PopoverArrow />
        {/* <PopoverCloseButton /> */}
        <PopoverHeader fontSize="2xl" fontWeight="500">Notifications</PopoverHeader>
        <PopoverBody p="0">
          <Stack spacing={3}>
            {notifications.map((notification: any, index) => (
              <NotificationItem key={index} {...notification} id={index} />
            ))}
          </Stack>
          <Box p={2}>
            <Button mt={4} w="full" size="sm" onClick={handleViewAllNotifications}>
              View All Notifications
            </Button>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationButton;

const NotificationItem = ({id, content, actioned, createdAt, read}: any) => {
  const { message, product} = JSON.parse(content);

  return (
  <Box key={id} p={3} bg={read ? "blue.10" : "white"}>
    <Stack direction="row" spacing={3} align="center">
      <Avatar name={''}>
        <Circle display={actioned ? "visible" : "none"} size="15px" bg="primary.100" position="absolute" right="0" top="0" border="2px solid" borderColor={read ? "blue.10" : "white"} />
      </Avatar>

      <Box flex="1">
        {/* <Text fontWeight="bold">{product?.tokenId}</Text> */}
        <Text fontSize="sm">{message}</Text>
        <Text fontSize="xs" color="gray.500">{createdAt}</Text>
      </Box>
    </Stack>
  </Box>
)}