import connectDB from '@/lib/mongodb';
import Lead from '@/models/Lead';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const newLead = await Lead.create(data);
    return NextResponse.json({ success: true, lead: newLead }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
