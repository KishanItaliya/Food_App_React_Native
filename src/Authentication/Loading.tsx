import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import firebase from "../firebase/config";

const Loading = (props: any) => {
  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.navigation.navigate("Home");
      } else {
        props.navigation.navigate("Onboarding");
      }
    });
  };

  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Loading;
