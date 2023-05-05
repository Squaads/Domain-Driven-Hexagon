import { MongoProjections } from "../MongoDBDriver.types";

export const getProjectionMock = jest.fn((projections):MongoProjections => {
	if (!projections) {
		return '';
	}
	if (Array.isArray(projections)) {
		return projections.join(' ');
	}
	return projections.split(',').join(' ');
})