import { defineStore } from "pinia";
import { useCookie, useFetch } from "#app";

const serverUrl = "https://leaderboard-auth.vercel.app";
export const useCounterStore = defineStore("counter", () => {
  const rankedParishes = ref([]);
  const activity = ref("Potted");

  // Fetch data from API
  const fetchData = async () => {
    const userToken = useCookie("token").value;

    const response = await fetch(`${serverUrl}/api/parishes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (response.ok) {
      const parishes = await response.json();
      const groupsResponse = await fetch(`${serverUrl}/api/groups`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (groupsResponse.ok) {
        const groupsData = await groupsResponse.json();
        const assignedGroups = {};

        // Assign each group to its parish
        parishes.forEach((parish) => {
          const parishName = parish.fields["Parish_Name"];
          const pc = parish.fields["PC-Name"];
          const branch = parish.fields["Branch"];
          assignedGroups[parishName] = { coordinator: pc,branch: branch, groups: {}, total: 0 }; // Initialize parish with groups and total

          groupsData.forEach((group) => {
            if (group.fields["Parish Name"] === parishName) {
              const groupName = group.fields["Group Name"];
              const pottedCount = group.fields["Total Potted"];
              const prickedCount = group.fields["Total Pricked"];
              const sortedCount = group.fields["Total Sorted"];
              const distributedCount = group.fields["Total Distributed"];

              assignedGroups[parishName].groups[groupName] = {
                potted: pottedCount,
                pricked: prickedCount,
                sorted: sortedCount,
                distributed: distributedCount,
              };

              // Accumulate total based on activity
              assignedGroups[parishName].total += group.fields[`Total ${activity.value}`];
            }
          });
        });

        console.log(assignedGroups);
        // Rank parishes
        rankParishes(assignedGroups);
      }
    }
  };

  // Function to rank parishes based on selected activity
  const rankParishes = (assignedGroups) => {
    const sortedParishes = Object.keys(assignedGroups)
      .map((parishName) => ({
        parish: parishName,
        coordinator: assignedGroups[parishName].coordinator,
        branch: assignedGroups[parishName].branch,
        total: assignedGroups[parishName].total,
        groups: assignedGroups[parishName].groups,
      }))
      .sort((a, b) => b.total - a.total); // Sort by total in descending order

    rankedParishes.value = sortedParishes.map((parish, index) => ({
      ...parish,
      rank: index + 1, // Assign rank starting from 1
    }));
  };

  return { rankedParishes, activity, fetchData };
});
