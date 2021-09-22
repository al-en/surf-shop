# Proyecto surf-shop
Proyecto con Node.js y ejs para una tienda de surf.

# Paso a paso
## Instalar express

Instalar el generador de aplicaciones Express
```bash
npm install express-generator -g
```

Crear el proyecto 

```bash
express --view=ejs surf-store
```

*ejs: Embedded JavaScript templating.
También se puede usar otro templating como *pug*.

Instalar librerías adicionales
```
npm i -S mongoose passport
```

Instalar librería para *debugging*
```
npm install locus --save-dev
```

Instalar ibrería para manejar variables de entorno
```
npm install -D dotenv
```

Instalar librería para reiniciar el servidor automaticamente cuando haya algún cambio 
```
npm install -g nodemon
o
npm i --save-dev nodemon
``` 

Asegurarse que el body-parser esté instalado


Crear las carpetas *controllers*, *models* y *middleware*

## Crear las rutas
En la carpeta "routes" se deben crear los archivos de rutas y cada archivo se debe llamar en el "app.js"

```javascript
const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const reviewsRouter = require('./routes/reviews');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/reviews', reviewsRouter);
app.use('/users', usersRouter);
```

Para el caso del router de "reviews" se debe agregar la opción *mergeParams* en *true*. Esto permite que pueda recibir el post id.

```javascript
const router = express.Router({mergeParams:true});
```

## Crear los modelos
Para los modelos se usará la librería *mongoose* 

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelSchema = new Schema({});

module.exports = mongoose.Schema('Model', ModelSchema);
```

## Autenticación con Passport
Instalar las librerías de passport que se necesitan

```
npm install -S passport passport-local passport-local-mongoose express-session
```

En el archivo **app.js** importar *express-session*, *passport* y el model *User* y configurar el uso de sesiones y el passport.

```js
app.use(session({
  secret: 'hello daddy hello mom!',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
```

Crear el *index controller* que debe llamarse en el *index routes*. El *controller* va a contener la lógica.

## Conexión con Mongo DB
En el archivo **app.js** se debe importar *mongoose* e iniciar la conexión.

```js
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.eevsc.mongodb.net/<db_name>?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useCreateIndex: true
}).then(()=>{
  console.log('Succesfully connected!');
}).catch((err)=>{
  console.log('Error while trying to connect', err);
});
```

## Creación de login y logout
Se debe modificar el archivo *routes/index.js* según la [documentación](https://github.com/saintedlama/passport-local-mongoose/blob/main/examples/login/routes.js) del *passport-local-mongoose*.

Posteriormente se puede llevar la lógica de las funciones de cada ruta al artchivo *controllers/index.js* y luego estas funciones se importan en el *routes/index.js*

## Creación de las vistas

* Para la vista *posts/edit* se usará l librería *method_override* para hacer el envío del método PUT en el action del formulario.
Se instala la librería
```
npm install -S method-override
```

Luego se configura en el *app.js*
```js
const methodOverride = require('method-override');
/* ... */
app.use(methodOverride('_method'));
```