-- =============================================================================
-- Granular RLS policies — replaces catch-all "Enable all access for all users"
-- =============================================================================

-- is_admin() helper — SECURITY DEFINER to avoid RLS recursion on profiles
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- ── climbs ───────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Enable all access for all users" ON public.climbs;

CREATE POLICY "climbs_select_public"  ON public.climbs FOR SELECT TO public        USING (true);
CREATE POLICY "climbs_insert_admin"   ON public.climbs FOR INSERT TO authenticated  WITH CHECK (is_admin());
CREATE POLICY "climbs_update_admin"   ON public.climbs FOR UPDATE TO authenticated  USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "climbs_delete_admin"   ON public.climbs FOR DELETE TO authenticated  USING (is_admin());

-- ── climb_images ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Enable all access for all users" ON public.climb_images;

CREATE POLICY "climb_images_select_public"  ON public.climb_images FOR SELECT TO public        USING (true);
CREATE POLICY "climb_images_insert_admin"   ON public.climb_images FOR INSERT TO authenticated  WITH CHECK (is_admin());
CREATE POLICY "climb_images_update_admin"   ON public.climb_images FOR UPDATE TO authenticated  USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "climb_images_delete_admin"   ON public.climb_images FOR DELETE TO authenticated  USING (is_admin());

-- ── climb_videos ─────────────────────────────────────────────────────────────
-- Public READ. Auth users insert/update/delete their own row. Admins have full access.
-- addVideoToClimb() inserts without user_id (admin-only flow) — covered by _admin policies.
-- NULL = auth.uid() evaluates to NULL so non-admin inserts without user_id are rejected.
DROP POLICY IF EXISTS "Enable all access for all users" ON public.climb_videos;

CREATE POLICY "climb_videos_select_public"  ON public.climb_videos FOR SELECT TO public        USING (true);
CREATE POLICY "climb_videos_insert_own"     ON public.climb_videos FOR INSERT TO authenticated  WITH CHECK (user_id = auth.uid());
CREATE POLICY "climb_videos_insert_admin"   ON public.climb_videos FOR INSERT TO authenticated  WITH CHECK (is_admin());
CREATE POLICY "climb_videos_update_own"     ON public.climb_videos FOR UPDATE TO authenticated  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "climb_videos_update_admin"   ON public.climb_videos FOR UPDATE TO authenticated  USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "climb_videos_delete_own"     ON public.climb_videos FOR DELETE TO authenticated  USING (user_id = auth.uid());
CREATE POLICY "climb_videos_delete_admin"   ON public.climb_videos FOR DELETE TO authenticated  USING (is_admin());

-- ── sends ────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Enable all access for all users" ON public.sends;

CREATE POLICY "sends_select_own"    ON public.sends FOR SELECT TO authenticated  USING (user_id = auth.uid());
CREATE POLICY "sends_select_admin"  ON public.sends FOR SELECT TO authenticated  USING (is_admin());
CREATE POLICY "sends_insert_own"    ON public.sends FOR INSERT TO authenticated  WITH CHECK (user_id = auth.uid());
CREATE POLICY "sends_insert_admin"  ON public.sends FOR INSERT TO authenticated  WITH CHECK (is_admin());
CREATE POLICY "sends_delete_own"    ON public.sends FOR DELETE TO authenticated  USING (user_id = auth.uid());
CREATE POLICY "sends_delete_admin"  ON public.sends FOR DELETE TO authenticated  USING (is_admin());

-- ── favorites ────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Enable all access for all users" ON public.favorites;

CREATE POLICY "favorites_select_own"    ON public.favorites FOR SELECT TO authenticated  USING (user_id = auth.uid());
CREATE POLICY "favorites_select_admin"  ON public.favorites FOR SELECT TO authenticated  USING (is_admin());
CREATE POLICY "favorites_insert_own"    ON public.favorites FOR INSERT TO authenticated  WITH CHECK (user_id = auth.uid());
CREATE POLICY "favorites_insert_admin"  ON public.favorites FOR INSERT TO authenticated  WITH CHECK (is_admin());
CREATE POLICY "favorites_delete_own"    ON public.favorites FOR DELETE TO authenticated  USING (user_id = auth.uid());
CREATE POLICY "favorites_delete_admin"  ON public.favorites FOR DELETE TO authenticated  USING (is_admin());

-- ── notes ────────────────────────────────────────────────────────────────────
-- deleteNote/editNote filter by id only — USING (user_id = auth.uid()) silently
-- scopes to caller's rows, so a user cannot affect another user's note by id.
DROP POLICY IF EXISTS "Enable all access for all users" ON public.notes;

CREATE POLICY "notes_select_own"    ON public.notes FOR SELECT TO authenticated  USING (user_id = auth.uid());
CREATE POLICY "notes_select_admin"  ON public.notes FOR SELECT TO authenticated  USING (is_admin());
CREATE POLICY "notes_insert_own"    ON public.notes FOR INSERT TO authenticated  WITH CHECK (user_id = auth.uid());
CREATE POLICY "notes_insert_admin"  ON public.notes FOR INSERT TO authenticated  WITH CHECK (is_admin());
CREATE POLICY "notes_update_own"    ON public.notes FOR UPDATE TO authenticated  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "notes_update_admin"  ON public.notes FOR UPDATE TO authenticated  USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "notes_delete_own"    ON public.notes FOR DELETE TO authenticated  USING (user_id = auth.uid());
CREATE POLICY "notes_delete_admin"  ON public.notes FOR DELETE TO authenticated  USING (is_admin());

-- ── posts ────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Enable all access for all users" ON public.posts;

CREATE POLICY "posts_select_public"  ON public.posts FOR SELECT TO public        USING (true);
CREATE POLICY "posts_insert_admin"   ON public.posts FOR INSERT TO authenticated  WITH CHECK (is_admin());
CREATE POLICY "posts_update_admin"   ON public.posts FOR UPDATE TO authenticated  USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "posts_delete_admin"   ON public.posts FOR DELETE TO authenticated  USING (is_admin());

-- ── post_images ───────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Enable all access for all users" ON public.post_images;

CREATE POLICY "post_images_select_public"  ON public.post_images FOR SELECT TO public        USING (true);
CREATE POLICY "post_images_insert_admin"   ON public.post_images FOR INSERT TO authenticated  WITH CHECK (is_admin());
CREATE POLICY "post_images_update_admin"   ON public.post_images FOR UPDATE TO authenticated  USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "post_images_delete_admin"   ON public.post_images FOR DELETE TO authenticated  USING (is_admin());

-- ── post_videos ───────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Enable all access for all users" ON public.post_videos;

CREATE POLICY "post_videos_select_public"  ON public.post_videos FOR SELECT TO public        USING (true);
CREATE POLICY "post_videos_insert_admin"   ON public.post_videos FOR INSERT TO authenticated  WITH CHECK (is_admin());
CREATE POLICY "post_videos_update_admin"   ON public.post_videos FOR UPDATE TO authenticated  USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "post_videos_delete_admin"   ON public.post_videos FOR DELETE TO authenticated  USING (is_admin());

-- ── profiles ──────────────────────────────────────────────────────────────────
-- INSERT: handled exclusively by the handle_new_user() SECURITY DEFINER trigger.
-- No user INSERT policy is created — direct inserts are blocked by RLS.
--
-- UPDATE role-immutability: WITH CHECK (role = 'user') prevents privilege
-- escalation without a recursive self-join. Non-admins can never set their
-- own role to anything other than 'user'. Admins bypass this via a separate policy.
DROP POLICY IF EXISTS "Public profiles are viewable" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile (except role)" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "profiles_select_public"
  ON public.profiles FOR SELECT TO public
  USING (true);

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid() AND role = 'user');

CREATE POLICY "profiles_update_admin"
  ON public.profiles FOR UPDATE TO authenticated
  USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "profiles_delete_admin"
  ON public.profiles FOR DELETE TO authenticated
  USING (is_admin());
