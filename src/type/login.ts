export interface LoginFormInt {
    username: string
    password: string
}

export class LoginData {
    ruleForm: LoginFormInt = {
        username: "admin",
        password: "123456"
    }
}

