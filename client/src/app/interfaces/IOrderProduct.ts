export default interface IOrderProduct {
    product: {
        _id: number,
        name: String,
        displayImage: String,
        price: number
    },
    quantity: number
}