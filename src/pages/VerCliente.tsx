import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ClientesType } from "../types/clientes";
import Spinner from "../components/Spinner";

//creamos el componente / page VerCliente

const VerCliente = (): JSX.Element => {
  //creamos el state de la page, cliente y cargando.
  const [cliente, setCliente] = useState<ClientesType>();
  const [cargando, setCargando] = useState<boolean>(true);
  //sacamos el id de los params de la url para hacer fetch a un registro en específico
  const { id } = useParams();
  //hacemos la llamada a fetch cuando el componente esté listo, mediante el hook de useEffect
  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        //como es una petición get solo pasamos url, ya que es un fetch normal, sin la función helper que creamos
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
      {/* si está cargando muestra el spinner de carga, si no muestra el componente */}
      {cargando ? (
        <Spinner />
        // si encuentra cliente.nombre (como propiedad requerida, podría ser cliente?.email etc) muestra todo el componente con sus datos únicos
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
        // si no encuentra esa propiedad significa que no se ha completado correctamente y no hay resultados válidos que mostrar
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
