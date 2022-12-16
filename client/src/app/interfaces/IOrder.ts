import IAddress from "./IAddress";
import IOrderProduct from "./IOrderProduct";

export default interface IOrder {
    _id: string,
    userId: string,
    address: IAddress,
    products: IOrderProduct[],
    status: number,
    price: number,
    createdAt: string
}