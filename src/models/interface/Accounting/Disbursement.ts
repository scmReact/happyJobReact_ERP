/* Main S */
export interface IDisbApprList {
    resoNum: number;
    applyId: string;
    applyDept: string;
    custId: number;
    groupCode: string;
    grCodeNm: string;
    acctCode: string;
    acctCodeNm: string;
    applyDate: string;
    useDate: string;
    disbContent: string;
    amount: number;
    apprYn: string;
    apprDate: string;
    eviMaterial: string;
}

export interface IDisbApprListResponse {
    disbApprList: IDisbApprList[];
    disbApprCnt: number;
}
/* Main E */

/* Modal, Search S */
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

/* Modal, Search E */
