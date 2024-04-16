import {
  Stack,
  Title,
  Flex,
  Text,
  UnstyledButton,
  Tooltip,
} from "@mantine/core";
import { CollectionModelSchema } from "../types";
import { useEffect, useState } from "react";
import {
  setSelectedCollection,
  setModel,
  setStorage,
  setSelectedCollectionName,
} from "../store/slices/collectionSlice";
import { RootState } from "../store";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyCollections, createCollection } from "../api/apis";
import { BiSolidBookAdd } from "react-icons/bi";
import ModalAddCollection from "../Components/modals/ModalAddCollection";

const openAiModels = [
  {
    name: "gpt-4-0613",
    desc: "Snapshot of gpt-4 from June 13th 2023 with improved function calling support.",
  },
  {
    name: "gpt-3.5-turbo-0125",
    desc: "The latest GPT-3.5 Turbo model with higher accuracy at responding in requested formats and a fix for a bug which caused a text encoding issue for non-English language function calls. Returns a maximum of 4,096 output tokens.",
  },
  {
    name: "gpt-3.5-turbo-instruct",
    desc: "Efficient Instruction Following: The primary strength of GPT-3.5-turbo-instruct lies in its ability to follow instructions with precision and efficiency. Whether needed to complete a specific task, answer questions, or perform text-based functions, the model excels at promptly executing commands",
  },
];

const allStorage = [
  { name: "ChromaDB", desc: "Self-Hosted" },
  { name: "DuckDB", desc: "In-Memory" },
  { name: "Milvus", desc: "Cloud Solution" },
];
const Dashboard = () => {
  const [allCollections, setAllCollections] = useState<CollectionModelSchema[]>(
    []
  );
  const storageSelection = useSelector(
    (root: RootState) => root.collection.storageSelection
  );
  const [openModal, setOpenModal] = useState(false);
  const selectedModel = useSelector(
    (state: RootState) => state.collection.modelSelection
  );
  const fetchAllCollection = async () => {
    const accessToken = localStorage.getItem("eduAccessToken");
    const response = await getMyCollections(accessToken!);
    console.log(response.data);
    setAllCollections(response.data);
  };
  const createColl = async (title: string, desc: string, file: File) => {
    const accessToken = localStorage.getItem("eduAccessToken");
    const response = await createCollection(
      { title: title, description: desc },
      file,
      storageSelection,
      accessToken!
    );
    console.log(response.data);
    setTimeout(fetchAllCollection, 3000);
  };
  useEffect(() => {
    fetchAllCollection();
  }, []);
  const selectedColl = useSelector(
    (state: RootState) => state.collection.selectedCollectionId
  );
  const dispatch = useDispatch();
  console.log(selectedModel);
  return (
    <Stack bg={"rgb(234, 242, 225)"} w={"100%"} h={"100%"} p="2rem">
      <Flex justify={"space-between"} align={"center"}>
        <Title order={4}>Dashboard</Title>
        <Link
          to={"/"}
          //   onClick={() => }
          //   bg={"rgb(67, 83, 52)"}
          style={{
            borderRadius: "1.6rem",
            padding: "1rem",
            backgroundColor: "rgb(67, 83, 52)",
            textDecoration: "none",
          }}
        >
          <Text size="md" fw={700} c={"white"}>
            Go Back To Chat
          </Text>
        </Link>
      </Flex>
      <Stack p={"2rem"} h={"100%"}>
        <Flex gap={"1.6rem"} h={"100%"}>
          <Stack
            p={"2rem"}
            bg={"white"}
            style={{ borderRadius: "1.6rem" }}
            flex={1}
            h={"100%"}
          >
            <Flex justify={"space-between"} align={"flex-end"}>
              <Text size="xl" fw={700}>
                Collections
              </Text>
              <UnstyledButton
                onClick={() => {
                  setOpenModal(true);
                }}
                bg={"rgb(67, 83, 52)"}
                style={{ borderRadius: "1.6rem", padding: "1rem" }}
              >
                <Flex align={"center"} gap={"md"}>
                  <Text size="lg" fw={700} c={"white"}>
                    Add Collection
                  </Text>
                  <BiSolidBookAdd size={25} fill="white" />
                </Flex>
              </UnstyledButton>
            </Flex>
            <Stack flex={1} pos={"relative"}>
              <Stack
                pos={"absolute"}
                h={"100%"}
                gap={"2rem"}
                w={"100%"}
                style={{ overflow: "scroll", top: "0", left: "0" }}
              >
                {allCollections
                  .filter((coll) => {
                    return (
                      coll.status !== "ERROR" &&
                      coll.db_storage === storageSelection
                    );
                  })
                  .map((coll, i) => {
                    return (
                      <UnstyledButton
                        disabled={coll.status !== "COMPLETE"}
                        key={i}
                        w={"100%"}
                        onClick={() => {
                          dispatch(setSelectedCollection(coll.id));
                          dispatch(setSelectedCollectionName(coll.title));
                        }}
                      >
                        <Stack
                          w="100%"
                          p={"xl"}
                          bg={
                            selectedColl === coll.id
                              ? "rgb(234, 242, 225)"
                              : "whitesmoke"
                          }
                          style={{
                            borderRadius: "1.6rem",
                            border: "1px solid #D6BC97",
                          }}
                        >
                          <Tooltip
                            label={
                              coll.status === "COMPLETE"
                                ? `Creation Date: ${new Date(
                                    coll.created
                                  ).toLocaleDateString()} `
                                : "Processing..."
                            }
                          >
                            <Text size="md">{coll.title}</Text>
                          </Tooltip>
                        </Stack>
                      </UnstyledButton>
                    );
                  })}
              </Stack>
            </Stack>
          </Stack>
          <Stack flex={1}>
            <Stack
              style={{ borderRadius: "1.6rem" }}
              bg={"white"}
              flex={1}
              p="2rem"
            >
              <Text size="xl" fw={700}>
                LLM Models
              </Text>
              <Stack flex={1} pos={"relative"}>
                <Stack
                  pos={"absolute"}
                  h={"100%"}
                  gap={"2rem"}
                  w={"100%"}
                  style={{ overflow: "scroll", top: "0", left: "0" }}
                >
                  {openAiModels.map((model, i) => {
                    return (
                      <UnstyledButton
                        key={i}
                        w={"100%"}
                        onClick={() => {
                          dispatch(setModel(model.name));
                        }}
                      >
                        <Stack
                          w="100%"
                          p={"xl"}
                          bg={
                            selectedModel === model.name
                              ? "rgb(234, 242, 225)"
                              : "whitesmoke"
                          }
                          style={{
                            borderRadius: "1.6rem",
                            border: "1px solid #D6BC97",
                          }}
                        >
                          <Tooltip label={model.desc} multiline w={"50%"}>
                            <Text size="md">{model.name}</Text>
                          </Tooltip>
                        </Stack>
                      </UnstyledButton>
                    );
                  })}
                </Stack>
              </Stack>
            </Stack>
            <Stack
              style={{ borderRadius: "1.6rem" }}
              bg={"white"}
              flex={1}
              p="2rem"
            >
              <Text size="xl" fw={700}>
                Storage Option
              </Text>
              <Stack flex={1} pos={"relative"}>
                <Stack
                  pos={"absolute"}
                  h={"100%"}
                  gap={"2rem"}
                  w={"100%"}
                  style={{ overflow: "scroll", top: "0", left: "0" }}
                >
                  {allStorage.map((s, i) => {
                    const storage = s.name.toLocaleLowerCase();
                    return (
                      <UnstyledButton
                        key={i}
                        w={"100%"}
                        onClick={() => {
                          dispatch(
                            setStorage(
                              storage.toLocaleLowerCase() as
                                | "chromadb"
                                | "duckdb"
                                | "milvus"
                            )
                          );
                        }}
                      >
                        <Stack
                          w="100%"
                          p={"xl"}
                          bg={
                            storageSelection === storage
                              ? "rgb(234, 242, 225)"
                              : "whitesmoke"
                          }
                          style={{
                            borderRadius: "1.6rem",
                            border: "1px solid #D6BC97",
                          }}
                        >
                          <Tooltip label={s.desc} multiline>
                            <Text size="md">{s.name}</Text>
                          </Tooltip>

                          {/* <Text size="md">{model.name}</Text> */}
                        </Stack>
                      </UnstyledButton>
                    );
                  })}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
      <ModalAddCollection
        title={
          <Text size="xl" fw={700}>
            Add Collection
          </Text>
        }
        opened={openModal}
        centered
        onClose={() => {
          setOpenModal(false);
        }}
        onAddCollection={(title, desc, file) => {
          console.log(title, desc);
          createColl(title, desc, file);
          setOpenModal(false);
        }}
      />
    </Stack>
  );
};

export default Dashboard;
