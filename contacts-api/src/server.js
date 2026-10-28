const express = require('express');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api', (req, res) => {
  res.json({
    message: 'Mon API fonctionne !',
  });
});

app.use('/api/contacts', contactRoutes);


app.use((req, res) => {
  res.status(404).json({
    message: 'Route introuvable'
  });
});

app.listen(PORT, () => {
  console.log(`Serveur disponible sur le port ${PORT}`);
});
