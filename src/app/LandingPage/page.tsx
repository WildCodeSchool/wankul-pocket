import GoogleConnexion from "@/ui/GoogleConnexion";

export default function LandingPage() {
  return (
    <div>
      <h1>Bonjour Collectionneur !</h1>
      <p>
        Afin de profiter au mieux des différentes fonctionnalités du site, il
        est impératif de te connecter via ton compte google.
      </p>
      <GoogleConnexion />
    </div>
  );
}
