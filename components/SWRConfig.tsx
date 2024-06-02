"use client";
import {SWRConfig as _SWRConfig} from "swr"

export function SWRConfig({children}:{children:React.ReactNode})  {
    return <_SWRConfig value={{
        fetcher:(resource, init) => fetch(resource, init).then(res => res.json())
    }}>
        {children}
    </_SWRConfig>
}

