import { ContentBox } from "../../../component/common/ContentBox/ContentBox";
import { EmpSalePlanMain } from "../../../component/page/Business/EmpSalePlanMain/EmpSalePlanMain";
import { EmpSalePlanModal } from "../../../component/page/Business/EmpSalePlanModal/EmpSalePlanModal";
import { EmpSalePlanSearch } from "../../../component/page/Business/EmpSalePlanSearch/EmpSalePlanSearch";

export const EmpSalePlan = () => {
  return (
    <>
      <ContentBox>영업계획</ContentBox>
      <EmpSalePlanSearch></EmpSalePlanSearch>
      <EmpSalePlanMain></EmpSalePlanMain>
    </>
  );
};
