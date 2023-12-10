import { useEffect, useState} from "react";
import Swal from "sweetalert2";
import FormStyle from "../styles/Form.module.css"


const Formulario = () => {
  const [historial, setHistorial] = useState(() => {
    let storage = localStorage.getItem("historial")
    if(storage) return JSON.parse(storage)
    localStorage.setItem("historial",JSON.stringify([]))
    return []
  });
    const [load, setLoad] = useState(false)
    const [listOne, setListOne] = useState([])
    const [listTwo, setListTwo] = useState([]) 
    const [optionOne, setOptionOne] = useState(null)
    const [optionTwo, setOptionTwo] = useState(null)
    const [value, setValue] = useState(null)
    const [total, setTotal] = useState(null)

    useEffect(() => {
      setLoad(true);
      fetch("/data.json").then((res) => res.json()).then((datos) => {
          console.log(datos)
          setListOne(datos.filter(({ type }) => type == "mascota"));
          setListTwo(datos.filter(({ type }) => type== "paquete"));
        }).catch((error) => console.error(error))
        .finally(() => setLoad(false));
    }, []);


    useEffect(
        () =>localStorage.setItem("historial", JSON.stringify(historial)),
        [historial]
      );

      const cotizar = (e) => {
        e.preventDefault();
        if(value <=0 || optionOne == null || optionTwo == null){
          return Swal.fire("","Completa todos los datos", "error")}
        setLoad(true)
        setTimeout(() => {
          setTotal(2000 * parseFloat(value) * optionOne * optionTwo)
          setLoad(false)
          e.target.reset()
        }, 1000);
        
        console.log(optionOne, optionTwo, value, optionOne)
      };

      const guardar = () => {
       
        setHistorial([
          ...historial,
          {
            fecha: new Date().toLocaleDateString("es-mx"),
            time: new Date().toLocaleTimeString("es-mx"),
            cliente:listOne.find(({id})=> id == optionOne),
            proyecto:listTwo.find(({id})=> id == optionTwo),
            total: total.toFixed(2),
          },
        ]);
        return Swal.fire("","Se guardo la cotización", "success")
        //setTotal(null)
      };


    return (
      <>
        
        {load && (
          <>
            <p>Cargando los datos...</p>
          </>
        )}
        {!load && (
          <form onSubmit={cotizar} className={FormStyle.form}>
            <section className={FormStyle.contenedorMasc}>
              <label htmlFor="cliente"> Mascota...</label>
              <select className={FormStyle.MascSelect}
                name="cliente"
                id="cliente"
                defaultValue={0}
                onChange={({ target }) => setOptionOne(target.value)}
              >
                <option value={0} disabled>
                  Seleccionar Mascota
                </option>
                {listOne.map(({ id, content}) => (
                  <option key={id} value={id}>
                    {content}
                  </option>
                ))}
              </select>
            </section>

            <section className={FormStyle.contenedorMasc}>
              <label htmlFor="tipo"> Tipo de Paquete</label>
              <select className={FormStyle.MascSelect}
                name="tipo"
                id="tipo"
                defaultValue={0}
                onChange={({ target }) => setOptionTwo(target.value)}
              >
                <option value={0} disabled>
                  Seleccionar paquete
                </option>
                {listTwo.map(({ id, content}) => (
                  <option key={id} value={id}>
                    {content}
                  </option>
                ))}
              </select>
            </section>

            <section className={FormStyle.contenedorMasc}>
              <label htmlFor="edad">
                Edad de tu mascota :<span>{value}</span>
              </label>
              <input
                type="range"
                name="edad"
                id="edad"
                min={1}
                max={15}
                step={1}
                defaultValue={1}
                onInput={({ target }) => setValue(target.value)}
              />
            </section>
            <button type="submit" className={FormStyle.btn}>Cotizar</button>
            <p className={FormStyle.seleccion}>Seleccione Mascota, Tipo de Cobertura y edad</p>
          </form>
        )}
        {total && (
          <form onSubmit={(e)=> e.preventDefault()} className={FormStyle.resumen}>
            <h3>Total del Seguro pago mensual ${total}</h3>
            <p></p>
            
          </form>
        )}

      {total && (
          <form onSubmit={(e)=> e.preventDefault()} className={FormStyle.form2}>
           
            
            <button type="button" onClick={guardar} className={FormStyle.btn}>Guardar</button>
          </form>
        )}  

        
      </>
      
    );
};

export default Formulario;