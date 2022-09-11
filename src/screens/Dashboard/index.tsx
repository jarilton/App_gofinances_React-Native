import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";

import { Cards } from "../../components/Cards";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreting,
  UserName,
  Icon,
  CardsGroup,
  Transactions,
  Title,
  ListTransactions,
  LoadContainer,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface GroupCardProps {
  amount: string;
  lastTransaction: string;
}

interface GroupCardData {
  entries: GroupCardProps;
  expensives: GroupCardProps;
  total: GroupCardProps;
}

export function Dashboard() {
  const [isLoading, setISLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [groupCardData, setGroupCardData] = useState<GroupCardData>(
    {} as GroupCardData
  );
  const theme = useTheme();
  const { signOut, user } = useAuth();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "positive" | "negative"
  ) {
    const lastTransactions = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    );

    return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString(
      "pt-BR",
      { month: "long" }
    )}`;
  }

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );

    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      "positive"
    );
    const lastTransactionExpensives = getLastTransactionDate(
      transactions,
      "negative"
    );
    const totalInterval = `01 a ${lastTransactionExpensives}`;

    const total = entriesTotal - expensiveTotal;

    setGroupCardData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpensives}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });

    setISLoading(false);
  }

  useEffect(() => {
    loadTransactions();

    //const dataKey = "@gofinances:transactions";
    //AsyncStorage.removeItem(dataKey);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.secondary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreting>Olá,</UserGreting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>

              <Icon 
                name="power" 
                onPress={signOut} 
              />
            </UserWrapper>
          </Header>

          <CardsGroup>
            <Cards
              type="up"
              title="Entrada"
              amount={groupCardData.entries.amount}
              lastTransaction={groupCardData.entries.lastTransaction}
            />
            <Cards
              type="down"
              title="Saídas"
              amount={groupCardData.expensives.amount}
              lastTransaction={groupCardData.expensives.lastTransaction}
            />
            <Cards
              type="total"
              title="Total"
              amount={groupCardData.total.amount}
              lastTransaction={groupCardData.total.lastTransaction}
            />
          </CardsGroup>

          <Transactions>
            <Title>Listagem</Title>

            <ListTransactions
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
