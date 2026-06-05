export interface RouteStop{time:string;title:string;description:string;location:string}
export interface PilgrimRoute{id:string;slug:string;title:string;summary:string;duration:string;distanceKm:number;difficulty:string;coverUrl:string;startLocation:string;endLocation:string;itinerary:RouteStop[];transportOptions:string[];mapFileUrl?:string}
export interface LiturgySchedule{id:string;churchSlug:string;churchName:string;settlement:string;dayLabel:string;timeLabel:string;serviceType:string;note?:string}
export interface UsefulContact{id:string;name:string;category:string;description:string;phone?:string;email?:string;address?:string;website?:string}
export interface EtiquetteRule{id:string;title:string;description:string;iconKey:string;sortOrder:number}
