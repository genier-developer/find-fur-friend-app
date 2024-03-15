import { Pet } from '../models/Pet';
import { initializeApp } from "firebase/app";
import { getDatabase, update} from "firebase/database";
import { getAuth } from "firebase/auth";
import { set, ref, remove, get } from "firebase/database";


export const firebaseConfig = {
    apiKey: "AIzaSyAVxBJijswcwsg4DNsGtr53hdH07uAcxtA",
    authDomain: "pet-shelter-fa4be.firebaseapp.com",
    databaseURL: "https://pet-shelter-fa4be-default-rtdb.firebaseio.com",
    projectId: "pet-shelter-fa4be",
    storageBucket: "pet-shelter-fa4be.appspot.com",
    messagingSenderId: "531819954511",
    appId: "1:531819954511:web:c1805dddcc60457c3f853a"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase()
const auth = getAuth()

export const fetchPetsFromFirebase = async (): Promise<Pet[]> => {
    const snapshot = await get(ref(database, 'pets'));
    const pets: Pet[] = [];
    snapshot.forEach(childSnapshot => {
        const pet = childSnapshot.val();
        pets.push({ id: childSnapshot.key, ...pet });
    });
    return pets;
};

 export const addPetToFirebase = async (newPet: Pet): Promise<Pet> => {
     const newPetRef = ref(database, 'pets/'+ newPet.id);
     await set(newPetRef, newPet);
     return newPet ;
 };

export const removePetFromFirebase = async (id: string): Promise<void> => {
    await remove(ref(database, `pets/${id}`));
};

export const updatePetToFirebase = async (updatedPet: Pet): Promise<void> => {
    const { id, ...petWithoutId } = updatedPet;
    await set(ref(database, `pets/${id}`), petWithoutId);
};

// export const updatePetToFirebase = async (newPet: Pet): Promise<Pet> => {
//     const updates:{[key:string]: Pet} = {};
//     updates['/pets/' + newPet.id] = newPet;
//     await update(ref(database), updates);
//     return newPet;
// };