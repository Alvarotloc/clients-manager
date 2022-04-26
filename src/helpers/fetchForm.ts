import { valoresForm } from "../components/Formulario";
import { idType } from '../pages/Inicio';


//creamos la función helper para hacer fetch, la cual distingue si la petición tiene cuerpo (es decir, si se crea o modifica) o si no tiene cuerpo (es decir, si se usa el método delete)
export const fetchForm = (method:string,body?:(idType | valoresForm )) => {
  const url = import.meta.env.VITE_API_URL || 'http://localhost:4000/clientes/';
    if(body){
        return fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }).then(res => res.json());
    }
    fetch(url, {
        method: method
      }).then(res => res.json());
}