import { useState, useEffect } from "react";
import {BrowserRouter,Link,Outlet,Route,Routes} from "react-router-dom"
import Layout from "./components/Layout";
import Formulario from "./components/Formulario";
import Historial from "./components/Historial";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Formulario />} />
            <Route path="historial" element={<Historial />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App
