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

const removeData = async () => {
  try {
    await AsyncStorage.removeItem("user");
    console.log("USER REMOVED FROM STORAGE");
  } catch (e) {
    console.log(e);
  }
};

export const SignUpUser = async (
  email: string,
  password: string,
  avatar: any
) => {
  // firebase
  //   .auth()
  //   .createUserWithEmailAndPassword(email, password)
  //   .then((user) =>
  //     firebase
  //       .firestore()
  //       .collection("Users")
  //       // .doc(user.user?.uid)
  //       .add({
  //         name: user.user?.email,
  //         id: user.user?.uid,
  //       })
  //       .then(() => {
  //         console.log("User added");
  //         storeData(user.user);
  //         getData();
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       })
  //   )
  //   .catch((error) => {
  //     if (error.code === "auth/email-already-in-use") {
  //       alert("That email address is already in use!");
  //     }

  //     if (error.code === "auth/invalid-email") {
  //       alert("That email address is invalid!");
  //     }
  //   });

  let remoteUri = null;
  let userId;
  console.log("AVATAR", avatar);

  try {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        userId = user?.user?.uid;
        storeData(user.user);
        getData();
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          alert("That email address is invalid!");
        }
      });

    let db = firebase.firestore().collection("users").doc(userId);
    db.set({
      email: email,
      avatar: null,
      username: null,
      address: null,
    });
    if (avatar) {
      remoteUri = await uploadPhotoAsync(avatar, `avatars/${userId}`);
      db.set({ avatar: remoteUri }, { merge: true });
    }
  } catch (err) {
    alert("Error: ", err);
  }
};

export function LogInUser(email: string, password: string) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((auth) => {
      storeData(auth.user);
      getData();
    })
    .catch((error) => {
      console.log(error);
    });
}

export const signOut = () => {
  removeData();
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("LOGGED OUT!!");
    });
};

export const submitReview = (
  review: string,
  rating: string,
  name: any,
  status: any,
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
  if (status != undefined) {
    if (status == "Positive Review") {
      firebase
        .firestore()
        .collection("reviews")
        .doc(name)
        .collection("positive")
        .doc()
        .set({
          review: review,
          rating: rating,
          name: name,
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
          alert("Review Not submitted!!");
        });
    } else {
      firebase
        .firestore()
        .collection("reviews")
        .doc(name)
        .collection("negative")
        .doc()
        .set({
          review: review,
          rating: rating,
          name: name,
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
          alert("Review Not submitted!!");
        });
    }
  } else {
    alert("Please submit review again!!");
  }
};

export const passwordReset = (email: string) => {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then((user) => {
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
      alert("Please Sign Up First!!");
    });
};

export const uploadPhotoAsync = async (uri: any, filename: any) => {
  return new Promise(async (res, rej) => {
    const response = await fetch(uri);
    const file = await response.blob();

    let upload = firebase.storage().ref(filename).put(file);

    upload.on(
      "state_changed",
      (snapshot) => {},
      (err) => {
        rej(err);
      },
      async () => {
        const url = await upload.snapshot.ref.getDownloadURL();
        res(url);
      }
    );
  });
};

export const createUser = async (user) => {
  let remoteUri = null;

  try {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);

    let db = firebase.firestore().collection("users").doc(uid);

    db.set({
      name: user.name,
      email: user.email,
      avatar: null,
    });

    if (user.avatar) {
      remoteUri = await uploadPhotoAsync(user.avatar, `avatars/${uid}`);
      db.set({ avatar: remoteUri }, { merge: true });
    }
  } catch (error) {
    alert("Error: ", error);
  }
};

export const updateUser = async (userId: any, username: any, address: any) => {
  // let remoteUri = null;

  try {
    let db = firebase.firestore().collection("users").doc(userId);

    db.set(
      {
        username: username,
        address: address,
      },
      { merge: true }
    );
    alert("Profile updated successfully");

    // if (avatar) {
    //   remoteUri = await uploadPhotoAsync(avatar, `avatars/${userId}`);
    //   db.set({ avatar: remoteUri }, { merge: true });
    // }
    // alert("Profile updated successfully");
  } catch (error) {
    console.log("ERROR: ", error);
  }
};
