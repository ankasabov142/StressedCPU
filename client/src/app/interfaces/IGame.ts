import ICategory from "./ICategory";
import IDiscount from "./IDiscount";
import IGenre from "./IGenre";
import ITag from "./ITag";

export default interface IGame{
    _id: string,
    name: string,
    description: string,
    displayImage: string,
    media: string[],
    categories: ICategory[],
    genres: IGenre[],
    tags: ITag[],
    price: number,
    discounts: IDiscount[],
    quantityInStock: number
}