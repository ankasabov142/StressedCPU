export default interface IUser {
    _id: string,
    isAdmin: boolean | undefined,
    email: string,
    phoneNumber: string | undefined,
    firstName: string,
    lastName: string,
    accessToken: string,
}