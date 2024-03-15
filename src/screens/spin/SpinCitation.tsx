import { View } from "react-native";
import * as React from "react";

import { SpinQueryData, useSpin } from "@dctalbot/react-spinitron";
import { fontWeight, spacing } from "../../theme/theme";
import { AppText } from "../../ui/AppText";
import { AppPill } from "../../ui/AppPill";

// APA e.g.: Coldplay. (2021). My universe. On Music of the spheres. Parlophone.
// MLA e.g.: Coldplay. My universe. On Music of the spheres, Parlophone, 2021.

interface AttrRowProps {
  label?: string;
  value?: string | number | null;
}

function AttrRow({ label, value }: AttrRowProps) {
  if (!value) return null;
  if (typeof value !== "number" && !label) return null;
  return (
    <View style={{ flexDirection: "row" }}>
      <AppText
        style={{
          flex: 1,
          fontWeight: fontWeight.semibold,
        }}
        size="lg"
      >
        {label}
      </AppText>
      <AppText
        style={{
          flex: 2,
        }}
        size="md"
      >
        {value}
      </AppText>
    </View>
  );
}

export function getArtist(data?: SpinQueryData): string | undefined {
  return data?.va ? "Various Artists" : data?.["artist-custom"] ?? data?.artist;
}

interface SpinCitationProps {
  id: number;
}

export function SpinCitation(props: SpinCitationProps) {
  const { isPending, error, data } = useSpin({ id: props.id });

  const artistValue = getArtist(data);

  const genreValue = data?.genre || (data?.classical ? "Classical" : null);

  const hasPillSection = Boolean(data?.request || data?.local || data?.new);

  if (isPending) {
    return null;
  }
  if (error) {
    return null;
  }
  return (
    <View>
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

      {hasPillSection && (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: spacing[6],
            marginTop: spacing[6],
          }}
        >
          {data?.request && <AppPill text="Requested"></AppPill>}
          {data?.local && <AppPill text="Local"></AppPill>}
          {data?.new && <AppPill text="New"></AppPill>}
        </View>
      )}

      {/* TODO add a "see more" option for these.
      <AttrRow label="catalog-number" value={data?.["catalog-number"]} />
      <AttrRow label="ISRC" value={data?.isrc} />
      <AttrRow label="UPC" value={data?.upc} />
      <AttrRow label="ISWC" value={data?.iswc} /> 
      */}
    </View>
  );
}
