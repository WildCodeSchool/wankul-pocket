import { CardsModel } from "@/model/CardsModel";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  email: string;
  onClose: () => void;
  onSelect: (card: CardsModel) => void;
};

export default function CardPickerModal({ email, onClose, onSelect }: Props) {
  const [cards, setCards] = useState<CardsModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch(`/api/users/${email}/collections`);
        const data = await res.json();
        setCards(data);
      } catch (error) {
        console.error("Erreur lors du fetch de la collection :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [email]);

  return (
    <div>
      <div>
        <button onClick={onClose}>✖</button>
        <h2>Sélectionne une carte</h2>

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div>
            {cards.map((card) => (
              <div key={card.id} onClick={() => onSelect(card)}>
                <Image
                  src={card.image_path}
                  alt={card.name}
                  height={192}
                  width={160}
                />
                <p>{card.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
