type children = {
  children : string | number
}

const Alerta = ({children}:children):JSX.Element => {
  return (
    <div className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase">
    {children}
    </div>
  )
}

export default Alerta