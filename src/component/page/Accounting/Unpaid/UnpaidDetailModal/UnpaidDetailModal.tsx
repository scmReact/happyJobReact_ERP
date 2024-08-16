import { useRecoilState } from "recoil";
import { UnpaidDetailModalStyled } from "./styled";
import { modalUnpaidDetailState } from "../../../../../stores/modalUnpaidDetail";
import { Button } from "../../../../common/Button/Button";
import { FC, useEffect, useState } from "react";
import { postComnApi } from "../../../../../api/postComnApi";
import { AccountingApi } from "../../../../../api/api";
import {
    StyledTable,
    StyledTd,
    StyledTh,
} from "../../../../common/styled/StyledTable";
import { ILoginInfo } from "../../../../../models/interface/store/userInfo";
import { loginInfoState } from "../../../../../stores/userInfo";
import {
    IUnpaidDepositResponse,
    IUnpaidDetail,
    IUnpaidDetailItems,
    IUnpaidDetailResponse,
} from "../../../../../models/interface/Accounting/UnpaidModel";

/**
 * UnpaidDetailModal
 * - 미수금관리현황 상세 조회 컴포넌트
 * - 미수금관리현황 상세 조회 컴포넌트 정보를 상세조회 정보 컴포넌트
 * - 속성
 *   @string(type): 처리주체
 *   @number(num): 미수금번호
 *   @void(onPostSuccess): 모달 활성
 *
 *   @StyledTable: 조회된 Detail 정보를 보여주는 곳
 *   @StyledTable: 조회된 Items 정보를 보여주는 곳
 *
 * Example usage:
 * <UnpaidDetailModal type={type}  num={num} onPostSuccess={onPostSuccess}/>
 */

export interface IUnpaidDetailProps {
    type: string;
    num: number;
    onPostSuccess: () => void;
}

export const UnpaidDetailModal: FC<IUnpaidDetailProps> = ({
    type,
    num,
    onPostSuccess,
}) => {
    const [modal] = useRecoilState(modalUnpaidDetailState);
    const [unpaidDetatil, setUnpaidDetatil] = useState<IUnpaidDetail>();
    const [unpaidDetatilItems, setUnpaidDetatilItems] =
        useState<IUnpaidDetailItems[]>();
    const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);

    useEffect(() => {
        handlerSearch();
    }, []);

    const handlerSearch = async () => {
        const postSearch = await postComnApi<IUnpaidDetailResponse>(
            AccountingApi.unpaidDetailJson,
            { type: type, num: num }
        );
        if (postSearch) {
            setUnpaidDetatil(postSearch.detail);
            setUnpaidDetatilItems(postSearch.items);
        }
    };

    const handlerDeposit = async (num: number) => {
        if (window.confirm("입금 처리하시겠습니까?")) {
            const postDeposit = await postComnApi<IUnpaidDepositResponse>(
                AccountingApi.unpaidDepositJson,
                { num: num }
            );
            if (postDeposit) {
                if (postDeposit.result === "success") {
                    alert("입금 처리가 완료되었습니다.");
                    onPostSuccess();
                } else {
                    alert("입금 처리를 실패했습니다.");
                }
            }
        }
    };

    return (
        <UnpaidDetailModalStyled isOpen={modal} ariaHideApp={false}>
            <div className="wrap">
                <div className="header">미수금 관리 상세</div>
                <StyledTable>
                    <colgroup>
                        <col width="13%" />
                        <col width="37%" />
                        <col width="13%" />
                        <col width="12%" />
                        <col width="13%" />
                        <col width="12%" />
                    </colgroup>

                    <tbody>
                        <tr>
                            <StyledTh scope="row">수주일자</StyledTh>
                            <StyledTd>{unpaidDetatil?.bookDate}</StyledTd>
                            <StyledTh scope="row">납품일자</StyledTh>
                            <StyledTd colSpan={3}>
                                {unpaidDetatil?.expireDate}
                            </StyledTd>
                        </tr>
                        <tr>
                            <StyledTh scope="row">번호</StyledTh>
                            <StyledTd>{unpaidDetatil?.num}</StyledTd>
                            <StyledTh>처리주체</StyledTh>
                            <StyledTd colSpan={3}>
                                {type === "obtain" ? "SCM 수주" : "견적서"}
                            </StyledTd>
                        </tr>
                        <tr>
                            <StyledTh scope="row">납품상태</StyledTh>
                            <StyledTd>
                                {unpaidDetatil?.expireState === "Y"
                                    ? "납품완료"
                                    : "납품미완료"}
                            </StyledTd>
                            <StyledTh scope="row">수금상태</StyledTh>
                            <StyledTd>
                                {unpaidDetatil?.unpaidState === "Y"
                                    ? "수금완료"
                                    : "미수금"}
                            </StyledTd>
                            <StyledTh scope="row">미납액</StyledTh>
                            <StyledTd>
                                {unpaidDetatil?.unpaidState === "Y"
                                    ? 0
                                    : unpaidDetatil?.amount.toLocaleString(
                                          "kr-KR"
                                      )}
                            </StyledTd>
                        </tr>
                        <tr>
                            <StyledTh scope="row" colSpan={2}>
                                입금정보
                            </StyledTh>
                            <StyledTh scope="row" colSpan={4}>
                                거래처정보
                            </StyledTh>
                        </tr>
                        <tr>
                            <StyledTh scope="row">입금은행</StyledTh>
                            <StyledTd>{unpaidDetatil?.bankName}</StyledTd>
                            <StyledTh scope="row">거래처</StyledTh>
                            <StyledTd colSpan={3}>
                                {unpaidDetatil?.custName}
                            </StyledTd>
                        </tr>

                        <tr>
                            <StyledTh scope="row">계좌번호</StyledTh>
                            <StyledTd>{unpaidDetatil?.custAccount}</StyledTd>
                            <StyledTh scope="row">담당자</StyledTh>
                            <StyledTd colSpan={3}>
                                {unpaidDetatil?.custPerson}
                            </StyledTd>
                        </tr>

                        <tr>
                            <StyledTh scope="row" colSpan={2}>
                                담당자
                            </StyledTh>
                            <StyledTh scope="row">담당자번호</StyledTh>
                            <StyledTd colSpan={3}>
                                {unpaidDetatil?.custPersonPh}
                            </StyledTd>
                        </tr>

                        <tr>
                            <StyledTh scope="row">담당자</StyledTh>
                            <StyledTd>{unpaidDetatil?.userName}</StyledTd>
                            <StyledTh scope="row">비고</StyledTh>
                            <StyledTd colSpan={3}>
                                {type === "estm" &&
                                userInfo.userType === "C" &&
                                unpaidDetatil?.unpaidState === "N" ? (
                                    <Button
                                        onClick={() =>
                                            handlerDeposit(unpaidDetatil.num)
                                        }
                                    >
                                        입금
                                    </Button>
                                ) : null}
                            </StyledTd>
                        </tr>
                    </tbody>
                </StyledTable>

                <div className="header">제품 목록</div>
                <StyledTable>
                    <colgroup>
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                        <StyledTh>이름</StyledTh>
                        <StyledTh>단가</StyledTh>
                        <StyledTh>부가세액</StyledTh>
                        <StyledTh>공급가액</StyledTh>
                        <StyledTh>수량</StyledTh>
                    </thead>
                    <tbody>
                        {unpaidDetatilItems &&
                        unpaidDetatilItems?.length > 0 ? (
                            unpaidDetatilItems.map((a) => {
                                return (
                                    <tr key={a.itemName}>
                                        <StyledTd>{a.itemName}</StyledTd>
                                        <StyledTd>
                                            {a.itemPrice.toLocaleString(
                                                "kr-KR"
                                            )}
                                        </StyledTd>
                                        <StyledTd>
                                            {a.itemSurtax.toLocaleString(
                                                "kr-KR"
                                            )}
                                        </StyledTd>
                                        <StyledTd>
                                            {a.provideValue.toLocaleString(
                                                "kr-KR"
                                            )}
                                        </StyledTd>
                                        <StyledTd>
                                            {a.qut.toLocaleString("kr-KR")}
                                        </StyledTd>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <StyledTd colSpan={5}>
                                    데이터가 없습니다.
                                </StyledTd>
                            </tr>
                        )}
                    </tbody>
                </StyledTable>

                <div className="btn-group">
                    <Button onClick={onPostSuccess}>닫기</Button>
                </div>
            </div>
        </UnpaidDetailModalStyled>
    );
};
