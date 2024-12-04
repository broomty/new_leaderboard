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

      try {
        const response = await fetch("/api/parishes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });

        console.log(response);

        if (response.ok) {
          const data = await response.json(); 
          console.log(data)
          rankedParishes.value = data; 
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
