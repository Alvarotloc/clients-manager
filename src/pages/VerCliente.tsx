import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ClientesType } from "../types/clientes";
import Spinner from "../components/Spinner";

const VerCliente = (): JSX.Element => {
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
    <div>
      {cargando ? (
        <Spinner />
      ) : cliente?.nombre ? (
        <>
          <h1 className="font-black text-4xl text-blue-900">
            Ver Cliente: {cliente?.nombre}
          </h1>
          <p className="mb-10 mt-3">Información del cliente</p>
          <p className="text-4xl text-gray-600">
            {" "}
            <span className="uppercase font-bold text-gray-800">
              Cliente:{" "}
            </span>{" "}
            {cliente?.nombre}
          </p>
          <p className="text-2xl text-gray-600 mt-5">
            {" "}
            <span className="uppercase font-bold text-gray-800">
              Empresa:{" "}
            </span>{" "}
            {cliente?.empresa}
          </p>
          <p className="text-2xl text-gray-600 mt-5">
            {" "}
            <span className="uppercase font-bold text-gray-800">
              Email:{" "}
            </span>{" "}
            {cliente?.email}
          </p>
          <p className="text-2xl text-gray-600 mt-5">
            {" "}
            <span className="uppercase font-bold text-gray-800">
              Teléfono:{" "}
            </span>{" "}
            {cliente?.telefono}
          </p>
          {cliente?.notas && (
            <p className="text-2xl text-gray-600 mt-5">
              {" "}
              <span className="uppercase font-bold text-gray-800">
                Notas:{" "}
              </span>{" "}
              {cliente?.notas}
            </p>
          )}
        </>
      ) : (
        <>
          <h1 className="font-black text-4xl text-blue-900">
            No hay resultados
          </h1>
          <p className="mb-10 mt-3">Pruebe con otro cliente</p>
        </>
      )}
    </div>
  );
};

export default VerCliente;
