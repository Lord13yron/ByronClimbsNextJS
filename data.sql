SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict Eoec2DK2XgE1GNcWmGodcXGXbRKnsbLY4mG2v3uLXnZQdp9QTM5XzdwgMoRcukc

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at", "invite_token", "referrer", "oauth_client_state_id", "linking_target_id", "email_optional") VALUES
	('f2e45dd2-89ab-49c3-b8ed-37bdf4468583', '743b7112-e142-42ca-b5d7-27532d9b4aaf', 'c05e9752-9a64-484b-9f55-28928d06c6ed', 's256', '9qQcUldzRSD6YYSOJrAZP5gpIP31IbW92XvYK24aCQs', 'email', '', '', '2026-01-10 01:23:17.704798+00', '2026-01-10 01:23:17.704798+00', 'email/signup', NULL, NULL, NULL, NULL, NULL, false),
	('3827d6c6-6f45-4f3e-a3e2-83dc65ac5a95', 'efb3ea0c-4a51-401d-ac68-353907e50747', 'eeb20a00-3eb5-4b51-beec-f02088aada6f', 's256', 'E-cjwdyU5HuxEL1dVPQWsbLQakI3pIiqYvHDi7V3MEU', 'email', '', '', '2026-01-10 18:52:04.398068+00', '2026-01-10 18:52:04.398068+00', 'email/signup', NULL, NULL, NULL, NULL, NULL, false),
	('93d3174f-97c0-4e54-b636-a616b6ef3c24', 'efb3ea0c-4a51-401d-ac68-353907e50747', 'b62e5fe7-96b5-4644-938e-15e606161098', 's256', 'Ru6DFU205DyfvwcniIRD8Z-byvlBwrYXsj600ElV__Q', 'magiclink', '', '', '2026-01-10 19:03:55.618842+00', '2026-01-10 19:03:55.618842+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('9bd55121-2a91-4a0a-9979-1d8e056517c4', 'efb3ea0c-4a51-401d-ac68-353907e50747', 'ff42eda7-1af1-41ef-a9a2-2565716dddd1', 's256', 'aJ_UqIh5BjAIaRVXpD0cSLL9TICGL3j4-zIDRszXYj0', 'magiclink', '', '', '2026-01-10 19:10:42.461635+00', '2026-01-10 19:11:11.030853+00', 'magiclink', '2026-01-10 19:11:11.030812+00', NULL, NULL, NULL, NULL, false),
	('4c02ef6d-051e-4f8a-9f9a-e09a536ef67a', '7a635e6f-6d8a-4431-93d2-301e477d8205', '4053a1a8-a6c0-4a9c-88ba-1eaa2d3138fc', 's256', '_lzbpSsTf84-VCNJeR4zAavFhOU5IMTGcabMIQSOpX0', 'email', '', '', '2026-01-10 19:12:17.456988+00', '2026-01-10 19:12:17.456988+00', 'email/signup', NULL, NULL, NULL, NULL, NULL, false),
	('e320d68d-c081-4691-8f77-2ed6b3620ea2', '7a635e6f-6d8a-4431-93d2-301e477d8205', '54fd8e89-1f7d-479b-9f12-0c110bc8073c', 's256', 'fTmkHyfE1E3NhsC3xi80BCEnLIRgiDekiOYcUQY2NZ0', 'magiclink', '', '', '2026-01-10 19:12:50.341013+00', '2026-01-10 19:13:10.359378+00', 'magiclink', '2026-01-10 19:13:10.359334+00', NULL, NULL, NULL, NULL, false),
	('96626fcf-cf83-45b6-b813-ecc4d3f1a6e1', '7a635e6f-6d8a-4431-93d2-301e477d8205', '09dae592-5622-4c2c-92e2-eac7d166c37c', 's256', 'RqARqCsu_-5UYihgRcRtyLxBjYH3Vjm73Xx5oS4CNag', 'magiclink', '', '', '2026-01-10 19:15:27.169617+00', '2026-01-10 19:16:25.449596+00', 'magiclink', '2026-01-10 19:16:25.449558+00', NULL, NULL, NULL, NULL, false),
	('94706ecc-83f5-4a9b-8929-3f956277a97e', '7a635e6f-6d8a-4431-93d2-301e477d8205', 'c6c019e3-ec3d-42a0-b225-45d7317ac352', 's256', 'odN2sVIFgx4i70rdHV8xclZTttiQmXyVhdMiciHssuQ', 'magiclink', '', '', '2026-01-10 19:18:10.284998+00', '2026-01-10 19:18:25.031961+00', 'magiclink', '2026-01-10 19:18:25.031925+00', NULL, NULL, NULL, NULL, false),
	('4ceb5a54-e04a-444e-b8a1-b4736f3daff9', '7a635e6f-6d8a-4431-93d2-301e477d8205', 'e80e6304-0905-45e2-9821-22ea1b7ccf18', 's256', 'DUNEtUQgOlLb2B148qLzffVJMGseDxnM1lx0bK_PzBQ', 'magiclink', '', '', '2026-01-10 19:24:08.596967+00', '2026-01-10 19:24:26.999822+00', 'magiclink', '2026-01-10 19:24:26.999788+00', NULL, NULL, NULL, NULL, false),
	('dcdd98f7-e0f2-480e-99f2-12b34f430d37', '7a635e6f-6d8a-4431-93d2-301e477d8205', '94126dd5-03e5-4c80-b045-694770f169e1', 's256', 'aSV2LQ5gNZdkSGo0_J54rQONX6N_YKrE5DckBP_mDuY', 'magiclink', '', '', '2026-01-10 19:32:12.08518+00', '2026-01-10 19:32:31.747311+00', 'magiclink', '2026-01-10 19:32:31.747271+00', NULL, NULL, NULL, NULL, false),
	('93037056-ce56-4ed9-bdc4-f89edf4c1e2e', '7a635e6f-6d8a-4431-93d2-301e477d8205', '2626ecc9-edf4-480a-8d44-d1730dda1a81', 's256', 'j9QbMqs5li9GD6LKiMbNaOovH_bgK9o_crFy0YrcGKE', 'magiclink', '', '', '2026-01-10 22:04:25.084085+00', '2026-01-10 22:04:25.084085+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('c0413eed-de0d-4bed-a88b-3649ca55c740', '7a635e6f-6d8a-4431-93d2-301e477d8205', 'f8f65f26-cc8c-45e4-8013-0b749da3e7b4', 's256', 'K09cNxbm6rGfBDx2Bqxx5pWWv8ZYuMtMUIHPMR2v5_U', 'magiclink', '', '', '2026-01-10 22:05:18.572474+00', '2026-01-10 22:05:58.327477+00', 'magiclink', '2026-01-10 22:05:58.327431+00', NULL, NULL, NULL, NULL, false),
	('e2ba5bb2-ff09-40b1-907b-9888f2412313', '3c372d1a-cb97-47ec-8771-c9255475fd05', '0b5e8103-675c-4a4f-81a8-3b468e80336e', 's256', 'GMKJdQ9wmwtAbq-FfuygOmPpPneZ8mDU05uWdLlHl9A', 'email', '', '', '2026-02-24 20:17:38.759971+00', '2026-02-24 20:17:38.759971+00', 'email/signup', NULL, NULL, NULL, NULL, NULL, false),
	('2b7cc70f-3906-4b88-8efd-bdc7837f71bb', '3c372d1a-cb97-47ec-8771-c9255475fd05', '7dcf8d6c-9fb7-4dcf-8d46-e33065ca19a8', 's256', 'rn8Ocixikt2GevyXU5mozEsTX0Z_OxsJvw6HUYkZZ34', 'magiclink', '', '', '2026-02-24 20:20:04.893868+00', '2026-02-24 20:20:04.893868+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('3e608f30-8583-4a3d-9f7a-fb4da3ccf343', '3c372d1a-cb97-47ec-8771-c9255475fd05', 'b7cc1216-5c96-4dd5-8a92-b34bd4e42a4d', 's256', 'qTSkr2zaX8rG0E-uOrE5murMGN1EMvGR8nt7-rhaE1o', 'magiclink', '', '', '2026-02-24 20:21:59.206185+00', '2026-02-24 20:21:59.206185+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('f405e70f-5c61-4fb9-9609-2dfce8b74bb0', 'ccd4d1aa-7b58-43b2-af0d-9ef133cb6e8b', '83fdf048-fa18-49a9-a64d-75e81697ed0c', 's256', 'M3gEirRooX5D6KyUZZ_M0FPqSJUYLjf7s31kXKO81No', 'email', '', '', '2026-01-13 00:06:43.60672+00', '2026-01-13 00:06:43.60672+00', 'email/signup', NULL, NULL, NULL, NULL, NULL, false),
	('7f672b98-bd62-46c1-801e-d9ae39b33801', '39f42000-5a85-4ca2-b968-11d29e4ab0bb', '1b1bc02a-235f-4dcd-9787-d3901d3a5c73', 's256', 'uwDd46NghqBzo9VZb8_mKodEnFtMbf-aTl2vgV252KA', 'email', '', '', '2026-01-13 00:27:49.960082+00', '2026-01-13 00:27:49.960082+00', 'email/signup', NULL, NULL, NULL, NULL, NULL, false),
	('8a903437-1c4c-4261-953e-74249594c481', NULL, '83f841d4-6935-43a1-ad95-0d9109a2cd26', 's256', '0vcLCWHRs-CIW69VlDbUKpRy40JJsNhWq01keIqFKDw', 'google', '', '', '2026-01-13 00:43:24.049019+00', '2026-01-13 00:43:24.049019+00', 'oauth', NULL, NULL, NULL, NULL, NULL, false),
	('0681ebe1-3de8-4b09-8ff6-c703b46b4d5c', '39f42000-5a85-4ca2-b968-11d29e4ab0bb', '4f24ae2d-39f9-4d33-81e8-ab14ecbee37b', 's256', 'HHzpI-z02_f3Dnh8RDkcaD5GyphsPq0a6AceY3-jQBY', 'magiclink', '', '', '2026-02-10 14:18:56.300126+00', '2026-02-10 14:18:56.300126+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('5760832f-acb9-4756-896a-d4a2742c4fbe', '1dbfe9da-170a-4094-9f62-5cec39aa7f05', '287b9f77-66fe-4887-8f80-6d34625189cd', 's256', 'RuWoEtIKPP8X4Ksq6RRtP5nNnYEM-fiK0ivfLviijBY', 'email', '', '', '2026-02-10 14:19:29.847256+00', '2026-02-10 14:19:29.847256+00', 'email/signup', NULL, NULL, NULL, NULL, NULL, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '1dbfe9da-170a-4094-9f62-5cec39aa7f05', 'authenticated', 'authenticated', 'hibavit272@manupay.com', '$2a$10$i64rPboa5MgqXcegTSMqOu8r4NXPr96glS2/HXTmJByQMYTzEv6T2', '2026-02-10 14:19:42.181641+00', NULL, '', '2026-02-10 14:19:29.847886+00', '', '2026-02-10 20:15:44.71227+00', '', '', NULL, '2026-02-10 20:16:13.178595+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "1dbfe9da-170a-4094-9f62-5cec39aa7f05", "email": "hibavit272@manupay.com", "email_verified": true, "phone_verified": false}', NULL, '2026-02-10 14:19:29.829164+00', '2026-02-10 20:16:13.190501+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '39f42000-5a85-4ca2-b968-11d29e4ab0bb', 'authenticated', 'authenticated', 'javoy59363@akixpres.com', '$2a$10$OzyfllgKtdmAgFfIsR97cOOVeo9nr.7rsJuDM8BGTJunywsGB1bEy', '2026-01-13 00:28:13.070636+00', NULL, '', '2026-01-13 00:27:49.962005+00', 'pkce_8f0368165bb16a86592e8eee0987709affc25739829d1083f39e8894', '2026-02-10 14:18:56.322153+00', '', '', NULL, '2026-01-13 00:41:49.973268+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "39f42000-5a85-4ca2-b968-11d29e4ab0bb", "email": "javoy59363@akixpres.com", "email_verified": true, "phone_verified": false}', NULL, '2026-01-13 00:27:49.951605+00', '2026-02-10 14:18:57.462371+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '36c25001-4fb6-48cd-9de4-92727288d66f', 'authenticated', 'authenticated', 'lord13yron80@gmail.com', NULL, '2026-01-13 00:27:04.270746+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-02-25 20:28:15.856774+00', '{"provider": "google", "providers": ["google"]}', '{"iss": "https://accounts.google.com", "sub": "102072499003233634069", "name": "Byron Hayes", "email": "lord13yron80@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocIWWiQoFUbakTS7nTSNKy_QL2U_nWKo6DuAjjt7W6DZU5GMxw=s96-c", "full_name": "Byron Hayes", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocIWWiQoFUbakTS7nTSNKy_QL2U_nWKo6DuAjjt7W6DZU5GMxw=s96-c", "provider_id": "102072499003233634069", "email_verified": true, "phone_verified": false}', NULL, '2026-01-13 00:27:04.253321+00', '2026-03-01 17:43:36.961518+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '3c372d1a-cb97-47ec-8771-c9255475fd05', 'authenticated', 'authenticated', 'werib74329@ostahie.com', '$2a$10$6SBFtltYXdzm81pEiW0t0u6HSrXAxqkFL5Hmi5WpFVwS6VvZWznH6', '2026-02-24 20:18:26.787435+00', NULL, '', '2026-02-24 20:17:38.762534+00', 'pkce_2175f97c784f805abd5347a565d077f47b540f9a1d89cb0c058f1dca', '2026-02-24 20:21:59.225699+00', '', '', NULL, '2026-02-24 20:18:26.792044+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "3c372d1a-cb97-47ec-8771-c9255475fd05", "email": "werib74329@ostahie.com", "email_verified": true, "phone_verified": false}', NULL, '2026-02-24 20:17:38.720073+00', '2026-02-24 20:22:00.35686+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('3c372d1a-cb97-47ec-8771-c9255475fd05', '3c372d1a-cb97-47ec-8771-c9255475fd05', '{"sub": "3c372d1a-cb97-47ec-8771-c9255475fd05", "email": "werib74329@ostahie.com", "email_verified": true, "phone_verified": false}', 'email', '2026-02-24 20:17:38.751697+00', '2026-02-24 20:17:38.751745+00', '2026-02-24 20:17:38.751745+00', 'af93e895-0d3b-4f6a-8707-daff6e5cefac'),
	('39f42000-5a85-4ca2-b968-11d29e4ab0bb', '39f42000-5a85-4ca2-b968-11d29e4ab0bb', '{"sub": "39f42000-5a85-4ca2-b968-11d29e4ab0bb", "email": "javoy59363@akixpres.com", "email_verified": true, "phone_verified": false}', 'email', '2026-01-13 00:27:49.956533+00', '2026-01-13 00:27:49.956579+00', '2026-01-13 00:27:49.956579+00', 'e8b3a55d-f5aa-45c6-8152-243883f88415'),
	('1dbfe9da-170a-4094-9f62-5cec39aa7f05', '1dbfe9da-170a-4094-9f62-5cec39aa7f05', '{"sub": "1dbfe9da-170a-4094-9f62-5cec39aa7f05", "email": "hibavit272@manupay.com", "email_verified": true, "phone_verified": false}', 'email', '2026-02-10 14:19:29.842805+00', '2026-02-10 14:19:29.842853+00', '2026-02-10 14:19:29.842853+00', '6c4257ca-90e7-48f1-b101-8c5819c991b3'),
	('102072499003233634069', '36c25001-4fb6-48cd-9de4-92727288d66f', '{"iss": "https://accounts.google.com", "sub": "102072499003233634069", "name": "Byron Hayes", "email": "lord13yron80@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocIWWiQoFUbakTS7nTSNKy_QL2U_nWKo6DuAjjt7W6DZU5GMxw=s96-c", "full_name": "Byron Hayes", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocIWWiQoFUbakTS7nTSNKy_QL2U_nWKo6DuAjjt7W6DZU5GMxw=s96-c", "provider_id": "102072499003233634069", "email_verified": true, "phone_verified": false}', 'google', '2026-01-13 00:27:04.261262+00', '2026-01-13 00:27:04.262543+00', '2026-02-25 20:28:15.476231+00', '593b1d06-4e7f-4790-8ffb-7f26c0a53118');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") VALUES
	('99c11ae9-ca84-4ccd-ade7-408d89e1a441', '36c25001-4fb6-48cd-9de4-92727288d66f', '2026-02-25 20:28:15.85794+00', '2026-03-01 17:43:36.981764+00', NULL, 'aal1', NULL, '2026-03-01 17:43:36.981643', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', '205.250.237.19', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('99c11ae9-ca84-4ccd-ade7-408d89e1a441', '2026-02-25 20:28:15.906759+00', '2026-02-25 20:28:15.906759+00', 'oauth', '249c4dbf-3970-45da-8228-0154fa6ee32e');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."one_time_tokens" ("id", "user_id", "token_type", "token_hash", "relates_to", "created_at", "updated_at") VALUES
	('d58696fc-c0fc-48f8-97cc-f5d8c5f1533b', '39f42000-5a85-4ca2-b968-11d29e4ab0bb', 'recovery_token', 'pkce_8f0368165bb16a86592e8eee0987709affc25739829d1083f39e8894', 'javoy59363@akixpres.com', '2026-02-10 14:18:57.488885', '2026-02-10 14:18:57.488885'),
	('a38475c3-52b1-453d-9815-7dfb6ec75306', '3c372d1a-cb97-47ec-8771-c9255475fd05', 'recovery_token', 'pkce_2175f97c784f805abd5347a565d077f47b540f9a1d89cb0c058f1dca', 'werib74329@ostahie.com', '2026-02-24 20:22:00.367416', '2026-02-24 20:22:00.367416');


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 148, '25kyzcnuqipp', '36c25001-4fb6-48cd-9de4-92727288d66f', true, '2026-02-25 20:28:15.876854+00', '2026-02-25 22:49:17.957307+00', NULL, '99c11ae9-ca84-4ccd-ade7-408d89e1a441'),
	('00000000-0000-0000-0000-000000000000', 149, '7payhsnbivc3', '36c25001-4fb6-48cd-9de4-92727288d66f', true, '2026-02-25 22:49:17.986278+00', '2026-02-26 14:11:22.700995+00', '25kyzcnuqipp', '99c11ae9-ca84-4ccd-ade7-408d89e1a441'),
	('00000000-0000-0000-0000-000000000000', 150, 'nwbj7wgzjrwg', '36c25001-4fb6-48cd-9de4-92727288d66f', true, '2026-02-26 14:11:22.730824+00', '2026-02-26 20:26:44.778087+00', '7payhsnbivc3', '99c11ae9-ca84-4ccd-ade7-408d89e1a441'),
	('00000000-0000-0000-0000-000000000000', 151, '27ylpgdkesq2', '36c25001-4fb6-48cd-9de4-92727288d66f', true, '2026-02-26 20:26:44.811187+00', '2026-02-27 14:03:57.403578+00', 'nwbj7wgzjrwg', '99c11ae9-ca84-4ccd-ade7-408d89e1a441'),
	('00000000-0000-0000-0000-000000000000', 152, 'x2pqcafe3wq7', '36c25001-4fb6-48cd-9de4-92727288d66f', true, '2026-02-27 14:03:57.428054+00', '2026-02-27 20:10:50.508932+00', '27ylpgdkesq2', '99c11ae9-ca84-4ccd-ade7-408d89e1a441'),
	('00000000-0000-0000-0000-000000000000', 153, 'bd6oqbjfyha2', '36c25001-4fb6-48cd-9de4-92727288d66f', true, '2026-02-27 20:10:50.54255+00', '2026-02-27 22:33:10.379414+00', 'x2pqcafe3wq7', '99c11ae9-ca84-4ccd-ade7-408d89e1a441'),
	('00000000-0000-0000-0000-000000000000', 154, 'yrkdlss43jmv', '36c25001-4fb6-48cd-9de4-92727288d66f', true, '2026-02-27 22:33:10.431208+00', '2026-02-28 20:59:22.160173+00', 'bd6oqbjfyha2', '99c11ae9-ca84-4ccd-ade7-408d89e1a441'),
	('00000000-0000-0000-0000-000000000000', 155, '3nqu2jxfsb2h', '36c25001-4fb6-48cd-9de4-92727288d66f', true, '2026-02-28 20:59:22.194294+00', '2026-02-28 21:57:51.876212+00', 'yrkdlss43jmv', '99c11ae9-ca84-4ccd-ade7-408d89e1a441'),
	('00000000-0000-0000-0000-000000000000', 156, 'skf5irb7hrtp', '36c25001-4fb6-48cd-9de4-92727288d66f', true, '2026-02-28 21:57:51.895812+00', '2026-02-28 22:56:21.966429+00', '3nqu2jxfsb2h', '99c11ae9-ca84-4ccd-ade7-408d89e1a441'),
	('00000000-0000-0000-0000-000000000000', 157, '7i6y3eqtgvh7', '36c25001-4fb6-48cd-9de4-92727288d66f', true, '2026-02-28 22:56:21.9783+00', '2026-02-28 23:54:22.026214+00', 'skf5irb7hrtp', '99c11ae9-ca84-4ccd-ade7-408d89e1a441'),
	('00000000-0000-0000-0000-000000000000', 158, 'jjtw2xtwxndf', '36c25001-4fb6-48cd-9de4-92727288d66f', true, '2026-02-28 23:54:22.043496+00', '2026-03-01 00:52:52.043864+00', '7i6y3eqtgvh7', '99c11ae9-ca84-4ccd-ade7-408d89e1a441'),
	('00000000-0000-0000-0000-000000000000', 159, 'ddqpml7rcvoq', '36c25001-4fb6-48cd-9de4-92727288d66f', true, '2026-03-01 00:52:52.073923+00', '2026-03-01 01:51:21.880836+00', 'jjtw2xtwxndf', '99c11ae9-ca84-4ccd-ade7-408d89e1a441'),
	('00000000-0000-0000-0000-000000000000', 160, 'fgn37nalr7ny', '36c25001-4fb6-48cd-9de4-92727288d66f', true, '2026-03-01 01:51:21.896094+00', '2026-03-01 17:43:36.910552+00', 'ddqpml7rcvoq', '99c11ae9-ca84-4ccd-ade7-408d89e1a441'),
	('00000000-0000-0000-0000-000000000000', 161, 'l4xdv4lu4otv', '36c25001-4fb6-48cd-9de4-92727288d66f', false, '2026-03-01 17:43:36.945398+00', '2026-03-01 17:43:36.945398+00', 'fgn37nalr7ny', '99c11ae9-ca84-4ccd-ade7-408d89e1a441');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: climbs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."climbs" ("id", "created_at", "name", "grade", "city", "area", "subArea", "type") VALUES
	(213, '2025-03-30 23:55:14.124829+00', 'Short traverse #1', '4', 'Vernon', 'Ellison prov. park', 'Lakeside', 'boulder'),
	(214, '2025-03-30 23:55:38.899694+00', 'Mr. squeezy', '1', 'Vernon', 'Ellison prov. park', 'Lakeside', 'boulder'),
	(215, '2025-03-30 23:56:07.577978+00', 'Short traverse #2', '4', 'Vernon', 'Ellison prov. park', 'Lakeside', 'boulder'),
	(216, '2025-03-30 23:56:37.064377+00', 'Johnny''s problem', '6', 'Vernon', 'Ellison prov. park', 'Lakeside', 'boulder'),
	(217, '2025-03-30 23:57:01.439127+00', 'Old school', '1', 'Vernon', 'Ellison prov. park', 'Lakeside', 'boulder'),
	(218, '2025-03-30 23:57:30.245148+00', 'The circuit', '1', 'Vernon', 'Ellison prov. park', 'Lakeside', 'boulder'),
	(219, '2025-03-30 23:57:55.023684+00', 'Ass bomb', '3', 'Vernon', 'Ellison prov. park', 'Lakeside', 'boulder'),
	(220, '2025-03-30 23:59:22.110621+00', 'Corner crack', '0', 'Penticton', 'The slayers', 'The slayers', 'boulder'),
	(221, '2025-03-30 23:59:53.919661+00', 'Aretes for days', '0', 'Penticton', 'The slayers', 'The slayers', 'boulder'),
	(222, '2025-03-31 00:00:48.962151+00', 'Marie', '2', 'Penticton', 'The slayers', 'The slayers', 'boulder'),
	(224, '2025-03-31 00:01:47.213961+00', 'Skull traverse', '4', 'Penticton', 'The slayers', 'The slayers', 'boulder'),
	(225, '2025-03-31 00:02:16.336571+00', 'Scotty rod holder', '6', 'Penticton', 'The slayers', 'The slayers', 'boulder'),
	(227, '2025-03-31 00:03:51.301692+00', 'The low down', '0', 'Penticton', 'Skaha', 'Chillhaus', 'boulder'),
	(228, '2025-03-31 00:04:20.205492+00', 'The down low', '0', 'Penticton', 'Skaha', 'Chillhaus', 'boulder'),
	(229, '2025-03-31 00:04:41.056932+00', 'Low profile', '1', 'Penticton', 'Skaha', 'Chillhaus', 'boulder'),
	(230, '2025-03-31 00:05:01.906222+00', 'Low key', '0', 'Penticton', 'Skaha', 'Chillhaus', 'boulder'),
	(231, '2025-03-31 00:05:23.95377+00', 'Low blow', '0', 'Penticton', 'Skaha', 'Chillhaus', 'boulder'),
	(232, '2025-03-31 00:05:43.4592+00', 'Too low traverse', '3', 'Penticton', 'Skaha', 'Chillhaus', 'boulder'),
	(233, '2025-03-31 00:06:04.703044+00', 'Flying low', '0', 'Penticton', 'Skaha', 'Chillhaus', 'boulder'),
	(234, '2025-03-31 00:06:27.200704+00', 'Rat trap diner', '1', 'Penticton', 'Skaha', 'Chillhaus', 'boulder'),
	(235, '2025-03-31 00:06:45.104516+00', 'Alpine nicknjan', '2', 'Penticton', 'Skaha', 'Chillhaus', 'boulder'),
	(236, '2025-03-31 00:07:02.170296+00', 'Long arm of the law', '1', 'Penticton', 'Skaha', 'Chillhaus', 'boulder'),
	(237, '2025-03-31 00:07:21.144867+00', 'Solitary confinement', '2', 'Penticton', 'Skaha', 'Chillhaus', 'boulder'),
	(238, '2025-03-31 00:07:39.02661+00', 'Dental dam', '0', 'Penticton', 'Skaha', 'Chillhaus', 'boulder'),
	(239, '2025-03-31 00:08:06.571942+00', 'Conjugal visit', '1', 'Penticton', 'Skaha', 'Chillhaus', 'boulder'),
	(240, '2025-03-31 00:08:26.485108+00', 'Prison romance', '0', 'Penticton', 'Skaha', 'Chillhaus', 'boulder'),
	(241, '2025-03-31 00:08:50.02786+00', 'Sissy shiv', '0', 'Penticton', 'Skaha', 'Chillhaus', 'boulder'),
	(14, '2025-01-21 00:49:25.757805+00', 'Empire Strikes Back', '8', 'Kelowna', 'Boulderfields', 'Evil Empire', 'boulder'),
	(16, '2025-01-22 14:19:29.991002+00', 'Le toit de cul du chien', '6', 'Fontainbleau', 'Fontainbleau', 'Cul de chien', 'boulder'),
	(17, '2025-01-23 00:46:17.467872+00', 'Easy in an Easy Chair', '4', 'Squamish', 'Grand Wall', 'Easy Chair', 'boulder'),
	(18, '2025-01-23 02:32:50.400665+00', 'Evil Empire', '6', 'Kelowna', 'Boulderfields', 'Evil Empire', 'boulder'),
	(19, '2025-01-23 03:47:13.005856+00', 'Dangleberries', '6', 'Kelowna', 'Boulderfields', 'Dominator', 'boulder'),
	(21, '2025-02-18 14:35:06.037795+00', 'The mistress', '10', 'Vernon', 'Cougar Canyon', 'Moss Hollow', 'boulder'),
	(23, '2025-02-18 20:25:59.406692+00', 'Intricate simplicity', '10', 'Kelowna', 'Boulderfields', 'Chutes & ladders', 'boulder'),
	(29, '2025-02-19 14:03:18.32151+00', '4 horsemen', '4', 'Kelowna', 'Boulderfields', 'Dominator', 'boulder'),
	(30, '2025-02-27 02:11:27.466746+00', 'Butterscotch ripple', '3', 'Kelowna', 'Boulderfields', 'Distillery', 'boulder'),
	(31, '2025-02-27 02:20:09.248888+00', 'Spaghetti', '2', 'Fontainebleau', 'Fontainebleau', 'Canche aux merciers', 'boulder'),
	(32, '2025-02-27 02:22:53.181603+00', 'Tir a l''arc', '0', 'Fontainebleau', 'Fontainebleau', 'Canche aux merciers', 'boulder'),
	(33, '2025-02-27 02:28:55.24137+00', 'Bangor', '2', 'Bangor', 'Gorlan (the sheeps pen)', 'First block', 'boulder'),
	(34, '2025-02-27 02:34:17.161968+00', 'The pinch', '7', 'Bangor', 'Gorlan (the sheeps pen)', 'Pinch block', 'boulder'),
	(35, '2025-02-27 02:38:10.440474+00', 'Donny', '5', 'Penticton', 'The slayers', 'The slayers', 'boulder'),
	(36, '2025-02-27 02:44:09.101951+00', 'Toughie', '8', 'Penticton', 'The slayers', 'The slayers', 'boulder'),
	(37, '2025-02-27 02:48:44.200846+00', 'Majestic', '6', 'Squamish', 'Britannia beach', 'Britannia beach', 'boulder'),
	(38, '2025-02-27 02:52:00.120253+00', 'Minor threat', '6', 'Squamish', 'Grand wall', 'Easy chair', 'boulder'),
	(86, '2025-03-11 01:48:04.696035+00', 'Shark biscuit', '7', 'Kelowna', 'Boulderfields', 'Surf', 'boulder'),
	(88, '2025-03-11 01:57:03.397156+00', 'Ellison traverse', '4', 'Vernon', 'Ellison provincial park', 'Lakeside', 'boulder'),
	(89, '2025-03-11 02:00:31.058459+00', 'Static dyno', '4', 'Vernon', 'Cougar canyon', 'Moss hollow', 'boulder'),
	(90, '2025-03-11 02:05:27.391354+00', 'Exit ramp', '0', 'Kelowna', 'Boulderfields', 'F1', 'boulder'),
	(91, '2025-03-11 02:06:24.680708+00', 'Nelly’s thin thins', '4', 'Kelowna', 'Boulderfields', 'F1', 'boulder'),
	(92, '2025-03-11 02:07:12.188746+00', 'V-power', '7', 'Kelowna ', 'Boulderfields ', 'F1', 'boulder'),
	(93, '2025-03-11 02:08:02.733593+00', 'Bravo', '1', 'Kelowna', 'Boulderfields', 'F1', 'boulder'),
	(94, '2025-03-11 02:08:59.583009+00', 'Sausage pickle 2000.com', '0', 'Kelowna', 'Boulderfields', 'F1', 'boulder'),
	(95, '2025-03-11 02:09:35.077053+00', 'Push it to the max', '2', 'Kelowna', 'Boulderfields', 'F1', 'boulder'),
	(96, '2025-03-11 02:10:03.468381+00', 'Little chubby', '0', 'Kelowna', 'Boulderfields', 'F1', 'boulder'),
	(97, '2025-03-11 02:10:37.886938+00', 'The pant pisser', '1', 'Kelowna', 'Boulderfields', 'F1', 'boulder'),
	(98, '2025-03-11 02:11:20.860959+00', '1/2 chub morning wheezer', '2', 'Kelowna', 'Boulderfields', 'F1', 'boulder'),
	(99, '2025-03-11 02:12:10.905944+00', 'Full chub morning wheezer', '6', 'Kelowna', 'Boulderfields', 'F1', 'boulder'),
	(100, '2025-03-11 02:13:48.047582+00', 'Walking on sunshine', '0', 'Kelowna', 'Boulderfields', 'Feel good', 'boulder'),
	(102, '2025-03-11 02:14:53.730743+00', 'Fluffy kitty', '1', 'Kelowna', 'Boulderfields', 'Feel good', 'boulder'),
	(103, '2025-03-11 02:15:24.13862+00', 'Swell', '1', 'Kelowna', 'Boulderfields', 'Feel good', 'boulder'),
	(104, '2025-03-11 02:17:08.937137+00', 'Old school', '1', 'Kelowna', 'Boulderfields', 'Surf', 'boulder'),
	(105, '2025-03-11 02:17:43.513615+00', 'Meat pickle', '3', 'Kelowna', 'Boulderfields', 'Surf', 'boulder'),
	(106, '2025-03-11 02:18:24.922139+00', 'Slashed snake bite', '4', 'Kelowna', 'Boulderfields', 'Surf', 'boulder'),
	(107, '2025-03-11 02:18:54.590645+00', 'Surf highball', '1', 'Kelowna', 'Boulderfields', 'Surf', 'boulder'),
	(108, '2025-03-11 02:19:27.123623+00', 'The circuit', '1', 'Kelowna', 'Boulderfields', 'Surf', 'boulder'),
	(109, '2025-03-11 02:19:55.582819+00', 'Round one', '1', 'Kelowna', 'Boulderfields', 'Surf', 'boulder'),
	(110, '2025-03-11 02:20:55.640529+00', 'The chipper', '1', 'Kelowna', 'Boulderfields', 'Surf', 'boulder'),
	(111, '2025-03-11 02:21:29.547038+00', 'And another one', '1', 'Kelowna', 'Boulderfields', 'Surf', 'boulder'),
	(112, '2025-03-11 02:22:03.446597+00', 'Surf’s up', '4', 'Kelowna', 'Boulderfields', 'Surf', 'boulder'),
	(113, '2025-03-11 02:22:31.286204+00', 'Surf arete', '7', 'Kelowna', 'Boulderfields', 'Surf', 'boulder'),
	(114, '2025-03-11 02:23:10.665481+00', 'Pumpkin pie', '4', 'Kelowna', 'Boulderfields', 'Surf', 'boulder'),
	(115, '2025-03-11 02:23:43.201163+00', 'Apple pie', '4', 'Kelowna', 'Boulderfields', 'Surf', 'boulder'),
	(116, '2025-03-11 02:25:03.441087+00', 'Ladybug strikes back', '2', 'Kelowna', 'Boulderfields', 'Ladybug', 'boulder'),
	(117, '2025-03-11 02:25:37.664727+00', 'New kid on the block', '2', 'Kelowna', 'Boulderfields', 'Ladybug', 'boulder'),
	(118, '2025-03-11 02:26:15.147139+00', 'Lola ladybug', '1', 'Kelowna', 'Boulderfields', 'Ladybug', 'boulder'),
	(119, '2025-03-11 02:26:51.304649+00', 'Lazy ladybug', '3', 'Kelowna', 'Boulderfields', 'Ladybug', 'boulder'),
	(120, '2025-03-11 02:29:05.26282+00', 'Darwin', '0', 'Kelowna', 'Boulderfields', 'Dark prince', 'boulder'),
	(121, '2025-03-11 02:29:34.165273+00', 'Douglass', '0', 'Kelowna', 'Boulderfields', 'Dark prince', 'boulder'),
	(122, '2025-03-11 02:30:16.566572+00', 'Manger danger', '2', 'Kelowna', 'Boulderfields', 'Dark prince', 'boulder'),
	(123, '2025-03-11 02:31:00.250827+00', 'Baby jesus can’t crimp', '1', 'Kelowna', 'Boulderfields', 'Dark prince', 'boulder'),
	(124, '2025-03-11 02:31:41.355697+00', 'Dark prince righter', '4', 'Kelowna', 'Boulderfields', 'Dark prince', 'boulder'),
	(125, '2025-03-11 02:32:16.301556+00', 'Dark prince left', '3', 'Kelowna', 'Boulderfields', 'Dark prince', 'boulder'),
	(126, '2025-03-11 02:32:59.647497+00', 'Lighting strikes', '1', 'Kelowna', 'Boulderfields', 'Dark prince', 'boulder'),
	(127, '2025-03-11 02:33:31.677443+00', 'Thunder rolls', '1', 'Kelowna', 'Boulderfields', 'Dark prince', 'boulder'),
	(128, '2025-03-11 02:34:10.961449+00', 'Calm before the storm left', '0', 'Kelowna', 'Boulderfields', 'Dark prince', 'boulder'),
	(129, '2025-03-11 02:34:46.895577+00', 'Calm before the storm right', '0', 'Kelowna', 'Boulderfields', 'Dark prince', 'boulder'),
	(130, '2025-03-11 02:35:49.1038+00', 'Big crimpin’', '7', 'Kelowna', 'Boulderfields', 'Evil empire', 'boulder'),
	(131, '2025-03-11 02:36:34.460052+00', 'Old man mountain', '2', 'Kelowna', 'Boulderfields', 'Evil empire', 'boulder'),
	(132, '2025-03-11 02:37:12.005725+00', 'Connoisseur pinch', '3', 'Kelowna', 'Boulderfields', 'Evil empire', 'boulder'),
	(134, '2025-03-13 03:06:01.783097+00', 'Triceratops', '0', 'Kelowna', 'Boulderfields', 'Cave dweller', 'boulder'),
	(135, '2025-03-13 03:06:36.866822+00', 'T-rex', '0', 'Kelowna', 'Boulderfields', 'Cave dweller', 'boulder'),
	(136, '2025-03-13 03:07:22.725546+00', 'Cave dweller', '4', 'Kelowna', 'Boulderfields', 'Cave dweller', 'boulder'),
	(137, '2025-03-13 03:08:06.479523+00', 'Ribrageous', '4', 'Kelowna', 'Boulderfields', 'Cave dweller', 'boulder'),
	(138, '2025-03-13 03:08:55.489085+00', 'Baby slab arete', '0', 'Kelowna', 'Boulderfields', 'Cave dweller', 'boulder'),
	(139, '2025-03-13 03:09:33.267843+00', 'Baby slab', '1', 'Kelowna', 'Boulderfields', 'Cave dweller', 'boulder'),
	(140, '2025-03-13 03:10:10.002635+00', 'Onedercling', '1', 'Kelowna', 'Boulderfields', 'Cave dweller', 'boulder'),
	(141, '2025-03-13 03:10:39.324663+00', 'Fill the gap', '2', 'Kelowna', 'Boulderfields', 'Cave dweller', 'boulder'),
	(142, '2025-03-13 03:11:12.85674+00', 'My latest mistake', '3', 'Kelowna', 'Boulderfields', 'Cave dweller', 'boulder'),
	(143, '2025-03-13 03:12:33.567307+00', 'Cow bear', '2', 'Kelowna', 'Boulderfields', 'Driven', 'boulder'),
	(144, '2025-03-13 03:13:34.323329+00', 'Animal house', '3', 'Kelowna', 'Boulderfields', 'Just go climb', 'boulder'),
	(145, '2025-03-13 03:16:11.228764+00', 'Fool’s gold', '1', 'Kelowna', 'Boulderfields', 'Golden hour', 'boulder'),
	(146, '2025-03-13 03:16:45.306536+00', 'Gold dust ', '1', 'Kelowna', 'Boulderfields', 'Golden hour', 'boulder'),
	(147, '2025-03-13 03:17:20.20899+00', 'Goldie hawn', '0', 'Kelowna', 'Boulderfields', 'Golden hour', 'boulder'),
	(148, '2025-03-13 03:18:00.695882+00', 'Okee dokee', '1', 'Kelowna', 'Boulderfields', 'Golden hour', 'boulder'),
	(149, '2025-03-13 03:18:38.332633+00', 'Easy peezy', '0', 'Kelowna', 'Boulderfields', 'Golden hour', 'boulder'),
	(150, '2025-03-13 03:19:09.990437+00', 'We’ve got time', '3', 'Kelowna', 'Boulderfields', 'Golden hour', 'boulder'),
	(151, '2025-03-16 00:20:44.321799+00', 'Tie my rope', '1', 'Kelowna', 'Boulderfields', 'Dominator', 'boulder'),
	(152, '2025-03-16 00:21:25.834852+00', 'Whips and chains', '3', 'Kelowna', 'Boulderfields', 'Dominator', 'boulder'),
	(153, '2025-03-16 00:22:20.971414+00', 'Matt’s crack', '2', 'Kelowna', 'Boulderfields', 'Dominator', 'boulder'),
	(154, '2025-03-17 03:14:54.690497+00', 'Tatonka', '9', 'Squamish', 'Apron', 'Descent trail', 'boulder'),
	(155, '2025-03-17 03:15:53.675027+00', 'The seam', '10', 'Squamish', 'Grand wall', 'Superfly', 'boulder'),
	(156, '2025-03-17 03:16:40.635006+00', 'Resurrection', '9', 'Squamish', 'North wall', 'The farm', 'boulder'),
	(157, '2025-03-30 00:49:14.661849+00', 'Littlun', '2', 'Vernon', 'Cougar canyon', 'Moss hollow', 'boulder'),
	(158, '2025-03-30 00:50:04.311261+00', 'The wee chipee', '6', 'Vernon', 'Cougar canyon', 'Moss hollow', 'boulder'),
	(159, '2025-03-30 00:51:11.781007+00', 'Thunderbow', '5', 'Vernon', 'Cougar canyon', 'Thunderbow', 'boulder'),
	(160, '2025-03-30 23:26:04.467307+00', 'Nothing like viper', '4', 'Kelowna', 'Boulderfields', 'Nothing like viper', 'boulder'),
	(161, '2025-03-30 23:27:36.627281+00', 'Street shoes', '0', 'Kelowna', 'Boulderfields', 'Nothing like viper', 'boulder'),
	(162, '2025-03-30 23:27:59.814845+00', 'Straight off the streets', '2', 'Kelowna', 'Boulderfields', 'Nothing like viper', 'boulder'),
	(164, '2025-03-30 23:29:59.148999+00', 'Word to your mother', '3', 'Kelowna', 'Boulderfields', 'Chutes & ladders', 'boulder'),
	(165, '2025-03-30 23:31:44.773984+00', 'Stairway to nowhere', '2', 'Kelowna', 'The ruins', 'The ruins', 'boulder'),
	(166, '2025-03-30 23:32:16.189594+00', 'Hammer time', '0', 'Kelowna', 'The ruins', 'The ruins', 'boulder'),
	(167, '2025-03-30 23:32:37.175478+00', 'Whizz kid', '0', 'Kelowna', 'The ruins', 'The ruins', 'boulder'),
	(168, '2025-03-30 23:32:58.504938+00', 'Trouble for midgets', '0', 'Kelowna', 'The ruins', 'The ruins', 'boulder'),
	(169, '2025-03-30 23:33:22.010815+00', 'Punk-ass kid', '3', 'Kelowna', 'The ruins', 'The ruins', 'boulder'),
	(170, '2025-03-30 23:33:46.410389+00', 'No can do', '2', 'Kelowna', 'The ruins', 'The ruins', 'boulder'),
	(171, '2025-03-30 23:34:04.181012+00', 'No brains', '0', 'Kelowna', 'The ruins', 'The ruins', 'boulder'),
	(172, '2025-03-30 23:34:25.076249+00', 'Bully', '1', 'Kelowna', 'The ruins', 'The ruins', 'boulder'),
	(173, '2025-03-30 23:34:43.442587+00', 'Joe dirt', '0', 'Kelowna', 'The ruins', 'The ruins', 'boulder'),
	(174, '2025-03-30 23:35:04.605666+00', 'Dirty deeds', '2', 'Kelowna', 'The ruins', 'The ruins', 'boulder'),
	(175, '2025-03-30 23:35:20.535411+00', 'Pay dirt', '2', 'Kelowna', 'The ruins', 'The ruins', 'boulder'),
	(176, '2025-03-30 23:35:39.574811+00', 'Over easy', '0', 'Kelowna', 'The ruins', 'The ruins', 'boulder'),
	(177, '2025-03-30 23:35:56.314635+00', 'The juice is loose', '2', 'Kelowna', 'The ruins', 'The ruins', 'boulder'),
	(178, '2025-03-30 23:36:14.914077+00', 'Middle monk', '2', 'Kelowna', 'The ruins', 'The ruins', 'boulder'),
	(179, '2025-03-30 23:36:33.698642+00', 'Buddha''s belly', '2', 'Kelowna', 'The ruins', 'The ruins', 'boulder'),
	(180, '2025-03-30 23:36:49.804552+00', 'Buddha''s belly variation', '5', 'Kelowna', 'The ruins', 'The ruins', 'boulder'),
	(181, '2025-03-30 23:37:08.983026+00', 'Hyde', '1', 'Kelowna', 'The ruins', 'The ruins', 'boulder'),
	(182, '2025-03-30 23:37:26.464644+00', 'Nacho man', '2', 'Kelowna', 'The ruins', 'The ruins', 'boulder'),
	(183, '2025-03-30 23:37:49.311546+00', 'Danger zone', '0', 'Kelowna', 'The ruins', 'The ruins', 'boulder'),
	(184, '2025-03-30 23:38:20.89314+00', 'Ripply cheeks', '0', 'Kelowna', 'The ruins', 'The ruins', 'boulder'),
	(185, '2025-03-30 23:39:07.566102+00', 'Pocket pool', '5', 'Kelowna', 'Pebble beach', 'Pebble overhang', 'boulder'),
	(186, '2025-03-30 23:39:38.317428+00', 'S on my d', '1', 'Kelowna', 'Pebble beach', 'Pebble overhang', 'boulder'),
	(187, '2025-03-30 23:39:59.775351+00', 'One eyed monster', '1', 'Kelowna', 'Pebble beach', 'Pebble overhang', 'boulder'),
	(188, '2025-03-30 23:40:29.053563+00', 'Just a brother day', '1', 'Kelowna', 'Pebble beach', 'South beach', 'boulder'),
	(189, '2025-03-30 23:40:53.347597+00', 'Bro-down, show-down', '2', 'Kelowna', 'Pebble beach', 'South beach', 'boulder'),
	(190, '2025-03-30 23:42:22.55933+00', 'Jaws', '4', 'Vernon', 'Cougar canyon', 'Moss hollow', 'boulder'),
	(191, '2025-03-30 23:42:54.779435+00', 'The executioner', '2', 'Vernon', 'Cougar canyon', 'Moss hollow', 'boulder'),
	(192, '2025-03-30 23:43:17.516066+00', 'Mini-me', '0', 'Vernon', 'Cougar canyon', 'Moss hollow', 'boulder'),
	(193, '2025-03-30 23:43:38.044906+00', 'The short one', '1', 'Vernon', 'Cougar canyon', 'Moss hollow', 'boulder'),
	(195, '2025-03-30 23:44:25.661924+00', 'Wisdom tooth', '2', 'Vernon', 'Cougar canyon', 'Moss hollow', 'boulder'),
	(196, '2025-03-30 23:44:47.17523+00', 'Old grey balls', '0', 'Vernon', 'Cougar canyon', 'Moss hollow', 'boulder'),
	(197, '2025-03-30 23:45:07.961058+00', 'Old grey balls low', '2', 'Vernon', 'Cougar canyon', 'Moss hollow', 'boulder'),
	(198, '2025-03-30 23:45:29.501889+00', 'Johnny''s jam', '3', 'Vernon', 'Cougar canyon', 'Moss hollow', 'boulder'),
	(199, '2025-03-30 23:45:55.309802+00', 'The warm up cave', '1', 'Vernon', 'Cougar canyon', 'Moss hollow', 'boulder'),
	(201, '2025-03-30 23:46:40.830734+00', 'Asa', '6', 'Vernon', 'Cougar canyon', 'Moss hollow', 'boulder'),
	(202, '2025-03-30 23:47:53.372552+00', 'The reach around', '0', 'Vernon', 'Cougar canyon', 'Thunderbow', 'boulder'),
	(203, '2025-03-30 23:48:28.107544+00', 'Stop short', '2', 'Vernon', 'Cougar canyon', 'Thunderbow', 'boulder'),
	(204, '2025-03-30 23:49:07.234342+00', 'Seams right', '1', 'Vernon', 'Cougar canyon', 'Thunderbow', 'boulder'),
	(205, '2025-03-30 23:49:39.365265+00', 'Down under', '7', 'Vernon', 'Cougar canyon', 'Down under', 'boulder'),
	(206, '2025-03-30 23:51:20.936606+00', 'Slability', '0', 'Vernon', 'Ellison prov. park', 'Gettin'' hitched', 'boulder'),
	(207, '2025-03-30 23:51:48.194201+00', 'Slabuse', '2', 'Vernon', 'Ellison prov. park', 'Gettin'' hitched', 'boulder'),
	(208, '2025-03-30 23:52:56.131342+00', 'Sport start', '0', 'Vernon', 'Ellison prov. park', 'Lakeside', 'boulder'),
	(209, '2025-03-30 23:53:24.749323+00', 'The ellison traverse', '4', 'Vernon', 'Ellison prov. park', 'Lakeside', 'boulder'),
	(210, '2025-03-30 23:53:52.673668+00', 'Trending left', '1', 'Vernon', 'Ellison prov. park', 'Lakeside', 'boulder'),
	(211, '2025-03-30 23:54:16.851536+00', 'To the lip', '1', 'Vernon', 'Ellison prov. park', 'Lakeside', 'boulder'),
	(212, '2025-03-30 23:54:46.210162+00', 'The contrivance', '2', 'Vernon', 'Ellison prov. park', 'Lakeside', 'boulder'),
	(242, '2025-03-31 00:09:10.609849+00', 'Girl drink drunk tank', '0', 'Penticton', 'Skaha', 'Chillhaus', 'boulder'),
	(243, '2025-03-31 00:09:35.393042+00', 'Highway 1 to moose jaw', '1', 'Penticton', 'Skaha', 'Chillhaus', 'boulder'),
	(244, '2025-03-31 00:09:55.454434+00', 'Fear of a darkened room', '2', 'Penticton', 'Skaha', 'Chillhaus', 'boulder'),
	(245, '2025-03-31 00:10:28.95509+00', 'Escape plan', '5', 'Penticton', 'Skaha', 'Chillhaus', 'boulder'),
	(246, '2025-04-15 02:05:08.216071+00', 'Bucket list', '5', 'Kelowna', 'Pebble beach', 'Pebble overhang', 'boulder'),
	(247, '2025-04-15 02:05:54.290318+00', 'One eyed monster low', '3', 'Kelowna', 'Pebble beach', 'Pebble overhang', 'boulder'),
	(248, '2025-05-10 23:26:03.994636+00', 'Low life', '3', 'Kelowna', 'Boulderfields ', 'Dominator', 'boulder'),
	(249, '2025-05-10 23:26:40.627689+00', 'Low life variation', '4', 'Kelowna', 'Boulderfields', 'Dominator', 'boulder'),
	(250, '2025-05-11 16:27:24.086215+00', 'Did i mention extension?', '9', 'Kelowna', 'Boulderfields', 'Danger', 'boulder'),
	(251, '2025-05-11 18:39:33.264164+00', 'The mini egg', '8', 'Kelowna', 'Boulderfields', 'Cave dweller', 'boulder'),
	(252, '2025-06-16 03:32:20.716888+00', 'Tiger style', '9', 'Kelowna', 'Boulderfields', 'Driven', 'boulder'),
	(253, '2025-06-16 03:33:06.670613+00', 'Shadowboxing', '7', 'Kelowna', 'Boulderfields', 'Driven', 'boulder'),
	(254, '2025-06-28 04:06:46.505814+00', 'Fields dreaming', '1', 'Kelowna', 'Boulderfields', 'Cave dweller', 'boulder'),
	(255, '2025-06-28 04:07:27.359499+00', 'Calabogie dreaming', '3', 'Kelowna', 'Boulderfields', 'Cave dweller', 'boulder');


--
-- Data for Name: climb_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."climb_images" ("id", "created_at", "climb_id", "url") VALUES
	(1, '2026-01-18 00:06:29.896056+00', 99, 'https://qrlzxwxpceqrycynoyzh.supabase.co/storage/v1/object/public/postImages/full-chub.JPEG'),
	(2, '2026-01-26 02:52:39.974468+00', 16, 'https://qrlzxwxpceqrycynoyzh.supabase.co/storage/v1/object/public/postImages/full-chub.JPEG'),
	(3, '2026-02-04 14:05:58.682789+00', 16, 'https://qrlzxwxpceqrycynoyzh.supabase.co/storage/v1/object/public/postImages/the_pinch.jpg');


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("id", "username", "role", "avatar_url", "created_at", "email") VALUES
	('39f42000-5a85-4ca2-b968-11d29e4ab0bb', 'javoy59363', 'user', NULL, '2026-01-13 00:27:49.950912', NULL),
	('36c25001-4fb6-48cd-9de4-92727288d66f', 'Byron Hayes', 'admin', 'https://lh3.googleusercontent.com/a/ACg8ocIWWiQoFUbakTS7nTSNKy_QL2U_nWKo6DuAjjt7W6DZU5GMxw=s96-c', '2026-01-13 00:27:04.245637', NULL),
	('1dbfe9da-170a-4094-9f62-5cec39aa7f05', 'hibavit272', 'user', NULL, '2026-02-10 14:19:29.828835', NULL),
	('3c372d1a-cb97-47ec-8771-c9255475fd05', 'werib74329', 'user', NULL, '2026-02-24 20:17:38.719758', NULL);


--
-- Data for Name: climb_videos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."climb_videos" ("id", "created_at", "climb_id", "user_id", "url") VALUES
	(1, '2026-01-26 01:23:57.416969+00', 16, '36c25001-4fb6-48cd-9de4-92727288d66f', 'sLXxjTaObZ4'),
	(3, '2026-01-26 02:02:28.904442+00', 16, '36c25001-4fb6-48cd-9de4-92727288d66f', 'vkiuaRR5VQ4');


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."favorites" ("id", "created_at", "climb_id", "user_id") VALUES
	(28, '2026-01-21 20:37:11.169378+00', 37, '36c25001-4fb6-48cd-9de4-92727288d66f'),
	(30, '2026-01-21 23:07:59.502642+00', 34, '36c25001-4fb6-48cd-9de4-92727288d66f'),
	(31, '2026-01-21 23:08:03.525316+00', 38, '36c25001-4fb6-48cd-9de4-92727288d66f'),
	(32, '2026-01-21 23:09:24.015993+00', 155, '36c25001-4fb6-48cd-9de4-92727288d66f'),
	(35, '2026-01-29 01:12:10.419418+00', 156, '36c25001-4fb6-48cd-9de4-92727288d66f'),
	(36, '2026-01-29 01:15:42.200099+00', 250, '36c25001-4fb6-48cd-9de4-92727288d66f'),
	(37, '2026-01-29 01:15:44.321171+00', 251, '36c25001-4fb6-48cd-9de4-92727288d66f'),
	(38, '2026-01-29 01:15:45.668515+00', 252, '36c25001-4fb6-48cd-9de4-92727288d66f'),
	(42, '2026-01-29 01:18:43.841865+00', 253, '36c25001-4fb6-48cd-9de4-92727288d66f'),
	(43, '2026-01-29 01:18:44.062564+00', 253, '36c25001-4fb6-48cd-9de4-92727288d66f'),
	(44, '2026-01-29 01:18:44.342717+00', 253, '36c25001-4fb6-48cd-9de4-92727288d66f'),
	(45, '2026-01-29 01:22:28.975705+00', 21, '36c25001-4fb6-48cd-9de4-92727288d66f'),
	(46, '2026-01-29 01:22:29.258516+00', 21, '36c25001-4fb6-48cd-9de4-92727288d66f'),
	(47, '2026-01-29 01:22:29.59559+00', 23, '36c25001-4fb6-48cd-9de4-92727288d66f'),
	(48, '2026-01-29 01:22:29.855877+00', 23, '36c25001-4fb6-48cd-9de4-92727288d66f');


--
-- Data for Name: notes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."notes" ("id", "created_at", "climb_id", "user_id", "note") VALUES
	(17, '2025-03-04 14:04:23.405312+00', 14, '36c25001-4fb6-48cd-9de4-92727288d66f', 'This was my first v8'),
	(18, '2025-03-12 13:28:14.831295+00', 23, '36c25001-4fb6-48cd-9de4-92727288d66f', 'Try jamming left toe in crack for start. Big left hand move. Bump left hand up again. Bicycle feet near right hand start hold. Can get a bit of a toe jam with right foot. Left foot on little nub. Bump right hand in, then bump right hand up to lip. Might need to readjust feet first.'),
	(20, '2025-04-07 00:41:13.492747+00', 99, '36c25001-4fb6-48cd-9de4-92727288d66f', 'This was my first v6'),
	(21, '2025-04-07 00:41:43.338119+00', 86, '36c25001-4fb6-48cd-9de4-92727288d66f', 'This was my first v7'),
	(13, '2026-01-29 00:57:27.12865+00', 19, '36c25001-4fb6-48cd-9de4-92727288d66f', 'This is my favourite boulder in the boulderfields so far');


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."posts" ("id", "created_at", "title", "content") VALUES
	(22, '2024-06-25 00:26:21+00', 'Distillery', 'Went to a new area in the boulderfields today called Distillery. Mostly just played around on some moderate problems. The highlight was this cool v3 called Butterscotch Ripple.'),
	(23, '2024-07-21 01:17:09+00', 'First time to Fontainebleau', 'This was my first time travelling abroad for climbing and what better place to start then the legendary Fontainebleau. It was amazing! I mostly just ran around the forest doing circuits but the highlight of the trip was sending Le Toit du Cul de Chien.'),
	(24, '2024-07-23 01:36:34+00', 'Wales', 'After Fontainebleau I went to Wales and did some bouldering in the north of Wales.  It was a bit of a hike to get up to these boulders but the view was definitely worth it!'),
	(25, '2024-07-30 01:47:05+00', 'The Slayers - Penticton', 'I went to The Slayers boulders in Penticton this weekend. I was here 3 years ago when I first started climbing outside and everything seemed so high and intimidating so I didn''t get much done but this time was different. Sent a few classic problems and managed to get my second V8!'),
	(27, '2024-08-15 00:56:12.908131+00', 'First Squamish Trip of the Year', 'This was the first trip to Squamish this season, hopefully with many more to come. I love this place. I tried the mega classic boulder Majestic, a deep water solo boulder on the edge of the ocean. This is by far the coolest boulder I have tried. I didn''t quite get the send, I fell at the top trying to mantel over.  I guess that just means I have to come back again :)   ');


--
-- Data for Name: post_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."post_images" ("id", "created_at", "url", "post_id") VALUES
	(5, '2026-02-02 01:48:06.87117+00', 'https://qrlzxwxpceqrycynoyzh.supabase.co/storage/v1/object/public/postImages/1740622307760-Butterscotch%20Ripple.jpg', 22),
	(7, '2026-02-02 01:51:28.105215+00', 'https://qrlzxwxpceqrycynoyzh.supabase.co/storage/v1/object/public/postImages/1740623024567-Tir%20a%20l''arc.JPG', 23),
	(8, '2026-02-02 01:52:38.899715+00', 'https://qrlzxwxpceqrycynoyzh.supabase.co/storage/v1/object/public/postImages/1740622903938-Spaghetti.JPG', 23),
	(9, '2026-02-02 01:55:19.170035+00', 'https://qrlzxwxpceqrycynoyzh.supabase.co/storage/v1/object/public/postImages/1740623682610-The%20Pinch.jpg', 24),
	(10, '2026-02-02 01:55:40.056946+00', 'https://qrlzxwxpceqrycynoyzh.supabase.co/storage/v1/object/public/postImages/1740623595527-Bangor.jpg', 24),
	(11, '2026-02-02 01:57:34.025131+00', 'https://qrlzxwxpceqrycynoyzh.supabase.co/storage/v1/object/public/postImages/1740624201669-Donny.jpg', 25),
	(12, '2026-02-02 01:57:56.655425+00', 'https://qrlzxwxpceqrycynoyzh.supabase.co/storage/v1/object/public/postImages/1740624293584-Toughie.jpg', 25),
	(13, '2026-02-02 01:59:37.504319+00', 'https://qrlzxwxpceqrycynoyzh.supabase.co/storage/v1/object/public/postImages/1740624659748-Majestic.JPG', 27),
	(14, '2026-02-02 01:59:58.733196+00', 'https://qrlzxwxpceqrycynoyzh.supabase.co/storage/v1/object/public/postImages/1741357672459-Minor%20Threat.JPG', 27);


--
-- Data for Name: post_videos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."post_videos" ("id", "created_at", "post_id", "url") VALUES
	(5, '2026-02-02 02:05:47.66156+00', 25, 'vkiuaRR5VQ4'),
	(6, '2026-02-02 02:06:18.55114+00', 23, 'sLXxjTaObZ4');


--
-- Data for Name: sends; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."sends" ("id", "created_at", "user_id", "climb_id") VALUES
	(18, '2026-01-20 14:29:40.555014+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 17),
	(21, '2026-01-21 14:03:08.908213+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 30),
	(22, '2026-01-21 14:03:09.74098+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 31),
	(23, '2026-01-21 20:34:53.378771+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 35),
	(24, '2026-01-21 20:35:03.889317+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 36),
	(25, '2026-01-21 23:03:12.393378+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 33),
	(26, '2026-01-21 23:05:40.10361+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 86),
	(27, '2026-01-21 23:08:39.435267+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 32),
	(28, '2026-01-21 23:19:49.346567+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 96),
	(29, '2026-01-26 01:19:06.259895+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 99),
	(30, '2026-01-26 01:51:09.768267+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 16),
	(34, '2026-01-29 01:06:02.006388+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 88),
	(35, '2026-01-29 01:06:03.660162+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 89),
	(36, '2026-01-29 01:06:07.947407+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 90),
	(37, '2026-01-29 01:06:10.517717+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 91),
	(38, '2026-01-29 01:06:12.015652+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 92),
	(39, '2026-01-29 01:06:13.709226+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 93),
	(40, '2026-01-29 01:06:15.827288+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 94),
	(41, '2026-01-29 01:06:17.841817+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 95),
	(42, '2026-01-29 01:06:22.17577+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 97),
	(43, '2026-01-29 01:06:23.790544+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 98),
	(44, '2026-01-29 01:06:49.830532+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 100),
	(45, '2026-01-29 01:06:51.432948+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 102),
	(46, '2026-01-29 01:06:52.874192+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 103),
	(47, '2026-01-29 01:06:54.392139+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 104),
	(48, '2026-01-29 01:06:55.861565+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 105),
	(49, '2026-01-29 01:06:56.829462+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 106),
	(50, '2026-01-29 01:06:58.011173+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 107),
	(51, '2026-01-29 01:06:59.824174+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 108),
	(52, '2026-01-29 01:07:01.073511+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 109),
	(53, '2026-01-29 01:07:02.217612+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 110),
	(54, '2026-01-29 01:07:06.990948+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 111),
	(55, '2026-01-29 01:07:08.189284+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 112),
	(56, '2026-01-29 01:07:09.162398+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 113),
	(57, '2026-01-29 01:07:10.06097+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 114),
	(58, '2026-01-29 01:07:11.039053+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 115),
	(59, '2026-01-29 01:07:12.312366+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 116),
	(60, '2026-01-29 01:07:13.68878+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 117),
	(61, '2026-01-29 01:07:15.349453+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 118),
	(62, '2026-01-29 01:07:16.239971+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 119),
	(63, '2026-01-29 01:07:17.24321+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 120),
	(64, '2026-01-29 01:07:20.525995+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 121),
	(65, '2026-01-29 01:07:21.552075+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 122),
	(66, '2026-01-29 01:07:22.830903+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 123),
	(67, '2026-01-29 01:07:24.416736+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 124),
	(68, '2026-01-29 01:07:25.785483+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 125),
	(69, '2026-01-29 01:07:27.072302+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 126),
	(70, '2026-01-29 01:07:28.069159+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 127),
	(71, '2026-01-29 01:07:29.163573+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 128),
	(72, '2026-01-29 01:07:30.841033+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 129),
	(73, '2026-01-29 01:07:32.065409+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 130),
	(74, '2026-01-29 01:07:35.939973+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 131),
	(75, '2026-01-29 01:07:37.18616+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 132),
	(76, '2026-01-29 01:07:38.300285+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 134),
	(77, '2026-01-29 01:07:39.054569+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 135),
	(78, '2026-01-29 01:07:39.790826+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 136),
	(79, '2026-01-29 01:07:40.473046+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 137),
	(80, '2026-01-29 01:07:41.436115+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 138),
	(81, '2026-01-29 01:07:42.884985+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 139),
	(82, '2026-01-29 01:07:43.792624+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 140),
	(83, '2026-01-29 01:07:44.828138+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 141),
	(84, '2026-01-29 01:07:48.563265+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 142),
	(85, '2026-01-29 01:07:50.095936+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 143),
	(86, '2026-01-29 01:07:51.123213+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 144),
	(87, '2026-01-29 01:07:52.03052+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 145),
	(88, '2026-01-29 01:07:53.16946+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 146),
	(89, '2026-01-29 01:11:08.441024+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 147),
	(90, '2026-01-29 01:11:08.687028+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 147),
	(91, '2026-01-29 01:11:18.642959+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 148),
	(92, '2026-01-29 01:11:18.9041+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 148),
	(93, '2026-01-29 01:11:20.171553+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 149),
	(94, '2026-01-29 01:11:20.388119+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 149),
	(95, '2026-01-29 01:11:21.89071+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 150),
	(96, '2026-01-29 01:11:22.114525+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 150),
	(97, '2026-01-29 01:11:52.93986+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 151),
	(98, '2026-01-29 01:11:53.225428+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 151),
	(99, '2026-01-29 01:12:00.104409+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 152),
	(100, '2026-01-29 01:12:00.347622+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 152),
	(101, '2026-01-29 01:12:01.070183+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 153),
	(102, '2026-01-29 01:12:01.278298+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 153),
	(107, '2026-01-29 01:12:18.540287+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 157),
	(108, '2026-01-29 01:12:18.848203+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 157),
	(109, '2026-01-29 01:12:19.202193+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 158),
	(110, '2026-01-29 01:12:19.429721+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 158),
	(111, '2026-01-29 01:12:19.897951+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 159),
	(112, '2026-01-29 01:12:20.102887+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 159),
	(113, '2026-01-29 01:12:20.751207+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 160),
	(114, '2026-01-29 01:12:21.000713+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 160),
	(115, '2026-01-29 01:12:22.789572+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 161),
	(116, '2026-01-29 01:12:23.031702+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 161),
	(117, '2026-01-29 01:12:27.546394+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 162),
	(118, '2026-01-29 01:12:27.836861+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 162),
	(119, '2026-01-29 01:12:28.391562+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 164),
	(120, '2026-01-29 01:12:28.582808+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 164),
	(121, '2026-01-29 01:12:29.333083+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 165),
	(122, '2026-01-29 01:12:29.55321+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 165),
	(123, '2026-01-29 01:12:30.20463+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 166),
	(124, '2026-01-29 01:12:30.420544+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 166),
	(125, '2026-01-29 01:12:30.939112+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 167),
	(126, '2026-01-29 01:12:31.194504+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 167),
	(127, '2026-01-29 01:12:31.771634+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 168),
	(128, '2026-01-29 01:12:32.004403+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 168),
	(129, '2026-01-29 01:12:32.81062+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 169),
	(130, '2026-01-29 01:12:33.038807+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 169),
	(131, '2026-01-29 01:12:34.045538+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 170),
	(132, '2026-01-29 01:12:34.340173+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 170),
	(133, '2026-01-29 01:12:35.051686+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 171),
	(134, '2026-01-29 01:12:35.281011+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 171),
	(135, '2026-01-29 01:12:35.923305+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 172),
	(136, '2026-01-29 01:12:36.14021+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 172),
	(137, '2026-01-29 01:12:38.518459+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 173),
	(138, '2026-01-29 01:12:38.749159+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 173),
	(139, '2026-01-29 01:12:39.172668+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 174),
	(140, '2026-01-29 01:12:39.392306+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 174),
	(141, '2026-01-29 01:12:39.830622+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 175),
	(142, '2026-01-29 01:12:40.032358+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 175),
	(143, '2026-01-29 01:12:40.665183+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 176),
	(144, '2026-01-29 01:12:40.900371+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 176),
	(145, '2026-01-29 01:12:41.599653+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 177),
	(146, '2026-01-29 01:12:41.815237+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 177),
	(147, '2026-01-29 01:12:42.570448+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 178),
	(148, '2026-01-29 01:12:42.795622+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 178),
	(149, '2026-01-29 01:12:43.58203+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 179),
	(150, '2026-01-29 01:12:43.815006+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 179),
	(151, '2026-01-29 01:12:44.504908+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 180),
	(152, '2026-01-29 01:12:44.69702+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 180),
	(153, '2026-01-29 01:12:45.587303+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 181),
	(154, '2026-01-29 01:12:45.809467+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 181),
	(155, '2026-01-29 01:12:46.423138+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 182),
	(156, '2026-01-29 01:12:46.63646+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 182),
	(157, '2026-01-29 01:12:49.133456+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 183),
	(158, '2026-01-29 01:12:49.350675+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 183),
	(159, '2026-01-29 01:12:49.932182+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 184),
	(160, '2026-01-29 01:12:50.141806+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 184),
	(161, '2026-01-29 01:12:50.742309+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 185),
	(162, '2026-01-29 01:12:50.962071+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 185),
	(163, '2026-01-29 01:12:51.583129+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 186),
	(164, '2026-01-29 01:12:51.782745+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 186),
	(165, '2026-01-29 01:12:52.69161+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 187),
	(166, '2026-01-29 01:12:52.910315+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 187),
	(167, '2026-01-29 01:12:54.167065+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 188),
	(168, '2026-01-29 01:12:54.386162+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 188),
	(169, '2026-01-29 01:12:56.12706+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 189),
	(170, '2026-01-29 01:12:56.355678+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 189),
	(171, '2026-01-29 01:12:56.85944+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 190),
	(172, '2026-01-29 01:12:57.057033+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 190),
	(173, '2026-01-29 01:12:57.72639+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 191),
	(174, '2026-01-29 01:12:57.925591+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 191),
	(175, '2026-01-29 01:12:58.521994+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 192),
	(176, '2026-01-29 01:12:58.809834+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 192),
	(177, '2026-01-29 01:13:02.178495+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 193),
	(178, '2026-01-29 01:13:02.427963+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 193),
	(179, '2026-01-29 01:13:03.762274+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 196),
	(180, '2026-01-29 01:13:03.994702+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 196),
	(181, '2026-01-29 01:13:04.740593+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 195),
	(182, '2026-01-29 01:13:04.955775+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 195),
	(183, '2026-01-29 01:13:06.731951+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 197),
	(184, '2026-01-29 01:13:07.10272+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 197),
	(185, '2026-01-29 01:13:07.50418+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 198),
	(186, '2026-01-29 01:13:07.742575+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 198),
	(187, '2026-01-29 01:13:08.597649+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 199),
	(188, '2026-01-29 01:13:08.857772+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 199),
	(189, '2026-01-29 01:13:09.430337+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 201),
	(190, '2026-01-29 01:13:09.660292+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 201),
	(191, '2026-01-29 01:13:10.319757+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 202),
	(192, '2026-01-29 01:13:10.550232+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 202),
	(193, '2026-01-29 01:13:11.732528+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 203),
	(194, '2026-01-29 01:13:11.953642+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 203),
	(195, '2026-01-29 01:13:12.756656+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 204),
	(196, '2026-01-29 01:13:13.017625+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 204),
	(197, '2026-01-29 01:13:17.306927+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 205),
	(198, '2026-01-29 01:13:17.890808+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 205),
	(199, '2026-01-29 01:13:18.104668+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 206),
	(200, '2026-01-29 01:13:18.310863+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 206),
	(201, '2026-01-29 01:13:18.707058+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 207),
	(202, '2026-01-29 01:13:18.895985+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 207),
	(203, '2026-01-29 01:13:19.485467+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 208),
	(204, '2026-01-29 01:13:19.701472+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 208),
	(205, '2026-01-29 01:13:20.417507+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 209),
	(206, '2026-01-29 01:13:20.71742+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 209),
	(207, '2026-01-29 01:13:21.858003+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 210),
	(208, '2026-01-29 01:13:22.057145+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 210),
	(209, '2026-01-29 01:13:22.946927+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 211),
	(210, '2026-01-29 01:13:23.162793+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 211),
	(211, '2026-01-29 01:13:24.315878+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 212),
	(212, '2026-01-29 01:13:24.537943+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 212),
	(213, '2026-01-29 01:13:25.200371+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 213),
	(214, '2026-01-29 01:13:25.423483+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 213),
	(215, '2026-01-29 01:13:26.247817+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 214),
	(216, '2026-01-29 01:13:26.440783+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 214),
	(217, '2026-01-29 01:13:30.76657+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 215),
	(218, '2026-01-29 01:13:31.030213+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 215),
	(219, '2026-01-29 01:13:31.74204+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 216),
	(220, '2026-01-29 01:13:32.020678+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 216),
	(221, '2026-01-29 01:13:32.793369+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 217),
	(222, '2026-01-29 01:13:33.013643+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 217),
	(223, '2026-01-29 01:13:33.519067+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 218),
	(224, '2026-01-29 01:13:33.727192+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 218),
	(225, '2026-01-29 01:13:34.237075+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 219),
	(226, '2026-01-29 01:13:34.431529+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 219),
	(227, '2026-01-29 01:13:34.94941+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 220),
	(228, '2026-01-29 01:13:35.158335+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 220),
	(229, '2026-01-29 01:13:36.192393+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 221),
	(230, '2026-01-29 01:13:36.438424+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 221),
	(231, '2026-01-29 01:13:37.254344+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 222),
	(232, '2026-01-29 01:13:37.478189+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 222),
	(233, '2026-01-29 01:13:37.954972+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 224),
	(234, '2026-01-29 01:13:38.156516+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 224),
	(237, '2026-01-29 01:15:08.486544+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 225),
	(238, '2026-01-29 01:15:08.740801+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 225),
	(239, '2026-01-29 01:15:12.799402+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 227),
	(240, '2026-01-29 01:15:13.044293+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 227),
	(241, '2026-01-29 01:15:13.624888+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 228),
	(242, '2026-01-29 01:15:13.847814+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 228),
	(243, '2026-01-29 01:15:14.32851+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 229),
	(244, '2026-01-29 01:15:14.537932+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 229),
	(245, '2026-01-29 01:15:15.208591+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 230),
	(246, '2026-01-29 01:15:15.417707+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 230),
	(247, '2026-01-29 01:15:15.911197+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 231),
	(248, '2026-01-29 01:15:16.106944+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 231),
	(249, '2026-01-29 01:15:16.638564+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 232),
	(250, '2026-01-29 01:15:16.85345+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 232),
	(251, '2026-01-29 01:15:17.717103+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 233),
	(252, '2026-01-29 01:15:17.934667+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 233),
	(253, '2026-01-29 01:15:19.274634+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 234),
	(254, '2026-01-29 01:15:19.543111+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 234),
	(255, '2026-01-29 01:15:20.382786+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 235),
	(256, '2026-01-29 01:15:20.579817+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 235),
	(257, '2026-01-29 01:15:20.783276+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 236),
	(258, '2026-01-29 01:15:21.024681+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 236),
	(259, '2026-01-29 01:15:23.838154+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 237),
	(260, '2026-01-29 01:15:24.041389+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 237),
	(261, '2026-01-29 01:15:25.112161+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 239),
	(262, '2026-01-29 01:15:25.318001+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 239),
	(263, '2026-01-29 01:15:25.743128+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 240),
	(265, '2026-01-29 01:15:26.43257+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 241),
	(266, '2026-01-29 01:15:26.685606+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 241),
	(268, '2026-01-29 01:15:27.195314+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 242),
	(269, '2026-01-29 01:15:27.812123+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 243),
	(270, '2026-01-29 01:15:28.012538+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 243),
	(271, '2026-01-29 01:15:28.519229+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 244),
	(273, '2026-01-29 01:15:29.526885+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 245),
	(275, '2026-01-29 01:15:30.527972+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 246),
	(276, '2026-01-29 01:15:30.73633+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 246),
	(277, '2026-01-29 01:15:36.033208+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 247),
	(279, '2026-01-29 01:15:37.744021+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 248),
	(280, '2026-01-29 01:15:37.978909+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 248),
	(281, '2026-01-29 01:15:38.479958+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 249),
	(264, '2026-01-29 01:15:25.922861+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 240),
	(267, '2026-01-29 01:15:26.976007+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 242),
	(272, '2026-01-29 01:15:28.745088+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 244),
	(274, '2026-01-29 01:15:29.737897+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 245),
	(278, '2026-01-29 01:15:36.350724+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 247),
	(282, '2026-01-29 01:15:38.682605+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 249),
	(285, '2026-01-29 01:18:45.827034+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 254),
	(286, '2026-01-29 01:18:46.619894+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 254),
	(287, '2026-01-29 01:18:46.879556+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 255),
	(288, '2026-01-29 01:18:47.086117+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 255),
	(289, '2026-01-29 01:22:04.190996+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 18),
	(290, '2026-01-29 01:22:04.469791+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 18),
	(291, '2026-01-29 01:22:05.02286+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 19),
	(292, '2026-01-29 01:22:05.23902+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 19),
	(296, '2026-02-05 02:15:52.081594+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 14),
	(297, '2026-02-05 02:15:52.296289+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 14),
	(298, '2026-02-05 02:15:52.528935+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 14),
	(299, '2026-02-11 04:07:49.232899+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 238),
	(300, '2026-02-11 04:07:49.712628+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 238),
	(301, '2026-02-11 04:07:50.172703+00', '36c25001-4fb6-48cd-9de4-92727288d66f', 238);


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type") VALUES
	('postImages', 'postImages', NULL, '2026-01-14 14:09:41.64909+00', '2026-01-14 14:09:41.64909+00', true, false, NULL, NULL, NULL, 'STANDARD');


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") VALUES
	('32817678-582f-40b3-8770-830ce7eba122', 'postImages', 'full-chub.JPEG', NULL, '2026-01-14 14:12:00.79958+00', '2026-01-14 14:13:05.795594+00', '2026-01-14 14:12:00.79958+00', '{"eTag": "\"147a0a5ffc50ae71814366de8bc7712e\"", "size": 291996, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-01-14T14:13:06.000Z", "contentLength": 291996, "httpStatusCode": 200}', '8bd7d7c8-c081-4533-a35c-c288587a6dde', NULL, NULL),
	('81e08211-3d08-42a6-b6cb-abeb5d80709d', 'postImages', 'the_pinch.jpg', NULL, '2026-01-14 14:12:00.970505+00', '2026-01-14 14:13:21.010151+00', '2026-01-14 14:12:00.970505+00', '{"eTag": "\"3dd28807b1829ba63d25b5b859c71c94\"", "size": 1701846, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-01-14T14:13:21.000Z", "contentLength": 1701846, "httpStatusCode": 200}', '02e69676-568e-4f89-83ee-a7c46b98183a', NULL, NULL),
	('b40d7658-2a73-40cc-a5cb-d47f809209d8', 'postImages', 'the_chief.JPG', NULL, '2026-01-14 20:38:29.840207+00', '2026-01-14 20:38:40.554443+00', '2026-01-14 20:38:29.840207+00', '{"eTag": "\"c6a59b797afa626a97ea00ce16e41a41\"", "size": 545516, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-01-14T20:38:41.000Z", "contentLength": 545516, "httpStatusCode": 200}', '0665e9ec-fb11-4794-ab5c-7a11a21e6d37', NULL, NULL),
	('7c7cce65-d2cc-4004-a020-40546875fa9c', 'postImages', 'default-climb.png', NULL, '2026-01-18 00:33:53.732955+00', '2026-01-18 00:33:53.732955+00', '2026-01-18 00:33:53.732955+00', '{"eTag": "\"8a63dbcecb44f8e96203e4670a8a502b-1\"", "size": 161949, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-01-18T00:33:54.000Z", "contentLength": 161949, "httpStatusCode": 200}', 'd8d05d16-923b-480b-adc2-3652618becee', NULL, NULL),
	('87571a36-908c-4ca4-b24d-34807ab961a8', 'postImages', 'default-video.png', NULL, '2026-01-26 01:37:44.760853+00', '2026-01-26 01:37:44.760853+00', '2026-01-26 01:37:44.760853+00', '{"eTag": "\"4fdec087a910402e07ff7f9bd0d92a39-1\"", "size": 161050, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-01-26T01:37:45.000Z", "contentLength": 161050, "httpStatusCode": 200}', '393beda1-56f8-4cde-915d-feb3204f3639', NULL, NULL),
	('90cf73ee-61f7-46fa-a210-3efccc192dcf', 'postImages', '1740622307760-Butterscotch Ripple.jpg', NULL, '2026-02-02 01:47:29.118275+00', '2026-02-02 01:47:29.118275+00', '2026-02-02 01:47:29.118275+00', '{"eTag": "\"5ff6d2d24d8b14828cd04fe7a3d0945d-1\"", "size": 3588043, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-02T01:47:29.000Z", "contentLength": 3588043, "httpStatusCode": 200}', '9833ed33-0c3d-4b1c-a5f6-0a7a255df542', NULL, NULL),
	('a6f0ee56-5184-40f0-b906-e1dba0f8787b', 'postImages', '1740623024567-Tir a l''arc.JPG', NULL, '2026-02-02 01:50:14.421547+00', '2026-02-02 01:50:14.421547+00', '2026-02-02 01:50:14.421547+00', '{"eTag": "\"353b536dd27041681cc65db8e72250d2-1\"", "size": 1067201, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-02T01:50:14.000Z", "contentLength": 1067201, "httpStatusCode": 200}', 'c89af738-7f25-484e-ada8-06a807b2a066', NULL, NULL),
	('411b496b-b478-4c9f-939c-43abf7f611fa', 'postImages', '1740622903938-Spaghetti.JPG', NULL, '2026-02-02 01:50:16.273267+00', '2026-02-02 01:50:16.273267+00', '2026-02-02 01:50:16.273267+00', '{"eTag": "\"722745e137c1b5d2f01a083fa3c861ba-1\"", "size": 1051115, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-02T01:50:16.000Z", "contentLength": 1051115, "httpStatusCode": 200}', '9fd1c02a-56f9-40fa-bcd5-e0e681745e64', NULL, NULL),
	('7ea4fad3-37d4-46ef-bd9a-588e70271847', 'postImages', '1740623682610-The Pinch.jpg', NULL, '2026-02-02 01:54:31.732157+00', '2026-02-02 01:54:31.732157+00', '2026-02-02 01:54:31.732157+00', '{"eTag": "\"b25c7eea833d6a0e92ecf299743a8b7b-1\"", "size": 4073058, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-02T01:54:32.000Z", "contentLength": 4073058, "httpStatusCode": 200}', 'af0f5409-a0f7-4e10-9e38-2ec433a85aa9', NULL, NULL),
	('b7cf1bac-8f85-44e5-997f-74b98f12c654', 'postImages', '1740623595527-Bangor.jpg', NULL, '2026-02-02 01:54:34.479192+00', '2026-02-02 01:54:34.479192+00', '2026-02-02 01:54:34.479192+00', '{"eTag": "\"b8f9c7b621ae518f697723314d479e8e-1\"", "size": 3679034, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-02T01:54:35.000Z", "contentLength": 3679034, "httpStatusCode": 200}', '63de82ff-334e-480e-ae39-f00b98446d92', NULL, NULL),
	('40f07cd9-8f9f-4edc-b74e-4ecbfa1814af', 'postImages', '1740624293584-Toughie.jpg', NULL, '2026-02-02 01:57:14.908552+00', '2026-02-02 01:57:14.908552+00', '2026-02-02 01:57:14.908552+00', '{"eTag": "\"36ecd5f3ad2c98128a2aa73f3afdf40f-1\"", "size": 3989088, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-02T01:57:15.000Z", "contentLength": 3989088, "httpStatusCode": 200}', '72c60c50-d33d-4c84-8528-5d46a72ece3d', NULL, NULL),
	('77cb0c07-c6bd-4dee-8d28-127aa4af09ff', 'postImages', '1740624201669-Donny.jpg', NULL, '2026-02-02 01:57:17.45641+00', '2026-02-02 01:57:17.45641+00', '2026-02-02 01:57:17.45641+00', '{"eTag": "\"021b7463a4b56db437651f6ab77af724-1\"", "size": 6222359, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-02T01:57:17.000Z", "contentLength": 6222359, "httpStatusCode": 200}', '6c50fc3e-633b-48bb-a4b5-e6de4d9f0c48', NULL, NULL),
	('549a7a9c-1986-4061-9f29-67ee0c700781', 'postImages', '1740624659748-Majestic.JPG', NULL, '2026-02-02 01:59:04.636512+00', '2026-02-02 01:59:04.636512+00', '2026-02-02 01:59:04.636512+00', '{"eTag": "\"cdc219c44135f4ba801a7aa743c02307-1\"", "size": 789638, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-02T01:59:05.000Z", "contentLength": 789638, "httpStatusCode": 200}', 'a940cdca-8a26-487d-8f6f-795bb51d1427', NULL, NULL),
	('db177639-9029-41dd-9447-1057e7049973', 'postImages', '1741357672459-Minor Threat.JPG', NULL, '2026-02-02 01:59:07.251497+00', '2026-02-02 01:59:07.251497+00', '2026-02-02 01:59:07.251497+00', '{"eTag": "\"b765a067b566463b0e3053de05ef94b4-1\"", "size": 996671, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-02T01:59:07.000Z", "contentLength": 996671, "httpStatusCode": 200}', '3d4819dc-8943-47db-8644-5bc1c87f8a97', NULL, NULL),
	('dcdf6a23-95c8-4fc0-9ea2-71af8bc67c46', 'postImages', 'Test2.jpg', NULL, '2026-02-13 14:38:14.232691+00', '2026-02-13 14:38:14.232691+00', '2026-02-13 14:38:14.232691+00', '{"eTag": "\"c101bbd0c12d516de087d49da0ead0b1-1\"", "size": 1701846, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-13T14:38:14.000Z", "contentLength": 1701846, "httpStatusCode": 200}', '9141734e-b3bb-4829-a6ea-1d1e586e85f1', NULL, NULL);


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 161, true);


--
-- Name: Posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Posts_id_seq"', 9, true);


--
-- Name: climb_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."climb_images_id_seq"', 23, true);


--
-- Name: climb_videos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."climb_videos_id_seq"', 11, true);


--
-- Name: climbs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."climbs_id_seq"', 283, true);


--
-- Name: favorites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."favorites_id_seq"', 50, true);


--
-- Name: notes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."notes_id_seq"', 13, true);


--
-- Name: postImages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."postImages_id_seq"', 24, true);


--
-- Name: post_videos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."post_videos_id_seq"', 10, true);


--
-- Name: sends_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."sends_id_seq"', 323, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict Eoec2DK2XgE1GNcWmGodcXGXbRKnsbLY4mG2v3uLXnZQdp9QTM5XzdwgMoRcukc

RESET ALL;
