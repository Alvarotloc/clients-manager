import Formulario from '../components/Formulario';
//creamos el componente que será visto al acceder al área de crear cliente. Este componente utiliza el componente del formulario SIN PROPS (para eso tiene el defaultValue)
const NuevoCliente = ():JSX.Element => {
  return (
    <>
        <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
        <p className="mt-3">Complete los siguientes campos para registrar un cliente</p>
        <Formulario />
    </>
  )
}

export default NuevoCliente