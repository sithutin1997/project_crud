import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://odyrf5sb5ve7hlbyi2vu3uygju.appsync-api.ap-southeast-1.amazonaws.com/graphql",
  headers: {"X-Api-Key": "da2-fmfzezuo7jae3gzue64nhtt5m4"},
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);