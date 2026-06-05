import type { Choir, FeastDay, MediaItem, MediaType, Prayer, SacramentGuide, Saint } from '../types/spiritual';
import { api } from './api';
const get=<T>(url:string,params?:object)=>api.get<{data:T}>(url,{params}).then(r=>r.data.data);
export const spiritualService={
  prayers:(filters?:{search?:string;category?:string})=>get<Prayer[]>('/prayers',filters), saints:(search?:string)=>get<Saint[]>('/saints',{search}),
  feasts:()=>get<FeastDay[]>('/feast-days'), sacraments:()=>get<SacramentGuide[]>('/sacrament-guides'),
  sacrament:(slug:string)=>get<SacramentGuide>(`/sacrament-guides/${slug}`), media:(type?:MediaType)=>get<MediaItem[]>('/media-items',{type}), choirs:()=>get<Choir[]>('/choirs'),
};
