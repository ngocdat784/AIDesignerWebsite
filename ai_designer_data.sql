--
-- PostgreSQL database dump
--

\restrict YhJD5fRtb1d0GKrjgZfybxYy5AK7kdDAD6eDOM7FJtc0CxXXYcGcdnZNPLGgRlC

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

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
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, avatar, email, role, "createdAt", "updatedAt", "passwordHash") FROM stdin;
f5282f6b-7387-4e25-b611-08910faeebc8	Register Test User	\N	register-test@example.com	USER	2026-08-13 15:45:25.608	2026-08-13 15:45:25.608	$2b$10$GhSlIotyic3iBEgc3U/wqu05ycv73CiV4mDfuYF72M1E3Cu57k2P2
75ea5d87-d415-4fb2-b4fc-47b246f7bd3f	Creator Test	\N	creator-test@example.com	CREATOR	2026-08-14 03:53:10.606	2026-08-14 03:53:10.606	$2b$10$FZYyIRqqPrdCpaVBRu8b9emrArh33MovJacqcbMirffx5oaXew6Hu
e7115f38-b2ce-4bd3-b1cc-040a3822f6c1	Admin Test	\N	admin-test@example.com	ADMIN	2026-08-14 03:53:10.865	2026-08-14 03:53:10.865	$2b$10$Wijk9ElgHRT5Tr7JOWSUyuEGkXiwCNUSwPCkqSwOqvYDut/hlSqpi
747829fa-4a18-492a-a97f-b781f94ef5dd	Test Frontend	\N	frontend-test@example.com	USER	2026-08-14 16:52:05.876	2026-08-14 16:52:05.876	$2b$10$XdOMo2/ayeBDm3tPnv6fauQiivFRrAimEzSLq7E2BLsiiYo89OZRi
30734a69-538e-4915-b3eb-48c0e1e2b047	Nguyen Van An	\N	an-test@example.com	USER	2026-08-19 02:14:14.434	2026-08-19 02:14:14.434	$2b$10$E89ASKDn2.XhXMb/DWbl8ebHA612l//BFdlbh/Wn6rVsnHu8By95i
b8a21366-326c-454a-9005-196de0fb56d5	Tran Thi Mai	\N	mai-test@example.com	USER	2026-08-19 02:14:29.803	2026-08-19 02:14:29.803	$2b$10$HXDzhessNrE.xXHV3V90ruWRtrLm3kend84TE2hI5rC2Ymrer2bs.
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Order" (id, "userId", status, "paymentMethod", subtotal, discount, total, "createdAt", "updatedAt") FROM stdin;
order-test-an-001	30734a69-538e-4915-b3eb-48c0e1e2b047	PENDING	card	89.98	30	59.98	2026-08-19 02:24:07.542	2026-08-19 02:24:07.542
order-test-mai-001	b8a21366-326c-454a-9005-196de0fb56d5	PAID	paypal	39.99	30	39.99	2026-08-19 02:26:59.73	2026-08-19 02:26:59.73
855ebcc1-24ef-4e4c-ba21-6617cf1d0307	f5282f6b-7387-4e25-b611-08910faeebc8	PENDING	paypal	39.99	0	39.99	2026-08-20 03:42:05.994	2026-08-20 03:42:05.994
afd73d35-1995-4fe1-8935-1e6cde3c06ea	f5282f6b-7387-4e25-b611-08910faeebc8	PENDING	card	39.99	0	39.99	2026-08-20 03:52:02.036	2026-08-20 03:52:02.036
ef4fa6f5-571b-431f-96ac-2dc01f70fec8	f5282f6b-7387-4e25-b611-08910faeebc8	PENDING	card	39.99	0	39.99	2026-08-28 16:32:02.859	2026-08-28 16:32:02.859
82d37fd7-1585-4a27-bdf2-a2598464f19f	f5282f6b-7387-4e25-b611-08910faeebc8	PENDING	card	39.99	0	39.99	2026-08-28 16:52:47.463	2026-08-28 16:52:47.463
\.


--
-- Data for Name: OrderBilling; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrderBilling" (id, "orderId", "firstName", "lastName", email, phone, address, city, country, "postalCode") FROM stdin;
cmszgx1v70000k0tul5evsq5k	order-test-an-001	Nguyen	Van An	an-test@example.com	0901234567	123 Nguyen Trai	Ho Chi Minh City	Vietnam	700000
cmszh0qpa0001k0tuzpy4vkln	order-test-mai-001	Tran	Thi Mai	mai-test@example.com	0912345678	456 Le Loi	Da Nang	Vietnam	550000
cmt0z56g60000qotuzkl5yrec	855ebcc1-24ef-4e4c-ba21-6617cf1d0307	Register	Test User	register-test@example.com	0901234567	123 Nguyen Hue	Ho Chi Minh City	Vietnam	700000
cmt0zhycl0001qotu8vyogcxd	afd73d35-1995-4fe1-8935-1e6cde3c06ea	a	b	register-test@example.com	0123456789	123 Test Street aaa	Ho Chi Minh City	Vietnam	700000
cmtd665ht0000u8tu57khz0n5	ef4fa6f5-571b-431f-96ac-2dc01f70fec8	Register	Style Test	register-test@example.com	0901234567	123 Nguyen Hue	Ho Chi Minh City	Vietnam	700000
cmtd6wttq0000v4tuebmmpmg9	82d37fd7-1585-4a27-bdf2-a2598464f19f	Register	Style Test	register-test@example.com	0901234567	123 Nguyen Hue	Ho Chi Minh City	Vietnam	700000
\.


--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrderItem" (id, "orderId", "productId", "productName", "unitPrice", quantity, subtotal, "createdAt", "styleId", "styleName", "styleSlug") FROM stdin;
order-item-an-001	order-test-an-001	tpl-ai-saas-landing-002	AI SaaS Landing Page	39.99	1	39.99	2026-08-19 02:24:07.542	\N	\N	\N
order-item-an-002	order-test-an-001	tpl-modern-dashboard-001	Modern Dashboard	49.99	1	49.99	2026-08-19 02:24:07.542	\N	\N	\N
order-item-mai-001	order-test-mai-001	tpl-ai-saas-landing-002	AI SaaS Landing Page	39.99	1	39.99	2026-08-19 02:26:59.73	\N	\N	\N
0a4415a3-7358-4f38-a575-add4e9ecfc1c	855ebcc1-24ef-4e4c-ba21-6617cf1d0307	tpl-ai-saas-landing-002	AI SaaS Landing Page	39.99	1	39.99	2026-08-20 03:42:05.994	\N	\N	\N
b0ee00a1-3543-49fb-b0d9-966484818ed8	afd73d35-1995-4fe1-8935-1e6cde3c06ea	tpl-ai-saas-landing-002	AI SaaS Landing Page	39.99	1	39.99	2026-08-20 03:52:02.036	\N	\N	\N
3c7f36fd-fc03-45f9-bb40-c81799198b2b	ef4fa6f5-571b-431f-96ac-2dc01f70fec8	tpl-ai-saas-landing-002	AI SaaS Landing Page	39.99	1	39.99	2026-08-28 16:32:02.859	\N	\N	\N
f1288a78-bf9c-4cab-b4f2-10d7f8a810da	82d37fd7-1585-4a27-bdf2-a2598464f19f	tpl-ai-saas-landing-002	AI SaaS Landing Page	39.99	1	39.99	2026-08-28 16:52:47.463	4017ddca-7de6-46a5-a054-1aaf160059dd	Modern Dark	modern-dark
\.


--
-- Data for Name: TemplateStyle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TemplateStyle" (id, slug, name, description, colors, gradients, typography, layout, "previewImage", "isActive", "createdAt", "updatedAt") FROM stdin;
4017ddca-7de6-46a5-a054-1aaf160059dd	modern-dark	Modern Dark	A modern dark style designed for AI, SaaS, technology and developer-focused websites.	{"text": "#F8FAFC", "muted": "#94A3B8", "border": "#334155", "primary": "#6366F1", "surface": "#1E293B", "secondary": "#8B5CF6", "background": "#0F172A"}	{"hero": "linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)", "primary": "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)"}	{"bodyFont": "Inter", "bodyWeight": 400, "headingFont": "Inter", "headingWeight": 700}	{"spacing": "comfortable", "maxWidth": "1280px", "borderRadius": "16px", "containerPadding": "24px"}	https://images.unsplash.com/photo-1558655146-d09347e92766	t	2026-08-28 15:38:53.653	2026-08-28 15:38:53.653
20256108-c19f-49f0-b6a3-904f5099bb62	clean-minimal	Clean Minimal	A clean and minimal visual style suitable for business, portfolio, productivity and professional websites.	{"text": "#0F172A", "muted": "#64748B", "border": "#E2E8F0", "primary": "#2563EB", "surface": "#F8FAFC", "secondary": "#0EA5E9", "background": "#FFFFFF"}	{"hero": "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)", "primary": "linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)"}	{"bodyFont": "Inter", "bodyWeight": 400, "headingFont": "Inter", "headingWeight": 600}	{"spacing": "compact", "maxWidth": "1200px", "borderRadius": "12px", "containerPadding": "20px"}	https://images.unsplash.com/photo-1558655146-9f40138edfeb	t	2026-08-28 15:41:14.218	2026-08-28 15:41:14.218
1a4b8510-52ce-462e-a37c-f33a7df8b193	creative-gradient	Creative Gradient	A vibrant creative style using colorful gradients for startup, creative agency, portfolio and modern landing pages.	{"text": "#F9FAFB", "muted": "#9CA3AF", "accent": "#06B6D4", "border": "#374151", "primary": "#EC4899", "surface": "#1F2937", "secondary": "#8B5CF6", "background": "#111827"}	{"hero": "linear-gradient(135deg, #111827 0%, #312E81 50%, #831843 100%)", "primary": "linear-gradient(135deg, #EC4899 0%, #8B5CF6 50%, #06B6D4 100%)"}	{"bodyFont": "Inter", "bodyWeight": 400, "headingFont": "Poppins", "headingWeight": 700}	{"spacing": "spacious", "maxWidth": "1280px", "borderRadius": "20px", "containerPadding": "32px"}	https://images.unsplash.com/photo-1558655146-364adaf1fcc9	t	2026-08-28 15:41:30.775	2026-08-28 15:41:30.775
\.


--
-- Data for Name: Template; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Template" (id, slug, title, description, thumbnail, images, category, tags, "authorId", rating, reviews, downloads, price, "originalPrice", featured, newest, stock, license, "createdAt", "updatedAt", changelog, "coverImage", "demoUrl", "discountPrice", favorites, features, gallery, "includedFiles", "installationSteps", "isFeatured", "isPremium", "relatedTemplateIds", requirements, status, "techStack", version, views, "styleId") FROM stdin;
tpl-ai-saas-landing-002	ai-saas-landing-page	AI SaaS Landing Page	A premium AI SaaS landing page template designed for artificial intelligence products, automation platforms, developer tools, and modern technology startups.	https://images.unsplash.com/photo-1677442136019-21780ecad995	{https://images.unsplash.com/photo-1677442136019-21780ecad995,https://images.unsplash.com/photo-1635070041078-e363dbe005cb,https://images.unsplash.com/photo-1550751827-4bd374c3f58b}	AI & SaaS	{ai,saas,landing-page,startup,technology,react,nextjs,tailwind}	75ea5d87-d415-4fb2-b4fc-47b246f7bd3f	4.9	87	1265	39.99	69.99	t	t	500	Commercial	2026-08-17 03:24:25.995	2026-08-28 15:57:44.193	[{"date": "2026-08-10", "changes": ["Added AI product showcase", "Added animated hero section", "Added pricing comparison", "Improved mobile responsiveness"], "version": "2.0.0"}, {"date": "2026-07-28", "changes": ["Added dark mode", "Added customer testimonials", "Improved page performance"], "version": "1.5.0"}]	https://images.unsplash.com/photo-1635070041078-e363dbe005cb	https://example.com/demo/ai-saas-landing-page	39.99	418	{"AI product showcase","Responsive design","Animated hero section","Pricing section","Feature comparison","Customer testimonials","FAQ section","Dark mode","Modern animations"}	{https://images.unsplash.com/photo-1677442136019-21780ecad995,https://images.unsplash.com/photo-1635070041078-e363dbe005cb,https://images.unsplash.com/photo-1550751827-4bd374c3f58b}	[{"name": "app", "type": "folder"}, {"name": "components", "type": "folder"}, {"name": "public", "type": "folder"}, {"name": "lib", "type": "folder"}, {"name": "package.json", "type": "file"}, {"name": "README.md", "type": "file"}, {"name": "tailwind.config.ts", "type": "file"}]	{"Clone or download the template","Run npm install","Configure environment variables","Run npm run dev","Build the project with npm run build"}	t	t	{tpl-modern-dashboard-001}	{"Node.js 20+","npm 10+","Modern web browser","Next.js 15+"}	published	{Next.js,React,TypeScript,"Tailwind CSS","Framer Motion"}	2.0.0	3670	4017ddca-7de6-46a5-a054-1aaf160059dd
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
cb622ff0-bf27-48f2-b173-e21721dab0b2	8b9a623bb7475b3f1e587d1e8d88e3ddcc98d0b87551d21fdc408526dc34d28c	2026-08-11 09:25:37.177296+07	20260811022537_init	\N	\N	2026-08-11 09:25:37.061889+07	1
931da8ae-881a-45b7-965d-7ab2b622d548	3b0dbf7ae4aec58e93d53280e0d6eb0b8b26f7328bff8d935a60d741f7e0c6ce	2026-08-13 21:53:59.786025+07	20260813145359_add_password_hash_to_user	\N	\N	2026-08-13 21:53:59.725719+07	1
31cf5340-7d69-45bd-aba3-c371046282da	4735fd96f27287ae6a7cd5e56107b0083af7c65482998f8d01ecfa7fea6123ca	2026-08-16 22:53:37.600044+07	20260816155337_expand_template_fields	\N	\N	2026-08-16 22:53:37.474386+07	1
d37ba106-b114-4a6f-9afc-05bac8777e1b	e254ec74c0a94c89e44404b86d67cc77cdc7d357779abe1891a7c281139804c7	2026-08-26 10:19:17.592491+07	20260826031917_add_template_style	\N	\N	2026-08-26 10:19:17.320061+07	1
\.


--
-- PostgreSQL database dump complete
--

\unrestrict YhJD5fRtb1d0GKrjgZfybxYy5AK7kdDAD6eDOM7FJtc0CxXXYcGcdnZNPLGgRlC

