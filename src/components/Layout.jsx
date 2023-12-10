import { Link, Outlet } from "react-router-dom";
import FormStyle from "../styles/Form.module.css"
import mascotas from "../assets/imagenes/mascotas.png"
import IconCoti from "../assets//imagenes/cotizador.png"
const Layout= () => {
    return (
      <>
        <header className={FormStyle.header}>
        <Link to={"/historial"}>
          <img className={FormStyle.img} src={IconCoti } alt="" />
          </Link>
          <h1>Cotizador Seguro para Mascotas</h1>
          <img className={FormStyle.img2} src={mascotas} alt="gatoperro" border="0"/>
        </header>
        <Outlet />
      </>
    );
}


export default Layout;