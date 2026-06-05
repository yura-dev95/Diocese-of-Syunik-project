import type { AdminResourceConfig } from '../types/admin';

const contentStatuses = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];
const submissionStatuses = ['NEW', 'IN_REVIEW', 'RESOLVED', 'ARCHIVED'];

export const adminResources: AdminResourceConfig[] = [
  { key: 'churches', label: 'Churches', titleField: 'name', descriptionField: 'settlement', fields: [
    { name: 'slug', label: 'Slug', required: true }, { name: 'name', label: 'Name', required: true }, { name: 'summary', label: 'Summary', type: 'textarea' }, { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'settlement', label: 'Settlement' }, { name: 'century', label: 'Century' }, { name: 'category', label: 'Category', type: 'select', options: ['ACTIVE_MONASTERY', 'CITY_CHURCH', 'VILLAGE_CHURCH', 'RUINED_SANCTUARY', 'CHAPEL'] },
    { name: 'coverUrl', label: 'Cover URL' }, { name: 'latitude', label: 'Latitude', type: 'number' }, { name: 'longitude', label: 'Longitude', type: 'number' }, { name: 'isFeatured', label: 'Featured', type: 'checkbox' }, { name: 'status', label: 'Status', type: 'select', options: contentStatuses },
  ] },
  { key: 'clergy', label: 'Clergy', titleField: 'fullName', descriptionField: 'title', fields: [
    { name: 'slug', label: 'Slug', required: true }, { name: 'fullName', label: 'Full name', required: true }, { name: 'title', label: 'Title', required: true }, { name: 'biography', label: 'Biography', type: 'textarea' },
    { name: 'imageUrl', label: 'Image URL' }, { name: 'ordinationYear', label: 'Ordination year', type: 'number' }, { name: 'education', label: 'Education' }, { name: 'ministryFocus', label: 'Ministry focus' }, { name: 'publicEmail', label: 'Public email' }, { name: 'isPrimate', label: 'Primate', type: 'checkbox' }, { name: 'status', label: 'Status', type: 'select', options: contentStatuses },
  ] },
  { key: 'social-programs', label: 'Social Programs', titleField: 'title', descriptionField: 'location', fields: [
    { name: 'slug', label: 'Slug', required: true }, { name: 'title', label: 'Title', required: true }, { name: 'summary', label: 'Summary', type: 'textarea' }, { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'coverUrl', label: 'Cover URL' }, { name: 'location', label: 'Location' }, { name: 'beneficiaries', label: 'Beneficiaries', type: 'number' }, { name: 'startsAt', label: 'Starts at', type: 'date' }, { name: 'endsAt', label: 'Ends at', type: 'date' }, { name: 'goalAmount', label: 'Goal amount', type: 'number' }, { name: 'raisedAmount', label: 'Raised amount', type: 'number' }, { name: 'isFeatured', label: 'Featured', type: 'checkbox' }, { name: 'status', label: 'Status', type: 'select', options: contentStatuses },
  ] },
  { key: 'news', label: 'News', titleField: 'title', descriptionField: 'category', fields: [
    { name: 'slug', label: 'Slug', required: true }, { name: 'title', label: 'Title', required: true }, { name: 'excerpt', label: 'Excerpt', type: 'textarea' }, { name: 'content', label: 'Content', type: 'textarea' },
    { name: 'coverUrl', label: 'Cover URL' }, { name: 'category', label: 'Category' }, { name: 'authorName', label: 'Author' }, { name: 'publishedAt', label: 'Published at', type: 'date' }, { name: 'isFeatured', label: 'Featured', type: 'checkbox' }, { name: 'status', label: 'Status', type: 'select', options: contentStatuses },
  ] },
  { key: 'events', label: 'Events', titleField: 'title', descriptionField: 'location', fields: [
    { name: 'slug', label: 'Slug', required: true }, { name: 'title', label: 'Title', required: true }, { name: 'description', label: 'Description', type: 'textarea' }, { name: 'location', label: 'Location' }, { name: 'startsAt', label: 'Starts at', type: 'date', required: true }, { name: 'endsAt', label: 'Ends at', type: 'date' }, { name: 'status', label: 'Status', type: 'select', options: contentStatuses },
  ] },
  { key: 'prayers', label: 'Prayers', titleField: 'title', descriptionField: 'category', fields: [
    { name: 'slug', label: 'Slug', required: true }, { name: 'title', label: 'Title', required: true }, { name: 'category', label: 'Category', required: true }, { name: 'summary', label: 'Summary', type: 'textarea' }, { name: 'content', label: 'Content', type: 'textarea', required: true }, { name: 'audioUrl', label: 'Audio URL' }, { name: 'status', label: 'Status', type: 'select', options: contentStatuses },
  ] },
  { key: 'saints', label: 'Saints', titleField: 'name', descriptionField: 'feastDate', fields: [
    { name: 'slug', label: 'Slug', required: true }, { name: 'name', label: 'Name', required: true }, { name: 'biography', label: 'Biography', type: 'textarea' }, { name: 'feastDate', label: 'Feast date' }, { name: 'patronOf', label: 'Patron of' }, { name: 'imageUrl', label: 'Image URL' }, { name: 'status', label: 'Status', type: 'select', options: contentStatuses },
  ] },
  { key: 'library-items', label: 'Library Items', titleField: 'title', descriptionField: 'author', fields: [
    { name: 'slug', label: 'Slug', required: true }, { name: 'title', label: 'Title', required: true }, { name: 'author', label: 'Author' }, { name: 'description', label: 'Description', type: 'textarea' }, { name: 'category', label: 'Category', type: 'select', options: ['PDF', 'MANUSCRIPT', 'ARTICLE'] }, { name: 'publicationYear', label: 'Publication year', type: 'number' }, { name: 'pageCount', label: 'Page count', type: 'number' }, { name: 'language', label: 'Language' }, { name: 'fileUrl', label: 'File URL' }, { name: 'coverUrl', label: 'Cover URL' }, { name: 'status', label: 'Status', type: 'select', options: contentStatuses },
  ] },
  { key: 'gallery', label: 'Gallery', titleField: 'alt', descriptionField: 'category', fields: [
    { name: 'url', label: 'Image URL', required: true }, { name: 'alt', label: 'Alt text', required: true }, { name: 'caption', label: 'Caption' }, { name: 'category', label: 'Category' }, { name: 'sortOrder', label: 'Sort order', type: 'number' },
  ] },
  { key: 'faqs', label: 'FAQs', titleField: 'question', descriptionField: 'category', fields: [
    { name: 'question', label: 'Question', type: 'textarea', required: true }, { name: 'answer', label: 'Answer', type: 'textarea', required: true }, { name: 'category', label: 'Category' }, { name: 'sortOrder', label: 'Sort order', type: 'number' }, { name: 'status', label: 'Status', type: 'select', options: contentStatuses },
  ] },
  { key: 'contact-messages', label: 'Contact Messages', titleField: 'subject', descriptionField: 'email', readonly: true, fields: [
    { name: 'status', label: 'Status', type: 'select', options: submissionStatuses },
  ] },
  { key: 'volunteer-applications', label: 'Volunteer Applications', titleField: 'fullName', descriptionField: 'email', fields: [
    { name: 'fullName', label: 'Full name', required: true }, { name: 'email', label: 'Email', required: true }, { name: 'phone', label: 'Phone' }, { name: 'interests', label: 'Interests', type: 'textarea' }, { name: 'availability', label: 'Availability' }, { name: 'message', label: 'Message', type: 'textarea' }, { name: 'status', label: 'Status', type: 'select', options: submissionStatuses },
  ] },
  { key: 'qna-questions', label: 'Q&A Questions', titleField: 'question', descriptionField: 'contactEmail', fields: [
    { name: 'question', label: 'Question', type: 'textarea', required: true }, { name: 'answer', label: 'Answer', type: 'textarea' }, { name: 'contactEmail', label: 'Contact email' }, { name: 'category', label: 'Category' }, { name: 'isAnonymous', label: 'Anonymous', type: 'checkbox' }, { name: 'isPublic', label: 'Public', type: 'checkbox' }, { name: 'status', label: 'Status', type: 'select', options: submissionStatuses },
  ] },
];

export function getAdminResource(key?: string) {
  return adminResources.find((item) => item.key === key);
}
