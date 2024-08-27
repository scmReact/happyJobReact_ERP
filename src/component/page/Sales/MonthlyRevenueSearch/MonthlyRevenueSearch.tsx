import { useEffect, useRef, useState } from "react";
import { Button } from "../../../common/Button/Button";
import { MonthlyRevenueSearchStyled } from "./styled";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import { Protal } from "../../../common/potal/Portal";
import { MonthlyModalMain } from "../MonthlyModal/MonthlyModalMain";

export const MonthlyRevenueSearch = () => {
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const title = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    

    useEffect(() => {        
            navigate(`/react/sales/monthlyRevenue.do`);        
    },[]);

    const handlerSearch = () => {
        // 검색 버튼을 누르면, 조회가 된다.
        const query: string[] = [];
        !title.current?.value || query.push(`searchTitle=${title.current?.value}`);
        !startDate || query.push(`startDate=${startDate}`);

        const queryString = query.length > 0 ? `?${query.join('&')}` : '';
        navigate(`/react/sales/searchRevenue.do${queryString}`);
    };

    return (
        <MonthlyRevenueSearchStyled>
            거래처 명:
            <input ref={title}></input>
            년 월:
            <input type="date" onChange={(e) => setStartDate(e.target.value)}></input>
            <Button onClick={handlerSearch}>검색</Button>
            <br>
            </br>
            
        </MonthlyRevenueSearchStyled>

        
    );
};