import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { fetchForm } from "../helpers/fetchForm";
import { ClientesType } from "../types/clientes";
import Alerta from "./Alerta";
import Spinner from "./Spinner";

export interface valoresForm {
  nombre: string;
  empresa: string;
  email: string;
  telefono: number | string;
  notas: string;
}

interface IForm {
  cliente: ClientesType;
  cargando: boolean;
}

const Formulario = ({ cliente, cargando }: IForm): JSX.Element => {
  const navigate = useNavigate();

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

  const handleSubmit = async(values: valoresForm) => {
    try {
      if(cliente.id){
        const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`;
        await fetchForm(url,'PUT',values);
        return navigate("/clientes");
      }
        const url = import.meta.env.VITE_API_URL;
        await fetchForm(url,'POST',values);
        navigate("/clientes");
    } catch (error) {
      console.log(error);
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
      </h1>
      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values: valoresForm, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
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

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};

export default Formulario;
