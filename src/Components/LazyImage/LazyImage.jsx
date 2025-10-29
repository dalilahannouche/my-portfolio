import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const LazyImage = ({
  src,
  alt,
  width = "100%",
  height = "auto",
  className,
}) => {
  return (
    <div className="image-container">
      <LazyLoadImage
        alt={alt}
        src={src}
        effect="blur" // Effet flou au chargement
        width={width}
        height={height}
      />
    </div>
  );
};

export default LazyImage;
