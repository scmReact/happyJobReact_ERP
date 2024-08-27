import { ContentBox } from "../../component/common/ContentBox/ContentBox";
import { EmpGradeMain } from "../../component/page/Employee/EmpGrade/EmpGradeMain/EmpGradeMain";
import { EmpGradeSearch } from "../../component/page/Employee/EmpGrade/EmpGradeSearch/EmpGradeSearch";

export const EmpGrade = () => {
    return (
        <>
            <ContentBox>승진내역관리</ContentBox>
            <EmpGradeSearch></EmpGradeSearch>
            <EmpGradeMain></EmpGradeMain>
        </>
    );
}