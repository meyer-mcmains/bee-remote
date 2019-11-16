import * as FileSystem from 'expo-file-system';

export const appData = FileSystem.documentDirectory;

export const mkdir = async name => {
  const contents = await FileSystem.readDirectoryAsync(appData);
  if (contents.find(dir => dir === name)) return;
  FileSystem.makeDirectoryAsync(`${appData}${name}`);
};

export const writeFile = async (data, dir, name) =>
  FileSystem.writeAsStringAsync(`${appData}${dir}/${name}`, data, {
    encoding: FileSystem.EncodingType.Base64
  });
