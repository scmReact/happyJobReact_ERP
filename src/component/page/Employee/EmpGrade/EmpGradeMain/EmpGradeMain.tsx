import { useEffect, useState } from "react";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable"
import axios, { AxiosResponse } from "axios";
import { useLocation } from "react-router-dom";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { EmpGradeDetail } from "../EmpGradeDetail/EmpGradeDetail";

export interface IEmpGradeList {
    loginId: string,
    name: string,
    deptCode: string,
    deptName: string,
    posCode: string,
    posName: string,
    issuDate: string,
    use_yn: string,
}

export interface IEmpGradeListJsonResponse {
    empGradeCnt: number;
    empGradeList: IEmpGradeList[];
}


export const EmpGradeMain = () => {
    const { search } = useLocation();
    const [empGradeList, setEmpGradeList] = useState<IEmpGradeList[]>([]);
    const [empGradeCnt, setEmpGradeCnt] = useState<number>(0);
    const [currentParam, setCurrentParam] = useState<number | undefined>();
    const [detail, setDetail] = useState<boolean>(false);
    const [loginId, setLoginId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [deptName, setDeptName] = useState<string>('');
    const [posName, setPosName] = useState<string>('');

    useEffect(() => {
        empGradeSearchJson();
    }, [search]);

    const empGradeSearchJson = (cpage?: number) => {
        cpage = cpage || 1;
        const searchParam = new URLSearchParams(search);

        searchParam.append('cpage', cpage.toString());
        searchParam.append('pageSize', '5');

        axios.post('/employee/empGradeSearchJson.do', searchParam).then((res: AxiosResponse<IEmpGradeListJsonResponse>) => {
            setEmpGradeList(res.data.empGradeList);
            setEmpGradeCnt(res.data.empGradeCnt);
            setCurrentParam(cpage);
        });
    };

    const handlerModal = (loginId: string, name: string, deptName: string, posName: string) => {
        setDetail(true);
        setLoginId(loginId);
        setName(name);
        setDeptName(deptName);
        setPosName(posName);
    };

    return (
        <>
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh>사번</StyledTh>
                        <StyledTh>사원명</StyledTh>
                        <StyledTh>부서코드</StyledTh>
                        <StyledTh>부서명</StyledTh>
                        <StyledTh>직급</StyledTh>
                        <StyledTh>발령일자</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {empGradeList.length > 0 ?(
                        empGradeList?.map((empGrade) => {
                            return (
                                <tr 
                                    key={empGrade.loginId}
                                    onClick={() => handlerModal(empGrade.loginId, empGrade.name, empGrade.deptName, empGrade.posName)}>
                                    <StyledTd>{empGrade.loginId}</StyledTd>
                                    <StyledTd>{empGrade.name}</StyledTd>
                                    <StyledTd>{empGrade.deptCode}</StyledTd>
                                    <StyledTd>{empGrade.deptName}</StyledTd>
                                    <StyledTd>{empGrade.posName}</StyledTd>
                                    <StyledTd>{empGrade.issuDate}</StyledTd>
                                </tr>
                            );
                        })
                    ) : 
                        <tr>
                            <td colSpan={6}>조회된 결과가 없습니다.</td>
                        </tr>
                    }
                </tbody>
            </StyledTable>
            <PageNavigate 
                totalItemsCount={empGradeCnt}
                onChange={empGradeSearchJson}
                itemsCountPerPage={5}
                activePage={currentParam as number}
            ></PageNavigate>
            {detail ? <EmpGradeDetail loginId={loginId} name={name} deptName={deptName} posName={posName}></EmpGradeDetail> : null}
        </>
    );
}