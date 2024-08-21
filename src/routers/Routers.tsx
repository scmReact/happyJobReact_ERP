import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { DashBoard } from "../component/layout/DashBoard/DashBoard";
import { NotFound } from "../component/common/NotFound/NotFound";
import { EmpMgt } from "../pages/Employee/empMgt/EmpMgt";
import { VctnApply } from "../pages/Employee/vctnApply/VctnApply";

const routers: RouteObject[] = [
    { path: "*", element: <NotFound /> },
    { path: "/", element: <Login /> },
    {
        path: "/react",
        element: <DashBoard />,
        children: [
            {
                path : "employee",
                children: [
                    {
                        path :"empMgt.do",
                        element : <EmpMgt></EmpMgt>,
                    },
                    {
                        path : "vctnApply.do",
                        element : <VctnApply/>,
                    }   
                ]
               
            },

        ],
    },
];

export const Routers = createBrowserRouter(routers);
