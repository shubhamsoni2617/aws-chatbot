// import { useEffect } from 'react';
import { AIConversation, createAIHooks } from '@aws-amplify/ui-react-ai'
import { generateClient } from 'aws-amplify/api'
import type { Schema } from '../../../amplify/data/resource';
import { View } from '@aws-amplify/ui-react'
import DefaultLayout from '@/components/DefaultLayout';

const client = generateClient<Schema>()
const AIChatBot = () => {
  const { useAIConversation } = createAIHooks(client);

  const [
    {
      data: { messages },
      isLoading,
      errors,
    },
    sendMessage,
  ] = useAIConversation("chat");

  // Save messages to localStorage when they change
  // useEffect(() => {
  //   if (messages?.length > 0) {
  //     localStorage.setItem('vipani-chat-history', JSON.stringify(messages));
  //   }
  // }, [messages]);

  // Restore messages from localStorage when component mounts
  // useEffect(() => {
  //   const savedMessages = localStorage.getItem('vipani-chat-history');
  //   if (savedMessages) {
  //     try {
  //       const parsed = JSON.parse(savedMessages);
  //       parsed.forEach((msg: any) => {
  //         sendMessage({ content: msg.content, role: msg.role, isSystem: msg.isSystem });
  //       });
  //     } catch (e) {
  //       console.error('Failed to parse saved messages:', e);
  //     }
  //   }
  // }, []);

  console.error(errors);

  return (
    <DefaultLayout heading="Vipani ChatBot">
      <View flex={1} height="80vh">
        <AIConversation
          messages={messages}
          handleSendMessage={sendMessage}
          isLoading={isLoading}
        />
      </View>
    </DefaultLayout>
  );
};

export default AIChatBot;
