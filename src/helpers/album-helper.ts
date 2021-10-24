import { Image, ImageSize } from "@/models/image";

export const getCoverUrl = (
  images: Array<Image>,
  size: ImageSize
): string | null => {
  if (images.length === 0) return null;
  const smallCovers = images.map((image: Image) => image[size]);
  return smallCovers.length === 0 ? null : smallCovers[0];
};
