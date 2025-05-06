export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      adoption_applications: {
        Row: {
          applicant_email: string
          applicant_name: string
          applicant_phone: string | null
          created_at: string | null
          experience: string | null
          id: string
          living_situation: string | null
          pet_id: string
          reason: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          applicant_email: string
          applicant_name: string
          applicant_phone?: string | null
          created_at?: string | null
          experience?: string | null
          id?: string
          living_situation?: string | null
          pet_id: string
          reason?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          applicant_email?: string
          applicant_name?: string
          applicant_phone?: string | null
          created_at?: string | null
          experience?: string | null
          id?: string
          living_situation?: string | null
          pet_id?: string
          reason?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "adoption_applications_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "adoption_pets"
            referencedColumns: ["id"]
          },
        ]
      }
      adoption_pets: {
        Row: {
          age: string | null
          breed: string | null
          color: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          location: string
          pet_name: string
          pet_type: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          age?: string | null
          breed?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          location: string
          pet_name: string
          pet_type: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: string | null
          breed?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string
          pet_name?: string
          pet_type?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          read: boolean | null
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          read?: boolean | null
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          read?: boolean | null
          subject?: string | null
        }
        Relationships: []
      }
      found_pets: {
        Row: {
          breed: string | null
          color: string | null
          contact_email: string | null
          contact_name: string
          contact_phone: string | null
          created_at: string | null
          description: string | null
          found_date: string
          found_location: string
          id: string
          image_url: string | null
          pet_type: string
          reunite_date: string | null
          reunite_story: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          breed?: string | null
          color?: string | null
          contact_email?: string | null
          contact_name: string
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          found_date: string
          found_location: string
          id?: string
          image_url?: string | null
          pet_type: string
          reunite_date?: string | null
          reunite_story?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          breed?: string | null
          color?: string | null
          contact_email?: string | null
          contact_name?: string
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          found_date?: string
          found_location?: string
          id?: string
          image_url?: string | null
          pet_type?: string
          reunite_date?: string | null
          reunite_story?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      lost_pets: {
        Row: {
          breed: string | null
          color: string | null
          contact_email: string | null
          contact_name: string
          contact_phone: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          last_seen_date: string
          last_seen_location: string
          pet_name: string | null
          pet_type: string
          reunite_date: string | null
          reunite_story: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          breed?: string | null
          color?: string | null
          contact_email?: string | null
          contact_name: string
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          last_seen_date: string
          last_seen_location: string
          pet_name?: string | null
          pet_type: string
          reunite_date?: string | null
          reunite_story?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          breed?: string | null
          color?: string | null
          contact_email?: string | null
          contact_name?: string
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          last_seen_date?: string
          last_seen_location?: string
          pet_name?: string | null
          pet_type?: string
          reunite_date?: string | null
          reunite_story?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      user_role: "user" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["user", "admin"],
    },
  },
} as const
