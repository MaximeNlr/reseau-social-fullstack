const express = require('express');
const db = require('./Config/db.js');
const cors = require('cors');
const Routes = require('./Routes/Routes.js');
const cookieParser = require('cookie-parser');


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-type', 'Authorization'], 
    credentials: true
}));

app.use('/api', Routes);

db.connect(err => {
    if (err)
    {
        console.error("Erreur lors de la connexion a la base de données:", err);
        return;
    }
    console.log("Connecté a MySQL !");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
