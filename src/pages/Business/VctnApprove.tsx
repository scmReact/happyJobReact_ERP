import { VctnApproveProvider } from "../../api/provider/VctnApproveProvider";
import { ContentBox } from "../../component/common/ContentBox/ContentBox";
import { VctnApproveMain } from "../../component/page/Employee/VctnApprove/VctnApproveMain/VctnApproveMain";
import { VctnApproveSearch } from "../../component/page/Employee/VctnApprove/VctnApproveSearch/VctnApproveSearch";

export const VctnApprove = () => {
    return (
        <>
            <VctnApproveProvider>
                <ContentBox>근태관리</ContentBox>
                <VctnApproveSearch />
                <VctnApproveMain />
            </VctnApproveProvider>
        </>
    );
};
