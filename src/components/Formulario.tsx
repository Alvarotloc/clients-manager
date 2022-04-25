import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { fetchForm } from "../helpers/fetchForm";
import { ClientesType } from "../types/clientes";
import Alerta from "./Alerta";
import Spinner from "./Spinner";
//importamos Formik para validar el formulario, importamos useNavigate para redireccionar, yup para más validación y el resto de funciones, tipos, y componentes a utilizar

//tipamos los valores que va a tener el formulario
export interface valoresForm {
  nombre: string;
  empresa: string;
  email: string;
  telefono: number | string;
  notas: string;
}

//tipamos las props que va a tener el formulario
interface IForm {
  cliente: ClientesType;
  cargando: boolean;
}

const Formulario = ({ cliente, cargando }: IForm): JSX.Element => {
  //definimos la constante navigate para utilizar el hook
  const navigate = useNavigate();

  //creamos el schema que valida los campos obligatorios del form
  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre es demasiado corto")
      .max(20, "El mombre es demasiado largo")
      .required("El nombre del cliente es obligatorio"),
    empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
    email: Yup.string()
      .email("El email ha de tener un formato válido")
      .required("El email es obligatorio"),
    telefono: Yup.number()
      .typeError("El número no es válido")
      .integer("El número no es válido")
      .positive("El número no es válido"),
  });


  //creamos la función que ha de ejecutarse cuando hayamos hecho submit en el formulario
  const handleSubmit = async(values: valoresForm) => {
    try {
      //preguntamos, si existe cliente.id significa que estamos editando, por lo que mandamos con el método put y la url tiene acceso al id
      if(cliente.id){
        const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`;
        await fetchForm(url,'PUT',values);
        return navigate("/");
      }
      //si no se cumple, simplemente añadimos el registro a la bbdd
        const url = import.meta.env.VITE_API_URL;
        await fetchForm(url,'POST',values);
        navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //si está cargando mostramos el spinner de carga, si no, el componente
  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {/* diferenciamos entre editar y crear mediante una de las propiedades del objeto cliente */}
        {cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
      </h1>
      <Formik
      // definimos los valores iniciales del form, esta sintaxis es parecida a un operador ternario, ya que si existe usa la propiedad y si no lo deja vacio
      // teléfono ha de ponerse como string para que no aparezca un 0 directamente en el form
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        //con esta opción permitimos que se puedan reasignar valores, es algo propio de formik
        enableReinitialize={true}
        //añadimos la funcionalidad del submit y reseteamos form
        onSubmit={async (values: valoresForm, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {/* Empieza el formulario como tal, cada field es un input pero con sintaxis de formik, por cada input comprueba que no existan errores y si existen los manda de prop a alerta para avisar al usuario */}
        {({ errors, touched }) => {
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="nombre">
                  Nombre:
                </label>
                <Field
                  type="text"
                  placeholder="Nombre Cliente"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  id="nombre"
                  name="nombre"
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="empresa">
                  Empresa:
                </label>
                <Field
                  type="text"
                  placeholder="Empresa Cliente"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  id="empresa"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="email">
                  Email:
                </label>
                <Field
                  type="email"
                  placeholder="Email Cliente"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  id="email"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="telefono">
                  Teléfono:
                </label>
                <Field
                  type="tel"
                  placeholder="Teléfono Cliente"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  id="telefono"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="notas">
                  Notas:
                </label>
                <Field
                  as="textarea"
                  type="text"
                  placeholder="Notas Cliente"
                  className="mt-2 block w-full p-3 bg-gray-50 h-40"
                  id="notas"
                  name="notas"
                />
              </div>
              <input
                type="submit"
                value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg cursor-pointer transition-colors hover:bg-blue-900"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

//necesitamos de estas defaultProp ya que pueden o no ser pasadas al componente, dependiendo si se accede desde editar o de crear
Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};

export default Formulario;
