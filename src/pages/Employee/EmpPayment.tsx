import { EmpPaymentProvider } from "../../api/provider/EmpPaymentProvider"
import { ContentBox } from "../../component/common/ContentBox/ContentBox"
import { EmpPaymentMain } from "../../component/page/Employee/EmpPayment/EmpPaymentMain/EmpPaymentMain"
import { EmpPaymentSearch } from "../../component/page/Employee/EmpPayment/EmpPaymentSearch/EmpPaymentSearch"

export const Emppayment = () => {

    return (
        <>
        <EmpPaymentProvider>
            <ContentBox>급여관리</ContentBox>
            <EmpPaymentSearch></EmpPaymentSearch>
            <EmpPaymentMain></EmpPaymentMain>
        </EmpPaymentProvider>
        </>

    )

}