import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { Text, Button } from "@ui-kitten/components";
import React, { useRef, useState } from "react";
import { Screen } from "components/Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Theme } from "theme";

const LISTMARGIN = 10;

const WIDTH = Dimensions.get("screen").width - LISTMARGIN * 2;

const Search = () => {
  const properties = {
    images: [
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3FID%3DOIP.P4DMJbCaao_dpIs5dCb6IgHaLH%26pid%3DApi&f=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iE7mcw3w2aFFDhXP9A1lggHaE8%26pid%3DApi&f=1",
    ],
    rentLow: 3750,
    rentHigh: 31054,
    bedroomLow: 1,
    bedroomHigh: 5,
    name: "The Hamilton",
    street: "555 NE 34th St",
    city: "Miami",
    state: "Florida",
    zip: 33137,
    tags: ["Parking"],
  };

  const flatListRef = useRef<FlatList | null>(null);
  const viewConfig = { viewAreaCoveragePercentThreshold: 95 };
  const [activeIndex, setActiveIndex] = useState(0);
  const onViewRef = useRef(({ changed }: { changed: any }) => {
    if (changed[0].isViewable) {
      setActiveIndex(changed[0].index);
    }
  });

  const handlePressRight = () => {
    if (activeIndex === property.images.length - 1)
      return flatListRef.current?.scrollToIndex({
        animated: false,
        index: 0,
      });

    flatListRef.current?.scrollToIndex({
      index: activeIndex + 1,
    });
  };

  const handlePressLeft = () => {
    if (activeIndex === 0)
      return flatListRef.current?.scrollToIndex({
        animated: false,
        index: property.images.length - 1,
      });

    flatListRef.current?.scrollToIndex({
      index: activeIndex - 1,
    });
  };

  return (
    <Screen style={{ marginHorizontal: LISTMARGIN }}>
      <FlatList />

      <View>
        <FlatList
          ref={(ref) => {
            flatListRef.current = ref;
          }}
          data={property.images}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          pagingEnabled
          viewabilityConfig={viewConfig}
          onViewableItemsChanged={onViewRef.current}
          renderItem={({ item, index }) => (
            <Image
              source={{ uri: item }}
              style={{
                height: 225,
                width: WIDTH,
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5,
              }}
            />
          )}
          keyExtractor={(item) => item}
        />
        <Pressable
          style={{ position: "absolute", top: 95, left: 5 }}
          onPress={handlePressLeft}
        >
          <MaterialCommunityIcons name="chevron-left" color="white" size={45} />
        </Pressable>
        <Pressable
          style={{ position: "absolute", top: 95, right: 5 }}
          onPress={handlePressRight}
        >
          <MaterialCommunityIcons
            name="chevron-right"
            color="white"
            size={45}
          />
        </Pressable>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 5,
            borderWidth: 1,
            borderColor: "#d3d3d3",
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text category={"s1"}>
              ${property.rentLow.toLocaleString()} -{" "}
              {property.rentHigh.toLocaleString()}
            </Text>
            <MaterialCommunityIcons
              name="heart-outline"
              color={Theme["color-primary-500"]}
              size={24}
            />
          </View>
          <Text category={"c1"}>
            {" "}
            {property.bedroomLow} - {property.bedroomHigh} Beds
          </Text>
          <Text category={"c1"} style={{ marginTop: 5 }}>
            {" "}
            {property.name}
          </Text>
          <Text category={"c1"}> {property.street}</Text>
          <Text category={"c1"}>
            {" "}
            {property.city}, {property.state} {property.zip}
          </Text>

          <Text category={"c1"} style={{ marginTop: 5 }}>
            {property.tags.map((tag, index) =>
              index === property.tags.length - 1 ? tag : `${tag}, `
            )}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              justifyContent: "space-between",
            }}
          >
            <Button
              appearance={"ghost"}
              style={{ borderColor: Theme["color-primary-500"], width: "49%" }}
              size="small"
              onPress={() => console.log("email the property manager")}
            >
              Email
            </Button>
            <Button
              style={{ width: "49%" }}
              size="small"
              onPress={() => console.log("call the property manager")}
            >
              Call
            </Button>
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default Search;
