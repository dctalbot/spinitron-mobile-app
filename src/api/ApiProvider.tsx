import * as React from "react";

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

const ApiClientProvider = ({
  baseURL,
  children,
}: ApiClientProviderProps): JSX.Element => {
  return (
    <ApiClientContext.Provider value={{ baseURL }}>
      {children}
    </ApiClientContext.Provider>
  );
};

function useBaseURL(): string {
  const client = React.useContext(ApiClientContext);

  if (!client) {
    throw new Error("No QueryClient set, use ApiClientProvider to set one");
  }

  return client.baseURL;
}

export { ApiClientProvider, useBaseURL };
