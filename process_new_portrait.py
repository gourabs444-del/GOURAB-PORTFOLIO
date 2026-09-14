import rembg
from PIL import Image, ImageEnhance, ImageOps, ImageFilter
import numpy as np

src_path = r"C:\Users\GOURAB\.gemini\antigravity\brain\52bcf822-1228-494b-8cf8-73995bd9b0e8\.user_uploaded\media_1789401807615.jpg"
out_path = r"d:\STACK\A\public\assets\gourab.png"

with open(src_path, "rb") as f:
    input_data = f.read()

output_data = rembg.remove(input_data)
with open(out_path, "wb") as f:
    f.write(output_data)

# Open the transparent PNG
img = Image.open(out_path).convert("RGBA")
r, g, b, a = img.split()

# Enhance contrast and black & white clarity
gray = ImageOps.grayscale(Image.merge("RGB", (r, g, b)))
enhancer = ImageEnhance.Contrast(gray)
gray = enhancer.enhance(1.22)

# Create smooth bottom gradient fade/blur on the alpha channel
width, height = img.size
alpha_arr = np.array(a, dtype=np.float32)

# Bottom 25% of the image fades out smoothly to 0 alpha
fade_start = int(height * 0.72)
for y in range(fade_start, height):
    factor = 1.0 - ((y - fade_start) / (height - fade_start))
    # Smooth cosine curve for natural feathering
    factor = 0.5 * (1.0 + np.cos(np.pi * (1.0 - factor)))
    alpha_arr[y, :] = alpha_arr[y, :] * factor

final_alpha = Image.fromarray(alpha_arr.astype(np.uint8))
final_img = Image.merge("RGBA", (gray, gray, gray, final_alpha))
final_img.save(out_path, "PNG")
print("Successfully generated high-res feathered cutout PNG with rembg!")
