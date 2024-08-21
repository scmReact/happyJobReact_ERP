import { useRecoilState } from "recoil";
import { modalEstMngInfoState } from "../../../../../stores/modalEstMngInfoState";
import { Button } from "../../../../common/Button/Button";
import {
    StyledTable,
    StyledTd,
    StyledTh,
} from "../../../../common/styled/StyledTable";
import { EstMngInfoModalStyled, EstMngInfoModalTableStyled } from "./styled";
import { FC, useEffect, useState } from "react";
import { postComnApi } from "../../../../../api/postComnApi";
import { BusinessApi } from "../../../../../api/api";
import { fomatDate } from "../../../../../common/fomatData";
import {
    ICompany,
    IEstMngApplyResponse,
    IEstMngInfoResponse,
    IEstpart,
} from "../../../../../models/interface/Business/EstMngModel";

/**
 * EstMngInfoModal
 * - 견적서관리-견적서상세조회 컴포넌트
 * - 견적서관리-견적서상세조회 컴포넌트 상세조회, 승인을 위한 컴포넌트
 * - 속성
 *   @number(estmNum): 견적서번호
 *
 * Example usage:
 * <EstMngInfoModal estmNum={estmNum}/>
 */

export interface IEstMngInfoProps {
    estmNum: number;
}
export const EstMngInfoModal: FC<IEstMngInfoProps> = ({ estmNum }) => {
    const [estMngInfoModal, setEstMngInfoModal] =
        useRecoilState(modalEstMngInfoState);
    const [estpartList, setEstpartList] = useState<IEstpart[]>([]);
    const [companyInfo, setCompanyInfo] = useState<ICompany>();

    useEffect(() => {
        handlerSearch();
    }, []);

    const handlerSearch = async () => {
        const postSearch = await postComnApi<IEstMngInfoResponse>(
            BusinessApi.estMngInfoSearchJson,
            { estm_num: estmNum }
        );

        if (postSearch) {
            if (postSearch.result === "Success") {
                setCompanyInfo(postSearch.companyInfo);
                setEstpartList(postSearch.estpart);
            }
        }
    };
    const handlerApply = async () => {
        const postApply = await postComnApi<IEstMngApplyResponse>(
            BusinessApi.estApplyJson,
            { estm_num: estmNum, apply_yn: "Y" }
        );

        if (postApply) {
            if (postApply.result === "SUCCESS") {
                alert("승인되었습니다");
                onModal();
            } else {
                alert("승인 실패했습니다.");
            }
        }
    };

    const onModal = () => {
        setEstMngInfoModal(!estMngInfoModal);
    };

    return (
        <EstMngInfoModalStyled isOpen={estMngInfoModal} ariaHideApp={false}>
            <div className="wrap">
                <div className="header">견적서 상세조회</div>
                <EstMngInfoModalTableStyled>
                    <div className="main">
                        <div className="title sizeL">
                            {estpartList[0]?.cust_name}
                        </div>
                        <div className="title sizeL">
                            {companyInfo?.erp_copnm}
                        </div>
                    </div>

                    <div className="main">
                        <div className="title">사업자등록번호</div>
                        <label className="sizeM2">
                            {estpartList[0]?.biz_num}
                        </label>
                        <div className="title">사업자등록번호</div>
                        <label className="sizeM2">
                            {companyInfo?.erp_copnum}
                        </label>
                    </div>

                    <div className="main">
                        <div className="title">담당자</div>
                        <label className="sizeM2">
                            {estpartList[0]?.cust_person}
                        </label>
                        <div className="title">담당자</div>
                        <label className="sizeM2">{companyInfo?.erp_emp}</label>
                    </div>

                    <div className="main">
                        <div className="title">주소</div>
                        <label className="sizeM2">
                            {estpartList[0]?.cust_addr}
                        </label>
                        <div className="title">주소</div>
                        <label className="sizeM2">
                            {companyInfo?.erp_addr}
                        </label>
                    </div>
                    <div className="main">
                        <div className="title">상세주소</div>
                        <label className="sizeM2">
                            {estpartList[0]?.cust_detail_addr}
                        </label>
                        <div className="title">상세주소</div>
                        <label className="sizeM2"></label>
                    </div>
                    <div className="main">
                        <div className="title">연락처</div>
                        <label className="sizeM2">
                            {estpartList[0]?.cust_person_ph}
                        </label>
                        <div className="title">연락처</div>
                        <label className="sizeM2">{companyInfo?.erp_tel}</label>
                    </div>
                    <div className="content">
                        <p> 1. 귀사의 일익 번창하심을 기원합니다.</p>
                        <p>2. 하기와 같이 견적드리오니 검토하기 바랍니다.</p>
                    </div>

                    <div className="main">
                        <div className="title">유효기한</div>
                        <label className="sizeM2">
                            {fomatDate(estpartList[0]?.book_date)}
                        </label>
                        <div className="title">견적작성일</div>
                        <label className="sizeM2">
                            {estpartList[0]?.estm_date}
                        </label>
                    </div>
                </EstMngInfoModalTableStyled>
                <div className="header">상세목록</div>
                <StyledTable>
                    <colgroup>
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                        <StyledTh>제품명</StyledTh>
                        <StyledTh>공급가액</StyledTh>
                        <StyledTh>부가세액</StyledTh>
                        <StyledTh>제품단가</StyledTh>
                        <StyledTh>수량</StyledTh>
                    </thead>
                    <tbody>
                        {estpartList && estpartList?.length > 0 ? (
                            estpartList.map((a) => {
                                return (
                                    <tr key={a.estm_num}>
                                        <StyledTd>{a.item_name}</StyledTd>
                                        <StyledTd>
                                            {a.item_price.toLocaleString(
                                                "kr-KR"
                                            )}
                                            원
                                        </StyledTd>
                                        <StyledTd>
                                            {a.item_surtax.toLocaleString(
                                                "kr-KR"
                                            )}
                                            원
                                        </StyledTd>
                                        <StyledTd>
                                            {a.provide_value.toLocaleString(
                                                "kr-KR"
                                            )}
                                            원
                                        </StyledTd>
                                        <StyledTd>{a.qut}</StyledTd>
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
                    {estpartList[0]?.apply_yn === "W" ? (
                        <Button width={90} onClick={handlerApply}>
                            승인대기
                        </Button>
                    ) : (
                        <></>
                    )}
                    <Button width={90} onClick={onModal}>
                        닫기
                    </Button>
                </div>
            </div>
        </EstMngInfoModalStyled>
    );
};
