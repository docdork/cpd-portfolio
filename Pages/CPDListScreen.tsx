import React, { JSX } from "react";
import { View, FlatList, Modal, Pressable, Text } from "react-native";
import { Card } from "../Components/Card";
import styles from "../styles";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

interface Competency {
  id: string;
  title: string;
  expDate: Date;
}

export default function CPDListScreen() {
  const [competencies, setCompetencies] = useState<Competency[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  function clearCompetencies() {
    setCompetencies([]);
  }

  useEffect(() => {
    const refresh = navigation.addListener("focus", () => {
      console.log("Screen is focused");
      clearCompetencies();
      fetchCompetencies(); // Fetch the competencies when the screen is focused
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return refresh;
  }, [navigation]);

  async function fetchCompetencies() {
    try {
      const response = await fetch(
        `https://cpd-backend-6f7044c48b89.herokuapp.com/api/competencies`,
      );

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
      {/* <Pressable
        onPress={() => {
          clearCompetencies();
          fetchCompetencies();
        }}
        style={styles.button}
      >
        <Text style={styles.title}>Refresh List</Text>
      </Pressable> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        onRefresh={fetchCompetencies}
        refreshing={false}
        data={competencies}
        renderItem={({ item }) => (
          <Card key={item.id} competence={item.title} expDate={item.expDate} />
        )}
      />
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Modal content goes here */}
        <Pressable onPress={() => setModalVisible(false)}>
          <Text>Update</Text>
        </Pressable>
        <Pressable onPress={() => setModalVisible(false)}>
          <Text>Delete</Text>
        </Pressable>
      </Modal>
    </View>
  );
}
