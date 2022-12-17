import ICartProduct from "./ICartProduct";

export default interface ICart {
    _id: string,
    userId: string,
    products: ICartProduct[],
    isEmpty: boolean | undefined
}