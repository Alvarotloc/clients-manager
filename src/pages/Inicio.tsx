import { useEffect, useState } from "react";
import { ClientesType } from "../types/clientes";
import Cliente from "../components/Cliente";
import { fetchForm } from "../helpers/fetchForm";

//creamos componente inicio, que ocupará el lugar de outlet en primer lugar

const Inicio = (): JSX.Element => {
  //creamos state con el hook useState, el cual será un array de ClientesType
  const [clientes, setClientes] = useState<ClientesType[]>([]);

  //hacemos la petición get según se cargue el componente, mediante el hook useEffect
  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const url = import.meta.env.VITE_API_URL;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setClientes(resultado);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerClientes();
  }, []);

  //creamos la función que ejecutará cuando demos click al botón de eliminar, primero hace una pregunta al cliente de si realmente desea eliminar el registro. Si es afirmativo se hace la petición delete mandando el id como parámetro
  const handleEliminar = async (id: number) => {
    const confirmar = confirm("¿Deseas eliminar este cliente?");
    if (confirmar) {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        fetchForm(url, "DELETE");
        //para actualizar también la parte del cliente hacemos un filter para que solo se queden aquellos que no coincidan con el id
        const arrayClientes = clientes.filter((cliente) => cliente.id !== id);
        setClientes(arrayClientes);
      } catch (error) {
        console.log(error);
      }
    }
  };
  //creamos la tabla de clientes, estilizada mediante tailwind
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>

      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <Cliente
              key={cliente.id}
              cliente={cliente}
              handleEliminar={handleEliminar}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Inicio;
