/// src/controllers/contactController.js
let contacts = [
  { id: 1, nom: 'Awa Traoré', email: 'awa@example.com' },
  { id: 2, nom: 'Moussa Ouédraogo', email: 'moussa@example.com' },
];

let prochainId = 3;

function getContacts(req, res) {
  res.status(200).json(contacts);
}

function getContactById(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: 'Identifiant invalide.',
    });
  }

  const contact = contacts.find((item) => item.id === id);

  if (!contact) {
    return res.status(404).json({
      message: 'Contact introuvable.',
    });
  }

  return res.status(200).json(contact);
}

function creerContact(req, res) {
  const nom = req.body?.nom?.trim();
  const email = req.body?.email?.trim();

  if (!nom || !email) {
    return res.status(400).json({
      message: 'Le nom et l’adresse e-mail sont obligatoires.',
    });
  }

  const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!emailValide) {
    return res.status(400).json({
      message: 'Adresse e-mail invalide.',
    });
  }

  const contact = {
    id: prochainId++,
    nom,
    email,
  };

  contacts.push(contact);

  return res.status(201).json({
    message: 'Contact créé avec succès.',
    contact,
  });
}

function modifierContact(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: 'Identifiant invalide.',
    });
  }

  const contact = contacts.find((item) => item.id === id);

  if (!contact) {
    return res.status(404).json({
      message: 'Contact introuvable.',
    });
  }

  const nom = req.body?.nom?.trim();
  const email = req.body?.email?.trim();

  if (!nom || !email) {
    return res.status(400).json({
      message: 'Le nom et l’adresse e-mail sont obligatoires.',
    });
  }

  const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!emailValide) {
    return res.status(400).json({
      message: 'Adresse e-mail invalide.',
    });
  }

  contact.nom = nom;
  contact.email = email;

  return res.status(200).json({
    message: 'Contact modifié avec succès.',
    contact,
  });
}

function supprimerContact(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: 'Identifiant invalide.',
    });
  }

  const index = contacts.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: 'Contact introuvable.',
    });
  }

  const contactSupprime = contacts.splice(index, 1)[0];

  return res.status(200).json({
    message: 'Contact supprimé avec succès.',
    contact: contactSupprime,
  });
}

module.exports = {
  getContacts,
  getContactById,
  creerContact,
  modifierContact,
  supprimerContact,
};


//// src/routes/contactRoutes.js


const express = require('express');

const router = express.Router();

const {
  getContacts,
  getContactById,
  creerContact,
  modifierContact,
  supprimerContact,
} = require('../controllers/contactController');

router.get('/', getContacts);
router.get('/:id', getContactById);
router.post('/', creerContact);
router.put('/:id', modifierContact);
router.delete('/:id', supprimerContact);

module.exports = router;


///// src/server.js


const express = require('express');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = 3000;

// Permet de lire les requêtes contenant du JSON.
app.use(express.json());

// Route de vérification du serveur.
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API de gestion de contacts opérationnelle.',
  });
});

// Routes de gestion des contacts.
app.use('/api/contacts', contactRoutes);

// Route introuvable.
app.use((req, res) => {
  res.status(404).json({
    message: 'Route introuvable.',
  });
});

// Gestion des erreurs, notamment d'un JSON mal formé.
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      message: 'Le JSON envoyé est invalide.',
    });
  }

  console.error(err);

  return res.status(500).json({
    message: 'Erreur interne du serveur.',
  });
});

app.listen(PORT, () => {
  console.log(`API disponible sur http://localhost:${PORT}`);
});
