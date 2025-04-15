// This is a simple mock authentication system
// In a real application, you would use a proper authentication system

export interface User {
  id: string
  username: string
}

// In a real app, you would never store passwords in plain text
// This is just for demonstration purposes
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "password123"

export async function login(username: string, password: string): Promise<User | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return {
      id: "1",
      username: ADMIN_USERNAME,
    }
  }

  return null
}
