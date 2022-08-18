import React from "react";
import { Cards } from "../../components/Cards";
import { TransactionCard } from "../../components/TransactionCard";

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
} from "./styles";

export function Dashboard() {
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
        
        <TransactionCard />
      </Transactions>
    </Container>
  );
}
