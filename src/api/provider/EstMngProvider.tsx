import { FC, ReactNode, createContext, useState } from "react";

interface Context {
    searchKeyword: object;
    setSearchKeyword: (keyword: object) => void;
}

interface InsertContext {
    estMngInsert: object;
    setEstMngInsert: (insert: object) => void;
}

const defaultValue: Context = {
    searchKeyword: {},
    setSearchKeyword: () => {},
};

const insertDefaultValue: InsertContext = {
    estMngInsert: {},
    setEstMngInsert: () => {},
};

export const EstMngContext = createContext(defaultValue);

export const EstMngInsertContext = createContext(insertDefaultValue);

export const EstMngProvider: FC<{ children: ReactNode | ReactNode[] }> = ({
    children,
}) => {
    const [searchKeyword, setSearchKeyword] = useState({});
    const [estMngInsert, setEstMngInsert] = useState({});
    return (
        <EstMngContext.Provider value={{ searchKeyword, setSearchKeyword }}>
            <EstMngInsertContext.Provider
                value={{ estMngInsert, setEstMngInsert }}
            >
                {children}
            </EstMngInsertContext.Provider>
        </EstMngContext.Provider>
    );
};
