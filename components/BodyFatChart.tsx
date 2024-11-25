import React from "react";
import { View } from "react-native";
import { Text } from "@/components/Text";

const BodyFatChart = ({
  ranges,
  gender,
  isHighlighted,
}: {
  ranges: any[];
  gender: string | undefined;
  isHighlighted: (range: {
    classification: string;
    min: number;
    max: number;
  }) => boolean;
}) => {
  return (
    <View className="w-full mb-8">
      <Text
        className="text-2xl font-bold text-center mb-0 text-black"
        style={{ backgroundColor: "#fbbf24", height: 40, lineHeight: 40 }}
      >
        Body Fat Chart
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fcd34d",
          height: 30,
        }}
      >
        <Text
          className="font-bold"
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 16,
            backgroundColor: "#fcd34d",
            color: "#000",
          }}
        >
          Classification
        </Text>
        <Text
          className="font-bold"
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 16,
            backgroundColor: "#fcd34d",
          }}
        >
          {gender === "F" ? "Women" : "Men"}
        </Text>
      </View>

      {ranges.map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 32,
            backgroundColor: isHighlighted(item) ? "#4ade80" : "#e5e5e5",
            borderBottomWidth: 1,
            borderBottomColor: "#ddd",
          }}
        >
          <Text style={{ flex: 1, textAlign: "center" }}>
            {item.classification}
          </Text>
          <Text style={{ flex: 1, textAlign: "center" }}>
            {gender === "F" ? item.women : item.men}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default BodyFatChart;
