import { FC, ReactNode, createContext, useState } from "react";

interface Context {
    searchKeyword: object;
    setSearchKeyword: (keyword: object) => void;
}

const defaultValue: Context = {
    searchKeyword: {},
    setSearchKeyword: () => {},
};

export const UnpaidContext = createContext(defaultValue);

export const UnpaidProvider: FC<{ children: ReactNode | ReactNode[] }> = ({
    children,
}) => {
    const [searchKeyword, setSearchKeyword] = useState({});
    return (
        <UnpaidContext.Provider value={{ searchKeyword, setSearchKeyword }}>
            {children}
        </UnpaidContext.Provider>
    );
};
