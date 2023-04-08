export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      collectibles: {
        Row: {
          address: string
          artist_name: string
          audio: string
          comments: string[] | null
          created_at: string
          description: string
          genre: string
          id: string
          image: string
          keywords: string[] | null
          likes: number | null
          lyrics: string | null
          name: string
          release_date: string
          song_uri: string
          total_collectibles: number | null
          website: string | null
        }
        Insert: {
          address: string
          artist_name: string
          audio: string
          comments?: string[] | null
          created_at?: string
          description: string
          genre: string
          id?: string
          image: string
          keywords?: string[] | null
          likes?: number | null
          lyrics?: string | null
          name: string
          release_date: string
          song_uri: string
          total_collectibles?: number | null
          website?: string | null
        }
        Update: {
          address?: string
          artist_name?: string
          audio?: string
          comments?: string[] | null
          created_at?: string
          description?: string
          genre?: string
          id?: string
          image?: string
          keywords?: string[] | null
          likes?: number | null
          lyrics?: string | null
          name?: string
          release_date?: string
          song_uri?: string
          total_collectibles?: number | null
          website?: string | null
        }
      }
      profiles: {
        Row: {
          email: string | null
          id: string
          image: string | null
          name: string | null
        }
        Insert: {
          email?: string | null
          id: string
          image?: string | null
          name?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          image?: string | null
          name?: string | null
        }
      }
      users: {
        Row: {
          email: string | null
          id: string
          image: string | null
          name: string | null
          wallet_address: string | null
        }
        Insert: {
          email?: string | null
          id: string
          image?: string | null
          name?: string | null
          wallet_address?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          image?: string | null
          name?: string | null
          wallet_address?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
