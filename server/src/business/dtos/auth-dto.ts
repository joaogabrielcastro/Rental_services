// request
export interface AuthRequestDTO {
    email: string;
    password: string;
}

// response
export interface AuthResponseDTO {
    token: string;
}
