import { View, StyleSheet } from "react-native";
import { Text, Button } from "@ui-kitten/components";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Theme } from "theme";
import { Property } from "types/property";
import { Row } from "./Row";

export const CardInformation = ({ property }: { property: Property }) => {
  return (
    <View style={styles.informationContainer}>
      <Row style={styles.rowJustification}>
        <Text category={"s1"}>
          ${property.rentLow.toLocaleString()} -{" "}
          {property.rentHigh.toLocaleString()}
        </Text>
        <MaterialCommunityIcons
          name="heart-outline"
          color={Theme["color-primary-500"]}
          size={24}
        />
      </Row>
      <Text category={"c1"}>
        {" "}
        {property.bedroomLow} - {property.bedroomHigh} Beds
      </Text>
      <Text category={"c1"} style={styles.defaultMarginTop}>
        {" "}
        {property.name}
      </Text>
      <Text category={"c1"}> {property.street}</Text>
      <Text category={"c1"}>
        {" "}
        {property.city}, {property.state} {property.zip}
      </Text>

      <Text category={"c1"} style={styles.defaultMarginTop}>
        {property.tags.map((tag, index) =>
          index === property.tags.length - 1 ? tag : `${tag}, `
        )}
      </Text>
      <Row style={[styles.defaultMarginTop, styles.rowJustification]}>
        <Button
          appearance={"ghost"}
          style={[
            {
              borderColor: Theme["color-primary-500"],
            },
            styles.Button,
          ]}
          size="small"
          onPress={() => console.log("email the item manager")}
        >
          Email
        </Button>
        <Button
          style={styles.Button}
          size="small"
          onPress={() => console.log("call the item manager")}
        >
          Call
        </Button>
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  informationContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  defaultMarginTop: {
    marginTop: 5,
  },
  rowJustification: {
    justifyContent: "space-between",
  },
  Button: {
    width: "49%",
  },
});
