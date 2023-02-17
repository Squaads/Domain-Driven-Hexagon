/* eslint-disable no-await-in-loop */
import * as fs from 'fs/promises';
import * as path from 'path';

export async function readAllTSFiles(dirPath: string): Promise<{ [key: string]: string }> {
    const result: { [key: string]: string } = {};
    const files = await fs.readdir(dirPath);
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) {
            const subDirFiles = await readAllTSFiles(filePath);
            Object.assign(result, subDirFiles);
        } else if (path.extname(file) === '.ts') {
            const content = await fs.readFile(filePath, 'utf-8');
            const key = path.parse(file).name; // Obtiene el nombre del archivo sin la extensión
            result[key] = content;
        }
    }
    return result;
}
