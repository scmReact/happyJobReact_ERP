import { FC, createContext, useState } from "react";

interface Context {
    searchKeyword: object;
    setSearchKeyword: (keyword: object) => void;
    searchCust: {
        cust_id: string;
        cust_name: string;
    };
    setSearchCust: (keyword: { cust_id: string; cust_name: string }) => void;
}

const defaultValue: Context = {
    searchKeyword: {},
    setSearchKeyword: () => {},
    searchCust: {
        cust_id: "",
        cust_name: "",
    },
    setSearchCust: () => {},
};

export const AccSlipContext = createContext(defaultValue);

export const AccSlipProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState({});
    const [searchCust, setSearchCust] = useState({
        cust_id: "",
        cust_name: "",
    });
    return <AccSlipContext.Provider value={{ searchKeyword, setSearchKeyword, searchCust, setSearchCust }}>{children}</AccSlipContext.Provider>;
};
