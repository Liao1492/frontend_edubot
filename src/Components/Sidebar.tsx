import {
  Divider,
  Stack,
  Title,
  SegmentedControl,
  Text,
  Button,
  Tooltip,
} from "@mantine/core";
import { getDocsGivenCollectionId, addFileToCollection } from "../api/apis";
import FileUpload from "./FileUpload";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CollectionModelSchema } from "../types";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [collectionInfo, setCollectionInfo] = useState<CollectionModelSchema>();
  const [file, setFile] = useState<File | null>(null);

  const selectedColl = useSelector(
    (state: RootState) => state.collection.selectedCollectionId
  );
  const navigate = useNavigate();
  const fetchCollectionInfo = async (
    collectionId: string | number,
    accessToken: string
  ) => {
    const response = await getDocsGivenCollectionId(collectionId, accessToken);
    setCollectionInfo(response);
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("eduAccessToken");
    if (!selectedColl || !accessToken) return;
    fetchCollectionInfo(selectedColl!, accessToken!);
  }, []);
  const handleUpload = async () => {
    if (!selectedColl || !file) return;
    const accessToken = localStorage.getItem("eduAccessToken");
    try {
      const response = await addFileToCollection(
        selectedColl,
        file!,
        accessToken!
      );
      setFile(null);
      setTimeout(() => {
        fetchCollectionInfo(selectedColl!, accessToken!);
      }, 1000);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Stack w={"35rem"} bg={"#435334"} align="center" c={"white"}>
      <Title my={"2rem"} order={4}>
        Edu Bot
      </Title>
      <Divider style={{ borderColor: "black" }} w={"100%"} />
      {/* <SegmentedControl
        m={"2rem"}
        p={"0.5rem"}
        style={{ width: "80%" }}
        data={["Mongo", "VectorDB"]}
        transitionDuration={200}
        transitionTimingFunction="linear"
      /> */}
      <div style={{ paddingInline: "2rem", width: "100%" }}>
        <Button
          h={"5.6rem"}
          variant="filled"
          onClick={() => {
            navigate("/dashboard");
          }}
          color={"#FFEED6"}
          w={"100%"}
        >
          <Text px={"2rem"} size="md" c={"#435334"} fw={700}>
            Go To Dashboard
          </Text>
        </Button>
      </div>
      <Stack
        m={"2rem"}
        bg={"#39462C"}
        style={{ borderRadius: "1.6rem", flex: 1, overflow: "scroll" }}
        w={"calc(100% - 4rem)"}
      >
        <Text size="md" fw={700} ta={"center"} mt={"1rem"}>
          Uploaded File
        </Text>
        <Stack h={"100%"} style={{ overflow: "scroll" }}>
          {collectionInfo &&
            collectionInfo.document_names.map((doc) => {
              doc.indexOf("/") !== -1 && (doc = doc.split("/")[1]);
              let text = doc;
              if (text.length > 20) text = text.slice(0, 17) + "...";
              return (
                <Tooltip label={doc} key={doc}>
                  <Text ta={"center"}>{text}</Text>
                </Tooltip>
              );
            })}
        </Stack>
      </Stack>
      <Stack w={"100%"} p={"xl"}>
        <FileUpload file={file} setFile={setFile} />
        <Button
          disabled={file === null}
          h={"5.6rem"}
          variant="filled"
          onClick={handleUpload}
          color={"#FFEED6"}
          w={"100%"}
        >
          <Text px={"2rem"} size="md" c={"#435334"} fw={700}>
            Upload
          </Text>
        </Button>
      </Stack>
    </Stack>
  );
};

export default Sidebar;
