import { createRoot } from "react-dom/client";
import AppRouter from "@/routes/AppRouter";

// Redux
import { store, persistor } from "@/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// axios Global Config
import "@/services/axios-global";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/global.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>,
);
