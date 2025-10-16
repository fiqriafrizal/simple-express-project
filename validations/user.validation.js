'use strict';

const { z } = require('zod');

const loginBodySchema = z.object({
	username: z.string().min(1),
	password: z.string().min(6),
});

const registerBodySchema = z.object({
	username: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(6),
});

module.exports = {
	loginBodySchema,
	registerBodySchema,
};



