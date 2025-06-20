import { useActivities } from "@/hooks/useActivities";
import React, { createContext, useContext } from "react";

const ActivitiesContext = createContext<ReturnType<
  typeof useActivities
> | null>(null);

export const useActivitiesContext = () => useContext(ActivitiesContext);

export function ActivitiesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    getActivities,
    activities,
    insertActivity,
    deleteAllActivities,
    deleteActivity,
  } = useActivities();
  console.log(activities);
  return (
    <ActivitiesContext.Provider
      value={{
        getActivities,
        activities,
        insertActivity,
        deleteAllActivities,
        deleteActivity,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
}
