-- =============================================================================
-- Resync identity sequences to MAX(id) on each table.
-- Fixes "duplicate key value violates unique constraint" errors that occur
-- when sequences fall behind because rows were inserted with explicit ids
-- (dashboard edits, manual SQL, restored backups, seed data, etc.).
-- Idempotent — safe to re-run.
-- =============================================================================

SELECT setval(pg_get_serial_sequence('public.post_images',  'id'), (SELECT MAX(id) FROM public.post_images));
SELECT setval(pg_get_serial_sequence('public.post_videos',  'id'), (SELECT MAX(id) FROM public.post_videos));
SELECT setval(pg_get_serial_sequence('public.climb_images', 'id'), (SELECT MAX(id) FROM public.climb_images));
SELECT setval(pg_get_serial_sequence('public.climb_videos', 'id'), (SELECT MAX(id) FROM public.climb_videos));
SELECT setval(pg_get_serial_sequence('public.posts',        'id'), (SELECT MAX(id) FROM public.posts));
SELECT setval(pg_get_serial_sequence('public.climbs',       'id'), (SELECT MAX(id) FROM public.climbs));
SELECT setval(pg_get_serial_sequence('public.sends',        'id'), (SELECT MAX(id) FROM public.sends));
SELECT setval(pg_get_serial_sequence('public.favorites',    'id'), (SELECT MAX(id) FROM public.favorites));
SELECT setval(pg_get_serial_sequence('public.notes',        'id'), (SELECT MAX(id) FROM public.notes));
