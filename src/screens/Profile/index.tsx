import React from "react";
import { View, Text, TextInput, Button } from "react-native";

export function Profile() {
  return (
    <View>
      <Text>Perfil de Usuário</Text>

      <TextInput placeholder="Nome" autoCorrect={false} />
      <TextInput placeholder="Email" />

      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
}
