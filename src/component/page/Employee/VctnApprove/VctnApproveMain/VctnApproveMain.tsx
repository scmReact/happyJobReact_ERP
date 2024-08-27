import { useContext, useEffect, useState } from "react";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { VctnApproveMainStyled } from "./styled";
import { IVctn, IVctnResponse } from "../../../../../models/interface/Employee/VctnApproveModel";
import { VctnApproveContext } from "../../../../../api/provider/VctnApproveProvider";
import { postComnApi } from "../../../../../api/postComnApi";
import { EmployeeApi } from "../../../../../api/api";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { VctnApproveModal } from "../VctnApproveModal/VctnApproveModal";

export const VctnApproveMain = () => {
    const { searchKeyword } = useContext(VctnApproveContext);
    const [currentPage, setCurrentPage] = useState<number>();
    const [vctnApproveList, setVctnApproveList] = useState<IVctn[]>([]);
    const [vctnApproveTotalCnt, setVctnApproveTotalCnt] = useState<number>(0);

    const [modal, setModal] = useRecoilState(modalState);
    const [vctnSeq, setVctnSeq] = useState<number>();

    useEffect(() => {
        searchVctn();
    }, [searchKeyword]);

    // 근태 목록 조회
    const searchVctn = async (cpage?: number) => {
        cpage = cpage || 1;

        const postSearchVctn = await postComnApi<IVctnResponse>(EmployeeApi.vctnSearchJson, {
            ...searchKeyword,
            cpage: cpage,
            pageSize: 5,
        });

        if (postSearchVctn) {
            setVctnApproveList(postSearchVctn.vctnApproveList);
            setVctnApproveTotalCnt(postSearchVctn.vctnApproveCnt);
            setCurrentPage(cpage);
        }
    };

    const handlerModal = (vctnSeq?: number) => {
        setModal(!modal);
        setVctnSeq(vctnSeq);
    };

    const onPostSuccess = () => {
        setModal(!modal);
        searchVctn();
    };

    return (
        <VctnApproveMainStyled>
            <StyledTable>
                <colgroup>
                    <col width="8%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="14%" />
                    <col width="14%" />
                    <col width="14%" />
                    <col width="10%" />
                    <col width="10%" />
                </colgroup>
                <thead>
                    <tr>
                        <StyledTh>번호</StyledTh>
                        <StyledTh>사번</StyledTh>
                        <StyledTh>사원명</StyledTh>
                        <StyledTh>신청구분</StyledTh>
                        <StyledTh>시작일자</StyledTh>
                        <StyledTh>종료일자</StyledTh>
                        <StyledTh>결재일자</StyledTh>
                        <StyledTh>결재자</StyledTh>
                        <StyledTh>승인여부</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {vctnApproveList && vctnApproveList.length > 0 ? (
                        vctnApproveList.map((vctn) => {
                            return (
                                <tr key={vctn.seq} onClick={() => handlerModal(vctn.seq)}>
                                    <StyledTd>{vctn.seq}</StyledTd>
                                    <StyledTd>{vctn.loginId}</StyledTd>
                                    <StyledTd>{vctn.name}</StyledTd>
                                    <StyledTd>{vctn.vctnName}</StyledTd>
                                    <StyledTd>{vctn.vctnStrDate}</StyledTd>
                                    <StyledTd>{vctn.vctnEndDate}</StyledTd>
                                    <StyledTd>{vctn.applyDate}</StyledTd>
                                    <StyledTd>{vctn.applyer}</StyledTd>
                                    <StyledTd>
                                        {vctn.applyYn === "Y" && "승인"}
                                        {vctn.applyYn === "N" && "반려"}
                                        {vctn.applyYn === "W" && "미승인"}
                                    </StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={9}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            <PageNavigate totalItemsCount={vctnApproveTotalCnt} onChange={searchVctn} itemsCountPerPage={5} activePage={currentPage as number}></PageNavigate>
            <VctnApproveModal vctnSeq={vctnSeq} onPostSuccess={onPostSuccess}></VctnApproveModal>
        </VctnApproveMainStyled>
    );
};
