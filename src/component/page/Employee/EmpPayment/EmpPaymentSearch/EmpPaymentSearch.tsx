import { useContext, useState } from "react";
import { EmpPaymentContext } from "../../../../../api/provider/EmpPaymentProvider";
import { EmpPaymentSearchStyled } from "./styled";
import { Button } from "../../../../common/Button/Button";

export const EmpPaymentSearch = () => {
  const { setSearchKeyword } = useContext(EmpPaymentContext);
  const [input, setInput] = useState<{
    searchUser: string;
    searchDate: string;
    searchDept: string;
    searchPos: string;
    searchPayStatus: string;

}>({
    searchUser: '',
    searchDate: '',
    searchDept: '',
    searchPos: '',
    searchPayStatus: '',
});
   

    const handleSearch = () => {
      setSearchKeyword(input);
      };
    return (
        <EmpPaymentSearchStyled>
        <table>
          <tbody>
            <tr>
              <td>사원명</td>
              <td colSpan={2}>
                <input type="text"  onChange={(e) => setInput({...input, searchUser: e.target.value})} />
              </td>
              <td>급여연월</td>
              <td>
                <input type="month" onChange={(e) => setInput({...input, searchDate: e.target.value})} />
              </td>
              <td>
                <Button onClick={handleSearch}>검색</Button>
              </td>
            </tr>
            <tr>
              <td>부서</td>
              <td colSpan={2}>
                <select  onChange={(e) => setInput({...input, searchDept: e.target.value})}>
                <option value="">전체</option>
                </select>
              </td>
              <td>직급</td>
              <td>
                <select  onChange={(e) => setInput({...input, searchPos: e.target.value})}>
                <option value="">전체</option>
                </select>
              </td>
              <td>지급여부</td>
              <td>
                <select onChange={(e) => setInput({...input, searchPayStatus: e.target.value})}>
                  <option value="">전체</option>
                  <option value="N">미지급</option>
                  <option value="Y">지급</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </EmpPaymentSearchStyled>
    );
};