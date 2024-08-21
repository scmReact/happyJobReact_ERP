import { useContext, useEffect, useState } from "react"
import { EmpMgtContext } from "../../../../../pages/Employee/empMgt/EmpMgt"
import { Button } from "../../../../common/Button/Button";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface selectDept {
    detail_name : string;
    detail_code : string;
}
export interface selectPositionResponse {
    positionList : selectDept[];
}
export interface selectDeptResponse {
    deptList : selectDept[];
}

export const EmpMgtSearch = ()=>{
    const {setSearchKeyword} = useContext(EmpMgtContext);
    const [dept, setDept] = useState<selectDept[]>();
    const [position, setPosition] = useState<selectDept[]>();
    const [input, setInput] = useState<{
        searchDept: string;
        searchPos: string;
        searchUser: string;
        search : string;
        searchStDate : string;
        searchEdDate : string;
        searchStatus : string;
    }>({
        searchDept: '',
        searchPos: '',
        searchUser: '',
        search : '',
        searchStDate : '', 
        searchEdDate : '',
        searchStatus : '',
    });

    useEffect(()=>{
        selectDept();
        selectPosition();
    },[]);

    const handlerSearch = () =>{
        setSearchKeyword(input);
    };
    const selectDept =()=>{
        const postAction: AxiosRequestConfig={
            method : 'POST',
            url : '/employee/empMgtDept.do',
            headers : {
                'Content-Type':'application/json',
            },
            data: {},
        };
        axios(postAction).then((res:AxiosResponse<selectDeptResponse>)=>{
            setDept(res.data.deptList);
        })
    };

    const selectPosition =() =>{
        const postAction: AxiosRequestConfig={
            method:'POST',
            url :'/employee/empMgtPosition.do',
            headers :{
                'Content-Type':'application/json',
            },
            data:{},
        };
        axios(postAction).then((res:AxiosResponse<selectPositionResponse>)=>{
            setPosition(res.data.positionList);
        })
    }

    const worker = () =>{
        setInput({ ...input, searchStatus: 'W' });
        setSearchKeyword(input);
    }
    
    const retire = () =>{
        setInput({ ...input, searchStatus: 'R' })
        setSearchKeyword(input);
    }
    return (
        <>
        <div>
        부서
        <select onChange={(e) =>setInput({...input, searchDept : e.currentTarget.value})}>
            {dept && dept?.length > 0 ? (
                dept.map((a,i)=>{
                    return (
                        <option key={i} value={a.detail_name}>{a.detail_name}</option>
                    )
                })
            ) : (null)}
        </select>
        직급
        <select onChange={(e) =>setInput({...input, searchPos : e.currentTarget.value})}>
            {position && position?.length > 0 ? (
                    position.map((a, i)=>{
                        return (
                            <option key={i} value={a.detail_name}>{a.detail_name}</option>
                        )
                    })
                ) : (null)} 
        </select>
        <select onChange={(e) =>setInput({...input, searchUser : e.currentTarget.value})}>
           <option value={'loginId'}>사번</option> 
           <option value={'name'}>사원명</option> 
        </select>
        <input type="text" onChange={(e) =>setInput({...input, search : e.currentTarget.value})}></input>
        <Button padding={5} paddingbottom={5} onClick={handlerSearch}>
            검색
        </Button>
        </div>
        <div>
            <Button onClick={worker}>
                재직자
            </Button>
            <Button onClick={retire}>
                퇴직자
            </Button>            입사일 조회
            <input type="date" onChange={(e) =>setInput({...input, searchStDate : e.currentTarget.value})}></input>
            ~<input type="date" onChange={(e) =>setInput({...input, searchEdDate : e.currentTarget.value})}></input>
        </div>
        </>
    )
}