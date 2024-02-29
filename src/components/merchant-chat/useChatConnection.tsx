import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { useCallback, useEffect, useState } from "react";
import { Socket, io } from 'socket.io-client';
import toast from 'react-hot-toast';
import { Chat, ListResult, ChatInvitation, ChatMessage, ChatMessageDto, UserProfile } from './types';

const METEOR_STREAM_URL = process.env.NEXT_PUBLIC_METEOR_STREAM_URL;
const METEOR_STREAM_PB_URL = process.env.NEXT_PUBLIC_METEOR_STREAM_PB_URL;
const NFT_API_URL = process.env.NEXT_PUBLIC_NFT_BACKEND_BASE_URL;

export enum ConnectionStatus {
    CONNECTED = "CONNECTED",
    DISCONNECTED = "DISCONNECTED",
    CONNECTING = "CONNECTING",
}

export interface TopicInterface {
    topicName: string;
    productId: string;
    invitedUserId: string;
    merchantId: string;
    accepted: boolean;
    timestamp: string;
}

export const decodeChatTopic = (topicName: string): TopicInterface | null => {
    console.log("Decoding topic: ", topicName);
    const parts = topicName.split("_");

    if (parts.length !== 5 || parts[0] !== 'c') {
        console.error('Formato de nombre de topic inválido');
        return null;
    }

    const invitedUserId = parts[1];
    const merchantId = parts[2];
    const accepted = parts[3] === '1';
    const timestamp = parts[4];
    const productId = parts.length >= 6 ? parts[5] : "d0169d54-1496-40ee-9982-20eea8093ff3";

    return {
        topicName,
        invitedUserId,
        merchantId,
        accepted,
        timestamp,
        productId
    };
};


export class NFTApi {

    static getUserData = (userID: string): Promise<any> => {
        return fetch(`${NFT_API_URL}/users/${userID}/public`).then(res => res.json()).catch(err => {
            console.error(err);
            return null
        });
    }


}

export const useChatConnection = (token: String) => {
    //Dummy
    const [userList, setUserList] = useState<any[]>([]);
    const [user, setUser] = useState<any>({});
    const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<any[]>([]);
    const [topics, setTopics] = useState<TopicInterface[]>([]);
    const [productId, setProductId] = useState<string>("");
    const [selectedTopic, setSelectedTopic] = useState<any>(null);
    const [selectedChat, setSelectedChat] = useState<Chat>();
    const [chatList, setChatList] = useState<ListResult<Chat>>();
    const [allChatsUsers, setAllChatUsers] = useState<Map<string, UserProfile>>(new Map<string, UserProfile>());
    const [invitationList, setInvitationList] = useState<ListResult<ChatInvitation>>();
    const [chatMessageList, setChatMessageList] = useState<ListResult<ChatMessage>>();
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
        ConnectionStatus.DISCONNECTED,
    );
    const [loading, setLoading] = useState<boolean>(false);

    const onError = useCallback(
        (err: any): void => {
            setConnectionStatus(ConnectionStatus.DISCONNECTED);
        },
        [socket, connectionStatus],
    );

    useEffect(() => {
        const newSocket = io(`${METEOR_STREAM_URL}/chat`, {
            reconnectionDelayMax: 5000,
            reconnection: true,
            auth: { token },
            extraHeaders: {
                "Authorization": `Bearer ${token}`,
            },
        });

        setSocket(newSocket as unknown as Socket);

        newSocket.on("connect", () => {
            setConnectionStatus(ConnectionStatus.CONNECTED);
        });

        newSocket.on("disconnect", () => {
            setConnectionStatus(ConnectionStatus.DISCONNECTED);
        });

        newSocket.on("connect_error", (err) => onError(err));

        newSocket.on("me", (me: any) => {
            console.log("Me", me);
            setUser(me);
        });

        newSocket.on("newRemoteMsg", (msg: any) => {
            console.log("newRemoteMsg", msg);
            chatMessageList?.items.push(msg);
            setChatMessageList({ ...chatMessageList } as ListResult<ChatMessage>);
        });

        newSocket.on("updateUserList", (userList: any[]) => {
            console.log("User list", userList);
            setUserList(userList);
        });

        newSocket.on("message", (message: ChatMessage) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        newSocket.on("invite", (message: any) => {
            console.log("Invited")
            //setMessages((prevMessages) => [...prevMessages, JSON.stringify(message)]);
        });

        newSocket.on('merchant-chat-invitation-response', (invitation) => {
            toast.success(`Invitación ${invitation.accepted ? 'aceptada' : 'rechazada'}`, { duration: 5000 });
        });

        setConnectionStatus(ConnectionStatus.CONNECTING);
        newSocket.connect();

        return () => {
            newSocket.disconnect();
            setConnectionStatus(ConnectionStatus.DISCONNECTED);
        };
    }, []);

    useEffect(() => {
        if (connectionStatus === ConnectionStatus.CONNECTED)
            updateChatInvitationList();
    }, [connectionStatus]);


    useEffect(() => {
        if (!selectedChat)
            return;
        fetch(`${METEOR_STREAM_URL}/chat/${selectedChat.id}`).then(res => res.json()).then(setChatMessageList);
    }, [selectedChat]);

    const uploadAttachment = (chatId: string, file: File) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('chatId', chatId);
        fetch(`${METEOR_STREAM_URL}/chat/${chatId}/attachment`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(res => res.json()).then((result) => {
            setLoading(false);
            fetch(`${METEOR_STREAM_URL}/chat/${chatId}`).then(res => res.json()).then(setChatMessageList);
        }).catch(err => {
            console.error(err);
        }).finally(() => setLoading(false))
    }


    const updateChatInvitationList = () => {
        socket?.emit("updateChatAndInvitationList", (result: { chats: ListResult<Chat>, invitations: ListResult<ChatInvitation> }) => {
            let usersIds = new Set<string>();
            result?.chats?.items?.map((chat: Chat) => chat.metadata.meteorUserIds).flat().forEach((id: string) => usersIds.add(id));
            result?.invitations?.items?.map((chat: ChatInvitation) => [chat.guestMeteorUserId, chat.hostMeteorUserId]).flat().forEach((id: string) => usersIds.add(id));
            Promise.all(Array.from(usersIds).map((meteorUserId: string) => NFTApi.getUserData(meteorUserId))).then((users: UserProfile[]) => {
                const usersMap = new Map<string, UserProfile>();
                users?.forEach(u => usersMap.set(u.id, u));
                setAllChatUsers(usersMap);
            }).then(() => {
                setChatList(result.chats);
                setInvitationList(result.invitations);
            });
        });
    }

    const sendMessageText = (messageText: any) => {
        if (messageText.trim() && selectedChat) {
            socket?.emit("sendMessage", { message: messageText, chat: selectedChat.id, meteorUserId: user.id } as ChatMessageDto, (result: any) => {
                chatMessageList?.items.push(result);
                setChatMessageList({ ...chatMessageList } as ListResult<ChatMessage>);
            });
        }
    };

    const handleInvite = (invitedUserId: String) => {
        if (!invitedUserId)
            return;
        socket?.emit('invite', { invitedUserId }, (result: { error?: any }) => {
            if (result.error)
                toast.error(result.error, { duration: 5000 });
        });
    };

    const handleDecideInvitation = (invitationId: string, accepted: boolean) => {
        socket?.emit('invitationResponse', { invitationId, accepted }, () => {
            updateChatInvitationList();
        });
    }

    const currentTopicMetadata: TopicInterface | null = (() => {
        if (selectedTopic) {
            return decodeChatTopic(selectedTopic.topicName);
        }
        return null;
    })()

    const currentChatUsers: Map<string, UserProfile> = (() => {
        const chatUsersMap = new Map<string, UserProfile>();
        if (selectedChat) {
            selectedChat.metadata.meteorUserIds.forEach(mId => {
                const user = allChatsUsers.get(mId);
                if (user) {
                    chatUsersMap.set(mId, user);
                }
            });
        }
        return chatUsersMap;
    })();

    return {
        setMessages,
        setProductId,
        socket,
        user,
        messages,
        topics,
        connectionStatus,
        sendMessageText,
        handleInvite,
        userList,
        handleDecideInvitation,
        productId,
        selectedTopic,
        setSelectedTopic,
        currentTopicMetadata,
        chatList,
        invitationList,
        selectedChat,
        setSelectedChat,
        chatMessageList,
        allChatsUsers,
        currentChatUsers,
        uploadAttachment,
        METEOR_STREAM_URL,
        METEOR_STREAM_PB_URL
    }
};
