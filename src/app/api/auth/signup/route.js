import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Otp from '@/models/Otp';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { name, email, phone, password, otp } = await req.json();
    await dbConnect();

    // 1. Verify OTP
    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. Create user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      isVerified: true,
      role: 'user'
    });

    // 5. Delete OTP record
    await Otp.deleteOne({ email });

    return NextResponse.json({ message: 'User registered successfully', user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}
