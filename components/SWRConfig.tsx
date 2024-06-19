"use client";
import { SWRConfig as _SWRConfig } from "swr";

export function SWRConfig({ children }: { children: React.ReactNode }) {
  const KEY = process.env.API_KEY;
  return (
    <_SWRConfig
      value={{
        fetcher: (resource, init) => {
          const headers = new Headers(init?.headers);
          headers.set('Content-Type', 'application/json');
          headers.set('api-key',`${KEY}`); 

          const updatedInit = {
            ...init,
            headers,
          };

          return fetch(resource, updatedInit).then((res) => res.json());
        },
      }}
    >
      {children}
    </_SWRConfig>
  );
}
