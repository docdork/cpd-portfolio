import React, { JSX } from "react";
import {
  View,
  FlatList,
  Modal,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import { Card } from "../Components/Card";
import styles from "../styles";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";
import { useAuthContext } from "../hooks/useAuthContext";

interface Competency {
  id: string;
  title: string;
  expDate: Date;
}

interface CompetencyApiItem {
  id?: string;
  _id?: string;
  title: string;
  expDate: string;
}

export default function CPDListScreen() {
  // State variables to manage competencies, loading state, modal visibility, selected competence, expiry date, and error state
  const [competencies, setCompetencies] = useState<Competency[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedCompetence, setSelectedCompetence] =
    useState<Competency | null>(null);
  const [expiryDate, setExpiryDate] = useState<DateType>();
  const [error, setError] = useState(false);

  const { user } = useAuthContext();

  const navigation = useNavigation();
  const defaultStyles = useDefaultStyles();

  console.log("User token:", user?.token);
  useEffect(() => {
    setCompetencies([]);
  }, []);

  function clearCompetencies() {
    setCompetencies([]);
  }

  // Refresh the competencies list when the screen gains focus
  const refresh = navigation.addListener("focus", () => {
    clearCompetencies();
    setIsLoading(true);
    fetchCompetencies().finally(() => setIsLoading(false));
  });

  useEffect(() => {
    return refresh;
  }, [navigation]);

  // Function to fetch competencies from the backend API
  async function fetchCompetencies() {
    try {
      const response = await fetch(
        `https://cpd-backend-6f7044c48b89.herokuapp.com/api/competencies`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }

      const data: CompetencyApiItem[] = await response.json();
      setCompetencies(
        data
          .map((item) => ({
            id: item.id ?? item._id,
            title: item.title,
            expDate: new Date(item.expDate),
          }))
          .filter((item): item is Competency => Boolean(item.id))
          .sort((a, b) => a.expDate.getTime() - b.expDate.getTime()),
      );
      console.log("Fetched competencies:", data);
    } catch (error) {
      console.error("Error fetching competencies:", error);
      setError(true);
    }
  }

  useEffect(() => {
    if (user) {
      fetchCompetencies();
    }
  }, [user]);

  return (
    <View style={styles.container}>
      {isLoading && (
        <>
          <Text style={styles.title}>Loading...</Text>
          <ActivityIndicator size="large" />
        </>
      )}
      {error && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          Error fetching competencies. Please try again later. {error}
        </Text>
      )}
      {/* FlatList to display the list of competencies */}
      <FlatList
        showsVerticalScrollIndicator={false}
        onRefresh={fetchCompetencies}
        refreshing={isLoading}
        data={competencies}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              setSelectedCompetence(item);
              setUpdateModalVisible(true);
            }}
          >
            <Card
              key={item.id}
              competence={item.title}
              expDate={item.expDate}
            />
          </Pressable>
        )}
      />
      {/* Update Modal to update the date of a competence or delete it from the list */}
      <Modal
        visible={updateModalVisible}
        onRequestClose={() => setUpdateModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {/* Update Modal content goes here */}
          <Text style={styles.title}>{selectedCompetence?.title}</Text>
          <Text style={styles.title}>
            {selectedCompetence?.expDate.toDateString()}
          </Text>
          <View style={styles.datePickerContainer}>
            <DateTimePicker
              locale="en-GB"
              styles={defaultStyles}
              mode="single"
              date={expiryDate}
              onChange={({ date }) => {
                setExpiryDate(date);
                console.log("Selected Expiry Date:", date);
              }}
            />
          </View>
          <Pressable
            onPress={() => {
              if (selectedCompetence && expiryDate) {
                console.log(selectedCompetence.id, expiryDate);
                fetch(
                  `https://cpd-backend-6f7044c48b89.herokuapp.com/api/competencies/${selectedCompetence.id}`,
                  {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${user.token}`,
                    },
                    body: JSON.stringify({
                      expDate: expiryDate,
                    }),
                  },
                ).then(() => {
                  setUpdateModalVisible(false);
                  fetchCompetencies();
                });
              }
            }}
            style={styles.button}
          >
            <Text>Update</Text>
          </Pressable>
          <Pressable
            style={[styles.button, { backgroundColor: "red" }]}
            onPress={() => {
              if (selectedCompetence) {
                fetch(
                  `https://cpd-backend-6f7044c48b89.herokuapp.com/api/competencies/${selectedCompetence.id}`,
                  {
                    method: "DELETE",
                    headers: {
                      Authorization: `Bearer ${user.token}`,
                    },
                  },
                ).then(() => {
                  setUpdateModalVisible(false);
                  fetchCompetencies();
                });
              }
            }}
          >
            <Text>Delete</Text>
          </Pressable>
          <Pressable
            style={[styles.button, { backgroundColor: "lightblue" }]}
            onPress={() => setUpdateModalVisible(false)}
          >
            <Text>Go back</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}
