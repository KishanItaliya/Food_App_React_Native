import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export interface AuthNavigationProps<
  RouteName extends keyof AuthenticationRoutes
> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthenticationRoutes, RouteName>,
    DrawerNavigationProp<AppRoutes, "Home">
  >;
  route: RouteProp<AuthenticationRoutes, RouteName>;
}

export interface HomeNavigationProps<RouteName extends keyof HomeRoutes> {
  navigation: DrawerNavigationProp<HomeRoutes, RouteName>;
  route: RouteProp<HomeRoutes, RouteName>;
}

// export interface HomeStackNavigationProps<
//   RouteName extends keyof HomeStackRoutes
// > {
//   navigation: StackNavigationProp<HomeStackRoutes, RouteName>;
//   route: RouteProp<HomeStackRoutes, RouteName>;
// }

export type AppRoutes = {
  Authentication: undefined;
  Home: undefined;
};

export type AuthenticationRoutes = {
  Onboarding: undefined;
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  PasswordChanged: undefined;
  Loading: undefined;
};

export type HomeRoutes = {
  Home: undefined;
  FoodItems: undefined;
  Restaurant: undefined;
  ReviewScreen: undefined;
  Reviews: undefined;
  OrderDelivery: undefined;
  TransactionHistory: undefined;
  Cart: undefined;
  SearchScreen: undefined;
  FoodItemsTabNavigator: undefined;
  Setting: undefined;
  ExploreScreen: undefined;
  ClassifyReviewTabNavigator: undefined;
  ItemDetails: undefined;
  OutfitIdeas: undefined;
  FavoriteOutfits: undefined;
};

// export type HomeStackRoutes = {
//   ExploreScreen: undefined;
//   ClassifyReviewTabNavigator: undefined;
// };
