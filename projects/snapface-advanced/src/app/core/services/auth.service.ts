import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    #_mytoken = 'MyFakeToken'

    getToken = (): string => this.#_mytoken
}