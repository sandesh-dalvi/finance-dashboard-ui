import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import SharedLayout from "./pages/SharedLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Transactions from "./pages/Transactions.jsx";
import Analytics from "./pages/Analytics.jsx";

const router = createBrowserRouter([
  {
    Component: SharedLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "transactions", Component: Transactions },
      { path: "analytics", Component: Analytics },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
