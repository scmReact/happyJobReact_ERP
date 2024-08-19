import { useContext, useState } from "react";
import { UnpaidSearchStyled, UnpaidStyled } from "./styled";
import { UnpaidContext } from "../../../../../api/provider/UnpaidProvider";
import { Button } from "../../../../common/Button/Button";
import { IUnpaidSearch } from "../../../../../models/interface/Accounting/UnpaidModel";

/**
 * UnpaidSearch
 * - 미수금관리현황 조회 컴포넌트
 * - 미수금관리현황 조회 컴포넌트 정보를 기업명, 기간(시작일~종료일) 조회하기 위한 조회 정보 컴포넌트
 * - 속성
 *   @input(searchStDate): 수주시작일
 *   @input(searchEdDate): 수주종료일
 *   @input(searchExpire): 납품상태 (all:전체, N:납품미완료, Y:납품완료)
 *   @input(searchPaid): 수금상태 (all:전체, N:미수금, Y:수금완료)
 *   @input(searchProduct): 제품명
 *   @input(searchCust): 거래처명
 *   @input(searchProcessObject): 처리주체 (all:전체, estm:견적서, obtain:SCM 수주)
 *
 * Example usage:
 * <UnpaidSearch />
 */

export const UnpaidSearch = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("00" + (today.getMonth() + 1).toString()).slice(-2);
    const day = ("00" + today.getDate().toString()).slice(-2);

    const expireState = [
        { code: "all", name: "전체" },
        { code: "N", name: "납품미완료" },
        { code: "Y", name: "납품완료" },
    ];

    const paidState = [
        { code: "all", name: "전체" },
        { code: "N", name: "미수금" },
        { code: "Y", name: "수금완료" },
    ];

    const processObject = [
        { code: "all", name: "전체" },
        { code: "estm", name: "견적서" },
        { code: "obtain", name: "SCM 수주" },
    ];

    const defaultSearch = {
        searchStDate: `${year}-${month}-01`,
        searchEdDate: `${year}-${month}-${day}`,
        searchExpire: "%",
        searchPaid: "%",
        searchProduct: "",
        searchCust: "",
        searchProcessObject: "%",
    };
    const [input, setInput] = useState<IUnpaidSearch>(defaultSearch);
    const { setSearchKeyword } = useContext(UnpaidContext);

    const handlerSearch = () => {
        setSearchKeyword(input);
    };

    return (
        <UnpaidStyled>
            <span className="title">미수금 관리 </span>
            <UnpaidSearchStyled>
                <div className="searchWrapper">
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
                    <label>납품상태</label>
                    <select
                        defaultValue={input.searchExpire}
                        onChange={(e) =>
                            setInput({
                                ...input,
                                searchExpire: e.currentTarget.value,
                            })
                        }
                    >
                        {expireState?.map((a) => {
                            return (
                                <option key={a.code} value={a.code}>
                                    {a.name}
                                </option>
                            );
                        })}
                    </select>
                    <label>수금상태</label>
                    <select
                        defaultValue={input.searchPaid}
                        onChange={(e) =>
                            setInput({
                                ...input,
                                searchPaid: e.currentTarget.value,
                            })
                        }
                    >
                        {paidState?.map((a) => {
                            return (
                                <option key={a.code} value={a.code}>
                                    {a.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="searchWrapper2">
                    <label>제품명</label>
                    <input
                        onChange={(e) =>
                            setInput({
                                ...input,
                                searchProduct: e.currentTarget.value,
                            })
                        }
                    ></input>
                    <label>거래처명</label>
                    <input
                        onChange={(e) =>
                            setInput({
                                ...input,
                                searchCust: e.currentTarget.value,
                            })
                        }
                    ></input>
                    <label>처리주체</label>
                    <select
                        defaultValue={input.searchProcessObject}
                        onChange={(e) =>
                            setInput({
                                ...input,
                                searchProcessObject: e.currentTarget.value,
                            })
                        }
                    >
                        {processObject?.map((a) => {
                            return (
                                <option key={a.code} value={a.code}>
                                    {a.name}
                                </option>
                            );
                        })}
                    </select>
                    <Button
                        paddingtop={5}
                        paddingbottom={5}
                        onClick={handlerSearch}
                    >
                        검색
                    </Button>
                </div>
            </UnpaidSearchStyled>
        </UnpaidStyled>
    );
};
