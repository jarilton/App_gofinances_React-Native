import React from "react";

import {
  Container,
  Header,
  Title,
  Icon,
  Amount,
  LastTransaction,
} from "./styles";

export function Cards() {
  return (
    <Container>
      <Header>
        <Title>Entrada</Title>
        <Icon name="arrow-up-circle" />
      </Header>

      <Amount>R$ 17.400,00</Amount>
      <LastTransaction>Última entrada dia 13 de abril</LastTransaction>
    </Container>
  );
}
