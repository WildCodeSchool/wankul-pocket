const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

const apiRoutes = {
  INFOS: `${apiUrl}/api/infos`,
  USERS: `${apiUrl}/api/users`,
  PROFILPICTURES: `${apiUrl}/api/profilpictures`,
  BOOSTERS: `${apiUrl}/api/boosters`,
  CARDS: `${apiUrl}/api/cards`,
  OPENNING: (id: number) => `${apiUrl}/api/boosters/${id}/openning`,
};

const appRoutes = {
  INFOS: `${appUrl}/infos`,
  INFOS_ID: (id: number) => `${appUrl}/infos/${id}`,
  INFOS_ADD: `${appUrl}/infos/ajouter-info`,
  INFOS_EDIT: (id: number) => `${appUrl}/infos/${id}/editer-info`,
  BOOSTERS: `${appUrl}/boosters`,
  BOOSTERS_ID: (id: number) => `${appUrl}/boosters/${id}`,
  CARDS: `${appUrl}/cards`,
  CARDS_ID: (id: number) => `${appUrl}/cards/${id}`,
  OPENNING: (id: number) => `${appUrl}/boosters/${id}/openning`,
};

export { apiRoutes, appRoutes };
