import { MongoOptions } from "../mongoDBDriver.interface";
import { defaultValues } from "../defaults";

export const getOptionsMock = jest.fn(({ limit, page, sort, order }): MongoOptions => {
	const skip = parseInt(page ?? 0, 10) * parseInt(limit ?? defaultValues.pageSize, 10);
	const parsedLimit = parseInt(limit ?? defaultValues.pageSize, 10);
	const parsedOrder = parseInt(order ?? defaultValues.order, 10);
	const sortValue = sort ? { [sort]: parsedOrder } : undefined;

	return { skip, limit: parsedLimit, sort: sortValue };
});