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
import { setSelectedCollection } from "../store/slices/collectionSlice";
import { RootState } from "../store";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyCollections, createCollection } from "../api/apis";
import { BiSolidBookAdd } from "react-icons/bi";
import ModalAddCollection from "../Components/modals/ModalAddCollection";

const Dashboard = () => {
  const [allCollections, setAllCollections] = useState<CollectionModelSchema[]>(
    []
  );
  const [openModal, setOpenModal] = useState(false);
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
      accessToken!
    );
    console.log(response.data);
    setTimeout(fetchAllCollection, 1000);
  };
  useEffect(() => {
    fetchAllCollection();
  }, []);
  const selectedColl = useSelector(
    (state: RootState) => state.collection.selectedCollectionId
  );
  const dispatch = useDispatch();
  console.log(selectedColl);
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
                    return coll.status !== "ERROR";
                  })
                  .map((coll, i) => {
                    return (
                      <UnstyledButton
                        disabled={coll.status !== "COMPLETE"}
                        key={i}
                        w={"100%"}
                        onClick={() => {
                          dispatch(setSelectedCollection(coll.id));
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
            <Stack></Stack>
            <Stack></Stack>
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
