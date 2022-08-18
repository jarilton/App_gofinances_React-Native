import React from "react";
import { Cards } from "../../components/Cards";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

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
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign"
      },
      date: "13/12/2030"
    },
    {
      id: "2",
      type: "negative",
      title: "Hamburguer Pizzy",
      amount: "R$ 59,90",
      category: {
        name: "Alimentação",
        icon: "coffee"
      },
      date: "18/12/2022"
    },
    {
      id: "3",
      type: "negative",
      title: "Aluguel do apartamento",
      amount: "R$ 1.200,00",
      category: {
        name: "Casa",
        icon: "shopping-bag"
      },
      date: "10/10/2025"
    }
  ]
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/59670578?v=4",
              }}
            />
            <User>
              <UserGreting>Olá,</UserGreting>
              <UserName>Jamal</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <CardsGroup>
        <Cards
          type="up"
          title="Entrada"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <Cards
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <Cards
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
      </CardsGroup>

      <Transactions>
        <Title>Listagem</Title>

        <ListTransactions
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
