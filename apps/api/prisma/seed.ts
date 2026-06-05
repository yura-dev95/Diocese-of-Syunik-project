import 'dotenv/config';
import { PrismaClient, type ChurchCategory, type LibraryCategory } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { churches } from '../src/data/churches.data.js';
import { libraryItems } from '../src/data/library.data.js';
import { clergyMembers, officialDocuments } from '../src/data/diocese.data.js';
import { donorHonors, socialPrograms, successStories } from '../src/data/social.data.js';
import { choirs, feastDays, mediaItems, prayers, sacramentGuides, saints } from '../src/data/spiritual.data.js';
import { etiquetteRules, liturgySchedules, pilgrimRoutes, usefulContacts } from '../src/data/pilgrim.data.js';
import { announcements, faqs, galleryImages, newsArticles } from '../src/data/news.data.js';

process.env.DATABASE_URL ??= 'postgresql://postgres:postgres@localhost:5433/syunik_diocese?schema=public';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@syunikdiocese.am' },
    update: {
      name: 'System Administrator',
      role: 'ADMIN',
    },
    create: {
      email: 'admin@syunikdiocese.am',
      name: 'System Administrator',
      role: 'ADMIN',
      passwordHash: await bcrypt.hash('Admin12345!', 12),
    },
  });

  for (const church of churches) {
    await prisma.church.upsert({
      where: { slug: church.slug },
      update: {
        name: church.name,
        summary: church.summary,
        description: church.description,
        settlement: church.settlement,
        century: church.century,
        category: church.category as ChurchCategory,
        coverUrl: church.imageUrl,
        latitude: church.latitude,
        longitude: church.longitude,
        visitingNote: church.visitingNote,
        serviceSchedule: church.serviceSchedule,
        isFeatured: church.isFeatured,
        status: 'PUBLISHED',
        gallery: {
          deleteMany: {},
          create: church.gallery.map((image) => ({
            url: image.url,
            alt: image.alt,
            caption: image.caption,
          })),
        },
      },
      create: {
        slug: church.slug,
        name: church.name,
        summary: church.summary,
        description: church.description,
        settlement: church.settlement,
        century: church.century,
        category: church.category as ChurchCategory,
        coverUrl: church.imageUrl,
        latitude: church.latitude,
        longitude: church.longitude,
        visitingNote: church.visitingNote,
        serviceSchedule: church.serviceSchedule,
        isFeatured: church.isFeatured,
        status: 'PUBLISHED',
        gallery: {
          create: church.gallery.map((image) => ({
            url: image.url,
            alt: image.alt,
            caption: image.caption,
          })),
        },
      },
    });
  }

  for (const item of libraryItems) {
    await prisma.libraryItem.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        author: item.author,
        description: item.description,
        category: item.category as LibraryCategory,
        fileUrl: item.fileUrl,
        coverUrl: item.coverUrl,
        publicationYear: item.publicationYear,
        pageCount: item.pageCount,
        language: item.language,
        status: 'PUBLISHED',
      },
      create: {
        slug: item.slug,
        title: item.title,
        author: item.author,
        description: item.description,
        category: item.category as LibraryCategory,
        fileUrl: item.fileUrl,
        coverUrl: item.coverUrl,
        publicationYear: item.publicationYear,
        pageCount: item.pageCount,
        language: item.language,
        status: 'PUBLISHED',
      },
    });
  }

  for (const member of clergyMembers) {
    await prisma.clergyMember.upsert({
      where: { slug: member.slug },
      update: {
        fullName: member.fullName,
        title: member.title,
        biography: member.biography,
        imageUrl: member.imageUrl,
        ordinationYear: member.ordinationYear,
        education: member.education,
        ministryFocus: member.ministryFocus,
        publicEmail: member.publicEmail,
        socialLinks: member.socialLinks,
        isPrimate: member.isPrimate,
        status: 'PUBLISHED',
        church: member.church ? { connect: { slug: member.church.slug } } : { disconnect: true },
      },
      create: {
        slug: member.slug,
        fullName: member.fullName,
        title: member.title,
        biography: member.biography,
        imageUrl: member.imageUrl,
        ordinationYear: member.ordinationYear,
        education: member.education,
        ministryFocus: member.ministryFocus,
        publicEmail: member.publicEmail,
        socialLinks: member.socialLinks,
        isPrimate: member.isPrimate,
        status: 'PUBLISHED',
        church: member.church ? { connect: { slug: member.church.slug } } : undefined,
      },
    });
  }

  for (const document of officialDocuments) {
    await prisma.officialDocument.upsert({
      where: { slug: document.slug },
      update: {
        title: document.title,
        description: document.description,
        documentType: document.documentType,
        documentDate: new Date(document.documentDate),
        fileUrl: document.fileUrl,
        status: 'PUBLISHED',
      },
      create: {
        slug: document.slug,
        title: document.title,
        description: document.description,
        documentType: document.documentType,
        documentDate: new Date(document.documentDate),
        fileUrl: document.fileUrl,
        status: 'PUBLISHED',
      },
    });
  }

  for (const program of socialPrograms) {
    await prisma.socialProgram.upsert({
      where: { slug: program.slug },
      update: {
        title: program.title, summary: program.summary, description: program.description, coverUrl: program.coverUrl,
        location: program.location, beneficiaries: program.beneficiaries, startsAt: new Date(program.startsAt),
        endsAt: program.endsAt ? new Date(program.endsAt) : null, isFeatured: program.isFeatured,
        goalAmount: program.goalAmount, raisedAmount: program.raisedAmount, status: 'PUBLISHED',
      },
      create: {
        slug: program.slug, title: program.title, summary: program.summary, description: program.description, coverUrl: program.coverUrl,
        location: program.location, beneficiaries: program.beneficiaries, startsAt: new Date(program.startsAt),
        endsAt: program.endsAt ? new Date(program.endsAt) : null, isFeatured: program.isFeatured,
        goalAmount: program.goalAmount, raisedAmount: program.raisedAmount, status: 'PUBLISHED',
      },
    });
  }

  for (const story of successStories) {
    await prisma.successStory.upsert({
      where: { slug: story.slug },
      update: { title: story.title, summary: story.summary, imageUrl: story.imageUrl, impactLabel: story.impactLabel, status: 'PUBLISHED', program: story.programSlug ? { connect: { slug: story.programSlug } } : { disconnect: true } },
      create: { slug: story.slug, title: story.title, summary: story.summary, imageUrl: story.imageUrl, impactLabel: story.impactLabel, status: 'PUBLISHED', program: story.programSlug ? { connect: { slug: story.programSlug } } : undefined },
    });
  }

  await prisma.donorHonor.deleteMany();
  await prisma.donorHonor.createMany({ data: donorHonors.map((honor, index) => ({ displayName: honor.displayName, honorLevel: honor.honorLevel, message: honor.message, sortOrder: index, isAnonymous: honor.displayName === 'Անանուն բարերար', status: 'PUBLISHED' })) });

  for (const item of prayers) await prisma.prayer.upsert({ where: { slug: item.slug }, update: { ...item, id: undefined, status: 'PUBLISHED' }, create: { ...item, status: 'PUBLISHED' } });
  for (const item of saints) await prisma.saint.upsert({ where: { slug: item.slug }, update: { ...item, id: undefined, status: 'PUBLISHED' }, create: { ...item, status: 'PUBLISHED' } });
  for (const item of feastDays) await prisma.feastDay.upsert({ where: { slug: item.slug }, update: { ...item, id: undefined, status: 'PUBLISHED' }, create: { ...item, status: 'PUBLISHED' } });
  for (const item of sacramentGuides) await prisma.sacramentGuide.upsert({ where: { slug: item.slug }, update: { ...item, id: undefined, preparation: item.preparation, status: 'PUBLISHED' }, create: { ...item, preparation: item.preparation, status: 'PUBLISHED' } });
  for (const item of choirs) await prisma.choir.upsert({ where: { slug: item.slug }, update: { ...item, id: undefined, status: 'PUBLISHED' }, create: { ...item, status: 'PUBLISHED' } });
  for (const item of mediaItems) {
    const { id: _id, choirSlug, publishedAt, ...media } = item;
    await prisma.mediaItem.upsert({
      where: { slug: item.slug },
      update: { ...media, publishedAt: new Date(publishedAt), status: 'PUBLISHED', choir: choirSlug ? { connect: { slug: choirSlug } } : { disconnect: true } },
      create: { ...media, publishedAt: new Date(publishedAt), status: 'PUBLISHED', choir: choirSlug ? { connect: { slug: choirSlug } } : undefined },
    });
  }
  for (const route of pilgrimRoutes) {
    const { id: _id, distanceKm, itinerary, transportOptions, ...data } = route;
    const jsonItinerary = JSON.parse(JSON.stringify(itinerary));
    const jsonTransportOptions = JSON.parse(JSON.stringify(transportOptions));
    await prisma.pilgrimRoute.upsert({
      where: { slug: route.slug },
      update: { ...data, distanceKm, itinerary: jsonItinerary, transportOptions: jsonTransportOptions, status: 'PUBLISHED' },
      create: { ...data, distanceKm, itinerary: jsonItinerary, transportOptions: jsonTransportOptions, status: 'PUBLISHED' },
    });
  }
  await prisma.liturgySchedule.deleteMany();
  for (const item of liturgySchedules) await prisma.liturgySchedule.create({ data: { dayLabel:item.dayLabel,timeLabel:item.timeLabel,serviceType:item.serviceType,note:item.note,status:'PUBLISHED',church:{connect:{slug:item.churchSlug}} } });
  await prisma.usefulContact.deleteMany();
  await prisma.usefulContact.createMany({ data: usefulContacts.map(({ id: _id, ...item }) => ({ ...item, isPublic:true,status:'PUBLISHED' })) });
  await prisma.etiquetteRule.deleteMany();
  await prisma.etiquetteRule.createMany({ data: etiquetteRules.map(({ id: _id, ...item }) => ({ ...item,status:'PUBLISHED' })) });
  for (const article of newsArticles) {
    const { id: _id, gallery, publishedAt, ...data } = article;
    await prisma.newsArticle.upsert({ where:{slug:article.slug},update:{...data,publishedAt:new Date(publishedAt),status:'PUBLISHED',gallery:{deleteMany:{},create:gallery.map(({id:_imageId,...image})=>image)}},create:{...data,publishedAt:new Date(publishedAt),status:'PUBLISHED',gallery:{create:gallery.map(({id:_imageId,...image})=>image)}} });
  }
  for (const item of announcements) { const {id:_id,announcementDate,expiresAt,...data}=item; await prisma.announcement.upsert({where:{slug:item.slug},update:{...data,announcementDate:new Date(announcementDate),expiresAt:expiresAt?new Date(expiresAt):null,status:'PUBLISHED'},create:{...data,announcementDate:new Date(announcementDate),expiresAt:expiresAt?new Date(expiresAt):null,status:'PUBLISHED'}}); }
  await prisma.galleryImage.createMany({data:galleryImages.map(({id:_id,...image})=>image),skipDuplicates:true});
  await prisma.fAQ.deleteMany();
  await prisma.fAQ.createMany({data:faqs.map(({id:_id,...item})=>({...item,status:'PUBLISHED'}))});
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
