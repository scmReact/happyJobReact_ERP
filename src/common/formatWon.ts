
export const formatWon = (price : number) => {

    const price1 = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;

    return `${price1}`+`원`;
};

export const formatWon = (value: number) => {
    return `${new Intl.NumberFormat('ko-KR').format(value)} 원`;
};

