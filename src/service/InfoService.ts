import { addInfo } from "@/lib/addInfo"
import { deleteInfo } from "@/lib/deleteInfo"
import { getOne } from "@/lib/getInfo"
import { getInfos } from "@/lib/getInfos"
import { patchInfo } from "@/lib/patchInfo"
import { InfoModel } from "@/model/InfoModel"

export async function getall() {
  return getInfos()
}

export async function getOneById(id: number): Promise<InfoModel> {
  return getOne(id)
}

export async function deleteOne(id: number) {
  return deleteInfo(id)
}

export async function addOne(info: Omit<InfoModel, "id">) {
  return addInfo(info)
}

export async function editOne(info: InfoModel): Promise<{ message: string }> {
  return patchInfo(info)
}
