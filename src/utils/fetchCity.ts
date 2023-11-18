import axios, { AxiosInstance, AxiosResponse } from "axios";

interface IPData {
  ip: string;
  city: string;
  region: string;
  region_code: string;
  country_code: string;
  country_code_iso3: string;
  country_name: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: boolean;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  asn: string;
  org: string;
}

const api: AxiosInstance = axios.create({
  baseURL: "https://ipapi.co",
});

export const getCity = (IP: string): Promise<IPData> => {
  return api
    .get<IPData>(`/${IP}/json/`)
    .then((response: AxiosResponse<IPData>) => response.data);
};
