export const formatWon = (price : number) => {

    const price1 = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;

    return `${price1}`+`원`;
};