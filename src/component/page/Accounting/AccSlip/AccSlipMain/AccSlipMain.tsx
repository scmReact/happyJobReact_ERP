import { useContext, useEffect, useState } from "react";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { AccSlipButtonStyled } from "./styled";
import { AccSlipContext } from "../../../../../api/provider/AccSlipProvider";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { IAccSlip, IAccSlipResponse } from "../../../../../models/interface/Accounting/AccSlipModel";
import { postComnApi } from "../../../../../api/postComnApi";
import { AccountingApi } from "../../../../../api/api";
import { Button } from "../../../../common/Button/Button";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { AccSlipModal } from "../AccSlipModal/AccSlipModal";

export const AccSlipMain = () => {
    const { searchKeyword, searchCust } = useContext(AccSlipContext);
    const [currentPage, setCurrentPage] = useState<number>();
    const [accSlipList, setAccSlipList] = useState<IAccSlip[]>([]);
    const [accSlipTotalCnt, setAccSlipTotalCnt] = useState<number>(0);
    const [modal, setModal] = useRecoilState(modalState);
    const [showModalBtn, setShowModalBtn] = useState<boolean>(false);

    useEffect(() => {
        searchAccSlip();
    }, [searchKeyword, searchCust]);

    // 회계 전표 목록 조회
    const searchAccSlip = async (cpage?: number) => {
        cpage = cpage || 1;

        const postSearchAccSlip = await postComnApi<IAccSlipResponse>(AccountingApi.accSlipSearchJson, {
            ...searchKeyword,
            currentPage: cpage,
            pageSize: 5,
        });

        if (postSearchAccSlip) {
            setAccSlipList(postSearchAccSlip.accSlipList);
            setAccSlipTotalCnt(postSearchAccSlip.accSlipTotalCnt);
            setCurrentPage(cpage);

            if (searchCust.cust_id !== "all" && searchCust.cust_id !== "" && postSearchAccSlip.accSlipList.length > 0) setShowModalBtn(true);
            else setShowModalBtn(false);
        }
    };

    const handlerModal = () => {
        setModal(!modal);
    };

    return (
        <>
            <AccSlipButtonStyled>{showModalBtn ? <Button onClick={handlerModal}>상세조회</Button> : null}</AccSlipButtonStyled>
            <StyledTable>
                <colgroup>
                    <col width="10%" />
                    <col width="16%" />
                    <col width="16%" />
                    <col width="16%" />
                    <col width="10%" />
                    <col width="16%" />
                    <col width="16%" />
                </colgroup>
                <thead>
                    <tr>
                        <StyledTh>전표번호</StyledTh>
                        <StyledTh>전표일자</StyledTh>
                        <StyledTh>계정코드</StyledTh>
                        <StyledTh>계정과목</StyledTh>
                        <StyledTh>담당자</StyledTh>
                        <StyledTh>거래처명</StyledTh>
                        <StyledTh>지출</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {accSlipList && accSlipList.length > 0 ? (
                        accSlipList.map((accSlip) => {
                            return (
                                <tr key={accSlip.acctNum}>
                                    <StyledTd>{accSlip.acctNum}</StyledTd>
                                    <StyledTd>{accSlip.acctDate}</StyledTd>
                                    <StyledTd>{accSlip.acctCode}</StyledTd>
                                    <StyledTd>{accSlip.acctCodeNm}</StyledTd>
                                    <StyledTd>{accSlip.managerNm}</StyledTd>
                                    <StyledTd>{accSlip.custName}</StyledTd>
                                    <StyledTd>{accSlip.disbAmount.toLocaleString("kr-ko")} 원</StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={7}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            <PageNavigate totalItemsCount={accSlipTotalCnt} onChange={searchAccSlip} itemsCountPerPage={5} activePage={currentPage as number}></PageNavigate>
            <AccSlipModal accSlipList={accSlipList}></AccSlipModal>
        </>
    );
};
