import { ContentBox } from "../../component/common/ContentBox/ContentBox"
import { VctnCalendarMain } from "../../component/page/Employee/VctnCalendar/VctnCalendarMain/VctnCalendarMain"

export const VctnCalendar = ()=>{
    return(
        
        <>
            <ContentBox>근태현황조회</ContentBox>
            <br/>
            <VctnCalendarMain/>
        </>

    )
}