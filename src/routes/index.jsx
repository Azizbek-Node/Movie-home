import Detail from "@/components/detail/Detail";
import Films from "@/components/films/Films";
import Saved from "@/components/saved/Saved";
import Home from "@/pages/home/Home";
import Latest from "@/pages/latest/Latest";
import Layout from "@/pages/layout/Layout";
import NotFound from "@/pages/notFound/NotFound";
import Search from "@/pages/search/Search";
import { useRoutes } from "react-router-dom";

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/latest",
          element: <Latest />,
        },
        {
          path: "/movie/:id",
          element: <Detail />,
        },
        {
          path: "/films",
          element: <Films />,
        },
        {
          path: "/saved",
          element: <Saved />
        },
        {
          path: "*",
          element: <Search />,
        },
        {
          path: "*",
          element: <NotFound/>,
        }
      ],
    },
  ]);
};
export default Router;
