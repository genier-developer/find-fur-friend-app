export interface Pet {
  age: number
  createdAt: string
  id: string
  image: string
  isAvailable: boolean
  isFavorite?: boolean
  name: string
  sex: string
  type: string
  updatedAt: string
  weight: number
  ownerId: string | undefined
}
export interface PetState {
  favoritePets: Pet[]
  isLoading: boolean
  pets: Pet[]
}
