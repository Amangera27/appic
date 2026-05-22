import os
import shutil

src_public = r"d:\portfolio-website\portfolio\public"
dst_public = r"d:\appic-new\public"

# Create directories
os.makedirs(os.path.join(dst_public, "images"), exist_ok=True)
os.makedirs(os.path.join(dst_public, "models"), exist_ok=True)

# Copy environment map
hdr_src = os.path.join(src_public, "models", "char_enviorment.hdr")
hdr_dst = os.path.join(dst_public, "models", "char_enviorment.hdr")
if os.path.exists(hdr_src):
    shutil.copy2(hdr_src, hdr_dst)
    print("Copied char_enviorment.hdr")
else:
    print("char_enviorment.hdr not found!")

# Copy tech images
images = [
    "react2.webp",
    "next2.webp",
    "node2.webp",
    "express.webp",
    "mongo.webp",
    "mysql.webp",
    "typescript.webp",
    "javascript.webp"
]

for img in images:
    img_src = os.path.join(src_public, "images", img)
    img_dst = os.path.join(dst_public, "images", img)
    if os.path.exists(img_src):
        shutil.copy2(img_src, img_dst)
        print(f"Copied {img}")
    else:
        print(f"{img} not found!")

print("Assets copying complete!")
