import { Injectable } from '@angular/core';
import { LocalUser } from 'src/models/local_user';
import { STORAGE_KEYS } from 'src/config/storage-keys.config';

@Injectable()
export class StorageService {

    getLocalUser(): LocalUser {
        let user = localStorage.getItem(STORAGE_KEYS.localUser);
        if(user == null) {
            return null;
        } else {
            // transformando localStorage (string) em JSON para a classe local_user
            return JSON.parse(user);
        }
    }

    setLocalUser(user: LocalUser) {
        // Se o usuário for nulo, é necessário removê-lo
        if(user == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else {
            // Convertendo a classe para String
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(user));
            let teste = localStorage.getItem(STORAGE_KEYS.localUser);
        }
    }

}