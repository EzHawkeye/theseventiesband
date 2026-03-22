export type EventItem = {
  id: string;
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  shortDescription: string;
  fullDescription: string;
  ticketUrl?: string;
};

export type BandMember = {
  id: string;
  name: string;
  instrument: string;
  bio: string;
  photo: string;
};

export type GalleryPhoto = {
  src: string;
  alt: string;
};

export type PhotoAlbum = {
  eventId: string;
  eventTitle: string;
  coverImage: string;
  photos: GalleryPhoto[];
};
