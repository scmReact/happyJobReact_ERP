import { ChangeEvent, useRef, useState } from "react";
import { Button } from "../../../../common/Button/Button";
import { DisbursementSearchStyled } from "../styled";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

export interface ICommonList {
    dtl_cod: string;
    dtl_cod_nm: string;
}

export interface ICommonListResponse {
    commonList: ICommonList[];
}

export const DisbursementSearch = () => {
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const accGroupCode = useRef<HTMLSelectElement>(null);
    const accDetailCode = useRef<HTMLSelectElement>(null);
    const apprYn = useRef<HTMLSelectElement>(null);
    const [commonList, setCommonList] = useState<ICommonList[]>([]);
    const [selected, setSelected] = useState<string>("");
    const navigate = useNavigate();

    const handlerSearch = () => {
        const query: string[] = [];
        !startDate || query.push(`searchStDate=${startDate}`);
        !endDate || query.push(`searchEdDate=${endDate}`);
        !accGroupCode.current?.value || query.push(`searchAccGroupCode=${accGroupCode.current?.value}`);
        !accDetailCode.current?.value || query.push(`searchAcctCode=${accDetailCode.current?.value}`);
        !apprYn.current?.value || query.push(`searchApprYn=${apprYn.current?.value}`);

        const queryString = query.length > 0 ? `?${query.join("&")}` : "";
        navigate(`/react/accounting/disbursement.do${queryString}`);
    };

    const searchCommonList = (selected?: string) => {
        const param = new URLSearchParams();
        param.append("selectAccGrpCod", selected?.toString() as string);

        axios.post("/accounting/commonListJson", param).then((res: AxiosResponse<ICommonListResponse>) => {
            setCommonList(res.data.commonList);
        });
    };

    const handlerSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value);
        searchCommonList(e.target.value);
    };

    return (
        <div className={"searchArea"}>
            <DisbursementSearchStyled>
                <label>
                    신청일자
                    <input type="date" onChange={(e) => setStartDate(e.target.value)}></input> ~ {""}
                    <input type="date" onChange={(e) => setEndDate(e.target.value)}></input>
                </label>
                <label>
                    계정대분류명
                    <select className={"selectbox"} value={selected} onChange={handlerSelect} ref={accGroupCode}>
                        <option value={""}>전체</option>
                        <option value={"acc_sales_code"}>매출</option>
                        <option value={"acc_sell_admin_code"}>판매관리비</option>
                    </select>
                </label>
                <label>
                    계정과목
                    <select className={"selectbox"} ref={accDetailCode}>
                        <option value={""}>전체</option>
                        {commonList.map((a) => {
                            return <option value={a.dtl_cod}>{a.dtl_cod_nm}</option>;
                        })}
                    </select>
                </label>
                <label>
                    승인여부
                    <select className={"selectbox"} ref={apprYn}>
                        <option value={"ALL"}>전체</option>
                        <option value={"W"}>승인대기</option>
                        <option value={"Y"}>승인</option>
                        <option value={"N"}>반려</option>
                    </select>
                </label>
                <Button onClick={handlerSearch}>검색</Button>
            </DisbursementSearchStyled>
        </div>
    );
};
