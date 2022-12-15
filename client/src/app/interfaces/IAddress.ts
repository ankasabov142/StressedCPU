export default interface IAddress {
    _id: string,
    userId: string,
    recipientName: string,
    phoneNumber: string,
    country: string,
    city: string,
    postcode: string,
    address: string,
    additionalInfo?: string,
}