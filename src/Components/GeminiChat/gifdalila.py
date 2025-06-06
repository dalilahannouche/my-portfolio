from PIL import Image, ImageSequence
import os

os.chdir(os.path.dirname(__file__))

# Re-define paths after environment reset
base_image_path = "C:/Users/Lenovo/Desktop/portfolio-project/src/Components/GeminiChat/dalilacute.png"
stars_gif_path = "C:/Users/Lenovo/Desktop/portfolio-project/src/Components/GeminiChat/dalilacute.gif"
output_gif_path = "C:/Users/Lenovo/Desktop/portfolio-project/src/Components/GeminiChat/merged_output.gif"

# Charger les images
base_image = Image.open(base_image_path).convert("RGBA")
stars_gif = Image.open(stars_gif_path)

# Redimensionner les étoiles
base_width, base_height = base_image.size
stars_width, stars_height = stars_gif.size

scale_factor = 0.3
new_stars_size = (int(stars_width * scale_factor), int(stars_height * scale_factor))

# Position bas droite (une étoile dedans, deux dehors)
stars_offset_x = base_width - new_stars_size[0] + 10
stars_offset_y = base_height - new_stars_size[1] + 10

# Créer les frames du GIF
merged_frames = []

for frame in ImageSequence.Iterator(stars_gif):
    frame = frame.copy().convert("RGBA").resize(new_stars_size, Image.Resampling.LANCZOS)
    
    composed = Image.new("RGBA", base_image.size, (0, 0, 0, 0))  # fond transparent
    composed.paste(base_image, (0, 0), base_image)
    composed.paste(frame, (stars_offset_x, stars_offset_y), frame)
    
    merged_frames.append(composed)


# Enregistrer le GIF animé avec transparence
merged_frames[0].save(
    output_gif_path,
    save_all=True,
    append_images=merged_frames[1:],
    loop=0,
    duration=stars_gif.info.get('duration', 100)
)