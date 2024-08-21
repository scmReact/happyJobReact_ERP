import { useEffect, useRef, useState } from "react";
import { EmpSalePlanSearchStyled } from "./styled";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../../../../common/Button/Button";

export interface IEmpSalePlaneListJsonResponse {
  searchManuflist: IEmpSaleCustList[];
}

export interface IEmpSaleCustList {
  cust_id: string;
  cust_name: string;
  goal_qut: number;
  item_code: string;
  item_name: string;
  loginID: string;
  major_class: string;
  manufac: string;
  name: string;
  perform_qut: number;
  plan_note: string;
  plan_num: number;
  sub_class: string;
  target_date: string;
}

export const EmpSalePlanSearch = () => {
  const [searchDate, setSearchDate] = useState<string>("");
  const searchItemName = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  //

  const handlerSearch = () => {
    const query: string[] = [];

    /*
    if (searchItemName.current?.value)
      query.push(`searchItemName=${searchItemName.current.value}`);
    if (searchDate) query.push(`searchDate=${searchDate}`);
    if (selectedManufacturer)
      query.push(`searchManufac=${selectedManufacturer}`);
    if (selectedMajor) query.push(`searchMajor=${selectedMajor}`);
    if (selectedSub) query.push(`searchSub=${selectedSub}`);
    */

    // 밑에는 왜 안되는거야?
    //||논리합 연산자 true || anything → 결과는 true,  false || "value" → 결과는 "value"

    !searchItemName.current?.value ||
      query.push(`searchItemName=${searchItemName.current?.value}`);

    searchItemName.current?.value &&
      query.push(`searchItemName=${searchItemName.current?.value}`);
    !searchDate || query.push(`searchDate=${searchDate}`);
    !selectedManufacturer ||
      query.push(`searchManufac=${selectedManufacturer}`);
    !selectedMajor || query.push(`selectedMajor=${selectedMajor}`);
    !selectedSub || query.push(`selectedSub=${selectedSub}`);

    const queryString = query.length > 0 ? `?${query.join("&")}` : "";
    //queryString ?searchManufac=애들랜드&searchMajor=인형&searchSub=알쏭달쏭 티니핑

    navigate(`/react/business/empSalePlan.do${queryString}`);
    //navigate : url경로
  };

  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [majors, setMajors] = useState<string[]>([]);
  const [subs, setSubs] = useState<string[]>([]);

  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("");
  const [selectedMajor, setSelectedMajor] = useState<string>("");
  const [selectedSub, setSelectedSub] = useState<string>("");

  //제조사 가져오기
  useEffect(() => {
    axios
      .get<{ searchList: IEmpSaleCustList[] }>(
        "/business/manufacturersListJson.do"
      )
      .then((res) => {
        const searchList = res.data.searchList;
        if (Array.isArray(searchList)) {
          const manufacturerNames = searchList.map((item) => item.manufac);
          setManufacturers(manufacturerNames);
        } else {
          console.error("searchList 데이터가 배열이 아님:", searchList);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  //제조사 선택 후 대분류 가져오기
  useEffect(() => {
    if (selectedManufacturer) {
      axios
        .get(`/business/getMajorClassesJson.do?manufac=${selectedManufacturer}`)
        .then((response) => {
          if (Array.isArray(response.data)) {
            const majorClasses = response.data.map((item) => item.major_class);
            setSelectedMajor("");
            setSelectedSub("");

            setMajors(majorClasses);
          } else {
            console.error("API 응답 데이터가 배열이 아님:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [selectedManufacturer]);

  //대분류 가져오고 소분류 가져오기
  useEffect(() => {
    if (selectedMajor) {
      axios
        .get(
          `/business/getSubClassesJson.do?manufac=${selectedManufacturer}&major_class=${selectedMajor}`
        )
        .then((response) => {
          if (Array.isArray(response.data)) {
            const subClasses = response.data.map((item) => item.sub_class);
            setSubs(subClasses);
            setSelectedSub("");
          } else {
            console.error("API안타짐?", response.data);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [selectedMajor]);

  return (
    <EmpSalePlanSearchStyled>
      <label>
        제조사:
        <select
          value={selectedManufacturer}
          onChange={(e) => setSelectedManufacturer(e.target.value)}
        >
          <option value="">제조사를 선택하세요</option>
          {manufacturers.length > 0 ? (
            manufacturers.map((manufac, index) => (
              <option key={index} value={manufac}>
                {manufac}
              </option>
            ))
          ) : (
            <option disabled>제조사를 불러올 수 없습니다</option>
          )}
        </select>
      </label>
      <label>
        대분류:
        <select
          value={selectedMajor}
          onChange={(e) => setSelectedMajor(e.target.value)}
          disabled={!selectedManufacturer}
        >
          <option value="">대분류를 선택하세요</option>
          {majors.length > 0 ? (
            majors.map((major, index) => (
              <option key={index} value={major}>
                {major}
              </option>
            ))
          ) : (
            <option disabled>대분류를 불러올 수 없습니다</option>
          )}
        </select>
      </label>
      <label>
        소분류:
        <select
          value={selectedSub}
          onChange={(e) => setSelectedSub(e.target.value)}
          disabled={!selectedMajor}
        >
          <option value="">소분류를 선택하세요</option>
          {subs.length > 0 ? (
            subs.map((sub, index) => (
              <option key={index} value={sub}>
                {sub}
              </option>
            ))
          ) : (
            <option disabled>소분류를 불러올 수 없습니다</option>
          )}
        </select>
      </label>
      제품이름
      <input ref={searchItemName} placeholder="제목 입력" />
      <input
        type="date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
      />
      <Button onClick={handlerSearch}>검색</Button>
    </EmpSalePlanSearchStyled>
  );
};
