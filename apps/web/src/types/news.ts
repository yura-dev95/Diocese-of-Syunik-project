export interface GalleryImage{id:string;url:string;alt:string;caption?:string;category:string;sortOrder:number}
export interface NewsArticle{id:string;slug:string;title:string;excerpt:string;content:string;coverUrl:string;category:string;authorName:string;isFeatured:boolean;publishedAt:string;gallery:GalleryImage[]}
export interface Announcement{id:string;slug:string;title:string;description:string;announcementDate:string;expiresAt?:string;priority:number}
export interface FAQ{id:string;question:string;answer:string;category:string;sortOrder:number}
