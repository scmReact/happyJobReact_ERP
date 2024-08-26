import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { DisbursementDetailModalStyled } from "../styled";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { Button } from "../../../../common/Button/Button";
import NoImage from "../../../../../assets/noImage.jpg";

export interface IDisbursementDetailModalProps {
    resoNum?: number;
    onSuccess: () => void;
    setResoNum: (resoNum: undefined) => void;
}

export interface IDisbursementDetailModal {
    resoNum: number;
    applyId: string;
    applyName: string;
    applyDept: string;
    custId: number;
    custName: string;
    groupCode: string;
    grCodeNm: string;
    acctCode: string;
    acctCodeNm: string;
    applyDate: string;
    useDate: string;
    disbContent: string;
    amount: string;
    apprYn: string;
    apprDate: string;
    eviMaterial: string;
    phsycalPath: string;
    logicalPath: string;
    fileSize: number;
    fileExt: string;
}

export interface IDisbursementDetailModalResponse {
    disbDetail: IDisbursementDetailModal;
}

export interface IPostResponse {
    result: string;
}

export interface IUserInfo {
    loginId: string;
    name: string;
    deptName: string;
}

export interface IUserInfoResponse {
    userInfo: IUserInfo;
}

export interface ICommonList {
    dtl_cod: string;
    dtl_cod_nm: string;
}

export interface ICommonListResponse {
    commonList: ICommonList[];
}

export interface ICustList {
    custId: number;
    custName: string;
}

export interface ICustListResponse {
    custList: ICustList[];
}

export const DisbursementDetailModal: FC<IDisbursementDetailModalProps> = ({ resoNum, onSuccess, setResoNum }) => {
    const defaultValue = {
        resoNum: 0,
        applyId: "",
        applyName: "",
        applyDept: "",
        custId: 0,
        custName: "",
        groupCode: "",
        grCodeNm: "",
        acctCode: "",
        acctCodeNm: "",
        applyDate: "",
        useDate: "",
        disbContent: "",
        amount: "",
        apprYn: "",
        apprDate: "",
        eviMaterial: "",
        phsycalPath: "",
        logicalPath: "",
        fileSize: 0,
        fileExt: "",
    };
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [disbApprDetail, setDisbApprDetail] = useState<IDisbursementDetailModal>(defaultValue);
    const [userInfo, setUserInfo] = useState<IUserInfo>();
    const [imageUrl, setImageUrl] = useState<string>("notImage");
    const [fileData, setFileData] = useState<File>();
    const [applyDate, setApplyDate] = useState<string>();
    const [applyId, setApplyId] = useState<string>();
    const [applyName, setApplyName] = useState<string>();
    const [applyDept, setApplyDept] = useState<string>();
    const [custList, setCustList] = useState<ICustList[]>([]);
    const [disbContent, setDisbContent] = useState<string>();

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

        axios.post("/accounting/disbDetailJson", param).then((res: AxiosResponse<IDisbursementDetailModalResponse>) => {
            if (res.data.disbDetail) {
                if (res.data.disbDetail.disbContent === "") {
                    setDisbApprDetail(defaultValue);
                }
                setDisbApprDetail(res.data.disbDetail);
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

    const handlerUpdate = () => {
        const param = new URLSearchParams();

        param.append("resoNum", resoNum?.toString() as string);
        param.append("apprYn", disbApprDetail.apprYn);
        param.append("apprDate", disbApprDetail.apprDate);
        param.append("disbContent", disbContent?.toString() as string);

        axios.post("/accounting/updateDisb.do", param).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "Success") {
                onSuccess();
            }
        });
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
            link.setAttribute("download", disbApprDetail?.eviMaterial as string);
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

    const searchCustList = () => {
        const param = new URLSearchParams();
        axios.post("/accounting/custListJson", param).then((res: AxiosResponse<ICustListResponse>) => {
            setCustList(res.data.custList);
        });
    };

    const handleTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDisbContent(e.target.value);
    };

    return (
        <>
            <DisbursementDetailModalStyled isOpen={modal} ariaHideApp={false}>
                <div className="wrap">
                    <div className="header">지출결의서 상세</div>
                    <StyledTable>
                        <tbody>
                            <tr>
                                <StyledTh size={15}>결의번호</StyledTh>
                                <StyledTd>
                                    <input
                                        type="text"
                                        defaultValue={resoNum}
                                        style={{ background: "#e3e6e6" }}
                                        disabled
                                    />
                                </StyledTd>
                                <StyledTh size={15}>신청일자</StyledTh>
                                <StyledTd>
                                    <input
                                        type="date"
                                        value={applyDate == null ? fomatDate() : applyDate}
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
                                        defaultValue={disbApprDetail?.useDate}
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
                                        style={{ background: "#e3e6e6" }}
                                        disabled
                                    />
                                </StyledTd>
                                <StyledTh size={15}>사원명</StyledTh>
                                <StyledTd>
                                    <input
                                        type="text"
                                        value={applyName == null ? userInfo?.name : applyName}
                                        style={{ background: "#e3e6e6" }}
                                        disabled
                                    />
                                </StyledTd>
                                <StyledTh size={15}>사용부서</StyledTh>
                                <StyledTd>
                                    <input
                                        type="text"
                                        value={applyDept == null ? userInfo?.deptName : applyDept}
                                        style={{ background: "#e3e6e6" }}
                                        disabled
                                    />
                                </StyledTd>
                            </tr>
                            <tr>
                                <StyledTh size={15}>계정대분류명</StyledTh>
                                <StyledTd>
                                    <input
                                        type="text"
                                        value={disbApprDetail?.grCodeNm}
                                        style={{ background: "#e3e6e6" }}
                                        disabled
                                    />
                                </StyledTd>
                                <StyledTh size={15}>계정과목</StyledTh>
                                <StyledTd>
                                    <input
                                        type="text"
                                        defaultValue={disbApprDetail?.acctCodeNm}
                                        style={{ background: "#e3e6e6" }}
                                        disabled
                                    />
                                </StyledTd>
                                <StyledTh size={15}>거래처명</StyledTh>
                                <StyledTd>
                                    <input
                                        type="text"
                                        defaultValue={disbApprDetail?.custName}
                                        style={{ background: "#e3e6e6" }}
                                        disabled
                                    />
                                </StyledTd>
                            </tr>
                            <tr>
                                <StyledTh size={15}>결의금액</StyledTh>
                                <StyledTd>
                                    <input
                                        type="text"
                                        defaultValue={disbApprDetail?.amount.toLocaleString()}
                                        style={{ background: "#e3e6e6" }}
                                        disabled
                                    />
                                </StyledTd>
                                <StyledTh size={15}>
                                    승인여부<span className="font_red">*</span>
                                </StyledTh>
                                <StyledTd>
                                    <label style={{ fontSize: "small" }}>
                                        <input
                                            type="radio"
                                            name="apprYn"
                                            value={"W"}
                                            checked={disbApprDetail?.apprYn === "W"}
                                            onChange={(e) =>
                                                setDisbApprDetail({
                                                    ...disbApprDetail,
                                                    apprYn: e.target.value,
                                                })
                                            }
                                            disabled
                                        />
                                        승인대기
                                        <input
                                            type="radio"
                                            name="apprYn"
                                            value={"Y"}
                                            checked={disbApprDetail?.apprYn === "Y"}
                                            onChange={(e) =>
                                                setDisbApprDetail({
                                                    ...disbApprDetail,
                                                    apprYn: e.target.value,
                                                })
                                            }
                                        />
                                        승인
                                        <input
                                            type="radio"
                                            name="apprYn"
                                            value={"N"}
                                            checked={disbApprDetail?.apprYn === "N"}
                                            onChange={(e) =>
                                                setDisbApprDetail({
                                                    ...disbApprDetail,
                                                    apprYn: e.target.value,
                                                })
                                            }
                                        />
                                        반려
                                    </label>
                                </StyledTd>
                                <StyledTh size={15}>승인일자</StyledTh>
                                <StyledTd>
                                    <input
                                        type="date"
                                        defaultValue={fomatDate()}
                                        style={{ background: "#e3e6e6" }}
                                        disabled
                                    />
                                </StyledTd>
                            </tr>
                            <tr>
                                <StyledTh size={15}>첨부파일</StyledTh>
                                <StyledTd colSpan={6}>
                                    <div onClick={downLoadFile}>
                                        {imageUrl === "notImage" ? (
                                            <div>{fileData?.name || disbApprDetail?.eviMaterial}</div>
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
                                    <textarea defaultValue={disbApprDetail?.disbContent} onChange={handleTextArea} />
                                </StyledTd>
                            </tr>
                        </tbody>
                    </StyledTable>
                    <div>
                        <Button onClick={handlerUpdate}>수정</Button>
                        <Button onClick={() => setModal(!modal)}>나가기</Button>
                    </div>
                </div>
            </DisbursementDetailModalStyled>
        </>
    );
};
