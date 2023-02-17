/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { createFile, createFolder, replaceExample } from '../utils/utils';

const folderDomain = async (url: string, name: string, exampleModule: { [key: string]: string }) => {
    await createFolder(url, 'domain');
    await createFile(`${url}/domain`, `${name}.entity.ts`, replaceExample(name, exampleModule['example.entity']));
    await createFile(`${url}/domain`, `${name}.interface.ts`, replaceExample(name, exampleModule['example.interface']));
    await createFile(`${url}/domain`, `${name}.test.ts`, replaceExample(name, exampleModule['example.test']));
};

export default folderDomain;
