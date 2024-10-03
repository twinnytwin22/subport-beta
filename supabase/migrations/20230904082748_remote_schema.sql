
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;



CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."delete_avatar"("avatar_url" "text", OUT "status" integer, OUT "content" "text") RETURNS "record"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  select
      into status, content
           result.status, result.content
      from public.delete_storage_object('avatars', avatar_url) as result;
end;
$$;

ALTER FUNCTION "public"."delete_avatar"("avatar_url" "text", OUT "status" integer, OUT "content" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."delete_storage_object"("bucket" "text", "object" "text", OUT "status" integer, OUT "content" "text") RETURNS "record"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
  project_url text := 'https://vmyqkspfxrzxteohsrbk.supabase.co';
  service_role_key text := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvZW56aHNtbG1jbm15bm5qY2pzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNzg0MTE1MywiZXhwIjoyMDQzNDE3MTUzfQ.FcEaQ_UPj6Q7TXawtuy78hAYOwD_CHMMowfkDcKWoJg
'; --  full access needed
  url text := project_url||'/storage/v1/object/'||bucket||'/'||object;
begin
  select
      into status, content
           result.status::int, result.content::text
      FROM extensions.http((
    'DELETE',
    url,
    ARRAY[extensions.http_header('authorization','Bearer '||service_role_key)],
    NULL,
    NULL)::extensions.http_request) as result;
end;
$$;

ALTER FUNCTION "public"."delete_storage_object"("bucket" "text", "object" "text", OUT "status" integer, OUT "content" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."profiles_encrypt_secret_access_key"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
		BEGIN
		        new.access_key = CASE WHEN new.access_key IS NULL THEN NULL ELSE
			CASE WHEN '91e2347d-7b6c-498b-a307-1adbc72a2162' IS NULL THEN NULL ELSE pg_catalog.encode(
			  pgsodium.crypto_aead_det_encrypt(
				pg_catalog.convert_to(new.access_key, 'utf8'),
				pg_catalog.convert_to(('')::text, 'utf8'),
				'91e2347d-7b6c-498b-a307-1adbc72a2162'::uuid,
				NULL
			  ),
				'base64') END END;
		RETURN new;
		END;
		$$;

ALTER FUNCTION "public"."profiles_encrypt_secret_access_key"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."profiles_encrypt_secret_secrect"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
		BEGIN
		        new.secrect = CASE WHEN new.secrect IS NULL THEN NULL ELSE
			CASE WHEN '8e24603b-f7d4-4c9b-bde3-3f0664f3008c' IS NULL THEN NULL ELSE pg_catalog.encode(
			  pgsodium.crypto_aead_det_encrypt(
				pg_catalog.convert_to(new.secrect, 'utf8'),
				pg_catalog.convert_to(('')::text, 'utf8'),
				'8e24603b-f7d4-4c9b-bde3-3f0664f3008c'::uuid,
				NULL
			  ),
				'base64') END END;
		RETURN new;
		END;
		$$;

ALTER FUNCTION "public"."profiles_encrypt_secret_secrect"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "username" "text",
    "display_name" "text",
    "avatar_url" "text" DEFAULT 'default_user_image.jpg'::"text",
    "website" "text",
    "wallet_address" "text" DEFAULT ''::"text",
    "secret" "text" DEFAULT '"secret" ~~ ''0x%''::text'::"text",
    "updated_at" timestamp with time zone,
    "city" "text" DEFAULT ''::"text",
    "state" "text" DEFAULT ''::"text",
    "country" "text" DEFAULT ''::"text",
    "bio" "text" DEFAULT ''::"text",
    "access_key" "text",
    "email" "text" DEFAULT ''::"text",
    "bg_url" "text" DEFAULT 'coverBanner.jpg'::"text" NOT NULL,
    CONSTRAINT "profiles_username_check" CHECK (("char_length"("username") >= 5))
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

SECURITY LABEL FOR "pgsodium" ON COLUMN "public"."profiles"."access_key" IS 'ENCRYPT WITH KEY ID 91e2347d-7b6c-498b-a307-1adbc72a2162';
ƒ
CREATE OR REPLACE VIEW "public"."decrypted_profiles" AS
 SELECT "profiles"."id",
    "profiles"."username",
    "profiles"."display_name",
    "profiles"."avatar_url",
    "profiles"."website",
    "profiles"."wallet_address",
    "profiles"."secret",
    "profiles"."updated_at",
    "profiles"."city",
    "profiles"."state",
    "profiles"."country",
    "profiles"."bio",
    "profiles"."access_key",
        CASE
            WHEN ("profiles"."access_key" IS NULL) THEN NULL::"text"
            ELSE
            CASE
                WHEN ('91e2347d-7b6c-498b-a307-1adbc72a2162' IS NULL) THEN NULL::"text"
                ELSE "convert_from"("pgsodium"."crypto_aead_det_decrypt"("decode"("profiles"."access_key", 'base64'::"text"), "convert_to"(''::"text", 'utf8'::"name"), '91e2347d-7b6c-498b-a307-1adbc72a2162'::"uuid", NULL::"bytea"), 'utf8'::"name")
            END
        END AS "decrypted_access_key",
    "profiles"."email",
    "profiles"."bg_url"
   FROM "public"."profiles";

ALTER TABLE "public"."decrypted_profiles" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."drop_collects" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "drop_id" "uuid" NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);

ALTER TABLE "public"."drop_collects" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."drop_comments" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "drop_id" "uuid" NOT NULL,
    "comment" "text" NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);

ALTER TABLE "public"."drop_comments" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."drop_reactions" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "drop_id" "uuid" NOT NULL,
    "reaction_type" "text" NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);

ALTER TABLE "public"."drop_reactions" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."drops" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "contract_address" "text" DEFAULT ''::"text" NOT NULL,
    "title" "text" DEFAULT ''::"text",
    "slug" "text" DEFAULT ''::"text",
    "keywords" "text"[],
    "user_id" "uuid" NOT NULL,
    "genre" "text",
    "spotify_uri" "text"
);

ALTER TABLE "public"."drops" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."events" (
    "image" "text" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "date" "date",
    "location" "text",
    "category" "text",
    "ticket_type" "text",
    "price" "text",
    "currency_type" "text",
    "ticket_quantity" integer,
    "ticket_status" "text",
    "ticket_terms" "text",
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "slug" "text",
    "user_id" "uuid" NOT NULL
);

ALTER TABLE "public"."events" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."followers" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "follower_id" "uuid",
    "following_id" "uuid"
);

ALTER TABLE "public"."followers" OWNER TO "postgres";

ALTER TABLE "public"."followers" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."followers_duplicate_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."notifications" (
    "id" integer NOT NULL,
    "user_id" "uuid",
    "message" "text",
    "is_read" boolean DEFAULT false,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "deleted_at" timestamp without time zone,
    "type" "text" DEFAULT ''::"text" NOT NULL,
    "related_user" "uuid"
);

ALTER TABLE "public"."notifications" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."notifications_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."notifications_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."notifications_id_seq" OWNED BY "public"."notifications"."id";

CREATE TABLE IF NOT EXISTS "public"."playlists" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "title" "text",
    "user_id" "uuid",
    "spotify_uri" "text"
);

ALTER TABLE "public"."playlists" OWNER TO "postgres";

ALTER TABLE "public"."playlists" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."playlist_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."reaction_types" (
    "type" "text" NOT NULL,
    "label" "text",
    "url" "text"
);

ALTER TABLE "public"."reaction_types" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."save_check" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "drop_id" "uuid",
    "saver_id" "uuid",
    "spotify_save" boolean DEFAULT false NOT NULL,
    "apple_save" boolean DEFAULT false,
    "deezer_save" boolean DEFAULT false,
    "has_collected" boolean DEFAULT false
);

ALTER TABLE "public"."save_check" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."subscribers" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "subscriber_id" "uuid" NOT NULL,
    "subscription_id" "uuid" NOT NULL
);

ALTER TABLE "public"."subscribers" OWNER TO "postgres";

ALTER TABLE "public"."subscribers" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."subscribers_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."subscriptions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "price_per_month" numeric,
    "tier_1" boolean DEFAULT false NOT NULL,
    "tier_2" boolean DEFAULT false NOT NULL,
    "tier_3" boolean DEFAULT false NOT NULL,
    "crypto" boolean DEFAULT false NOT NULL,
    "cash" boolean DEFAULT false NOT NULL,
    "user_id" "uuid" NOT NULL
);

ALTER TABLE "public"."subscriptions" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."user_saved_events" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "saved_by" "uuid" NOT NULL,
    "event_id" "uuid" NOT NULL
);

ALTER TABLE "public"."user_saved_events" OWNER TO "postgres";

ALTER TABLE ONLY "public"."notifications" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."notifications_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."drop_collects"
    ADD CONSTRAINT "drop_collects_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."drop_comments"
    ADD CONSTRAINT "drop_comments_pkey1" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."drop_reactions"
    ADD CONSTRAINT "drop_reactions_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."drops"
    ADD CONSTRAINT "drops_contract_address_key" UNIQUE ("contract_address");

ALTER TABLE ONLY "public"."drops"
    ADD CONSTRAINT "drops_id_key" UNIQUE ("id");

ALTER TABLE ONLY "public"."drops"
    ADD CONSTRAINT "drops_pkey" PRIMARY KEY ("id", "user_id");

ALTER TABLE ONLY "public"."followers"
    ADD CONSTRAINT "followers_duplicate_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "irl_events_id_key" UNIQUE ("id");

ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "irl_events_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."notifications"
    ADD CONSTRAINT "notifications_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."playlists"
    ADD CONSTRAINT "playlist_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_access_key_key" UNIQUE ("access_key");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_username_key" UNIQUE ("username");

ALTER TABLE ONLY "public"."reaction_types"
    ADD CONSTRAINT "reaction_types_pkey" PRIMARY KEY ("type");

ALTER TABLE ONLY "public"."save_check"
    ADD CONSTRAINT "save_check_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."save_check"
    ADD CONSTRAINT "save_check_spotify_save_key" UNIQUE ("spotify_save");

ALTER TABLE ONLY "public"."subscribers"
    ADD CONSTRAINT "subscribers_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_user_id_key" UNIQUE ("user_id");

ALTER TABLE ONLY "public"."user_saved_events"
    ADD CONSTRAINT "user_saved_events_pkey" PRIMARY KEY ("id");

CREATE TRIGGER "new_follower_hook" AFTER INSERT ON "public"."followers" FOR EACH ROW EXECUTE FUNCTION "supabase_functions"."http_request"('https://subport.vercel.app/api/notify/new-follower', 'POST', '{"Content-type":"application/json"}', '{}', '1000');


ALTER TABLE ONLY "public"."drop_collects"
    ADD CONSTRAINT "drop_collects_drop_id_fkey" FOREIGN KEY ("drop_id") REFERENCES "public"."drops"("id");

ALTER TABLE ONLY "public"."drop_collects"
    ADD CONSTRAINT "drop_collects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id");

ALTER TABLE ONLY "public"."drop_comments"
    ADD CONSTRAINT "drop_comments_drop_id_fkey" FOREIGN KEY ("drop_id") REFERENCES "public"."drops"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."drop_comments"
    ADD CONSTRAINT "drop_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."drop_reactions"
    ADD CONSTRAINT "drop_reactions_drop_id_fkey" FOREIGN KEY ("drop_id") REFERENCES "public"."drops"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."drop_reactions"
    ADD CONSTRAINT "drop_reactions_reaction_type_fkey" FOREIGN KEY ("reaction_type") REFERENCES "public"."reaction_types"("type") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."drop_reactions"
    ADD CONSTRAINT "drop_reactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."drops"
    ADD CONSTRAINT "drops_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."followers"
    ADD CONSTRAINT "followers_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."followers"
    ADD CONSTRAINT "followers_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."notifications"
    ADD CONSTRAINT "notifications_related_user_fkey" FOREIGN KEY ("related_user") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."notifications"
    ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."playlists"
    ADD CONSTRAINT "playlists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."save_check"
    ADD CONSTRAINT "save_check_drop_id_fkey" FOREIGN KEY ("drop_id") REFERENCES "public"."drops"("id") ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."save_check"
    ADD CONSTRAINT "save_check_saver_id_fkey" FOREIGN KEY ("saver_id") REFERENCES "public"."profiles"("id");

ALTER TABLE ONLY "public"."subscribers"
    ADD CONSTRAINT "subscribers_subscriber_id_fkey" FOREIGN KEY ("subscriber_id") REFERENCES "public"."profiles"("id");

ALTER TABLE ONLY "public"."subscribers"
    ADD CONSTRAINT "subscribers_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."user_saved_events"
    ADD CONSTRAINT "user_saved_events_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."user_saved_events"
    ADD CONSTRAINT "user_saved_events_saved_by_fkey" FOREIGN KEY ("saved_by") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

CREATE POLICY "Enable  access for all users" ON "public"."user_saved_events" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable delete for users based on user_id" ON "public"."drop_comments" FOR DELETE USING (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable delete for users based on user_id" ON "public"."drop_reactions" FOR DELETE USING (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable delete for users based on user_id" ON "public"."followers" FOR DELETE USING ((("auth"."uid"() = "follower_id") OR ("auth"."uid"() = "following_id")));

CREATE POLICY "Enable delete for users based on user_id" ON "public"."playlists" USING (("auth"."uid"() = "user_id")) WITH CHECK (true);

CREATE POLICY "Enable delete for users based on user_id" ON "public"."save_check" TO "authenticated" USING (("auth"."uid"() = "saver_id")) WITH CHECK (true);

CREATE POLICY "Enable delete for users based on user_id" ON "public"."subscriptions" FOR DELETE USING (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable delete for users based on user_id" ON "public"."user_saved_events" FOR DELETE USING (("auth"."uid"() = "saved_by"));

CREATE POLICY "Enable insert for authenticated users only" ON "public"."drop_collects" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."drop_comments" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."drop_reactions" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."drops" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."events" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."followers" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."save_check" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."subscriptions" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."user_saved_events" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."drop_collects" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."drop_comments" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."drop_reactions" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."drops" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."events" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."followers" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."notifications" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."playlists" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."reaction_types" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."save_check" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."subscriptions" FOR SELECT USING (true);

CREATE POLICY "Enable update for users based on user_id" ON "public"."drops" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));

CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles" FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON "public"."profiles" FOR INSERT WITH CHECK (("auth"."uid"() = "id"));

CREATE POLICY "Users can update own profile." ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id"));

ALTER TABLE "public"."drop_collects" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."drop_comments" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."drop_reactions" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."drops" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."events" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."followers" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."notifications" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."playlists" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."reaction_types" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."save_check" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."subscribers" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."subscriptions" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."user_saved_events" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."delete_avatar"("avatar_url" "text", OUT "status" integer, OUT "content" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."delete_avatar"("avatar_url" "text", OUT "status" integer, OUT "content" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_avatar"("avatar_url" "text", OUT "status" integer, OUT "content" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."delete_storage_object"("bucket" "text", "object" "text", OUT "status" integer, OUT "content" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."delete_storage_object"("bucket" "text", "object" "text", OUT "status" integer, OUT "content" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_storage_object"("bucket" "text", "object" "text", OUT "status" integer, OUT "content" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."profiles_encrypt_secret_access_key"() TO "anon";
GRANT ALL ON FUNCTION "public"."profiles_encrypt_secret_access_key"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."profiles_encrypt_secret_access_key"() TO "service_role";

GRANT ALL ON FUNCTION "public"."profiles_encrypt_secret_secrect"() TO "anon";
GRANT ALL ON FUNCTION "public"."profiles_encrypt_secret_secrect"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."profiles_encrypt_secret_secrect"() TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

GRANT ALL ON TABLE "public"."decrypted_profiles" TO "anon";
GRANT ALL ON TABLE "public"."decrypted_profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."decrypted_profiles" TO "service_role";

GRANT ALL ON TABLE "public"."drop_collects" TO "anon";
GRANT ALL ON TABLE "public"."drop_collects" TO "authenticated";
GRANT ALL ON TABLE "public"."drop_collects" TO "service_role";

GRANT ALL ON TABLE "public"."drop_comments" TO "anon";
GRANT ALL ON TABLE "public"."drop_comments" TO "authenticated";
GRANT ALL ON TABLE "public"."drop_comments" TO "service_role";

GRANT ALL ON TABLE "public"."drop_reactions" TO "anon";
GRANT ALL ON TABLE "public"."drop_reactions" TO "authenticated";
GRANT ALL ON TABLE "public"."drop_reactions" TO "service_role";

GRANT ALL ON TABLE "public"."drops" TO "anon";
GRANT ALL ON TABLE "public"."drops" TO "authenticated";
GRANT ALL ON TABLE "public"."drops" TO "service_role";

GRANT ALL ON TABLE "public"."events" TO "anon";
GRANT ALL ON TABLE "public"."events" TO "authenticated";
GRANT ALL ON TABLE "public"."events" TO "service_role";

GRANT ALL ON TABLE "public"."followers" TO "anon";
GRANT ALL ON TABLE "public"."followers" TO "authenticated";
GRANT ALL ON TABLE "public"."followers" TO "service_role";

GRANT ALL ON SEQUENCE "public"."followers_duplicate_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."followers_duplicate_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."followers_duplicate_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."notifications" TO "anon";
GRANT ALL ON TABLE "public"."notifications" TO "authenticated";
GRANT ALL ON TABLE "public"."notifications" TO "service_role";

GRANT ALL ON SEQUENCE "public"."notifications_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."notifications_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."notifications_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."playlists" TO "anon";
GRANT ALL ON TABLE "public"."playlists" TO "authenticated";
GRANT ALL ON TABLE "public"."playlists" TO "service_role";

GRANT ALL ON SEQUENCE "public"."playlist_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."playlist_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."playlist_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."reaction_types" TO "anon";
GRANT ALL ON TABLE "public"."reaction_types" TO "authenticated";
GRANT ALL ON TABLE "public"."reaction_types" TO "service_role";

GRANT ALL ON TABLE "public"."save_check" TO "anon";
GRANT ALL ON TABLE "public"."save_check" TO "authenticated";
GRANT ALL ON TABLE "public"."save_check" TO "service_role";

GRANT ALL ON TABLE "public"."subscribers" TO "anon";
GRANT ALL ON TABLE "public"."subscribers" TO "authenticated";
GRANT ALL ON TABLE "public"."subscribers" TO "service_role";

GRANT ALL ON SEQUENCE "public"."subscribers_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."subscribers_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."subscribers_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."subscriptions" TO "anon";
GRANT ALL ON TABLE "public"."subscriptions" TO "authenticated";
GRANT ALL ON TABLE "public"."subscriptions" TO "service_role";

GRANT ALL ON TABLE "public"."user_saved_events" TO "anon";
GRANT ALL ON TABLE "public"."user_saved_events" TO "authenticated";
GRANT ALL ON TABLE "public"."user_saved_events" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
