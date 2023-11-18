import axios, { AxiosResponse } from "axios";

type IPResponse = {
  ip: string;
}

const api = axios.create({
  baseURL: "https://api.ipify.org",
});

export const getIP = (): Promise<string> => {
  return api
    .get<IPResponse>("/?format=json")
    .then((response: AxiosResponse<IPResponse>) => response.data.ip)
    .catch((error: Error) => {
      console.error("Error fetching IP:", error);
      throw error; // Rethrow the error to handle it at a higher level
    });
};
