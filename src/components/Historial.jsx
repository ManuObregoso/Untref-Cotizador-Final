import { useEffect, useState } from "react";
import HistoStyle from "../styles/Historial.module.css"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Historial = () => {
    const[historial, setHistorial] = useState(() => {
        let storage = localStorage.getItem("historial")
        if(storage) return JSON.parse(storage);
        localStorage.setItem("historial", JSON.stringify([]));
        return [];
    });
    

    useEffect(
        () =>localStorage.setItem("historial", JSON.stringify(historial)),
        [historial]
      );
      const BorrarCotiza = (index) => {
        Swal.fire({
          title: "¿Seguro?",
          text: "Esta acción eliminará la cotización permanentemente.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#fe9125",
          cancelButtonColor: " #00838F",
          confirmButtonText: "Sí, borrar",
        }).then((result) => {
          if (result.isConfirmed) {
            const actualizacion = [...historial];
            actualizacion.splice(index, 1);
            setHistorial(actualizacion);
            localStorage.setItem("historial", JSON.stringify(actualizacion));
            Swal.fire(
              "Borrado",
              "Se elimino registro",
              "success"
            );
          }
        });
      };
return (
  <>
  <section className={HistoStyle.contenedor}> 
        <h3>Historial de cotizaciones</h3>
    <ul className={HistoStyle.infoC}>
      {historial.map((elemento, index) => (
        <li key={index} className={HistoStyle.info}>
          <p>Fecha:{elemento.fecha}</p>
          <p>Hora:{elemento.time}</p>
          <p>Mascota:{elemento.cliente.content}</p>
          <p>Paquete:{elemento.proyecto.content}</p>
          <p>Pago mensual: ${elemento.total}</p>
          <button className={HistoStyle.btnBorr} onClick={() => BorrarCotiza(index)}>x</button>
        </li>
      ))}
    </ul>

  </section>
  <Link to={"/"} className={HistoStyle.conBtn}>
      <button type="button" className={HistoStyle.btn}>
        Volver
      </button>
    </Link>
  </>
);
};


export default Historial;