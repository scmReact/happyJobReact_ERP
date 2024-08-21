import { EstMngProvider } from "../../api/provider/EstMngProvider";
import { ContentBox } from "../../component/common/ContentBox/ContentBox";
import { EstMngMain } from "../../component/page/Business/EstMng/EstMngMain/EstMngMain";
import { EstMngSearch } from "../../component/page/Business/EstMng/EstMngSearch/EstMngSearch";

export const EstMng = () => {
    return (
        <>
            <EstMngProvider>
                <EstMngSearch></EstMngSearch>
                <EstMngMain></EstMngMain>
            </EstMngProvider>
        </>
    );
};
