import type { EtiquetteRule,LiturgySchedule,PilgrimRoute,UsefulContact } from '../types/pilgrim';import { api } from './api';
const get=<T>(url:string,params?:object)=>api.get<{data:T}>(url,{params}).then(r=>r.data.data);
export const pilgrimService={routes:()=>get<PilgrimRoute[]>('/pilgrim-routes'),route:(slug:string)=>get<PilgrimRoute>(`/pilgrim-routes/${slug}`),schedules:()=>get<LiturgySchedule[]>('/liturgy-schedules'),contacts:(category?:string)=>get<UsefulContact[]>('/useful-contacts',{category}),rules:()=>get<EtiquetteRule[]>('/etiquette-rules')};
