import React from "react";
import { Box } from "../../components/Theme";
import { Text } from "../../components";
import { DataPoint } from "./Graph";
import moment from "moment";

interface TransactionProps {
  transaction: DataPoint;
}

const Transaction = ({ transaction }: TransactionProps) => {
  return (
    <Box
      marginTop="l"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Box flexDirection="row" alignItems="center" marginBottom="s">
          <Box
            backgroundColor={transaction.color}
            marginRight="s"
            style={{ width: 10, height: 10, borderRadius: 5 }}
          />
          <Text variant="title5">{`#${transaction.id}`}</Text>
        </Box>
        <Text color="darkGrey">{`₹${transaction.value} - ${moment(
          transaction.date
        ).format("DD MMMM, YYYY")}`}</Text>
      </Box>
      <Box>
        <Text color="secondary" variant="button">
          See more
        </Text>
      </Box>
    </Box>
  );
};

export default Transaction;
