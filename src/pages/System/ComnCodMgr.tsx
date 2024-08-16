import { ConmCodProvider } from "../../api/provider/ComnCodMgrProvider";
import { ContentBox } from "../../component/common/ContentBox/ContentBox";
import { ComnCodMgrMain } from "../../component/page/System/ComnCodMgr/ComnCodMgrMain/ComnCodMgrMain";
import { ComnCodSearch } from "../../component/page/System/ComnCodMgr/ComnCodSearch/ComnCodSearch";

export const ComnCodMgr = () => {
    return (
        <>
            <ConmCodProvider>
                <ContentBox>공통코드 관리</ContentBox>
                <ComnCodMgrMain></ComnCodMgrMain>
                <ComnCodSearch></ComnCodSearch>
            </ConmCodProvider>
        </>
    );
};
