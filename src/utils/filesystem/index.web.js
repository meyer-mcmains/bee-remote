const { App } = nw;

export const appData = `${App.dataPath}/`;

export const mkdir = async name => fs.ensureDir(`${appData}${name}`);

export const writeFile = async (data, dir, name) =>
  fs.promises.writeFile(`${appData}${dir}/${name}`, data, {
    encoding: 'base64'
  });
