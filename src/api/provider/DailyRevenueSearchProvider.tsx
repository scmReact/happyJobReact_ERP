import { FC, createContext, useState } from 'react';
import { getCurrentDate } from '../../common/CurrentDate';

interface Context {
    searchKeyword: {};
    setSearchKeyword: (keyword: { date: string, account: string }) => void;
}

const search: Context = {
    searchKeyword: {date: '', account: ''},
    setSearchKeyword: () => {}
};

export const DailyRevenueSearchContext = createContext(search);

export const DailyRevenueSearchProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState({date: getCurrentDate(), account: ''});
    return <DailyRevenueSearchContext.Provider value={{ searchKeyword, setSearchKeyword }}>{children}</DailyRevenueSearchContext.Provider>;
};
