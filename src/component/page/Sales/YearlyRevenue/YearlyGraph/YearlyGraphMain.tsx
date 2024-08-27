import axios from "axios";
import { Chart, registerables } from "chart.js";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

Chart.register(...registerables);

export const YearlyRevenueGraphMain = () => {
    
    const { search } = useLocation();
    const chartRef = useRef<Chart | null>(null);

    const getChart = () => {
        const searchParam = new URLSearchParams(search);

        axios.post("/sales/searchGraphJson.do", searchParam).then((res) => {
            // 월과 데이터를 배열로 변환 => res.data에 들어와 있는 애들을 꺼내야 함
            const months = res.data.map((a: any) => a.bookDate); // data에서 반복자 돌려서 (item 임시변수) => month 꺼내기
            const amount = res.data.map((a: any) => a.amount); 
            const payAmount = res.data.map((a: any) => a.payAmount || 0); // 없으면 0으로, 발주액 꺼내기
            const unpaidAmount = res.data.map((a: any) => a.unpaidAmount || 0); // 수주액 꺼내기
            const totalAmount = res.data.map((a: any) => (a.amount || 0) - (a.payAmount || 0)
      ); // 예상수입액

      // 기존 차트가 있다면 삭제
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Canvas 요소 가져오기
      const canvas = document.querySelector(
        "#myChart"
      ) as HTMLCanvasElement | null;
      if (canvas) {
        const ctx = canvas.getContext("2d"); // 이거를 해 줘야지 mixed차트

        if (ctx) {
          chartRef.current = new Chart(ctx, {
            type: "bar",
            data: {
              labels: months, // 월
              datasets: [
                {
                  label: "매출",
                  data: amount, // 매출
                  backgroundColor: "hsl(0.3turn 60% 45% / .7)",
                  borderColor: "hsl(0.3turn 60% 45% / .7)",
                  borderWidth: 1,
                },
                {
                  label: "지출",
                  data: payAmount, // 지출
                  backgroundColor: "rgba(255, 99, 132, 1)",
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 1,
                },
                {
                  type: "line",
                  label: "미수금",
                  data: unpaidAmount, // 미수금
                  backgroundColor: "rgb(31 120 50);",
                  borderColor: "rgb(31 120 50);",
                  borderWidth: 1,
                },
                {
                    type: "line",
                    label: "totalAmount",
                    data: totalAmount, // 순이익
                    backgroundColor: "rgb(31 120 50);",
                    borderColor: "rgb(31 120 50);",
                    borderWidth: 1,
                  },
              ],
            },
            options: {
                scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'bookDate', // x축 라벨
                      },
                      ticks: {
                        color: 'rgba(0, 0, 0, 0.7)', // x축 눈금의 색상
                        font: {
                          size: 14, // x축 눈금의 글자 크기
                        },
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: '금액', // y축 라벨
                      },
                      ticks: {
                        color: 'rgba(0, 0, 0, 0.7)', // y축 눈금의 색상
                        font: {
                          size: 14, // y축 눈금의 글자 크기
                        },
                      },
                      beginAtZero: false, // y축이 0에서 시작하지 않음
                },
              },
            },
          });
        }
      }
    });
  };
    
    useEffect(() => {
        getChart();
      }, [search]);

    return(
        <div>
            <canvas id="myChart"></canvas>
        </div>
    )
}