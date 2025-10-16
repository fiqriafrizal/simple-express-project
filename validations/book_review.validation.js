'use strict';

const { z } = require('zod');

const idParamsSchema = z.object({
	bookId: z.coerce.number().int().positive(),
	id: z.coerce.number().int().positive(),
});

const onlyBookIdParamsSchema = z.object({
	bookId: z.coerce.number().int().positive(),
});

const createBookReviewBodySchema = z.object({
	book_id: z.coerce.number().int().positive(),
	user_id: z.coerce.number().int().positive().optional().nullable(),
	name: z.string().min(1),
	review: z.string().min(1),
});

const updateBookReviewBodySchema = createBookReviewBodySchema.partial();

module.exports = {
	idParamsSchema,
	onlyBookIdParamsSchema,
	createBookReviewBodySchema,
	updateBookReviewBodySchema,
};



