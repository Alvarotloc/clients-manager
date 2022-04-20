import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Alerta from "./Alerta";

interface valoresForm {
  nombre: string;
  empresa: string;
  email: string;
  telefono: number | string;
  notas: string;
}

const Formulario = (): JSX.Element => {
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

  const handleSubmit = (values: valoresForm) => {};

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        Agregar Cliente
      </h1>
      <Formik
        initialValues={{
          nombre: "",
          empresa: "",
          email: "",
          telefono: "",
          notas: "",
        }}
        onSubmit={(values: valoresForm) => handleSubmit(values)}
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
                value="Agregar Cliente"
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg cursor-pointer transition-colors hover:bg-blue-900"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Formulario;
