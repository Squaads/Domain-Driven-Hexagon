/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { capitalizeFirstLetter, createFile, createFolder, replaceExample } from '../utils/utils';

const folderInfrastructure = async (url: string, name: string, exampleModule: { [key: string]: string }) => {
    await createFolder(url, 'infrastructure');
    await createFolder(`${url}/infrastructure`, 'adapters');
    await createFolder(`${url}/infrastructure/adapters`, 'persistence');
    await createFile(
        `${url}/infrastructure/adapters/persistence`,
        `${name}.repository.ts`,
        replaceExample(name, exampleModule['example.repository']),
    );
    await createFile(
        `${url}/infrastructure/adapters/persistence`,
        `${name}.schema.ts`,
        replaceExample(name, exampleModule['example.schema']),
    );
    await createFolder(`${url}/infrastructure/adapters`, 'rest');
    await createFile(
        `${url}/infrastructure/adapters/rest`,
        `${name}.controller.ts`,
        replaceExample(name, exampleModule['example.controller']),
    );
    await createFolder(`${url}/infrastructure`, 'dto');
    await createFile(
        `${url}/infrastructure/dto`,
        `${capitalizeFirstLetter(name)}ResponseDto.ts`,
        replaceExample(name, exampleModule.ExampleResponseDto),
    );
};

export default folderInfrastructure;
