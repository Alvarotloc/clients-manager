import { ClientesType } from "../types/clientes";
import { useNavigate } from "react-router-dom";

//creamos la interfaz de cliente, es decir, de sus props
interface ICliente {
  cliente: ClientesType;
  handleEliminar: Function;
}

//creamos el componente Cliente, el cuál recibe el cliente en sí y la función de eliminarlo
const Cliente = ({ cliente, handleEliminar }: ICliente): JSX.Element => {
  //hacemos destructuring de todo el objeto cliente para evitar sintaxis de punto y definimos el navigate
  const { nombre, email, empresa, telefono, id } = cliente;
  const navigate = useNavigate();
  //retorna cada parte de la tabla que va a ocupar un cliente
  return (
    <tr className="border-b transition-colors hover:bg-gray-50">
      <td className="p-3 text-center">{nombre}</td>
      <td className="p-3">
        <p className="text-center">
          <span className="text-gray-800 uppercase font-bold">Email: </span>{" "}
          {email}{" "}
        </p>
        <p className="text-center">
          <span className="text-gray-800 uppercase font-bold">Teléfono: </span>{" "}
          {telefono}{" "}
        </p>
      </td>
      <td className="p-3 text-center">{empresa}</td>
      <td className="p-3">
        {/* tanto ver como editar simplemente hacen redirecciones (aunque en base al ID), y el botón eliminar ejecuta la función handleEliminar */}
        <button
          type="button"
          className="bg-yellow-500 transition-colors hover:bg-yellow-600 block w-full text-white p-2 uppercase font-bold text-xs"
          onClick={() => navigate(`/${id}`)}
        >
          Ver
        </button>
        <button
          type="button"
          className="bg-blue-600 transition-colors hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3"
          onClick={() => navigate(`/editar/${id}`)}
        >
          Editar
        </button>
        <button
          type="button"
          className="bg-red-600 transition-colors hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3"
          onClick={() => handleEliminar(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Cliente;
