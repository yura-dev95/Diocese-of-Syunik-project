export interface NewsArticleRecord{id:string;slug:string;title:string;excerpt:string;content:string;coverUrl:string;category:string;authorName:string;isFeatured:boolean;publishedAt:string;gallery:GalleryImageRecord[]}
export interface AnnouncementRecord{id:string;slug:string;title:string;description:string;announcementDate:string;expiresAt?:string;priority:number}
export interface GalleryImageRecord{id:string;url:string;alt:string;caption?:string;category:string;sortOrder:number}
export interface FAQRecord{id:string;question:string;answer:string;category:string;sortOrder:number}
