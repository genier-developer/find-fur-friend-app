import React, {useState} from "react";
import {Card, CardActions, CardContent, CardMedia, TextField, Typography} from '@mui/material';
import Button from "@mui/material/Button";
import {Pet} from "../models/Pet";
import {useAppDispatch} from "../app/hooks.ts";
import {
    addFavoritePet,
    deleteFavoritePet,
    removePet,
    selectFavoritePets,
    updatePet
} from "../features/petSlice.ts";
import {FavoriteBorderOutlined, FavoriteOutlined} from "@mui/icons-material";
import {useSelector} from "react-redux";

export type PetItemProps = {
    pet: Pet
}

export const PetItem: React.FC<PetItemProps> = ({pet}) => {

    const [updatedPet, setUpdatedPet] = useState<Pet>(pet);
    const [isEditing, setIsEditing] = useState(false);

    const dispatch = useAppDispatch()

    const favorites = useSelector(selectFavoritePets);
    const isFavoritePet = favorites.includes(pet.id);

    const handleDeletePet = () => {
        dispatch(removePet(pet.id))
    }
    const handleToggleEditing = () => {
        setIsEditing(!isEditing);
    }

    const handleCancelEditing = () => {
        setUpdatedPet(pet);
        setIsEditing(false);
    }

    const handleInputChange = (field: string, value: string | number) => {
        setUpdatedPet((prevPet) => ({
            ...prevPet,
            [field]: value,
        }));
    }

    const handleUpdatePet = () => {
        dispatch(updatePet(updatedPet));
        setIsEditing(false);
    }

    const handleAddFavoritePet = () => {
        dispatch(addFavoritePet(pet))
    }
    const handleDeleteFavoritePet = ()=>{
        dispatch(deleteFavoritePet(pet.id))
    }

    return (
        <Card sx={{maxWidth: 345}} elevation={6}>
            <CardMedia
                image={pet.image}
                sx={{width: 200, height: 200}}
            />
            <CardContent>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    {isEditing ?
                        <TextField
                            type="text"
                            size="small"
                            label={pet.name}
                            value={updatedPet.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                        : <Typography variant="h5" component="div" sx={{marginBottom: 1}}>{pet.name}</Typography>
                    }

                    { isFavoritePet ?
                        <FavoriteOutlined  onClick = {handleDeleteFavoritePet} color={'primary'}/>
                        : <FavoriteBorderOutlined onClick={handleAddFavoritePet} color={'primary'}/>
                    }
                </div>

                <Typography color="text.secondary">Age: <b>{pet.age}</b></Typography>
                <Typography color="text.secondary">Weight, kg: <b>{pet.weight}</b></Typography>
                <Typography color="text.secondary">Sex: <b>{pet.sex ? 'male' : 'female'}</b></Typography>
                <Typography color="text.secondary">Available: <b>{pet.isAvailable ? 'Yes' : 'No'}</b></Typography>
            </CardContent>

            <CardActions sx={{display: 'flex', justifyContent: "space-between"}}>
                {!isEditing && <Button size="small" onClick={handleToggleEditing}>Update</Button>}
                {isEditing && (
                    <>
                        <Button size="small" onClick={handleUpdatePet}>Save</Button>
                        <Button size="small" onClick={handleCancelEditing}>Cancel</Button>
                    </>
                )}
                {!isEditing && <Button size="small" onClick={handleDeletePet}>Delete</Button>}
            </CardActions>
        </Card>
    );
}