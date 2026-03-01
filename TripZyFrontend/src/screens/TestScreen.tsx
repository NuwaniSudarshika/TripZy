import React, { useEffect } from "react";
import { View, Text } from "react-native";
import API from "../api/api";

const TestScreen = () => {

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users");
        console.log(res.data);
      } catch (error) {
        console.log("API Error:", error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Testing API Connection...</Text>
    </View>
  );
};

export default TestScreen;