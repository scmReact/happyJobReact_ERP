import { FC, createContext, useState } from 'react';
import { getCurrentDate } from '../../common/CurrentDate';
import { IDailyRevenueList } from '../../component/page/Sales/DailyRevenue/DailyRevenueChart/DailyRevenueChart';

interface Context {
    searchKeyword: {};
    setSearchKeyword: (keyword: { date: string, account: string }) => void;
    totalAmount: number;
    setTotalAmount: (amount: number) => void;
    totalPayAmount: number;
    setTotalPayAmount: (amount: number) => void;
    totalUnpaid: number;
    setTotalUnpaid: (amount: number) => void;
    list: IDailyRevenueList[];
    setList : (data:IDailyRevenueList[]) => void
}


const search: Context = {
    searchKeyword: { date: getCurrentDate(), account: '' },
    setSearchKeyword: () => {},
    totalAmount: 0,
    setTotalAmount: () => {},
    totalPayAmount: 0,
    setTotalPayAmount: () => {},
    totalUnpaid: 0,
    setTotalUnpaid: () => {},
    list:[],
    setList:()=>{}
};

export const DailyRevenueChartContext = createContext(search);

export const DailyRevenueChartProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState({date: getCurrentDate(), account: ''});
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPayAmount, setTotalPayAmount] = useState(0);
    const [totalUnpaid, setTotalUnpaid] = useState(0);
    const [list, setList] = useState<IDailyRevenueList[]>([]);
    return <DailyRevenueChartContext.Provider value={{ searchKeyword, setSearchKeyword
        , totalAmount, setTotalAmount, totalPayAmount, setTotalPayAmount, totalUnpaid, setTotalUnpaid, list, setList
     }}>{children}</DailyRevenueChartContext.Provider>;
};
