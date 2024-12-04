import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const jwtSecret = config.jwtSecret; 
  const tableName = config.parishTable;
  const viewName = config.parishView;
  const encodedTableName = encodeURIComponent(tableName);
  const encodedView = encodeURIComponent(viewName);

  // Verify JWT from Authorization header
  const authHeader = getHeader(event, 'authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized Access',
    });
  }

  const token = authHeader.split(' ')[1]; // Extract token
  try {
    jwt.verify(token, jwtSecret); // Verify the token
  } catch (err) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized Access',
      data: err.message,
    });
  }

  try {
    let records = [];
    let offset = null;

    do {
      const url = `https://api.airtable.com/v0/${config.ugNuBaseId}/${encodedTableName}?view=${encodedView}${offset ? `&offset=${offset}` : ''}`;
      console.log(url);
      const response = await $fetch(url, {
        headers: {
          Authorization: `Bearer ${config.airtableApiKey}`, // Airtable API key from config
        },
      });

      records = records.concat(response.records);
      offset = response.offset;
    } while (offset);

    return records;
  } catch (error) {
    console.error('Error fetching records:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch records',
      data: error,
    });
  }
});
