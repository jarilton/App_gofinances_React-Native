import React from "react";

import {
  Container,
  Header,
  Title,
  Icon,
  Amount,
  LastTransaction,
} from "./styles";

interface Props {
  type: "up" | "down" | "total";
  title: string;
  amount: string;
  lastTransaction: string;
}

const icon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
}

export function Cards({ type, title, amount, lastTransaction }: Props) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>
          {title}
        </Title>
        <Icon
          name={icon[type]}
          type={type}
        />
      </Header>

      <Amount type={type}>
        {amount}
      </Amount>
      <LastTransaction type={type}>
        {lastTransaction}
      </LastTransaction>
    </Container>
  );
}
