import { FC, createContext, useState } from "react";

interface Context {
    searchKeyword: object;
    setSearchKeyword: (keyword: object) => void;
}

const defaultValue: Context = {
    searchKeyword: {},
    setSearchKeyword: () => {},
};

export const VctnApproveContext = createContext(defaultValue);

export const VctnApproveProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState({});
    return <VctnApproveContext.Provider value={{ searchKeyword, setSearchKeyword }}>{children}</VctnApproveContext.Provider>;
};
