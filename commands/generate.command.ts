/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { AppService } from './app.service';

const appService = new AppService();

yargs(hideBin(process.argv))
    .command(
        'generate <name>',
        'Greet the user with a custom message',
        yargs => {
            yargs
                .positional('name', {
                    describe: 'The name of the user to greet',
                    type: 'string',
                })
                .option('option1', {
                    describe: 'Description of option 1',
                    type: 'string',
                    demandOption: true,
                    default: 'default value',
                })
                .option('option2', {
                    describe: 'Description of option 2',
                    type: 'string',
                    default: 'default value',
                });
        },
        argv => {
            appService.greet(argv.name as string);
        },
    )
    .help().argv;
