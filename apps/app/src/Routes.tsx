import { Route, RootRoute } from "@tanstack/react-router";

import PresaleCreation from "./pages/presaleCreation";
import PresaleDetails from "./pages/presaleDetails";
import Home from "./pages/home";
import { MyTokens } from "./pages/myTokens";
import { TokenDetails } from "./pages/tokenDetails";
import PresaleList from "./pages/presaleList";
import BlankPage from "./pages/BlankPage";

import Layout from "./components/Layout";

const rootRoute = new RootRoute({
  component: Layout,
});

export const routeTree = rootRoute.addChildren([
  new Route({ path: "/", component: Home, getParentRoute: () => rootRoute }),
  new Route({ path: "/presale-creation", component: PresaleCreation, getParentRoute: () => rootRoute }),
  new Route({ path: "/presale-details/$address", component: PresaleDetails, getParentRoute: () => rootRoute }),
  new Route({ path: "/my-tokens", component: MyTokens, getParentRoute: () => rootRoute }),
  new Route({ path: "/token/$address", component: TokenDetails, getParentRoute: () => rootRoute }),
  new Route({ path: "/presales", component: PresaleList, getParentRoute: () => rootRoute }),
  new Route({ path: "/blank", component: BlankPage, getParentRoute: () => rootRoute }),
]);

export default function Routes() {
  return null;
}
