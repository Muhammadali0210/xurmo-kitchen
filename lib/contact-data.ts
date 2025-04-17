export interface ContactInfo {
    address: string
    email: string
    phones: string[]
    social: {
      facebook: string
      instagram: string
      telegram: string
    }
    workingHours: string
  }
  
  // Mock contact data
  let mockContacts: ContactInfo = {
    address: "Toshkent shahri, Chilonzor tumani, 7-mavze, 17-uy",
    email: "info@restaurant.uz",
    phones: ["+998 90 123 45 67", "+998 71 234 56 78"],
    social: {
      facebook: "https://facebook.com/restaurant",
      instagram: "https://instagram.com/restaurant",
      telegram: "https://t.me/restaurant",
    },
    workingHours: "Har kuni: 10:00 - 22:00",
  }
  
  export function getContacts(): ContactInfo {
    return { ...mockContacts }
  }
  
  export function updateContacts(contacts: ContactInfo): ContactInfo {
    mockContacts = { ...contacts }
    return mockContacts
  }
  