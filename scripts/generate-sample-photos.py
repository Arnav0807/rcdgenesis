from PIL import Image, ImageDraw, ImageFont
import math, os

OUT = "/home/claude/rotary-delhi-genesis/public/images"
os.makedirs(OUT, exist_ok=True)

W, H = 800, 600

PALETTES = [
    # (name, top color, bottom color, sun color)
    ("fellowship-1", (14, 27, 43), (196, 90, 77), (241, 200, 135)),
    ("fellowship-2", (14, 27, 43), (62, 124, 123), (226, 163, 59)),
    ("assembly-1",   (23, 45, 68), (14, 27, 43), (226, 163, 59)),
    ("assembly-2",   (34, 64, 94), (14, 27, 43), (241, 200, 135)),
    ("project-1",    (14, 27, 43), (62, 124, 123), (196, 90, 77)),
    ("project-2",    (23, 45, 68), (196, 90, 77), (226, 163, 59)),
]

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def make_image(name, top, bottom, sun):
    img = Image.new("RGB", (W, H), top)
    px = img.load()
    for y in range(H):
        t = y / (H - 1)
        c = lerp(top, bottom, t)
        for x in range(W):
            px[x, y] = c

    draw = ImageDraw.Draw(img, "RGBA")

    # horizon arc / sun glow near bottom third, evoking dawn
    cx, cy = W * 0.5, H * 0.78
    for r, alpha in [(260, 26), (190, 40), (120, 60), (60, 90)]:
        bbox = [cx - r, cy - r, cx + r, cy + r]
        draw.ellipse(bbox, fill=(sun[0], sun[1], sun[2], alpha))

    # thin horizon line
    draw.line([(0, cy), (W, cy)], fill=(sun[0], sun[1], sun[2], 130), width=2)

    # subtle grain/dot texture for a less flat, more photographic feel
    import random
    random.seed(hash(name) % 1000)
    for _ in range(900):
        x = random.randint(0, W - 1)
        y = random.randint(0, H - 1)
        a = random.randint(4, 14)
        draw.point((x, y), fill=(255, 255, 255, a))

    # camera glyph + label, centered
    icon_cx, icon_cy = W / 2, H / 2 - 18
    body_w, body_h = 92, 64
    draw.rounded_rectangle(
        [icon_cx - body_w/2, icon_cy - body_h/2, icon_cx + body_w/2, icon_cy + body_h/2],
        radius=10, outline=(244, 239, 227, 235), width=4
    )
    draw.rectangle(
        [icon_cx - 22, icon_cy - body_h/2 - 14, icon_cx + 22, icon_cy - body_h/2 + 4],
        fill=(244, 239, 227, 235)
    )
    draw.ellipse(
        [icon_cx - 20, icon_cy - 20, icon_cx + 20, icon_cy + 20],
        outline=(244, 239, 227, 235), width=4
    )

    label = "SAMPLE PHOTO"
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 22)
    except Exception:
        font = ImageFont.load_default()
    bbox = draw.textbbox((0, 0), label, font=font)
    tw = bbox[2] - bbox[0]
    draw.text((W/2 - tw/2, icon_cy + body_h/2 + 22), label, font=font, fill=(244, 239, 227, 245))

    img.save(f"{OUT}/{name}.jpg", quality=82)
    print("wrote", name)

for name, top, bottom, sun in PALETTES:
    make_image(name, top, bottom, sun)
