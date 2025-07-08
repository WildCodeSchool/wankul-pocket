import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { isQuestCompleted } from "./QuestService";
import { QuestModel } from "@/model/QuestModel";
import { getUserQuestsProgress } from "@/lib/user/getUserQuestProgress";

interface InsertResult {
  insertId: number;
  affectedRows?: number;
  warningStatus?: number;
}

export interface QuestCompletionRequest {
  user_id: number;
  quest_id: number;
  reward: number;
  userEmail: string;
}

export interface QuestCompletionResult {
  id: number;
  user_id: number;
  quest_id: number;
  reward_added: number;
  message: string;
}

export async function manageQuestCompletion(
  request: QuestCompletionRequest
): Promise<QuestCompletionResult> {
  const { user_id, quest_id, reward, userEmail } = request;

  const [existingCompletion] = await db.query<RowDataPacket[]>(
    `SELECT id FROM completed_quests WHERE quest_id = ? AND user_id = ?`,
    [quest_id, user_id]
  );

  if (existingCompletion && existingCompletion.length > 0) {
    throw new Error("Quest completion already exists");
  }

  const userProgress = await getUserQuestsProgress(userEmail);
  if (!userProgress) {
    throw new Error("User not found");
  }

  const [questDetails] = await db.query<RowDataPacket[]>(
    `SELECT category, goal_target, goal_quantity, reward FROM quest WHERE id = ?`,
    [quest_id]
  );

  if (!questDetails || questDetails.length === 0) {
    throw new Error("Quest not found");
  }

  const quest = questDetails[0];

  const questModel = new QuestModel(
    quest_id,
    "",
    "",
    quest.reward,
    quest.category,
    quest.goal_target,
    quest.goal_quantity || 0,
    ""
  );

  const isValidated = isQuestCompleted(questModel, userProgress);
  if (!isValidated) {
    throw new Error("Quest completion requirements not met");
  }

  if (reward !== quest.reward) {
    throw new Error("Invalid reward amount");
  }

  await db.query("START TRANSACTION");

  try {
    const [result] = (await db.query(
      "INSERT INTO completed_quests (user_id, quest_id) VALUES (?, ?)",
      [user_id, quest_id]
    )) as [InsertResult, unknown];

    await db.query(`UPDATE user SET bananas = bananas + ? WHERE id = ?`, [
      reward,
      user_id,
    ]);

    await db.query("COMMIT");

    return {
      id: result.insertId,
      user_id,
      quest_id,
      reward_added: reward,
      message: "Quest completion created successfully",
    };
  } catch (dbError) {
    await db.query("ROLLBACK");
    throw dbError;
  }
}
