export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      drop_collects: {
        Row: {
          created_at: string;
          drop_id: string;
          id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          drop_id: string;
          id?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          drop_id?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'drop_collects_drop_id_fkey';
            columns: ['drop_id'];
            referencedRelation: 'drops';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'drop_collects_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'drop_collects_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      drop_comments: {
        Row: {
          comment: string;
          created_at: string;
          drop_id: string;
          id: string;
          user_id: string;
        };
        Insert: {
          comment: string;
          created_at?: string;
          drop_id: string;
          id?: string;
          user_id: string;
        };
        Update: {
          comment?: string;
          created_at?: string;
          drop_id?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'drop_comments_drop_id_fkey';
            columns: ['drop_id'];
            referencedRelation: 'drops';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'drop_comments_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'drop_comments_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      drop_reactions: {
        Row: {
          created_at: string;
          drop_id: string;
          id: string;
          reaction_type: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          drop_id: string;
          id?: string;
          reaction_type: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          drop_id?: string;
          id?: string;
          reaction_type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'drop_reactions_drop_id_fkey';
            columns: ['drop_id'];
            referencedRelation: 'drops';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'drop_reactions_reaction_type_fkey';
            columns: ['reaction_type'];
            referencedRelation: 'reaction_types';
            referencedColumns: ['type'];
          },
          {
            foreignKeyName: 'drop_reactions_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'drop_reactions_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      drops: {
        Row: {
          contract_address: string;
          created_at: string;
          genre: string | null;
          id: string;
          keywords: string[] | null;
          slug: string | null;
          spotify_uri: string | null;
          title: string | null;
          user_id: string;
        };
        Insert: {
          contract_address?: string;
          created_at?: string;
          genre?: string | null;
          id?: string;
          keywords?: string[] | null;
          slug?: string | null;
          spotify_uri?: string | null;
          title?: string | null;
          user_id: string;
        };
        Update: {
          contract_address?: string;
          created_at?: string;
          genre?: string | null;
          id?: string;
          keywords?: string[] | null;
          slug?: string | null;
          spotify_uri?: string | null;
          title?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'drops_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'drops_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      events: {
        Row: {
          category: string | null;
          created_at: string;
          currency_type: string | null;
          date: string | null;
          description: string | null;
          id: string;
          image: string;
          location: string | null;
          price: string | null;
          slug: string | null;
          ticket_quantity: number | null;
          ticket_status: string | null;
          ticket_terms: string | null;
          ticket_type: string | null;
          title: string;
          user_id: string;
        };
        Insert: {
          category?: string | null;
          created_at?: string;
          currency_type?: string | null;
          date?: string | null;
          description?: string | null;
          id?: string;
          image: string;
          location?: string | null;
          price?: string | null;
          slug?: string | null;
          ticket_quantity?: number | null;
          ticket_status?: string | null;
          ticket_terms?: string | null;
          ticket_type?: string | null;
          title: string;
          user_id: string;
        };
        Update: {
          category?: string | null;
          created_at?: string;
          currency_type?: string | null;
          date?: string | null;
          description?: string | null;
          id?: string;
          image?: string;
          location?: string | null;
          price?: string | null;
          slug?: string | null;
          ticket_quantity?: number | null;
          ticket_status?: string | null;
          ticket_terms?: string | null;
          ticket_type?: string | null;
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'events_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'events_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      followers: {
        Row: {
          created_at: string | null;
          follower_id: string | null;
          following_id: string | null;
          id: number;
        };
        Insert: {
          created_at?: string | null;
          follower_id?: string | null;
          following_id?: string | null;
          id?: number;
        };
        Update: {
          created_at?: string | null;
          follower_id?: string | null;
          following_id?: string | null;
          id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'followers_follower_id_fkey';
            columns: ['follower_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'followers_follower_id_fkey';
            columns: ['follower_id'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'followers_following_id_fkey';
            columns: ['following_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'followers_following_id_fkey';
            columns: ['following_id'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      notifications: {
        Row: {
          created_at: string | null;
          deleted_at: string | null;
          id: number;
          is_read: boolean | null;
          message: string | null;
          related_user: string | null;
          type: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          deleted_at?: string | null;
          id?: number;
          is_read?: boolean | null;
          message?: string | null;
          related_user?: string | null;
          type?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          deleted_at?: string | null;
          id?: number;
          is_read?: boolean | null;
          message?: string | null;
          related_user?: string | null;
          type?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'notifications_related_user_fkey';
            columns: ['related_user'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notifications_related_user_fkey';
            columns: ['related_user'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notifications_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notifications_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      playlists: {
        Row: {
          created_at: string | null;
          id: number;
          spotify_uri: string | null;
          title: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          spotify_uri?: string | null;
          title?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          spotify_uri?: string | null;
          title?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'playlists_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'playlists_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      profiles: {
        Row: {
          access_key: string | null;
          avatar_url: string | null;
          bg_url: string;
          bio: string | null;
          city: string | null;
          country: string | null;
          email: string | null;
          display_name: string | null;
          id: string;
          secret: string | null;
          state: string | null;
          updated_at: string | null;
          username: string | null;
          wallet_address: string | null;
          website: string | null;
        };
        Insert: {
          access_key?: string | null;
          avatar_url?: string | null;
          bg_url?: string;
          bio?: string | null;
          city?: string | null;
          country?: string | null;
          email?: string | null;
          display_name?: string | null;
          id: string;
          secret?: string | null;
          state?: string | null;
          updated_at?: string | null;
          username?: string | null;
          wallet_address?: string | null;
          website?: string | null;
        };
        Update: {
          access_key?: string | null;
          avatar_url?: string | null;
          bg_url?: string;
          bio?: string | null;
          city?: string | null;
          country?: string | null;
          email?: string | null;
          display_name?: string | null;
          id?: string;
          secret?: string | null;
          state?: string | null;
          updated_at?: string | null;
          username?: string | null;
          wallet_address?: string | null;
          website?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      reaction_types: {
        Row: {
          label: string | null;
          type: string;
          url: string | null;
        };
        Insert: {
          label?: string | null;
          type: string;
          url?: string | null;
        };
        Update: {
          label?: string | null;
          type?: string;
          url?: string | null;
        };
        Relationships: [];
      };
      save_check: {
        Row: {
          apple_save: boolean | null;
          created_at: string | null;
          deezer_save: boolean | null;
          drop_id: string | null;
          has_collected: boolean | null;
          id: string;
          saver_id: string | null;
          spotify_save: boolean;
        };
        Insert: {
          apple_save?: boolean | null;
          created_at?: string | null;
          deezer_save?: boolean | null;
          drop_id?: string | null;
          has_collected?: boolean | null;
          id?: string;
          saver_id?: string | null;
          spotify_save?: boolean;
        };
        Update: {
          apple_save?: boolean | null;
          created_at?: string | null;
          deezer_save?: boolean | null;
          drop_id?: string | null;
          has_collected?: boolean | null;
          id?: string;
          saver_id?: string | null;
          spotify_save?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: 'save_check_drop_id_fkey';
            columns: ['drop_id'];
            referencedRelation: 'drops';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'save_check_saver_id_fkey';
            columns: ['saver_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'save_check_saver_id_fkey';
            columns: ['saver_id'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      subscribers: {
        Row: {
          created_at: string | null;
          id: number;
          subscriber_id: string;
          subscription_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          subscriber_id: string;
          subscription_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          subscriber_id?: string;
          subscription_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'subscribers_subscriber_id_fkey';
            columns: ['subscriber_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'subscribers_subscriber_id_fkey';
            columns: ['subscriber_id'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'subscribers_subscription_id_fkey';
            columns: ['subscription_id'];
            referencedRelation: 'subscriptions';
            referencedColumns: ['id'];
          }
        ];
      };
      subscriptions: {
        Row: {
          cash: boolean;
          created_at: string | null;
          crypto: boolean;
          id: string;
          price_per_month: number | null;
          tier_1: boolean;
          tier_2: boolean;
          tier_3: boolean;
          user_id: string;
        };
        Insert: {
          cash?: boolean;
          created_at?: string | null;
          crypto?: boolean;
          id?: string;
          price_per_month?: number | null;
          tier_1?: boolean;
          tier_2?: boolean;
          tier_3?: boolean;
          user_id: string;
        };
        Update: {
          cash?: boolean;
          created_at?: string | null;
          crypto?: boolean;
          id?: string;
          price_per_month?: number | null;
          tier_1?: boolean;
          tier_2?: boolean;
          tier_3?: boolean;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'subscriptions_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'subscriptions_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      user_saved_events: {
        Row: {
          created_at: string;
          event_id: string;
          id: string;
          saved_by: string;
        };
        Insert: {
          created_at?: string;
          event_id: string;
          id?: string;
          saved_by: string;
        };
        Update: {
          created_at?: string;
          event_id?: string;
          id?: string;
          saved_by?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_saved_events_event_id_fkey';
            columns: ['event_id'];
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_saved_events_saved_by_fkey';
            columns: ['saved_by'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_saved_events_saved_by_fkey';
            columns: ['saved_by'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      decrypted_profiles: {
        Row: {
          access_key: string | null;
          avatar_url: string | null;
          bg_url: string | null;
          bio: string | null;
          city: string | null;
          country: string | null;
          decrypted_access_key: string | null;
          email: string | null;
          display_name: string | null;
          id: string | null;
          secret: string | null;
          state: string | null;
          updated_at: string | null;
          username: string | null;
          wallet_address: string | null;
          website: string | null;
        };
        Insert: {
          access_key?: string | null;
          avatar_url?: string | null;
          bg_url?: string | null;
          bio?: string | null;
          city?: string | null;
          country?: string | null;
          decrypted_access_key?: never;
          email?: string | null;
          display_name?: string | null;
          id?: string | null;
          secret?: string | null;
          state?: string | null;
          updated_at?: string | null;
          username?: string | null;
          wallet_address?: string | null;
          website?: string | null;
        };
        Update: {
          access_key?: string | null;
          avatar_url?: string | null;
          bg_url?: string | null;
          bio?: string | null;
          city?: string | null;
          country?: string | null;
          decrypted_access_key?: never;
          email?: string | null;
          display_name?: string | null;
          id?: string | null;
          secret?: string | null;
          state?: string | null;
          updated_at?: string | null;
          username?: string | null;
          wallet_address?: string | null;
          website?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Functions: {
      delete_avatar: {
        Args: {
          avatar_url: string;
        };
        Returns: Record<string, unknown>;
      };
      delete_storage_object: {
        Args: {
          bucket: string;
          object: string;
        };
        Returns: Record<string, unknown>;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
