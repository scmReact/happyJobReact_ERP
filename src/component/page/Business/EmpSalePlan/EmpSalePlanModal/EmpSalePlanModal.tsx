import React, { useState, useEffect } from "react";
import { EmpSalePlanModalStyled } from "./styled";
import { useRecoilState } from "recoil";
import axios, { AxiosResponse } from "axios";
import { IEmpSalePlanSearchList } from "../EmpSalePlanMain/EmpSalePlanMain";
import { formatDate } from "date-fns/format";
import { sub } from "date-fns";
import { modalState } from "../../../../../stores/modalState";
import { Button } from "../../../../common/Button/Button";

export interface IEmpSalePlaneListJsonResponse {
  searchManuflist: IEmpSaleCustList[];
}

//insert(modal에서 저장)
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

export interface IEmpSalePlanModalProps {
  planNum?: number; //seq대용
  onSuccess: () => void;
  //setPlanNum: React.Dispatch<React.SetStateAction<number | undefined>>;
  setPlanNum: (setPlanNum: undefined) => void;
  low?: IEmpSalePlanSearchList;
}

export interface IModalInsertResponse {
  result: string;
}

export const EmpSalePlanModal: React.FC<IEmpSalePlanModalProps> = ({
  planNum,
  onSuccess,
  setPlanNum,
  low,
}) => {
  useEffect(() => {
    if (low) {
      console.log(low); //props다 들어있고
      setGoalQut(low.goal_qut);
      setPerformQut(low.perform_qut);
      setTargetDate(low.target_date ? low.target_date.toString() : "");
      setPlanNote(low.plan_note || "");

      //cust_id보내줘야함
      setCustId(low.cust_id);
      setSelectedCustName(low.cust_name);

      // 타임스탬프 형식의 날짜를 변환하여 설정
      if (low.target_date) {
        const date = new Date(low.target_date);
        const formattedDate = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        setTargetDate(formattedDate);
        console.log(
          "number형식의 날짜 형변환 => 0000-00-00형식으로 => ",
          formattedDate
        );
      }
    }
  }, [low]);

  const [modal, setModal] = useRecoilState<boolean>(modalState);

  const [loginID, setLoginID] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [targetDate, setTargetDate] = useState<string>("");
  const [goalQut, setGoalQut] = useState<number>(0);
  const [performQut, setPerformQut] = useState<number>(0);
  const [planNote, setPlanNote] = useState<string>("");

  // Map처럼 { key : string} : value : string}
  const [custNameIdMap, setCustNameIdMap] = useState<{ [key: string]: string }>(
    {}
  );
  const [selectedCustName, setSelectedCustName] = useState<string>("");
  const [custId, setCustId] = useState<string>("");

  //제조업체, 대분류, 소분류, 리스트 불러오기
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [majors, setMajors] = useState<string[]>([]);
  const [subs, setSubs] = useState<string[]>([]);
  const [itemName, setItemName] = useState<string[]>([]);

  //불러 온뒤에 선택된 값
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("");
  const [selectedMajor, setSelectedMajor] = useState<string>("");
  const [selectedSub, setSelectedSub] = useState<string>("");
  const [selectedItemName, setSelectedItemName] = useState<string>("");
  const [selectedItemCode, setSelectedItemCode] = useState<string>("");
  const [itemCodeMap, setItemCodeMap] = useState<{ [key: string]: string }>({});

  const handlerInsertOrUpdate = () => {
    if (
      low &&
      low.plan_num &&
      low.cust_id &&
      low.item_code &&
      targetDate &&
      goalQut !== null &&
      goalQut !== undefined && // goalQut만 쓰면 0 => false가 나오니까
      performQut !== null &&
      performQut !== undefined
    ) {
      if (low) {
        console.log("update하기전에 변수에 넣어줄 애들 잘 들어있는지 1차 확인");
        console.log(planNum); //undefined
        console.log(custId); //공백
        console.log(selectedItemCode); //공백
        console.log(targetDate);
        console.log(targetDate);
        console.log(goalQut);
        console.log(performQut);
        console.log(planNote);

        axios
          .post("/business/salePlanUpdateJson.do", {
            detailPlanNum: low.plan_num, //못받음
            cust_id: low.cust_id, //props에서 꺼내와야됨(String)으로만 가는중
            item_code: low.item_code, //(String)으로만 가는중
            target_date: targetDate,
            goal_qut: goalQut,
            perform_qut: performQut,
            plan_note: planNote,
          })
          .then(
            (res: AxiosResponse<IModalInsertResponse>) => {
              if (res.data.result === "Success") {
                onSuccess();
                alert("수정되었습니다");
                setModal(false);
              }
            }
            /*[low]*/
          );
      } else {
      }
    } else {
      alert("값들");
    }
  };

  const handlerInsert = () => {
    if (
      selectedManufacturer &&
      selectedCustName &&
      targetDate &&
      goalQut !== null &&
      goalQut !== undefined && // goalQut 체크
      performQut !== null &&
      performQut !== undefined &&
      selectedItemName
    ) {
      axios
        .post("/business/salePlanInsertJson.do", {
          loginID,
          cust_id: custId,
          item_code: selectedItemCode,
          target_date: targetDate,
          goal_qut: goalQut,
          perform_qut: performQut,
          plan_note: planNote,
        })
        .then((res: AxiosResponse<IModalInsertResponse>) => {
          if (res.data.result === "Success") {
            onSuccess();
            alert("저장되었습니다");
            setModal(false);
          }
        });
    } else {
      alert("필수값을 입력하세요");
    }
  };

  //필요한 데이터 끌어오기 => 모달창에 붙일것들
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/business/salePlanListJson.do");
        const { loginID, userName, custNameList } = response.data;
        setLoginID(loginID);
        setUserName(userName);

        console.log(response.data);

        if (Array.isArray(custNameList)) {
          const nameIdMap = custNameList.reduce((acc, item) => {
            acc[item.cust_name] = item.cust_id;
            return acc;
          }, {} as { [key: string]: string });

          setCustNameIdMap(nameIdMap);
          setSelectedCustName(""); // 초기화
          setCustId(""); // 초기화
        } else {
          console.error("custNameList 데이터 형식 오류:", custNameList);
          setCustNameIdMap({});
        }
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchData();
  }, []);

  const handleCustNameChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCustName = event.target.value;
    setSelectedCustName(selectedCustName); // 선택된 거래처 이름 설정
    setCustId(custNameIdMap[selectedCustName] || ""); // 선택된 거래처 이름에 해당하는 ID 설정
  };

  //여기서부터 제조사 ~~~ 제품이름까지
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
        console.error("에러 좀..:", error);
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
            setMajors(majorClasses);
          } else {
            console.error("API 응답 데이터가 배열이 아님:", response.data);
          }
        })
        .catch((error) => {
          console.error("major_class데이터 없는애들..:", error);
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
          console.error("Error fetching subs:", error);
        });
    }
  }, [selectedMajor]);
  //제조사, 대분류, 소분류 => 제품이름 가져오기
  useEffect(() => {
    if (selectedSub) {
      axios
        .get(
          `/business/getItemNameClassesJson.do?manufac=${selectedManufacturer}&major_class=${selectedMajor}&sub_class=${selectedSub}`
        )
        .then((response) => {
          if (Array.isArray(response.data)) {
            // item_name과 item_code를 같이 저장
            const items = response.data.reduce((acc, item) => {
              acc[item.item_name] = item.item_code;
              return acc;
            }, {} as { [key: string]: string });
            setItemName(Object.keys(items)); // item_name만 저장
            setSelectedItemName("");
            setSelectedItemCode("");
            setItemCodeMap(items); // item_name과 item_code의 매핑을 저장
          } else {
            console.error("API 응답 문제:", response.data);
          }
        })
        .catch((error) => {
          console.error("아이템 목록을 가져오는 중 오류:", error);
        });
    }
  }, [selectedSub]);

  // 선택한 item_name에 해당하는 item_code를 저장
  const handleItemNameChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedName = event.target.value;
    setSelectedItemName(selectedName);
    setSelectedItemCode(itemCodeMap[selectedName] || ""); // item_name에 해당하는 item_code 설정
  };

  //low 존재시에 => 수정, 삭제
  const handlerDelete = () => {
    if (low) {
      console.log("delete할건데 low잘 불러오냐 ? ", low.plan_num);
      axios
        .post("/business/salePlanDeleteJson.do", {
          detailPlanNum: low.plan_num,
        })
        .then((res: AxiosResponse<IModalInsertResponse>) => {
          if (res.data.result === "Success") {
            onSuccess();
            alert("삭제되었습니다");
            setModal(false);
          }
        });
    }
  };

  const handlerCancel = () => {
    setPlanNum(undefined);
    setModal(false);
  };

  return (
    <EmpSalePlanModalStyled>
      <div className="container">
        <div className="head">
          <strong>영업계획</strong>
        </div>
        <div className="content">
          <label>
            사번
            <input type="text" value={loginID} readOnly />
          </label>
          <label>
            직원명
            <input type="text" value={userName} readOnly />
          </label>
          <label>
            거래처 이름<span className="required">*필수입력</span>
            {low ? (
              <>
                <select value={low.cust_id} onChange={handleCustNameChange}>
                  <option value={low.cust_id}>{low.cust_name}</option>
                </select>
              </>
            ) : (
              <select value={selectedCustName} onChange={handleCustNameChange}>
                <option value="">거래처를 선택하세요</option>
                {Object.keys(custNameIdMap).map((custName, index) => (
                  <option key={index} value={custName}>
                    {custName}
                  </option>
                ))}
              </select>
            )}
            <input type="hidden" value={custId} />
          </label>
          <label>
            제조사<span className="required">*필수입력</span>
            {low ? (
              <select
                value={low.manufac}
                onChange={(e) => setSelectedManufacturer(e.target.value)}
                required
              >
                <option value={low.manufac}>{low.manufac}</option>
              </select>
            ) : (
              <select
                value={selectedManufacturer}
                onChange={(e) => setSelectedManufacturer(e.target.value)}
                required
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
            )}
          </label>
          <label>
            대분류<span className="required">*필수입력</span>
            {low ? (
              <select
                value={low.major_class}
                onChange={(e) => setSelectedMajor(e.target.value)}
                required
              >
                <option value={low.major_class}>{low.major_class}</option>
              </select>
            ) : (
              <select
                value={selectedMajor}
                onChange={(e) => setSelectedMajor(e.target.value)}
                disabled={!selectedManufacturer}
                required
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
            )}
          </label>

          <label>
            소분류<span className="required">*필수입력</span>
            {low ? (
              <select
                value={low.sub_class} // 현재 선택된 소분류 값을 설정
                onChange={(e) => setSelectedSub(e.target.value)} // 선택된 값으로 상태 업데이트
                required
              >
                <option value={low.sub_class}>{low.sub_class}</option>{" "}
                {/* 현재 선택된 소분류 */}
              </select>
            ) : (
              <select
                value={selectedSub} // 상태에 따라 소분류 값을 설정
                onChange={(e) => setSelectedSub(e.target.value)} // 선택된 값으로 상태 업데이트
                disabled={!selectedMajor} // 대분류가 선택되지 않았으면 비활성화
                required
              >
                <option value="">소분류를 선택하세요</option>
                {subs.length > 0 ? (
                  subs.map((sub, index) => (
                    <option key={index} value={sub}>
                      {" "}
                      {/* 소분류 값 */}
                      {sub}
                    </option>
                  ))
                ) : (
                  <option disabled>소분류를 불러올 수 없습니다</option>
                )}
              </select>
            )}
          </label>

          <label>
            제품이름<span className="required">*필수입력</span>
            {low ? (
              <select
                value={low.item_name}
                onChange={handleItemNameChange}
                disabled={!low.sub_class}
                required
              >
                <option value={low.item_name}>{low.item_name}</option>
              </select>
            ) : (
              <select
                value={selectedItemName}
                onChange={handleItemNameChange}
                disabled={!selectedSub}
                required
              >
                <option value="">아이템을 선택하세요</option>
                {itemName.length > 0 ? (
                  itemName.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))
                ) : (
                  <option disabled>아이템을 불러올 수 없습니다</option>
                )}
              </select>
            )}
            <input type="hidden" value={selectedItemCode} />
          </label>
          <label>
            목표날짜<span className="required">*필수입력</span>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </label>
          <label>
            목표수량<span className="required">*필수입력</span>
            <input
              type="number"
              value={goalQut}
              onChange={(e) =>
                setGoalQut(e.target.value ? parseInt(e.target.value) : 0)
              }
            />
          </label>
          <label>
            실적수량<span className="required">*필수입력</span>
            <input
              type="number"
              value={performQut}
              onChange={(e) => setPerformQut(parseInt(e.target.value))}
            />
          </label>
          <label>
            비고
            <input
              type="text"
              value={planNote}
              onChange={(e) => setPlanNote(e.target.value)}
              required
            />
          </label>
          <div className="buttonDiv">
            <Button onClick={low ? handlerInsertOrUpdate : handlerInsert}>
              {low ? "수정" : "저장"}
            </Button>
            {low && <Button onClick={handlerDelete}>삭제</Button>}
            <Button onClick={handlerCancel}>닫기</Button>
          </div>
        </div>
      </div>
    </EmpSalePlanModalStyled>
  );
};
