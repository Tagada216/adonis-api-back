import { DateTime } from 'luxon'
export interface RegisterRequest {
  email: string
  password: string
  fullName?: string
}

export interface RegisterResponseBody {
  email: string
  createdAt: DateTime | null
  updatedAt: DateTime | null
  id: number
}
