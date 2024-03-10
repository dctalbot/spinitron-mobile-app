import * as React from "react";
import { ApiClientProvider } from "./api/ApiProvider";
import { API_BASE_URL } from "../config";
import { Router } from "./nav/Router";

export default function App() {
  return (
    <ApiClientProvider baseURL={API_BASE_URL}>
      <Router />
    </ApiClientProvider>
  );
}
