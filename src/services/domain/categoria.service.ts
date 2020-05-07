import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIConfig } from 'src/config/api.config';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { Observable } from 'rxjs';

@Injectable()
export class CategoriaService {

    constructor(public http: HttpClient) {

    }

    // Retorna todas as categorias
    findAll(): Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`${APIConfig.baseURL}/categorias`);
    }

}