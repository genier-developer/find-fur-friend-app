// src/models/Pet.ts
export interface Pet {
    id: string;
    type: string;
    name: string;
    age: number;
    sex: string;
    weight: number;
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
    image: string;
    isFavorite?: boolean
}
export interface PetState {
    pets: Pet[];
    // favoritePets: string[];
    favoritePets: Pet[];
    isLoading: boolean;
}

