export default function NotFound() {
  return (
    <main className="wrap" style={{ minHeight: "70dvh", display: "grid", placeContent: "center", gap: 24, textAlign: "center" }}>
      <h1 className="h2" style={{ margin: "0 auto" }}>
        Página não encontrada.
      </h1>
      <p className="body" style={{ margin: "0 auto" }}>
        O endereço pode ter mudado. Volte para a página do Reserva dos Ipês.
      </p>
      <div>
        <a className="btn" href="/">
          Ir para o início
        </a>
      </div>
    </main>
  );
}
