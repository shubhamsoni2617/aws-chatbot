// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { AIConversation, createAIHooks } from '@aws-amplify/ui-react-ai'
import { generateClient } from 'aws-amplify/api'
import type { Schema } from '../amplify/data/resource';
import { Heading, View } from '@aws-amplify/ui-react'

const client = generateClient<Schema>()
function App() {
  const {useAIConversation} = createAIHooks(client);

  const [ {
    data:  {messages},
    isLoading,
    errors,
  },
  sendMessage,
] = useAIConversation('chat')
console.error(errors)
  return (
 <View flex={1} height="80vh">
    <Heading level={3}> AI Travel Advisor</Heading>
    <AIConversation
      messages={messages}
      handleSendMessage={sendMessage}
      isLoading={isLoading}
    />
    
 </View>
  )
}

export default App
