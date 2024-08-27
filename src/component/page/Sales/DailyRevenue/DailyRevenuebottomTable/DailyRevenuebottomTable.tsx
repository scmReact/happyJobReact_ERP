import { useContext } from "react"
import { DailyRevenueChartContext } from "../../../../../api/provider/DailyRevenueChartProvider"
import { StyledTh, StyledTd } from "../../../../common/styled/StyledTable"
import { DailyRevenuebottomTableStyled } from "./styled"
import { formatWon } from "../../../../../common/formatWon"

export const DailyRevenuebottomTable = ()=>{
    const { totalAmount, totalUnpaid,  totalPayAmount, list} = useContext(DailyRevenueChartContext)
    
    return(
        <DailyRevenuebottomTableStyled>
            <table >
                <tbody>
                    <tr>
                        <StyledTh>총매출액</StyledTh>
                        <StyledTd id="totalAmountTd">{formatWon(totalAmount)}</StyledTd>
                    </tr>
                    <tr>
                        <StyledTh>총지출액</StyledTh>
                        <StyledTd id="totalPayAmountTd">{formatWon(totalPayAmount)}</StyledTd>
                    </tr>
                    <tr>
                        <StyledTh>총미수금액</StyledTh>
                        <StyledTd id="totalUnpaidTd">{formatWon(totalUnpaid)}</StyledTd>
                    </tr>
                    <tr>
                        <StyledTh>총순이익</StyledTh>
                        <StyledTd id="totalProfit">{formatWon(totalAmount - totalPayAmount)}</StyledTd>
                    </tr>
                </tbody>
            </table>
        </DailyRevenuebottomTableStyled>

    )
}