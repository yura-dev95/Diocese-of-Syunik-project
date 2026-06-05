export type MediaType = 'SERMON' | 'PODCAST' | 'VLOG' | 'SHARAKAN' | 'CHOIR_RECORDING';
export interface Prayer { id:string;slug:string;title:string;category:string;summary:string;content:string;audioUrl?:string }
export interface Saint { id:string;slug:string;name:string;biography:string;feastDate:string;imageUrl:string;patronOf?:string }
export interface FeastDay { id:string;slug:string;title:string;description:string;feastDate:string;isMovable:boolean }
export interface SacramentGuide { id:string;slug:string;title:string;summary:string;content:string;preparation:string[] }
export interface Choir { id:string;slug:string;name:string;description:string;imageUrl:string;conductor:string;location:string }
export interface MediaItem { id:string;slug:string;title:string;description:string;mediaType:MediaType;coverUrl:string;duration:string;publishedAt:string;choirSlug?:string }
