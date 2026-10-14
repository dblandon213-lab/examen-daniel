const sqlite3 = require('sqlite3').verbose();

// 1. Crear o conectar con la base de datos (esto genera automáticamente el archivo .db)
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error al abrir la base de datos', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

// 2. Crear la tabla 'productos' automáticamente si no existe
db.run(`CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    categoria TEXT,
    precio REAL
)`, (err) => {
    if (err) {
        console.error('Error al crear la tabla', err.message);
    } else {
        console.log('Tabla productos lista o creada correctamente.');
    }
});

// 3. Ruta para recibir los datos cuando envíes el formulario desde el HTML
// (Asegúrate de que tu formulario en HTML tenga method="POST" y action="/guardar")
app.post('/guardar', (req, res) => {
    const { nombre, categoria, precio } = req.body;
    
    const query = `INSERT INTO productos (nombre, categoria, precio) VALUES (?, ?, ?)`;
    
    db.run(query, [nombre, categoria, precio], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Producto guardado con ID: ${this.lastID}`);
        res.send("¡Producto guardado en la base de datos con éxito!");
    });
});

module.exports = db;