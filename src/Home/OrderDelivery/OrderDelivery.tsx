import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, Pressable, LogBox } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { COLORS, SIZES, icons, GOOGLE_API_KEY } from "../../constants";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { HomeNavigationProps } from "../../components/Navigation";

LogBox.ignoreLogs([
  "Failed prop type: The prop `coordinate` is marked as required in `Map Marker`, but its value is `null`", // TODO: Remove when fixed
]);

const initialCurrentLocation: any = {
  streetName: "Kuching",
  gps: {
    latitude: 1.5496614931250685,
    longitude: 110.36381866919922,
  },
};

const OrderDelivery = ({
  route,
  navigation,
}: HomeNavigationProps<"OrderDelivery">) => {
  const mapView: any = useRef();
  // console.log("CONTEXT>>>", order);

  const [restaurant, setRestaurant] = useState(null);
  const [streetName, setStreetName] = useState("");
  const [fromLocation, setFromLocation]: any = useState(null);
  const [toLocation, setToLocation]: any = useState(null);
  const [region, setRegion]: any = useState(null);

  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [angle, setAngle] = useState(0);

  const [currentLocation, setCurrentLocation] = useState(
    initialCurrentLocation
  );

  const [status, setStatus] = useState({});
  const [location, setLocation]: any = useState({});

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status != "granted") {
        console.log("PERMISSION NOT GRANTED!");
        setStatus({
          errorMessage: "PERMISSION NOT GRANTED!",
        });
      }

      const userLocation = await Location.getCurrentPositionAsync();
      setLocation(userLocation.coords);
      console.log("LIVE LOCATION>>", userLocation.coords);
    };

    const { restaurant }: any = route.params;

    console.log("RESTAURANT>>", restaurant);
    // console.log("CURRENT>>", currentLocation);

    let fromLoc = currentLocation.gps;
    let toLoc = restaurant.location;
    let street = currentLocation.streetName;

    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    };

    setRestaurant(restaurant);
    setStreetName(street);
    setFromLocation(fromLoc);
    setToLocation(toLoc);
    setRegion(mapRegion);
    getLocation();
    // console.log("USER LOCATION>>", location);
  }, []);

  const calculateAngle = (coordinates: any) => {
    let startLat = coordinates[0]["latitude"];
    let startLng = coordinates[0]["longitude"];
    let endLat = coordinates[1]["latitude"];
    let endLng = coordinates[1]["longitude"];
    let dx = endLat - startLat;
    let dy = endLng - startLng;

    return (Math.atan2(dy, dx) * 180) / Math.PI;
  };

  const zoomIn = () => {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };
    setRegion(newRegion);
    mapView.current.animateToRegion(newRegion, 200);
  };

  const zoomOut = () => {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    };
    setRegion(newRegion);
    mapView.current.animateToRegion(newRegion, 200);
  };

  const renderMap = () => {
    // console.log("TO>>", toLocation?.latitude);
    // console.log("FROM>>", fromLocation?.latitude);

    const destinationMarker = () => (
      <Marker
        coordinate={{
          // toLocation
          latitude: toLocation?.latitude,
          longitude: toLocation?.longitude,
        }}
      >
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.white,
          }}
        >
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.primary,
            }}
          >
            <Image
              source={icons.pin}
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.white,
              }}
            />
          </View>
        </View>
      </Marker>
    );

    const carIcon = () => (
      <Marker
        coordinate={{
          // fromLocation
          latitude: fromLocation?.latitude,
          longitude: fromLocation?.longitude,
        }}
        anchor={{ x: 0.5, y: 0.5 }}
        flat={true}
        rotation={angle}
      >
        <Image
          source={icons.car}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </Marker>
    );

    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapView}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          style={{ flex: 1 }}
        >
          <MapViewDirections
            origin={fromLocation}
            destination={toLocation}
            apikey={GOOGLE_API_KEY}
            strokeWidth={5}
            strokeColor={COLORS.primary}
            optimizeWaypoints={true}
            onReady={(result) => {
              setDuration(result.duration);

              if (!isReady) {
                //Fit route into maps
                mapView.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: SIZES.padding / 20,
                    bottom: SIZES.height / 4,
                    left: SIZES.width / 20,
                    top: SIZES.height / 8,
                  },
                });

                //Reposition the car
                let nextLoc = {
                  latitude: result.coordinates[0]["latitude"],
                  longitude: result.coordinates[0]["longitude"],
                };

                if (result.coordinates.length >= 2) {
                  let angle = calculateAngle(result.coordinates);
                  setAngle(angle);
                }

                setFromLocation(nextLoc);
                setIsReady(true);
              }
            }}
          />
          {destinationMarker()}
          {carIcon()}
        </MapView>
      </View>
    );
  };

  const renderDestinationHeader = () => {
    return (
      <View
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}
        >
          <Image
            source={icons.red_pin}
            style={{
              width: 30,
              height: 30,
              marginRight: SIZES.padding,
            }}
          />

          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, lineHeight: 22 }}>{streetName}</Text>
          </View>

          <Text style={{ fontSize: 16, lineHeight: 22 }}>
            {Math.ceil(duration)} mins
          </Text>
        </View>
      </View>
    );
  };

  const renderDeliveryInfo = () => {
    return (
      <View
        style={{
          position: "absolute",
          bottom: 30,
          left: 0,
          right: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={restaurant?.courier.avatar}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
              }}
            />

            <View style={{ flex: 1, marginLeft: SIZES.padding }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 18, lineHeight: 22, fontWeight: "bold" }}
                >
                  {restaurant?.courier.name}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={icons.star}
                    style={{
                      width: 18,
                      height: 18,
                      tintColor: COLORS.primary,
                      marginRight: SIZES.padding,
                    }}
                  />
                  <Text style={{ fontSize: 16, lineHeight: 22 }}>
                    {restaurant?.rating}
                  </Text>
                </View>
              </View>
              <Text
                style={{ color: COLORS.darkgray, fontSize: 14, lineHeight: 22 }}
              >
                {restaurant?.name}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.padding * 2,
              justifyContent: "space-between",
            }}
          >
            <Pressable
              style={{
                height: 50,
                flex: 1,
                marginRight: 10,
                backgroundColor: COLORS.primary,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
              onPress={() => true}
            >
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 22,
                  fontWeight: "bold",
                  color: COLORS.white,
                }}
              >
                Call
              </Text>
            </Pressable>

            <Pressable
              style={{
                height: 50,
                flex: 1,
                backgroundColor: COLORS.secondary,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 22,
                  fontWeight: "bold",
                  color: COLORS.white,
                }}
              >
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  const renderButtons = () => {
    return (
      <View
        style={{
          position: "absolute",
          bottom: SIZES.height * 0.35,
          right: SIZES.padding * 2,
          width: 60,
          height: 130,
          justifyContent: "space-between",
        }}
      >
        <Pressable
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.white,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => zoomIn()}
        >
          <Text style={{ fontSize: 30, lineHeight: 36 }}>+</Text>
        </Pressable>

        <Pressable
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.white,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => zoomOut()}
        >
          <Text style={{ fontSize: 30, lineHeight: 36 }}>-</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {renderMap()}
      {renderDestinationHeader()}
      {renderDeliveryInfo()}
      {renderButtons()}
    </View>
  );
};

export default OrderDelivery;
