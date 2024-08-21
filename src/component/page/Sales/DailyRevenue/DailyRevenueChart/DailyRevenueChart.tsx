import { useContext, useEffect, useRef, useState } from "react"
import axios, { AxiosResponse } from "axios"
import { DailyRevenueSearchContext } from "../../../../../api/provider/DailyRevenueSearchProvider";
import { formatWon } from "../../../../../common/formatWon";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { DailyRevenueChartStyled } from "./styled";
import { Chart, registerables } from "chart.js";

export interface IDailyRevenueList{
    amount:number;
    bookDate: string;
    custId: string;
    custName: string;
    payAmount: number;
    unpaidState: string;
}

export interface IDailyRevenueRes{
    list:IDailyRevenueList[];
    totalAmount: number;
    totalCount: number;
    totalPayAmount: number;
    totalUnpaid: number;
}

Chart.register(...registerables);
export const DailyRevenueChart = ()=>{

    const {searchKeyword} = useContext(DailyRevenueSearchContext)
    const [list, setList] = useState<IDailyRevenueList[]>();
    const [totalAmount, setTotalAmount] = useState<number>();
    const [totalCount, setTotalCount] = useState<number>(1);
    const [totalPayAmount, setTotalPayAmount] = useState<number>();
    const [totalUnpaid, setTotalUnpaid] = useState<number>();
    const [currentPage, setCurrentPage] = useState<number>();
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        dailyRevenue();
        console.log("searchKeyword:", searchKeyword);
        chart()
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
                console.log(res.data)
                setList(res.data.list);
                setTotalAmount(res.data.totalAmount)
                setTotalCount(res.data.totalCount)
                setTotalPayAmount(res.data.totalPayAmount)
                setTotalUnpaid(res.data.totalUnpaid)
                setCurrentPage(cpage);
            })
            .catch((err)=>{
                console.error(err)
            })
    }
    const chartData = ()=>{
        if(list){
            const data = {
                labels:["총매출액", "총지출액", "총미수금액", "총순이익"],
                datasets: [{
                    label: `일일 매출 현황`,
                    data: [ ],
                    borderWidth: 1
                }]
            }
        }
    }

    const chart = ()=>{
        if(list){
            const canvas = document.querySelector("#myChart") as HTMLCanvasElement | null;
        
            if (canvas) {
                const ctx = canvas.getContext("2d")
                if (ctx) {
                    chartRef.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels:["총매출액", "총지출액", "총미수금액", "총순이익"],
                        datasets: [{
                            label: '# of Votes',
                            data: [ 0, 1, 2, 3 ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                        y: {
                            beginAtZero: true
                            }
                            }
                        }
                    });
                }
            }
        }
    }

    return(
        <DailyRevenueChartStyled>
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
            ></PageNavigate><br/><br/><br/>
            <div>
                <canvas id="myChart"></canvas>
            </div>
        </DailyRevenueChartStyled>
    )
}
