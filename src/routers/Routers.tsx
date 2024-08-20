import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { DashBoard } from "../component/layout/DashBoard/DashBoard";
import { NotFound } from "../component/common/NotFound/NotFound";
import { Unpaid } from "../pages/Accounting/Unpaid";
import { BizPartner } from "../pages/Business/BizPartner";

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
            {
                path: "business",
                children: [{ path: "bizPartner.do", element: <BizPartner/> }],
            },
        ],
    },
];

export const Routers = createBrowserRouter(routers);
