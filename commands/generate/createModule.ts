/* eslint-disable no-param-reassign */
import * as path from 'path';
import { readAllTSFiles } from './entity/read-all.tsfiles';
import folderApplication from './folders/folder.application';
import folderDomain from './folders/folder.domain';
import folderInfrastructure from './folders/folder.infrastructure';
import { createFile, createFolder, replaceExample } from './utils/utils';

const createModule = async (moduleName: string): Promise<void> => {
    let modulePath = path.join(__dirname, '../../src/modules/');

    await createFolder(modulePath, moduleName);

    modulePath = path.join(modulePath, moduleName);

    const folderPathExample = path.join(__dirname, '../../src/modules/example-domain');
    const allFileExample = await readAllTSFiles(folderPathExample);

    await folderApplication(modulePath, moduleName, allFileExample);
    await folderDomain(modulePath, moduleName, allFileExample);
    await folderInfrastructure(modulePath, moduleName, allFileExample);

    await createFile(
        modulePath,
        `${moduleName}.module.ts`,
        replaceExample(moduleName, allFileExample['example.module']),
    );
};
export default createModule;
