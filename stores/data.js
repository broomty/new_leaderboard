import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useCookie, useRouter } from "#app";

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
    };

    //function to switch activity
    const switchActivity = (newActivity) => {
      activity.value = newActivity;
    };

    // Function to fetch data from API
    const fetchData = async () => {
      const router = useRouter();
      const tokenCookie = useCookie("token");
      const userToken = tokenCookie.value;
      loadingData.value = true;
    
      if (!userToken) {
        console.error("Missing user token. Redirecting to login.");
        router.push({ path: "/auth/login" });
        loadingData.value = false;
        return;
      }
    
      try {
        const response = await fetch(`/api/parishes/${activity.value}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          rankedParishes.value = data;
        } else {
          if (response.status === 401) {
            router.push({ path: "/auth/login" });
          } else {
            console.error("Failed to fetch parishes:", response.statusText);
          }
        }
      } catch (error) {
        console.error("An error occurred during data fetching:", error);
        router.push({ path: "/auth/login" });
      } finally {
        loadingData.value = false;
      }
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
