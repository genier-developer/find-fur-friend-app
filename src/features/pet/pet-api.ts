import { database } from '@/services/firebase'
import { Pet } from '@/features/pet/pet-types'
import { get, ref, remove, set } from 'firebase/database'

export const getPetByIdFromFirebase = async (id: string) => {
  const petRef = ref(database, `/pets/${id}`)
  const snapshot = await get(petRef)

  if (snapshot.exists()) {
    return snapshot.val()
  } else {
    throw new Error(`Pet with ID ${id} not found.`)
  }
}

export const fetchPetsFromFirebase = async (): Promise<Pet[]> => {
  const snapshot = await get(ref(database, 'pets'))
  const pets: Pet[] = []

  snapshot.forEach(childSnapshot => {
    const pet = childSnapshot.val()

    pets.push({ id: childSnapshot.key, ...pet })
  })

  return pets
}

export const addPetToFirebase = async (newPet: Pet): Promise<Pet> => {
  const newPetRef = ref(database, 'pets/' + newPet.id)
  console.log('Adding to Firebase:', { path: 'pets/' + newPet.id, data: newPet })

  await set(newPetRef, newPet)

  console.log('Added pet to Firebase successfully:', newPet)

  return newPet
}

export const removePetFromFirebase = async (id: string): Promise<void> => {
  console.log('Removed pet from Firebase:', id)
  await remove(ref(database, `pets/${id}`))
}

export const updatePetToFirebase = async (updatedPet: Pet): Promise<void> => {
  const { id, ...petWithoutId } = updatedPet

  await set(ref(database, `pets/${id}`), petWithoutId)
}
