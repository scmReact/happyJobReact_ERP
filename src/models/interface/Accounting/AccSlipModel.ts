/* Accounting - AccSlip - AccSlipSearch */

export interface IAccSlipSearch {
    searchStDate?: string;
    searchEdDate?: string;
    searchCustId?: string;
    searchAccDetailCode?: string;
    searchAccDetailName?: string;
}

/* Accounting - AccSlip - AccSlipMain */

export interface IAccSlip {
    acctNum: number;
    loginId: string;
    managerNm: string;
    acctDate: string;
    resoNum: number;
    custId: number;
    custName: string;
    acctCode: string;
    acctCodeNm: string;
    apprYn: string;
    apprDate: string;
    disbAmount: number;
}

export interface IAccSlipResponse {
    accSlipList: IAccSlip[];
    accSlipTotalCnt: number;
}
