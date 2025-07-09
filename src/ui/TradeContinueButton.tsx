import { useRouter } from "next/navigation";

export default function TradeContinueButton() {
  const router = useRouter();
  const handleContinue = () => {
    router.refresh();
  };
  return <button onClick={handleContinue}>Continuer</button>;
}
