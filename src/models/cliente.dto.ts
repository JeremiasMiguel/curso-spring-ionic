// O model ClienteDTO do frontend deve conter os mesmos atributos que o ClienteDTO do backend
export interface ClienteDTO {
    id: string;
    nome: string;
    email: string;
    imageUrl?: string; // ? -> Opcional
}