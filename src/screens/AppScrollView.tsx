import { ScrollView } from "react-native";
import * as React from "react";

import { StyleSheet } from "react-native";
import { spacing } from "../theme/theme";

interface AppScrollViewProps {
  children: React.ReactNode;
}

export function AppScrollView(props: AppScrollViewProps) {
  return <ScrollView style={styles.container}>{props.children}</ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    padding: spacing[12],
  },
});
