import { Text, View } from "react-native";
import * as React from "react";

import { useSpin } from "./api/useSpin";
import { fontSize, spacing } from "./theme/theme";

// APA e.g.: Coldplay. (2021). My universe [Song]. On Music of the spheres. Parlophone.
// MLA e.g.: Coldplay. My universe.” On Music of the spheres, Parlophone, 2021.

interface AttrRowProps {
  label?: string;
  value?: string | number | null;
}

function AttrRow({ label, value }: AttrRowProps) {
  if (!value) return null;
  if (typeof value !== "number" && !label) return null;
  return (
    <View style={{ flexDirection: "row" }}>
      <Text
        style={{
          flex: 1,
          borderColor: "black",
          borderWidth: 1,
          padding: spacing[4],
          fontSize: fontSize["lg"].size,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          flex: 3,
          borderColor: "black",
          borderWidth: 1,
          padding: spacing[4],
          fontSize: fontSize["lg"].size,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

interface SpinCitationProps {
  id: number;
}

export function SpinCitation(props: SpinCitationProps) {
  const { isPending, error, data } = useSpin({ id: props.id });

  const artistValue = data?.va
    ? "Various Artists"
    : data?.["artist-custom"] ?? data?.artist;

  const genreValue = data?.genre || (data?.classical ? "Classical" : null);

  if (isPending) {
    return null;
  }
  if (error) {
    return null;
  }
  return (
    <View style={{ borderColor: "black", borderWidth: 1 }}>
      <AttrRow label="Artist" value={artistValue} />
      <AttrRow label="Song" value={data?.song} />

      <AttrRow
        label="Album"
        value={data?.["release-custom"] ?? data?.release}
      />
      <AttrRow label="Label" value={data?.["label-custom"] ?? data?.label} />
      <AttrRow label="Year" value={data?.released} />

      <AttrRow label="Composition" value={data?.work} />
      <AttrRow label="Composer" value={data?.composer} />
      <AttrRow label="Conductor" value={data?.conductor} />
      <AttrRow label="Performers" value={data?.performers} />
      <AttrRow label="Ensemble" value={data?.ensemble} />

      <AttrRow label="Medium" value={data?.medium} />
      <AttrRow label="Note" value={data?.note} />
      <AttrRow label="Genre" value={genreValue} />

      {/* These fields are more useful in the context of an "on air" view */}
      {/* data.request */}
      {/* data.local */}
      {/* data.new */}
      {/* data.start + data.timezone */}

      {/* These fields do not seem useful for most people.
      <AttrRow label="catalog-number" value={data?.["catalog-number"]} />
      <AttrRow label="ISRC" value={data?.isrc} />
      <AttrRow label="UPC" value={data?.upc} />
      <AttrRow label="ISWC" value={data?.iswc} /> 
      */}
    </View>
  );
}
