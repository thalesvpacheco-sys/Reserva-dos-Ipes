// Conteúdo fica em content/*.json (texto do cliente verbatim); aqui só reexporta com tipos.
import copy from "@content/copy.json";
import site from "@content/site.json";
import galeria from "@content/galeria.json";

export { copy, site, galeria };

export type Rua = (typeof galeria.ruas)[number];
export type Foto = Rua["fotos"][number];

export const nav = [
  { href: "#localizacao", label: "Localização" },
  { href: "#condominio", label: "Condomínio" },
  { href: "#casas", label: "Casas" },
  { href: "#lazer", label: "Lazer" },
  { href: "#ruas", label: "Ruas" },
  { href: "#condicoes", label: "Condições" },
];

/** "Mensais pré-chaves a partir de R$ 750*" -> ["Mensais pré-chaves a partir de", "R$ 750*"] */
export function splitValor(item: string): [string, string] | null {
  const m = item.match(/^(.*a partir de)\s+(.+)$/);
  return m ? [m[1], m[2]] : null;
}
