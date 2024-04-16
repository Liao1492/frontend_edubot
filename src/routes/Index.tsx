import {
  Stack,
  Flex,
  Text,
  TextInput,
  Textarea,
  UnstyledButton,
} from "@mantine/core";
import MessageContext from "../Components/MessageContext";
import TextFloat from "../Components/TextFloat";
import { useRef, useState } from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";
export interface Message {
  sender: "user" | "bot";
  message: string;
}
const Index = () => {
  const collId = useSelector(
    (state: RootState) => state.collection.selectedCollectionId
  );
  const colleName = useSelector(
    (state: RootState) => state.collection.seletectedCollectioName
  );
  const [sources, setSources] = useState<string[]>([]);
  console.log(sources);
  return (
    <Stack bg={"#fcf2e3"} w={"100%"}>
      <TextFloat name={colleName} />
      <Flex h={"100%"} m={"2rem"} p={"2rem"} gap={"md"}>
        <Stack style={{ flex: 1, overflow: "scroll" }}>
          {/* <Stack pos={"relative"} flex={1}>
            <MessageBlock sender="bot" message={mess} />
          </Stack> */}
          {collId !== null ? (
            <MessageContext collection_id={collId!} setSources={setSources} />
          ) : (
            <Stack h={"100%"} align="center">
              <Text size="xl" fw={700} ta="center">
                Select a Collection in the dashboard to start a chat
              </Text>
            </Stack>
          )}
        </Stack>
        {/* <Stack bg={"#EAF2E1"} p={"2rem"}>
          <Text size="md">Retrieved from: </Text>
        </Stack> */}
      </Flex>
    </Stack>
  );
};

export default Index;
