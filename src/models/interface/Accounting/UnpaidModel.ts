/* Accounting - Unpaid - UnpaidSearch */

export interface IUnpaidSearch {
    searchStDate: string;
    searchEdDate: string;
    searchExpire: string;
    searchPaid: string;
    searchProduct: string;
    searchCust: string;
    searchProcessObject: string;
}

/* Accounting - Unpaid - UnpaidMain */

export interface IUnpaid {
    type: string;
    num: number;
    userName: string;
    custName: string;
    bookDate: string;
    amount: number;
    unpaidState: string;
    expireState: string;
}

export interface IUnpaidResponse {
    list: IUnpaid[];
    listCount: number;
}
/* Accounting - Unpaid - UnpaidDetailModal */

export interface IUnpaidDetail {
    num: number;
    bookDate: string;
    depositYN: string;
    amount: number;
    cust_name: string;
    cust_person: string;
    cust_person_ph: string;
    detail_name: string;
    cust_account: string;
    expireState: string;
    expireDate: string;
    unpaidState: string;
    bankName: string;
    custName: string;
    custAccount: number;
    custPerson: string;
    custPersonPh: string;
    userName: string;
}

export interface IUnpaidDetailItems {
    itemName: string;
    provideValue: number;
    itemPrice: number;
    itemSurtax: number;
    qut: number;
}

export interface IUnpaidDetailResponse {
    type: string;
    detail: IUnpaidDetail;
    items: IUnpaidDetailItems[];
}

export interface IUnpaidDepositResponse {
    result: string;
}
