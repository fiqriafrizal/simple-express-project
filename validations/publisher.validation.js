'use strict';

const { z } = require('zod');

const idParamsSchema = z.object({
	id: z.coerce.number().int().positive(),
});

const createPublisherBodySchema = z.object({
	name: z.string().min(1),
});

const updatePublisherBodySchema = createPublisherBodySchema.partial();

module.exports = {
	idParamsSchema,
	createPublisherBodySchema,
	updatePublisherBodySchema,
};



