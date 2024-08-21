import { atom, useRecoilState } from "recoil"
import { SalaryModalStyled, SalaryTableStyled } from "./styled";
import { Button } from "../../../../common/Button/Button";
import { FC } from "react";


export const modalState1 = atom<boolean>({
    key: 'modalState1',
    default: false,
});

const cleanUp =()=>{

}

export const EmpMgtSalaryModal:FC =() => {
    const [modal1, setModal1] = useRecoilState(modalState1)

    return (
        <>
        <SalaryModalStyled isOpen={modal1} ariaHideApp={false} onAfterClose={cleanUp}>
            <div className="wrap">
                <div className="header">연봉 선택</div>
                <SalaryTableStyled>
                    <tbody>
                        
                    </tbody>
                </SalaryTableStyled>
                <Button onClick={()=> setModal1(!modal1)}>닫기</Button>
            </div>
        </SalaryModalStyled>
        </>
    )
}