import { useContext, useEffect, useState } from "react";
import { AccSlipSearchStyled } from "./styled";
import { AccSlipContext } from "../../../../../api/provider/AccSlipProvider";
import { Button } from "../../../../common/Button/Button";
import { IAccSlipSearch } from "../../../../../models/interface/Accounting/AccSlipModel";
import { postComnApi } from "../../../../../api/postComnApi";
import { BusinessApi } from "../../../../../api/api";
import { ICust, ICustJsonResponse } from "../../../../../models/interface/Business/EstMngModel";

export const AccSlipSearch = () => {
    const { setSearchKeyword, setSearchCust } = useContext(AccSlipContext);
    const defaultSearch = {
        searchStDate: "",
        searchEdDate: "",
        searchCustId: "",
        searchAccDetailCode: "",
        searchAccDetailName: "",
    };
    const [bizPartnerList, setBizPartnerList] = useState<ICust[]>([]);
    const [input, setInput] = useState<IAccSlipSearch>(defaultSearch);
    const [inputSearchCust, setInputSearchCust] = useState<ICust>({
        cust_id: "",
        cust_name: "",
    });

    useEffect(() => {
        searchCust();
    }, []);

    const searchCust = async () => {
        const postSearchCust = await postComnApi<ICustJsonResponse>(BusinessApi.getCustListJson, {});
        if (postSearchCust && postSearchCust.custNameList) {
            setBizPartnerList(postSearchCust.custNameList);
        }
    };

    const handlerSearch = () => {
        setSearchKeyword(input);
        if (input.searchCustId) setSearchCust(inputSearchCust);
    };

    return (
        <div>
            <AccSlipSearchStyled>
                <label>
                    기간 <input type="date" onChange={(e) => setInput({ ...input, searchStDate: e.currentTarget.value })}></input>~{" "}
                    <input type="date" onChange={(e) => setInput({ ...input, searchEdDate: e.currentTarget.value })}></input>
                </label>

                <label>
                    거래처명{" "}
                    <select
                        onChange={(e) => {
                            setInput({ ...input, searchCustId: e.currentTarget.value });
                            setInputSearchCust({ cust_id: e.currentTarget.value, cust_name: bizPartnerList.find((bizpartner) => bizpartner.cust_id === e.currentTarget.value)?.cust_name || "" });
                        }}
                    >
                        <option value={"all"}>전체</option>
                        {bizPartnerList && bizPartnerList.length > 0
                            ? bizPartnerList.map((bizpartner) => {
                                  return (
                                      <option key={bizpartner.cust_id} value={bizpartner.cust_id}>
                                          {bizpartner.cust_name}
                                      </option>
                                  );
                              })
                            : null}
                    </select>
                </label>
                <label>
                    계정코드 <input type="text" onChange={(e) => setInput({ ...input, searchAccDetailCode: e.target.value })}></input>
                </label>
                <label>
                    계정과목 <input type="text" onChange={(e) => setInput({ ...input, searchAccDetailName: e.target.value })}></input>
                </label>
                <Button onClick={handlerSearch}>조회</Button>
            </AccSlipSearchStyled>
        </div>
    );
};
