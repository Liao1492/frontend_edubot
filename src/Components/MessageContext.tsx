import { useRef, useState, useEffect } from "react";
import MessageBlock from "./MessageBlock";
import { Message } from "../routes/Index";
import {
  LoadingOverlay,
  Stack,
  Text,
  Flex,
  UnstyledButton,
  Textarea,
} from "@mantine/core";
import { IoIosSend } from "react-icons/io";
function extractResponseAndSources(text: string) {
  // Split the text at the "## Response" marker.
  // This will create an array with 2 elements: text before "## Response" and text after it.
  const responseSplit = text.split("## Response");

  // Further split the second part of the array by the "## Sources" marker.
  // This will separate the response from the sources.
  const sourceSplit = responseSplit[1].split("## Sources");

  // The first part of the sourceSplit array is the response, and the second part is the sources.
  // Trim both to remove any leading/trailing whitespace.
  const response = sourceSplit[0].trim();
  const sources = sourceSplit[1].trim();

  return {
    response,
    sources,
  };
}
function extractTextBetweenParentheses(str: string) {
  // Regular expression to match text between parentheses
  const regex = /\(([^)]+)\)/g;

  // Use match() to find matches
  const matches = str.match(regex);

  if (matches) {
    // Remove the parentheses from the matches and return the result
    return matches.map((match) => match.slice(1, -1));
  } else {
    // Return an empty array if no matches are found
    return [];
  }
}

interface IProps {
  setSources: (sources: string[]) => void;
  collection_id: number;
}
const MessageContext = ({ setSources, collection_id }: IProps) => {
  const websocket = useRef<WebSocket | null>(null);
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const [connecting, setConnecting] = useState(true);
  const [awaitingMessage, setAwaitingMessage] = useState(false);

  const textRef = useRef<HTMLTextAreaElement>(null);
  const setupWebsocket = () => {
    const authToken = localStorage.getItem("eduAccessToken");
    setConnecting(true);

    websocket.current = new WebSocket(
      `ws://localhost:8000/ws/collections/${collection_id}/query/?token=${authToken}`
    );

    websocket.current.onopen = (event) => {
      setError(false);
      setConnecting(false);
      setAwaitingMessage(false);

      console.log("WebSocket connected:", event);
    };

    websocket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("WebSocket message received:", data);
      setAwaitingMessage(false);
      //   const prevMess = [...messages];

      if (data.response) {
        // Update the messages state with the new message from the server
        // prevMess.pop();
        console.log(data.response);
        const { response, sources } = extractResponseAndSources(data.response);
        const extractedSources = extractTextBetweenParentheses(sources);
        setSources(extractedSources);
        setMessages((prev) => [
          ...prev.slice(0, prev.length - 1),
          { sender: "bot", message: response },
        ]);
      } else {
        setMessages((prev) => [
          ...prev.slice(0, prev.length - 1),
          { sender: "bot", message: "Error" },
        ]);
      }
    };

    websocket.current.onclose = (event) => {
      if (event.code === 4000) {
        setError(true);
        setConnecting(false);
        setAwaitingMessage(false);
      }
      console.log("WebSocket closed:", event);
    };

    websocket.current.onerror = (event) => {
      setError(true);
      setConnecting(false);
      setAwaitingMessage(false);

      console.error("WebSocket error:", event);
    };

    return () => {
      websocket.current?.close();
    };
  };
  useEffect(() => {
    setupWebsocket();
    setMessages([]);
  }, []);

  return (
    <>
      <Stack
        pos={"relative"}
        style={{ overflow: "scroll" }}
        flex={1}
        mb={"40px"}
      >
        <Stack
          style={{
            overflowY: "scroll",
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <Text size="sm">{error ? "Disconnected" : "Connected"}</Text>
          <LoadingOverlay
            bg={"rgb(252, 242, 227)"}
            visible={connecting}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 5, bg: "rgb(252, 242, 227)" }}
          />
          {messages.map((mes) => {
            return <MessageBlock sender={mes.sender} message={mes.message} />;
          })}
        </Stack>
      </Stack>
      <Flex>
        <Flex
          flex={1}
          bg={"#FFEED6"}
          p={"md"}
          align={"flex-end"}
          style={{
            borderRadius: "10px",
            border: "1px solid #D6BC97",
          }}
        >
          <Textarea
            ref={textRef}
            w={"100%"}
            minRows={1}
            variant="unstyled"
            autosize
            maxRows={4}
            placeholder="Enter your message"
          />
          <UnstyledButton>
            <Flex
              align={"flex-end"}
              justify={"flex-end"}
              p={10}
              bg={"#435334"}
              style={{ borderRadius: "20px" }}
              onClick={() => {
                const msg = textRef.current!.value;
                console.log(msg);
                setMessages((prev) => [
                  ...prev,
                  { sender: "user", message: msg },
                  { sender: "bot", message: "" },
                ]);
                websocket.current?.send(
                  JSON.stringify({ query: textRef.current?.value || "" })
                );
                textRef.current!.value = "";
              }}
            >
              <IoIosSend size={20} color="white" />
            </Flex>
          </UnstyledButton>
        </Flex>
      </Flex>
    </>
  );
};

export default MessageContext;
