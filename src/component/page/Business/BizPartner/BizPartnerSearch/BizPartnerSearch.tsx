import { useRef, useState } from "react";
import { Button } from "../../../../common/Button/Button";
import { BizPartnerSearchStyled } from "./styled";
import { useNavigate } from "react-router-dom";

export const BizPartnerSearch = () => {
    const custName = useRef<HTMLInputElement>(null);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const navigate = useNavigate();

    const bizPartnerSearch = () => {
        const query: string[] = [];
        !custName.current?.value ||
            query.push(`searchPartnerName=${custName.current?.value}`);
        !startDate || query.push(`searchStDate=${startDate}`);
        !endDate || query.push(`searchEdDate=${endDate}`);

        const queryString = query.length > 0 ? `?${query.join("&")}` : "";
        navigate(`/react/business/bizPartner.do${queryString}`);
    };

    return(
        <>
            <BizPartnerSearchStyled>
                <label>업체명</label>
                <input type="text" ref={custName}></input>
                <label>기간</label>
                <input
                    type="date"
                    onChange={(e) => {setStartDate(e.target.value)}}>
                </input>
                <label>~</label>
                <input
                    type="date"
                    onChange={(e) => {setEndDate(e.target.value)}}>
                </input>
                <Button onClick={bizPartnerSearch}>검색</Button>
            </BizPartnerSearchStyled>
        </>
    )
};