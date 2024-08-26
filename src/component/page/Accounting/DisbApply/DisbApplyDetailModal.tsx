import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { DisbApplyModalStyled } from "./styled";
import { StyledTable, StyledTd, StyledTh } from "../../../common/styled/StyledTable";
import { Button } from "../../../common/Button/Button";
import NoImage from "../../../../assets/noImage.jpg";
import { TypeNullCheck, nullCheck } from "../../../../common/nullCheck";
import {
    IDisbApplyDetailModal,
    IDisbApplyDetailModalResponse,
    IUserInfo,
    IUserInfoResponse,
    ICommonList,
    ICommonListResponse,
    ICustList,
    ICustListResponse,
    IPostResponse,
} from "../../../../models/interface/Accounting/DisbApply";

export interface IDisbApplyDetailModalProps {
    resoNum?: number;
    onSuccess: () => void;
    setResoNum: (resoNum: undefined) => void;
}

export const DisbApplyDetailModal: FC<IDisbApplyDetailModalProps> = ({ resoNum, onSuccess, setResoNum }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [disbApplyDetail, setDisbApplyDetail] = useState<IDisbApplyDetailModal>();
    const [userInfo, setUserInfo] = useState<IUserInfo>();
    const seq = useRef<HTMLInputElement>(null); // 결의번호
    const aDate = useRef<HTMLInputElement>(null); // 신청일자
    const uDate = useRef<HTMLInputElement>(null); // 사용일자
    const id = useRef<HTMLInputElement>(null); // 사번
    const name = useRef<HTMLInputElement>(null); // 사원명
    const aDept = useRef<HTMLInputElement>(null); // 사용부서
    const grCodeNm = useRef<HTMLSelectElement>(null); // 계정대분류명
    const acctCodeNm = useRef<HTMLSelectElement>(null); // 계정과목
    const custName = useRef<HTMLSelectElement>(null); // 거래처명
    const amount = useRef<HTMLInputElement>(null); // 결의금액
    const apprYn = useRef<HTMLInputElement>(null); // 승인여부
    const apprDate = useRef<HTMLInputElement>(null); // 승인일자
    const content = useRef<HTMLTextAreaElement>(null); // 비고
    const [imageUrl, setImageUrl] = useState<string>("notImage");
    const [fileData, setFileData] = useState<File>();
    const [applyDate, setApplyDate] = useState<string>();
    const [applyId, setApplyId] = useState<string>();
    const [applyName, setApplyName] = useState<string>();
    const [applyDept, setApplyDept] = useState<string>();
    const [commonList, setCommonList] = useState<ICommonList[]>([]);
    const [custList, setCustList] = useState<ICustList[]>([]);
    const [selected, setSelected] = useState<string>("");

    useEffect(() => {
        console.log("useeffect: " + resoNum);
        searchCustList();
        searchUserInfo();
        if (resoNum) {
            searchDetail();
        }

        return () => {
            setResoNum(undefined);
        };
    }, []);

    const searchDetail = () => {
        const param = new URLSearchParams();
        if (resoNum) {
            param.append("resoNum", resoNum.toString() as string);
        } else {
            setResoNum(undefined);
        }

        axios.post("/accounting/disbDetailJson", param).then((res: AxiosResponse<IDisbApplyDetailModalResponse>) => {
            if (res.data.disbDetail) {
                if (res.data.disbDetail.disbContent === "") {
                    setDisbApplyDetail(undefined);
                }
                setDisbApplyDetail(res.data.disbDetail);
                setApplyDate(res.data.disbDetail.applyDate);
                setApplyId(res.data.disbDetail.applyId);
                setApplyName(res.data.disbDetail.applyName);
                setApplyDept(res.data.disbDetail.applyDept);
                const fileExt = res.data.disbDetail.fileExt;
                if (fileExt === "jpg" || fileExt === "gif" || fileExt === "png") {
                    setImageUrl(res.data.disbDetail.logicalPath || NoImage);
                } else {
                    setImageUrl("notImage");
                }
            }
        });
    };

    const handlerSave = () => {
        const fileForm = new FormData();
        const textData = {
            resoNum: seq.current?.value,
            applyDate: aDate.current?.value,
            useDate: uDate.current?.value,
            loginId: id.current?.value,
            selAcctCode: acctCodeNm.current?.value,
            custId: custName.current?.value,
            amount: amount.current?.value,
            apprYn: apprYn.current?.value,
            apprDate: apprDate.current?.value,
            disbContent: content.current?.value,
        };

        // 필수값 체크
        const checklist: TypeNullCheck[] = [
            { inval: textData.useDate, msg: "사용일자를 선택해주세요" },
            { inval: grCodeNm.current?.value, msg: "계정대분류명을 선택해주세요" },
            { inval: textData.selAcctCode, msg: "계정과목을 선택해주세요" },
            { inval: textData.custId, msg: "거래처명을 선택해주세요" },
            { inval: textData.amount, msg: "결의금액을 선택해주세요" },
        ];
        if (!nullCheck(checklist)) {
            return;
        }
        if (fileData) fileForm.append("file", fileData);
        fileForm.append("text", new Blob([JSON.stringify(textData)], { type: "application/json" }));
        axios.post("/accounting/saveDisbJson.do", fileForm).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "Success") {
                onSuccess();
            }
        });
    };

    // 파일 미리보기
    const handlerFile = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInfo = e.target.files;
        if (fileInfo?.length) {
            const fileInfoSplit = fileInfo[0].name.split(".");
            const fileExtension = fileInfoSplit[1].toLowerCase();

            if (fileExtension === "jpg" || fileExtension === "gif" || fileExtension === "png") {
                setImageUrl(URL.createObjectURL(fileInfo[0]));
            } else {
                setImageUrl("notImage");
            }
            setFileData(fileInfo[0]);
        }
    };

    const downLoadFile = async () => {
        let param = new URLSearchParams();
        param.append("resoNum", resoNum?.toString() as string);

        const postAction: AxiosRequestConfig = {
            url: "/accounting/disbDownload.do",
            method: "POST",
            data: param,
            responseType: "blob",
        };

        await axios(postAction).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", disbApplyDetail?.eviMaterial as string);
            document.body.appendChild(link);
            link.click();

            link.remove();
        });
    };

    const fomatDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    const searchUserInfo = () => {
        axios.post("/accounting/userInfoJson").then((res: AxiosResponse<IUserInfoResponse>) => {
            if (res.data.userInfo) {
                setUserInfo(res.data.userInfo);
            }
        });
    };

    const searchCommonList = (selected?: string) => {
        const param = new URLSearchParams();
        param.append("selectAccGrpCod", selected?.toString() as string);

        axios.post("/accounting/commonListJson", param).then((res: AxiosResponse<ICommonListResponse>) => {
            setCommonList(res.data.commonList);
        });
    };

    const searchCustList = () => {
        const param = new URLSearchParams();
        axios.post("/accounting/custListJson", param).then((res: AxiosResponse<ICustListResponse>) => {
            setCustList(res.data.custList);
        });
    };

    const handlerGrCodeNmSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value);
        searchCommonList(e.target.value);
    };

    return (
        <>
            <DisbApplyModalStyled isOpen={modal} ariaHideApp={false}>
                <div className="wrap">
                    <div className="header">{resoNum ? "지출결의서 상세" : "지출결의서 신청"}</div>
                    <StyledTable>
                        <tbody>
                            <tr>
                                <StyledTh size={15}>결의번호</StyledTh>
                                <StyledTd>
                                    <input
                                        type="text"
                                        defaultValue={disbApplyDetail?.resoNum}
                                        ref={seq}
                                        style={{ background: "#e3e6e6" }}
                                        disabled
                                    />
                                </StyledTd>
                                <StyledTh size={15}>신청일자</StyledTh>
                                <StyledTd>
                                    <input
                                        type="date"
                                        value={applyDate == null ? fomatDate() : applyDate}
                                        ref={aDate}
                                        style={{ background: "#e3e6e6" }}
                                        disabled
                                    />
                                </StyledTd>
                                <StyledTh size={15}>
                                    사용일자<span className="font_red">*</span>
                                </StyledTh>
                                <StyledTd>
                                    <input
                                        type="date"
                                        defaultValue={disbApplyDetail?.useDate}
                                        ref={uDate}
                                        style={
                                            resoNum === undefined
                                                ? { width: 100 }
                                                : { width: 100, background: "#e3e6e6" }
                                        }
                                        disabled={resoNum !== undefined}
                                    />
                                </StyledTd>
                            </tr>
                            <tr>
                                <StyledTh size={15}>사번</StyledTh>
                                <StyledTd>
                                    <input
                                        type="text"
                                        value={applyId == null ? userInfo?.loginId : applyId}
                                        ref={id}
                                        style={{ background: "#e3e6e6" }}
                                        disabled
                                    />
                                </StyledTd>
                                <StyledTh size={15}>사원명</StyledTh>
                                <StyledTd>
                                    <input
                                        type="text"
                                        value={applyName == null ? userInfo?.name : applyName}
                                        ref={name}
                                        style={{ background: "#e3e6e6" }}
                                        disabled
                                    />
                                </StyledTd>
                                <StyledTh size={15}>사용부서</StyledTh>
                                <StyledTd>
                                    <input
                                        type="text"
                                        value={applyDept == null ? userInfo?.deptName : applyDept}
                                        ref={aDept}
                                        style={{ background: "#e3e6e6" }}
                                        disabled
                                    />
                                </StyledTd>
                            </tr>
                            <tr>
                                <StyledTh size={15}>
                                    계정대분류명<span className="font_red">*</span>
                                </StyledTh>
                                <StyledTd>
                                    {!resoNum ? (
                                        <select
                                            value={selected}
                                            onChange={handlerGrCodeNmSelect}
                                            style={{ width: 120 }}
                                            ref={grCodeNm}
                                        >
                                            <option value={""} disabled>
                                                선택
                                            </option>
                                            <option value={"acc_sales_code"}>매출</option>
                                            <option value={"acc_sell_admin_code"}>판매관리비</option>
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            value={disbApplyDetail?.grCodeNm}
                                            style={{ background: "#e3e6e6" }}
                                            disabled
                                        />
                                    )}
                                </StyledTd>
                                <StyledTh size={15}>
                                    계정과목<span className="font_red">*</span>
                                </StyledTh>
                                <StyledTd>
                                    {!resoNum ? (
                                        <select ref={acctCodeNm} style={{ width: 120 }}>
                                            <option value={""} disabled selected>
                                                선택
                                            </option>
                                            {commonList.map((a) => {
                                                return <option value={a.dtl_cod}>{a.dtl_cod_nm}</option>;
                                            })}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            defaultValue={disbApplyDetail?.acctCodeNm}
                                            style={{ background: "#e3e6e6" }}
                                            disabled
                                        />
                                    )}
                                </StyledTd>
                                <StyledTh size={15}>
                                    거래처명<span className="font_red">*</span>
                                </StyledTh>
                                <StyledTd>
                                    {!resoNum ? (
                                        <select ref={custName} style={{ width: 120 }}>
                                            {custList.map((a) => {
                                                return <option value={a.custId}>{a.custName}</option>;
                                            })}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            defaultValue={disbApplyDetail?.custName}
                                            style={{ background: "#e3e6e6" }}
                                            disabled
                                        />
                                    )}
                                </StyledTd>
                            </tr>
                            <tr>
                                <StyledTh size={15}>
                                    결의금액<span className="font_red">*</span>
                                </StyledTh>
                                <StyledTd>
                                    <input
                                        type="text"
                                        defaultValue={disbApplyDetail?.amount.toLocaleString()}
                                        ref={amount}
                                        style={
                                            resoNum === undefined
                                                ? { width: 100 }
                                                : { width: 100, background: "#e3e6e6" }
                                        }
                                        disabled={resoNum !== undefined}
                                    />
                                </StyledTd>
                                <StyledTh size={15}>승인여부</StyledTh>
                                <StyledTd>
                                    <input
                                        type="text"
                                        value={
                                            disbApplyDetail?.apprYn === "W"
                                                ? "승인대기"
                                                : disbApplyDetail?.apprYn === "Y"
                                                ? "승인"
                                                : disbApplyDetail?.apprYn === "N"
                                                ? "반려"
                                                : ""
                                        }
                                        ref={apprYn}
                                        style={{ background: "#e3e6e6" }}
                                        disabled
                                    />
                                </StyledTd>
                                <StyledTh size={15}>승인일자</StyledTh>
                                <StyledTd>
                                    <input
                                        type="date"
                                        defaultValue={disbApplyDetail?.apprDate}
                                        ref={apprDate}
                                        style={{ background: "#e3e6e6" }}
                                        disabled
                                    />
                                </StyledTd>
                            </tr>
                            <tr>
                                <StyledTh size={15}>첨부파일</StyledTh>
                                <StyledTd colSpan={6}>
                                    <input
                                        type="file"
                                        defaultValue={disbApplyDetail?.fileSize}
                                        disabled={resoNum !== undefined}
                                        onChange={handlerFile}
                                    />
                                </StyledTd>
                            </tr>
                            <tr>
                                <StyledTh size={15}>미리보기</StyledTh>
                                <StyledTd colSpan={6}>
                                    <div onClick={downLoadFile}>
                                        {imageUrl === "notImage" ? (
                                            <div>{fileData?.name || disbApplyDetail?.eviMaterial}</div>
                                        ) : (
                                            <div>
                                                <img src={imageUrl} width={150} height={150} />
                                            </div>
                                        )}
                                    </div>
                                </StyledTd>
                            </tr>
                            <tr>
                                <StyledTh size={15}>비고</StyledTh>
                                <StyledTd colSpan={6}>
                                    <textarea
                                        defaultValue={disbApplyDetail?.disbContent}
                                        style={resoNum === undefined ? {} : { background: "#e3e6e6" }}
                                        disabled={resoNum !== undefined}
                                        ref={content}
                                    />
                                </StyledTd>
                            </tr>
                        </tbody>
                    </StyledTable>
                    <div>
                        {!resoNum && <Button onClick={handlerSave}>등록</Button>}
                        <Button onClick={() => setModal(!modal)}>나가기</Button>
                    </div>
                </div>
            </DisbApplyModalStyled>
        </>
    );
};
