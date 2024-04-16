import React from "react";
import { Stack, Text } from "@mantine/core";

const TextFloat = ({ name }: { name: string | null }) => {
  return (
    <Stack
      m={"2rem"}
      p={"2rem"}
      bg={"#FFEED6"}
      style={{ borderRadius: "16px", border: "1px solid #D6BC97" }}
    >
      <Text size="sm" fw={700} ta={"center"}>
        {name}
        {/* Extending LLM capabilities with Private Knowlegeds using Vector Database */}
      </Text>
    </Stack>
  );
};

export default TextFloat;
