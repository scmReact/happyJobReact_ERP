import { FC, useContext, useEffect, useState } from "react";
import { BusinessApi } from "../../../../../api/api";
import { postComnApi } from "../../../../../api/postComnApi";
import { ItemInfoModalStyled } from "./styled";
import {
    StyledTable,
    StyledTd,
    StyledTh,
} from "../../../../common/styled/StyledTable";
import { useRecoilState } from "recoil";
import { modalItemInfoState } from "../../../../../stores/modalItemInfoState";
import { Button } from "../../../../common/Button/Button";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { EstMngInsertContext } from "../../../../../api/provider/EstMngProvider";
import { EstMngInsertModal } from "../EstMngInsertModal/EstMngInsertModal";
import {
    IItemInfo,
    IItemInfoResponse,
} from "../../../../../models/interface/Business/EstMngModel";

/**
 * ItemInfoModal
 * - 견적서관리-견적서등록-제품선택 컴포넌트
 * - 견적서관리-견적서등록-제품선택 컴포넌트 정보를 선택하기 위한 컴포넌트
 * - 선택할 제품을 더블클릭하여 선택 가능
 * - 속성
 *   @void(onItemInfoModal): 모달 활성
 *   @Context(setEstMngInsert): 견적서 정보 저장
 *
 * Example usage:
 * <ItemInfoModal onItemInfoModal={onItemInfoModal}/>
 */

export interface IItemInfoProps {
    onItemInfoModal: () => void;
}

export const ItemInfoModal: FC<IItemInfoProps> = ({ onItemInfoModal }) => {
    const [itemInfo, setItemInfo] = useState<IItemInfo[]>();
    const [modalItemInfo] = useRecoilState(modalItemInfoState);
    const { estMngInsert, setEstMngInsert } = useContext(EstMngInsertContext);
    const [totalCnt, setTotalCnt] = useState<number>(0);
    const [currentParam, setCurrentParam] = useState<number | undefined>();

    useEffect(() => {
        handlerSearch();
    }, []);

    const handlerSearch = async (cpage?: number) => {
        setItemInfo([]);
        cpage = cpage || 1;
        const postSearch = await postComnApi<IItemInfoResponse>(
            BusinessApi.itemInfoSearchJson,
            { currentPage: cpage, pageSize: 10 }
        );

        if (postSearch) {
            setItemInfo(postSearch.list);
            setTotalCnt(postSearch.listCount);
            setCurrentParam(cpage);
        }
    };

    const handlerSelect = (
        manufac: String,
        majorClass: String,
        subClass: String,
        item_code: string,
        item_name: string
    ) => {
        setEstMngInsert({
            ...estMngInsert,
            manufac: manufac,
            major_class: majorClass,
            sub_class: subClass,
            item_code: item_code,
            item_name: item_name,
        });
        onItemInfoModal();
    };

    return (
        <ItemInfoModalStyled isOpen={modalItemInfo} ariaHideApp={false}>
            <div className="wrap">
                <div className="header">제품선택</div>
                <StyledTable>
                    <colgroup>
                        <col width="10%" />
                        <col width="15%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <StyledTh size={5}>제조업체</StyledTh>
                            <StyledTh size={5}>대분류</StyledTh>
                            <StyledTh size={5}>소분류</StyledTh>
                            <StyledTh size={5}>제품코드</StyledTh>
                            <StyledTh size={5}>제품명</StyledTh>
                        </tr>
                    </thead>
                    <tbody>
                        {itemInfo && itemInfo?.length > 0 ? (
                            itemInfo.map((a) => {
                                return (
                                    <tr
                                        key={a.item_code}
                                        onDoubleClick={() =>
                                            handlerSelect(
                                                a.manufac,
                                                a.major_class,
                                                a.sub_class,
                                                a.item_code,
                                                a.item_name
                                            )
                                        }
                                    >
                                        <StyledTd>{a.manufac}</StyledTd>
                                        <StyledTd>{a.major_class}</StyledTd>
                                        <StyledTd>{a.sub_class}</StyledTd>
                                        <StyledTd>{a.item_code}</StyledTd>
                                        <StyledTd>{a.item_name}</StyledTd>
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
                <PageNavigate
                    totalItemsCount={totalCnt}
                    onChange={handlerSearch}
                    itemsCountPerPage={10}
                    activePage={currentParam as number}
                ></PageNavigate>
                <div className="btn-group">
                    <Button width={90} onClick={onItemInfoModal}>
                        닫기
                    </Button>
                </div>
            </div>
        </ItemInfoModalStyled>
    );
};
