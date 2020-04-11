import fetchWithTimeout from '@utils/fetchWithTimeout';
import endpoint from './endpoints';

const IP = `http://${endpoint}:1200`;

export const getPulse = async () => {
  try {
    const resp = await fetchWithTimeout(`${IP}/pulse`);
    return resp.text();
  } catch (e) {
    return false;
  }
};

export const getLibrary = async () => {
  const resp = await fetch(`${IP}/library`);
  return resp.json();
};

export const getArtwork = async (artist, album, thumbnail = true) => {
  const resp = await fetch(
    `${IP}/artwork?artist=${encodeURIComponent(
      artist
    )}&album=${encodeURIComponent(album)}&thumbnail=${thumbnail}`
  );
  return resp.json();
};

export async function playAlbum(artist, album) {
  const resp = await fetch(
    `${IP}/play-album?artist=${encodeURIComponent(
      artist
    )}&album=${encodeURIComponent(album)}`,
    {
      method: 'POST'
    }
  );
  return resp.status === 200;
}

export async function playPause() {
  const resp = await fetch(`${IP}/play-pause`, { method: 'POST' });
  return resp.status === 200;
}
