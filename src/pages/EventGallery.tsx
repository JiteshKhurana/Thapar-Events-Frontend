import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { useLocation } from "react-router-dom";
import "react-image-gallery/styles/css/image-gallery.css";

const EventGallery = () => {
  const { state } = useLocation();
  console.log(state.event.photo_gallery);
  const images: ReactImageGalleryItem[] = [];
  if (!state.event.photo_gallery)
    return (
      <div className="text-center text-5xl text-red-500">No Event Images</div>
    );
  state.event.photo_gallery.map((photo: string) => {
    images.push({
      original: photo,
      thumbnail: photo,
    });
  });
  return (
    <ImageGallery
      showPlayButton={true}
      slideOnThumbnailOver={true}
      showIndex={true}
      items={images}
    />
  );
};

export default EventGallery;
