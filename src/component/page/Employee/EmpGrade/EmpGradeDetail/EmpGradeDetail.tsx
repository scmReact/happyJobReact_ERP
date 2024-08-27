import { FC, useEffect, useState } from "react";
import { EmpGradeDetailStyled } from "./styled";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { useLocation } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";

export interface IEmpGradeDetailProps {
    loginId: string;
    name: string;
    deptName: string;
    posName: string;
}

export interface IEmpGradeDetail {
    loginID: string, 
    name: string, 
    deptCode: string, 
    deptName: string, 
    posCode: string, 
    posName: string, 
    issuDate: string
}

export interface IEmpGradeDetailJsonResponse {
    empGradeDetailList: IEmpGradeDetail[];
    empGradeDetailCnt: number;
}

export const EmpGradeDetail:FC<IEmpGradeDetailProps> = ({ loginId, name, deptName, posName }) => {
    const { search } = useLocation();
    const [currentParam, setCurrentParam] = useState<number|undefined>();
    const [empGradeDetailList, setEmpGradeDetailList] = useState<IEmpGradeDetail[]>([]);
    const [empGradeDetailCnt, setEmpGradeDetailCnt] = useState<number>(0);
  

    // const empGradeDetail = (loginId: string) => {
    //     axios.post()
    // } 

    const empGradeDetailJson = (cpage?: number) => {
        cpage = cpage || 1;
        const searchParam = new URLSearchParams(search);
        
        searchParam.append('cpage', cpage.toString());
        searchParam.append('pageSize', '5');
        searchParam.append('loginId', loginId);
        
        axios.post('/employee/empGradeDetailJson.do', searchParam).then((res: AxiosResponse<IEmpGradeDetailJsonResponse>) => {
            setEmpGradeDetailList(res.data.empGradeDetailList);
            setEmpGradeDetailCnt(res.data.empGradeDetailCnt);
            setCurrentParam(cpage);
        });
    };
    
    useEffect(() => {
        empGradeDetailJson();
    }, [search]);

    return (
        <>
            <EmpGradeDetailStyled>
                <div>
                    <label>사번</label>
                    <input type="text" value={loginId} readOnly></input>
                    <label>사원명</label>
                    <input type="text" value={name} readOnly></input>
                    <label>부서명</label>
                    <input type="text" value={deptName}></input>
                    <label>현재 직급</label>
                    <input type="text" value={posName}></input>
                </div>
                <StyledTable>
                    <thead>
                        <tr>
                            <StyledTh>발령일자</StyledTh>
                            <StyledTh>발령내용</StyledTh>
                        </tr>
                    </thead>
                    <tbody>
                        {empGradeDetailList.map((a)=>{
                            return(
                                <tr>
                                    <StyledTd>{a.issuDate}</StyledTd>
                                    <StyledTd>{a.posName}</StyledTd>
                                </tr>
                            )
                        })}
                    </tbody>
                </StyledTable>
            </EmpGradeDetailStyled>
            <PageNavigate 
            totalItemsCount={empGradeDetailCnt}
            onChange={empGradeDetailJson}
            itemsCountPerPage={5}
            activePage={currentParam as number}
        ></PageNavigate>
        </>
    );
};