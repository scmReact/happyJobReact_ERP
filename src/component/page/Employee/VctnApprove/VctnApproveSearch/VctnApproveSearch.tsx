import { useContext, useState } from "react";
import { VctnApproveSearchStyled } from "./styled";
import { Button } from "../../../../common/Button/Button";
import { IVctnSearch } from "../../../../../models/interface/Employee/VctnApproveModel";
import { VctnApproveContext } from "../../../../../api/provider/VctnApproveProvider";

export const VctnApproveSearch = () => {
    const { setSearchKeyword } = useContext(VctnApproveContext);

    // 오늘 날짜
    const dateNow = new Date();
    const today = dateNow.toISOString().slice(0, 10);

    const defaultSearch = {
        searchStDate: "",
        searchEdDate: "",
        searchLoginId: "",
        searchName: "",
        searchApprove: "",
    };
    const [input, setInput] = useState<IVctnSearch>(defaultSearch);
    const handlerSearch = () => {
        setSearchKeyword(input);
    };

    return (
        <div>
            <VctnApproveSearchStyled>
                <label>
                    기간 <input type="date" max={today} onChange={(e) => setInput({ ...input, searchStDate: e.currentTarget.value })}></input>~{" "}
                    <input type="date" max={today} onChange={(e) => setInput({ ...input, searchEdDate: e.currentTarget.value })}></input>
                </label>
                <label>
                    사번 <input type="text" onChange={(e) => setInput({ ...input, searchLoginId: e.target.value })}></input>
                </label>
                <label>
                    사원명 <input type="text" onChange={(e) => setInput({ ...input, searchName: e.target.value })}></input>
                </label>
                <label>
                    결재상태{" "}
                    <select onChange={(e) => setInput({ ...input, searchApprove: e.currentTarget.value })}>
                        <option value={""}>전체</option>
                        <option value={"Y"}>승인</option>
                        <option value={"WAIT"}>미승인</option>
                        <option value={"N"}>반려</option>
                    </select>
                </label>
                <Button onClick={handlerSearch}>조회</Button>
            </VctnApproveSearchStyled>
        </div>
    );
};
