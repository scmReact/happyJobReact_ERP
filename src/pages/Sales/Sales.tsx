import { ContentBox } from "../../component/common/ContentBox/ContentBox"
import { MonthlyRevenueMain } from "../../component/page/Sales/MonthlyRevenue/MonthlyRevenueMain"
import { MonthlyRevenueSearch } from "../../component/page/Sales/MonthlyRevenueSearch/MonthlyRevenueSearch"

export const Sales = () => {
    return(
        <>
            <ContentBox>월별 매출 현황</ContentBox>
            <MonthlyRevenueSearch />
            <MonthlyRevenueMain />
        </>
    )
}