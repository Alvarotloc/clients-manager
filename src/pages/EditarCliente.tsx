import Formulario from '../components/Formulario';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ClientesType } from "../types/clientes";

//creamos el componente (page) Editar cliente
const EditarCliente = ():JSX.Element => {
  //creamos el state de la page, cliente y cargando.
  const [cliente, setCliente] = useState<ClientesType>();
  const [cargando, setCargando] = useState<boolean>(true);

  //sacamos el id de los params de la url para hacer fetch a un registro en específico
  const { id } = useParams();

  //hacemos la llamada a fetch cuando el componente esté listo, mediante el hook de useEffect
  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        //como es una petición get solo pasamos url, ya que es un fetch normal, sin la función helper que creamos
        const respuesta = await fetch(`http://localhost:4000/clientes/${id}`);
        const resultado = await respuesta.json();
        //la petición nos trae un array con un objeto, por lo que para acceder al objeto hay que sacarlo del array
        setCliente(resultado[0]);
      } catch (error) {
        throw error;
      }
      setCargando(false);
    };
    obtenerCliente();
  }, []);
  return (
    <>
    {/* Si existe cliente.nombre, es decir, se ha podido hacer el fetch a un registro existente, aparecerá tanto el formulario como el texto de editar cliente y 'utilice este formulario...', si no, el registro es inexistente por lo que no cargamos ni el form */}
    <h1 className="font-black text-4xl text-blue-900">{cliente?.nombre ? 'Editar Cliente' : 'No hay resultados'}</h1>
    <p className="mt-3">{cliente?.nombre ? 'Utilice este formulario para editar datos un cliente' : 'Pruebe con otro cliente'}</p>
    {cliente?.nombre && (
          <Formulario cliente={cliente} cargando={cargando}/>
    )}
</>
  )
}

export default EditarCliente