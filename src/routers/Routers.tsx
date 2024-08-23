import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { DashBoard } from "../component/layout/DashBoard/DashBoard";
import { NotFound } from "../component/common/NotFound/NotFound";
import { EmpSalePlan } from "../pages/Business/EmpSalePlan/EmpSalePlan";

import { EmpGrade } from "../pages/Employee/EmpGrade";
import { Unpaid } from "../pages/Accounting/Unpaid";
import { BizPartner } from "../pages/Business/BizPartner";
import { EstMng } from "../pages/Business/EstMng";
import { VctnApprove } from "../pages/Business/VctnApprove";
import { VctnCalendar } from "../pages/Employee/VctnCalendar";
import { AccSlip } from "../pages/Accounting/AccSlip";

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
                    { path: "vctnCalendar.do", element: <VctnCalendar /> },
                ],
            },
            {
                path: "accounting",
                children: [
                    { path: "unpaid.do", element: <Unpaid /> },
                    { path: "accSlipF.do", element: <AccSlip /> },
                ],
            },
            {
                path: "business",
                children: [
                    { path: "bizPartner.do", element: <BizPartner /> },
                    { path: "estMng.do", element: <EstMng /> },
                    { path: "empSalePlan.do", element: <EmpSalePlan /> },
                ],
            },
        ],
    },
];

export const Routers = createBrowserRouter(routers);
