import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.tsx";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import awsconfig from "../amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css"

Amplify.configure(awsconfig); 
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Authenticator>
      <App />
    </Authenticator>
  </StrictMode>
);
