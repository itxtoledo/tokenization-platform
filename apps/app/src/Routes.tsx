import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/about";
import AdminDashboard from "./pages/adminDashboard";
import Disclainer from "./pages/Disclaimer";
import PresaleCreation from "./pages/presaleCreation";
import PresaleDetails from "./pages/presaleDetails";
import Home from "./pages/home";
import ContactForm from "./pages/form";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/AdminDashboard",
      element: <AdminDashboard />,
    },
    {
      path: "/About",
      element: <About />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/PresaleCreation",
      element: <PresaleCreation />,
    },
    {
      path: "/presale-details/:address",
      element: <PresaleDetails />,
    },
    {
      path: "/Disclaimer",
      element: <Disclainer />,
    },
    {
      path: "/Form",
      element: <ContactForm />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
