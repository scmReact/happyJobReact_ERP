import { AccSlipProvider } from "../../api/provider/AccSlipProvider";
import { ContentBox } from "../../component/common/ContentBox/ContentBox";
import { AccSlipSearch } from "../../component/page/Accounting/AccSlip/AcclipSearch/AccSlipSearch";
import { AccSlipMain } from "../../component/page/Accounting/AccSlip/AccSlipMain/AccSlipMain";

export const AccSlip = () => {
    return (
        <AccSlipProvider>
            <ContentBox>회계전표 조회</ContentBox>
            <AccSlipSearch />
            <AccSlipMain />
        </AccSlipProvider>
    );
};
