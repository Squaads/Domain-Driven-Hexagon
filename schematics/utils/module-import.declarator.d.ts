import { DeclarationOptions } from './module.declarator';
import { PathSolver } from '@nestjs/schematics/dist/utils/path.solver';
export declare class ModuleImportDeclarator {
    private solver;
    constructor(solver?: PathSolver);
    declare(content: string, options: DeclarationOptions): string;
    private findImportsEndpoint;
    private buildLineToInsert;
    private computeRelativePath;
}
