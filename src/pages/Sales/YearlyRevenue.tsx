import { ContentBox } from "../../component/common/ContentBox/ContentBox"
import { YearlyRevenueMain } from "../../component/page/Sales/YearlyRevenue/YearlyMain/YearlyMain"
import { YearlyRevenueSearch } from "../../component/page/Sales/YearlyRevenue/YearlySearch/YearlySearch"

export const YearlyRevenue = ()=>{
    return(
        <>
            <ContentBox>년별 매출 현황</ContentBox>
            <YearlyRevenueSearch />
            <YearlyRevenueMain />
        </>
    )
}