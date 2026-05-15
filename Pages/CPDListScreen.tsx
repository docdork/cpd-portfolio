import React, { JSX } from "react";
import { View, FlatList } from "react-native";
import { Card } from "../Components/Card";
import styles from "../styles";

const sampleData = [
  {
    id: "1",
    competence: "Advanced Life Support",
    expDate: new Date(2024, 11, 31),
  },
  {
    id: "2",
    competence: "Pediatric Advanced Life Support",
    expDate: new Date(2026, 5, 30),
  },
  {
    id: "3",
    competence: "Neonatal Resuscitation Program",
    expDate: new Date(2028, 8, 15),
  },
  {
    id: "4",
    competence: "Trauma Nursing Core Course",
    expDate: new Date(2026, 5, 28),
  },
  {
    id: "5",
    competence: "Critical Care Nursing",
    expDate: new Date(2024, 11, 31),
  },
  {
    id: "6",
    competence: "Emergency Nursing",
    expDate: new Date(2025, 7, 15),
  },
  {
    id: "7",
    competence: "Infection Control",
    expDate: new Date(2027, 5, 30),
  },
  {
    id: "8",
    competence: "Patient Safety",
    expDate: new Date(2025, 11, 31),
  },
  {
    id: "9",
    competence: "Pharmacology",
    expDate: new Date(2027, 8, 15),
  },
  {
    id: "10",
    competence: "Ethical and Legal Issues in Nursing",
    expDate: new Date(2028, 2, 28),
  },
];



export default function CPDListScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        // onRefresh={() => alert("Refresh triggered!")}
        refreshing={false}
        data={sampleData}
        renderItem={({ item }) => (
          <Card
            // style={{ backgroundColor: item.expDate < new Date() ? "#f00808" : "#ffffff" }}
            key={item.id}
            competence={item.competence}
            expDate={item.expDate}
            // onPress={() => alert("Card Pressed!")}
          />
        )}
      />
    </View>
  );
}
