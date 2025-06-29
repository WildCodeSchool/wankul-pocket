import { ReactNode, useState, useEffect } from "react";
import { getFriendDetails } from "@/lib/friends/getFriendDetails";
import styles from "./FriendDetail.module.css";

interface Card {
  card_id: number;
  rarity: string;
  card_image_path: string;
}

interface FriendDetails {
  username: string;
  user_image_path: string;
  cards: Card[];
}

interface FriendDetailProps {
  friendProfilId: string;
  children: ReactNode;
}

export function FriendDetail({ friendProfilId, children }: FriendDetailProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friendDetails, setFriendDetails] = useState<FriendDetails | null>(
    null
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!friendProfilId || !isModalOpen) return;

    getFriendDetails(friendProfilId)
      .then((data) => {
        setFriendDetails(data || null);
      })
      .catch((error) => {
        console.error("Error fetching friend details:", error);
        setFriendDetails(null);
      });
  }, [friendProfilId, isModalOpen]);

  const cardsByRarity =
    friendDetails?.cards.reduce((acc, card) => {
      acc[card.rarity] = (acc[card.rarity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

  return (
    <>
      <div onClick={openModal}>{children}</div>

      {isModalOpen && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeModal}>
              ×
            </button>

            {friendDetails ? (
              <div className={styles.modalContent}>
                <img
                  src={friendDetails.user_image_path}
                  alt={friendDetails.username}
                  className={styles.friendImage}
                />
                <h3>{friendDetails.username}</h3>
                <div>
                  <h3>Collection ({friendDetails.cards.length} cartes)</h3>
                  {Object.entries(cardsByRarity).map(([rarity, count]) => (
                    <p key={rarity}>
                      <strong>{rarity}:</strong> &nbsp;{count}
                    </p>
                  ))}
                </div>

                <div className={styles.cardsGrid}>
                  {friendDetails.cards.map((card) => (
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
              <div className={styles.modalContent}>
                <p>Votre ami n'a encore aucune carte à sa collection</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
