// app.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const Client = require('ssh2').Client;
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
const { exec } = require('child_process');
const os = require('os');
const { DownloaderHelper } = require('node-downloader-helper');


app.use(bodyParser.urlencoded({ extended: true }));

//Configurar middleware para parsear JSON
app.use(bodyParser.json());

app.use(express.static(__dirname));

const fileUpload = require('express-fileupload');
const { timeStamp, log } = require('console');
app.use(fileUpload());

//Datos de conexión SSH
const sshConfig = {
    host: '10.10.0.2',
    port: 22704,
    username: 'dydetec',
    password: 'Z0p0rt3', // o utiliza privateKey
};


//Ruta en el servidor remoto donde se moverá el archivo
const rutaRemota = '/home/dydetec/Files'; // Cambia esta ruta



// Configuración de express-session
app.use(session({
  secret: '123456789', // Cambia esto a una cadena segura y secreta
  resave: false,
  saveUninitialized: true,
}));

// Configuración de la conexión MySQL
const db = mysql.createConnection({
  host: '192.168.106.25',
  user: 'wicho',
  password: '20051997',
  database: 'print',
  port: '3003',
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.message);
  } else {
    console.log('Conexión a la base de datos exitosa');
  }
});

// En app.js
// ...

app.get('/', (req, res) => {
  res.render('login'); // Suponiendo que tienes un archivo login.ejs en tu carpeta views
});

app.post('/login', (req, res) => {
  const { usuario, password } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE usuario = ? AND password = ?';
  db.query(sql, [usuario, password], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al autenticar el usuario' });
    } else {
      if (result.length > 0) {
        // Usuario autenticado correctamente
        const tipoUsuario = result[0].tipo_usuario; // Corregir aquí
        const nombreUsuario= result[0].nombre;
        const user= result[0].usuario;
        // Almacena el estado de la sesión
        req.session.usuario = {
          id: result[0].id,
          tipo: tipoUsuario,
          nombre: nombreUsuario,
          usuario: user,
        };

        // Redirige según el tipo de usuario
        if (tipoUsuario === 'admin') {
          res.redirect('/main'); // Redirige a la vista principal
        } else if (tipoUsuario === 'printer') {
          res.redirect('/impresion_nueva'); // Redirige a la vista secundaria
        } else {
          res.status(403).json({ error: 'Tipo de usuario no válido' });
        }
      } else {
        // Credenciales incorrectas
        res.status(401).json({ error: 'Credenciales incorrectas' });
      }
    }
  });
});


// Ruta para mostrar la página principal
app.get('/main',verificarAutenticacion, (req, res) => {
  res.render('index',{nombreUsuario: req.session.usuario.nombre}); // Ajusta el nombre de la vista si es diferente
});



function verificarAutenticacion(req, res, next) {
  if (req.session && req.session.usuario) {
    const tipoUsuario = req.session.usuario.tipo;
    const nombreUsuario= req.session.usuario.nombre;
    
    // Verificar si el usuario tiene el tipo adecuado para acceder a la ruta
    if (tipoUsuario === 'printer' && (req.originalUrl !== '/impresion_nueva' && req.originalUrl !== '/status' && req.originalUrl !== '/impresion')) {
      return res.status(403).json({ error: 'Acceso no permitido para el tipo de usuario' });
    }

    return next();
  } else {
    return res.status(401).json({ error: 'No autenticado' });
  }
}


// ...

// Ruta para mostrar los datos en una tabla
app.get('/datos',verificarAutenticacion, (req, res) => {
  const sql = 'SELECT * FROM impresiones';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener datos de MySQL' });
    } else {
      res.render('dataView', { datos: result });
    }
  });
});


// Ruta para procesar el formulario de creación de usuario
app.post('/usuarios', verificarAutenticacion, (req, res) => {
  const { nombre, area, empresa, usuario, password, tipo_usuario } = req.body;

  const sql = 'INSERT INTO usuarios (nombre, area, empresa, usuario, password, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [nombre, area, empresa, usuario, password, tipo_usuario], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al crear el usuario' });
    } else {
      res.redirect('/usuarios'); // Redirige a la lista de usuarios o a donde prefieras
    }
  });
});

// ...

// Ruta para mostrar el formulario de creación de usuario
app.get('/usuarios/nuevo',verificarAutenticacion, (req, res) => {
  res.render('createUser');
});

// Ruta para mostrar los datos en una tabla
app.get('/usuarios',verificarAutenticacion, (req, res) => {
  const sql = 'SELECT * FROM usuarios';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener datos de MySQL' });
    } else {
      res.render('dataUser', { datos: result });
    }
  });
});

app.get('/logout', (req, res) => {
  // Destruir la sesión
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: 'Error al cerrar sesión' });
    } else {
      res.redirect('/'); // Redirige a la página de inicio de sesión
    }
  });
});

app.get('/impresion_nueva',verificarAutenticacion,(req, res) => {
  res.render('impresion', { tipoUsuario: req.session.usuario.tipo, nombreUsuario: req.session.usuario.nombre });
});


app.post('/impresion', verificarAutenticacion, (req, res) => {
  const { fecha, numImpresiones, proyecto, color, observaciones,area } = req.body;
  const nombre = req.session.usuario.nombre;
  const user = req.session.usuario.usuario;

  // Verificar si se subió un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No se ha seleccionado ningún archivo'});
  }

  // Manejar la carga del archivo
  const archivo = req.files.archivo;
  const nombreArchivoUsuario = `${user}_${archivo.name}`;
  const nombreUsuario = os.userInfo().username;
  const rutaDocumentos = path.join('C:', 'Users', nombreUsuario, 'Documents');
  const nombreCarpeta = 'file_temp_print';
  const rutaCarpeta = path.join(rutaDocumentos, nombreCarpeta);
  if (!fs.existsSync(rutaCarpeta)) {
    fs.mkdirSync(rutaCarpeta, { recursive: true });
  }
  const rutaArchivoLocal = path.join(rutaCarpeta, nombreArchivoUsuario);
  
  

  archivo.mv(rutaArchivoLocal, (err) => {
    if (err) {
      console.error('Error al guardar el archivo localmente:', err);
      return res.status(500).json({ error: 'Error al guardar el archivo' });
    }

    // Configuración de conexión SSH
    const conn = new Client();

    conn.on('ready', () => {
      // Subir el archivo al servidor remoto
      conn.sftp((err, sftp) => {
        if (err) {
          conn.end();
          console.error('Error al establecer conexión SFTP:', err);
          return res.status(500).json({ error: 'Error al establecer conexión SFTP' });
        }

        // Modificar el nombre del archivo antes de construir la ruta remota
        const rutaArchivoRemoto = path.posix.join(rutaRemota,`${user}_${archivo.name}`);

        // Crear un stream de escritura en el servidor remoto
        const stream = sftp.createWriteStream(rutaArchivoRemoto);

        // Manejar errores durante la transferencia del archivo
        stream.on('error', (err) => {
          console.error('Error durante la transferencia del archivo:', err);
          conn.end();
          return res.status(500).json({ error: 'Error durante la transferencia del archivo' });
        });

        // Escuchar eventos del stream
        stream.on('close', () => {
          conn.end();
          console.log('Archivo enviado correctamente al servidor remoto');

          // Eliminar el archivo local después de transferirlo
          fs.unlinkSync(rutaArchivoLocal);

          // Continuar con la inserción en la base de datos
          const sql = 'INSERT INTO impresiones (fecha, nombre, numImpresiones, proyecto, color, observaciones, nombreArchivo, estado, area) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)';
          db.query(sql, [fecha, nombre, numImpresiones, proyecto, color, observaciones, nombreArchivoUsuario, 'stanby', area], (err, result) => {
            if (err) {
              console.error('Error al insertar en la base de datos:', err);
              return res.status(500).json({ error: 'Error al crear la impresión' });
            }

            console.log('Registro de impresión creado correctamente');

            return res.redirect('/impresion_nueva');
          });
        });

        // Crear un stream de lectura del archivo local y escribirlo en el stream de escritura en el servidor remoto
        const readStream = fs.createReadStream(rutaArchivoLocal);
        readStream.pipe(stream);
      });
    });

    // Manejar errores durante la conexión SSH
    conn.on('error', (err) => {
      console.error('Error de conexión SSH:', err);
      return res.status(500).json({ error: 'Error de conexión SSH' });
    });

    // Conectar al servidor SSH
    conn.connect(sshConfig);
  });
});

app.get('/status', verificarAutenticacion,(req, res) => {
  const nombreUsuario= req.session.usuario.nombre;
  const sql = 'SELECT * FROM impresiones WHERE nombre = ?';
  db.query(sql,[nombreUsuario], (err, result) => {
    if(err) {
      res.status(500).json({error: 'Error de consulta'});
    } else {
      res.render('impresionesstatus', { datosimpresiones: result})
    }

  });
 
});

app.post('/imprimirdoc', (req, res) => {
  const conn = new Client();
  const { nombreArchivo } = req.body;

  conn.on('ready', () => {
    // Conectar al servidor SFTP
    conn.sftp((err, sftp) => {
      if (err) {
        conn.end();
        console.error('Error al establecer conexión SFTP:', err);
        return res.status(500).json({ error: 'Error al establecer conexión SFTP' });
      }

      // Ruta del archivo en el servidor remoto
      const remoteFilePath = path.posix.join(rutaRemota, nombreArchivo);

      // Ruta local donde se guardará el archivo descargado
      
      
        // const nombreUsuario = os.userInfo().username;
        // const rutaDocumentos = path.join('C:', 'Users', nombreUsuario, 'Documents');
        const nombreCarpeta = 'file_temp_print';
        const localFilePath = path.join(nombreCarpeta, nombreArchivo);

  

      // Descargar el archivo del servidor remoto
      sftp.fastGet(remoteFilePath, localFilePath, {}, (downloadErr) => {
        if (downloadErr) {
          console.error('Error al descargar el archivo:', downloadErr);
          return res.status(500).json({ error: 'Error al descargar el archivo del servidor' });
        } else {
          console.log('Archivo descargado exitosamente');
          res.download(localFilePath);

          // Abrir el archivo en el programa predeterminado asociado a su tipo de archivo
          // exec(`start "" "${localFilePath}"`, (execErr) => {
          //   if (execErr) {
          //     console.error('Error al abrir el archivo:', execErr);
          //     res.status(500).json({ error: 'Error al abrir el archivo descargado' });
          //   } else {
          //     // Puedes enviar una respuesta de éxito si es necesario
          //     res.status(200).json({ mensaje: 'Archivo descargado y abierto exitosamente' });
          //     fs.unlinkSync(rutaArchivoLocal);
          //   }
          // });

          // Cerrar la conexión SFTP y SSH
          conn.end();
        }
      });
    });
  });

  // Manejar errores durante la conexión SSH
  conn.on('error', (err) => {
    console.error('Error de conexión SSH:', err);
    res.status(500).json({ error: 'Error de conexión SSH' });
  });

  // Conectar al servidor SSH
  conn.connect(sshConfig);


});



// Configurar el motor de vistas y la carpeta de vistas
app.set('view engine', 'ejs'); // Puedes usar otro motor de vistas como Handlebars o Pug
app.set('views', 'views'); // Carpeta que contiene tus archivos de vista



// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express en http://localhost:${port}`);
});
