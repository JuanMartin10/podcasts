import { Feed } from '../models/api-types';

export const formatTime = (ms: number) => {
  let totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const secondsString = seconds.toString().padStart(2, '0');

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secondsString}`;
  } else {
    return `${minutes}:${secondsString}`;
  }
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${day}/${month}/${year}`;
};

export const formatApiEntries = (apiFeed: Feed) =>
  apiFeed.entry.map(entry => ({
    id: entry.id.attributes['im:id'],
    title: entry['im:name'].label,
    artist: entry['im:artist'].label,
    image: entry['im:image'][0].label,
    summary: entry.summary.label,
  }));
