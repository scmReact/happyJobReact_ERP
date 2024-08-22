import { DailyRevenueChartProvider } from "../../api/provider/DailyRevenueChartProvider"
import { ContentBox } from "../../component/common/ContentBox/ContentBox"
import { DailyRevenuebottomTable } from "../../component/page/Sales/DailyRevenue/DailyRevenuebottomTable/DailyRevenuebottomTable"
import { DailyRevenueChart } from "../../component/page/Sales/DailyRevenue/DailyRevenueChart/DailyRevenueChart"

import { DailyRevenueSearch } from "../../component/page/Sales/DailyRevenue/DailyRevenueSearch/DailyRevenueSearch"
import { DailyRevenueTopTable } from "../../component/page/Sales/DailyRevenue/DailyRevenueTopTable/DailyRevenueTopTable"

export const DailyRevenue = ()=>{
    return(
        <DailyRevenueChartProvider>
            <ContentBox>일별 매출 현황</ContentBox>
            <DailyRevenueSearch/>
            <DailyRevenueTopTable/>
            <DailyRevenueChart/>
            <DailyRevenuebottomTable/>
        </DailyRevenueChartProvider>
    )
}