export const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

const apiRoutes = {
  USERS: `${apiUrl}/api/users`,
  UPDATE_USER: (email: string) => `${apiUrl}/api/users/${email}`,
  PROFIL_PICTURES: `${apiUrl}/api/profilpictures`,
  BOOSTERS: `${apiUrl}/api/boosters`,
  CARDS: `${apiUrl}/api/cards`,
  TRADES: (email: string) => `${apiUrl}/api/users/${email}/trades`,
  TRADES_BY_ID: (email: string) => `${apiUrl}/api/users/${email}/trades/[id]`,
  COLLECTIONS: (email: string) => `${apiUrl}/api/users/${email}/collections`,
  FRIENDS: `${apiUrl}/api/friends`,
  FRIEND_DETAILS: (friendProfilId: string) =>
    `${apiUrl}/api/friends/${friendProfilId}/details`,
  QUESTS: `${apiUrl}/api/quests`,
  QUESTS_PROGRESS: (email: string) => `${apiUrl}/api/users/${email}/quests`,
  ADD_COMPLETED_QUEST: (email: string) =>
    `${apiUrl}/api/users/${email}/quest-completions`,
  QUESTS_BY_ID: (email: string) =>
    `${apiUrl}/api/users/${email}/quests?type=list`,
};

const publicRoutes = {
  PROFILS: `/profilpic`,
};

const appRoutes = {
  BOOSTERS: `${appUrl}/boosters`,
  BOOSTERS_ID: (id: number) => `${appUrl}/boosters/${id}`,
  CARDS: `${appUrl}/cards`,
  CARDS_ID: (id: number) => `${appUrl}/cards/${id}`,
  COLLECTION: `${appUrl}/collection`,
  TRADES: `${appUrl}/echange`,
  QUESTS: `${appUrl}/objectifs`,
};

export { apiRoutes, appRoutes, publicRoutes };
