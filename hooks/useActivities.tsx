import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

type Activity = {
  id: number;
  steps: number;
  date: number;
};

export function useActivities() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const db = useSQLiteContext();

    async function getActivities() {
      try {
        const result = await db.getAllAsync<Activity>("SELECT * FROM activities");
        console.log("Fetched activities:", result);
        setActivities(result || []);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setActivities([]);
      }
    }

    function insertActivity(steps: number, date: Date) {
      db.execSync(`INSERT INTO activities (steps, date) VALUES (${steps}, ${date.getTime()})`);
      reload();
    }

    async function reload() {
      await getActivities();
    }

    useEffect(() => {
      reload();
    }, []);

    return { getActivities, activities, insertActivity, deleteAllActivities, deleteActivity };
}
