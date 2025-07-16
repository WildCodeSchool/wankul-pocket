import { QuestModel } from "@/model/QuestModel";
import { QuestProgressModel } from "@/model/QuestProgressModel";

export class QuestValidator {
  static validateQuest(
    quest: QuestModel,
    progress: QuestProgressModel
  ): boolean {
    switch (quest.category) {
      case "Ami":
        return progress.friends >= quest.goal_target;

      case "Échange":
        return progress.trades >= quest.goal_target;

      case "Banane":
        return progress.bananas >= quest.goal_target;

      case "Collection":
        const totalCards = progress.collection.reduce(
          (sum, card) => sum + card.quantity,
          0
        );
        return totalCards >= quest.goal_target;

      case "Diversité":
        return progress.collection.length >= quest.goal_target;

      case "Clan":
        const uniqueClans = new Set(
          progress.collection.map((card) => card.clan)
        );
        return uniqueClans.size >= quest.goal_target;

      case "Quotidienne":
        // PLUS TARD PARCEQUE PAS DE QUÊTE QUOTIDIENNE POUR LE MOMENT
        // PARCE QUON SAIT PAS ENCORE COMMENT FAIRE HAHAHAHHAHAHA
        return false;

      case "Rareté spéciale":
        const hasLaink = progress.collection.some(
          (card) =>
            card.name === "LAINK" &&
            card.rarity === "Légendaire Or" &&
            card.quantity >= quest.goal_quantity
        );
        const hasTerracid = progress.collection.some(
          (card) =>
            card.name === "TERRACID" &&
            card.rarity === "Légendaire Or" &&
            card.quantity >= quest.goal_quantity
        );
        return hasLaink && hasTerracid;

      case "Duplication Commune":
        return this.validateDuplication(
          progress.collection,
          "Commune",
          quest.goal_quantity
        );

      case "Duplication Peu Commune":
        return this.validateDuplication(
          progress.collection,
          "Peu commune",
          quest.goal_quantity
        );

      case "Duplication Rare":
        return this.validateDuplication(
          progress.collection,
          "Rare",
          quest.goal_quantity
        );

      case "Duplication Ultra rare holo 1":
        return this.validateDuplication(
          progress.collection,
          "Ultra rare holo 1",
          quest.goal_quantity
        );

      case "Duplication Ultra rare holo 2":
        return this.validateDuplication(
          progress.collection,
          "Ultra rare holo 2",
          quest.goal_quantity
        );

      case "Duplication Légendaire Bronze":
        return this.validateDuplication(
          progress.collection,
          "Légendaire Bronze",
          quest.goal_quantity
        );

      case "Duplication Légendaire Argent":
        return this.validateDuplication(
          progress.collection,
          "Légendaire Argent",
          quest.goal_quantity
        );

      case "Duplication Légendaire Or":
        return this.validateDuplication(
          progress.collection,
          "Légendaire Or",
          quest.goal_quantity
        );

      case "Duplication Terrain":
        return this.validateDuplication(
          progress.collection,
          "Terrain",
          quest.goal_quantity
        );

      default:
        console.warn(`Catégorie de quête inconnue: ${quest.category}`);
        return false;
    }
  }

  private static validateDuplication(
    collection: Array<{ rarity: string; quantity: number }> | undefined,
    rarity: string,
    goalQuantity: number
  ): boolean {
    if (!collection) return false;

    return collection.some(
      (card) => card.rarity === rarity && card.quantity >= goalQuantity
    );
  }
}
