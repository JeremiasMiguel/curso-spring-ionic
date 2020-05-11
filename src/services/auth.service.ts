import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIConfig } from 'src/config/api.config';

@Injectable()
export class AuthService {

    constructor(public http: HttpClient) {

    }

    // POST: dois argumentos (o caminho e os dados que serão enviados)
    // Mais um terceiro argumento, um objeto de especificações, cujo quais:
    // observe: "response" -> Garante que retorne uma resposta e que seja possível verificar os headers
    // responseType: 'text' -> Faz com que o framework não faça um parse no json, causando um erro
    authenticate(creds: CredenciaisDTO) {
        return this.http.post(`${APIConfig.baseURL}/login`, creds, { observe: 'response', responseType: 'text'});
    }

}