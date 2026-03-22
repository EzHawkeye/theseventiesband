import eventsFile from "@/data/events.json";
import bandledenFile from "@/data/bandleden.json";
import fotosFile from "@/data/fotos.json";
import tracksFile from "@/data/tracks.json";
import type { BandMember, EventItem, PhotoAlbum, Track } from "@/types/content";

export function getEvents(): EventItem[] {
  return eventsFile.events as EventItem[];
}

export function getUpcomingEvents(): EventItem[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return getEvents()
    .filter((e) => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getEventBySlug(slug: string): EventItem | undefined {
  return getEvents().find((e) => e.slug === slug);
}

export function getMembers(): BandMember[] {
  return bandledenFile.members as BandMember[];
}

export function getPhotoAlbums(): PhotoAlbum[] {
  return fotosFile.albums as PhotoAlbum[];
}

export function getAlbumByEventId(eventId: string): PhotoAlbum | undefined {
  return getPhotoAlbums().find((a) => a.eventId === eventId);
}

export function getTracks(): Track[] {
  return tracksFile.tracks as Track[];
}
