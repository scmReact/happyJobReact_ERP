
export interface IVctnCalendarDetailProps{
    modalParam ?: IModalParam;
}

export interface IModalDetail{
    deptName: string;
    name:string;
    vctnName:string;
}
export interface IDetailValue {
    applyYn: string;
    availDay: number;
    remainDay: number;
    seq: number;
    useDate: string;
    vctnEndDate: string;
    vctnStrDate: string;
}

export interface IVctnCalendarList {
    detailValue: IDetailValue[];
}

export interface IModalParam{
    applyYn : string;
    date: string;
}