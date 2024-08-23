import { useEffect, useState } from "react";
import {
  StyledTable,
  StyledTd,
  StyledTh,
} from "../../../../common/styled/StyledTable";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { useLocation } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { format } from "date-fns";

export interface IBmSalePlanSearchList {
  plan_num: number;
  loginID: string;
  item_code: string;
  target_date: number;
  goal_qut: number;
  perform_qut: number;
  plan_note?: string;
  manufac: string;
  major_class: string;
  sub_class: string;
  item_name: string;
  name: string;
}

export interface IBmSalePlanSearchListJsonResponse {
  saleInfoList: IBmSalePlanSearchList[];
  saleInfoListCnt: number;
  //서버에서 받는이름
}

export const BmSalePlanMain = () => {
  const { search } = useLocation();
  //paging관련
  const [listCount, setListCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number | undefined>();

  const [bmSalePlanSearchList, setBmSalePlanSearchList] = useState<
    IBmSalePlanSearchList[]
  >([]);

  useEffect(() => {
    console.log("검색버튼 : search => ", search);
    searchBmSaleveList();
  }, [search]);

  //
  const searchBmSaleveList = (cpage?: number) => {
    cpage = cpage || 1;
    const searchParam = new URLSearchParams(search);
    searchParam.append("currentPage", cpage.toString());
    searchParam.append("pageSize", "5");

    axios
      .post("/business/saleInfoListJson.do", searchParam)
      .then((res: AxiosResponse<IBmSalePlanSearchListJsonResponse>) => {
        setBmSalePlanSearchList(res.data.saleInfoList);
        setListCount(res.data.saleInfoListCnt);
        setCurrentPage(cpage);
        console.log("영업실적조회 데이터 : => ", res.data);
      })
      .catch((error) => {
        console.error("에러", error);
      });
  };

  const formatDate = (timestamp: number) => {
    return format(new Date(timestamp), "yyyy-MM-dd");
  };

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh size={5}>사번</StyledTh>
            <StyledTh size={5}>이름</StyledTh>
            <StyledTh size={10}>날짜</StyledTh>
            <StyledTh size={7}>제품코드</StyledTh>
            <StyledTh size={7}>제조업체</StyledTh>
            <StyledTh size={7}>대분류</StyledTh>
            <StyledTh size={10}>소분류</StyledTh>
            <StyledTh size={10}>제품이름</StyledTh>
            <StyledTh size={7}>목표수량</StyledTh>
            <StyledTh size={7}>실적수량</StyledTh>
            <StyledTh size={5}>달성율</StyledTh>
            <StyledTh size={10}>비고</StyledTh>
          </tr>
        </thead>
        <tbody>
          {bmSalePlanSearchList && bmSalePlanSearchList.length > 0 ? (
            bmSalePlanSearchList.map((a, i) => (
              <tr key={i}>
                <StyledTd>{a.loginID}</StyledTd>
                <StyledTd>{a.name}</StyledTd>
                <StyledTd>{formatDate(a.target_date as number)}</StyledTd>
                <StyledTd>{a.item_code}</StyledTd>
                <StyledTd>{a.manufac}</StyledTd>
                <StyledTd>{a.major_class}</StyledTd>
                <StyledTd>{a.sub_class}</StyledTd>
                <StyledTd>{a.item_name}</StyledTd>
                <StyledTd>{a.goal_qut}</StyledTd>
                <StyledTd>{a.perform_qut}</StyledTd>
                <StyledTd>{a.goal_qut}</StyledTd>
                <StyledTd>{a.plan_note}</StyledTd>
              </tr>
            ))
          ) : (
            <tr>
              <StyledTd colSpan={12}>데이터가 없습니다.</StyledTd>
            </tr>
          )}
        </tbody>
      </StyledTable>

      <PageNavigate
        totalItemsCount={listCount}
        onChange={searchBmSaleveList}
        itemsCountPerPage={5}
        activePage={currentPage as number}
      />
    </>
  );
};
