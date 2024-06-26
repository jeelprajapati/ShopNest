import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";
import React,{ Suspense } from "react";

const Home = React.lazy(() => import("./pages/home/Home"));
const Products = React.lazy(() => import("./pages/products/Products"));
const SingleProduct = React.lazy(() => import("./pages/singleProduct/SingleProduct"));
const Cart = React.lazy(() => import("./pages/cart/Cart.jsx"));
const Login = React.lazy(() => import("./pages/login/Login.jsx"));
const Register = React.lazy(() => import("./pages/register/Register.jsx"));
const Account = React.lazy(() => import("./pages/account/Account.jsx"));
const Success = React.lazy(() => import("./pages/success/Success.jsx"));
const Contact = React.lazy(() => import("./pages/contact/Contact.jsx"));

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <SingleProduct/>,
      },
      {
        path: "/cart",
        element: <Cart/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path:"/account",
        element:<Account/>
      },
      {
        path:"/success",
        element:<Success/>
      },
      {
        path:"/contact",
        element:<Contact/>
      }
    ],
  },
]);
const App = () => {
  return (
    <>
     <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
     </Suspense>
    </>
  );
};

export default App;
