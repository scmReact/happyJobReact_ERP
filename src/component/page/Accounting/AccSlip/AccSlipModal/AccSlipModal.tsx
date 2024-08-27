import { FC, useContext, useEffect, useState } from "react";
import { AccSlipModalStyled, AccSlipModalTableStyled } from "./styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { Button } from "../../../../common/Button/Button";
import { StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { AccSlipContext } from "../../../../../api/provider/AccSlipProvider";
import { IAccSlip } from "../../../../../models/interface/Accounting/AccSlipModel";

export interface AccSlipModalProps {
    accSlipList: IAccSlip[];
}

export const AccSlipModal: FC<AccSlipModalProps> = ({ accSlipList }) => {
    const [modal, setModal] = useRecoilState(modalState);
    const { searchCust } = useContext(AccSlipContext);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    useEffect(() => {
        const total = accSlipList.reduce((sum, accSlip) => sum + accSlip.disbAmount, 0); // 지출 합계
        setTotalAmount(total);
    }, [accSlipList]);

    return (
        <AccSlipModalStyled ariaHideApp={false} isOpen={modal}>
            <div className="wrap">
                <div className="header">회계전표</div>
                <div className="divCustName">
                    <label>
                        거래처명 : <input type="text" value={searchCust.cust_name} readOnly></input>
                    </label>
                </div>
                <AccSlipModalTableStyled>
                    <colgroup>
                        <col width="30%" />
                        <col width="45%" />
                        <col width="25%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <StyledTh>계정과목</StyledTh>
                            <StyledTh>적요</StyledTh>
                            <StyledTh>지출</StyledTh>
                        </tr>
                    </thead>
                    <tbody>
                        {accSlipList && accSlipList.length > 0 ? (
                            accSlipList.map((accSlip) => {
                                return (
                                    <tr key={accSlip.acctNum}>
                                        <StyledTd>{accSlip.acctCodeNm}</StyledTd>
                                        <StyledTd></StyledTd>
                                        <StyledTd>{accSlip.disbAmount.toLocaleString("ko-kr")} 원</StyledTd>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <StyledTd colSpan={3}>데이터가 없습니다.</StyledTd>
                            </tr>
                        )}

                        <tr>
                            <StyledTh className="thTotal" color="red" colSpan={2}>
                                합&nbsp;&nbsp;&nbsp;&nbsp;계
                            </StyledTh>

                            <StyledTd>{totalAmount.toLocaleString("ko-kr")} 원</StyledTd>
                        </tr>
                    </tbody>
                </AccSlipModalTableStyled>
                <Button onClick={() => setModal(!modal)}>닫기</Button>
            </div>
        </AccSlipModalStyled>
    );
};
