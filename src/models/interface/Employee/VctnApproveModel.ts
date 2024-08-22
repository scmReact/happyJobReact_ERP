/* Employee - VctnApprove - VctnApproveSearch */

export interface IVctnSearch {
    searchStDate?: string;
    searchEdDate?: string;
    searchLoginId?: string;
    searchName?: string;
    searchApprove?: string;
}

/* Employee - VctnApprove - VctnApproveMain */

export interface IVctn {
    seq?: number;
    loginId?: string;
    vctnCode?: string;
    useDate?: number;
    remainDay?: number;
    vctnReason?: string;
    vctnStrDate?: string;
    vctnEndDate?: string;
    emgContact?: string;
    applyer?: string;
    applyYn?: string;
    applyDate?: string;
    rejectNote?: string;
    regDate?: string;
    availDay?: number;
    deptCode?: string;
    deptName?: string;
    name?: string;
    vctnName?: string;
}

export interface IVctnResponse {
    vctnApproveList: IVctn[];
    vctnApproveCnt: number;
}

/* Employee - VctnApprove - VctnApproveModal */

export interface IVctnDetailResponse {
    vctnDetail: IVctn;
}

export interface IVctnApproveResponse {
    result: string;
}

export const RES_RESULT = {
    SUCCESS: "Success",
    FAIL: "Fail",
} as const;

export const VCTN_CODE = {
    MONTHLY: "M",
    ANNUAL: "Y",
} as const;
