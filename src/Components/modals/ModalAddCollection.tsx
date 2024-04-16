import React from "react";
import {
  Modal,
  ModalProps,
  Title,
  Text,
  Stack,
  TextInput,
  Button,
  Slider,
  SegmentedControl,
} from "@mantine/core";
import FileUpload from "../FileUpload";

interface IProps extends ModalProps {
  onAddCollection: (title: string, desc: string, file: File) => void;
}
const ModalAddCollection = (props: IProps) => {
  const { onAddCollection, ...modalProps } = props;
  const [file, setFile] = React.useState<File | null>(null);
  const [title, setTile] = React.useState<string>("");
  const [desc, setDesc] = React.useState<string>("");
  const [value, setValue] = React.useState("512");
  const marks = [
    { value: 64, label: "64" },
    { value: 128, label: "128" },
    { value: 256, label: "256" },
    { value: 512, label: "512" },
    { value: 1024, label: "1024" },
    { value: 2048, label: "2048" },
  ];
  return (
    <Modal
      {...modalProps}
      size={"xl"}
      padding={"60px"}
      bg={"blue"}
      radius={"lg"}
      styles={{
        header: { color: "white", background: "rgb(67, 83, 52)" },
        content: { background: "rgb(67, 83, 52)" },
      }}
    >
      <Stack>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onAddCollection(title, desc, file!);
            setTile("");
            setDesc("");
            setFile(null);
          }}
        >
          <Stack gap={"2rem"}>
            <TextInput
              styles={{ input: { padding: 20 } }}
              value={title}
              onChange={(e) => setTile(e.currentTarget.value)}
              radius={"md"}
              placeholder="Collection Name"
              required
              size={"lg"}
            />
            <TextInput
              styles={{ input: { padding: 20 } }}
              radius={"md"}
              value={desc}
              onChange={(e) => setDesc(e.currentTarget.value)}
              placeholder="Description"
              size={"lg"}
            />
            <Stack>
              <Text size="md" c={"white"} fw={700}>
                Chunk Size
              </Text>
              <SegmentedControl
                value={value}
                onChange={setValue}
                data={[
                  { label: "128", value: "128" },

                  { label: "256", value: "256" },
                  { label: "512", value: "512" },
                  { label: "1024", value: "1024" },
                ]}
              />
            </Stack>

            {/* </Stack> */}
            <FileUpload file={file} setFile={setFile} />
            <Stack>
              <Button
                disabled={file === null}
                h={"4rem"}
                color={"#FFEED6"}
                type="submit"
              >
                <Text px={"2rem"} size="md" c={"#435334"} fw={700}>
                  Add Collection
                </Text>
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Modal>
  );
};

export default ModalAddCollection;
