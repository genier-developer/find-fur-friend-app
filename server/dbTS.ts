export type RootObject = {
	pets: RootObjectPets[];
}
export type RootObjectPets = {
	type: string;
	id: string;
	name: string;
	age: number;
	sex: string;
	weight: number;
	isAvailable: boolean;
	createdAt: string;
	updatedAt: string;
	image: string;
}