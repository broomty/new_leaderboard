import jwt from 'jsonwebtoken';
import AirtableService from '../../utils/airtable';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const jwtSecret = config.jwtSecret;
  const parishTable = config.parishTable;
  const groupTable = config.groupTable;
  const parishView = config.parishView;
  const groupView = config.groupView;

  const airtableParishService = new AirtableService(config.ugNuBaseId, parishTable);
  const airtableGroupService = new AirtableService(config.ugCnuBaseId, groupTable);

  const authHeader = getHeader(event, 'authorization'); // Get the JWT token from the request


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

    const activity = getRouterParam(event,'activity') || "Potted";

    console.log(getRouterParam(event,'activity'));
    // Fetch parishes
    const parishes = await airtableParishService.fetchAllRecords(parishView);

    // Fetch groups
    const groups = await airtableGroupService.fetchAllRecords(groupView);

    // Combine data
    const assignedGroups = {};

    parishes.forEach((parish) => {
      const parishID = parish.fields["ID"];
      const parishName = parish.fields["Parish Name"];
      const pc = parish.fields["PC-Name"];
      const branch = parish.fields["Branch"];
      const pEmail = parish.fields["PC-Email"];
      assignedGroups[parishName] = {
        coordinator: pc,
        pemail: pEmail,
        branch: branch,
        groups: {},
        total: 0,
      };

      groups.forEach((group) => {
        if (group.fields["Parish ID"] === parishID) {
          const groupName = group.fields["Group Name"];
          const activityCount = group.fields[`Total ${activity}`]; // Dynamically get the field for the activity

          assignedGroups[parishName].groups[groupName] = {
            ...group.fields,
          };

          assignedGroups[parishName].total += activityCount || 0;
        }
      });
    });

    // Rank parishes
    const rankedParishes = rankParishes(assignedGroups);

    // return { activity, rankedParishes };
    return rankedParishes;
  } catch (error) {
    console.error('Error fetching or processing records:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch or process records',
      data: error,
    });
  }
});

// Helper function for ranking
function rankParishes(assignedGroups) {
  return Object.entries(assignedGroups)
    .sort((a, b) => b[1].total - a[1].total)
    .map(([name, data], index) => ({
      rank: index + 1,
      parish: name,
      ...data,
    }));
}