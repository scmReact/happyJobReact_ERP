
import { DailyRevenueSearchProvider } from "../../api/provider/DailyRevenueSearchProvider"
import { ContentBox } from "../../component/common/ContentBox/ContentBox"
import { DailyRevenueChart } from "../../component/page/Sales/DailyRevenue/DailyRevenueChart/DailyRevenueChart"
import { DailyRevenueDetail } from "../../component/page/Sales/DailyRevenue/DailyRevenueDetail/DailyRevenueDetail"
import { DailyRevenueSearch } from "../../component/page/Sales/DailyRevenue/DailyRevenueSearch/DailyRevenueSearch"

export const DailyRevenue = ()=>{
    return(
        <DailyRevenueSearchProvider>
            <ContentBox>일별 매출 현황</ContentBox>
            <DailyRevenueSearch/>
            <DailyRevenueChart/>
            <DailyRevenueDetail/>
        </DailyRevenueSearchProvider>
    )
}