import { ContentBox } from "../../component/common/ContentBox/ContentBox";
import { DisbApplyMain } from "../../component/page/Accounting/DisbApply/DisbApplyMain";
import { DisbApplySearch } from "../../component/page/Accounting/DisbApply/DisbApplySearch";

export const DisbApply = () => {
    return (
        <>
            <ContentBox>지출결의서 조회 및 신청</ContentBox>
            <DisbApplySearch />
            <DisbApplyMain />
        </>
    );
};
