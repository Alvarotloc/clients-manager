import { valoresForm } from '../components/Formulario';

//creamos la función helper para hacer fetch, la cual distingue si la petición tiene cuerpo (es decir, si se crea o modifica) o si no tiene cuerpo (es decir, si se usa el método get)

export const fetchForm = (url:string,method:string,body?:valoresForm) => {
    if(body){
        return fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => res.json());
    }
    fetch(url, {
        method: method
      }).then((res) => res.json());
}