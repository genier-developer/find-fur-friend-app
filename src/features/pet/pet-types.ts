export interface Pet {
  age?: number
  createdAt?: string | undefined
  id: string
  image?: string
  isAvailable: boolean
  isFavorite?: boolean
  name: string
  sex?: string
  type: string
  updatedAt?: string
  weight?: number | undefined
  ownerId: string | undefined
}
export interface PetState {
  favoritePets: Pet[]
  isLoading: boolean
  pets: Pet[]
}
