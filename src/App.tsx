import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import './App.css';
import { AgreementProvider } from "./components/context/AgreementContext";

const App = () => {
  return (
    <AgreementProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AgreementProvider>
  );
};

export default App;
/*
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Signup />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App

*/