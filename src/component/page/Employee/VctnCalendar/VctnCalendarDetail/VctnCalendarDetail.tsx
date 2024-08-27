import { FC, useEffect, useState } from "react"
import { VctnCalendarDetailStyled } from "./styled";
import { Button } from "../../../../common/Button/Button";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import axios from "axios";
import { IModalDetail, IVctnCalendarDetailProps } from "../../../../../models/interface/Employee/VctnCalendar/VctnCalendarModel";

export const VctnCalendarDetail:FC<IVctnCalendarDetailProps> = ({modalParam})=>{

    const [date, setDate] = useState<string>()
    const [title, setTitle] = useState<string>()
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [detail, setDetail] = useState<IModalDetail>();

    useEffect(()=>{

        setDate(modalParam?.date)
        if(modalParam?.applyYn==='Y'){
            setTitle('승인')
        }else if(modalParam?.applyYn==='W'){
            setTitle('미승인')
        }else if(modalParam?.applyYn==='N'){
            setTitle('반려')
        }

        modalDetail()
    },[modalParam])

    const modalDetail = ()=>{
        axios
            .post(`/employee/vctnCalendarApplyListJson.do`, { applyYn : modalParam?.applyYn,  date: modalParam?.date})
            .then((res) => {
                setDetail(res.data)
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return(
       <VctnCalendarDetailStyled>
            <div className="container">
                <div className="title">{date} {title}건 현황</div>
                <div className="content">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">부서</th>
                                <th scope="col">사원명</th>
                                <th scope="col">신청구분</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                detail
                                ?
                                <tr>
                                    <td>{detail.deptName}</td>
                                    <td>{detail.name}</td>
                                    <td>{detail.vctnName}</td>
                                </tr>
                                :
                                null
                            }
                           
                        </tbody>
                    </table>
                </div>
                <div className="buttonDiv">
                    <Button onClick={()=>{setModal(!modal)}}>닫기</Button>
                </div>
            </div>
       </VctnCalendarDetailStyled>
    )
}