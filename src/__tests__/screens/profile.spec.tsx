import React from "react";
import { render } from "@testing-library/react-native";

import { Profile } from "../../screens/Profile";

test("Verifica se o input com placeholder correto está na tela", () => {
  const { debug } = render(<Profile />);

  debug()
});
