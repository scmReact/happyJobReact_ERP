import { useContext, useEffect, useState } from "react";
import { EstMngContext } from "../../../../../api/provider/EstMngProvider";
import { EstMngMainStyled } from "./styled";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import {
    StyledTable,
    StyledTd,
    StyledTh,
} from "../../../../common/styled/StyledTable";
import { postComnApi } from "../../../../../api/postComnApi";
import { BusinessApi } from "../../../../../api/api";
import { useRecoilState } from "recoil";
import { modalEstMngInsertModalState } from "../../../../../stores/modalEstMngInsertModalState";
import { EstMngInsertModal } from "../EstMngInsertModal/EstMngInsertModal";
import { modalEstMngInfoState } from "../../../../../stores/modalEstMngInfoState";
import { EstMngInfoModal } from "../EstMngInfoModal/EstMngInfoModal";
import {
    IEstMng,
    IEstMngResponse,
} from "../../../../../models/interface/Business/EstMngModel";

/**
 * EstMngMain
 * - 견적서관리 조회 정보값을 기준으로 조회된 견적서등록 및 조회 컴포넌트
 *
 * Example usage:
 * - 견적서관리 작성 및 조회
 * - 속성
 *   @StyledTable: 조회된 정보를 보여주는 곳
 *
 * pageSize 10
 *
 * Example usage:
 * <EstMngMain />
 */

export const EstMngMain = () => {
    const [estMngInfoModal, setEstMngInfoModal] =
        useRecoilState(modalEstMngInfoState);
    const [estMngInsertModal] = useRecoilState(modalEstMngInsertModalState);
    const { searchKeyword } = useContext(EstMngContext);
    const [estMngList, setEstMngList] = useState<IEstMng[]>();
    const [totalCnt, setTotalCnt] = useState<number>(0);
    const [currentParam, setCurrentParam] = useState<number | undefined>();
    const [estmNum, setEstmNum] = useState<number>(0);

    useEffect(() => {
        handlerSearch();
    }, [searchKeyword, estMngInsertModal]);

    const handlerSearch = async (cpage?: number) => {
        setEstMngList([]);
        cpage = cpage || 1;
        const postSearch = await postComnApi<IEstMngResponse>(
            BusinessApi.estMngSearchJson,
            { ...searchKeyword, currentPage: cpage, pageSize: 10 }
        );

        if (postSearch) {
            setEstMngList(postSearch.list);
            setTotalCnt(postSearch.listCount);
            setCurrentParam(cpage);
        }
    };

    const onModal = (num: number) => {
        setEstmNum(num);
        setEstMngInfoModal(!estMngInfoModal);
        // setType(type);
        // setNum(num);
        // onPostSuccess();
    };

    return (
        <EstMngMainStyled>
            <StyledTable>
                <colgroup>
                    <col width="10%" />
                    <col width="15%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="7%" />
                </colgroup>
                <thead>
                    <tr>
                        <StyledTh size={5}>수주일자</StyledTh>
                        <StyledTh size={5}>거래처</StyledTh>
                        <StyledTh size={5}>제품이름</StyledTh>
                        <StyledTh size={5}>단가</StyledTh>
                        <StyledTh size={5}>부가세</StyledTh>
                        <StyledTh size={5}>공급가액</StyledTh>
                        <StyledTh size={5}>승인여부</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {estMngList && estMngList?.length > 0 ? (
                        estMngList.map((a) => {
                            return (
                                <tr
                                    key={a.estm_num}
                                    onClick={() => onModal(a.estm_num)}
                                    // onClick={() =>
                                    //     setEstMngInfoModal(!estMngInfoModal)
                                    // }
                                >
                                    <StyledTd>{a.estm_date}</StyledTd>
                                    <StyledTd>{a.cust_name}</StyledTd>
                                    <StyledTd>{a.item_name}</StyledTd>
                                    <StyledTd>
                                        {a.item_price.toLocaleString("kr-KR")}원
                                    </StyledTd>
                                    <StyledTd>
                                        {a.item_surtax.toLocaleString("kr-KR")}
                                        원
                                    </StyledTd>
                                    <StyledTd>
                                        {a.provide_value.toLocaleString(
                                            "kr-KR"
                                        )}
                                        원
                                    </StyledTd>
                                    <StyledTd>
                                        {a.apply_yn === "Y"
                                            ? "승인완료"
                                            : "승인대기"}
                                    </StyledTd>
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
            <PageNavigate
                totalItemsCount={totalCnt}
                onChange={handlerSearch}
                itemsCountPerPage={10}
                activePage={currentParam as number}
            ></PageNavigate>
            {estMngInfoModal ? (
                <EstMngInfoModal estmNum={estmNum}></EstMngInfoModal>
            ) : null}
            {estMngInsertModal ? (
                <EstMngInsertModal
                // onPostSuccess={onPostSuccess}
                ></EstMngInsertModal>
            ) : null}
        </EstMngMainStyled>
    );
};
