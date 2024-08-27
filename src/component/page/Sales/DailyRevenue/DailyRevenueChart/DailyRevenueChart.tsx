import { useContext, useEffect, useRef } from "react"
import { DailyRevenueChartStyled } from "./styled";
import { Chart, registerables } from "chart.js";
import { DailyRevenueChartContext } from "../../../../../api/provider/DailyRevenueChartProvider";

Chart.register(...registerables);

export const DailyRevenueChart = ()=>{

    const { totalAmount, totalUnpaid,  totalPayAmount, list} = useContext(DailyRevenueChartContext)
    const chartRef = useRef<Chart | null>(null);

    useEffect(()=>{
       
       chart()
    },[list])

    const chart = ()=>{
        
        const canvas = document.querySelector("#myChart") as HTMLCanvasElement | null;
    
        if (canvas) {
            const ctx = canvas.getContext("2d")
            if (ctx) {
                if (chartRef.current) {
                    chartRef.current.destroy(); // 기존 차트 제거
                }
                chartRef.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ["총매출액", "총지출액", "총미수금액", "총순이익"], // x축 레이블
                        datasets: [{
                            label: '#', // 데이터셋 레이블
                            backgroundColor: ['#fb6868', '#9d9dff', 'cadetblue', '#e5c72a'],
                            data: [totalAmount, totalPayAmount, totalUnpaid, (totalAmount - totalPayAmount)],
                            borderWidth: 1
                        }]               
                    },
                    options:{
                        plugins:{
                            legend :{
                                display : false
                            }
                        }
                    }
                });
            }
        }
    }

    return(
        <DailyRevenueChartStyled>
            <div className="chart">
                <canvas id="myChart"></canvas>
            </div>
        </DailyRevenueChartStyled>
    )
}
