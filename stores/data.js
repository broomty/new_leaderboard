import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useCookie } from "#app";

const serverUrl = "https://leaderboard-auth.vercel.app";
// const serverUrl = process.env.API_SERVER_URL || 'http://localhost:5000';

export const useCounterStore = defineStore(
  "counter",
  () => {
    const userData = ref({});
    const rankedParishes = ref([]);
    const activity = ref("Potted");
    const loadingData = ref(false);

    // Function to add userData
    const addUserData = (data) => {
      userData.value = data;
    };
    
    //function to switch activity
    const switchActivity = (newActivity) => {
      activity.value = newActivity;
    }

    // Function to fetch data from API
    const fetchData = async () => {
      const tokenCookie = useCookie("token");
      const userToken = tokenCookie.value;
      loadingData.value = true;

      try {
        // Fetch parishes
        const response = await fetch(`${serverUrl}/api/parishes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (response.ok) {
          const parishes = await response.json();

          // Fetch groups
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
              const parishID = parish.fields["ID"];
              const parishName = parish.fields["Parish Name"];
              const pc = parish.fields["PC-Name"];
              const branch = parish.fields["Branch"];
              assignedGroups[parishName] = {
                coordinator: pc,
                branch: branch,
                groups: {},
                total: 0,
              };

              groupsData.forEach((group) => {
                if (group.fields["Parish"] === parishID) {
                  const groupName = group.fields["Group Name"];
                  const pottedCount = group.fields["Total Potted"];
                  const prickedCount = group.fields["Total Pricked"];
                  const sortedCount = group.fields["Total Sorted"];
                  const distributedCount = group.fields["Total Distributed"];
                  const species = group.fields["SpeciesIDs"];
                  const visits = group.fields["Num_Visits"];
                  const lastVisit = group.fields["Last Visted"];

                  assignedGroups[parishName].groups[groupName] = {
                    potted: pottedCount,
                    pricked: prickedCount,
                    sorted: sortedCount,
                    distributed: distributedCount,
                    species: species,
                    visits: visits,
                    lastVisit: lastVisit,
                  };

                  // Accumulate total based on activity
                  assignedGroups[parishName].total +=
                    group.fields[`Total ${activity.value}`];
                }
              });
            });

            console.log(assignedGroups);
            // Rank parishes
            rankParishes(assignedGroups);
          } else {
            console.error("Failed to fetch groups:", groupsResponse.statusText);
          }
        } else {
          console.error("Failed to fetch parishes:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred during data fetching:", error);
      } finally {
        loadingData.value = false;
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
        .sort((a, b) => b.total - a.total);

      rankedParishes.value = sortedParishes.map((parish, index) => ({
        ...parish,
        rank: index + 1,
      }));
    };

    // Watch for changes in activity and fetch data when it changes
    watch(activity, () => {
      fetchData();
    });

    return {
      rankedParishes,
      activity,
      userData,
      fetchData,
      loadingData,
      addUserData,
      switchActivity,
    };
  },
  {
    persist: {
      enabled: true,

      key: "counterStore", // Unique key for localStorage
      storage: persistedState.sessionStorage, // Use localStorage
    },
  }
);
