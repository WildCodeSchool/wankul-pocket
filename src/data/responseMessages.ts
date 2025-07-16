const userMessages = {
  error:
    "Erreur lors de la récupération des utilisateurs, veuillez réessayer ultérieurement",
  errorDetail: "Erreur lors de la récupération de l'utilisateur",
  server: "Une erreur est survenue, veuillez réessayer plus tard",
  invalidId: "Contenu invalide, veuillez recommencer",
  invalidEmail: "Contenu invalide, veuillez recommencer",
  deleted: "Utilisateur supprimé avec succès",
  deleteFail:
    "erreur lors de la suppression de l'utilisateur, veuillez réessayer ultérieurement",
  addFail:
    "erreur lors de l'ajout de l'utilisateur, veuillez réessayer ultérieurement",
  editFail:
    "erreur lors de la modification de l'utilisateur, veuillez réessayer ultérieurement",
  invalidData: "Les données fournies sont invalides",
  addSuccess: "Utilisateur ajouté avec succès",
  notFound: "Aucun utilisateur trouvé avec cet ID",
  updateSuccess: "Utilisateur mis à jour avec succès",
  addBananasFail:
    "Erreur lors de l'ajout de bananes, veuillez réessayer ultérieurement",
};

const profilPictureMessages = {
  error:
    "Erreur lors de la récupération des images, veuillez réessayer ultérieurement",
  errorDetail: "Erreur lors de la récupération de l'image",
  server: "Une erreur est survenue, veuillez réessayer plus tard",
  invalidId: "Contenu invalide, veuillez recommencer",
  deleted: "Image supprimée avec succès",
  deleteFail:
    "erreur lors de la suppression de l'image, veuillez réessayer ultérieurement",
  addFail:
    "erreur lors de l'ajout del 'image, veuillez réessayer ultérieurement",
  editFail:
    "erreur lors de la modification de l'image, veuillez réessayer ultérieurement",
  invalidData: "Les données fournies sont invalides",
  addSuccess: "Image ajoutée avec succès",
  notFound: "Aucune image trouvée avec cet ID",
  updateSuccess: "Image mise à jour avec succès",
};

const cardsMessages = {
  error:
    "Erreur lors de la récupération des cartes, veuillez réessayer ulterieurement",
  errorDetail: "Erreur lors de la récupération de la carte",
  server: "Une erreur est survenue, veuillez réessayer plus tard",
  invalidId: "Contenu invalide, veuillez recommencer",
  deleted: "Carte supprimée avec succès",
  deleteFail:
    "erreur lors de la suppression de la carte, veuillez réessayer ulterieurement",
  addFail:
    "erreur lors de l'ajout de la carte, veuillez réessayer ulterieurement",
  editFail:
    "erreur lors de la modification de la carte, veuillez réessayer ulterieurement",
  invalidData: "Les données fournies sont invalides",
  addSuccess: "Carte ajoutée avec succès",
  notFound: "Aucune carte trouvée avec cet ID",
  updateSuccess: "Carte mise à jour avec succès",
};

const boostersMessages = {
  error:
    "Erreur lors de la récupération des boosters, veuillez réessayer ulterieurement",
  errorDetail: "Erreur lors de la récupération du booster",
  server: "Une erreur est survenue, veuillez réessayer plus tard",
  invalidId: "Contenu invalide, veuillez recommencer",
  deleted: "Booster supprimé avec succès",
  deleteFail:
    "erreur lors de la suppression du booster, veuillez réessayer ulterieurement",
  addFail:
    "erreur lors de l'ajout du booster, veuillez réessayer ulterieurement",
  editFail:
    "erreur lors de la modification du booster, veuillez réessayer ulterieurement",
  invalidData: "Les données fournies sont invalides",
  addSuccess: "Booster ajouté avec succès",
  notFound: "Aucun booster trouvé avec cet ID",
  updateSuccess: "Booster mis à jour avec succès",
};

const collectionMessages = {
  error:
    "Erreur lors de la récupération de la collection, veuillez réessayer ultérieurement",
  errorDetail: "Erreur lors de la récupération de la collection",
  server: "Une erreur est survenue, veuillez réessayer plus tard",
  invalidId: "Contenu invalide, veuillez recommencer",
  invalidEmail: "Contenu invalide, veuillez recommencer",
  deleted: "Collection supprimée avec succès",
  deleteFail:
    "erreur lors de la suppression de la collection, veuillez réessayer ultérieurement",
  addFail:
    "erreur lors de l'ajout de la collection, veuillez réessayer ultérieurement",
  editFail:
    "erreur lors de la modification de la collection, veuillez réessayer ultérieurement",
  invalidData: "Les données fournies sont invalides",
  addSuccess: "Collection ajoutée avec succès",
  notFound: "Aucune collection trouvée avec ce compte",
  updateSuccess: "Collection mise à jour avec succès",
};

const tradesMessages = {
  error:
    "Erreur lors de la récupération des échanges, veuillez réessayer ultérieurement",
  errorDetail: "Erreur lors de la récupération de l'échange",
  server: "Une erreur est survenue, veuillez réessayer plus tard",
  invalidEmail: "Contenu invalide, veuillez recommencer",
  invalidId: "Contenu invalide, veuillez recommencer",
  deleted: "Echange supprimé avec succès",
  deleteFail:
    "erreur lors de la suppression de l'échange, veuillez réessayer ultérieurement",
  addFail:
    "erreur lors de l'ajout de l'échange, veuillez réessayer ultérieurement",
  editFail:
    "erreur lors de la modification de l'échange, veuillez réessayer ultérieurement",
  invalidData: "Les données fournies sont invalides",
  addSuccess: "Echange ajouté avec succès",
  notFound: "Aucun échange trouvé avec cet ID",
  updateSuccess: "Echange mis à jour avec succès",
  tradeToSelf: "Tu ne peux pas te proposer d'échange à toi-même!",
  tradeSameCard:
    "Tu ne peux pas proposer d'échange entre deux cartes identiques!",
  noUser: "Utilisateur introuvable ou non autorisé à procéder à cette action.",
  pendingTrade:
    "Une demande d'échange est déjà en cours pour l'un des deux joueurs, retente plus tard!",
  noFriend: "Tu ne peux proposer un échange qu'à un joueur de ta liste d'ami",
  quantity:
    "Seules des cartes possédées en double exemplaire minimum peuvent être échangées",
  rarity: "Seules deux cartes de même rareté peuvent être échangées",
};

const friendsMessages = {
  error:
    "Erreur lors de la récupération de la liste des amis, veuillez réessayer ultérieurement",
  errorDetail: "Erreur lors de la récupération de la liste des amis",
  server: "Une erreur est survenue, veuillez réessayer plus tard",
  invalidId: "Contenu invalide, veuillez recommencer",
  invalidEmail: "Contenu invalide, veuillez recommencer",
  deleted: "Ami supprimé avec succès",
  deleteFail:
    "erreur lors de la suppression de l'ami, veuillez réessayer ultérieurement",
  addFail: "erreur lors de l'ajout de l'ami, veuillez réessayer ultérieurement",
  editFail:
    "erreur lors de la modification de l'ami, veuillez réessayer ultérieurement",
  invalidData: "Les données fournies sont invalides",
  addSuccess: "Ami ajouté avec succès",
  notFound: "Aucun ami trouvé avec cet ID",
  updateSuccess: "Ami mis à jour avec succès",
  addFriendSuccess: "Demande d'ami envoyée avec succès",
  alreadyFriends: "Vous êtes déjà amis avec ce profil",
  alreadyRequested: "Une demande d'ami existe déjà entre ces deux profils",
  noRequests: "Aucune demande d'ami en attente",
};

const questMessages = {
  error:
    "Erreur lors de la récupération de la liste des quêtes, veuillez réessayer ultérieurement",
  errorDetail: "Erreur lors de la récupération de la liste des quêtes",
  server: "Une erreur est survenue, veuillez réessayer plus tard",
  invalidId: "Contenu invalide, veuillez recommencer",
  invalidEmail: "Contenu invalide, veuillez recommencer",
  deleted: "Quête supprimée avec succès",
  deleteFail:
    "erreur lors de la suppression de la quête, veuillez réessayer ultérieurement",
  addFail:
    "erreur lors de l'ajout de la quête, veuillez réessayer ultérieurement",
  editFail:
    "erreur lors de la modification de la quête, veuillez réessayer ultérieurement",
  invalidData: "Les données fournies sont invalides",
  addSuccess: "Quête ajoutée avec succès",
  notFound: "Aucune quête trouvée avec cet ID",
  updateSuccess: "Quête mise à jour avec succès",
};

export {
  boostersMessages,
  cardsMessages,
  collectionMessages,
  friendsMessages,
  profilPictureMessages,
  questMessages,
  tradesMessages,
  userMessages,
};
