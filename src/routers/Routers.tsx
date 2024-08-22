import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { DashBoard } from "../component/layout/DashBoard/DashBoard";
import { NotFound } from "../component/common/NotFound/NotFound";
import { Sales } from "../pages/Sales/Sales";

const routers: RouteObject[] = [
    { path: "*", element: <NotFound /> },
    { path: "/", element: <Login /> },
    {
        path: "/react",
        element: <DashBoard />,
        children: [{ path: 'sales', children: [{ path: 'monthlyRevenue.do', element: <Sales /> }] },
    ],
},
];

export const Routers = createBrowserRouter(routers);
