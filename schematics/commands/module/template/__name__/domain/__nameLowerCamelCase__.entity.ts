import { <%= nameUpperCamelCase %>Interface, <%= nameUpperCamelCase %>StatusEnum } from './<%= nameLowerCamelCase %>.interface';

export class <%= nameUpperCamelCase %>Entity implements <%= nameUpperCamelCase %>Interface {
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

    constructor(partial: Partial<<%= nameUpperCamelCase %>Entity>) {
        Object.assign(this, partial);
    }

    get status(): string {
        return this.get<%= nameUpperCamelCase %>Status();
    }

    protected get<%= nameUpperCamelCase %>Status(): string {
        try {
            const currentDate = new Date().getTime();
            const startDate = new Date(this.startDate.setUTCHours(0, 0, 0, 0)).getTime();
            const endDate = new Date(this.endDate.setUTCHours(24, 0, 0, 0)).getTime();

            if (startDate > endDate) return <%= nameUpperCamelCase %>StatusEnum.UNKOWN;

            if (currentDate >= startDate && currentDate <= endDate) {
                return <%= nameUpperCamelCase %>StatusEnum.IN_PROGRESS;
            }
            if (currentDate < startDate) {
                return <%= nameUpperCamelCase %>StatusEnum.UNDER_REVIEW;
            }
            if (currentDate > endDate) {
                return <%= nameUpperCamelCase %>StatusEnum.IN_PORTFOLIO;
            }

            return <%= nameUpperCamelCase %>StatusEnum.UNKOWN;
        } catch (error) {
            return <%= nameUpperCamelCase %>StatusEnum.UNKOWN;
        }
    }
}
