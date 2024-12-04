import jwt from 'jsonwebtoken';
import AirtableService from '../utils/airtable';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const jwtSecret = config.jwtSecret;
  const staffView = config.staffView;

  const airtableService = new AirtableService(config.ugOpsBaseId, config.staffTable);

  try {
    const body = await readBody(event);
    const email = body.email;

    if (!email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request: Email is required',
      });
    }
    const response = await airtableService.fetchWithFormula(`{Email} = "${email}"`, staffView);

    const user = response.length > 0 ? response[0] : null;

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized: Invalid email',
      });
    }

    // Create a JWT
    const token = jwt.sign(
      { id: user.id, email: user.fields.Email },
      jwtSecret,
      { expiresIn: '1h' }
    );

    console.log(token)

    // Respond with the token and user info
    return {
      token,
      user: {
        id: user.id,
        userData: {
          email: user.fields.Email,
          firstName: user.fields['First Name'],
          lastName: user.fields['Last Name'],
          role: user.fields['Role'],
        },
      },
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
      data: error.message,
    });
  }
});
