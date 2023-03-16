import { <%= classify(name) %>Interface, <%= classify(name) %>StatusEnum } from './<%= name %>.interface';

export class <%= classify(name) %>Entity implements <%= classify(name) %>Interface {
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

    constructor(partial: Partial<<%= classify(name) %>Entity>) {
        Object.assign(this, partial);
    }

    get status(): string {
        return this.get<%= classify(name) %>Status();
    }

    protected get<%= classify(name) %>Status(): string {
        try {
            const currentDate = new Date().getTime();
            const startDate = new Date(this.startDate.setUTCHours(0, 0, 0, 0)).getTime();
            const endDate = new Date(this.endDate.setUTCHours(24, 0, 0, 0)).getTime();

            if (startDate > endDate) return <%= classify(name) %>StatusEnum.UNKOWN;

            if (currentDate >= startDate && currentDate <= endDate) {
                return <%= classify(name) %>StatusEnum.IN_PROGRESS;
            }
            if (currentDate < startDate) {
                return <%= classify(name) %>StatusEnum.UNDER_REVIEW;
            }
            if (currentDate > endDate) {
                return <%= classify(name) %>StatusEnum.IN_PORTFOLIO;
            }

            return <%= classify(name) %>StatusEnum.UNKOWN;
        } catch (error) {
            return <%= classify(name) %>StatusEnum.UNKOWN;
        }
    }
}
