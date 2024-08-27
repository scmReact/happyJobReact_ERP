import { FC, useEffect, useRef, useState } from "react";
import { Button } from "../../../../common/Button/Button";
import { StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { BizPartnerModalStyled, BizPartnerModalTableStyled } from "./styled";
import AddrModal from "../AddrModal/AddrModal";
import axios, { AxiosResponse } from "axios";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";

export interface IBizPartnerModalProps {
    bizPartnerSearch: () => void;
    custId?: number;
}

export interface IIndustryCode {
    detail_code:string,
    detail_name:string
}

export interface IIndustryCodeListResponse {
    bizPartnerIndustryCode: IIndustryCode[];
}

export interface IBankCode {
    detail_code:string,
    detail_name:string
}

export interface IBankCodeListResponse {
    bizPartnerBankCode: IBankCode[];
}

export interface IBizPartnerResponse {
    result : "Success";
}

export interface IBizPartnerDetailJsonResponse {
    bizPartnerDetail: ICustDetail;
}

export interface ICustDetail {
    custName: string;
    custPh: string;
    custPerson : string;
    custPersonPh: string;
    custZip: string;
    custAddr: string;
    custDetailAddr: string;
    bizNum: string;
    custEmail: string;
    industryCode: string;
    bankCode: string;
    custAccount: string;
    custMemo: string;
}

export const BizPartnerModal:FC<IBizPartnerModalProps> = ( {custId, bizPartnerSearch} ) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const custZip = useRef<HTMLInputElement>(null);
    const custAddr = useRef<HTMLInputElement>(null);
    const custDetailAddr = useRef<HTMLInputElement>(null);
    const [industryCode, setIndustryCode] = useState<IIndustryCode[]>([]);
    const [selectedIndustryCode, setSelectedIndustryCode] = useState<string>('');
    const [bankCode, setBankCode] = useState<IBankCode[]>([]);
    const [selectedBankCode, setSelectedBankCode] = useState<string>('');
    const custName = useRef<HTMLInputElement>(null);
    const [custPhPre, setCustPhPre] = useState<string>('');
    const [custPhMid, setCustPhMid] = useState<string>('');
    const [custPhSuf, setCustPhSuf] = useState<string>('');
    const custPerson = useRef<HTMLInputElement>(null);
    const [custPersonPhPre, setCustPersonPhPre] = useState<string>('');
    const [custPersonPhMid, setCustPersonPhMid] = useState<string>('');
    const [custPersonPhSuf, setCustPersonPhSuf] = useState<string>('');
    const [custEmail, setCustEmail] = useState<string>('');
    const [bizNum, setBizNum] = useState<string>('');
    const [custAccount, setCustAccount] = useState<string>('');
    const custMemo = useRef<HTMLTextAreaElement>(null);
    const [custDetail, setCustDetail] = useState<ICustDetail>(); 

    const industryCodeList = () => {
        axios.post('/business/bizPartnerIndustryCodeJson.do', {}).then((res:AxiosResponse<IIndustryCodeListResponse>) => {
            setIndustryCode(res.data.bizPartnerIndustryCode);
        })
    }

    const bankCodeList = () => {
        axios.post('/business/bizPartnerBankCodeJson.do', {}).then((res:AxiosResponse<IBankCodeListResponse>) => {
            setBankCode(res.data.bizPartnerBankCode);
        })
    }

    useEffect(() => { industryCodeList(); bankCodeList(); handlerDetail(); },[])

    // 전화번호, 사업자등록번호, 계좌번호 형식
    const handlerTel = (part: 'custPhPre' | 'custPhMid' | 'custPhSuf' | 'custPersonPhPre' | 'custPersonPhMid' | 'custPersonPhSuf' | 'bizNum' | 'custAccount') => 
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const input = event.target as HTMLInputElement;
            input.value = input.value.replace(/[^0-9]/g, '');

            switch (part) {
                case 'custPhPre':
                    setCustPhPre(input.value);
                    break;
                case 'custPhMid':
                    setCustPhMid(input.value);
                    break;
                case 'custPhSuf':
                    setCustPhSuf(input.value);
                    break;
                case 'custPersonPhPre':
                    setCustPersonPhPre(input.value);
                    break;
                case 'custPersonPhMid':
                    setCustPersonPhMid(input.value);
                    break;
                case 'custPersonPhSuf':
                    setCustPersonPhSuf(input.value);
                    break;
                case 'bizNum':
                    setBizNum(input.value);
                    break;
                case 'custAccount':
                    setCustAccount(input.value);
                    break;
            }
    };

    // 이메일 형식
    const emailRules = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    function emailChk(custEmail:string):boolean{
        if(!emailRules.test(custEmail)){
            alert('이메일 형식을 확인해주세요.');
            return false;
        } else {
            return true;
        }
    }

    const closeModal = () => {
        setModal(!modal);
    }

    const validChk = (buttonId:string) => {
        if(!custName.current?.value){
            alert('업체명을 입력해 주세요.');
            return;
        } 
        if(custPhPre.trim() === '' || custPhMid.trim() === '' || custPhSuf.trim() === ''){
            alert('회사 전화번호를 입력해 주세요.');
            return;
        }
        if(!custPerson.current?.value){
            alert('담당자를 입력해 주세요.');
            return;
        }
        if(!custZip.current?.value || !custAddr.current?.value){
            alert('회사 주소를 입력해 주세요.');
            return;
        }
        if(custEmail.trim() === ''){
            alert('이메일을 입력해 주세요.');
            return;
        }
        if(!emailChk(custEmail)){
            return;
        }
        if(selectedIndustryCode === '' || selectedIndustryCode === null){
            alert('업종을 선택해 주세요.');
            return;
        }
        if(bizNum.trim() === '' ){
            alert('사업자 등록번호를 입력해 주세요.');
            return;
        }
        if(selectedBankCode === '' || selectedBankCode === null){
            alert('은행을 선택해 주세요.');
            return;
        }
        if(custAccount === ''){
            alert('계좌번호를 입력해 주세요.');
            return;
        }
        if(buttonId === 'insert'){
            if(window.confirm('신규 거래처를 등록하시겠습니까?')){
                handlerSave();
            } else {
                alert('등록을 취소하였습니다.');
            }
        }
        if(buttonId === 'update'){
            if(window.confirm('수정하시겠습니까?')){
                handlerUpdate();
            } else {
                alert('수정을 취소하였습니다.');
            }
        }
    }

    const handlerSave = () => {
        axios.post('/business/bizPartnerInsertJson.do', 
            {
                custName: custName.current?.value,
                custPhPre,
                custPhMid,
                custPhSuf,
                custPerson: custPerson.current?.value,
                custPersonPhPre,
                custPersonPhMid,
                custPersonPhSuf,
                custZip:custZip.current?.value,
                custAddr: custAddr.current?.value,
                custDetailAddr: custDetailAddr.current?.value,
                bizNum,
                custEmail,
                industryCode : selectedIndustryCode,
                bankCode: selectedBankCode,
                custAccount,
                custMemo: custMemo.current?.value,
            }
        ).then((res:AxiosResponse<IBizPartnerResponse>) => {
            if(res.data.result === "Success") {
                alert('신규 거래처가 등록되었습니다.');
                closeModal();
                bizPartnerSearch();
            } else {
                alert('등록에 실패하였습니다. 관리자에게 문의하세요.');
            }
        })
    };

    const handlerDetail = () => {
        axios.post('/business/bizPartnerDetailJson.do', { custId }).then((res:AxiosResponse<IBizPartnerDetailJsonResponse>) => {
            setCustDetail(res.data.bizPartnerDetail);
            if(res.data.bizPartnerDetail?.custPh){
                setCustPhPre(res.data.bizPartnerDetail.custPh.split('-')[0]);
                setCustPhMid(res.data.bizPartnerDetail.custPh.split('-')[1]);
                setCustPhSuf(res.data.bizPartnerDetail.custPh.split('-')[2]);
            }
            if(res.data.bizPartnerDetail?.custPersonPh){
                setCustPersonPhPre(res.data.bizPartnerDetail.custPersonPh.split('-')[0]);
                setCustPersonPhMid(res.data.bizPartnerDetail.custPersonPh.split('-')[1]);
                setCustPersonPhSuf(res.data.bizPartnerDetail.custPersonPh.split('-')[2]);
            }
            if(res.data.bizPartnerDetail?.custEmail){
                setCustEmail(res.data.bizPartnerDetail.custEmail);
            }
            if(res.data.bizPartnerDetail?.industryCode){
                setSelectedIndustryCode(res.data.bizPartnerDetail.industryCode);
            }
            if(res.data.bizPartnerDetail?.bizNum){
                setBizNum(res.data.bizPartnerDetail.bizNum);
            }
            if(res.data.bizPartnerDetail?.bankCode){
                setSelectedBankCode(res.data.bizPartnerDetail.bankCode);
            }
            if(res.data.bizPartnerDetail?.custAccount){
                setCustAccount(res.data.bizPartnerDetail.custAccount);
            }
        })
    }

    const handlerUpdate = () => {
        axios.post('/business/updateBizPartnerJson.do', 
            {
                custId,
                custName: custName.current?.value,
                custPhPre,
                custPhMid,
                custPhSuf,
                custPerson: custPerson.current?.value,
                custPersonPhPre,
                custPersonPhMid,
                custPersonPhSuf,
                custZip:custZip.current?.value,
                custAddr: custAddr.current?.value,
                custDetailAddr: custDetailAddr.current?.value,
                bizNum,
                custEmail,
                industryCode : selectedIndustryCode,
                bankCode: selectedBankCode,
                custAccount,
                custMemo: custMemo.current?.value,
            }).then((res:AxiosResponse<IBizPartnerResponse>) => {
                if(res.data.result === 'Success'){
                    alert('수정되었습니다.');
                    closeModal();
                    bizPartnerSearch();
                } else {
                    alert('수정 중 오류가 발생하였습니다. 관리자에게 문의하세요.');
                }
            })
    }

    const handlerDelete = () => {
        if(window.confirm('해당 거래처를 삭제하시겠습니까?')){
            axios.post('/business/deleteBizPartnerJson.do', { custId }).then((res:AxiosResponse<IBizPartnerResponse>) => {
                if(res.data.result === 'Success'){
                    alert('삭제되었습니다.');
                    closeModal();
                    bizPartnerSearch();
                } else {
                    alert('삭제 중 오류가 발생하였습니다. 관리자에게 문의하세요.');
                }
            });
        } else {
            alert('삭제를 취소하였습니다.');
        }
    }

    return (
        <>
            <BizPartnerModalStyled isOpen={true} ariaHideApp={false}>
                <div className="wrap">
                    <div className="header">
                        거래처 등록
                    </div>
                    <BizPartnerModalTableStyled>
                        <thead></thead>
                        <tbody>
                            <tr>
                                <StyledTh>업체명<span className="font_red">*</span></StyledTh>
                                <StyledTd>
                                    <input type="text" ref={custName} defaultValue={custDetail?.custName}></input>
                                </StyledTd>
                                <StyledTh>회사전화<span className="font_red">*</span></StyledTh>
                                <StyledTd>
                                    <input type="text" className="width_75" value={custPhPre} onChange={handlerTel("custPhPre")}></input>
                                    -
                                    <input type="text" className="width_75" value={custPhMid} onChange={handlerTel("custPhMid")}></input>
                                    -
                                    <input type="text" className="width_75" value={custPhSuf} onChange={handlerTel("custPhSuf")}></input>
                                </StyledTd>
                            </tr>
                            <tr>
                                <StyledTh>담당자<span className="font_red">*</span></StyledTh>
                                <StyledTd>
                                    <input type="text" ref={custPerson} defaultValue={custDetail?.custPerson}></input>
                                </StyledTd>
                                <StyledTh>휴대전화</StyledTh>
                                <StyledTd>
                                    <input type="text" className="width_75" defaultValue={custPersonPhPre} onChange={handlerTel("custPersonPhPre")}></input>
                                    -
                                    <input type="text" className="width_75" defaultValue={custPersonPhMid} onChange={handlerTel("custPersonPhMid")}></input>
                                    -
                                    <input type="text" className="width_75" defaultValue={custPersonPhSuf} onChange={handlerTel("custPersonPhSuf")}></input>
                                </StyledTd>
                            </tr>
                            <tr>
                                <StyledTh rowSpan={3}>주소<span className="font_red">*</span></StyledTh>
                                <StyledTd colSpan={3}>
                                    <AddrModal
                                        zipCodeRef={custZip}
                                        addressRef={custAddr}
                                    ></AddrModal>
                                    <input type="text" className="width_120" ref={custZip} defaultValue={custDetail?.custZip} readOnly></input>
                                </StyledTd>
                            </tr>
                            <tr>
                                <StyledTd colSpan={3}>
                                    <input type="text" ref={custAddr} defaultValue={custDetail?.custAddr} readOnly></input>
                                </StyledTd>
                            </tr>
                            <tr>
                                <StyledTd colSpan={3}>
                                    <input type="text" ref={custDetailAddr} defaultValue={custDetail?.custDetailAddr}></input>
                                </StyledTd>
                            </tr>
                            <tr>
                                <StyledTh>이메일<span className="font_red">*</span></StyledTh>
                                <StyledTd colSpan={3}>
                                    <input type="text" defaultValue={custEmail} onChange={(e) => setCustEmail(e.target.value)}></input>
                                </StyledTd>
                            </tr>
                            <tr>
                                <StyledTh>업종<span className="font_red">*</span></StyledTh>
                                <StyledTd colSpan={3}>
                                    <select value={selectedIndustryCode || custDetail?.industryCode} onChange={(e) => setSelectedIndustryCode(e.target.value)}>
                                        <option value="">선택</option>
                                        {industryCode.map((industryCode) => {
                                            return (
                                                <option key={industryCode.detail_code} value={industryCode.detail_code}>{industryCode.detail_name}</option>
                                            )
                                        })}
                                    </select>
                                </StyledTd>
                            </tr>
                            <tr>
                                <StyledTh>사업자 등록번호<span className="font_red">*</span></StyledTh>
                                <StyledTd colSpan={3}>
                                    <input type="text" placeholder="'-'빼고 입력해주세요." defaultValue={custDetail?.bizNum} onChange={handlerTel("bizNum")}></input>
                                </StyledTd>
                            </tr>
                            <tr>
                                <StyledTh>은행<span className="font_red">*</span></StyledTh>
                                <StyledTd>
                                    <select value={selectedBankCode || custDetail?.bankCode} onChange={(e) => setSelectedBankCode(e.target.value)}>
                                        <option value="">선택</option>
                                        {bankCode.map((bankCode) => {
                                            return(
                                                <option key={bankCode.detail_code} value={bankCode.detail_code}>{bankCode.detail_name}</option>
                                            )
                                        })}
                                    </select>
                                </StyledTd>
                                <StyledTh>계좌번호<span className="font_red">*</span></StyledTh>
                                <StyledTd>
                                    <input type="text" placeholder="'-'빼고 입력해주세요." defaultValue={custDetail?.custAccount} onChange={handlerTel("custAccount")}></input>
                                </StyledTd>
                            </tr>
                            <tr>
                                <StyledTh>메모</StyledTh>
                                <StyledTd colSpan={3}>
                                    <textarea className="memo" ref={custMemo} defaultValue={custDetail?.custMemo}></textarea>
                                </StyledTd>
                            </tr>
                        </tbody>
                    </BizPartnerModalTableStyled>
                    <div className ="btn-group">
                        { !custId ? <Button onClick={ () => {validChk("insert")}}>저장</Button> : 
                            <>
                                <Button onClick={ () => {validChk("update")} }>수정</Button>
                                <Button onClick={handlerDelete}>삭제</Button>
                            </>
                        }
                        <Button onClick={closeModal}>취소</Button>
                    </div>
                </div>
            </BizPartnerModalStyled>
        </>
    )
};