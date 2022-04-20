import { valoresForm } from '../components/Formulario';

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