import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { 
  requireAuth, 
  requireUserAuth, 
  requireArtisanAuth, 
  hashPassword, 
  comparePassword, 
  generateToken,
  type AuthRequest 
} from "./auth";
import { 
  insertUserSchema, 
  insertArtisanSchema, 
  insertBookingSchema,
  insertJobTrackingSchema,
  insertMessageSchema,
  insertRatingSchema,
  insertServiceCategorySchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // WebSocket setup for real-time features
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  const clients = new Map<string, WebSocket>();

  wss.on('connection', (ws, req) => {
    console.log('WebSocket connection established');
    
    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message.toString());
        
        if (data.type === 'auth') {
          // Store authenticated connection
          clients.set(data.userId, ws);
        } else if (data.type === 'location_update' && data.artisanId) {
          // Update artisan location
          await storage.updateArtisanLocation(data.artisanId, data.lat, data.lng);
          
          // Broadcast to relevant clients
          broadcastToBooking(data.bookingId, {
            type: 'location_update',
            artisanId: data.artisanId,
            lat: data.lat,
            lng: data.lng,
            timestamp: new Date()
          });
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', () => {
      // Remove from clients map
      clients.forEach((client, userId) => {
        if (client === ws) {
          clients.delete(userId);
        }
      });
    });
  });

  const broadcastToBooking = (bookingId: string, message: any) => {
    // In a real implementation, you'd track which users are subscribed to which bookings
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  };

  // === AUTHENTICATION ROUTES ===

  // User registration
  app.post('/api/auth/user/register', async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await hashPassword(userData.password);
      
      // Create user
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword
      });

      // Generate token
      const token = generateToken({
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        type: 'user'
      });

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          type: 'user'
        }
      });
    } catch (error: any) {
      console.error('User registration error:', error);
      res.status(400).json({ message: 'Registration failed', error: error.message });
    }
  });

  // User login
  app.post('/api/auth/user/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = generateToken({
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        type: 'user'
      });

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          type: 'user'
        }
      });
    } catch (error) {
      console.error('User login error:', error);
      res.status(500).json({ message: 'Login failed' });
    }
  });

  // Artisan registration
  app.post('/api/auth/artisan/register', async (req, res) => {
    try {
      const artisanData = insertArtisanSchema.parse(req.body);
      
      const existingArtisan = await storage.getArtisanByEmail(artisanData.email);
      if (existingArtisan) {
        return res.status(400).json({ message: 'Artisan already exists' });
      }

      const hashedPassword = await hashPassword(artisanData.password);
      
      const artisan = await storage.createArtisan({
        ...artisanData,
        password: hashedPassword
      });

      const token = generateToken({
        id: artisan.id,
        email: artisan.email,
        fullName: artisan.fullName,
        type: 'artisan'
      });

      res.status(201).json({
        message: 'Artisan registered successfully',
        token,
        artisan: {
          id: artisan.id,
          email: artisan.email,
          fullName: artisan.fullName,
          type: 'artisan'
        }
      });
    } catch (error: any) {
      console.error('Artisan registration error:', error);
      res.status(400).json({ message: 'Registration failed', error: error.message });
    }
  });

  // Artisan login
  app.post('/api/auth/artisan/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const artisan = await storage.getArtisanByEmail(email);
      if (!artisan) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isValidPassword = await comparePassword(password, artisan.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Set artisan as online
      await storage.setArtisanOnlineStatus(artisan.id, true);

      const token = generateToken({
        id: artisan.id,
        email: artisan.email,
        fullName: artisan.fullName,
        type: 'artisan'
      });

      res.json({
        message: 'Login successful',
        token,
        artisan: {
          id: artisan.id,
          email: artisan.email,
          fullName: artisan.fullName,
          type: 'artisan'
        }
      });
    } catch (error) {
      console.error('Artisan login error:', error);
      res.status(500).json({ message: 'Login failed' });
    }
  });

  // === SERVICE CATEGORY ROUTES ===

  // Get all service categories
  app.get('/api/services', async (req, res) => {
    try {
      const categories = await storage.getServiceCategories();
      res.json(categories);
    } catch (error) {
      console.error('Get service categories error:', error);
      res.status(500).json({ message: 'Failed to fetch service categories' });
    }
  });

  // Create service category (admin only for now)
  app.post('/api/services', async (req, res) => {
    try {
      const categoryData = insertServiceCategorySchema.parse(req.body);
      const category = await storage.createServiceCategory(categoryData);
      res.status(201).json(category);
    } catch (error: any) {
      console.error('Create service category error:', error);
      res.status(400).json({ message: 'Failed to create service category', error: error.message });
    }
  });

  // === BOOKING ROUTES ===

  // Create booking
  app.post('/api/bookings', requireUserAuth, async (req: AuthRequest, res) => {
    try {
      const bookingData = insertBookingSchema.parse({
        ...req.body,
        userId: req.user!.id
      });

      const booking = await storage.createBooking(bookingData);

      // TODO: Implement AI analysis here
      // For now, simulate AI analysis
      const aiAnalysis = {
        severity: 'medium',
        category: 'plumbing',
        estimatedTime: 60,
        recommendedTools: ['wrench', 'pipe cleaner'],
        riskFactors: ['water damage potential']
      };

      await storage.updateBooking(booking.id, { aiAnalysis });

      // Find available artisans
      const availableArtisans = await storage.getAvailableArtisans(bookingData.serviceId);
      
      // Notify available artisans via WebSocket
      availableArtisans.forEach(artisan => {
        const client = clients.get(artisan.id);
        if (client && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: 'new_booking',
            booking: { ...booking, aiAnalysis }
          }));
        }
      });

      res.status(201).json({ ...booking, aiAnalysis });
    } catch (error: any) {
      console.error('Create booking error:', error);
      res.status(400).json({ message: 'Failed to create booking', error: error.message });
    }
  });

  // Get user bookings
  app.get('/api/bookings/user', requireUserAuth, async (req: AuthRequest, res) => {
    try {
      const bookings = await storage.getUserBookings(req.user!.id);
      res.json(bookings);
    } catch (error) {
      console.error('Get user bookings error:', error);
      res.status(500).json({ message: 'Failed to fetch bookings' });
    }
  });

  // Get artisan bookings
  app.get('/api/bookings/artisan', requireArtisanAuth, async (req: AuthRequest, res) => {
    try {
      const bookings = await storage.getArtisanBookings(req.user!.id);
      res.json(bookings);
    } catch (error) {
      console.error('Get artisan bookings error:', error);
      res.status(500).json({ message: 'Failed to fetch bookings' });
    }
  });

  // Accept booking (artisan)
  app.post('/api/bookings/:id/accept', requireArtisanAuth, async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;
      const booking = await storage.assignArtisanToBooking(id, req.user!.id);

      // Create initial tracking entry
      await storage.createJobTracking({
        bookingId: id,
        artisanId: req.user!.id,
        status: 'accepted',
        notes: 'Job accepted by artisan'
      });

      // Notify user via WebSocket
      const userClient = clients.get(booking.userId);
      if (userClient && userClient.readyState === WebSocket.OPEN) {
        userClient.send(JSON.stringify({
          type: 'booking_accepted',
          booking
        }));
      }

      res.json(booking);
    } catch (error) {
      console.error('Accept booking error:', error);
      res.status(500).json({ message: 'Failed to accept booking' });
    }
  });

  // Update booking status
  app.patch('/api/bookings/:id/status', requireAuth, async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;

      const booking = await storage.updateBooking(id, { status });

      // Create tracking entry
      if (req.user!.type === 'artisan') {
        await storage.createJobTracking({
          bookingId: id,
          artisanId: req.user!.id,
          status,
          notes
        });
      }

      // Broadcast status update
      broadcastToBooking(id, {
        type: 'status_update',
        bookingId: id,
        status,
        timestamp: new Date()
      });

      res.json(booking);
    } catch (error) {
      console.error('Update booking status error:', error);
      res.status(500).json({ message: 'Failed to update booking status' });
    }
  });

  // === TRACKING ROUTES ===

  // Get booking tracking
  app.get('/api/bookings/:id/tracking', requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const tracking = await storage.getBookingTracking(id);
      res.json(tracking);
    } catch (error) {
      console.error('Get booking tracking error:', error);
      res.status(500).json({ message: 'Failed to fetch tracking data' });
    }
  });

  // Update artisan location
  app.post('/api/artisan/location', requireArtisanAuth, async (req: AuthRequest, res) => {
    try {
      const { lat, lng, bookingId } = req.body;
      
      await storage.updateArtisanLocation(req.user!.id, lat, lng);

      if (bookingId) {
        await storage.createJobTracking({
          bookingId,
          artisanId: req.user!.id,
          status: 'en_route',
          lat: lat.toString(),
          lng: lng.toString()
        });

        // Broadcast location update
        broadcastToBooking(bookingId, {
          type: 'location_update',
          artisanId: req.user!.id,
          lat,
          lng,
          timestamp: new Date()
        });
      }

      res.json({ message: 'Location updated successfully' });
    } catch (error) {
      console.error('Update location error:', error);
      res.status(500).json({ message: 'Failed to update location' });
    }
  });

  // === MESSAGING ROUTES ===

  // Get booking messages
  app.get('/api/bookings/:id/messages', requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const messages = await storage.getBookingMessages(id);
      res.json(messages);
    } catch (error) {
      console.error('Get messages error:', error);
      res.status(500).json({ message: 'Failed to fetch messages' });
    }
  });

  // Send message
  app.post('/api/bookings/:id/messages', requireAuth, async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;
      const messageData = insertMessageSchema.parse({
        ...req.body,
        bookingId: id,
        senderId: req.user!.id,
        senderType: req.user!.type
      });

      const message = await storage.createMessage(messageData);

      // Broadcast message
      broadcastToBooking(id, {
        type: 'new_message',
        message
      });

      res.status(201).json(message);
    } catch (error: any) {
      console.error('Send message error:', error);
      res.status(400).json({ message: 'Failed to send message', error: error.message });
    }
  });

  // === RATING ROUTES ===

  // Create rating
  app.post('/api/bookings/:id/rating', requireUserAuth, async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;
      const booking = await storage.getBooking(id);
      
      if (!booking || booking.userId !== req.user!.id) {
        return res.status(403).json({ message: 'Not authorized to rate this booking' });
      }

      if (!booking.artisanId) {
        return res.status(400).json({ message: 'No artisan assigned to this booking' });
      }

      const ratingData = insertRatingSchema.parse({
        ...req.body,
        bookingId: id,
        userId: req.user!.id,
        artisanId: booking.artisanId
      });

      const rating = await storage.createRating(ratingData);
      res.status(201).json(rating);
    } catch (error: any) {
      console.error('Create rating error:', error);
      res.status(400).json({ message: 'Failed to create rating', error: error.message });
    }
  });

  // Get artisan ratings
  app.get('/api/artisan/:id/ratings', async (req, res) => {
    try {
      const { id } = req.params;
      const ratings = await storage.getArtisanRatings(id);
      res.json(ratings);
    } catch (error) {
      console.error('Get artisan ratings error:', error);
      res.status(500).json({ message: 'Failed to fetch ratings' });
    }
  });

  // === ARTISAN ROUTES ===

  // Get available artisans
  app.get('/api/artisans/available', async (req, res) => {
    try {
      const { serviceType, lat, lng } = req.query;
      const location = lat && lng ? { lat: parseFloat(lat as string), lng: parseFloat(lng as string) } : undefined;
      
      const artisans = await storage.getAvailableArtisans(serviceType as string, location);
      res.json(artisans);
    } catch (error) {
      console.error('Get available artisans error:', error);
      res.status(500).json({ message: 'Failed to fetch available artisans' });
    }
  });

  // Set artisan online status
  app.post('/api/artisan/online', requireArtisanAuth, async (req: AuthRequest, res) => {
    try {
      const { isOnline } = req.body;
      await storage.setArtisanOnlineStatus(req.user!.id, isOnline);
      res.json({ message: `Artisan set to ${isOnline ? 'online' : 'offline'}` });
    } catch (error) {
      console.error('Set online status error:', error);
      res.status(500).json({ message: 'Failed to update online status' });
    }
  });

  return httpServer;
}
