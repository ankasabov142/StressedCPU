export default interface IDiscount {
    _id: string,
    code: string,
    percentage: number,
    isPromoCode?: boolean
}