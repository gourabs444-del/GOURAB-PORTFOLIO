import sys
from PIL import Image, ImageEnhance, ImageOps

src_path = r"C:\Users\GOURAB\.gemini\antigravity\brain\52bcf822-1228-494b-8cf8-73995bd9b0e8\.user_uploaded\media_1789399769903.jpg"
out_path = r"d:\STACK\A\public\assets\gourab.png"

try:
    import rembg
    with open(src_path, "rb") as f:
        input_data = f.read()
    output_data = rembg.remove(input_data)
    with open(out_path, "wb") as f:
        f.write(output_data)
    
    # Enhance contrast and ensure pure black & white tone like reference
    img = Image.open(out_path).convert("RGBA")
    r, g, b, a = img.split()
    gray = ImageOps.grayscale(Image.merge("RGB", (r, g, b)))
    enhancer = ImageEnhance.Contrast(gray)
    gray = enhancer.enhance(1.25)
    img = Image.merge("RGBA", (gray, gray, gray, a))
    img.save(out_path, "PNG")
    print("Successfully created transparent cutout PNG with rembg!")
except Exception as e:
    print(f"Fallback due to: {e}")
    # High-quality fallback using luminance thresholding / alpha blending
    img = Image.open(src_path).convert("RGBA")
    r, g, b, a = img.split()
    gray = ImageOps.grayscale(Image.merge("RGB", (r, g, b)))
    
    # Background in the studio photo is light (values > 180 around edges)
    # Create soft alpha mask
    datas = img.getdata()
    newData = []
    width, height = img.size
    for y in range(height):
        for x in range(width):
            item = datas[y * width + x]
            # If color is near light grey studio background and not hair/face
            brightness = (item[0] + item[1] + item[2]) // 3
            if brightness > 195 and (x < width * 0.25 or x > width * 0.75 or y < height * 0.3):
                # Fade out background
                alpha = max(0, int(255 - (brightness - 195) * 5))
                newData.append((item[0], item[1], item[2], alpha))
            else:
                newData.append(item)
    img.putdata(newData)
    img.save(out_path, "PNG")
    print("Fallback PNG generated successfully!")
