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
import { fetchPets } from "../features/petSlice.ts";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const [isAddNewPetOpen, setIsAddNewPetOpen] = useState(false);
  const handleHomeButtonClick = () => {
    setIsAddNewPetOpen(false);
  };
  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  const handleShowFavoritePets = () => {
    // dispatch()
  };
  return (
    <>
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
            <FavoriteBorderOutlined onClick={handleShowFavoritePets} />
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
      </Container>
    </>
  );
};
