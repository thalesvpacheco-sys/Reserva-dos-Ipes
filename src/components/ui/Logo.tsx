// Dois SVGs da logo: dourado (dia) e com o wordmark claro (noite). O CSS mostra o do modo atual.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <>
      <img className={`logo logo--dia ${className}`} src="/brand/logo-horizontal.svg" width={2316} height={738} alt="Reserva dos Ipês" />
      {/* lazy + display:none: só baixa quando alguém liga o modo Noite */}
      <img className={`logo logo--claro ${className}`} src="/brand/logo-horizontal-claro.svg" width={2316} height={738} alt="Reserva dos Ipês" loading="lazy" />
    </>
  );
}
