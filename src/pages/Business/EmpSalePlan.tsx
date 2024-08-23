import { ContentBox } from "../../component/common/ContentBox/ContentBox";
import { EmpSalePlanMain } from "../../component/page/Business/EmpSalePlan/EmpSalePlanMain/EmpSalePlanMain";
import { EmpSalePlanSearch } from "../../component/page/Business/EmpSalePlan/EmpSalePlanSearch/EmpSalePlanSearch";

export const EmpSalePlan = () => {
  return (
    <>
      <ContentBox>영업계획</ContentBox>
      <EmpSalePlanSearch></EmpSalePlanSearch>
      <EmpSalePlanMain></EmpSalePlanMain>
    </>
  );
};
