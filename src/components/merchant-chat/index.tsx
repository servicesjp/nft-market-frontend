import { Box, Button, Container, Divider, Grid, IconButton, List, ListItem, ThemeProvider, Typography, createTheme } from "@mui/material";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { Avatar, MainContainer, ChatContainer, MessageList, MessageInput, ConversationHeader, ConversationList, MessageSeparator, Search, Sidebar, Conversation, Message } from '@chatscope/chat-ui-kit-react';
import CloseIcon from '@mui/icons-material/Close';
import useStyles from "./styles";

import { ConnectionStatus, useChatConnection } from "./useChatConnection";

import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TbPlugConnected, TbPlugConnectedX } from "react-icons/tb";
import { Space } from "antd";
import { ChatInvitation, Chat, UserProfile } from "./types";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const NFT_API_URL = process.env.NEXT_PUBLIC_NFT_BACKEND_BASE_URL;

const ProductInfo = ({ productId }: { productId: string }) => {
  const classes = useStyles();
  const [productInfo, setProductInfo] = useState<any>({});

  const getProductInfo = async (productId: string) => {
    return await fetch(`${NFT_API_URL}/product/${productId}/info`).then(res => res.json()).catch(err => {
      console.error(err);
      return null
    });
  }


  useEffect(() => {
    if (productId) {
      getProductInfo(productId).then((productInfo) => {
        setProductInfo(productInfo);
      });
    }
  }, [productId]);

  const imgSrc = productInfo?.mediaAssets?.find((ma: { name: string; }) => ma.name == "image")?.path;

  return <Grid p={3} container spacing={2} className={classes.productDetails} style={{ height: "100%" }} flexDirection={"column"}>
    <Grid
      className="productInfo"
      item
      style={{ display: "flex" }}
    >
      <Grid item xs={10} style={{ display: "flex", marginTop: "auto", marginBottom: "auto" }}>
        <Box>Details</Box>
      </Grid>
      <Grid item xs={2}>
        <IconButton aria-label="delete" size="large">
          <CloseIcon fontSize="inherit" sx={{ color: "black" }} />
        </IconButton>
      </Grid>
    </Grid>
    <Grid
      item
      style={{ display: "flex" }}
    >
      {imgSrc && <img src={imgSrc} alt="Product" width={"100%"} />}
    </Grid>

    <Grid className="productTitle"
      item>
      {productInfo?.category?.name}
    </Grid>
    <Grid
      item
      className="priceTag"
    >
      {productInfo?.price}
    </Grid>
    <Grid
      className="description"
      item>
      {productInfo?.category?.description}
    </Grid>


  </Grid>
}

interface IConversationItemProps<T extends ChatInvitation | Chat> {
  item: T;
  currentUser: any;
  userProfile?: UserProfile;
  onDecideInvitation?: (topicName: string, accepted: boolean) => void;
  onSelect?: (topicName: string) => void;
}

const ConversationInvitation = ({ currentUser, userProfile, item: invitation, onDecideInvitation, onSelect }: IConversationItemProps<ChatInvitation>) => {

  return <Conversation
    name={`${(userProfile?.firstName + " " + userProfile?.lastName).trim() || userProfile?.username}`}
    lastSenderName={""}
    info={invitation.accepted ? "" : "Pending invitation"}
    onClick={() => onSelect?.(invitation.id)}

  >
    <Avatar src={userProfile?.avatarUrl} name={userProfile?.username} status={"available"} />

    <Conversation.Operations visible style={{ flexDirection: "column" }}>
      {!invitation.accepted && invitation.hostMeteorUserId != currentUser?.id && <>
        <Button startIcon={<FontAwesomeIcon icon={faCheck as any} />} style={{ paddingTop: 0 }} onClick={() => onDecideInvitation?.(invitation.id, true)} />
        <Button startIcon={<FontAwesomeIcon icon={faTimes as any} />} style={{ paddingTop: 0 }} onClick={() => onDecideInvitation?.(invitation.id, false)} />
      </>}
    </Conversation.Operations>
  </Conversation>
}

const ConversationChat = ({ userProfile, item: chat, onSelect }: IConversationItemProps<Chat>) => {

  return <Conversation

    name={`${(userProfile?.firstName + " " + userProfile?.lastName).trim() || userProfile?.username}`}
    lastSenderName={""}
    onClick={() => onSelect?.(chat.id)}
  >
    <Avatar src={userProfile?.avatarUrl} name={userProfile?.username} status={"available"} />

    <Conversation.Operations visible style={{ flexDirection: "column" }}>

    </Conversation.Operations>
  </Conversation>
}

const ChatComponent = ({ token }: { token: string }) => {
  const classes = useStyles();
  const [messageInputValue, setMessageInputValue] = React.useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  const {
    sendMessageText,
    connectionStatus,
    user,
    handleDecideInvitation,
    productId,
    chatList,
    invitationList,
    selectedChat,
    setSelectedChat,
    chatMessageList,
    allChatsUsers,
    currentChatUsers,
    setProductId,
    uploadAttachment,
    METEOR_STREAM_PB_URL
  } = useChatConnection(token);

  const handleChatSelect = (chatId: string) => {
    const chat = chatList?.items.find(c => c.id === chatId);
    console.log("Selected chat: ", chat);
    setSelectedChat(chat);
    setProductId(chat?.metadata?.productId || "");
  }

  const handleSendMessage = () => {
    sendMessageText(messageInputValue);
    setMessageInputValue("");
  }

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedChat) {
      uploadAttachment(selectedChat?.id, selectedFile)
    }
    event.target.value = "";
  };


  const handleAttachFile = () => {
    inputRef.current?.click();
  }

  const otherUserId = Array.from(currentChatUsers.keys()).find(id => id != user.id) || "";
  const otherUser = currentChatUsers.get(otherUserId);
  console.log("chatMessageList: ", { chatMessageList });
  let prevDate: string;
  return <ThemeProvider theme={darkTheme}>
    <MainContainer responsive style={{ height: "calc(100vh - 120px)" }}>
      <Sidebar position="left" scrollable={true}>
        <List sx={{
          width: '100%',
          maxWidth: 360,
          overflow: 'hidden',
          padding: "0px"
        }} component="nav" aria-label="mailbox folders">

          <ListItem sx={{ display: "flex" }} >
            <Typography flex={1}>All Messages</Typography>
            <Space />
            {connectionStatus == ConnectionStatus.CONNECTED ? <TbPlugConnected color="green" /> : <TbPlugConnectedX color="red" />}
          </ListItem>

          <Divider color="#AFB8CF" />
          <Search placeholder="Search..." className={classes.searchBox} />
          <Divider color="#AFB8CF" />
          <Grid container flexDirection={"column"} height={"calc(100vh - 105px)"} style={{ display: "flex" }}>
            <Grid item xs={12} style={{ flex: 1, overflowY: "hidden" }}>
              <ConversationList>
                {
                  invitationList?.items.map((invitation, key) => <ConversationInvitation
                    currentUser={user}
                    userProfile={allChatsUsers.get(invitation.hostMeteorUserId)}
                    item={invitation}
                    key={key}
                    onDecideInvitation={handleDecideInvitation}
                  />)
                }
                {
                  chatList?.items.map((chat, key) => <ConversationChat
                    currentUser={user}
                    userProfile={
                      allChatsUsers.get(chat.metadata.meteorUserIds?.find((id: string) => id != user.id) || "")
                    }
                    item={chat}
                    key={key}
                    onSelect={handleChatSelect} />)
                }
              </ConversationList>
            </Grid>
            <Divider color="#AFB8CF" />
          </Grid>
        </List>
      </Sidebar>

      <ChatContainer >
        <ConversationHeader>
          <ConversationHeader.Back />
          <Avatar src={otherUser?.avatarUrl} name="Zoe" />
          <ConversationHeader.Content userName={`${(otherUser?.lastName + "" + otherUser?.firstName).trim() || otherUser?.username}`} info="Response time: 1 hour" />

          <ConversationHeader.Actions>
            <Button variant="outlined" color="primary" >Hides details</Button>
          </ConversationHeader.Actions>
        </ConversationHeader>
        <MessageList typingIndicator={null}>
          {
            (() => {
              let prevDate: string;

              return chatMessageList?.items.map((message, key) => {
                const direction = message.meteorUserId === user.id ? "outgoing" : "incoming";
                const msgUser = currentChatUsers?.get(message.meteorUserId);
                const currentDate = new Date(message.created).toLocaleDateString();

                let separator = null;
                if (currentDate !== prevDate) {
                  separator = <MessageSeparator content={currentDate} />;
                  prevDate = currentDate;
                }
                console.log("AVATAR: ", { username: msgUser?.username, url: msgUser?.avatarUrl });
                return (
                  <>
                    {separator}
                    <Message
                      key={key}
                      model={{
                        message: message.message,
                        sentTime: message.created,
                        sender: `From: ${msgUser?.username}`,
                        direction,
                        position: "normal"
                      }}
                      avatarSpacer={false}
                      className={classes.messageContent}
                    >
                      {direction === "incoming" && <Avatar src={msgUser?.avatarUrl} name={msgUser?.username} />}
                      <Message.CustomContent>
                        <Container style={{
                          padding: "0px",
                          textAlign: direction === "incoming" ? "left" : "right",
                        }}>
                          <Typography><strong>{`${msgUser?.username}`}</strong> {new Date(message.created).toLocaleString()}</Typography>

                          {message.attachedFile ? <img src={`${METEOR_STREAM_PB_URL}/api/files/${message.expand.attachedFile.collectionId}/${message.attachedFile}/${message.expand.attachedFile.file}?thumb=100x250&token=`} /> : <Typography>{message.message}</Typography>}
                        </Container>
                      </Message.CustomContent>
                      {direction !== "incoming" && <Avatar src={msgUser?.avatarUrl} name={msgUser?.username} />}
                    </Message>
                  </>
                );
              });
            })()
          }
        </MessageList>
        <MessageInput
          placeholder="Type message here"
          value={messageInputValue}
          className={classes.inputBox}
          onChange={val => setMessageInputValue(val)}
          onAttachClick={() => handleAttachFile()}
          onSend={() => handleSendMessage()} />

      </ChatContainer>

      <Sidebar position="right">
        {selectedChat && <ProductInfo productId={productId} />}
      </Sidebar>


      <input
        hidden
        ref={inputRef}
        type="file"
        onChange={onFileInputChange}
      />
    </MainContainer>
  </ThemeProvider>
    ;
}

export default ChatComponent;


