import { useEffect, useRef, useState } from "react";
import { StyledTable, StyledTd, StyledTh } from "../../../common/styled/StyledTable";
import axios, { AxiosResponse } from "axios";
import { useLocation } from "react-router-dom";
import { formatWon } from "../../../../common/formatWon";
import { Chart, registerables } from "chart.js";
import { Protal } from "../../../common/potal/Portal";
import { MonthlyModalMain } from "../MonthlyModal/MonthlyModalMain";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import { Button } from "../../../common/Button/Button";

Chart.register(...registerables);

export interface IMonthlyList {

    amount : number;
    bookDate : string;
    payAmount : number;
    unpaidAmount : number;
    totalAmount : number;
    totalPayAmount : number;
    totalUnpaidAmount : number;

}

export interface IMonthlyListJsonResponse {
    listCount: number;
    monthlyList: IMonthlyList[];
    totalAmount: number;
    totalPayAmount: number;
    totalUnpaidAmount: number;
    month : string;
}

export const MonthlyRevenueMain = () => {
   
    const { search } = useLocation();
    const [ monthlyList, setMonthlylist ] = useState<IMonthlyList[]>([]);
    const [ currentParam, setCurrentParam ] = useState<number | undefined>();
    const chartRef = useRef<Chart | null>(null);
    const [ month, setMonth ] = useState<string>();
    const [ totalAmount, setTotalAmount ] = useState<number>(0);
    const [ totalPayAmount, setTotalPayAmount ] = useState<number>(0);
    const [ totalUnpaidAmount, setTotalUnpaidAmount ] = useState<number>(0);
    const [ modal, setModal] = useRecoilState<boolean>(modalState);
    const [ modalParam, setModalParam ] = useState<string>("")
    const [ isMonthly, setIsMonthly ] = useState<string>("N");

    useEffect(() => {
        searchMonthlyList();
    }, [search]);

    
    const searchMonthlyList = (cpage?:number) => {
        cpage = cpage || 1;
        const searchParam = new URLSearchParams(search);

        searchParam.append('cpage', cpage.toString());
        searchParam.append('pageSize', '6');

        axios.post('/sales/searchRevenueJson.do', searchParam).then((res: AxiosResponse<IMonthlyListJsonResponse>) => {
            setMonthlylist(res.data.monthlyList);
            console.log(res.data);
            setTotalAmount(res.data.totalAmount);
            setTotalPayAmount(res.data.totalPayAmount);
            setTotalUnpaidAmount(res.data.totalUnpaidAmount);
            setCurrentParam(cpage);
            setMonth(res.data.month);
        })
        
    }


    const getChart = (cpage?:number) => {
        cpage = cpage || 1;
        const searchParam = new URLSearchParams(search);
        searchParam.append('cpage', cpage.toString());
        searchParam.append('pageSize', '6');

        axios.post("/sales/searchGraphJson.do", searchParam).then((res:AxiosResponse<IMonthlyListJsonResponse>) => {
            console.log(res.data)
            // 월과 데이터를 배열로 변환 => res.data에 들어와 있는 애들을 꺼내야 함
            const months = res.data.monthlyList.map((a: any) => a.bookDate); // 년-월
            const amount = res.data.monthlyList.map((a: any) => a.amount); // 매출
            const payAmount = res.data.monthlyList.map((a: any) => a.payAmount || 0); // 지출
            const unpaidAmount = res.data.monthlyList.map((a: any) => a.unpaidAmount || 0); // 미수금
            const totalAmount = res.data.monthlyList.map((a: any) => (a.amount || 0) - (a.payAmount || 0)); // 순수익

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
            type: "line",
            data: {
              labels: months, // 월
              datasets: [
                {
                  type: "line",
                  label: "매출",
                  data: amount, // 매출
                  backgroundColor: "hsl(0.3turn 60% 45% / .7)",
                  borderColor: "hsl(0.3turn 60% 45% / .7)",
                  borderWidth: 1,
                },
                {
                  type: "line",
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
                  label: "총순이익",
                  data: totalAmount, // 순이익
                  backgroundColor: "rgb(66 10 50);",
                  borderColor: "rgb(222 33 66);",
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

    const handlerModal = () => {
      setModal(!modal);
      setModalParam("item")
  };

    const handlerModal1 = () => {
      setModal(!modal);
  };


    return (
        <>
          <Button onClick={handlerModal}>
             매출 상위 제품     
          </Button>
          <Button onClick={handlerModal1}>
             매출 상위 기업     
          </Button>
          <StyledTable>
                
                <thead>
                    <tr>
                        <StyledTh size={14}>년-월</StyledTh>
                        <StyledTh size={37}>매출</StyledTh>
                        <StyledTh size={23}>지출</StyledTh>
                        <StyledTh size={24}>미수금</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {monthlyList.length > 0 ? (
                        monthlyList?.map((a) => {
                            return (
                                <tr key={a.bookDate}>
                                    <StyledTd>{a.bookDate}</StyledTd>
                                    <StyledTd>{formatWon(a.amount)}</StyledTd>
                                    <StyledTd>{formatWon(a.payAmount)}</StyledTd>
                                    <StyledTd>{formatWon(a.unpaidAmount)}</StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={4}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>

                <div>
                    <canvas id="myChart"></canvas>
                </div>

            <StyledTable>
                <thead>

                    <tr>
                        <StyledTh size={24}>총매출액</StyledTh>
                        <StyledTd>{formatWon(totalAmount)}</StyledTd>
                    </tr>
                    <tr>
                        <StyledTh size={24}>총지출액</StyledTh>
                        <StyledTd>{formatWon(totalPayAmount)}</StyledTd>
                    </tr>
                    <tr>
                        <StyledTh size={24}>총미수금액</StyledTh>
                        <StyledTd>{formatWon(totalUnpaidAmount)}</StyledTd>
                    </tr>
                    <tr>
                        <StyledTh size={24}>총순이익</StyledTh>
                        <StyledTd>{formatWon(totalAmount-totalPayAmount)}</StyledTd>
                    </tr>

                </thead>
                {modal ? (
                  <Protal>
                    <MonthlyModalMain modalParam={modalParam}/>
                  </Protal>
            ) : null}

            </StyledTable>
            
        </>
    );
};

