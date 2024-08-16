import { UnpaidProvider } from "../../api/provider/UnpaidProvider";
import { UnpaidMain } from "../../component/page/Accounting/Unpaid/UnpaidMain/UnpaidMain";
import { UnpaidSearch } from "../../component/page/Accounting/Unpaid/UnpaidSearch/UnpaidSearch";

export const Unpaid = () => {
    return (
        <>
            <UnpaidProvider>
                <UnpaidSearch></UnpaidSearch>
                <UnpaidMain></UnpaidMain>
            </UnpaidProvider>
        </>
    );
};
