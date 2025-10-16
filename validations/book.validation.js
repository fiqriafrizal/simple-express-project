'use strict';

const { z } = require('zod');

const idParamsSchema = z.object({
	id: z.coerce.number().int().positive(),
});

const createBookBodySchema = z.object({
	title: z.string().min(1),
	// In controller, fields used are title, author, genre, publicationYear
	author: z.string().min(1).optional(),
	genre: z.string().min(1).optional(),
	publicationYear: z.coerce.number().int().optional(),
	// From model optional fields
	writer_id: z.coerce.number().int().positive().optional().nullable(),
	publisher_id: z.coerce.number().int().positive().optional().nullable(),
	pages: z.coerce.number().int().positive().optional(),
});

const updateBookBodySchema = createBookBodySchema.partial();

module.exports = {
	idParamsSchema,
	createBookBodySchema,
	updateBookBodySchema,
};



