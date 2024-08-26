import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { modalState } from "../../../../../stores/modalState";
import { useRecoilState } from "recoil";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { Protal } from "../../../../common/potal/Portal";
import { DisbursementDetailModal } from "../DisbursementDetailModal/DisbursementDetailModal";

export interface IDisbApprList {
    resoNum: number;
    applyId: string;
    applyDept: string;
    custId: number;
    groupCode: string;
    grCodeNm: string;
    acctCode: string;
    acctCodeNm: string;
    applyDate: string;
    useDate: string;
    disbContent: string;
    amount: number;
    apprYn: string;
    apprDate: string;
    eviMaterial: string;
}

export interface IDisbApprListResponse {
    disbApprList: IDisbApprList[];
    disbApprCnt: number;
}

export const DisbursementMain = () => {
    const { search } = useLocation();
    const [disbApprList, setDisbApprList] = useState<IDisbApprList[]>([]);
    const [disbApprListCount, setDisbApprListCount] = useState<number>(0);
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [currentParam, setCurrentParam] = useState<number | undefined>();
    const [resoNum, setResoNum] = useState<number | undefined>();

    useEffect(() => {
        searchDisbApprList();
    }, [search]);

    const searchDisbApprList = (cpage?: number) => {
        cpage = cpage || 1;
        const searchParam = new URLSearchParams(search);

        searchParam.append("cpage", cpage.toString());
        searchParam.append("pageSize", "10");

        axios.post("/accounting/disbApprListJson", searchParam).then((res: AxiosResponse<IDisbApprListResponse>) => {
            setDisbApprList(res.data.disbApprList);
            setDisbApprListCount(res.data.disbApprCnt);
            setCurrentParam(cpage);
        });
    };

    const handlerModal = (resoNum?: number) => {
        setModal(!modal);
        setResoNum(resoNum);
    };

    const postSuccess = () => {
        setModal(!modal);
        searchDisbApprList();
    };

    return (
        <>
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh size={10}>결의번호</StyledTh>
                        <StyledTh size={10}>신청일자</StyledTh>
                        <StyledTh size={10}>사용일자</StyledTh>
                        <StyledTh size={12.5}>계정대분류</StyledTh>
                        <StyledTh size={12.5}>계정과목</StyledTh>
                        <StyledTh size={10}>사용부서</StyledTh>
                        <StyledTh size={15}>결의금액</StyledTh>
                        <StyledTh size={10}>승인여부</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {disbApprList.length > 0 ? (
                        disbApprList?.map((a) => {
                            return (
                                <tr
                                    key={a.resoNum}
                                    onClick={() => {
                                        handlerModal(a.resoNum);
                                    }}
                                >
                                    <StyledTd>{a.resoNum}</StyledTd>
                                    <StyledTd>{a.applyDate}</StyledTd>
                                    <StyledTd>{a.useDate}</StyledTd>
                                    <StyledTd>{a.grCodeNm}</StyledTd>
                                    <StyledTd>{a.acctCodeNm}</StyledTd>
                                    <StyledTd>{a.applyDept}</StyledTd>
                                    <StyledTd>{a.amount.toLocaleString("ko-KR")} 원</StyledTd>
                                    <StyledTd>
                                        {a.apprYn === "Y" ? "승인" : a.apprYn === "N" ? "반려" : "승인대기"}
                                    </StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={8}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            <PageNavigate
                totalItemsCount={disbApprListCount}
                onChange={searchDisbApprList}
                itemsCountPerPage={10}
                activePage={currentParam as number}
            ></PageNavigate>
            {modal ? (
                <Protal>
                    <DisbursementDetailModal
                        resoNum={resoNum}
                        onSuccess={postSuccess}
                        setResoNum={setResoNum}
                    ></DisbursementDetailModal>
                </Protal>
            ) : null}
        </>
    );
};
