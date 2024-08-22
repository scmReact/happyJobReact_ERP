import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useRecoilState } from "recoil";
import { format } from "date-fns";
import { EmpSalePlanModal } from "../EmpSalePlanModal/EmpSalePlanModal";
import { modalState } from "../../../../../stores/modalState";
import { Button } from "../../../../common/Button/Button";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { Protal } from "../../../../common/potal/Portal";
import {
  StyledTable,
  StyledTh,
  StyledTd,
} from "../../../../common/styled/StyledTable";

export interface IEmpSalePlanSearchList {
  plan_num: number;
  loginID: string;
  cust_id: string;
  item_code: string;
  target_date: number;
  goal_qut: number;
  perform_qut: number;
  plan_note: string;
  cust_name: string;
  manufac: string;
  major_class: string;
  sub_class: string;
  item_name: string;
  name: string;
}

export interface IEmpSalePlanSearchListJsonResponse {
  list: IEmpSalePlanSearchList[];
  salePlanListCnt: number;
}

export const EmpSalePlanMain = () => {
  const { search } = useLocation(); // useLocation으로 EmpSalePalnSearch에서 navvigate에 담아준 queryStirng인쿼리 문자열 가져오기
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  console.log("1번 : search 받으라고:", search); // "?searchTitle=someTitle&searchDate=2024-08-19&searchManufac=Manufacturer&searchMajor=Major&searchSub=Sub"

  const [empSalePlanSearchList, setEmpSalePlanSearchList] = useState<
    IEmpSalePlanSearchList[]
  >([]);
  //const [empSalePage, setEmpSalePage] = useState<number>(0);
  //const [currentPage, setCurrentPage] = useState<number>(1);
  const [listCount, setListCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number | undefined>();
  const [planNum, setPlanNum] = useState<number>();
  const [low, setLow] = useState<IEmpSalePlanSearchList>(); //1row 데이터 모달로 던져주기

  useEffect(() => {
    //EmpSalePlanSearch컴포넌트에서 검색조건들 navigate로 넘어오는 애들 : search
    console.log("2번 : search는 잘 받아 오냐 ? => ", search);
    searchEmpSaleveList();
  }, [search]);

  const searchEmpSaleveList = (cpage?: number) => {
    cpage = cpage || 1;
    const searchParam = new URLSearchParams(search); //url에 페이징 담아서 서버로 보내주자
    searchParam.append("currentPage", cpage.toString());
    searchParam.append("pageSize", "5");

    //세션에서 loginId까지 custNameList, userName은 모달, list,loginId,salPlanListCnt는 메인
    axios
      .post("/business/salePlanListJson.do", searchParam)
      .then((res: AxiosResponse<IEmpSalePlanSearchListJsonResponse>) => {
        setEmpSalePlanSearchList(res.data.list);
        setListCount(res.data.salePlanListCnt);
        setCurrentPage(cpage);
      })
      .catch((error) => {
        console.error("에러", error);
      });
  };

  const formatDate = (timestamp: number) => {
    return format(new Date(timestamp), "yyyy-MM-dd");
  };

  const handlerModal = (seq?: number) => {
    setLow(undefined);
    setModal(!modal);
    setPlanNum(seq);
  };

  //모달 전체범위
  const postSuccess = () => {
    setModal(!modal);
    searchEmpSaleveList();
  };

  return (
    <>
      {modal ? (
        <Protal>
          <EmpSalePlanModal
            planNum={planNum}
            onSuccess={postSuccess}
            setPlanNum={setPlanNum}
            low={low}
          />
        </Protal>
      ) : null}
      <Button onClick={handlerModal}>영업계획등록</Button>
      현재페이지: {currentPage} , 총 데이터 수: {listCount}
      <StyledTable>
        <thead>
          <tr>
            <StyledTh size={15}>목표날짜</StyledTh>
            <StyledTh size={10}>거래처이름</StyledTh>
            <StyledTh size={10}>제조업체</StyledTh>
            <StyledTh size={10}>대분류</StyledTh>
            <StyledTh size={15}>소분류</StyledTh>
            <StyledTh size={10}>제품이름</StyledTh>
            <StyledTh size={10}>목표수량</StyledTh>
            <StyledTh size={10}>실적수량</StyledTh>
            <StyledTh size={10}>비고</StyledTh>
          </tr>
        </thead>
        <tbody>
          {empSalePlanSearchList.length > 0 ? (
            empSalePlanSearchList.map((a) => (
              <tr
                key={a.plan_num}
                onClick={() => {
                  setModal(!modal);
                  setLow(a);
                }}
              >
                <StyledTd>{formatDate(a.target_date as number)}</StyledTd>
                <StyledTd>{a.cust_name}</StyledTd>
                <StyledTd>{a.manufac}</StyledTd>
                <StyledTd>{a.major_class}</StyledTd>
                <StyledTd>{a.sub_class}</StyledTd>
                <StyledTd>{a.item_name}</StyledTd>
                <StyledTd>{a.goal_qut}</StyledTd>
                <StyledTd>{a.perform_qut}</StyledTd>
                <StyledTd>{a.plan_note}</StyledTd>
              </tr>
            ))
          ) : (
            <tr>
              <StyledTd colSpan={9}>데이터가 없습니다.</StyledTd>
            </tr>
          )}
        </tbody>
      </StyledTable>
      <PageNavigate
        totalItemsCount={listCount}
        onChange={searchEmpSaleveList}
        itemsCountPerPage={5}
        activePage={currentPage as number}
      />
    </>
  );
};
