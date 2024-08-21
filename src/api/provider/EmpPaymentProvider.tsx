import { createContext, FC, useState } from "react";


interface Context {
    searchKeyword: object;
    setSearchKeyword: (keyword: object) => void;
}

const defaultValue: Context = {
    searchKeyword: {},
    setSearchKeyword: () => {},
};

export const EmpPaymentContext = createContext(defaultValue);

export const EmpPaymentProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState({});
    return <EmpPaymentContext.Provider value={{ searchKeyword, setSearchKeyword }}>{children}</EmpPaymentContext.Provider>;
};
