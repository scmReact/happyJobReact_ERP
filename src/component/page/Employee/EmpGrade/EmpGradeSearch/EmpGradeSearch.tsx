import axios, { AxiosResponse } from "axios";
import { Button } from "../../../../common/Button/Button";
import { EmpGradeSearchStyled } from "./styled";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IComCodList {
    detail_code: string,
    detail_name: string
}

export interface IDeptSearchJsonResponse {
    deptList: IComCodList[];
}

export interface IPosSearchJsonResponse {
    posList: IComCodList[];
}

export const EmpGradeSearch = () => {
    const [deptList, setDeptList] = useState<IComCodList[]>([]);
    const [posList, setPosList] = useState<IComCodList[]>([]);
    const [deptCode, setDeptCode] = useState<string>('');
    const [posCode, setPosCode] = useState<string>('');
    const searchUser = useRef<HTMLSelectElement>(null);
    const search = useRef<HTMLInputElement>(null);
    const searchStDate = useRef<HTMLInputElement>(null);
    const searchEdDate = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        deptSearchJson();
        posSearchJson();
    }, []);

    const deptSearchJson = () => {
        axios.post('/employee/deptSearchJson.do',{}).then((res: AxiosResponse<IDeptSearchJsonResponse>) => {
            setDeptList(res.data.deptList);
        });
    };

    const posSearchJson = () => {
        axios.post('/employee/posSearchJson.do',{}).then((res: AxiosResponse<IPosSearchJsonResponse>) => {
            setPosList(res.data.posList);
        });
    };

    const handlerSearch = () => {
        const query: string[] = [];
        !deptCode || query.push(`searchDept=${deptCode}`);
        !posCode || query.push(`searchPos=${posCode}`);
        !searchUser.current?.value || query.push(`searchUser=${searchUser.current?.value}`);
        !search.current?.value || query.push(`search=${search.current.value}`);
        !searchStDate.current?.value || query.push(`searchStDate=${searchStDate.current.value}`);
        !searchEdDate.current?.value || query.push(`searchEdDate=${searchEdDate.current?.value}`);

        const queryString = query.length > 0 ? `?${query.join('&')}` : '';
        navigate(`/react/employee/empGrade.do${queryString}`);
    };


    return (
        <>
            <EmpGradeSearchStyled>
                <div>
                    <label>부서</label>
                    <select onChange={(e) => setDeptCode(e.target.value)}>
                        <option value="">전체</option>
                        {deptList.map((dept) => (
                            <option key={dept.detail_code} value={dept.detail_code}>
                                {dept.detail_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="position">
                    <label>직급</label>
                    <select onChange={(e) => setPosCode(e.target.value)}>
                        <option value="">전체</option>
                        {posList.map((pos) => (
                            <option key={pos.detail_code} value={pos.detail_code}>
                                {pos.detail_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <select ref={searchUser}>
                        <option value="loginId">사번</option>
                        <option value="name">사원명</option>
                    </select>
                    <input type="text" ref={search}></input>
                </div>
                <Button onClick={handlerSearch}>검색</Button>
                <div>
                    <label>기간별 조회</label>
                    <input type="date" ref={searchStDate}></input>
                    <label>~</label>
                    <input type="date" ref={searchEdDate}></input>
                    <Button onClick={handlerSearch}>조회</Button>
                </div>
            </EmpGradeSearchStyled>
        </>
    );
}