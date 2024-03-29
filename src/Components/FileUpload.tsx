import { useState } from "react";
import { Stack, UnstyledButton, Text } from "@mantine/core";
interface IProps {
  file: File | null;
  setFile: (file: File | null) => void;
}
const FileUpload = ({ file, setFile }: IProps) => {
  // const [file, setFile] = useState<File | null>(null);
  return (
    <Stack
      align="center"
      bg={file ? "rgb(57, 70, 44)" : "inherit"}
      style={{ border: "1px dashed white", padding: "2rem", height: "12rem" }}
    >
      {!file ? (
        <>
          <Text size="md" c="white">
            Choose a file to upload
          </Text>
          <UnstyledButton>
            <label htmlFor="file-upload" className="custom-file-upload">
              Browse Files
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={(e) => {
                if (!e.target.files) return;
                setFile(e.target.files[0]);
              }}
            />
          </UnstyledButton>
        </>
      ) : (
        <Stack pos={"relative"} w={"100%"} h={"100%"} align="center">
          <div style={{ position: "absolute", top: "-10px", right: "-10px" }}>
            <UnstyledButton onClick={() => setFile(null)}>
              <Text size="sm" c="white">
                X
              </Text>
            </UnstyledButton>
          </div>
          <div
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
              wordBreak: "break-all",
            }}
          >
            <Text size="md" c={"white"} ta={"center"}>
              {file.name}
            </Text>
          </div>
        </Stack>
      )}
    </Stack>
  );
};

export default FileUpload;
