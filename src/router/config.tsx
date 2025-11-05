
import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import CatalogoGlobos from "../pages/catalogoGlobos/page";
import CatalogoMarcos from "../pages/catalogoMarcos/page";
import Contacto from "../pages/contacto/page";
import Admin from "../pages/admin/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/catalogo-globos",
    element: <CatalogoGlobos />,
  },
  {
    path: "/catalogo-marcos",
    element: <CatalogoMarcos />,
  },
  {
    path: "/contacto",
    element: <Contacto />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
