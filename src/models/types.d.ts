export interface AppEntry {
  id: string;
  title: string;
  artist: string;
  image: string;
}

export interface AppPodcast {
  wrapperType: string;
  releaseDate: string;
  trackTimeMillis: string;
  trackId: string;
  trackName: string;
  episodeUrl: string;
  description: string;
}
