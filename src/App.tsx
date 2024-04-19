import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
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