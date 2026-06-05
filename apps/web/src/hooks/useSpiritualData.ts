import { useEffect,useState } from 'react';
function useData<T>(load:()=>Promise<T>,deps:unknown[]=[]){const[data,setData]=useState<T>();const[isLoading,setLoading]=useState(true);useEffect(()=>{let active=true;setLoading(true);load().then(v=>active&&setData(v)).finally(()=>active&&setLoading(false));return()=>{active=false};},deps);return{data,isLoading};}
export { useData };
