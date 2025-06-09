import { pgTable, text, serial, integer, boolean, timestamp, decimal, json, varchar, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table - 用戶
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  fullName: varchar("full_name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  avatar: text("avatar"),
  address: text("address"),
  city: varchar("city", { length: 50 }),
  district: varchar("district", { length: 50 }),
  postalCode: varchar("postal_code", { length: 10 }),
  birthDate: timestamp("birth_date"),
  gender: varchar("gender", { length: 10 }),
  occupation: varchar("occupation", { length: 100 }),
  emergencyContact: varchar("emergency_contact", { length: 20 }),
  preferredServices: json("preferred_services").$type<string[]>(),
  emailNotifications: boolean("email_notifications").default(true),
  smsNotifications: boolean("sms_notifications").default(true),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Artisans table - 工匠師傅
export const artisans = pgTable("artisans", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  fullName: varchar("full_name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  avatar: text("avatar"),
  idNumber: varchar("id_number", { length: 20 }),
  birthDate: timestamp("birth_date"),
  bio: text("bio"),
  specialties: json("specialties").$type<string[]>(),
  experience: varchar("experience", { length: 50 }),
  certifications: json("certifications").$type<string[]>(),
  workingAreas: json("working_areas").$type<string[]>(),
  businessLicense: varchar("business_license", { length: 100 }),
  insurance: varchar("insurance", { length: 100 }),
  emergencyContact: varchar("emergency_contact", { length: 20 }),
  bankAccount: varchar("bank_account", { length: 50 }),
  hourlyRate: decimal("hourly_rate", { precision: 8, scale: 2 }),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  totalJobs: integer("total_jobs").default(0),
  completedJobs: integer("completed_jobs").default(0),
  availability: json("availability"),
  isOnline: boolean("is_online").default(false),
  isVerified: boolean("is_verified").default(false),
  isActive: boolean("is_active").default(true),
  lat: decimal("lat", { precision: 10, scale: 8 }),
  lng: decimal("lng", { precision: 11, scale: 8 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Service Categories - 服務類別
export const serviceCategories = pgTable("service_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 50 }),
  basePrice: decimal("base_price", { precision: 8, scale: 2 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Bookings table - 預約
export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  artisanId: uuid("artisan_id"),
  serviceId: uuid("service_id").notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description").notNull(),
  urgency: varchar("urgency", { length: 20 }).default("normal"),
  location: text("location").notNull(),
  lat: decimal("lat", { precision: 10, scale: 8 }),
  lng: decimal("lng", { precision: 11, scale: 8 }),
  scheduledTime: timestamp("scheduled_time"),
  estimatedDuration: integer("estimated_duration"), // minutes
  estimatedPrice: decimal("estimated_price", { precision: 8, scale: 2 }),
  finalPrice: decimal("final_price", { precision: 8, scale: 2 }),
  status: varchar("status", { length: 50 }).default("pending"), // pending, confirmed, in_progress, completed, cancelled
  images: json("images").$type<string[]>(),
  videos: json("videos").$type<string[]>(),
  aiAnalysis: json("ai_analysis"),
  cancellationReason: text("cancellation_reason"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Job Tracking - 工作追蹤
export const jobTracking = pgTable("job_tracking", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingId: uuid("booking_id").notNull(),
  artisanId: uuid("artisan_id").notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  lat: decimal("lat", { precision: 10, scale: 8 }),
  lng: decimal("lng", { precision: 11, scale: 8 }),
  heading: decimal("heading", { precision: 5, scale: 2 }),
  speed: decimal("speed", { precision: 5, scale: 2 }),
  eta: timestamp("eta"),
  notes: text("notes"),
  images: json("images").$type<string[]>(),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Messages - 訊息
export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingId: uuid("booking_id").notNull(),
  senderId: uuid("sender_id").notNull(),
  senderType: varchar("sender_type", { length: 20 }).notNull(), // user, artisan, system
  message: text("message").notNull(),
  messageType: varchar("message_type", { length: 20 }).default("text"), // text, image, voice, system
  attachments: json("attachments").$type<string[]>(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Ratings - 評價
export const ratings = pgTable("ratings", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingId: uuid("booking_id").notNull(),
  userId: uuid("user_id").notNull(),
  artisanId: uuid("artisan_id").notNull(),
  punctuality: integer("punctuality").notNull(), // 1-5
  professionalism: integer("professionalism").notNull(), // 1-5
  quality: integer("quality").notNull(), // 1-5
  communication: integer("communication").notNull(), // 1-5
  value: integer("value").notNull(), // 1-5
  overallRating: decimal("overall_rating", { precision: 3, scale: 2 }).notNull(),
  comment: text("comment"),
  images: json("images").$type<string[]>(),
  wouldRecommend: boolean("would_recommend"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
  messages: many(messages),
  ratings: many(ratings),
}));

export const artisansRelations = relations(artisans, ({ many }) => ({
  bookings: many(bookings),
  jobTracking: many(jobTracking),
  messages: many(messages),
  ratings: many(ratings),
}));

export const serviceCategoriesRelations = relations(serviceCategories, ({ many }) => ({
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  artisan: one(artisans, {
    fields: [bookings.artisanId],
    references: [artisans.id],
  }),
  service: one(serviceCategories, {
    fields: [bookings.serviceId],
    references: [serviceCategories.id],
  }),
  tracking: many(jobTracking),
  messages: many(messages),
  ratings: many(ratings),
}));

export const jobTrackingRelations = relations(jobTracking, ({ one }) => ({
  booking: one(bookings, {
    fields: [jobTracking.bookingId],
    references: [bookings.id],
  }),
  artisan: one(artisans, {
    fields: [jobTracking.artisanId],
    references: [artisans.id],
  }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  booking: one(bookings, {
    fields: [messages.bookingId],
    references: [bookings.id],
  }),
}));

export const ratingsRelations = relations(ratings, ({ one }) => ({
  booking: one(bookings, {
    fields: [ratings.bookingId],
    references: [bookings.id],
  }),
  user: one(users, {
    fields: [ratings.userId],
    references: [users.id],
  }),
  artisan: one(artisans, {
    fields: [ratings.artisanId],
    references: [artisans.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertArtisanSchema = createInsertSchema(artisans).omit({
  id: true,
  rating: true,
  totalJobs: true,
  completedJobs: true,
  createdAt: true,
  updatedAt: true,
});

export const insertServiceCategorySchema = createInsertSchema(serviceCategories).omit({
  id: true,
  createdAt: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  artisanId: true,
  finalPrice: true,
  aiAnalysis: true,
  createdAt: true,
  updatedAt: true,
});

export const insertJobTrackingSchema = createInsertSchema(jobTracking).omit({
  id: true,
  timestamp: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

export const insertRatingSchema = createInsertSchema(ratings).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Artisan = typeof artisans.$inferSelect;
export type InsertArtisan = z.infer<typeof insertArtisanSchema>;

export type ServiceCategory = typeof serviceCategories.$inferSelect;
export type InsertServiceCategory = z.infer<typeof insertServiceCategorySchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

export type JobTracking = typeof jobTracking.$inferSelect;
export type InsertJobTracking = z.infer<typeof insertJobTrackingSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export type Rating = typeof ratings.$inferSelect;
export type InsertRating = z.infer<typeof insertRatingSchema>;
