import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Otp from '@/models/Otp';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { email, otp, newPassword } = await req.json();
    await dbConnect();

    // 1. Verify OTP
    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) {
      return NextResponse.json({ error: 'Invalid or expired reset code' }, { status: 400 });
    }

    // 2. Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // 3. Update User
    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: 'Failed to update password' }, { status: 404 });
    }

    // 4. Delete OTP record
    await Otp.deleteOne({ email });

    return NextResponse.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 });
  }
}
