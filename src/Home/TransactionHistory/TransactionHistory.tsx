import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet } from "react-native";
import { Box, makeStyles, Theme } from "../../components/Theme";
import { Text, Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import Graph, { DataPoint } from "./Graph";
import Transaction from "./Transaction";
import TopCurve from "./TopCurve";

const footerHeight = Dimensions.get("window").width / 5;
const startDate = new Date("2019-09-01").getTime();
const numberOfMonths = 6;

const data: DataPoint[] = [
  {
    date: new Date("2019-10-02").getTime(),
    value: 139.42,
    color: "primary",
    id: 245672,
  },
  {
    date: new Date("2019-11-01").getTime(),
    value: 281.23,
    color: "orange",
    id: 245673,
  },
  {
    date: new Date("2020-02-15").getTime(),
    value: 198.54,
    color: "pink",
    id: 245674,
  },
];

const TransactionHistory = ({
  navigation,
}: HomeNavigationProps<"TransactionHistory">) => {
  const styles = useStyles();
  return (
    <Box flex={1} backgroundColor="white">
      <Header
        title="Transaction History"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{ icon: "external-link", onPress: () => true }}
      />
      <Box padding="m" flex={1}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Box>
            <Text variant="header" color="secondary" opacity={0.3}>
              TOTAL SPENT
            </Text>
            <Text variant="title1">$1,815</Text>
          </Box>
          <Box backgroundColor="primaryLight" borderRadius="m" padding="m">
            <Text color="primary">All Time</Text>
          </Box>
        </Box>
        <Graph
          data={data}
          startDate={startDate}
          numberOfMonths={numberOfMonths}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
        >
          {data.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </ScrollView>
      </Box>
      {/* <TopCurve {...{ footerHeight }} />
      <Box
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        height={footerHeight}
      >
        <Image
          source={require("../../components/assets/patterns/2.jpg")}
          style={styles.footer}
        />
      </Box> */}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: theme.borderRadii.xl,
  },
  scrollView: {
    paddingBottom: footerHeight,
  },
}));

export default TransactionHistory;
