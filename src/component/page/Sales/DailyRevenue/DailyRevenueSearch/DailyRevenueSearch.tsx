import { useContext, useState } from "react";
import { Button } from "../../../../common/Button/Button";
import { DailyRevenueSearchStyled } from "./styled";

import { getCurrentDate } from "../../../../../common/CurrentDate";
import { DailyRevenueChartContext } from "../../../../../api/provider/DailyRevenueChartProvider";


export interface IDailyRevenueSearchParam {
    date: string;
    account: string;
}

export const DailyRevenueSearch = () => {
    // 기본 날짜와 초기 상태 설정
    const defaultDate = getCurrentDate();
    const { setSearchKeyword } = useContext(DailyRevenueChartContext);
    const [input, setInput] = useState<IDailyRevenueSearchParam>({ date: defaultDate, account: "" });

    // 검색 버튼 클릭 시 호출되는 핸들러
    const handleSearch = () => {
        setSearchKeyword(input);
    };

    return (
        <DailyRevenueSearchStyled>
            <div className="content-title">
                <div className="container">
                    <div className="row">
                        <div className="input">
                            <label>거래처명</label>
                            <input
                                type="text"
                                value={input.account}
                                onChange={(e) => setInput({ ...input, account: e.target.value })}
                            />
                            <label>날짜</label>
                            <input
                                type="date"
                                value={input.date}
                                onChange={(e) => setInput({ ...input, date: e.target.value })}
                            />
                            <Button onClick={handleSearch}>검색</Button>
                        </div>
                    </div>
                </div>
            </div>
        </DailyRevenueSearchStyled>
    );
};
