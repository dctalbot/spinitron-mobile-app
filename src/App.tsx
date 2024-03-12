import * as React from "react";
import { ApiClientProvider } from "./api/provider/ApiProvider";
import { config } from "./config";
import { Router } from "./nav/Router";

export default function App() {
  return (
    <ApiClientProvider baseURL={config.api.url}>
      <Router />
    </ApiClientProvider>
  );
}
