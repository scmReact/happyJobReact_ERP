import { ContentBox } from "../../component/common/ContentBox/ContentBox";
import { DisbursementMain } from "../../component/page/Accounting/Disbursement/DisbursementMain/DisbursementMain";
import { DisbursementSearch } from "../../component/page/Accounting/Disbursement/DisbursementSearch/DisbursementSearch";

export const Disbursement = () => {
    return (
        <>
            <ContentBox>지출결의서 조회 및 승인</ContentBox>
            <DisbursementSearch />
            <DisbursementMain />
        </>
    );
};
