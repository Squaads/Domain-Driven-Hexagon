import { MongoPopulations } from "../MongoDBDriver.types";

export const getPopulationsMock = jest.fn((populations):MongoPopulations => {
	if (!populations) {
		return [];
	}
	if (Array.isArray(populations)) {
		return populations.map(path => ({ path }));
	}
	return populations.split(',').map(field => ({
		path: field,
	}));
});