import { FC, useEffect, useRef, useState } from "react";
import { StyledTable, StyledTd, StyledTh } from "../../../common/styled/StyledTable";
import { Chart, ChartConfiguration, registerables } from "chart.js";
import { useLocation } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { MonthlyModalMainStyled } from "./styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import { Button } from "../../../common/Button/Button";

Chart.register(...registerables);

export interface IMonthlyModalDetail {
    list : string;
	title : string;
    name : string;
    amount : number;
	nameLabel : string;
	amountLabel : number;
};

export interface IListJsonResponse {
    list : IMonthlyModalDetail[];
    title: string;
    nameLabel: string;
    amountLabel: string;
}

export interface modalParamProps{
    modalParam : string;
}

interface MyChartComponentProps {
    amount: number[];
    name: string[];
  }

const getMonth = ()=>{
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    
    return `${year}-${month}`;
}

export const MonthlyModalMain:FC<modalParamProps> = ({modalParam}) => {

    const { search } = useLocation();
    const [ list, setList ] = useState<IMonthlyModalDetail[]>([]);
    const chartRef = useRef<Chart<"pie", number[], string> | null>(null);
    const [ title, setTitle ] = useState<String>();
    const [ nameLabel, setNameLabel ] = useState<String>();
    const [ amountLabel, setAmountLabel ] = useState<string>();
    const [ modal, setModal] = useRecoilState<boolean>(modalState);
    const month = getMonth();

    useEffect(() => {
        console.log(list)
        searchList(modalParam);
    }, []);

    const searchList = (modalParam: string, cpage? : number) => {
        cpage = cpage || 1;
        const searchParam = new URLSearchParams(search);

        searchParam.append('cpage', cpage.toString());
        searchParam.append('pageSize', '5');
        searchParam.append('isMonthly', 'Y');
        searchParam.append('month', month);

        if(modalParam === 'item'){
            searchParam.append('type', 'item');
        }else{
            searchParam.append('type', '');
        }

        axios.post('/sales/searchTopJson.do', searchParam).then((res: AxiosResponse<IListJsonResponse>) => {
            
            setList(res.data.list);
            setTitle(res.data.title);
            setNameLabel(res.data.nameLabel);
            setAmountLabel(res.data.amountLabel);

        })
        
    }

    
    

    const getChart = (modalParam: string, cpage?:number) => {
        cpage = cpage || 1;
        const searchParam = new URLSearchParams(search);
        searchParam.append('cpage', cpage.toString());
        searchParam.append('pageSize', '5');

        searchParam.append('isMonthly', 'Y');
        searchParam.append('month', '2024-08');

        if(modalParam === 'item'){
            searchParam.append('type', 'item');
        }else{
            searchParam.append('type', '');
        }

        axios.post("/sales/searchTopJson.do", searchParam).then((res:AxiosResponse<IListJsonResponse>) => {
            console.log(res.data)
            const amount = res.data.list.map((a: any) => a.amount); // 매출
            const name = res.data.list.map((a: any) => a.name || ''); // 지출
            
            const canvas = document.querySelector("#myChart1") as HTMLCanvasElement | null;

if (canvas) {
  const ctx = canvas.getContext("2d");

  if (ctx) {
    chartRef.current = new Chart(ctx, {
      type: "pie",  // 차트 유형을 여기서 지정합니다.
      data: {
        labels: name, 
        datasets: [
          {
            label: "매출",
            data: amount, // 매출 데이터
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  }
}


          
    })
}
      
useEffect(() => {
    getChart(modalParam);
}, [search]);

return (
    <>
    
    
    <MonthlyModalMainStyled>
        
    <div className="container">
    <div className="button">
            <Button onClick={()=>{setModal(!modal)}}>닫기</Button>
        </div>
    <div className="chart">
        <canvas id="myChart1"></canvas>
    </div>
        <table>
            <thead>
                    {title}
                <tr>
                    <StyledTh size={14}>순위</StyledTh>
                    <StyledTh size={37}>{nameLabel}</StyledTh>
                    <StyledTh size={23}>{amountLabel}</StyledTh>
                </tr>

            </thead>
            <tbody>
                {list ? (
                    list.map((a, index) => {
                        return (
                            <tr key={index}>
                                <StyledTd>{index + 1}</StyledTd>
                                <StyledTd>{a.name}</StyledTd>
                                <StyledTd>{a.amount}</StyledTd>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <StyledTd colSpan={3}>데이터가 없습니다.</StyledTd>
                    </tr>
                )}
            </tbody>
        </table>
        
    </div>
</MonthlyModalMainStyled>
    </>
)

};
