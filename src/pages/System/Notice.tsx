import { ContentBox } from "../../component/common/ContentBox/ContentBox";
import { NoticeMain } from "../../component/page/System/Notice/NoticeMain/NoticeMain";
import { NoticeSearch } from "../../component/page/System/Notice/NoticeSearch/NoticeSearch";

export const Notice = () => {
    return (
        <>
            <ContentBox>공지사항</ContentBox>
            <NoticeSearch />
            <NoticeMain />
        </>
    );
};
