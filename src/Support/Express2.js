//Middleware de terceros, sirve para hacer logs de request.
const morgan = require('morgan');

const express = require('express');

//Mongoose object to connect to the database.
const mongoose = require('mongoose');

const app = express();

//Se obtiene el modelo que diseñamos para los blogs.
const {BlogModel} = require('./models/blog');

//String de conexión para Mongo DB Atlas
//connect to mongodb
const DB_URI = "mongodb+srv://ArticDynamite:HMCe4c8hiIftF8Xs@thenetninja.3v6bu.mongodb.net/samplenode?retryWrites=true&w=majority";

//Connect recibe el connection string, pero también recibirá un objeto de options para eliminar los
//comentarios de deprecated. Esto retorna una promesa de JS, por lo que podemos tratarlo como tal.
mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => {
        console.log('Connnected to DataBase');
        //Es normal que queramos que podamos obtener información de nuestro sitio web, si y solo si
        //logramos conectarnos a la base de datos primero, ya que las páginas podrían tratar por sí mismas
        //mucha información de la base de datos. Es por esto que el listen del port number se pasa
        //una vez que la conexión sea establecida.
        app.listen(3000, 'localhost', () => {
            console.log('Now, listening to port 3000');
        });

    })
    .catch((err) => {
        console.log(err);
    });

//set sirve para configurar ciertas cositas en el app de express, como el tipo de view engine por ejemplo
//EXPRESS Y EJS saben que el folder por defecto es el views, así que no hay que preocuparse por indicar donde están los archivos,
//a menos claro que eso se quiera cambiar.

app.set('view engine', 'ejs');

//Morgan se utiliza para hacer un log en la consola de las peticiones que se realizan.
app.use(morgan('dev'));

//Mongoose and mongo sandbox routes

//Este get handler se utiliza para enviar la nueva instancia que diseñamos con el constructor del modelo para los blogs.
app.get('/add-blog', (request, response) => {
    //Aca estamos usando el modelo que hicimos BlogModel para crear una nueva instancia a partir de el llamada blog.
    const blog = new BlogModel({
        title: 'New Blog',
        snippet: 'About my new blog',
        body: 'More about my new blog'
    });
    //Para guardar en la base de datos. Esto retorna una promesa, por lo que puede ser tratada como una.
    //Save va a la MongoDB Atlas e inserta el modelo en el collection.
    blog.save()
        .then((result) => {
            //Retorna la respuesta al cliente para que pueda ser visible en el navegador.
            response.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

//Este get handler se va a usar para listar los datos registrados en MongoDB Atlas
app.get('/all-blogs', (request, response) => {
    //Como no vamos a crear un blog no necesitamos usar una instancia de nuestro BlogModel,
    //sino más bien llamar a BlogModel directamente.
    //Con find buscamos todos los elementos que coinciden con el modelo BlogModel.
    BlogModel.find()
    .then((result) => {
        response.send(result);

    })
    .catch((err) => {
        console.log(err);
    });
});

//Este get handler listará solamente un blog, no todos como el de arriba
app.get('/single-blog', (request, response) => {
    BlogModel.findById('5ef8513f1b8e2128c0f327f6')
    .then((result) => {
        response.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

//Esto se hizo cuando se estudio el video de Middleware, este Middleware se ejecuta por cada petición
//Como luego de esta función hay más código, debemos indicarle que siga al código siguiente una vez que termine
//su ejecución. Para eso se pasa también por parámetro la función next y luego cuando todo termine es invocada. :)
//ESTO SOLO ERA DE EJEMPLO, LUEGO SE USA MORGAN.
// app.use((request, response, next) => {
//     console.log('MIDDLEWARE LOG');
//     console.log('New Request Made');
//     console.log('host', request.hostname);
//     console.log('method', request.method);
//     console.log('path', request.path);
//     next(); //Aquí se invoca porque ya todo terminó.
// });

//Esta parte se encarga de especificar el folder que tienen los static files, recordemos que Express tiene express.static para manejar los middleware de static files
//Cuando algún archivo que esté en el folder necesite ser llamado, no se necesita poner el nombre del folder, solo el nombre del archivo, ya que esta configuración queda acá.
app.use(express.static('assets'));

//Como configuramos el view engine a ejs, los archivos no necesitan tener extensión, node lo detecta automáticamente.
app.get('/', (request, response) => {
    //Acá esto ya no se usa, sino que se usará el termino renderizar una vista
    //response.sendFile('./views/index', {root: __dirname});
    //Se hace así ahora
    //Ok perfecto, ahora es importante recordar que el segundo parámetro de un render es un objeto
    //que se envía a ese archivo, en nuestro caso para crear contenido dinámico.
    //Se hacen unos objetos blogs para enviarlos, esto solo es para prueba.
    const blogs = [{
            title: "Yoshi finds eggs",
            snippet: "Lorem ipsum dolor sit, amet consectetur adipisicing elit."
        },
        {
            title: "Mario finds eggs",
            snippet: "Lorem ipsum dolor sit, amet consectetur adipisicing elit."
        },
        {
            title: "How to defeat bowser",
            snippet: "Lorem ipsum dolor sit, amet consectetur adipisicing elit."
        },
    ];
    response.render('index', {
        title: 'Home',
        blogContent: blogs
    });
});

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About'
    });
});


app.get('/about-us', (request, response) => {
    response.redirect('about'); //Eso es todo
});

app.get('/create', (request, response) => {
    response.render('create', {
        title: 'Create Blog'
    });
});

app.get('/create-blog', (request, response) => {
    response.redirect('create');
});

app.use((request, response) => {
    response.status(404);
    response.render('404', {
        title: '404'
    });
});