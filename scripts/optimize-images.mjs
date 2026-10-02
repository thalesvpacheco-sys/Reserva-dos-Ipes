// Gera as imagens do site a partir de assets-originais/ (fora do Git).
// Saída versionada: public/images/<nome>-{640,1280,1920}.webp, public/brand/*.svg, src/app/icon.png, apple-icon.png e public/og.jpg.
// Rodar de novo só quando entrar render novo: `npm run images`.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { optimize } from "svgo";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "assets-originais", "IMAGENS RENDERIZADAS");
const OUT = path.join(ROOT, "public", "images");
const WIDTHS = [640, 1280, 1920];
// Todos os renders saem no mesmo quadro 1920x1071, assim os pares dia/noite continuam alinhados.
const RATIO = 1071 / 1920;

const IMAGES = {
  "portaria-d": "PORTARIA/6.webp",
  "portaria-n": "PORTARIA/7.webp",
  "portaria2-d": "PORTARIA/3.webp",
  "portaria2-n": "PORTARIA/4.webp",
  "impl-d": "CONDOMÍNIO/2.webp",
  "impl-n": "CONDOMÍNIO/3.webp",
  "aereo-n": "CONDOMÍNIO/5.webp",
  "branco-d": "RUA IPÊ BRANCO/2.webp",
  "branco-n": "RUA IPÊ BRANCO/3.webp",
  "rua-branco": "RUA IPÊ BRANCO/1.webp",
  "br-5": "RUA IPÊ BRANCO/5.webp",
  "flor-branco": "RUA IPÊ BRANCO/4.webp",
  "ro-4": "RUA IPÊ ROSA/4.webp",
  "rua-rosa": "RUA IPÊ ROSA/1.webp",
  "casal-rosa": "RUA IPÊ ROSA/2.webp",
  "flor-rosa": "RUA IPÊ ROSA/3.webp",
  "casa-d": "RUA IPÊ AMARELO/2.webp",
  "casa-n": "RUA IPÊ AMARELO/3.webp",
  "am-4": "RUA IPÊ AMARELO/4.webp",
  "rua-amarelo": "RUA IPÊ AMARELO/1.webp",
  "casal-amarelo": "RUA IPÊ AMARELO/7.webp",
  "am-5": "RUA IPÊ AMARELO/5.webp",
  "flor-amarelo": "RUA IPÊ AMARELO/6.webp",
  "roxo-d": "RUA IPÊ ROXO/2.png",
  "roxo-n": "RUA IPÊ ROXO/3.png",
  "rua-roxo": "RUA IPÊ ROXO/1.png",
  "rx-5": "RUA IPÊ ROXO/5.jpg",
  "flor-roxo": "RUA IPÊ ROXO/4.png",
  "piscina-d": "ÁREA DE LAZER/4.webp",
  "piscina-n": "ÁREA DE LAZER/5.webp",
  agua: "ÁREA DE LAZER/7.webp",
  play: "ÁREA DE LAZER/16.webp",
  pomar: "POMAR/3.webp",
  pet: "ÁREA DE LAZER/13.webp",
  "lazer-d": "ÁREA DE LAZER/1.webp",
  "lazer-n": "ÁREA DE LAZER/2.webp",
  churrasqueira: "ÁREA DE LAZER/10.webp",
  deck: "ÁREA DE LAZER/9.webp",
};

async function rasters() {
  await mkdir(OUT, { recursive: true });
  for (const [name, rel] of Object.entries(IMAGES)) {
    const input = await readFile(path.join(SRC, rel));
    for (const w of WIDTHS) {
      await sharp(input)
        .resize(w, Math.round(w * RATIO), { fit: "cover", position: "centre" })
        .webp({ quality: w >= 1920 ? 68 : 72, effort: 5 })
        .toFile(path.join(OUT, `${name}-${w}.webp`));
    }
    process.stdout.write(`${name} `);
  }
  // imagem de compartilhamento (WhatsApp, Facebook): 1200x630
  await sharp(await readFile(path.join(SRC, IMAGES["portaria-d"])))
    .resize(1200, 630, { fit: "cover" })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(path.join(ROOT, "public", "og.jpg"));
}

async function brand() {
  const raw = await readFile(path.join(ROOT, "assets-originais", "marca", "logo", "LOGO HORIZONTAL.svg"), "utf8");
  // precisão 0 basta no tamanho em que a logo aparece (até ~200px) e corta o arquivo de 600 KB para ~80 KB
  const { data } = optimize(raw, {
    multipass: true,
    floatPrecision: 0,
    plugins: [{ name: "preset-default", params: { overrides: { removeViewBox: false } } }, "mergePaths", "removeDimensions"],
  });
  const dir = path.join(ROOT, "public", "brand");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "logo-horizontal.svg"), data);
  // no modo noite o wordmark dourado some no azul: versão com o texto claro
  await writeFile(path.join(dir, "logo-horizontal-claro.svg"), data.replaceAll('fill="#856524"', 'fill="#EADBB8"'));

  // favicon: só a árvore (recorta o viewBox e tira as letras)
  const tree = data.replace(/viewBox="[^"]*"/, 'viewBox="20 10 700 720"').replace(/<path fill="#856524"[^>]*\/>/g, "");
  const app = path.join(ROOT, "src", "app");
  await sharp(Buffer.from(tree), { density: 300 }).resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png({ palette: true, quality: 90 }).toFile(path.join(app, "icon.png"));
  await sharp(Buffer.from(tree), { density: 300 }).resize(180, 180, { fit: "contain", background: "#FFFFFF" }).png({ palette: true, quality: 90 }).toFile(path.join(app, "apple-icon.png"));
}

await brand();
await rasters();
console.log("\nok");
