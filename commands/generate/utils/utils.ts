import { promises as fs } from 'fs';
import * as path from 'path';

export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function createFolder(url: string, name: string): Promise<void> {
    const folderPath = path.join(url, name);
    try {
        await fs.access(folderPath);
    } catch (err) {
        await fs.mkdir(folderPath);
    }
}

export async function createFile(url: string, name: string, data: string): Promise<void> {
    const filePath = path.join(url, name);
    await fs.writeFile(filePath, data);
}

export function replaceExample(name: string, input: string): string {
    let file = name;
    if (file.endsWith('s')) {
        file = file.slice(0, -1);
    }
    const regex = /example(-domain)?/gi; // Expresión regular para buscar "example" o "example-domain"
    return input.replace(regex, match => {
        const firstChar = match[0];
        if (match === match.toUpperCase()) {
            return file.toUpperCase();
        }
        return firstChar === firstChar.toUpperCase() ? file.charAt(0).toUpperCase() + file.slice(1) : file;
    });
}
