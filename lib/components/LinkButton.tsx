import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useLinkProps } from "@react-navigation/native";

type LinkButtonProps = {
  style: any;
  id: string;
  children: React.ReactNode;
};

const LinkButton: React.FC<LinkButtonProps> = ({ style, id, children }) => {
  const { onPress } = useLinkProps({
    to: { screen: "Details", params: { id: id } },
  });
  return (
    <TouchableOpacity onPress={() => onPress()} style={style}>
      {children}
    </TouchableOpacity>
  );
};

export default LinkButton;
