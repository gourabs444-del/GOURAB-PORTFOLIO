import rembg
from PIL import Image, ImageEnhance, ImageOps
import numpy as np

src_path = r"C:\Users\GOURAB\.gemini\antigravity\brain\52bcf822-1228-494b-8cf8-73995bd9b0e8\.user_uploaded\media_1789402114363.jpg"
out_path = r"d:\STACK\A\public\assets\gourab.png"

with open(src_path, "rb") as f:
    input_data = f.read()

output_data = rembg.remove(input_data)
with open(out_path, "wb") as f:
    f.write(output_data)

img = Image.open(out_path).convert("RGBA")
r, g, b, a = img.split()

# Preserve natural rich colors, slight boost in clarity
color_img = Image.merge("RGB", (r, g, b))
enhancer = ImageEnhance.Sharpness(color_img)
color_img = enhancer.enhance(1.15)
cr, cg, cb = color_img.split()

# Create smooth bottom gradient fade on the alpha channel
width, height = img.size
alpha_arr = np.array(a, dtype=np.float32)

# Bottom 5% subtle edge softening only
fade_start = int(height * 0.95)
for y in range(fade_start, height):
    factor = 1.0 - ((y - fade_start) / (height - fade_start))
    factor = 0.5 * (1.0 + np.cos(np.pi * (1.0 - factor)))
    alpha_arr[y, :] = alpha_arr[y, :] * factor

final_alpha = Image.fromarray(alpha_arr.astype(np.uint8))
final_img = Image.merge("RGBA", (cr, cg, cb, final_alpha))
final_img.save(out_path, "PNG")
print("Successfully generated high-res solid cutout PNG from 2nd photo with jacket!")


