# fullstack-phonebook

En esta parte, nuestro enfoque se desplaza hacia el backend, es decir, hacia la implementación de la funcionalidad en el lado del servidor. Implementaremos una API REST simple en Node.js utilizando la librería [Express](https://expressjs.com/), y los datos de la aplicación se almacenarán en una base de datos [MongoDB](https://www.mongodb.com/docs/). Al final de esta parte, desplegaremos nuestra aplicación en Internet.

## Despliegue Phonebook
URL: [phonebook](https://phonebook-zvar.onrender.com)

## Referencia MongoDB

MongoDB es una base de datos NoSQL orientada a documentos. En este proyecto, utilizaremos MongoDB para almacenar la información de los contactos del teléfono. Puedes encontrar más información en la [documentación oficial de MongoDB](https://www.mongodb.com/docs/).

- Para instalar MongoDB localmente, sigue las instrucciones de la [guía de instalación](https://www.mongodb.com/docs/manual/installation/).
- Para interactuar con MongoDB desde Node.js, utilizaremos la librería [mongoose](https://mongoosejs.com/).

## Referencia Express

[Express](https://expressjs.com/) es un framework minimalista para Node.js que facilita la creación de aplicaciones web y APIs. Permite definir rutas, gestionar peticiones HTTP y manejar middleware de forma sencilla.

## Referencia API REST

Una **API REST** (Representational State Transfer) es una interfaz que permite la comunicación entre sistemas utilizando los métodos HTTP estándar (GET, POST, PUT, DELETE). En este proyecto, la API REST servirá para gestionar los contactos del teléfono mediante operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

- Para instalar Express, ejecuta:  
    ```bash
    npm install express
    ```
- Consulta la [documentación oficial de Express](https://expressjs.com/es/) para más detalles sobre su uso.
- Aprende más sobre APIs REST en la [guía de MDN](https://developer.mozilla.org/es/docs/Glossary/REST).
