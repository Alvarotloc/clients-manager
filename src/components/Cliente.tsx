import { ClientesType } from "../types/clientes"
import { useNavigate } from 'react-router-dom';

interface ICliente {
    cliente : ClientesType
}

const Cliente = ({cliente}:ICliente):JSX.Element => {
    const {nombre,email,empresa,telefono,notas,id} = cliente;
    const navigate = useNavigate();
  return (
    <tr className="border-b transition-colors hover:bg-gray-50">
        <td className="p-3">{nombre}</td>
        <td className="p-3">
            <p><span className="text-gray-800 uppercase font-bold">Email: </span> {email} </p>
            <p><span className="text-gray-800 uppercase font-bold">Teléfono: </span> {telefono} </p>
        </td>
        <td className="p-3">{empresa}</td>
        <td className="p-3">
        <button type="button" className="bg-yellow-500 transition-colors hover:bg-yellow-600 block w-full text-white p-2 uppercase font-bold text-xs" onClick={() => navigate(`/clientes/${id}`)}>Ver</button>
            <button type="button" className="bg-blue-600 transition-colors hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3">Editar</button>
            <button type="button" className="bg-red-600 transition-colors hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3">Eliminar</button>
        </td>
    </tr>
  )
}

export default Cliente