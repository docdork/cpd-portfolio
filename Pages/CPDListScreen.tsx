import React, { JSX } from "react";
import { View, FlatList } from "react-native";
import { Card } from "../Components/Card";
import styles from "../styles";
import { useEffect, useState } from "react";

//  Sample data for CPD competences - replace with dynamic data source in future
// const sampleData = [
//   {
//     id: "1",
//     competence: "Advanced Life Support",
//     expDate: new Date(2024, 11, 31),
//   },
//   {
//     id: "2",
//     competence: "Pediatric Advanced Life Support",
//     expDate: new Date(2026, 5, 30),
//   },
//   {
//     id: "3",
//     competence: "Neonatal Resuscitation Program",
//     expDate: new Date(2028, 8, 15),
//   },
//   {
//     id: "4",
//     competence: "Trauma Nursing Core Course",
//     expDate: new Date(2026, 5, 28),
//   },
//   {
//     id: "5",
//     competence: "Critical Care Nursing",
//     expDate: new Date(2024, 11, 31),
//   },
//   {
//     id: "6",
//     competence: "Emergency Nursing",
//     expDate: new Date(2025, 7, 15),
//   },
//   {
//     id: "7",
//     competence: "Infection Control",
//     expDate: new Date(2027, 5, 30),
//   },
//   {
//     id: "8",
//     competence: "Patient Safety",
//     expDate: new Date(2025, 11, 31),
//   },
//   {
//     id: "9",
//     competence: "Pharmacology",
//     expDate: new Date(2027, 8, 15),
//   },
//   {
//     id: "10",
//     competence: "Ethical and Legal Issues in Nursing",
//     expDate: new Date(2028, 2, 28),
//   },
// ];

interface Competency {
  id: string;
  title: string;
  expDate: Date;
}

export default function CPDListScreen() {
  const [competencies, setCompetencies] = useState<Competency[]>([]);
  async function fetchCompetencies() {
    try {
      const response = await fetch("http://localhost:4000/api/competencies");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }

      const data = await response.json();
      setCompetencies(
        data.map((item: any) => ({
          id: item.id,
          title: item.title,
          expDate: new Date(item.expDate),
        })),
      );

    } catch (error) {
      console.error("Error fetching competencies:", error);
    }
  }

  useEffect(() => {
    fetchCompetencies();
  }, []);

  return (
    <View style={styles.container}>
      {/* FlatList to display the list of CPD competences using the Card component */}
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={false}
        data={competencies}
        renderItem={({ item }) => (
          <Card key={item.id} competence={item.title} expDate={item.expDate} 
          />
        )}
      />
    </View>
  );
}
