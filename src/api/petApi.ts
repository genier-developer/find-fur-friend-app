import { Pet } from "../models/Pet";

import { set, ref, remove, get } from "firebase/database";

import { database } from "../firebase.ts";


export const fetchPetsFromFirebase = async (): Promise<Pet[]> => {
  const snapshot = await get(ref(database, "pets"));
  const pets: Pet[] = [];
  snapshot.forEach((childSnapshot) => {
    const pet = childSnapshot.val();
    pets.push({ id: childSnapshot.key, ...pet });
  });
  return pets;
};

export const addPetToFirebase = async (newPet: Pet): Promise<Pet> => {
  const newPetRef = ref(database, "pets/" + newPet.id);
  await set(newPetRef, newPet);
  return newPet;
};

export const removePetFromFirebase = async (id: string): Promise<void> => {
  await remove(ref(database, `pets/${id}`));
};

export const updatePetToFirebase = async (updatedPet: Pet): Promise<void> => {
  const { id, ...petWithoutId } = updatedPet;
  await set(ref(database, `pets/${id}`), petWithoutId);
};
