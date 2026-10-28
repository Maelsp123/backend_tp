
function getContacts(req, res) {
  res.json([
    {
      id: 1,
      nom: 'Awa Traoré',
      email: 'awa@example.com',
    },
  ]);
}

function getContactById(req, res) {
  const contactId = parseInt(req.params.id, 10);

  res.json({
    id: contactId,
    message: `Détails du contact avec l'ID : ${contactId}`,
  });
}

module.exports = {
  getContacts,
  getContactById,
};
