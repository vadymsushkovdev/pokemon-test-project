import * as fs from 'fs';

export const fileToBuffer = (filename: string) => {
  const readStream = fs.createReadStream(filename);
  const chunks = [];
  return new Promise((resolve, reject) => {
    readStream.on('error', (err) => {
      reject(err);
    });

    readStream.on('data', (chunk) => {
      chunks.push(chunk);
    });

    readStream.on('close', () => {
      resolve(Buffer.concat(chunks));
    });
  });
};
