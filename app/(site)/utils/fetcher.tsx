import axios from "axios";
import { getSession } from "next-auth/react";
import useSWR from "swr";

// API Fetcher for get requests...
const Fetcher = async <IData,>(path: string): Promise<IData> => {
  const session = await getSession();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    headers: {
      "content-type": "application/json",
      Authorization: `${session?.user.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }
  const data: IData = await response.json();
  return data;
};

export const useGetData = <T,>(path: string) => {
  const { data, isLoading, error } = useSWR(path, Fetcher);
  return {
    data: data as T,
    isLoading,
    error,
  };
};

// API Fetcher for POST requests...

export const sendPostRequests = async (url: any, options: any) => {
  try {
    const session = await getSession();
    const response = await axios.post(
      url,
      { options },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session?.user.accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return `Error sending POST request:, ${error}`;
  }
};
