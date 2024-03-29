import React from "react";
import { Text, Flex, Stack } from "@mantine/core";

interface IProps {
  sender: "user" | "bot";
  message?: string;
}

const MessageBlock = ({ sender, message }: IProps) => {
  return (
    <Flex gap={"1rem"} justify={"flex-start"}>
      <div
        style={{
          height: "fit-content",
          backgroundColor: "#435334",
          padding: "5px 10px",
          borderRadius: "50%",
        }}
      >
        <Text size="xs" fw={700} c={"white"}>
          {sender === "bot" ? "B" : "Y"}
        </Text>
      </div>
      <Stack>
        <Text size="md" fw={700}>
          {sender === "bot" ? "EduBot" : "You"} :
        </Text>
        {!!message ? (
          <Text size="md">{message}</Text>
        ) : (
          <div className="is-typing">
            <div className="jump1"></div>
            <div className="jump2"></div>
            <div className="jump3"></div>
            {/* <div className="jump4"></div>
            <div className="jump5"></div> */}
          </div>
        )}
      </Stack>
    </Flex>
  );
};

export default MessageBlock;
