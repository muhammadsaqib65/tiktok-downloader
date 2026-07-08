import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Table to track TikTok video downloads
export const downloads = pgTable('downloads', {
  id: serial('id').primaryKey(),
  videoUrl: text('video_url').notNull(),
  downloadedAt: timestamp('downloaded_at').defaultNow().notNull(),
  videoTitle: text('video_title'),
  author: text('author'),
});
