import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import Home from "./pages/Home";
import Agendas from "./pages/Agendas";

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/agendas">Agendas</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agendas" element={<Agendas />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;




// import React from 'react';

// function App() {
//   return (
//     <div>
//       <h1>Agendas Frontend</h1>
//       <p>O frontend está rodando corretamente!</p>
//     </div>
//   );
// }

// export default App;
