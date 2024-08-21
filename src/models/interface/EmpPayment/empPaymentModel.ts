export interface IEmpPaymentList {
    salary_year: string;
    nation_pens: number;
    health_insur: number;
    empl_insur: number;
    workers_insur: number;
    annual_salary: number;
    salary: number;
    pens: number;
    pay_status: string;
    name: string;
    loginID: string;
    emp_date: string;
    dept_code: string;
    pos_code: string;
    pos_name: string;
    dept_name: string;

}

export interface ISearchEmpPayment {
    salaryManageListCnt: number;
    salaryManageList: IEmpPaymentList[];
    pay_status: string;
}

export interface ISalaryApprove {
    salary_year: string;
    loginID: string;
}

export interface IPostResponse {
    result: string;
}