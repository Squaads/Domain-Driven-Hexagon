import { ExampleInterface, ExampleStatusEnum } from './example.interface';

export class ExampleEntity implements ExampleInterface {
    title: string;
    location: string;
    description: string;
    startDate: Date;
    endDate: Date;
    operator: string;
    company: string;
    projectImages: string[];
    isPublished: boolean;
    minimumInvest: number;
    projectCost: number;
    totalInvest: number;

    constructor(partial: Partial<ExampleEntity>) {
        Object.assign(this, partial);
    }

    get status(): string {
        return this.getExampleStatus();
    }

    protected getExampleStatus(): string {
        try {
            const currentDate = new Date().getTime();
            const startDate = new Date(this.startDate.setUTCHours(0, 0, 0, 0)).getTime();
            const endDate = new Date(this.endDate.setUTCHours(24, 0, 0, 0)).getTime();

            if (startDate > endDate) return ExampleStatusEnum.UNKOWN;

            if (currentDate >= startDate && currentDate <= endDate) {
                return ExampleStatusEnum.IN_PROGRESS;
            }
            if (currentDate < startDate) {
                return ExampleStatusEnum.UNDER_REVIEW;
            }
            if (currentDate > endDate) {
                return ExampleStatusEnum.IN_PORTFOLIO;
            }

            return ExampleStatusEnum.UNKOWN;
        } catch (error) {
            return ExampleStatusEnum.UNKOWN;
        }
    }
}
