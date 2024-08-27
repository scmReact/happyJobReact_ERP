import { useContext, useEffect, useState } from "react";
import { UnpaidContext } from "../../../../../api/provider/UnpaidProvider";
import { UnpaidMainStyled } from "./styled";
import { AccountingApi } from "../../../../../api/api";
import { postComnApi } from "../../../../../api/postComnApi";
import {
    StyledTable,
    StyledTd,
    StyledTh,
} from "../../../../common/styled/StyledTable";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { modalUnpaidDetailState } from "../../../../../stores/modalUnpaidDetail";
import { useRecoilState } from "recoil";
import { UnpaidDetailModal } from "../UnpaidDetailModal/UnpaidDetailModal";
import {
    IUnpaid,
    IUnpaidResponse,
} from "../../../../../models/interface/Accounting/UnpaidModel";

/**
 * UnpaidMain
 * - 미수금관리현황 조회 정보값을 기준으로 조회된 미수금관리정보 컴포넌트
 *
 * Example usage:
 * - 미수금관리이력
 * - 속성
 *   @StyledTable: 조회된 정보를 보여주는 곳
 *
 * pageSize 10
 *
 * Example usage:
 * <UnpaidMain />
 */

export const UnpaidMain = () => {
    const [modal, setModal] = useRecoilState(modalUnpaidDetailState);
    const { searchKeyword } = useContext(UnpaidContext);
    const [unpaidList, setUnpaidList] = useState<IUnpaid[]>();
    const [totalCnt, setTotalCnt] = useState<number>(0);
    const [currentParam, setCurrentParam] = useState<number | undefined>();
    const [type, setType] = useState<string>("");
    const [num, setNum] = useState<number>(0);

    useEffect(() => {
        handlerSearch();
    }, [searchKeyword]);

    const handlerSearch = async (cpage?: number) => {
        setUnpaidList([]);
        cpage = cpage || 1;
        const postSearch = await postComnApi<IUnpaidResponse>(
            AccountingApi.unpaidSearchJson,
            { ...searchKeyword, currentPage: cpage, pageSize: 10 }
        );

        if (postSearch) {
            setUnpaidList(postSearch.list);
            setTotalCnt(postSearch.listCount);
            setCurrentParam(cpage);
        }
    };

    const handlerModal = (type: string, num: number) => {
        setType(type);
        setNum(num);
        onPostSuccess();
    };

    const onPostSuccess = () => {
        setModal(!modal);
    };

    return (
        <UnpaidMainStyled>
            <p>
                ※ 번호 : 처리 주체가 견적서일 때는 견적서 번호, SCM 수주일 때는
                수주 시퀀스
            </p>
            <StyledTable>
                <colgroup>
                    <col width="10%" />
                    <col width="15%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="15%" />
                    <col width="10%" />
                    <col width="10%" />
                </colgroup>
                <thead>
                    <tr>
                        <StyledTh size={5}>번호</StyledTh>
                        <StyledTh size={5}>처리주체</StyledTh>
                        <StyledTh size={5}>거래처</StyledTh>
                        <StyledTh size={5}>금액</StyledTh>
                        <StyledTh size={5}>수주일</StyledTh>
                        <StyledTh size={5}>납품상태</StyledTh>
                        <StyledTh size={5}>수금상태</StyledTh>
                        <StyledTh size={5}>담당자</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {unpaidList && unpaidList?.length > 0 ? (
                        unpaidList.map((a) => {
                            return (
                                <tr
                                    key={a.num}
                                    onClick={() => handlerModal(a.type, a.num)}
                                >
                                    <StyledTd>{a.num}</StyledTd>
                                    <StyledTd>
                                        {a.type === "obtain"
                                            ? "SCM 수주"
                                            : "견적서"}
                                    </StyledTd>
                                    <StyledTd>{a.custName}</StyledTd>
                                    <StyledTd>
                                        {a.amount.toLocaleString("kr-KR")}
                                    </StyledTd>
                                    <StyledTd>{a.bookDate}</StyledTd>
                                    <StyledTd>
                                        {a.unpaidState === "Y"
                                            ? "납품완료"
                                            : "납품미완료"}
                                    </StyledTd>
                                    <StyledTd>
                                        {a.expireState === "Y"
                                            ? "수금완료"
                                            : "미수금"}
                                    </StyledTd>
                                    <StyledTd>{a.userName}</StyledTd>
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
                totalItemsCount={totalCnt}
                onChange={handlerSearch}
                itemsCountPerPage={10}
                activePage={currentParam as number}
            ></PageNavigate>
            {modal ? (
                <UnpaidDetailModal
                    onPostSuccess={onPostSuccess}
                    type={type}
                    num={num}
                ></UnpaidDetailModal>
            ) : null}
        </UnpaidMainStyled>
    );
};
