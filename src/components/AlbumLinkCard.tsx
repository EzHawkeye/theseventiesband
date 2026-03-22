import Image from "next/image";
import Link from "next/link";
import { remoteImageProps } from "@/lib/remote-image";
import type { PhotoAlbum } from "@/types/content";

type Props = {
  album: PhotoAlbum;
};

export function AlbumLinkCard({ album }: Props) {
  return (
    <Link
      href={`/fotos/${album.eventId}`}
      className="group block overflow-hidden rounded-2xl border-2 border-transparent bg-card shadow-md transition hover:border-terracotta hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard"
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={album.coverImage}
          alt={album.eventTitle}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          {...remoteImageProps(album.coverImage)}
        />
      </div>
      <div className="p-4">
        <p className="font-display text-xl font-bold text-ink group-hover:text-terracotta md:text-2xl">
          {album.eventTitle}
        </p>
        <p className="mt-1 text-lg text-terracotta">Bekijk album →</p>
      </div>
    </Link>
  );
}
