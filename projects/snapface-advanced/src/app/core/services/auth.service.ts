import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    #_mytoken!: string

    getToken = (): string => this.#_mytoken

    login = (email: string, password: string) => {
        this.#_mytoken = 'MyFakeToken'
        console.log(`AuthService.login(): email: ${email} - password: ${password}`)
    }
}