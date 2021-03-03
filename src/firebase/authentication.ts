import { LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "./config";

LogBox.ignoreLogs(["Setting a timer"]);

export const storeData = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("user", jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("user");
    return jsonValue != null ? console.log(JSON.parse(jsonValue)) : null;
  } catch (e) {
    console.log(e);
  }
};

export const SignUpUser = (email: string, password: string) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) =>
      firebase
        .firestore()
        .collection("Users")
        .add({
          name: user.user?.email,
        })
        .then(() => {
          console.log("User added");
          storeData(user.user);
          getData();
        })
        .catch((error) => {
          console.log(error);
        })
    )
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        alert("That email address is already in use!");
      }

      if (error.code === "auth/invalid-email") {
        alert("That email address is invalid!");
      }
    });
};

export const LogInUser = (email: string, password: string) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      storeData(user.user);
      getData();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const submitReview = (
  review: string,
  rating: string,
  itemId: any,
  status: string,
  userId: any
) => {
  // const getStatus = async () => {
  //   await fetch(
  //     "http://ec2-13-127-176-96.ap-south-1.compute.amazonaws.com/predict",
  //     {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         review: review,
  //       }),
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log(json);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // getStatus();

  // console.log(status);

  firebase
    .firestore()
    .collection("reviews")
    .doc()
    .set({
      review: review,
      rating: rating,
      itemId: itemId,
      userId: userId,
      status: status,
      time: Date.now(),
    })
    .then(() => {
      console.log("Review submitted successfully!!");
      alert("Review submitted successfully!!");
    })
    .catch((error) => {
      console.log("ERROR", error);
    });
};
