import axios, { AxiosResponse } from "axios";
import {
  CollectionIn,
  CollectionModelSchema,
  CollectionQueryInput,
  CollectionQueryOutput,
} from "../types";

const APP_URL = "http://localhost:8000";

export const createCollection = async (
  collectionData: CollectionIn,
  files: File | null,
  storage: string,
  authToken: string
): Promise<AxiosResponse<CollectionModelSchema>> => {
  const formData = new FormData();
  console.log(collectionData);
  formData.append("title", collectionData.title);
  formData.append("description", collectionData.description);

  if (files !== null) formData.append("files", files);
  formData.append("storage", storage);

  //   if (files) {
  //     for (let i = 0; i < files.length; i++) {
  //       formData.append("files", files[i]);
  //     }
  //   }

  const headers: Record<string, string> = {
    "Content-Type": "multipart/form-data",
    Authorization: authToken,
  };

  return axios.post<CollectionModelSchema>(
    APP_URL + "/api/collections/create",
    formData,
    { headers }
  );
};

export const queryCollection = async (
  queryInput: CollectionQueryInput,
  authToken: string
): Promise<AxiosResponse<CollectionQueryOutput>> => {
  const headers: Record<string, string> = {
    Authorization: authToken,
  };

  return axios.post<CollectionQueryOutput>(
    APP_URL + "/api/collections/query",
    queryInput,
    { headers }
  );
};

export const getMyCollections = async (
  authToken: string
): Promise<AxiosResponse<CollectionModelSchema[]>> => {
  return axios.get<CollectionModelSchema[]>(
    APP_URL + "/api/collections/available",
    {
      headers: {
        Authorization: authToken,
      },
    }
  );
};

export const getDocsGivenCollectionId = async (
  collection_id: string | number,
  authToken: string
) => {
  try {
    const response: AxiosResponse<any> = await axios.get(
      `${APP_URL}/api/collections/get/${collection_id}`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Adds a file to a collection using the Chat-All-The-Docs API.
 * @param collectionId The ID of the collection to add the file to.
 * @param file The file to add to the collection.
 * @returns The API response data.
 */
export const addFileToCollection = async (
  collectionId: number,
  file: File,
  authToken: string
): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("description", "A test file");

  try {
    const response: AxiosResponse<any> = await axios.post(
      `${APP_URL}/api/collections/${collectionId}/add_file`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: authToken,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
