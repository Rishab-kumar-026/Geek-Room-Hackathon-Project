import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUserPreferences {
  budget: 'low' | 'medium' | 'high';
  categories: string[];
  radius: number;
  language: string;
  currency: string;
  notifications: {
    email: boolean;
    push: boolean;
    recommendations: boolean;
    events: boolean;
  };
}

export interface ISavedPlace {
  placeId: string;
  name: string;
  category: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating?: number;
  notes?: string;
  visitDate?: Date;
  isVisited: boolean;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  preferences: IUserPreferences;
  savedPlaces: ISavedPlace[];
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
  getSignedJwtToken(): string;
}

const UserPreferencesSchema = new Schema<IUserPreferences>({
  budget: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  categories: [{
    type: String,
    enum: ['restaurant', 'attraction', 'entertainment', 'shopping', 'hotel', 'transport', 'event', 'culture', 'nature', 'nightlife']
  }],
  radius: {
    type: Number,
    default: 10,
    min: 1,
    max: 50
  },
  language: {
    type: String,
    default: 'en'
  },
  currency: {
    type: String,
    default: 'USD'
  },
  notifications: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: true },
    recommendations: { type: Boolean, default: true },
    events: { type: Boolean, default: true }
  }
});

const SavedPlaceSchema = new Schema<ISavedPlace>({
  placeId: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  rating: { type: Number, min: 1, max: 5 },
  notes: { type: String },
  visitDate: { type: Date },
  isVisited: { type: Boolean, default: false }
});

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  avatar: {
    type: String
  },
  preferences: {
    type: UserPreferencesSchema,
    default: () => ({})
  },
  savedPlaces: [SavedPlaceSchema]
}, {
  timestamps: true
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET || 'fallback-secret', {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model<IUser>('User', UserSchema);