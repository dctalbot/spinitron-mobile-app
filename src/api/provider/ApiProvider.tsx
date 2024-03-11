import * as React from "react";
import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ApiClientContextValue {
  baseURL: string;
}

const ApiClientContext = React.createContext<ApiClientContextValue>({
  baseURL: "",
});

type ApiClientProviderProps = {
  baseURL: string;
  children?: React.ReactNode;
};

const queryClient = new QueryClient();

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

const ApiClientProvider = ({
  baseURL,
  children,
}: ApiClientProviderProps): JSX.Element => {
  return (
    <ApiClientContext.Provider value={{ baseURL }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ApiClientContext.Provider>
  );
};

function useBaseURL(): string {
  const client = React.useContext(ApiClientContext);
  return client.baseURL;
}

export { ApiClientProvider, useBaseURL };
