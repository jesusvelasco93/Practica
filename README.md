# Practica
Práctica de HandSon Backend

## Pasos para arrancar el proyecto.

1) Descargar proyecto de https://github.com/jesusvelasco93/Practica de la rama develop
2) Hacer en nodepop, npm install
3) Arrancar el servidor mongoDB
4) Hacer npm run install_db.js
5) Hacer nodemon para inicializar el servidor de Nodepop

## Documentación para utilizar el API de Nodepop

En esta API existen dos routes que se podran utilizar por parte de cualquier usuario
para realizar la carga de anuncios y el registro de usuarios. Esta es la primera versión
del API y posteriormente se implementará la creación de anuncios a través del API.

Esta separado en dos routes diferentes que habra que cargar para poder utilizarlos, así
como sus modelos asociados para que el API funcione correctamente.


!----------------------------------- Anuncios.js --------------------------------------!

En primer lugar hay que requerir el modelo que utilizaremos posteriormente para la carga
de anuncios en nuestra aplicación a través del router.

    require("./models/anuncio-model");

Una vez que hemos requerido el modelo para usarlo en nuestros routes realizaremos la car-
ga del router en nuestro proyecto para utilizar el API

    var apiAnuncios = require('./routes/api/anuncios');

Cuando ya hemos realizado la instalación y la carga de los módulos, podremos utilizar las
siguientes funciones con los siguientes parámetros y que devolverán los siguientes datos
tanto por parte del error como si no hay ningún contratiempo.

Para poder realizar las acciones de este módulo, habrá que estar autenticado de alguno de
los usuarios registrados en la base de datos. Para registrar un nuevo usuario bastará con
realizar el Post en Usuarios.js.

    - En este módulo podremos realizar el método POST en la ruta raíz del directorio que 
    hayamos establecido para este modulo de nuestra aplicación.

    En dicho método tendremos que pasarle obligatoriamente los parámetros nombre, precio,
    venta, foto y tags. Dichos campos no pueden ser vacíos y anuncios con el mismo nombre.

        - nombre: Nombre del anuncio a publicar 
        - precio: Precio de venta, solo valores númericos
        - venta: Si esta a venta (true), o es para comprarlo (false).
        - foto: Nombre de la imagen a publicar. 
        - tags: Array de Strings que contienen palabras relacionadas con el anuncio

    - En este módulo tambien podremos realizar el método GET en la ruta raíz del directorio 
    que hayamos establecido para este modulo de nuestra aplicación. Además, podremos aña-
    dirle los siguientes parametros a la query de la URL para que nos filtre los resultados
    por los parámetros que queramos dentro de los disponibles. Los parámetros que podemos
    pasarle por la URL para que los filtre son:

        - sort: Ordenará por orden alguno de los campos guardados en la base de datos del
                anuncio (Nombre, Tags, Precio, Venta, Foto).
        - venta: Filtrará los elementos a mostrar por true o false, dependiendo de si esta
                en venta o no.
        - tag: Mostrará los elementos que contengan dichos tags.
        - nombre: Devolverá todos anuncios que coincidan parcial o totalmente con la pala-
                bra introducida.
        - precio: Introducirá el precio mínimo y máximo de los elementos que mostrara por
                pantalla con el siguiente formato, (50-100) pudiendo no introducir alguno
                de ellos.
        - inicio: Quitará los elementos iniciales que le digamos de la busqueda que vayamos
                a realizar.
        - limit: Mostrará como máximo el número de elementos que le pasemos en la query.

        Un ejemplo de URL posible para filtrar es:
            /?tag​=mueble&venta​=false&precio=100&nombre=me&start​=0&limit​=2&sort​=precio 

    Esta función devolverá a la vista introducida a través de render, en el primer parametro
    y en el segundo un array de anuncios a utilizar en la vista.

        // res.render('anuncios_form', { anuncios: rows});

    - Tambien podremos utilizar el módulo TAGS haciendo una petición a través del método
    GET en la ruta raíz del directorio que hayamos establecido para este modulo de nues-
    tra aplicación barra tags (/tags). No necesitará parámetros extra y devolverá los 
    tags disponibles en nuestra base de datos sin repetir ningún elemento.

    Esta función devolverá a la vista introducida a través de render, en el primer parametro
    y en el segundo un array de tags a utilizar en la vista.

        // res.render('tags_form', { tags: rows});



!----------------------------------- Usuarios.js --------------------------------------!

En primer lugar hay que requerir el modelo que utilizaremos posteriormente para la carga
de anuncios en nuestra aplicación a través del router.

    require("./models/usuario-model");

Una vez que hemos requerido el modelo para usarlo en nuestros routes realizaremos la car-
ga del router en nuestro proyecto para utilizar el API

    var apiUsuarios = require('./routes/api/usuarios');

Cuando ya hemos realizado la instalación y la carga de los módulos, podremos utilizar las
siguientes funciones con los siguientes parámetros y que devolverán los siguientes datos
tanto por parte del error como si no hay ningún contratiempo.

    - En este módulo podremos realizar el método POST en la ruta raíz del directorio que 
    hayamos establecido para este modulo de nuestra aplicación.

    En dicho método tendremos que pasarle obligatoriamente los parámetros nombre, clave y
    correo. Dichos campos no pueden ser vacíos y no podra haber emails o usuarios repetidos
    dentro de nuestra base de datos.

        - Nombre: Este parametro no sera case sensitve, es decir, no puede ser igual que
                el nombre de otro usuario, independientemente de de mayúsculas o minúscu-
                las. No puede ser vacío.

        - Clave: Será almacenada de manera cifrada y tiene que ser obligatoriamente dis-
                tinta de vacío.

        - Correo: Se introducirá una dirección de correo, pero no se validará que cumpla
                el formato del String introducido para que sea un correo electrónico. No
                puede ser vacío, ni igual al correo de algún otro usuario.

    Si se han cumplido todas las restriciones anteriores, se devolverá el resultado de la
    operación, el usuario, el email y por seguridad la clave representada por asteriscos.

    En el caso de que haya ocurrido algún error, se devolverá el resultado de la operación
    (false) y el motivo del error porque no se ha podido realizar la operación.
