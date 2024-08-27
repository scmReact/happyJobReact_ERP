import { ContentBox } from "../../component/common/ContentBox/ContentBox";
import { BmSalePlanMain } from "../../component/page/Business/BmSalePlan/BmSalePlanMain/BmSalePlanMain";
import { BmSalePlanSearch } from "../../component/page/Business/BmSalePlan/BmSalePlanSearch/BmSalePlanSearch";

export const BmSalePlan = () => {
  return (
    <>
      <ContentBox>영업실적조회</ContentBox>
      <BmSalePlanSearch></BmSalePlanSearch>
      <BmSalePlanMain></BmSalePlanMain>
    </>
  );
};
