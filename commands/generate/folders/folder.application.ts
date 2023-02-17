/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { capitalizeFirstLetter, createFile, createFolder, replaceExample } from '../utils/utils';

const folderApplication = async (url: string, name: string, exampleModule: { [key: string]: string }) => {
    await createFolder(url, 'application');
    await createFolder(`${url}/application`, 'dto');
    await createFile(
        `${url}/application/dto`,
        `create${capitalizeFirstLetter(name)}Dto.ts`,
        replaceExample(name, exampleModule.createExampleDto),
    );
    await createFolder(`${url}/application`, 'ports');
    await createFile(
        `${url}/application/ports`,
        'repository-port.ts',
        replaceExample(name, exampleModule['repository-port']),
    );
    await createFile(
        `${url}/application/ports`,
        'rest-adapter-port.ts',
        replaceExample(name, exampleModule['rest-adapter-port']),
    );
    await createFolder(`${url}/application`, 'use-cases');
    await createFile(
        `${url}/application/use-cases`,
        `create${capitalizeFirstLetter(name)}.usecase.ts`,
        replaceExample(name, exampleModule['createExample.usecase']),
    );
    await createFile(
        `${url}/application/use-cases`,
        `getAll${capitalizeFirstLetter(name)}s.usecase.ts`,
        replaceExample(name, exampleModule['getAllExamples.usecase']),
    );
};

export default folderApplication;
