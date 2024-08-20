import { useLocation } from "react-router-dom";
import { Button } from "../../../../common/Button/Button";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { BizPartnerSearch } from "../BizPartnerSearch/BizPartnerSearch";
import { BizPartnerMainStyled } from "./styled";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { Protal } from "../../../../common/potal/Portal";
import { BizPartnerModal } from "../BizPartnerModal/BizPartnerModal";

export interface IBizPartnerList {
    custId: number;
    regDate: string;
    custName: string;
    custAddr: string;
    custDetailAddr: string;
    custPerson: string;
    custPh: string;
    custPersonPh: string;
    custEmail: string;
}

export interface IBizPartnerListResponse {
    bizPartnerList: IBizPartnerList[];
    bizPartnerCnt: number;
}

export const BizPartnerMain = () => {
    const { search } = useLocation();
    const [bizPartnerList, setBizPartnerList] = useState<IBizPartnerList[]>([]);
    const [bizPartnerCnt, setBizPartnerCnt] = useState<number>(0);
    const [currentParam, setCurrentParam] = useState<number | undefined>();
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [custId, setCustId] = useState<number>();

    const bizPartnerSearch = (cpage?: number) => {
        cpage = cpage || 1;
        const searchParam = new URLSearchParams(search);

        searchParam.append('currentPage', cpage.toString());
        searchParam.append('pageSize', '10');

        axios.post('/business/bizPartnerListJson.do', searchParam).then((res: AxiosResponse<IBizPartnerListResponse>) => {
            setBizPartnerList(res.data.bizPartnerList);
            setBizPartnerCnt(res.data.bizPartnerCnt);
            setCurrentParam(cpage);
        })
    }

    useEffect(() => {(bizPartnerSearch())},[search])

    const bizPartnerModal = (custId ? : number) => {
        setCustId(custId);
        setModal(!modal);
    }

    return(
        <>
            <BizPartnerMainStyled>
                <div className="btn">
                    <Button onClick={bizPartnerModal}>거래처 신규 등록</Button>
                </div>
                <BizPartnerSearch></BizPartnerSearch>
            </BizPartnerMainStyled>
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh>날짜</StyledTh>
                        <StyledTh>거래처</StyledTh>
                        <StyledTh>주소</StyledTh>
                        <StyledTh>담당자</StyledTh>
                        <StyledTh>전화번호</StyledTh>
                        <StyledTh>핸드폰번호</StyledTh>
                        <StyledTh>이메일</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {bizPartnerList.map((a) => {
                        const formattedDate = new Date(a.regDate).toLocaleDateString(); // timestamp를 날짜 형식으로 변환
                        return(
                            <tr key = {a.custId} onClick={() => {bizPartnerModal(a.custId)}}>
                                <StyledTd>{a.regDate ? formattedDate : null}</StyledTd>
                                <StyledTd>{a.custName}</StyledTd>
                                <StyledTd>{a.custAddr} {a.custDetailAddr}</StyledTd>
                                <StyledTd>{a.custPerson}</StyledTd>
                                <StyledTd>{a.custPh}</StyledTd>
                                <StyledTd>{a.custPersonPh}</StyledTd>
                                <StyledTd>{a.custEmail}</StyledTd>
                            </tr>
                        )
                    })}
                </tbody>
            </StyledTable>
            <PageNavigate
                totalItemsCount={bizPartnerCnt}
                onChange={bizPartnerSearch}
                itemsCountPerPage={5}
                activePage={currentParam as number}
            ></PageNavigate>
            <Protal>
                {modal ? <BizPartnerModal custId={custId} bizPartnerSearch = {bizPartnerSearch}/> : null}
            </Protal>
        </>
    )
};