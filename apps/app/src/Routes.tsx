import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/about";
import AdminDashboard from "./pages/adminDashboard";
import Disclainer from "./pages/Disclaimer";
import FAQ from "./pages/FAQ";
import PresaleCreation from "./pages/presaleCreation";
import PresaleDetails from "./pages/presaleDetails";
import TokenManagement from "./pages/tokenManagement";
import UserContribution from "./pages/userContribution";
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
      path: "/FAQ",
      element: <FAQ />,
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
      path: "/TokenManagement",
      element: <TokenManagement />,
    },
    {
      path: "/UserContribution",
      element: <UserContribution />,
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
