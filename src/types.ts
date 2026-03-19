export type RoomType = 'Standard' | 'Deluxe' | 'Suite';

export interface Room {
  id: string;
  type: RoomType;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Booking {
  id: string;
  customerName: string;
  checkIn: string;
  checkOut: string;
  roomType: RoomType;
  timestamp: string;
}

export const ROOMS: Room[] = [
  {
    id: 'standard',
    type: 'Standard',
    name: 'Classic Room',
    description: 'Elegant comfort with a city view, featuring a queen-sized bed and artisanal amenities.',
    price: 1800,
    image: 'https://picsum.photos/seed/vietnam-room-1/800/1000'
  },
  {
    id: 'deluxe',
    type: 'Deluxe',
    name: 'Deluxe Sanctuary',
    description: 'Spacious living with a private balcony and a king-sized bed for ultimate relaxation.',
    price: 3200,
    image: 'https://picsum.photos/seed/vietnam-room-2/800/1000'
  },
  {
    id: 'suite',
    type: 'Suite',
    name: 'Anna Presidential Suite',
    description: 'The pinnacle of luxury. Panoramic views, private lounge, and dedicated butler service.',
    price: 7500,
    image: 'https://picsum.photos/seed/vietnam-room-3/800/1000'
  }
];
