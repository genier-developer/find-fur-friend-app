import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { useAppDispatch } from "../app/hooks.ts";
import { AddNewPet } from "../components/AddNewPet.tsx";
import { PetList } from "../components/PetList.tsx";
import {fetchPets, selectFavoritePets} from "../features/petSlice.ts";
import {SignIn} from "../components/auth/SignIn.tsx";
import {SignUp} from "../components/auth/SignUp.tsx";
import {FavoritePetList} from "./FavoritePetList.tsx";
import {useSelector} from "react-redux";
import Badge from '@mui/material/Badge';
import {AuthDetails} from "../components/auth/AuthDetails.tsx";

export const HomePage = () => {

  const dispatch = useAppDispatch();

  const favoritePets = useSelector(selectFavoritePets);

  const [isAddNewPetOpen, setIsAddNewPetOpen] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  const handleHomeButtonClick = () => {
    setIsAddNewPetOpen(false);
  };

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  useEffect(() => {
    setFavoriteCount(favoritePets.length);
  }, [favoritePets]);

  return (
    <>
      <AuthDetails/>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              PET SHELTER
            </Typography>
            <Button
              component={Link}
              to="/"
              color="inherit"
              onClick={handleHomeButtonClick}
            >
              Home
            </Button>
            <Button color="inherit" onClick={() => setIsAddNewPetOpen(true)}>
              Add New Pet
            </Button>
              <IconButton color="inherit" component={Link}
                          to="/favorites">
                {favoriteCount > 0 ? (
                    <Badge badgeContent={favoriteCount} color="error">
                      <FavoriteBorderOutlined />
                    </Badge>
                ) : (
                    <FavoriteBorderOutlined />
                )}
              </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Container sx={{ marginTop: 4, marginBottom: 4 }}>
        {isAddNewPetOpen ? (
          <Container sx={{ marginTop: 14 }}>
            <AddNewPet onClose={() => setIsAddNewPetOpen(false)} />
          </Container>
        ) : (
          <PetList />
        )}
        <SignUp/>
        <SignIn/>
        <FavoritePetList/>
      </Container>
    </>
  );
};