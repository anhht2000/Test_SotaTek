import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { BaseLayout } from "./layouts/BaseLayout";

const Loader = (Component: any) =>
  function loader(props: any) {
    return (
      <Suspense fallback={<div>Loading</div>}>
        <Component {...props} />
      </Suspense>
    );
  };

const Login = Loader(lazy((): any => import("./pages/Login")));
const Home = Loader(lazy((): any => import("./pages/Home")));
const PageNotFound = Loader(lazy((): any => import("./pages/PageNotFound")));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      { path: "*", element: <PageNotFound /> },
    ],
  },
];

export default routes;
