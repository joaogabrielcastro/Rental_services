// request dto
export interface EquipmentRequestDTO {
    name: string;
    image: string;
    stock: number;
    price: number;
    description: string;
}

// response dto
export interface EquipmentResponseDTO {
    id: string;
    name: string;
    image: string;
    stock: number;
    price: number;
    description: string;
    isAvailable: boolean;
}

// list response dto
export interface EquipmentListResponseDTO {
    id: string;
    name: string;
    image: string;
    price: number;
}
