export type User = {
  uid: string
  email: string
  name?: string
  createdAt: string
  updatedAt: string
  userLevel: 'STANDARD' | 'ADMIN' | 'TRIAL' | 'FREE'
  answers: string[]
}