//Con este helper automatizamos una peticion fetch, es como un mini Axios hecho artesanalmente por nosotros

//este helper que es una funcion expresada no lo exportaremos por defecto, de esta forma nos vemos obligado a nombrarlo obligadamente de una sola forma y no como nosotros querramos

//internamente la programacion de este helper lo trabajaremos de tal manera que sea una closure, donde dentro tendremos los metodos, algunos privados y otros publicos

export const helpHttp = () => {
  const customFetch = (endpoint, options) => {

    const defaultHeader = {
      accept: "application/json",
    };

    //manejador de errores para cuando el endpoint no responda y quede ciclando infinitamente mi app, nos permite abortar una peticion
    const controller = new AbortController();
    options.signal = controller.signal;

    //si el usuario no especifica un metodo, por defecto es get
    options.method = options.method || "GET";

    //en el caso de que el usuario me especifique mas cabeceras
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;

    //otra parte de las peticiones es el body, pero en una peticion get no mandamos datos, solo los recibimos, sino viene body lo igualamos a falso, y despues con un condicional vemos si viene falso la borramos
    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;

    //console.log(options);

    //si despues de 1 segundo no recibo respuesta del servidor, ejecuto el metodo abort()
    setTimeout(() => controller.abort(), 1000);

    return fetch(endpoint, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrió un error",
            })
      )
      .catch((err) => err);
  };

  const get = (url, options = {}) => customFetch(url, options);

  const post = (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };

  const put = (url, options = {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  };

  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
