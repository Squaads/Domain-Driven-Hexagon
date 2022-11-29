import { ExampleEntity } from './example.entity';
import { ExampleInterface, ExampleStatusEnum } from './example.interface';

const MOCK_PROJECT: ExampleInterface = {
    title: 'test',
    location: 'test',
    description: 'test',
    totalInvest: 1,
    operator: 'test',
    company: 'test',
    projectImages: ['test'],
    startDate: new Date('2021-01-01'),
    endDate: new Date('2024-01-01'),
    minimumInvest: 1,
    projectCost: 1,
    isPublished: false,
};

let testData = { ...MOCK_PROJECT };

afterEach(() => {
    testData = { ...MOCK_PROJECT };
});

describe.only('Project entity test', () => {
    it('project status must be "unknown" when invalid dates are provided', () => {
        testData.startDate = new Date('2024-01-01');
        testData.endDate = new Date('2021-01-01');
        const project = new ExampleEntity(testData);
        expect(project.status).toBe(ExampleStatusEnum.UNKOWN);

        testData.startDate = null;
        const project2 = new ExampleEntity(testData);
        expect(project2.status).toBe(ExampleStatusEnum.UNKOWN);

        testData.endDate = null;
        const project3 = new ExampleEntity(testData);
        expect(project3.status).toBe(ExampleStatusEnum.UNKOWN);
    });

    it('project status must be "in_progress" if current date is between start and end dates', () => {
        const dateAtPreviousMonth = new Date(new Date().setMonth(new Date().getMonth() - 1));
        const dateAtNextMonth = new Date(new Date().setMonth(new Date().getMonth() + 1));
        testData.startDate = dateAtPreviousMonth;
        testData.endDate = dateAtNextMonth;

        const project = new ExampleEntity(testData);
        expect(project.status).toBe(ExampleStatusEnum.IN_PROGRESS);
    });
    it('project status must be "under_review" if current date is before start date', () => {
        const dateAtNextMonth = new Date(new Date().setMonth(new Date().getMonth() + 1));
        testData.startDate = dateAtNextMonth;

        const project = new ExampleEntity(testData);
        expect(project.status).toBe(ExampleStatusEnum.UNDER_REVIEW);
    });

    it('project status must be "in_portfolio" if current date is after end date', () => {
        const dateAtPreviousMonth = new Date(new Date().setMonth(new Date().getMonth() - 1));
        testData.endDate = dateAtPreviousMonth;

        const project = new ExampleEntity(testData);
        expect(project.status).toBe(ExampleStatusEnum.IN_PORTFOLIO);
    });
});
