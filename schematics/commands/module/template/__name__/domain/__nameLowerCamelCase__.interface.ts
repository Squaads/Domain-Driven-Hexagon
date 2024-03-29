export interface <%= nameUpperCamelCase %>Interface {
    title: string;
    location: string;
    description: string;
    startDate: Date;
    endDate: Date;
    minimumInvest: number;
    projectCost: number;
    totalInvest: number;
    operator: string;
    company: string;
    projectImages: string[];
    isPublished: boolean;
}

export enum <%= nameUpperCamelCase %>StatusEnum {
    IN_PROGRESS = 'in_progress',
    UNDER_REVIEW = 'under_review',
    IN_PORTFOLIO = 'in_portfolio',
    UNKOWN = 'unkown',
}
