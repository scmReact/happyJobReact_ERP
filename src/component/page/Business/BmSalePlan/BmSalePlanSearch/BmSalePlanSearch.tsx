import { useEffect, useRef, useState } from "react";
import { Button } from "../../../../common/Button/Button";
import { BmSalePlanSearchStyled } from "./styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface IBmSalePlaneListJsonResponse {
  searchManuflist: IBmSaleList[];
}

export interface IBmSaleList {
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

export const BmSalePlanSearch = () => {
  const [searchDate, setSearchDate] = useState<string>("");
  const [searchItemName, setSearchItemName] = useState<string>("");
  const searchLoginId = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [majors, setMajors] = useState<string[]>([]);
  const [subs, setSubs] = useState<string[]>([]);
  const [ItemName, setItemName] = useState<string[]>([]);

  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("");
  const [selectedMajor, setSelectedMajor] = useState<string>("");
  const [selectedSub, setSelectedSub] = useState<string>("");
  const [seletedItemName, setSelectedItemName] = useState<string>("");

  const handlerSearch = () => {
    const query: string[] = [];

    //백틱 => mapper 조건 변수명
    !searchItemName || query.push(`searchItemName=${searchItemName}`);
    !searchDate || query.push(`searchDate=${searchDate}`);
    !selectedManufacturer ||
      query.push(`searchManufac=${selectedManufacturer}`);
    !selectedMajor || query.push(`selectedMajor=${selectedMajor}`);
    !selectedSub || query.push(`searchItemName=${selectedSub}`);

    searchLoginId.current?.value &&
      query.push(`searchloginID=${searchLoginId.current?.value}`); //[object&Object]
    //searchItemName.current?.value &&query.push(`searchItemName=${searchItemName.current?.value}`);

    const queryString = query.length > 0 ? `?${query.join("&")}` : "";

    navigate(`/react/business/bmSalePlan.do${queryString}`);
    //navigate : url경로
  };

  //여기서부터 제조사 => 대 => 소 => 제품이름까지 가져오는곳
  useEffect(() => {
    axios
      .get<{ searchList: IBmSaleList[] }>("/business/manufacturersListJson.do")
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
            setSelectedItemName("");
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

  //소분류 => 제품이름 가져오기
  useEffect(() => {
    if (selectedSub) {
      axios
        .get(
          `/business/getItemNameClassesJson.do?manufac=${selectedManufacturer}&major_class=${selectedMajor}&sub_class=${selectedSub}`
        )
        .then((response) => {
          if (Array.isArray(response.data)) {
            const itemName = response.data.map((item) => item.item_name);
            setItemName(itemName);
            setSelectedItemName("");
          } else {
            console.error("API안타짐?", response.data);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [selectedSub]);

  return (
    <div>
      <BmSalePlanSearchStyled>
        사번
        <input ref={searchLoginId} placeholder="사번을 입력해주세요" />
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
        <label>
          제품이름:
          <select
            value={seletedItemName}
            onChange={(e) => setSelectedItemName(e.target.value)}
            disabled={!selectedSub}
          >
            <option value="">소분류를 선택하세요</option>
            {ItemName.length > 0 ? (
              ItemName.map((itemNames, index) => (
                <option key={index} value={itemNames}>
                  {itemNames}
                </option>
              ))
            ) : (
              <option disabled>제품이름를 불러올 수 없습니다</option>
            )}
          </select>
        </label>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <Button onClick={handlerSearch}>검색</Button>
      </BmSalePlanSearchStyled>
    </div>
  );
};
