import { NextResponse } from 'next/server';
import { prisma } from '@/database/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get('search') || '';
    
    // Build the where clause for filtering
    const whereClause = searchText ? {
      OR: [
        { name: { contains: searchText, mode: 'insensitive' } },
        { city: { contains: searchText, mode: 'insensitive' } },
        { state: { contains: searchText, mode: 'insensitive' } }
      ]
    } : {};
    
    // Fetch properties from database
    const properties = await prisma.property.findMany({
      where: whereClause,
      take: 20,
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json({
      success: true,
      data: properties,
      count: properties.length,
      searchApplied: !!searchText
    });
    
  } catch (error) {
    console.error('Error fetching properties:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch properties',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// You can also add other HTTP methods
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.city || !body.state) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: name, city, state' 
        },
        { status: 400 }
      );
    }
    
    // Create new property
    const newProperty = await prisma.property.create({
      data: {
        name: body.name,
        city: body.city,
        state: body.state,
        country: body.country || 'USA',
        lat: body.lat || 0,
        lng: body.lng || 0,
        geohash5: body.geohash5 || '',
        isActive: body.isActive !== undefined ? body.isActive : true,
        tags: body.tags || []
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Property created successfully',
      data: newProperty
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating property:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create property',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
