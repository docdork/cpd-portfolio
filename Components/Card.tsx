import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface CardProps {
  competence: string;
  expDate: Date;
  imageUrl?: string;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  competence,
  expDate,
  imageUrl,
  onPress,
}) => {
  const isExpired = expDate < new Date();
  const isExpiringSoon =
    expDate >= new Date() &&
    expDate <= new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={!onPress}>
      <View
        style={[
          styles.cardContainer,
          isExpired ? { backgroundColor: "#e60404" } : null,
          isExpiringSoon ? { backgroundColor: "#ffcc00" } : null,
        ]}
      >
        {imageUrl && (
          <Image source={{ uri: imageUrl }} style={styles.cardImage} />
        )}
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{competence}</Text>
          <Text style={styles.cardDescription}>
            {expDate.toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 300,
    backgroundColor: "#0ccf1c",
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 16,
    // iOS shadow properties
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android shadow property
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#000000",
    lineHeight: 20,
  },
});
