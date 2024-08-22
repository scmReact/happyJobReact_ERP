import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { DailyRevenueChartContext } from "../../../../../api/provider/DailyRevenueChartProvider";
import { IDailyRevenueRes } from "../DailyRevenueChart/DailyRevenueChart";
import { formatWon } from "../../../../../common/formatWon";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { StyledTh, StyledTd } from "../../../../common/styled/StyledTable";
import { DailyRevenueTopTableStyled } from "./styled";

export const DailyRevenueTopTable = ()=>{
    const {searchKeyword , setTotalAmount, setTotalUnpaid, setTotalPayAmount, list, setList} = useContext(DailyRevenueChartContext)
    const [totalCount, setTotalCount] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    
    useEffect(()=>{
        dailyRevenue();
    }, [searchKeyword]);

    const dailyRevenue = (cpage?: number)=> {
        cpage = cpage || 1;
        
        axios
            .post(`/sales/searchDailyJson.do`,{
                ...searchKeyword,
                currentPage: cpage,
                pageSize: 5,
            })
            .then((res:AxiosResponse<IDailyRevenueRes>)=>{
                setList(res.data.list);
                setTotalCount(res.data.totalCount)
                setTotalAmount(res.data.totalAmount)
                setTotalPayAmount(res.data.totalPayAmount)
                setTotalUnpaid(res.data.totalUnpaid)
                setCurrentPage(cpage as number)
            })
            .catch((err)=>{
                console.error(err)
            })
    }

    return(
        <DailyRevenueTopTableStyled>
          <table>
                <thead>
                    <tr>
                        <StyledTh  scope="col">날짜</StyledTh >
                        <StyledTh  scope="col">거래처코드</StyledTh >
                        <StyledTh  scope="col">거래처명</StyledTh >
                        <StyledTh  scope="col">매출액</StyledTh >
                        <StyledTh  scope="col">지출액</StyledTh >
                        <StyledTh  scope="col">미수금액</StyledTh >
                    </tr>
                </thead>
                <tbody id="list">
                    {
                         list && list.length > 0
                        ?
                        list.map((a, i)=>{
                            return(
                                <tr key={i}>
                                    <StyledTd>{a.bookDate}</StyledTd>
                                    <StyledTd>{a.custId}</StyledTd>
                                    <StyledTd>{a.custName}</StyledTd>
                                    <StyledTd>{formatWon(a.amount)}</StyledTd>
                                    <StyledTd>{formatWon(a.payAmount)}</StyledTd>
                                    {
                                        a.unpaidState==='N'
                                        ?
                                        <StyledTd>{formatWon(a.amount)}</StyledTd>
                                        :
                                        <StyledTd>0 원</StyledTd>
                                    }
                                </tr>
                            )
                        })
                        :
                        (
                            <tr>
                                <StyledTd>없어용</StyledTd>
                            </tr>
                        )
                    }
                </tbody>
            </table>

            <PageNavigate
                totalItemsCount={totalCount}
                onChange={dailyRevenue}
                itemsCountPerPage={5}
                activePage={currentPage as number}
            ></PageNavigate>

        </DailyRevenueTopTableStyled>
    )
}

