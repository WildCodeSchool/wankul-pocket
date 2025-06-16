const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;
const apiRoutes = {
  INFOS: `${apiUrl}/api/infos`,
  BOOSTERS: `${apiUrl}/api/boosters`,
};

const appRoutes = {
  INFOS: `${appUrl}/infos`,
  INFOS_ID: (id: number) => `${appUrl}/infos/${id}`,
  INFOS_ADD: `${appUrl}/infos/ajouter-info`,
  INFOS_EDIT: (id: number) => `${appUrl}/infos/${id}/editer-info`,
  BOOSTERS: `${appUrl}/boosters`,
  BOOSTERS_ID: (id: number) => `${appUrl}/boosters/${id}`,
};

export { apiRoutes, appRoutes };
