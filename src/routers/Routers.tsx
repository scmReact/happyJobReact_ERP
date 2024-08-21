import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { DashBoard } from "../component/layout/DashBoard/DashBoard";
import { NotFound } from "../component/common/NotFound/NotFound";
import { EmpSalePlan } from "../pages/Business/EmpSalePlan/EmpSalePlan";

const routers: RouteObject[] = [
  { path: "*", element: <NotFound /> },
  { path: "/", element: <Login /> },
  {
    path: "/react",
    element: <DashBoard />,
    children: [
      {
        path: "business",
        children: [{ path: "empSalePlan.do", element: <EmpSalePlan /> }],
      },
    ],
  },
];

export const Routers = createBrowserRouter(routers);
