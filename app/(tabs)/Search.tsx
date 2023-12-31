import { Animated, View } from "react-native";
import { useState } from "react";
import MapView from "react-native-maps";
import { Screen } from "components/Screen";
import { properties } from "../../data/properties";

import { Card } from "../../components/Card";
import { HEADERHEIGHT } from "../../constants";
import { AnimatedListHeader } from "components/AnimatedListHeader";
import { Map } from "components/Map";

const Search = () => {
  const [mapShown, setMapShown] = useState<boolean>(false);
  const [scrollAnimation] = useState(new Animated.Value(0));

  return (
    <Screen>
      <AnimatedListHeader
        scrollAnimation={scrollAnimation}
        setMapShown={setMapShown}
        mapShown={mapShown}
      />
      {mapShown ? (
        <Map properties={properties} />
      ) : (
        <Animated.FlatList
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollAnimation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          contentContainerStyle={{ paddingTop: HEADERHEIGHT - 20 }} //250(HeaderHeight imported from constant.ts) represent height, 30 is extra padding
          bounces={false}
          scrollEventThrottle={16}
          data={properties}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card style={{ marginVertical: 5 }} property={item} />
          )}
        />
      )}
    </Screen>
  );
};

export default Search;
