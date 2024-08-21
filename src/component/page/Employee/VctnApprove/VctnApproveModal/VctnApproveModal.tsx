import { useRecoilState } from "recoil";
import { VctnApproveButton, VctnApproveModalStyled, VctnApproveModalTableStyled } from "./styled";
import { modalState } from "../../../../../stores/modalState";
import { FC, useEffect, useState } from "react";
import { postComnApi } from "../../../../../api/postComnApi";
import { IVctn, IVctnApproveResponse, IVctnDetailResponse, RES_RESULT, VCTN_CODE } from "../../../../../models/interface/Employee/VctnApproveModel";
import { EmployeeApi } from "../../../../../api/api";
import { nullCheck } from "../../../../../common/nullCheck";

export interface IVctnApproveModalProps {
    vctnSeq?: number;
    onPostSuccess: () => void;
}

export const VctnApproveModal: FC<IVctnApproveModalProps> = ({ vctnSeq, onPostSuccess }) => {
    const [modal, setModal] = useRecoilState(modalState);
    const [rejectReasonTr, setRejectReasonTr] = useState<boolean>(false);
    const [vctnDetail, setVctnDetail] = useState<IVctn>();

    useEffect(() => {
        if (modal && vctnSeq) searchVctnDetail();
    }, [modal, vctnSeq]);

    const searchVctnDetail = async () => {
        const postSearchVctn = await postComnApi<IVctnDetailResponse>(EmployeeApi.vctnDetailJson, { seq: vctnSeq });
        if (postSearchVctn) {
            setVctnDetail(postSearchVctn.vctnDetail);
            if (postSearchVctn.vctnDetail?.rejectNote && postSearchVctn.vctnDetail?.rejectNote !== "") setRejectReasonTr(true);
        }
    };

    const handlerApploval = async () => {
        setRejectReasonTr(false);
        if (!window.confirm("휴가를 승인하시겠습니까?")) {
            return;
        }

        const postApprovalVctn = await postComnApi<IVctnApproveResponse>(EmployeeApi.vctnApprovalJson, { seq: vctnSeq });
        if (postApprovalVctn && postApprovalVctn.result === RES_RESULT.SUCCESS) {
            alert("승인되었습니다.");
            onPostSuccess();
        }
    };

    const checkList = [{ inval: vctnDetail?.rejectNote, msg: "반려사유를 입력해주세요" }];

    const handlerReject = async () => {
        if (!nullCheck(checkList)) {
            return;
        }

        if (!window.confirm("휴가를 반려하시겠습니까?")) {
            return;
        }

        const postRejectVctn = await postComnApi<IVctnApproveResponse>(EmployeeApi.vctnRejectJson, { ...vctnDetail, seq: vctnSeq });
        if (postRejectVctn && postRejectVctn.result === RES_RESULT.SUCCESS) {
            alert("반려되었습니다.");
            onPostSuccess();
        }
    };

    const cleanUp = () => {
        setVctnDetail(undefined);
        setRejectReasonTr(false);
    };

    return (
        <VctnApproveModalStyled ariaHideApp={false} isOpen={modal} onAfterClose={cleanUp}>
            <div className="wrap">
                <div className="header">휴가신청서</div>
                <VctnApproveModalTableStyled>
                    <colgroup>
                        <col width="25%" />
                        <col width="25%" />
                        <col width="25%" />
                        <col width="25%" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>근무부서</th>
                            <td>{vctnDetail?.deptName}</td>
                            <th>구분</th>
                            <td>
                                {vctnDetail?.vctnCode === VCTN_CODE.ANNUAL && "연차"}
                                {vctnDetail?.vctnCode === VCTN_CODE.MONTHLY && "월차"}
                            </td>
                        </tr>
                        <tr>
                            <th>성명</th>
                            <td colSpan={3}>{vctnDetail?.name}</td>
                        </tr>
                        <tr>
                            <th>사번</th>
                            <td colSpan={3}>{vctnDetail?.loginId}</td>
                        </tr>
                        <tr>
                            <th>기간</th>
                            <td colSpan={3}>
                                {vctnDetail?.vctnStrDate} ~ {vctnDetail?.vctnEndDate}
                            </td>
                        </tr>
                        <tr>
                            <th>휴가사유</th>
                            <td colSpan={3}>
                                <textarea readOnly value={vctnDetail?.vctnReason}></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th>비상연락처</th>
                            <td colSpan={3}>{vctnDetail?.emgContact}</td>
                        </tr>
                        <tr>
                            <th>승인여부</th>
                            <td colSpan={3}>
                                <VctnApproveButton onClick={handlerApploval}>승인</VctnApproveButton>
                                <VctnApproveButton id="rejectReason" $backcolor="grey" onClick={() => setRejectReasonTr(true)}>
                                    반려
                                </VctnApproveButton>
                            </td>
                        </tr>
                        {rejectReasonTr ? (
                            <tr>
                                <th>반려사유</th>
                                <td colSpan={3}>
                                    <textarea defaultValue={vctnDetail?.rejectNote} onChange={(e) => setVctnDetail({ ...vctnDetail, rejectNote: e.target.value })}></textarea>
                                    <div className="button-container">
                                        <VctnApproveButton onClick={handlerReject}>저장</VctnApproveButton>
                                    </div>
                                </td>
                            </tr>
                        ) : null}
                    </tbody>
                </VctnApproveModalTableStyled>

                <p>상기와 같은 이유로 휴가를 신청합니다.</p>
                <label>
                    신청일 <input type="date" value={vctnDetail?.regDate || ""} readOnly></input>
                </label>

                <VctnApproveButton onClick={() => setModal(!modal)}>닫기</VctnApproveButton>
            </div>
        </VctnApproveModalStyled>
    );
};
