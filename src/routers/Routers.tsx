import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { DashBoard } from "../component/layout/DashBoard/DashBoard";
import { NotFound } from "../component/common/NotFound/NotFound";
import { EmpGrade } from "../pages/Employee/EmpGrade";

const routers: RouteObject[] = [
    { path: "*", element: <NotFound /> },
    { path: "/", element: <Login /> },
    {
        path: "/react",
        element: <DashBoard />,
        children: [
            { path: 'employee', 
                children : [
                    { path:'empGrade.do', element: <EmpGrade/> }
                ]
            }
        ],
    },
];

export const Routers = createBrowserRouter(routers);
