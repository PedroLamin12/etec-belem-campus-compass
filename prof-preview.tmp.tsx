import { renderToStaticMarkup } from "react-dom/server";
import { ProfGuide } from "@/components/ProfGuide";
const pal: Record<string,string> = {"halo":"#E6EEFF","halo-strong":"#C9D8FF","hair":"#F3CD7C","hair-shade":"#D6A24C","hair-light":"#FCE7B4","jacket":"#C99B6F","jacket-shade":"#A97C53","top":"#2F55D4","top-shade":"#2343A8","skin":"#F8D7C0","skin-shade":"#EDBA9C","skin-line":"#D99A7B","collar":"#F7EFE3","collar-shade":"#DCCBB4","blush":"#F4A3A0","ink":"#3A2618","eye":"#6B4128","white":"#FFFFFF","frame":"#A9AEBE","lens":"#FFFFFF","lip":"#B84E4A","mouth":"#8E2F35","tongue":"#F08A8A","spark":"#F5B800"};
const moods = ["happy","talk","wink","wow","think","cheer","wave"] as const;
for (const m of moods) {
  let s = renderToStaticMarkup(<ProfGuide mood={m} bubble />);
  s = s.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="520" ');
  s = s.replace(/class="([^"]*)"/g, (_, c: string) => {
    let attrs = "";
    for (const k of c.split(/\s+/)) {
      const f = k.match(/^fill-guide-(.+)$/); const st = k.match(/^stroke-guide-(.+)$/);
      if (f && pal[f[1]]) attrs += ` fill="${pal[f[1]]}"${f[1]==="lens"?' fill-opacity="0.18"':""}`;
      if (st && pal[st[1]]) attrs += ` stroke="${pal[st[1]]}"`;
    }
    return attrs;
  });
  await Bun.write(`/tmp/browser/prof/${m}.svg`, s);
}
