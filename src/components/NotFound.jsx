import { Link } from "react-router-dom"
import NotFoundStyle from "../styles/NotFound.module.css"
import NotF from "../assets/imagenes/404.jpg"
const NotFound = () => {
    return (
        <>  <section className={NotFoundStyle.contenedor}>
                <img src={NotF} alt="" />
                <Link to={"/"}><button type="button" className={NotFoundStyle.btn}>Volve pa atras</button ></Link>
        </section>
           
        </>
      
    )
}

export default NotFound;