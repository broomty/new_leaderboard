import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const jwtSecret = config.jwtSecret;
  const staffView = config.staffView;

  try {

      const body = await readBody(event);
      console.log(body.email);
      let email = body.email;
      if (!email) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request: Email is required',
        });
      }

      console.log(staffView);
      console.log(email);

      const encodedView = encodeURIComponent(staffView);
      const url = `https://api.airtable.com/v0/${config.ugOpsBaseId}/${config.staffTable}?view=${encodedView}&filterByFormula={Email}="${email}"`;

      console.log(url);
      
      const response = await $fetch(url, {
        headers: {
          Authorization: `Bearer ${config.airtableApiKey}`,
        },
      });
      console.log(response);
      const user = response.records.length > 0 ? response.records[0] : null;

      

      if (!user) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Unauthorized: Invalid email',
        });
      }

      // Create a JWT
      const token = jwt.sign(
        { id: user.fields.id, email: user.fields['Email'] },
        jwtSecret,
        { expiresIn: '1h' }
      );

      console.log(token);
      // Respond with the token and user info
      return {
        token,
        user: {
          id: user.id,
          userData: {
            email: user.fields['Email'],
            firstName: user.fields['First Name'],
            lastName: user.fields['Last Name'],
            role: user.fields['Role'],
          },
        },
      };

    // Handle unsupported methods
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed',
    });
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
      data: error.message,
    });
  }
});
