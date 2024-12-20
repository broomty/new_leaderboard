import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useCookie,useRouter } from "#app";

const serverUrl = "https://leaderboard-auth.vercel.app";
// const serverUrl = process.env.API_SERVER_URL || 'http://localhost:5000';

export const useCounterStore = defineStore(
  "counter",
  () => {
    const userData = ref({});
    const rankedParishes = ref([]);
    const viewMe = ref(false);
    const activity = ref("Potted");
    const loadingData = ref(false);

    // Function to add userData
    const addUserData = (data) => {
      userData.value = data;
    };

    //function to update viewMe
    const updateViewMe = () => {
      viewMe.value = !viewMe.value; 
    };
    
    ///function to reset data
    const resetData = () => {
      userData.value = {};
      rankedParishes.value = [];
      viewMe.value = false;
      activity.value = "Potted";
      loadingData.value = false;
    }
    
    //function to switch activity
    const switchActivity = (newActivity) => {
      activity.value = newActivity;
    }

    // Function to fetch data from API
    const fetchData = async () => {
      const router = useRouter();
      const tokenCookie = useCookie("token");
      const userToken = tokenCookie.value;
      loadingData.value = true;

      try {
        // Fetch parishes
        const response = await fetch(`/api/parishes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (response.ok) {
          const parishes = await response.json();

          // Fetch groups
          const groupsResponse = await fetch('/api/groups', {
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
              const pEmail = parish.fields["PC-Email"];
              assignedGroups[parishName] = {
                coordinator: pc,
                pemail: pEmail,
                branch: branch,
                groups: {},
                total: 0,
              };

              groupsData.forEach((group) => {
                if (group.fields["Parish ID"] === parishID) {
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

            // Rank parishes
            rankParishes(assignedGroups);
          } else {
            console.error("Failed to fetch groups:", groupsResponse.statusText);
          }
        } else {
          router.push({ path: "/auth/login" });
          console.error("Failed to fetch parishes:", response.statusText);
        }
      } catch (error) {
        router.push({ path: "/auth/login" });
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
          pcEmail : assignedGroups[parishName].pemail,
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
      viewMe,
      userData,
      fetchData,
      loadingData,
      addUserData,
      switchActivity,
      updateViewMe,
      resetData,
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
