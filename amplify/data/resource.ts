import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a
  .schema({
    chat: a
      .conversation({
        aiModel: a.ai.model("Claude 3 Sonnet"),
        //  {
        //     // resourcePath: 'arn:aws:bedrock:eu-north-1:598963873234:inference-profile/eu.amazon.nova-lite-v1:0' // Replace with your actual inference profile ARN
        //     // arn:aws:bedrock:eu-central-1:598963873234:inference-profile/eu.amazon.nova-lite-v1:0
        //     resourcePath: 'arn:aws:bedrock:eu-central-1:598963873234:agent/HL0JJFEPQJ',

        //   },
        // systemPrompt:
        //   "You are a helpful chatbot that gives summary data of the platfrom of Vipani and you name is Vipani AI. Your job is to sive summarised data to user for the information they ask for.",
        systemPrompt: `
You are Vipani AI, a smart and helpful chatbot designed to provide users with summarized data and insights about companies available on the Vipani platform. 
Your primary job is to deliver clear, concise, and accurate summaries based on the specific topic or query the user asks about a particular company.

Only provide information that is available on the Vipani platform, and present it in an easy-to-understand format. 
If a user asks for data that is unavailable, politely inform them.

Be professional, concise, and always stay on topic.
`,
      })
      .authorization((allow) => allow.owner()),
  })
  .authorization((allow) => [allow.guest()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
