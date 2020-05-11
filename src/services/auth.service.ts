import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIConfig } from 'src/config/api.config';
import { LocalUser } from 'src/models/local_user';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

    // Manipula token JWT -> Auxilia a buscar o email a partir do token Bearer
    jwtHelperService: JwtHelperService = new JwtHelperService();

    constructor(public http: HttpClient, public storageService: StorageService) {

    }

    // POST: dois argumentos (o caminho e os dados que serão enviados)
    // Mais um terceiro argumento, um objeto de especificações, cujo quais:
    // observe: "response" -> Garante que retorne uma resposta e que seja possível verificar os headers
    // responseType: 'text' -> Faz com que o framework não faça um parse no json, causando um erro
    authenticate(creds: CredenciaisDTO) {
        return this.http.post(`${APIConfig.baseURL}/login`, creds, { observe: 'response', responseType: 'text'});
    }

    // Verifica se o login foi efetuado com sucesso, buscando o bearer token
    successfulLogin(authorizationValue: string) {
        let tokenAux = authorizationValue.substring(7);
        let user: LocalUser = {
            token: tokenAux,
            email: this.jwtHelperService.decodeToken(tokenAux).sub
        };
        this.storageService.setLocalUser(user);
    }

    logout() {
        this.storageService.setLocalUser(null);
    }

}