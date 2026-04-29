import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";

const root = new URL("../public/", import.meta.url);

const palette = {
  cream: [247, 239, 228, 255],
  navy: [29, 53, 87, 255],
  blue: [58, 134, 255, 255],
  coral: [238, 108, 77, 255],
  gold: [244, 211, 94, 255],
  ink: [35, 36, 38, 255],
  white: [255, 255, 255, 255],
};

const font = {
  " ": ["000", "000", "000", "000", "000", "000", "000"],
  A: ["010", "101", "101", "111", "101", "101", "101"],
  B: ["110", "101", "101", "110", "101", "101", "110"],
  C: ["011", "100", "100", "100", "100", "100", "011"],
  D: ["110", "101", "101", "101", "101", "101", "110"],
  E: ["111", "100", "100", "110", "100", "100", "111"],
  F: ["111", "100", "100", "110", "100", "100", "100"],
  G: ["011", "100", "100", "101", "101", "101", "011"],
  H: ["101", "101", "101", "111", "101", "101", "101"],
  I: ["111", "010", "010", "010", "010", "010", "111"],
  L: ["100", "100", "100", "100", "100", "100", "111"],
  M: ["101", "111", "111", "101", "101", "101", "101"],
  N: ["101", "111", "111", "111", "101", "101", "101"],
  O: ["010", "101", "101", "101", "101", "101", "010"],
  P: ["110", "101", "101", "110", "100", "100", "100"],
  R: ["110", "101", "101", "110", "101", "101", "101"],
  S: ["011", "100", "100", "010", "001", "001", "110"],
  T: ["111", "010", "010", "010", "010", "010", "010"],
  U: ["101", "101", "101", "101", "101", "101", "111"],
  W: ["101", "101", "101", "101", "111", "111", "101"],
  Y: ["101", "101", "101", "010", "010", "010", "010"],
  "-": ["000", "000", "000", "111", "000", "000", "000"],
  ".": ["000", "000", "000", "000", "000", "000", "010"],
};

function png(width, height, draw) {
  const pixels = new Uint8Array(width * height * 4);
  fill(pixels, width, height, 0, 0, width, height, palette.cream);
  draw({ pixels, width, height });

  const raw = new Uint8Array((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const row = y * (width * 4 + 1);
    raw[row] = 0;
    raw.set(pixels.subarray(y * width * 4, (y + 1) * width * 4), row + 1);
  }

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr(width, height)),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function ihdr(width, height) {
  const data = Buffer.alloc(13);
  data.writeUInt32BE(width, 0);
  data.writeUInt32BE(height, 4);
  data[8] = 8;
  data[9] = 6;
  return data;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

function crc(buffer) {
  let c = 0xffffffff;
  for (const byte of buffer) {
    c ^= byte;
    for (let k = 0; k < 8; k += 1) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
  }
  return (c ^ 0xffffffff) >>> 0;
}

function fill(pixels, width, height, x, y, w, h, color) {
  const startX = Math.max(0, x);
  const startY = Math.max(0, y);
  const endX = Math.min(width, x + w);
  const endY = Math.min(height, y + h);
  for (let yy = startY; yy < endY; yy += 1) {
    for (let xx = startX; xx < endX; xx += 1) {
      const i = (yy * width + xx) * 4;
      pixels.set(color, i);
    }
  }
}

function text(ctx, value, x, y, scale, color) {
  let cursor = x;
  for (const char of value.toUpperCase()) {
    const glyph = font[char] || font[" "];
    glyph.forEach((row, yy) => {
      [...row].forEach((pixel, xx) => {
        if (pixel === "1") {
          fill(ctx.pixels, ctx.width, ctx.height, cursor + xx * scale, y + yy * scale, scale, scale, color);
        }
      });
    });
    cursor += 4 * scale;
  }
}

function icon(size) {
  return png(size, size, (ctx) => {
    const pad = Math.round(size * 0.14);
    fill(ctx.pixels, size, size, pad, pad, size - pad * 2, size - pad * 2, palette.navy);
    text(ctx, "PA", Math.round(size * 0.22), Math.round(size * 0.27), Math.round(size * 0.07), palette.gold);
    fill(ctx.pixels, size, size, Math.round(size * 0.58), Math.round(size * 0.62), Math.round(size * 0.2), Math.round(size * 0.06), palette.coral);
  });
}

writeFileSync(new URL("icon-192.png", root), icon(192));
writeFileSync(new URL("icon-512.png", root), icon(512));
writeFileSync(new URL("apple-touch-icon.png", root), icon(180));

writeFileSync(
  new URL("og-image.png", root),
  png(1200, 630, (ctx) => {
    fill(ctx.pixels, ctx.width, ctx.height, 0, 0, 1200, 630, palette.cream);
    fill(ctx.pixels, ctx.width, ctx.height, 72, 72, 1056, 486, palette.navy);
    fill(ctx.pixels, ctx.width, ctx.height, 104, 104, 992, 422, palette.white);
    fill(ctx.pixels, ctx.width, ctx.height, 104, 104, 992, 84, palette.navy);
    fill(ctx.pixels, ctx.width, ctx.height, 136, 132, 52, 28, palette.gold);
    text(ctx, "PROMPT ARCHITECT", 220, 130, 8, palette.cream);
    text(ctx, "AI PROMPT BUILDER", 148, 250, 13, palette.ink);
    text(ctx, "MODEL READY PROMPTS", 150, 392, 8, palette.navy);
    fill(ctx.pixels, ctx.width, ctx.height, 150, 472, 330, 16, palette.blue);
    fill(ctx.pixels, ctx.width, ctx.height, 512, 472, 230, 16, palette.coral);
    fill(ctx.pixels, ctx.width, ctx.height, 774, 472, 170, 16, palette.gold);
  }),
);
