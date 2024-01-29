"use client";

import useSWR from "swr";

import { apiGet } from './http-api';

const swrConfigs = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnMount: true,
  revalidateOnReconnect: false,
  refreshWhenHidden: false,
  refreshWhenOffline: false,
  focusThrottleInterval: 60000, //in ms
};

const useGetData = <K,>(path: string) => {
  const { data } = useSWR(path, apiGet, swrConfigs);

  return data as K;
};
export default useGetData;
