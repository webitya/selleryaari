import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Please enter both email and password');
          }

          // 1. Check for Admin first (No DB needed)
          const adminEmail = process.env.ADMIN_EMAIL?.trim();
          const adminPassword = process.env.ADMIN_PASSWORD?.trim();

          if (credentials.email === adminEmail && credentials.password === adminPassword) {
            console.log('Admin login successful');
            return { id: 'admin-id', name: 'Admin', email: adminEmail, role: 'admin' };
          }

          // 2. Check for User in DB
          await dbConnect();
          const user = await User.findOne({ email: credentials.email.toLowerCase().trim() });
          
          if (!user) {
            throw new Error('No user found with this email');
          }
          
          if (!user.isVerified) {
            throw new Error('Please verify your email first');
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error('Incorrect password');
          }

          return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
        } catch (error) {
          console.error('Authorize error:', error.message);
          throw new Error(error.message); // Throwing error instead of returning null for better feedback
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        await dbConnect();
        let existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          existingUser = await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            isVerified: true,
            role: 'user'
          });
        }
        user.role = existingUser.role;
        user.id = existingUser._id;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
