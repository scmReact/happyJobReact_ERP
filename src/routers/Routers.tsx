import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { DashBoard } from "../component/layout/DashBoard/DashBoard";
import { NotFound } from "../component/common/NotFound/NotFound";
import { Unpaid } from "../pages/Accounting/Unpaid";

const routers: RouteObject[] = [
    { path: "*", element: <NotFound /> },
    { path: "/", element: <Login /> },
    {
        path: "/react",
        element: <DashBoard />,
        children: [
            {
                path: "accounting",
                children: [{ path: "unpaid.do", element: <Unpaid /> }],
            },
        ],
    },
];

export const Routers = createBrowserRouter(routers);
