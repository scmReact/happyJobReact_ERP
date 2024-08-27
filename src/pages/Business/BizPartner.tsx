import { Button } from "../../component/common/Button/Button";
import { ContentBox } from "../../component/common/ContentBox/ContentBox";
import { BizPartnerMain } from "../../component/page/Business/BizPartner/BizPartnerMain/BizPartnerMain";
import { BizPartnerSearch } from "../../component/page/Business/BizPartner/BizPartnerSearch/BizPartnerSearch";

export const BizPartner = () => {
    return (
        <>
            <ContentBox>거래처 관리</ContentBox>
            <BizPartnerMain/>
        </>
    )
};