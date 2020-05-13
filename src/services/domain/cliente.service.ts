import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteDTO } from 'src/models/cliente.dto';
import { APIConfig } from 'src/config/api.config';
import { StorageService } from '../storage.service';

@Injectable()
export class ClienteService {

    constructor(private http: HttpClient, private storageService: StorageService) {

    }

    // ?value -> Parâmetro definido como Value no backend
    findByEmail(email: string): Observable<ClienteDTO> {

        let token = this.storageService.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});

        // Com o segundo argumento, passa-se o cabeçalho na requisição
        return this.http.get<ClienteDTO>(
            `${APIConfig.baseURL}/clientes/email?value=${email}`,
            { 'headers': authHeader }
        );
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${APIConfig.bucketBaseURL}/cp${id}.jpg`;
        return this.http.get(url, {responseType: 'blob'}); // blob: formato de imagem
    }

}