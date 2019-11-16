import fetchWithTimeout from '@utils/fetchWithTimeout';
const IP = 'http://192.168.1.92:1234';

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
  return resp.text();
};
