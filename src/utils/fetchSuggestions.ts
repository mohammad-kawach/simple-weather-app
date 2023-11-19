import axios, { AxiosRequestConfig } from "axios";

export default async function fetchSuggestions(city: string) {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `https://weatherapi-com.p.rapidapi.com/search.json?q=${city}`,
    headers: {
      "X-RapidAPI-Key": "9fc870cc62msh3e32df8c9fe6201p1d448ejsn1643343b56ff",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}
