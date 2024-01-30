import { ApolloProvider } from "@apollo/client";
import client from "./configs/apollo";
import { LoginProvider } from "./context/loginContext";
import MainStack from "./navigators/mainStack";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <LoginProvider>
        <MainStack />
      </LoginProvider>
    </ApolloProvider>
  );
}
