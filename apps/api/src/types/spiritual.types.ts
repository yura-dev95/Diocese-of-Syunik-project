export type MediaType = 'SERMON' | 'PODCAST' | 'VLOG' | 'SHARAKAN' | 'CHOIR_RECORDING';
export interface PrayerRecord { id: string; slug: string; title: string; category: string; summary: string; content: string; audioUrl?: string }
export interface SaintRecord { id: string; slug: string; name: string; biography: string; feastDate: string; imageUrl: string; patronOf?: string }
export interface FeastDayRecord { id: string; slug: string; title: string; description: string; feastDate: string; isMovable: boolean }
export interface SacramentGuideRecord { id: string; slug: string; title: string; summary: string; content: string; preparation: string[] }
export interface ChoirRecord { id: string; slug: string; name: string; description: string; imageUrl: string; conductor: string; location: string }
export interface MediaItemRecord { id: string; slug: string; title: string; description: string; mediaType: MediaType; coverUrl: string; mediaUrl?: string; duration: string; publishedAt: string; choirSlug?: string }
