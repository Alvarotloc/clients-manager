//Creamos el tipo children para definir las props que nos pueden llegar, que pueden ser tipo string o tipo number si nos mandan el número de teléfono
type children = {
  children : string | number
}
//Creamos componente alerta, que recibe la prop children y devuelve un div con el mensaje de error
const Alerta = ({children}:children):JSX.Element => {
  return (
    <div className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase">
    {children}
    </div>
  )
}

export default Alerta