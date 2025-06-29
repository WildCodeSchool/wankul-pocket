import { ReactNode, useState, useEffect } from "react";
import { getFriendDetails } from "@/lib/friends/getFriendDetails";
import styles from "./FriendDetail.module.css";

interface FriendCard {
  username: string;
  user_image_path: string;
  card_id: number;
  rarity: string;
  card_image_path: string;
}

interface FriendDetailProps {
  friendProfilId: string;
  children: ReactNode;
}

export function FriendDetail({ friendProfilId, children }: FriendDetailProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friendCards, setFriendCards] = useState<FriendCard[]>([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!friendProfilId || !isModalOpen) return;


    getFriendDetails(friendProfilId)
      .then((data) => {
        setFriendCards(data || []);
      })
      .catch((error) => {
        console.error("Error fetching friend details:", error);
        setFriendCards([]);
      })

  }, [friendProfilId, isModalOpen]);

  const userInfo = friendCards.length > 0 ? friendCards[0] : null;
  const cardsByRarity = friendCards.reduce((acc, card) => {
    acc[card.rarity] = (acc[card.rarity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <>
      <div onClick={openModal}>{children}</div>

      {isModalOpen && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeModal}>
              ×
            </button>

            {userInfo ? (
              <div className={styles.modalContent}>
                <img
                  src={userInfo.user_image_path}
                  alt={userInfo.username}
                  className={styles.friendImage}
                />
                <h3>{userInfo.username}</h3>
                <div>
                  <h3>Collection ({friendCards.length} cartes)</h3>
                  {Object.entries(cardsByRarity).map(([rarity, count]) => (
                    <p key={rarity}>
                      <strong>{rarity}:</strong> &nbsp;{count}
                    </p>
                  ))}
                </div>

                <div className={styles.cardsGrid}>
                  {friendCards.map((card) => (
                    <div key={card.card_id} className={styles.cardItem}>
                      <img
                        src={card.card_image_path}
                        alt={`Carte ${card.card_id}`}
                        className={styles.cardImage}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>Aucune information trouvée</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
