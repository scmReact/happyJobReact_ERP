export interface IDailyRevenueSearchParam {
    date: string;
    account: string;
}
export interface IDailyRevenueList{
    amount:number;
    bookDate: string;
    custId: string;
    custName: string;
    payAmount: number;
    unpaidState: string;
}

export interface IDailyRevenueRes{
    list:IDailyRevenueList[];
    totalAmount: number;
    totalCount: number;
    totalPayAmount: number;
    totalUnpaid: number;
}