// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from "react-redux";
import store from "./store";
import './index.css'
import "@aws-amplify/ui-react/styles.css"
import { Amplify } from 'aws-amplify';
import awsconfig from '../amplify_outputs.json';
import { Authenticator } from '@aws-amplify/ui-react';


Amplify.configure(awsconfig); 

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <Provider store={store}>
      {/* <Authenticator> */}
        <App />
      {/* </Authenticator> */}
    
   </Provider>
  // </StrictMode>,
)
