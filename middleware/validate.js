'use strict';

const { ZodError } = require('zod');

function formatZodError(error) {
	return {
		message: 'Validation failed',
		errors: error.flatten ? error.flatten() : error.errors,
	};
}

function validate(schema, source = 'body') {
	return async (req, res, next) => {
		try {
			const data = req[source];
			const parsed = await schema.parseAsync(data);
			// assign parsed back in case of coercions/transforms
			req[source] = parsed;
			return next();
		} catch (err) {
			if (err instanceof ZodError) {
				return res.status(400).json(formatZodError(err));
			}
			return res.status(400).json({ message: 'Invalid request', error: err.message });
		}
	};
}

module.exports = { validate };



