// import {Pet} from "../models/Pet.ts";
import {useAppSelector} from "../app/hooks.ts";
import {selectFavoritePets} from "../features/petSlice.ts";
import { useSelector } from "react-redux";
import { Container, Grid, LinearProgress} from '@mui/material';
import {Pet} from "../models/Pet.ts";
import {PetItem} from "./PetItem.tsx";

export const FavoritePetList = () => {
  const favoritePets = useSelector(selectFavoritePets);
    const isLoading = useAppSelector(state => state.pet.isLoading);

    if (isLoading) {
        return <LinearProgress />;
    }
  return (
      <Container>
          <Grid container spacing={5} justifyContent="center" alignItems="center">

                  {favoritePets.map((pet: Pet) => (
                      <Grid item key={pet.id}>
                          <PetItem pet={pet} />
                      </Grid>
                  ))}

          </Grid>
      </Container>
  );
};
