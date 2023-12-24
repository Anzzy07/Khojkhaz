import {
  Animated,
  FlatList,
  LayoutChangeEvent,
  Platform,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { HEADERHEIGHT, LISTMARGIN } from "../constants";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Theme } from "theme";
import { Text, Button, Divider } from "@ui-kitten/components";
import { Row } from "./Row";
import { HeaderInput } from "./HeaderInput";
import { HeaderFilterButtons } from "./HeaderFilterButtons";

export const AnimatedListHeader = ({
  scrollAnimation,
}: {
  scrollAnimation: Animated.Value;
}) => {
  const [offsetAnimation] = useState(new Animated.Value(0));
  const [clampedScroll, setClampedScroll] = useState(
    Animated.diffClamp(
      Animated.add(
        scrollAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: "clamp",
        }),
        offsetAnimation
      ),
      0,
      1
    )
  );

  const navbarTranslate = clampedScroll.interpolate({
    inputRange: [0, HEADERHEIGHT],
    outputRange: [0, -HEADERHEIGHT],
    extrapolate: "clamp",
  });

  const onLayout = (event: LayoutChangeEvent) => {
    let { height } = event.nativeEvent.layout;
    setClampedScroll(
      Animated.diffClamp(
        Animated.add(
          scrollAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: "clamp",
          }),
          offsetAnimation
        ),
        0,
        height
      )
    );
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: navbarTranslate }],
        },
      ]}
      onLayout={onLayout}
    >
      <View style={styles.defaultMarginHorizontol}>
        <HeaderInput />
        <HeaderFilterButtons />
      </View>
      <Divider style={{ backgroundColor: Theme["color-gray"] }} />
      <Row
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: LISTMARGIN,
          marginVertical: 5,
        }}
      >
        <Row>
          <MaterialCommunityIcons
            name="map-marker"
            size={18}
            color={Theme["color-primary-500"]}
          />
          <Text category={"c1"} appearance={"hint"}>
            15 Available
          </Text>
          <TouchableOpacity onPress={() => console.log("save")}>
            <Text
              category={"c1"}
              style={{
                color: Theme["color-info-300"],
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </Row>
        <Row>
          <TouchableOpacity onPress={() => console.log("sort")}>
            <Row style={{ alignItems: "center" }}>
              <MaterialCommunityIcons
                name="sort"
                color={Theme["color-info-300"]}
                size={18}
              />
              <Text
                category={"c1"}
                style={{
                  color: Theme["color-info-300"],
                  fontWeight: "bold",
                  marginLeft: 5,
                }}
              >
                Sort
              </Text>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("map")}>
            <Row style={{ alignItems: "center", marginLeft: 20 }}>
              <MaterialCommunityIcons
                name="map-outline"
                color={Theme["color-info-300"]}
                size={18}
              />
              <Text
                category={"c1"}
                style={{
                  color: Theme["color-info-300"],
                  fontWeight: "bold",
                  marginLeft: 10,
                }}
              >
                Map
              </Text>
            </Row>
          </TouchableOpacity>
        </Row>
      </Row>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1000,
    height: HEADERHEIGHT,
    backgroundColor: "#fff",
  },
  defaultMarginHorizontol: {
    marginHorizontal: LISTMARGIN,
  },
});
