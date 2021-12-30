import { readdirSync, statSync } from 'fs';
import path from 'path';

const readdirSyncRecursive = (
  dir: string,
  ending: string,
  fileArray?: string[],
): string[] => {
  const files: string[] = readdirSync(dir);

  let commandFiles: string[] = fileArray || [];

  files.forEach((file: string) => {
    if (statSync(`${dir}/${file}`).isDirectory()) {
      commandFiles = readdirSyncRecursive(
        `${dir}/${file}`,
        ending,
        commandFiles,
      );
    } else if (file.endsWith(ending)) {
      commandFiles.push('./' + path.join(`${dir}/${file}`));
    }
  });

  return commandFiles;
};

export default readdirSyncRecursive;
