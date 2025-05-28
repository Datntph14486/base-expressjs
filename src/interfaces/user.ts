export interface ICreateUserBody {
    firstName: string;
    lastName: string;
    gender: "female" | "male";
    dateOfBirth: string;
    email: string;
    password: string;
}
