export interface UserUpdateDTO {
    username: string,
    oldPassword?: string,
    newPassword?: string,
    confirmPassword?: string,
    name?: string,
    surname?: string
}
