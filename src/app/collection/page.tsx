import { getOne } from "@/lib/collection/getUserCollection";
import CollectionContainer from "@/ui/CollectionContainer";
import { getServerSession } from "next-auth";

export default async function Collection() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return <p>Connecte toi pour consulter ta collection</p>;
  }
  const collection = await getOne(session?.user?.email);
  return (
    <>
      <CollectionContainer collection={collection} />
    </>
  );
}
