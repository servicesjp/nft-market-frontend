import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { Avatar, Conversation } from '@chatscope/chat-ui-kit-react';
import { UserStatus } from '@chatscope/chat-ui-kit-react/src/types';

export const iconUrl = "https://picsum.photos/200";

export const generateRandomConversations = (count: number): JSX.Element[] => {
  const conversations: JSX.Element[] = [];

  const names = ["Joe", "Emily", "Kai", "Akane", "Eliot", "Zoe", "Patrik", "Lilly"];
  const statuses: UserStatus[] = ["available", "unavailable", "away"];

  for (let i = 0; i < count; i++) {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomInfo = `Yes, I can do it for you (${i + 1})`;

    conversations.push(
      <Conversation
        key={i}
        name={randomName}
        lastSenderName={randomName}
        info={randomInfo}
      >
        <Avatar src={iconUrl} name={randomName} status={randomStatus} />
      </Conversation>
    );
  }

  return conversations;
};


