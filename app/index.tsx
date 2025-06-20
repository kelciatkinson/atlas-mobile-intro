import { useActivitiesContext } from "@/components/ActivitiesProvider";
import Activity from "@/components/Activity";
import { Link } from "expo-router";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { FlashList } from "@shopify/flash-list";

export default function Index() {
  const { activities, deleteAllActivities } = useActivitiesContext();
  return (
    <View style={{ flex: 1, margin: "auto", width: "100%", paddingTop: 20, backgroundColor: "#FEF9E6"}}>
      <FlashList
        renderItem={({ item }) => (
          <Activity steps={item.steps} date={item.date} id={item.id} />
        )}
        data={activities}
        estimatedItemSize={50}
      />
      <Link style={styles.buttonOne} href={"/add-activity-screen"} replace>
        <Text style={styles.buttonText}>Add Activity</Text>
      </Link>
      <Pressable style={styles.buttonTwo} onPress={deleteAllActivities}>
        <Text style={styles.buttonText}>Delete All Activities</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOne: {
    backgroundColor: "#1ED2AF",
    padding: 24,
    textAlign: "center",
  },
  buttonTwo: {
    backgroundColor: "#D00414",
    padding: 24,
    textAlign: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  }
});
