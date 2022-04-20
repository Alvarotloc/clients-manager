import Formulario from '../components/Formulario';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ClientesType } from "../types/clientes";
const EditarCliente = () => {
  const [cliente, setCliente] = useState<ClientesType>();
  const [cargando, setCargando] = useState<boolean>(true);
  const { id } = useParams();
  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    obtenerCliente();
  }, []);
  return (
    <>
    <h1 className="font-black text-4xl text-blue-900">{cliente?.nombre ? 'Editar Cliente' : 'No hay resultados'}</h1>
    <p className="mt-3">{cliente?.nombre ? 'Utilice este formulario para editar datos un cliente' : 'Pruebe con otro cliente'}</p>
    {cliente?.nombre && (
          <Formulario cliente={cliente} cargando={cargando}/>
    )}
</>
  )
}

export default EditarCliente