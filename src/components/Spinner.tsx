import "../styles/Spinner.css";
//utilizamos el spinner sacado de la página: https://tobiasahlin.com/spinkit/, es código totalmente reutilizado de su página por lo que los derechos son únicamente suyos. Al igual que parte del css utilizado en este proyecto.
const Spinner = (): JSX.Element => {
  return (
    <div className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  );
};

export default Spinner;
