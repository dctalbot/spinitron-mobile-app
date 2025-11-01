import * as React from "react";
import { GestureResponderEvent, TouchableOpacity } from "react-native";

// https://reactnative.dev/docs/performance#my-touchablex-view-isnt-very-responsive
function AppTouchableOpacity(
  props: React.ComponentProps<typeof TouchableOpacity>,
) {
  function handleOnPress(event: GestureResponderEvent) {
    requestAnimationFrame(() => {
      props.onPress?.(event);
    });
  }

  return <TouchableOpacity {...props} onPress={handleOnPress} />;
}

export { AppTouchableOpacity };
