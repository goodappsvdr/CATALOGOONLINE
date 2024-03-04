// import { useState } from "react";

import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Routing } from "./router/Routing";

// import { MobileContextProvider } from "./context/MobileContext/MobileContext";
// import { OpenMenuContextProvider } from "./context/OpenMenuContext/OpenMenuContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "@mui/material";
import { theme } from "./MaterialThemes/theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

function App() {
  return (
    <>
      <Provider store={store}>
        {/* <MobileContextProvider> */}
        {/* <OpenMenuContextProvider> */}
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Routing />
            <Toaster
              position="top-left"
              // expand="true"
              visibleToasts={3}
              closeButton
              richColors
            />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ThemeProvider>
        {/* </OpenMenuContextProvider> */}
        {/*    </MobileContextProvider> */}
      </Provider>
    </>
  );
}

export default App;
