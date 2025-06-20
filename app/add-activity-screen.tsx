import { useActivitiesContext } from "@/components/ActivitiesProvider";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

export default function AddActivityScreen() {
  const [steps, setSteps] = useState<number>(0);
  const { insertActivity } = useActivitiesContext();

  return (
    <View style={styles.container}>
      <Text>AddActivityScreen</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="gray"
        placeholder="Enter Steps"
        keyboardType="number-pad"
        onChangeText={(value) => setSteps(parseInt(value))}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.buttonOne}
          onPress={() => {
          insertActivity(steps, new Date());
          router.push("/");
          }}
        >
          <Text style={styles.buttonText}>Add Activity</Text>
        </Pressable>
        <Link style={styles.buttonTwo} href={"/"} replace>
          <Text style={styles.buttonText} >Go Back</Text>
        </Link>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEF9E6",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 2,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonOne: {
    width: "100%",
    padding: 24,
    backgroundColor: "#1ED2AF",
  },
  buttonTwo: {
    width: "100%",
    padding: 24,
    backgroundColor: "#ff0000",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
  buttonContainer: {
    width: "100%",
  }
});
