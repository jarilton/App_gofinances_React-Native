import React from "react";
import { Cards } from "../../components/Cards";

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
        <Cards />
        <Cards />
        <Cards />
      </CardsGroup>
    </Container>
  );
}
