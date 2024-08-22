import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { modalState } from "../../../../stores/modalState";
import { useRecoilState } from "recoil";
import { StyledTable, StyledTd, StyledTh } from "../../../common/styled/StyledTable";
import { PageNavigate } from "../../../common/pageNavigation/PageNavigate";
import { Protal } from "../../../common/potal/Portal";
import { DisbApplyDetailModal } from "./DisbApplyDetailModal";

export interface IDisbApplyList {
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

export interface IDisbApplyListResponse {
    disbList: IDisbApplyList[];
    disbCnt: number;
}

export const DisbApplyMain = () => {
    const { search } = useLocation();
    const [disbApplyList, setDisbApplyList] = useState<IDisbApplyList[]>([]);
    const [disbApplyListCount, setDisbApplyListCount] = useState<number>(0);
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [currentParam, setCurrentParam] = useState<number | undefined>();
    const [resoNum, setResoNum] = useState<number | undefined>();

    useEffect(() => {
        searchDisbApplyList();
    }, [search]);

    const searchDisbApplyList = (cpage?: number) => {
        cpage = cpage || 1;
        const searchParam = new URLSearchParams(search);

        searchParam.append("cpage", cpage.toString());
        searchParam.append("pageSize", "10");

        axios.post("/accounting/disbListJson", searchParam).then((res: AxiosResponse<IDisbApplyListResponse>) => {
            setDisbApplyList(res.data.disbList);
            setDisbApplyListCount(res.data.disbCnt);
            setCurrentParam(cpage);
        });
    };

    const handlerModal = (resoNum?: number) => {
        setModal(!modal);
        setResoNum(resoNum);
    };

    const postSuccess = () => {
        setModal(!modal);
        searchDisbApplyList();
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
                    {disbApplyList.length > 0 ? (
                        disbApplyList?.map((a) => {
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
                totalItemsCount={disbApplyListCount}
                onChange={searchDisbApplyList}
                itemsCountPerPage={10}
                activePage={currentParam as number}
            ></PageNavigate>
            {modal ? (
                <Protal>
                    <DisbApplyDetailModal
                        resoNum={resoNum}
                        onSuccess={postSuccess}
                        setResoNum={setResoNum}
                    ></DisbApplyDetailModal>
                </Protal>
            ) : null}
        </>
    );
};
