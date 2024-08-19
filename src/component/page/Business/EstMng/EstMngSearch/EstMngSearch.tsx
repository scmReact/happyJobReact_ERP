import { useContext, useEffect, useState } from "react";
import { EstMngSearchStyled, EstMngStyled } from "./styled";
import { EstMngContext } from "../../../../../api/provider/EstMngProvider";
import { Button } from "../../../../common/Button/Button";
import { postComnApi } from "../../../../../api/postComnApi";
import { CommonApi } from "../../../../../api/api";
import { useRecoilState } from "recoil";
import { modalEstMngInsertModalState } from "../../../../../stores/modalEstMngInsertModalState";
import { EstMngInsertModal } from "../EstMngInsertModal/EstMngInsertModal";
import {
    ICommon,
    ICommonJsonResponse,
    IEstMngSearch,
} from "../../../../../models/interface/Business/EstMngModel";

/**
 * EstMngSearch
 * - 견적서관리 조회 컴포넌트
 * - 견적서관리 조회 컴포넌트 정보를 거래처, 기간(시작일~종료일) 조회하기 위한 조회 정보 컴포넌트
 * - 속성
 *   @input(searchStDate): 시작일
 *   @input(searchEdDate): 종료일
 *   @input(searchCust): 거래처
 *
 * Example usage:
 * <UnpaidSearch />
 */

export const EstMngSearch = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("00" + (today.getMonth() + 1).toString()).slice(-2);
    const day = ("00" + today.getDate().toString()).slice(-2);
    const defaultSearch = {
        searchStDate: `${year}-${month}-01`,
        searchEdDate: `${year}-${month}-${day}`,
        searchCust: "%",
    };
    const [input, setInput] = useState<IEstMngSearch>(defaultSearch);
    const [comboList, setComboList] = useState<ICommon[]>([]);
    const { setSearchKeyword } = useContext(EstMngContext);
    const [estMngInsertModal, setEstMngInsertModal] = useRecoilState(
        modalEstMngInsertModalState
    );

    useEffect(() => {
        getComcombo("cust_name", "all");
    }, []);

    const getComcombo = async (grp_cod: string, type: string) => {
        const addList: ICommon[] = [];
        const getComcomboList = await postComnApi<ICommonJsonResponse>(
            CommonApi.comcombo,
            { group_code: grp_cod }
        );

        if (getComcomboList) {
            if (type === "all") {
                addList.push({
                    grp_cod: "",
                    dtl_cod: "",
                    dtl_cod_nm: "전체",
                });
            }

            if (type === "sel") {
                addList.push({
                    grp_cod: "",
                    dtl_cod: "",
                    dtl_cod_nm: "선택",
                });
            }

            for (const com of getComcomboList.list) {
                addList.push({
                    grp_cod: com.grp_cod,
                    dtl_cod: com.dtl_cod,
                    dtl_cod_nm: com.dtl_cod_nm,
                });
            }

            setComboList(addList);
        }
    };

    const handlerSearch = () => {
        setSearchKeyword(input);
    };

    return (
        <EstMngStyled>
            <span className="title">견적서 관리 </span>
            <EstMngSearchStyled>
                <div className="searchWrapper">
                    <label>거래처</label>
                    <select
                        defaultValue={input.searchCust}
                        onChange={(e) =>
                            setInput({
                                ...input,
                                searchCust: e.currentTarget.value,
                            })
                        }
                    >
                        {comboList?.map((a) => {
                            return (
                                <option key={a.dtl_cod} value={a.dtl_cod}>
                                    {a.dtl_cod_nm}
                                </option>
                            );
                        })}
                    </select>
                    <label>수주일자</label>
                    <input
                        type="date"
                        defaultValue={input.searchStDate}
                        onChange={(e) =>
                            setInput({ ...input, searchStDate: e.target.value })
                        }
                    ></input>
                    <input
                        type="date"
                        defaultValue={input.searchEdDate}
                        onChange={(e) =>
                            setInput({ ...input, searchEdDate: e.target.value })
                        }
                    ></input>

                    <Button
                        paddingtop={5}
                        paddingbottom={5}
                        onClick={handlerSearch}
                    >
                        검색
                    </Button>
                </div>
                <div className="searchWrapper2">
                    <Button
                        paddingtop={5}
                        paddingbottom={5}
                        onClick={() => setEstMngInsertModal(!estMngInsertModal)}
                    >
                        견적서 등록
                    </Button>
                </div>
            </EstMngSearchStyled>
        </EstMngStyled>
    );
};
