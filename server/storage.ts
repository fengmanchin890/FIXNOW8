import {
  users,
  artisans,
  serviceCategories,
  bookings,
  jobTracking,
  messages,
  ratings,
  type User,
  type Artisan,
  type ServiceCategory,
  type Booking,
  type JobTracking,
  type Message,
  type Rating,
  type InsertUser,
  type InsertArtisan,
  type InsertServiceCategory,
  type InsertBooking,
  type InsertJobTracking,
  type InsertMessage,
  type InsertRating,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User>;
  
  // Artisans
  getArtisan(id: string): Promise<Artisan | undefined>;
  getArtisanByEmail(email: string): Promise<Artisan | undefined>;
  createArtisan(artisan: InsertArtisan): Promise<Artisan>;
  updateArtisan(id: string, updates: Partial<InsertArtisan>): Promise<Artisan>;
  getAvailableArtisans(serviceType: string, location?: { lat: number; lng: number }): Promise<Artisan[]>;
  updateArtisanLocation(id: string, lat: number, lng: number): Promise<void>;
  setArtisanOnlineStatus(id: string, isOnline: boolean): Promise<void>;
  
  // Service Categories
  getServiceCategories(): Promise<ServiceCategory[]>;
  getServiceCategory(id: string): Promise<ServiceCategory | undefined>;
  createServiceCategory(category: InsertServiceCategory): Promise<ServiceCategory>;
  
  // Bookings
  getBooking(id: string): Promise<Booking | undefined>;
  getUserBookings(userId: string): Promise<Booking[]>;
  getArtisanBookings(artisanId: string): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: string, updates: Partial<Booking>): Promise<Booking>;
  assignArtisanToBooking(bookingId: string, artisanId: string): Promise<Booking>;
  
  // Job Tracking
  createJobTracking(tracking: InsertJobTracking): Promise<JobTracking>;
  getBookingTracking(bookingId: string): Promise<JobTracking[]>;
  getLatestTracking(bookingId: string): Promise<JobTracking | undefined>;
  
  // Messages
  createMessage(message: InsertMessage): Promise<Message>;
  getBookingMessages(bookingId: string): Promise<Message[]>;
  markMessagesAsRead(bookingId: string, userId: string): Promise<void>;
  
  // Ratings
  createRating(rating: InsertRating): Promise<Rating>;
  getBookingRating(bookingId: string): Promise<Rating | undefined>;
  getArtisanRatings(artisanId: string): Promise<Rating[]>;
  updateArtisanRating(artisanId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values([insertUser])
      .returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Artisans
  async getArtisan(id: string): Promise<Artisan | undefined> {
    const [artisan] = await db.select().from(artisans).where(eq(artisans.id, id));
    return artisan;
  }

  async getArtisanByEmail(email: string): Promise<Artisan | undefined> {
    const [artisan] = await db.select().from(artisans).where(eq(artisans.email, email));
    return artisan;
  }

  async createArtisan(insertArtisan: InsertArtisan): Promise<Artisan> {
    const [artisan] = await db
      .insert(artisans)
      .values([insertArtisan])
      .returning();
    return artisan;
  }

  async updateArtisan(id: string, updates: Partial<InsertArtisan>): Promise<Artisan> {
    const [artisan] = await db
      .update(artisans)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(artisans.id, id))
      .returning();
    return artisan;
  }

  async getAvailableArtisans(serviceType: string, location?: { lat: number; lng: number }): Promise<Artisan[]> {
    // For now, return all online artisans with the required specialty
    return await db.select().from(artisans).where(
      and(
        eq(artisans.isOnline, true),
        eq(artisans.isActive, true),
        eq(artisans.isVerified, true)
      )
    );
  }

  async updateArtisanLocation(id: string, lat: number, lng: number): Promise<void> {
    await db
      .update(artisans)
      .set({ lat: lat.toString(), lng: lng.toString(), updatedAt: new Date() })
      .where(eq(artisans.id, id));
  }

  async setArtisanOnlineStatus(id: string, isOnline: boolean): Promise<void> {
    await db
      .update(artisans)
      .set({ isOnline, updatedAt: new Date() })
      .where(eq(artisans.id, id));
  }

  // Service Categories
  async getServiceCategories(): Promise<ServiceCategory[]> {
    return await db.select().from(serviceCategories).where(eq(serviceCategories.isActive, true));
  }

  async getServiceCategory(id: string): Promise<ServiceCategory | undefined> {
    const [category] = await db.select().from(serviceCategories).where(eq(serviceCategories.id, id));
    return category;
  }

  async createServiceCategory(insertCategory: InsertServiceCategory): Promise<ServiceCategory> {
    const [category] = await db
      .insert(serviceCategories)
      .values([insertCategory])
      .returning();
    return category;
  }

  // Bookings
  async getBooking(id: string): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking;
  }

  async getUserBookings(userId: string): Promise<Booking[]> {
    return await db.select().from(bookings)
      .where(eq(bookings.userId, userId))
      .orderBy(desc(bookings.createdAt));
  }

  async getArtisanBookings(artisanId: string): Promise<Booking[]> {
    return await db.select().from(bookings)
      .where(eq(bookings.artisanId, artisanId))
      .orderBy(desc(bookings.createdAt));
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db
      .insert(bookings)
      .values([insertBooking])
      .returning();
    return booking;
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
    const [booking] = await db
      .update(bookings)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(bookings.id, id))
      .returning();
    return booking;
  }

  async assignArtisanToBooking(bookingId: string, artisanId: string): Promise<Booking> {
    const [booking] = await db
      .update(bookings)
      .set({ artisanId, status: "confirmed", updatedAt: new Date() })
      .where(eq(bookings.id, bookingId))
      .returning();
    return booking;
  }

  // Job Tracking
  async createJobTracking(insertTracking: InsertJobTracking): Promise<JobTracking> {
    const [tracking] = await db
      .insert(jobTracking)
      .values([insertTracking])
      .returning();
    return tracking;
  }

  async getBookingTracking(bookingId: string): Promise<JobTracking[]> {
    return await db.select().from(jobTracking)
      .where(eq(jobTracking.bookingId, bookingId))
      .orderBy(desc(jobTracking.timestamp));
  }

  async getLatestTracking(bookingId: string): Promise<JobTracking | undefined> {
    const [tracking] = await db.select().from(jobTracking)
      .where(eq(jobTracking.bookingId, bookingId))
      .orderBy(desc(jobTracking.timestamp))
      .limit(1);
    return tracking;
  }

  // Messages
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db
      .insert(messages)
      .values([insertMessage])
      .returning();
    return message;
  }

  async getBookingMessages(bookingId: string): Promise<Message[]> {
    return await db.select().from(messages)
      .where(eq(messages.bookingId, bookingId))
      .orderBy(asc(messages.createdAt));
  }

  async markMessagesAsRead(bookingId: string, userId: string): Promise<void> {
    await db
      .update(messages)
      .set({ isRead: true })
      .where(
        and(
          eq(messages.bookingId, bookingId),
          eq(messages.senderId, userId)
        )
      );
  }

  // Ratings
  async createRating(insertRating: InsertRating): Promise<Rating> {
    const [rating] = await db
      .insert(ratings)
      .values([insertRating])
      .returning();
    
    // Update artisan rating
    await this.updateArtisanRating(insertRating.artisanId);
    
    return rating;
  }

  async getBookingRating(bookingId: string): Promise<Rating | undefined> {
    const [rating] = await db.select().from(ratings).where(eq(ratings.bookingId, bookingId));
    return rating;
  }

  async getArtisanRatings(artisanId: string): Promise<Rating[]> {
    return await db.select().from(ratings)
      .where(eq(ratings.artisanId, artisanId))
      .orderBy(desc(ratings.createdAt));
  }

  async updateArtisanRating(artisanId: string): Promise<void> {
    // Calculate average rating for artisan
    const artisanRatings = await this.getArtisanRatings(artisanId);
    if (artisanRatings.length > 0) {
      const avgRating = artisanRatings.reduce((sum, rating) => 
        sum + parseFloat(rating.overallRating), 0) / artisanRatings.length;
      
      await db
        .update(artisans)
        .set({ 
          rating: avgRating.toFixed(2),
          totalJobs: artisanRatings.length,
          updatedAt: new Date()
        })
        .where(eq(artisans.id, artisanId));
    }
  }
}

export const storage = new DatabaseStorage();
