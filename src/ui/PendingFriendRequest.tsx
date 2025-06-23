"use client";
import { useEffect, useState } from "react";
import {
  getAllRequests,
  acceptRequest,
  refuseFriendRequest,
} from "@/service/FriendsService";
import { FriendsModel } from "@/model/FriendsModel";
import { useUserContext } from "@/context/UserContext";

export function PendingFriendRequest() {
  const [requests, setRequests] = useState<FriendsModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [usernames, setUsernames] = useState<Record<string, string>>({});
  const { user } = useUserContext();

  useEffect(() => {
    if (!user?.profil_id) return;
    getAllRequests(user.profil_id)
      .then(async (data) => {
        setRequests(data);
        const entries = await Promise.all(
          data.map(async (req: FriendsModel) => {
            const res = await fetch(
              `/api/users?profil_id=${req.user_profil_id}`
            );
            const user = await res.json();
            console.log("API user response:", user);
            return [req.user_profil_id, user[0]?.username];
          })
        );
        setUsernames(Object.fromEntries(entries));
      })
      .finally(() => setLoading(false));
  }, [user]);

  const acceptFriendRequest = async (id: number) => {
    const friend = requests.find((req) => req.id === id);
    if (friend) {
      await acceptRequest(friend);
    }
  };

  const refuseRequest = async (id: number) => {
    await refuseFriendRequest(id);
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? null : (
        <div>
          <h2>Demande d'ami en attente</h2>
          <ul>
            {(Array.isArray(requests) ? requests : []).map(
              (request: FriendsModel) => (
                <li key={request.id}>
                  {usernames[request.user_profil_id] || request.user_profil_id}{" "}
                  vous a envoyé une demande d'ami.
                  <button onClick={() => acceptFriendRequest(request.id)}>
                    Accepter
                  </button>
                  <button onClick={() => refuseRequest(request.id)}>
                    Refuser
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
