import { useContext, useEffect, useRef, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../../common/Button/Button";
import { YearlyRevenueSearchStyled } from "./styled";
import { getCurrentDate } from "../../../../../common/CurrentDate";
import { DailyRevenueChartContext } from "../../../../../api/provider/DailyRevenueChartProvider";
import { IDailyRevenueSearchParam } from "../../../../../models/interface/Sales/DailyRevenueModel";


export interface IYearlyRevenueSearchParam {
    date: string;
    account: string;
}

export const getYear = () => {
    const date = new Date();
    const year = date.getFullYear();
    return `${year}`;
};


export const YearlyRevenueSearch = () => {
    const defaultDate = getYear();
    const { setSearchKeyword } = useContext(DailyRevenueChartContext);
    const [input, setInput] = useState<IDailyRevenueSearchParam>({ date: defaultDate, account: "" });

    const handleSearch = () => {
        setSearchKeyword(input);
    };

    return (
        <YearlyRevenueSearchStyled>
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
                            <label>년-월</label>
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
            
        </YearlyRevenueSearchStyled>

        
    );
};