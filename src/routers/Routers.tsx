import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { DashBoard } from "../component/layout/DashBoard/DashBoard";
import { NotFound } from "../component/common/NotFound/NotFound";
import { Emppayment } from "../pages/Employee/EmpPayment";
import { ComnCodMgr } from "../pages/System/ComnCodMgr";
import { ComnCodeMgrDetailMain } from "../component/page/System/ComnCodMgr/ComnCodeMgrDetailMain/ComnCodeMgrDetailMain";

const routers: RouteObject[] = [
    { path: "*", element: <NotFound /> },
    { path: "/", element: <Login /> },
    {
        path: "/react",
        element: <DashBoard />,
        children: [
            { path: 'employee', children: [{ path: 'empPayment.do', element: <Emppayment /> }] },
            {
                path: 'system',
                children: [
                    { path: 'comnCodMgr.do', element: <ComnCodMgr /> },
                    { path: 'comnCodMgr.do/:grpCod', element: <ComnCodeMgrDetailMain /> },
                ],
            },
        ],
    },
];

export const Routers = createBrowserRouter(routers);
