import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { DashBoard } from "../component/layout/DashBoard/DashBoard";
import { NotFound } from "../component/common/NotFound/NotFound";
import { EmpGrade } from "../pages/Employee/EmpGrade";
import { Unpaid } from "../pages/Accounting/Unpaid";
import { EstMng } from "../pages/Business/EstMng";
import { VctnApprove } from "../pages/Business/VctnApprove";

const routers: RouteObject[] = [
    { path: "*", element: <NotFound /> },
    { path: "/", element: <Login /> },
    {
        path: "/react",
        element: <DashBoard />,
        children: [
            {
                path: "employee",
                children: [
                    { path: "empGrade.do", element: <EmpGrade /> },
                    { path: "vctnApprove.do", element: <VctnApprove /> },
                ],
            },
            {
                path: "accounting",
                children: [{ path: "unpaid.do", element: <Unpaid /> }],
            },
            {
                path: "business",
                children: [{ path: "estMng.do", element: <EstMng /> }],
            },
        ],
    },
];

export const Routers = createBrowserRouter(routers);
