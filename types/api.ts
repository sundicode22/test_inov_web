// Authentication
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
  email: string
}

// Agent
export interface AgentTool {
  name: string
  description: string
  args_schema: any
}

export interface ChatRequest {
  session_id?: string
  message: string
}

export interface ChatResponse {
  session_id: string
  response: string
  tool_used: string | null
  turn: number
}

// Agenda
export interface AgendaEvent {
  id: string
  title: string
  date: string
  time: string
  participants: string
  notes: string
  user_id: string
}

export interface CreateEventRequest {
  title: string
  date: string
  time: string
  participants?: string
  notes?: string
}

export interface ListEventsParams {
  date?: string
  range?: 'week'
}
