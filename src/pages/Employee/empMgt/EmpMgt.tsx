// import statement

import { Children, createContext, FC, useState } from "react";
import { EmpMgtMain } from "../../../component/page/Employee/empMgt/empMgtMain/EmpMgtMain";
import { ContentBox } from "../../../component/common/ContentBox/ContentBox";
import { EmpMgtSearch } from "../../../component/page/Employee/empMgt/EmpMgtSearch/EmpMgtSearch";

interface Context {
    searchkeyword : object;
    setSearchKeyword : (keyword : object) => void;
}

const defaultValue : Context = {
    searchkeyword: {},
    setSearchKeyword:()=>{},
}

export const EmpMgtContext = createContext(defaultValue);

export const EmpMgtProvider : FC<{children : React.ReactNode | React.ReactNode[]}>=({children})=>{
    const [searchkeyword, setSearchKeyword] = useState({});
    return <EmpMgtContext.Provider value = {{searchkeyword, setSearchKeyword}}>{children}</EmpMgtContext.Provider>
}

export const EmpMgt = () => {
    return (
        <>
            <EmpMgtProvider>
            <ContentBox>인사관리</ContentBox>
            <EmpMgtSearch></EmpMgtSearch>
            <EmpMgtMain /> {/* 컴포넌트 이름을 대문자로 수정 */}
            
            </EmpMgtProvider>
                
        </>
    );
};
