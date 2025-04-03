import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout/Main";
import Home from "../pages/Home/Index";
import ShoppingPost from "../pages/Home/ShoppingPost";
import ProductDetail from "../pages/Home/ProductDetail";
//import AddProduct from "../pages/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/cicd_react",
        element: <Home />,
      },
      {
        path: "/shoppost",
        element: <ShoppingPost />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
    ],
  },
]);

export default router;
