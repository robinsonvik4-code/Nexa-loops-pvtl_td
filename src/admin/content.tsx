import React, {createContext, useContext, useEffect, useState} from 'react';
const Context = createContext<Record<string, any[]>>({});
export function ContentProvider({children}:{children:React.ReactNode}) {
 const [data,setData]=useState({});
 useEffect(()=>{fetch('/api/content').then(r=>r.ok?r.json():{}).then(d=>setData(d)).catch(()=>{});},[]);
 return <Context.Provider value={data}>{children}</Context.Provider>;
}
export function useContent<T,>(key:string,fallback:T[]):T[] {const data=useContext(Context);return data[key] ?? fallback;}
