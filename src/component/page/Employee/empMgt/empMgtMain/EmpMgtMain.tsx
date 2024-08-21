import { useContext, useEffect, useState } from "react"
import { EmpMgtContext } from "../../../../../pages/Employee/empMgt/EmpMgt"
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Button } from "../../../../common/Button/Button";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { EmpMgtModal } from "../empMgtModal/EmpMgtModal";
import { modalState1 } from "../EmpMgtSalaryModal/EmpMgtSalaryModal";

export interface IUserInfo {
    loginId : string;
    userType : string;
    name : string;
    hp : string;
    email : string;
    regdate : string;
    zipCode : String;
    addr: String;
    addrDetail: String;
    birthday: String;
    deptCode: String;
    deptName: String;
    posCode: String;
    posName: String;
    jobCode: String;
    school: String;
    empDate: String;
    leaveDate: String;
    emplStatus: String;
}

export interface IUserInfoResponse {
    empMgtList : IUserInfo[];
    empMgtCnt : number;
}

export const EmpMgtMain =()=>{
    const {searchkeyword} = useContext(EmpMgtContext);
    const [totalCnt, setTotalCnt] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [modal, setModal] = useRecoilState(modalState);
    const [userList, setUserList] = useState<IUserInfo[]>();
    const [loginId , setLoginId] = useState<string>('');
    const [modal1, setModal1] = useRecoilState(modalState1);
    
    useEffect(()=>{
        searchUser();
    },[searchkeyword]);

    const searchUser =(cpage ? : number)=>{
        cpage = cpage || 1;
        const postAction:AxiosRequestConfig={
            method: 'POSt',
            url : '/employee/empMgtList1.do',
            data : {...searchkeyword, currentPage: cpage, pageSize: 5},
            headers:{
                'Content-Type':'application/json',
            },
        };
        axios(postAction).then((res:AxiosResponse<IUserInfoResponse>)=>{
            setUserList(res.data.empMgtList);
            setCurrentPage(cpage);
            setTotalCnt(res.data.empMgtCnt);
        });
    };

    const modalHandler = (loginId: string,  e:React.MouseEvent<HTMLElement, MouseEvent>) =>{
        setModal(!modal);
        setLoginId(loginId);
    }

    const onPostSuccess = () =>{
        setModal(!modal);
        searchUser(currentPage);
    }
    return(
        <>
        <Button
            onClick={()=>{
                setModal(!modal);
            }}>
            신규 등록
        </Button>
        <StyledTable>
        <colgroup>
                    <col width="20%" />
                    <col width="10%" />
                    <col width="20%" />
                    <col width="7%" />
                    <col width="10%" />
                    <col width="5%" />
                    <col width="5%" />
                    <col width="5%" />
                    <col width="5%" />
                    <col width="5%" />
                </colgroup>
                <thead>
                    <tr>
                        <StyledTh size={10}>사번</StyledTh>
                        <StyledTh size={5}>사원명</StyledTh>
                        <StyledTh size={10}>부서코드</StyledTh>
                        <StyledTh size={5}>부서명</StyledTh>
                        <StyledTh size={7}>직급</StyledTh>
                        <StyledTh size={3}>입사일자</StyledTh>
                        <StyledTh size={3}>재직/퇴직</StyledTh>
                        <StyledTh size={3}>휴직</StyledTh>
                        <StyledTh size={3}>퇴사일자</StyledTh>
                        <StyledTh size={3}>퇴직처리</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {userList && userList?.length > 0 ? (
                        userList.map((a)=>{
                            return(
                                <tr key={a.loginId}>
                                    <StyledTd onClick={(e)=>{modalHandler(a.loginId,e)}}>{a.loginId}</StyledTd>
                                    <StyledTd>{a.name}</StyledTd>
                                    <StyledTd>{a.deptCode}</StyledTd>
                                    <StyledTd>{a.deptName}</StyledTd>
                                    <StyledTd>{a.posName}</StyledTd>
                                    <StyledTd>{a.empDate}</StyledTd>
                                    {(a.emplStatus === 'W' || a.emplStatus === 'O') ? 
                                    (<StyledTd>재직</StyledTd>) : 
                                    (<StyledTd>퇴직</StyledTd>)}
                                    {(a.emplStatus === 'O'  )?
                                    (<StyledTd>Y</StyledTd>) :
                                    (<StyledTd>N</StyledTd>)}
                                    <StyledTd>{a.leaveDate}</StyledTd>
                                    <StyledTd>
                                        <Button onClick={()=>setModal1(!modal1)}>퇴직처리</Button>
                                    </StyledTd>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={10}>데이터가 없습니다</StyledTd>
                        </tr>
                    )}
                </tbody>
        </StyledTable>
        <PageNavigate
            totalItemsCount={totalCnt}
            onChange={searchUser}
            itemsCountPerPage={5}
            activePage={currentPage as number}
        ></PageNavigate>
        <EmpMgtModal onPostSuccess={onPostSuccess} loginId={loginId} setLoginId={setLoginId}></EmpMgtModal>
        </>
    )
}