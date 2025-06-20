import { Text, View, StyleSheet, Alert } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { useActivitiesContext } from "./ActivitiesProvider";

type ActivityProps = {
  id:number;
  steps?: number;
  date?: string | number | Date;
};

export const Action = ({ text }: { text: string }) => {
  return (
    <View style={styles.actionView}>
      <Text style={styles.actionText}>{text}</Text>
    </View>
  );
};

export default function Activity({
  id,
  steps = 0,
  date = new Date(),
}: ActivityProps) {
  const { deleteActivity } = useActivitiesContext();
  const swipeableRef = useRef<Swipeable>(null);
  
  useEffect(() => {
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  }, [id]);

   const handleDelete = () => {
    Alert.alert(
      "Delete Activity",
      "Are you sure you want to delete this activity?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            if (swipeableRef.current) {
              swipeableRef.current.close();
            }
          }
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteActivity(id)
        }
      ]
    );
  };

  const formattedDate = date
    ? new Date(date).toLocaleDateString()
    : "Unknown date";
  const formattedTime = date
    ? new Date(date).toLocaleTimeString()
    : "Unknown time";

  return (
    <View style={styles.wrapper}>
      <Swipeable
        renderLeftActions={() => <Action text="Delete" />}
        renderRightActions={() => <Action text="Delete" />}
        onSwipeableOpen={handleDelete}
      >
        <View style={styles.container}>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateText}>{formattedDate}</Text>
            <Text style={styles.timestampText}>{formattedTime}</Text>
          </View>
          <Text
            style={styles.stepsText}
          >{`Steps: ${steps.toLocaleString()}`}</Text>
        </View>
      </Swipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 24,
    marginHorizontal: 10,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    borderWidth: 2,
  },
  dateTimeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    marginRight: 5,
  },
  timestampText: {
    fontSize: 12,
    color: "gray",
    marginRight: 10,
  },
  stepsText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
   actionView: {
    backgroundColor: '#ff0000',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 75,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
  }
});
