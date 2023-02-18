/* eslint-disable no-plusplus */
/* eslint-disable prefer-template */
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

export async function addModuleToEndOfImports(filePath: string, moduleName: string): Promise<void> {
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const lines = fileContents.split('\n');
    let newFileContents = '';
    let importInserted = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.includes(`import { ${moduleName} }`)) {
            console.log(`Module '${moduleName}' is already imported in file '${filePath}'`);
            return;
        }

        if (!importInserted && line.includes("from '@nestjs/mongoose'")) {
            newFileContents += line + '\n';
            newFileContents += `import { ${capitalizeFirstLetter(
                moduleName,
            )}Module } from './modules/${moduleName}/${moduleName}.module';\n`;
            importInserted = true;
        } else {
            newFileContents += line + '\n';
        }
    }

    if (!importInserted) {
        throw new Error(`Could not insert import for module '${moduleName}' in file '${filePath}'`);
    }

    await fs.writeFile(filePath, newFileContents, 'utf-8');
    console.log(`Added import for module '${moduleName}' to file '${filePath}'`);
}

export async function addImportToModuleCode(filePath: string, moduleName: string): Promise<void> {
    const fileContents = await fs.readFile(filePath, 'utf-8');

    // Split the file contents by lines.
    const lines = fileContents.split('\n');

    // Find the line that contains the `MODULES` declaration.
    const modulesLineIndex = lines.findIndex(line => line.includes('const MODULES = ['));

    if (modulesLineIndex === -1) {
        throw new Error(`Could not find 'const MODULES = [];' declaration in file '${filePath}'`);
    }

    // Check if the module is already included in the `MODULES` array.
    const alreadyIncluded = lines[modulesLineIndex].includes(`'${moduleName}'`);

    if (alreadyIncluded) {
        console.log(`Module '${moduleName}' is already included in file '${filePath}'`);
        return;
    }

    // Insert the module in the `MODULES` array.
    const arrayStartIndex = lines[modulesLineIndex].indexOf('[');
    const arrayEndIndex = lines[modulesLineIndex].lastIndexOf(']');
    const arrayContents = lines[modulesLineIndex].substring(arrayStartIndex + 1, arrayEndIndex).trim();

    let updatedArrayContents = '';

    if (arrayContents) {
        if (arrayContents.endsWith(',')) {
            updatedArrayContents = `${arrayContents} ${capitalizeFirstLetter(moduleName)}Module`;
        } else {
            updatedArrayContents = `${arrayContents}, ${capitalizeFirstLetter(moduleName)}Module`;
        }
    } else {
        updatedArrayContents = `${capitalizeFirstLetter(moduleName)}Module`;
    }

    const updatedLine =
        lines[modulesLineIndex].substring(0, arrayStartIndex + 1) +
        ' ' +
        updatedArrayContents +
        ' ' +
        lines[modulesLineIndex].substring(arrayEndIndex);

    lines[modulesLineIndex] = updatedLine;

    // Join the lines back into a single string and write the modified file.
    const modifiedContents = lines.join('\n');

    await fs.writeFile(filePath, modifiedContents, 'utf-8');
    console.log(`Added module '${moduleName}' to file '${filePath}'`);
}
