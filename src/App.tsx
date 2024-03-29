// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import { Box, Container } from "@mui/material";
// import { BrowserRouter, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import MenuIcon from "@mui/icons-material/Menu";
// import { fetchPets } from "./features/petSlice";
// import { useAppDispatch } from "./app/hooks";
// import { PetList } from "./components/PetList";
// import { AddNewPet } from "./components/AddNewPet";
// import { FavoriteBorderOutlined } from "@mui/icons-material";
import { Router } from "./router.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

export const App: React.FC = () => {
  // const dispatch = useAppDispatch();
  // const [isAddNewPetOpen, setIsAddNewPetOpen] = useState(false)

  // useEffect(() => {
  //   dispatch(fetchPets());
  // }, [dispatch]);

  // const handleHomeButtonClick = () => {
  //     setIsAddNewPetOpen(false)
  // }
  //
  // const handleShowFavoritePets = () =>{
  //     // dispatch()
  // }

  return (
    // <BrowserRouter>

    <Provider store={store}>
      <Router />
      {/*<Box sx={{flexGrow: 1}}>*/}
      {/*    <AppBar position="static">*/}
      {/*        <Toolbar>*/}
      {/*            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>*/}
      {/*                <MenuIcon/>*/}
      {/*            </IconButton>*/}
      {/*            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>*/}
      {/*                PET SHELTER*/}
      {/*            </Typography>*/}
      {/*            <Button component={Link} to="/" color="inherit" onClick={handleHomeButtonClick}>*/}
      {/*                Home*/}
      {/*            </Button>*/}
      {/*            <Button color="inherit" onClick={() => setIsAddNewPetOpen(true)}>*/}
      {/*                Add New Pet*/}
      {/*            </Button>*/}
      {/*            <FavoriteBorderOutlined onClick={handleShowFavoritePets}/>*/}
      {/*        </Toolbar>*/}
      {/*    </AppBar>*/}
      {/*</Box>*/}
      {/*<Container sx={{marginTop: 4, marginBottom: 4}}>*/}
      {/*    {isAddNewPetOpen ?*/}
      {/*        <Container sx={{marginTop: 14}}>*/}
      {/*            <AddNewPet onClose={() => setIsAddNewPetOpen(false)}/>*/}
      {/*        </Container>*/}
      {/*        : <PetList/>*/}
      {/*    }*/}
      {/*</Container>*/}
      {/*</BrowserRouter>*/}
    </Provider>
  );
};
