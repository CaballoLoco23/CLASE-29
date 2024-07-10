/**
 * Finalmente el archivo db.js será el que cree el objeto que conecta con la base de datos. 
 * Esa conexión utilizará el objeto mysql provisto en en el módulo mysql2
 */

//1- Importamos el modulo mysql2
 const mysql = require("mysql2");

 //2- Configuracion de la conexion (es la instanciacion). Javas se conecta con worbench
 const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: ,
 });

 //3- Conectamos
 connection.connect((err)=>{
   // Si existe un error en la conexion manejamos el error con un if
   if(err){
      console.error("Error de conexion: " + err);
      return;
   }

   //Si todo va bien
   console.log("Estado de la conexion: CONECTADA");

   //Creamos una consulta verificando la base de datos y sino existe, la creamos
   const sqlCreatedb = 'CREATE DATABASE IF NOT EXISTS movies_db';

   //Pasamos la consulta a la base de datos
   connection.query(sqlCreatedb, (err, results)=>{
      //Manejo de error
      if(err){
         console.error("Error de conexion: " + err);
         return;
      }

      //En caso de que todo funcione bien, quiere decir que se creo la BDD
      console.log("Base de datos: CREADA/EXISTENTE/GARANTIZADA");

      //Creamos la tabla si no existe
      connection.changeUser({database:"movies_db"}, (err)=>{

          //Manejo de error
      if(err){
         console.error("Error de conexion: " + err);
         return;
      }


      // Consulta para crear la tabla paises si no existe
      const createPaisesTableQuery = `
      CREATE TABLE IF NOT EXISTS paises (
          idPais INT AUTO_INCREMENT PRIMARY KEY,
          nombrePais VARCHAR(100) NOT NULL
      );
  `;
      // En caso de exito, creamos la consulta SQL que crea la tabla
      const createTableQuery = `
                CREATE TABLE IF NOT EXISTS movies (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    director VARCHAR(255) NOT NULL,
                    year INT NOT NULL,
                    idPais INT,
                    CONSTRAINT fkidPais FOREIGN KEY (idPais) REFERENCES paises (idPais)   
                );
            `;

      


      //Pasamos la consulta a la base de datos
      connection.query(createTableQuery, (err, results) => {

         // en caso de error
         if (err) {
            console.error('Error al crear la tabla: '+ err);
            return;
        }

        //exito
        console.log("Tabla1: CREADA/EXISTENTE/GARANTIZADA");

      })

      //Pasamos la consulta a la base de datos
      connection.query(createPaisesTableQuery, (err, results) => {

         // en caso de error
         if (err) {
            console.error('Error al crear la tabla: '+ err);
            return;
        }

        //exito
        console.log("Tabla2: CREADA/EXISTENTE/GARANTIZADA");

      })
      

      })

   })
    
 })

 //Exportacion del modulo
 module.exports =  connection;

