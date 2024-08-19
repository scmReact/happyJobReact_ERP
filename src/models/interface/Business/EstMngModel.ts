/* Business - EstMng - EstMngSearch */

export interface IEstMngSearch {
    searchStDate: string;
    searchEdDate: string;
    searchCust: string;
}

export interface ICommon {
    grp_cod: string;
    dtl_cod: string;
    dtl_cod_nm: string;
}

export interface ICommonJsonResponse {
    list: ICommon[];
}

/* Business - EstMng - EstMngMain */

export interface IEstMng {
    estm_num: number;
    estm_date: string;
    apply_yn: string;
    cust_id: string;
    cust_name: string;
    item_code: string;
    item_name: string;
    provide_value: number;
    item_surtax: number;
    item_price: number;
}

export interface IEstMngResponse {
    list: IEstMng[];
    listCount: number;
}

/* Business - EstMng - EstMngInsertModal */

export interface IEstMngInsert {
    estm_num: number;
    cust_id: string;
    item_code: string;
    item_name: string;
    expire_date: string;
    book_date: string;
    loginID: string;
    qut: string;
    manufac: string;
    major_class: string;
    sub_class: string;
}

export interface IEstMngInsertResponse {
    result: string;
}

export interface ICust {
    cust_id: string;
    cust_name: string;
}

export interface ICustJsonResponse {
    custNameList: ICust[];
}

const today = new Date();
const year = today.getFullYear();
const month = ("00" + (today.getMonth() + 1).toString()).slice(-2);
const day = ("00" + today.getDate().toString()).slice(-2);

export const defaultEstMng = {
    estm_num: 0,
    cust_id: "",
    item_code: "",
    item_name: "",
    expire_date: `${year}-${month}-${day}`,
    book_date: "",
    loginID: "",
    qut: "",
    manufac: "",
    major_class: "",
    sub_class: "",
};

/* Business - EstMng - EstMngInfoModal */

export interface IEstpart {
    estm_num: number;
    estm_date: string;
    expire_date: string;
    book_date: number;
    cust_id: string;
    cust_name: string;
    cust_person: string;
    cust_person_ph: string;
    cust_addr: string;
    cust_detail_addr: string;
    biz_num: string;
    item_code: string;
    item_name: string;
    item_price: number;
    item_surtax: number;
    provide_value: number;
    apply_date: string;
    apply_yn: string;
    qut: number;
}

export interface ICompany {
    erp_addr: string;
    erp_copnm: string;
    erp_copnum: string;
    erp_emp: string;
    erp_tel: string;
}

export interface IEstMngInfoResponse {
    result: string;
    estpart: IEstpart[];
    companyInfo: ICompany;
}

export interface IEstMngApplyResponse {
    result: string;
}

export interface IResponse {
    key: string;
    value: object;
}

/* Business - EstMng - ItemInfoModal */

export interface IItemInfo {
    manufac: string;
    major_class: string;
    sub_class: string;
    item_code: string;
    item_name: string;
}

export interface IItemInfoResponse {
    list: IItemInfo[];
    listCount: number;
}
