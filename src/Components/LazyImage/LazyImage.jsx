import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const LazyImage = ({
  src,
  alt,
  width = "100%",
  height = "auto",
  className = "",
  onClick,
}) => {
  return (
    <LazyLoadImage
      alt={alt}
      src={src}
      effect="blur"
      width={width}
      height={height}
      className={className} // le style cible directement l'image
      onClick={onClick}
    />
  );
};

export default LazyImage;
