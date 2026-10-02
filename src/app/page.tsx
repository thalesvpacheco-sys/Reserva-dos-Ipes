import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileDock } from "@/components/layout/MobileDock";
import { Casas, Condicoes, Condominio, Contato, Hero, Localizacao, Ruas } from "@/components/sections/Sections";
import { Lazer } from "@/components/sections/Lazer";

// Ordem das seções = ordem da copy (docs/ARQUITETURA.md)
export default function Home() {
  return (
    <>
      <Header />
      <main id="topo">
        <Hero />
        <Localizacao />
        <Condominio />
        <Casas />
        <Lazer />
        <Ruas />
        <Condicoes />
        <Contato />
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}
