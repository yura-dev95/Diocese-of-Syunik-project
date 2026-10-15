--
-- PostgreSQL database dump
--

\restrict sFdoOyg8jEW12NnYfqWrswpMiCoalz7ihweyOIcMpWXoqqARUULgMMZAsrgknO8

-- Dumped from database version 18.4 (Postgres.app)
-- Dumped by pg_dump version 18.4 (Postgres.app)

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
-- Name: ChurchCategory; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ChurchCategory" AS ENUM (
    'ACTIVE_MONASTERY',
    'CITY_CHURCH',
    'VILLAGE_CHURCH',
    'RUINED_SANCTUARY',
    'CHAPEL'
);


ALTER TYPE public."ChurchCategory" OWNER TO postgres;

--
-- Name: ContentStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ContentStatus" AS ENUM (
    'DRAFT',
    'PUBLISHED',
    'ARCHIVED'
);


ALTER TYPE public."ContentStatus" OWNER TO postgres;

--
-- Name: LibraryCategory; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."LibraryCategory" AS ENUM (
    'PDF',
    'MANUSCRIPT',
    'ARTICLE'
);


ALTER TYPE public."LibraryCategory" OWNER TO postgres;

--
-- Name: MediaType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."MediaType" AS ENUM (
    'SERMON',
    'PODCAST',
    'VLOG',
    'SHARAKAN',
    'CHOIR_RECORDING'
);


ALTER TYPE public."MediaType" OWNER TO postgres;

--
-- Name: PaymentProvider; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PaymentProvider" AS ENUM (
    'MOCK',
    'ARCA',
    'VISA',
    'PAYPAL',
    'APPLE_PAY',
    'GOOGLE_PAY'
);


ALTER TYPE public."PaymentProvider" OWNER TO postgres;

--
-- Name: PaymentStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PaymentStatus" AS ENUM (
    'INTENT_CREATED',
    'PENDING',
    'COMPLETED',
    'FAILED',
    'CANCELLED'
);


ALTER TYPE public."PaymentStatus" OWNER TO postgres;

--
-- Name: SubmissionStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."SubmissionStatus" AS ENUM (
    'NEW',
    'IN_REVIEW',
    'RESOLVED',
    'ARCHIVED'
);


ALTER TYPE public."SubmissionStatus" OWNER TO postgres;

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."UserRole" AS ENUM (
    'ADMIN',
    'EDITOR'
);


ALTER TYPE public."UserRole" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Announcement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Announcement" (
    id text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "announcementDate" timestamp(3) without time zone NOT NULL,
    "expiresAt" timestamp(3) without time zone,
    priority integer DEFAULT 0 NOT NULL,
    status public."ContentStatus" DEFAULT 'DRAFT'::public."ContentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Announcement" OWNER TO postgres;

--
-- Name: Choir; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Choir" (
    id text NOT NULL,
    slug text NOT NULL,
    name text NOT NULL,
    description text,
    "imageUrl" text,
    conductor text,
    location text,
    status public."ContentStatus" DEFAULT 'DRAFT'::public."ContentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Choir" OWNER TO postgres;

--
-- Name: Church; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Church" (
    id text NOT NULL,
    slug text NOT NULL,
    name text NOT NULL,
    summary text,
    description text,
    address text,
    settlement text,
    century text,
    category public."ChurchCategory" DEFAULT 'VILLAGE_CHURCH'::public."ChurchCategory" NOT NULL,
    "coverUrl" text,
    latitude numeric(65,30),
    longitude numeric(65,30),
    "visitingNote" text,
    "serviceSchedule" text,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    status public."ContentStatus" DEFAULT 'DRAFT'::public."ContentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Church" OWNER TO postgres;

--
-- Name: ClergyMember; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ClergyMember" (
    id text NOT NULL,
    slug text NOT NULL,
    "fullName" text NOT NULL,
    title text NOT NULL,
    biography text,
    "imageUrl" text,
    "ordinationYear" integer,
    education text,
    "ministryFocus" text,
    "publicEmail" text,
    "socialLinks" jsonb,
    "isPrimate" boolean DEFAULT false NOT NULL,
    status public."ContentStatus" DEFAULT 'DRAFT'::public."ContentStatus" NOT NULL,
    "churchId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ClergyMember" OWNER TO postgres;

--
-- Name: ContactMessage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ContactMessage" (
    id text NOT NULL,
    "fullName" text NOT NULL,
    email text NOT NULL,
    phone text,
    subject text,
    message text NOT NULL,
    status public."SubmissionStatus" DEFAULT 'NEW'::public."SubmissionStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ContactMessage" OWNER TO postgres;

--
-- Name: Donation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Donation" (
    id text NOT NULL,
    amount numeric(65,30) NOT NULL,
    currency text DEFAULT 'AMD'::text NOT NULL,
    "donorName" text,
    "donorEmail" text,
    "isAnonymous" boolean DEFAULT false NOT NULL,
    "paymentProvider" public."PaymentProvider" DEFAULT 'MOCK'::public."PaymentProvider" NOT NULL,
    "paymentStatus" public."PaymentStatus" DEFAULT 'INTENT_CREATED'::public."PaymentStatus" NOT NULL,
    "providerReference" text,
    "programId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Donation" OWNER TO postgres;

--
-- Name: DonorHonor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DonorHonor" (
    id text NOT NULL,
    "displayName" text NOT NULL,
    "honorLevel" text NOT NULL,
    message text,
    "sortOrder" integer DEFAULT 0 NOT NULL,
    "isAnonymous" boolean DEFAULT false NOT NULL,
    status public."ContentStatus" DEFAULT 'DRAFT'::public."ContentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."DonorHonor" OWNER TO postgres;

--
-- Name: EtiquetteRule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EtiquetteRule" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "iconKey" text,
    "sortOrder" integer DEFAULT 0 NOT NULL,
    status public."ContentStatus" DEFAULT 'DRAFT'::public."ContentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."EtiquetteRule" OWNER TO postgres;

--
-- Name: Event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event" (
    id text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    description text,
    location text,
    "startsAt" timestamp(3) without time zone NOT NULL,
    "endsAt" timestamp(3) without time zone,
    status public."ContentStatus" DEFAULT 'DRAFT'::public."ContentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Event" OWNER TO postgres;

--
-- Name: FAQ; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FAQ" (
    id text NOT NULL,
    question text NOT NULL,
    answer text NOT NULL,
    category text,
    "sortOrder" integer DEFAULT 0 NOT NULL,
    status public."ContentStatus" DEFAULT 'DRAFT'::public."ContentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."FAQ" OWNER TO postgres;

--
-- Name: FeastDay; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FeastDay" (
    id text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    description text,
    "feastDate" text NOT NULL,
    "isMovable" boolean DEFAULT false NOT NULL,
    status public."ContentStatus" DEFAULT 'DRAFT'::public."ContentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."FeastDay" OWNER TO postgres;

--
-- Name: GalleryImage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GalleryImage" (
    id text NOT NULL,
    url text NOT NULL,
    alt text NOT NULL,
    caption text,
    category text,
    "sortOrder" integer DEFAULT 0 NOT NULL,
    "churchId" text,
    "articleId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."GalleryImage" OWNER TO postgres;

--
-- Name: LibraryItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LibraryItem" (
    id text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    author text,
    description text,
    category public."LibraryCategory" NOT NULL,
    "publicationYear" integer,
    "pageCount" integer,
    language text,
    "fileUrl" text,
    "coverUrl" text,
    status public."ContentStatus" DEFAULT 'DRAFT'::public."ContentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."LibraryItem" OWNER TO postgres;

--
-- Name: LiturgySchedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LiturgySchedule" (
    id text NOT NULL,
    "dayLabel" text NOT NULL,
    "timeLabel" text NOT NULL,
    "serviceType" text NOT NULL,
    note text,
    status public."ContentStatus" DEFAULT 'DRAFT'::public."ContentStatus" NOT NULL,
    "churchId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."LiturgySchedule" OWNER TO postgres;

--
-- Name: MediaItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MediaItem" (
    id text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    description text,
    "mediaType" public."MediaType" NOT NULL,
    "mediaUrl" text,
    "coverUrl" text,
    duration text,
    "publishedAt" timestamp(3) without time zone,
    status public."ContentStatus" DEFAULT 'DRAFT'::public."ContentStatus" NOT NULL,
    "choirId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."MediaItem" OWNER TO postgres;

--
-- Name: NewsArticle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."NewsArticle" (
    id text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    excerpt text,
    content text,
    "coverUrl" text,
    category text,
    "authorName" text,
    "isFeatured" boolean DEFAULT false NOT NULL,
    status public."ContentStatus" DEFAULT 'DRAFT'::public."ContentStatus" NOT NULL,
    "publishedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."NewsArticle" OWNER TO postgres;

--
-- Name: OfficialDocument; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OfficialDocument" (
    id text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    description text,
    "documentType" text NOT NULL,
    "documentDate" timestamp(3) without time zone NOT NULL,
    "fileUrl" text,
    status public."ContentStatus" DEFAULT 'DRAFT'::public."ContentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."OfficialDocument" OWNER TO postgres;

--
-- Name: PilgrimRoute; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PilgrimRoute" (
    id text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    summary text NOT NULL,
    duration text NOT NULL,
    "distanceKm" numeric(65,30),
    difficulty text NOT NULL,
    "coverUrl" text,
    "startLocation" text NOT NULL,
    "endLocation" text NOT NULL,
    itinerary jsonb NOT NULL,
    "transportOptions" jsonb,
    "mapFileUrl" text,
    status public."ContentStatus" DEFAULT 'DRAFT'::public."ContentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."PilgrimRoute" OWNER TO postgres;

--
-- Name: Prayer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Prayer" (
    id text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    category text NOT NULL,
    content text NOT NULL,
    summary text,
    "audioUrl" text,
    status public."ContentStatus" DEFAULT 'DRAFT'::public."ContentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Prayer" OWNER TO postgres;

--
-- Name: QnAQuestion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."QnAQuestion" (
    id text NOT NULL,
    question text NOT NULL,
    answer text,
    "contactEmail" text,
    category text,
    "isAnonymous" boolean DEFAULT true NOT NULL,
    "isPublic" boolean DEFAULT false NOT NULL,
    status public."SubmissionStatus" DEFAULT 'NEW'::public."SubmissionStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."QnAQuestion" OWNER TO postgres;

--
-- Name: SacramentGuide; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SacramentGuide" (
    id text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    summary text NOT NULL,
    content text NOT NULL,
    preparation jsonb,
    status public."ContentStatus" DEFAULT 'DRAFT'::public."ContentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."SacramentGuide" OWNER TO postgres;

--
-- Name: Saint; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Saint" (
    id text NOT NULL,
    slug text NOT NULL,
    name text NOT NULL,
    biography text,
    "feastDate" text,
    "patronOf" text,
    "imageUrl" text,
    status public."ContentStatus" DEFAULT 'DRAFT'::public."ContentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Saint" OWNER TO postgres;

--
-- Name: SocialProgram; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SocialProgram" (
    id text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    summary text,
    description text,
    "coverUrl" text,
    location text,
    beneficiaries integer,
    "startsAt" timestamp(3) without time zone,
    "endsAt" timestamp(3) without time zone,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "goalAmount" numeric(65,30),
    "raisedAmount" numeric(65,30) DEFAULT 0 NOT NULL,
    status public."ContentStatus" DEFAULT 'DRAFT'::public."ContentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."SocialProgram" OWNER TO postgres;

--
-- Name: SuccessStory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SuccessStory" (
    id text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    summary text NOT NULL,
    content text,
    "imageUrl" text,
    "impactLabel" text,
    status public."ContentStatus" DEFAULT 'DRAFT'::public."ContentStatus" NOT NULL,
    "programId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."SuccessStory" OWNER TO postgres;

--
-- Name: UsefulContact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UsefulContact" (
    id text NOT NULL,
    name text NOT NULL,
    category text NOT NULL,
    description text,
    phone text,
    email text,
    address text,
    website text,
    "isPublic" boolean DEFAULT true NOT NULL,
    status public."ContentStatus" DEFAULT 'DRAFT'::public."ContentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."UsefulContact" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    "passwordHash" text NOT NULL,
    name text NOT NULL,
    role public."UserRole" DEFAULT 'EDITOR'::public."UserRole" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: VolunteerApplication; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VolunteerApplication" (
    id text NOT NULL,
    "fullName" text NOT NULL,
    email text NOT NULL,
    phone text,
    interests text,
    availability text,
    message text,
    status public."SubmissionStatus" DEFAULT 'NEW'::public."SubmissionStatus" NOT NULL,
    "programId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."VolunteerApplication" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Announcement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Announcement" (id, slug, title, description, "announcementDate", "expiresAt", priority, status, "createdAt", "updatedAt") FROM stdin;
cmqr59z7a0026fz1mhd9i7owg	vardavar-pilgrimage	Վարդավառի ուխտագնացություն դեպի Տաթև	Մեկնումը Գորիսից՝ առավոտյան 08։00-ին։ Մասնակցության համար անհրաժեշտ է նախապես գրանցվել։	2026-07-12 00:00:00	\N	2	PUBLISHED	2026-06-23 21:16:41.206	2026-06-23 21:16:41.206
cmqr59z7b0027fz1meiybmlr8	choir-auditions	Ընդունելություն թեմական երգչախումբ	Բաց լսումներ 16 տարեկանից բարձր երգիչների համար։	2026-06-20 00:00:00	\N	1	PUBLISHED	2026-06-23 21:16:41.207	2026-06-23 21:16:41.207
\.


--
-- Data for Name: Choir; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Choir" (id, slug, name, description, "imageUrl", conductor, location, status, "createdAt", "updatedAt") FROM stdin;
choir-1	syunik-diocese-choir	Սյունյաց թեմի երգչախումբ	Թեմական տոներին և Սուրբ Պատարագներին ծառայող երգչախումբ։	https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=85	Աննա Սարգսյան	Գորիս	PUBLISHED	2026-06-23 21:16:41.194	2026-06-23 21:16:41.194
choir-2	tatev-children-choir	Տաթև մանկական երգչախումբ	Հոգևոր երգի և հայկական երաժշտական ժառանգության կրթական խումբ։	https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?auto=format&fit=crop&w=1200&q=85	Մարիամ Ավետիսյան	Տաթև	PUBLISHED	2026-06-23 21:16:41.194	2026-06-23 21:16:41.194
\.


--
-- Data for Name: Church; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Church" (id, slug, name, summary, description, address, settlement, century, category, "coverUrl", latitude, longitude, "visitingNote", "serviceSchedule", "isFeatured", "isActive", status, "createdAt", "updatedAt") FROM stdin;
cmqr59z610001fz1mr2fwchsa	tatev-monastery	Տաթևի վանական համալիր	Սյունյաց աշխարհի հոգևոր, կրթական և մշակութային հզոր կենտրոնը։	Տաթևի վանական համալիրը դարեր շարունակ եղել է Սյունյաց աշխարհի հոգևոր սիրտը։ Այստեղ գործել է միջնադարյան Հայաստանի նշանավոր համալսարաններից մեկը, ստեղծվել են ձեռագրեր և ձևավորվել աստվածաբանական միտք։	\N	Տաթև գյուղ	IX–XIII դդ.	ACTIVE_MONASTERY	https://images.unsplash.com/photo-1605537964076-3cb0ea2ff329?auto=format&fit=crop&w=1600&q=85	39.379200000000000000000000000000	46.250500000000000000000000000000	Համալիրը բաց է ամեն օր։ Խնդրում ենք պահպանել սրբավայրին պատշաճ լռություն։	Սուրբ Պատարագ՝ կիրակի, 11։00	t	t	PUBLISHED	2026-06-23 21:16:41.161	2026-06-23 21:16:41.161
cmqr59z660008fz1mpti0fo6y	vahanavank-monastery	Վահանավանք	Ողջի գետի հովտում գտնվող Սյունյաց իշխանական վանական համալիր։	Վահանավանքը հիմնադրվել է Սյունյաց իշխան Վահանի կողմից։ Համալիրը պատմականորեն ծառայել է որպես հոգևոր կենտրոն և Սյունյաց իշխանների տոհմական դամբարան։	\N	Կապան	X–XI դդ.	ACTIVE_MONASTERY	https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&w=1600&q=85	39.235000000000000000000000000000	46.350700000000000000000000000000	Ճանապարհի վերջին հատվածը լեռնային է։ Նախընտրելի է այցելել լուսավոր ժամերին։	Ժամերգություն՝ տոնական օրերին	t	t	PUBLISHED	2026-06-23 21:16:41.167	2026-06-23 21:16:41.167
cmqr59z68000dfz1mham2f2tk	vorotnavank-monastery	Որոտնավանք	Որոտանի կիրճին նայող պատմական վանք՝ նվիրված Սուրբ Գրիգորին։	Որոտնավանքը Սյունիքի միջնադարյան կարևոր հոգևոր կենտրոններից է։ Վանքը ներդաշնակորեն միաձուլված է Որոտանի կիրճի խիստ ու վեհ բնապատկերին։	\N	Վաղատին գյուղ	X–XI դդ.	ACTIVE_MONASTERY	https://images.unsplash.com/photo-1568322503342-2b9c7f5efb1b?auto=format&fit=crop&w=1600&q=85	39.499500000000000000000000000000	46.113500000000000000000000000000	Մուտքն ազատ է։ Տարածքում պահպանեք մաքրությունը։	\N	f	t	PUBLISHED	2026-06-23 21:16:41.168	2026-06-23 21:16:41.168
cmqr59z69000gfz1m8iwv83jc	saint-gregory-goris	Սուրբ Գրիգոր Լուսավորիչ եկեղեցի	Գորիսի համայնքի գործող եկեղեցին և թեմական կյանքի կարևոր կենտրոնը։	Գորիսի Սուրբ Գրիգոր Լուսավորիչ եկեղեցին քաղաքի հոգևոր կյանքի կենտրոններից է՝ միավորելով ընտանիքներին, երիտասարդներին և ուխտավորներին։	\N	Գորիս	XX դ.	CITY_CHURCH	https://images.unsplash.com/photo-1548625361-58a9b86aa83b?auto=format&fit=crop&w=1600&q=85	39.511100000000000000000000000000	46.341700000000000000000000000000	Եկեղեցին բաց է ամեն օր։	Սուրբ Պատարագ՝ կիրակի, 10։30	t	t	PUBLISHED	2026-06-23 21:16:41.169	2026-06-23 21:16:41.169
cmqr59z6a000jfz1mefc4b6ay	tanahat-monastery	Թանահատի վանք	Վաղմիջնադարյան սրբավայր Սյունիքի բարձրադիր լեռնաշխարհում։	Թանահատի վանքը Սյունիքի վաղ քրիստոնեական ժառանգության կարևոր վկայություններից է։ Պահպանված ավերակներն ու խաչքարերը պատմում են տարածքի դարավոր հոգևոր կյանքի մասին։	\N	Արևիս գյուղի մոտ	V–VIII դդ.	RUINED_SANCTUARY	https://images.unsplash.com/photo-1520637836862-4d197d17c93a?auto=format&fit=crop&w=1600&q=85	39.690400000000000000000000000000	45.851600000000000000000000000000	Տարածքը բարեկարգված չէ։ Այցելեք ուղեկցորդով և հարմար կոշիկներով։	\N	f	t	PUBLISHED	2026-06-23 21:16:41.17	2026-06-23 21:16:41.17
cmqr59z6b000mfz1mpvusiau3	bgheno-noravank	Բղենո Նորավանք	Անտառապատ լեռներում թաքնված վանք՝ կապված Էջմիածնի Ավետարանի հետ։	Բղենո Նորավանքը հայկական գրքարվեստի պատմության մեջ առանձնահատուկ տեղ ունի։ Այստեղ է ստեղծվել նշանավոր Էջմիածնի Ավետարանի մանրանկարների մի մասը։	\N	Բարձրավան գյուղի մոտ	X–XI դդ.	RUINED_SANCTUARY	https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85	39.322600000000000000000000000000	46.187300000000000000000000000000	Դժվարամատչելի արահետ։ Անհրաժեշտ է տեղական ուղեկցորդ։	\N	f	t	PUBLISHED	2026-06-23 21:16:41.171	2026-06-23 21:16:41.171
cmqr59z6c000pfz1m1l9dw36u	saint-stephen-shinuhayr	Սուրբ Ստեփանոս եկեղեցի	Գյուղական համայնքի պատմական եկեղեցի՝ կենդանի ծիսական ավանդույթով։	Շինուհայրի Սուրբ Ստեփանոս եկեղեցին դարեր շարունակ եղել է համայնքի հավաքական հիշողության և աղոթքի վայրը։	\N	Շինուհայր գյուղ	XVII դ.	VILLAGE_CHURCH	https://images.unsplash.com/photo-1548625361-58a9b86aa83b?auto=format&fit=crop&w=1600&q=85	39.435400000000000000000000000000	46.317000000000000000000000000000	Այցից առաջ խորհուրդ է տրվում կապ հաստատել համայնքի պատասխանատուի հետ։	Ժամերգություն՝ կիրակի օրերին	f	t	PUBLISHED	2026-06-23 21:16:41.172	2026-06-23 21:16:41.172
cmqr59z6c000sfz1mlqxzla0o	harjis-saint-minas-chapel	Սուրբ Մինաս մատուռ	Փոքր ուխտատեղի՝ Սյունյաց լեռնային ճանապարհների եզրին։	Սուրբ Մինաս մատուռը տեղական ուխտագնացության և ընտանեկան աղոթքի սիրված վայր է։	\N	Հարժիս գյուղի մոտ	XIX դ.	CHAPEL	https://images.unsplash.com/photo-1520637836862-4d197d17c93a?auto=format&fit=crop&w=1600&q=85	39.535000000000000000000000000000	46.109000000000000000000000000000	Մատուռ տանող ճանապարհը հարմար է միայն չոր եղանակին։	\N	f	t	PUBLISHED	2026-06-23 21:16:41.173	2026-06-23 21:16:41.173
\.


--
-- Data for Name: ClergyMember; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ClergyMember" (id, slug, "fullName", title, biography, "imageUrl", "ordinationYear", education, "ministryFocus", "publicEmail", "socialLinks", "isPrimate", status, "churchId", "createdAt", "updatedAt") FROM stdin;
cmqr59z6g000zfz1mo83t7qsg	diocesan-primate	Գերաշնորհ Տ. Մակար եպիսկոպոս	Սյունյաց թեմի առաջնորդ	Սյունյաց թեմի առաջնորդը ծառայում է թեմի հոգևոր կյանքի զորացմանը, համայնքների միավորմանը և պատմական ժառանգության պահպանությանը։ Նրա առաջնորդությամբ թեմը զարգացնում է կրթական, երիտասարդական և սոցիալական ծրագրեր։	https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=85	2001	Գևորգյան հոգևոր ճեմարան, աստվածաբանական բարձրագույն կրթություն	Հովվական առաջնորդություն, կրթություն և սոցիալական ծառայություն	office@syunikdiocese.am	\N	t	PUBLISHED	cmqr59z69000gfz1m8iwv83jc	2026-06-23 21:16:41.176	2026-06-23 21:16:41.176
cmqr59z6i0010fz1mtca16v7p	father-mikayel-tatev	Հոգեշնորհ Տ. Միքայել վարդապետ	Տաթևի վանքի վանահայր	Ծառայում է Տաթևի վանական համալիրում՝ առաջնորդելով վանական համայնքի հոգևոր և ուխտավորների ընդունելության առաքելությունը։	https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85	2010	\N	Վանական կյանք և ուխտավորների հոգևոր խնամք	\N	\N	f	PUBLISHED	cmqr59z610001fz1mr2fwchsa	2026-06-23 21:16:41.178	2026-06-23 21:16:41.178
cmqr59z6j0011fz1mun3zl05r	father-narek-goris	Արժանապատիվ Տ. Նարեկ քահանա	Ծխական քահանա	Ծառայում է Գորիսի համայնքին՝ հոգևոր խնամքի, երիտասարդական աշխատանքի և ընտանեկան խորհրդատվության ոլորտներում։	https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85	2015	\N	Ընտանիքների և երիտասարդների հոգևոր խնամք	\N	\N	f	PUBLISHED	cmqr59z69000gfz1m8iwv83jc	2026-06-23 21:16:41.179	2026-06-23 21:16:41.179
cmqr59z6j0012fz1m9x35tv2d	father-vahan-kapan	Արժանապատիվ Տ. Վահան քահանա	Կապանի տարածաշրջանի հոգևոր հովիվ	Հոգևոր ծառայություն է իրականացնում Կապանի և հարակից համայնքների ընտանիքների, տարեցների և սոցիալական կենտրոնների համար։	https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=1000&q=85	2012	\N	Համայնքային և սոցիալական ծառայություն	\N	\N	f	PUBLISHED	cmqr59z660008fz1mpti0fo6y	2026-06-23 21:16:41.18	2026-06-23 21:16:41.18
\.


--
-- Data for Name: ContactMessage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ContactMessage" (id, "fullName", email, phone, subject, message, status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Donation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Donation" (id, amount, currency, "donorName", "donorEmail", "isAnonymous", "paymentProvider", "paymentStatus", "providerReference", "programId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: DonorHonor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."DonorHonor" (id, "displayName", "honorLevel", message, "sortOrder", "isAnonymous", status, "createdAt", "updatedAt") FROM stdin;
cmqr59z6s001cfz1m94kp6fem	Սյունյաց բարեկամներ հիմնադրամ	Ոսկե աջակից	Տարիներ շարունակ թեմի սոցիալական ծրագրերի կողքին։	0	f	PUBLISHED	2026-06-23 21:16:41.188	2026-06-23 21:16:41.188
cmqr59z6s001dfz1msa5vgq45	Անանուն բարերար	Արծաթե աջակից	\N	1	t	PUBLISHED	2026-06-23 21:16:41.188	2026-06-23 21:16:41.188
cmqr59z6s001efz1mmwhy9dnb	Գորիսի համայնքային խումբ	Համայնքի բարեկամ	Կամավորական և նյութական մշտական աջակցություն։	2	f	PUBLISHED	2026-06-23 21:16:41.188	2026-06-23 21:16:41.188
cmqr59z6s001ffz1mt0n6n3qj	Սյունեցի ընտանիքներ	Համայնքի բարեկամ	\N	3	f	PUBLISHED	2026-06-23 21:16:41.188	2026-06-23 21:16:41.188
\.


--
-- Data for Name: EtiquetteRule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."EtiquetteRule" (id, title, description, "iconKey", "sortOrder", status, "createdAt", "updatedAt") FROM stdin;
cmqr59z77001ufz1mvf0hcoyz	Պահպանեք լռությունը	Սրբավայրում խոսեք ցածր ձայնով և հարգեք աղոթողներին։	volume	1	PUBLISHED	2026-06-23 21:16:41.203	2026-06-23 21:16:41.203
cmqr59z77001vfz1myepwzy2h	Հագնվեք պատշաճ	Ընտրեք համեստ և սրբավայրին համապատասխան հագուստ։	shirt	2	PUBLISHED	2026-06-23 21:16:41.203	2026-06-23 21:16:41.203
cmqr59z77001wfz1m546ltakw	Լուսանկարեք թույլտվությամբ	Ծիսական արարողության ընթացքում նախապես հարցրեք թույլտվություն։	camera	3	PUBLISHED	2026-06-23 21:16:41.203	2026-06-23 21:16:41.203
cmqr59z77001xfz1ms1b5yg3f	Պահպանեք մաքրությունը	Մի թողեք աղբ և մի վնասեք պատմական քարերը կամ խաչքարերը։	leaf	4	PUBLISHED	2026-06-23 21:16:41.203	2026-06-23 21:16:41.203
cmqr59z77001yfz1m1ppqyz3o	Հետևեք տեղական ցուցումներին	Դժվարամատչելի վայրերում առաջնորդվեք ուղեկցորդի խորհրդով։	shield	5	PUBLISHED	2026-06-23 21:16:41.203	2026-06-23 21:16:41.203
\.


--
-- Data for Name: Event; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event" (id, slug, title, description, location, "startsAt", "endsAt", status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: FAQ; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."FAQ" (id, question, answer, category, "sortOrder", status, "createdAt", "updatedAt") FROM stdin;
cmqr59z7d002dfz1mxc0ctiyd	Ինչպե՞ս կարող եմ մասնակցել Սուրբ Պատարագին։	Կարող եք այցելել գործող եկեղեցիներից որևէ մեկը հրապարակված ժամանակացույցով։ Նախնական գրանցում անհրաժեշտ չէ։	Եկեղեցական կյանք	1	PUBLISHED	2026-06-23 21:16:41.209	2026-06-23 21:16:41.209
cmqr59z7d002efz1m8zdpuzru	Ինչպե՞ս կազմակերպել ուխտագնացություն։	Դիմեք թեմի ուխտավորների աջակցության կոնտակտին կամ օգտվեք Ուխտավորի ուղեցույցի պատրաստ երթուղիներից։	Ուխտագնացություն	2	PUBLISHED	2026-06-23 21:16:41.209	2026-06-23 21:16:41.209
cmqr59z7d002ffz1mvr4e5llw	Ինչպե՞ս աջակցել սոցիալական ծրագրերին։	Կարող եք ընտրել գործող սոցիալական ծրագիր, ստեղծել mock donation intent կամ լրացնել կամավորի դիմումը։	Աջակցություն	3	PUBLISHED	2026-06-23 21:16:41.209	2026-06-23 21:16:41.209
\.


--
-- Data for Name: FeastDay; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."FeastDay" (id, slug, title, description, "feastDate", "isMovable", status, "createdAt", "updatedAt") FROM stdin;
feast-1	holy-nativity	Սուրբ Ծնունդ և Աստվածահայտնություն	Մեր Տեր Հիսուս Քրիստոսի Ծննդյան և Մկրտության տոնը։	01-06	f	PUBLISHED	2026-06-23 21:16:41.191	2026-06-23 21:16:41.191
feast-2	holy-easter	Սուրբ Հարություն	Քրիստոսի հրաշափառ Հարության տոնը։	MOVABLE	t	PUBLISHED	2026-06-23 21:16:41.192	2026-06-23 21:16:41.192
feast-3	transfiguration	Պայծառակերպություն	Վարդավառ՝ Տիրոջ Պայծառակերպության տոնը։	MOVABLE	t	PUBLISHED	2026-06-23 21:16:41.192	2026-06-23 21:16:41.192
feast-4	exaltation-cross	Խաչվերաց	Սուրբ Խաչի բարձրացման տոնը։	09-14	f	PUBLISHED	2026-06-23 21:16:41.192	2026-06-23 21:16:41.192
\.


--
-- Data for Name: GalleryImage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."GalleryImage" (id, url, alt, caption, category, "sortOrder", "churchId", "articleId", "createdAt") FROM stdin;
cmqr59z610002fz1mvwbj14va	https://images.unsplash.com/photo-1605537964076-3cb0ea2ff329?auto=format&fit=crop&w=1600&q=85	Տաթևի վանական համալիրը	\N	\N	0	cmqr59z610001fz1mr2fwchsa	\N	2026-06-23 21:16:41.161
cmqr59z610003fz1ml2is80rm	https://images.unsplash.com/photo-1568322503342-2b9c7f5efb1b?auto=format&fit=crop&w=1400&q=85	Վանական համալիր և լեռներ	\N	\N	0	cmqr59z610001fz1mr2fwchsa	\N	2026-06-23 21:16:41.161
cmqr59z610004fz1mbb6635pl	https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1400&q=85	Տաթևի ճարտարապետական մանրամասներ	\N	\N	0	cmqr59z610001fz1mr2fwchsa	\N	2026-06-23 21:16:41.161
cmqr59z660009fz1mp9wt39sj	https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&w=1600&q=85	Վահանավանքը	\N	\N	0	cmqr59z660008fz1mpti0fo6y	\N	2026-06-23 21:16:41.167
cmqr59z66000afz1mtavni9ob	https://images.unsplash.com/photo-1520637836862-4d197d17c93a?auto=format&fit=crop&w=1400&q=85	Վահանավանքի քարե պատերը	\N	\N	0	cmqr59z660008fz1mpti0fo6y	\N	2026-06-23 21:16:41.167
cmqr59z68000efz1mosw2lg9z	https://images.unsplash.com/photo-1568322503342-2b9c7f5efb1b?auto=format&fit=crop&w=1600&q=85	Որոտնավանքը	\N	\N	0	cmqr59z68000dfz1mham2f2tk	\N	2026-06-23 21:16:41.168
cmqr59z69000hfz1m4gm8w4kp	https://images.unsplash.com/photo-1548625361-58a9b86aa83b?auto=format&fit=crop&w=1600&q=85	Գորիսի Սուրբ Գրիգոր Լուսավորիչ եկեղեցին	\N	\N	0	cmqr59z69000gfz1m8iwv83jc	\N	2026-06-23 21:16:41.169
cmqr59z6a000kfz1mca65g0r7	https://images.unsplash.com/photo-1520637836862-4d197d17c93a?auto=format&fit=crop&w=1600&q=85	Թանահատի վանքի ավերակները	\N	\N	0	cmqr59z6a000jfz1mefc4b6ay	\N	2026-06-23 21:16:41.17
cmqr59z6b000nfz1m37leafe7	https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85	Բղենո Նորավանք	\N	\N	0	cmqr59z6b000mfz1mpvusiau3	\N	2026-06-23 21:16:41.171
cmqr59z6c000qfz1majynnxvp	https://images.unsplash.com/photo-1548625361-58a9b86aa83b?auto=format&fit=crop&w=1400&q=85	Սուրբ Ստեփանոս եկեղեցի	\N	\N	0	cmqr59z6c000pfz1m1l9dw36u	\N	2026-06-23 21:16:41.172
cmqr59z6c000tfz1mklkz86o8	https://images.unsplash.com/photo-1520637836862-4d197d17c93a?auto=format&fit=crop&w=1400&q=85	Սուրբ Մինաս մատուռ	\N	\N	0	cmqr59z6c000sfz1mlqxzla0o	\N	2026-06-23 21:16:41.173
cmqr59z770020fz1mm26e8vee	https://images.unsplash.com/photo-1605537964076-3cb0ea2ff329?auto=format&fit=crop&w=1400&q=85	Տաթևի վանական համալիր	Տաթևի վանական համալիրի համայնապատկերը	Սրբավայրեր	1	\N	cmqr59z77001zfz1mnsk1sayu	2026-06-23 21:16:41.204
cmqr59z780021fz1mcqvusj26	https://images.unsplash.com/photo-1568322503342-2b9c7f5efb1b?auto=format&fit=crop&w=1400&q=85	Սյունյաց լեռներ	\N	Բնություն	2	\N	cmqr59z77001zfz1mnsk1sayu	2026-06-23 21:16:41.204
cmqr59z7b0028fz1mk2tcq24d	https://images.unsplash.com/photo-1605537964076-3cb0ea2ff329?auto=format&fit=crop&w=1400&q=85	Տաթևի վանական համալիր	Տաթևի վանական համալիրի համայնապատկերը	Սրբավայրեր	1	\N	\N	2026-06-23 21:16:41.208
cmqr59z7b0029fz1ml04cl9g3	https://images.unsplash.com/photo-1568322503342-2b9c7f5efb1b?auto=format&fit=crop&w=1400&q=85	Սյունյաց լեռներ	\N	Բնություն	2	\N	\N	2026-06-23 21:16:41.208
cmqr59z7b002afz1m444t5wud	https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&q=85	Թեմական երգչախումբ	Թեմական տոնական համերգ	Համայնք	3	\N	\N	2026-06-23 21:16:41.208
cmqr59z7b002bfz1m7bos5hwn	https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=85	Երեխաների կրթական ծրագիր	\N	Սոցիալական ծառայություն	4	\N	\N	2026-06-23 21:16:41.208
cmqr59z7b002cfz1mu678vk9z	https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&w=1400&q=85	Վահանավանք	\N	Սրբավայրեր	5	\N	\N	2026-06-23 21:16:41.208
\.


--
-- Data for Name: LibraryItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."LibraryItem" (id, slug, title, author, description, category, "publicationYear", "pageCount", language, "fileUrl", "coverUrl", status, "createdAt", "updatedAt") FROM stdin;
cmqr59z6d000vfz1m1mb1l0s6	tatev-manuscript-heritage	Տաթևի դպրոցի ձեռագրական ժառանգությունը	Սյունյաց թեմի արխիվ	Թվայնացված ընտրանի Տաթևի դպրոցի ձեռագրերից և մանրանկարներից։	MANUSCRIPT	1378	84	Հայերեն	\N	https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=85	PUBLISHED	2026-06-23 21:16:41.174	2026-06-23 21:16:41.174
cmqr59z6f000wfz1mrf5qakf7	spiritual-centers-of-syunik	Սյունյաց աշխարհի հոգևոր կենտրոնները	Պատմամշակութային ուսումնասիրությունների կենտրոն	Գիտական ուսումնասիրություն Սյունիքի վանական համալիրների պատմության վերաբերյալ։	PDF	2024	146	Հայերեն	/library/spiritual-centers-of-syunik.pdf	https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=85	PUBLISHED	2026-06-23 21:16:41.175	2026-06-23 21:16:41.175
cmqr59z6f000xfz1ma4c5qc98	syunik-architectural-school	Սյունյաց ճարտարապետական դպրոցը	Ա. Մանուչարյան	Հոդված Սյունյաց եկեղեցաշինության առանձնահատկությունների և զարդարվեստի մասին։	ARTICLE	2022	24	Հայերեն	/library/syunik-architecture.pdf	https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=85	PUBLISHED	2026-06-23 21:16:41.176	2026-06-23 21:16:41.176
cmqr59z6f000yfz1mhhg3iq38	vahanavank-history	Վահանավանք. պատմություն և վիմագրեր	Մ. Գրիգորյան	Վահանավանքի պատմական արձանագրությունների ուսումնասիրություն։	PDF	2019	72	Հայերեն	/library/vahanavank-history.pdf	https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=85	PUBLISHED	2026-06-23 21:16:41.176	2026-06-23 21:16:41.176
\.


--
-- Data for Name: LiturgySchedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."LiturgySchedule" (id, "dayLabel", "timeLabel", "serviceType", note, status, "churchId", "createdAt", "updatedAt") FROM stdin;
cmqr59z74001nfz1mfzrzx374	Կիրակի	11։00	Սուրբ Պատարագ	Խորհուրդ է տրվում ժամանել 20 րոպե շուտ։	PUBLISHED	cmqr59z610001fz1mr2fwchsa	2026-06-23 21:16:41.2	2026-06-23 21:16:41.2
cmqr59z75001ofz1myt0tl7ca	Կիրակի	10։30	Սուրբ Պատարագ	\N	PUBLISHED	cmqr59z69000gfz1m8iwv83jc	2026-06-23 21:16:41.201	2026-06-23 21:16:41.201
cmqr59z75001pfz1mdlozdey5	Տոնական օրեր	11։00	Ժամերգություն	Նախապես ճշտել թեմի գրասենյակից։	PUBLISHED	cmqr59z660008fz1mpti0fo6y	2026-06-23 21:16:41.202	2026-06-23 21:16:41.202
\.


--
-- Data for Name: MediaItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MediaItem" (id, slug, title, description, "mediaType", "mediaUrl", "coverUrl", duration, "publishedAt", status, "choirId", "createdAt", "updatedAt") FROM stdin;
cmqr59z6y001gfz1m8up7grjb	silence-of-tatev	Տաթևի լռությունը. ինչպե՞ս լսել աղոթքը	«Սյունյաց շունչ» զրույց հոգևոր լռության մասին։	PODCAST	\N	https://images.unsplash.com/photo-1605537964076-3cb0ea2ff329?auto=format&fit=crop&w=1200&q=85	28։42	2026-06-01 00:00:00	PUBLISHED	\N	2026-06-23 21:16:41.195	2026-06-23 21:16:41.195
cmqr59z70001hfz1m6knm9061	light-of-hope-sermon	Հույսի լույսը	Կիրակնօրյա քարոզ՝ դժվար ժամանակներում հույսը պահպանելու մասին։	SERMON	\N	https://images.unsplash.com/photo-1548625361-58a9b86aa83b?auto=format&fit=crop&w=1200&q=85	18։15	2026-05-25 00:00:00	PUBLISHED	\N	2026-06-23 21:16:41.196	2026-06-23 21:16:41.196
cmqr59z70001ifz1mrh40dhno	surp-surb-sharakan	Սուրբ, Սուրբ	Սուրբ Պատարագի շարական՝ Սյունյաց թեմի երգչախմբի կատարմամբ։	SHARAKAN	\N	https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=85	06։18	2026-05-10 00:00:00	PUBLISHED	choir-1	2026-06-23 21:16:41.197	2026-06-23 21:16:41.197
cmqr59z71001jfz1mbesp0045	one-day-at-tatev	Մեկ օր Տաթևում	Տեսապատում վանական համալիրի առօրյայից։	VLOG	\N	https://images.unsplash.com/photo-1568322503342-2b9c7f5efb1b?auto=format&fit=crop&w=1200&q=85	12։30	2026-04-18 00:00:00	PUBLISHED	\N	2026-06-23 21:16:41.198	2026-06-23 21:16:41.198
cmqr59z72001kfz1m9yoypcsz	morning-hymn	Առավոտ լուսո	Հոգևոր երգի ձայնագրություն։	CHOIR_RECORDING	\N	https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?auto=format&fit=crop&w=1200&q=85	04։52	2026-03-14 00:00:00	PUBLISHED	choir-2	2026-06-23 21:16:41.198	2026-06-23 21:16:41.198
\.


--
-- Data for Name: NewsArticle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."NewsArticle" (id, slug, title, excerpt, content, "coverUrl", category, "authorName", "isFeatured", status, "publishedAt", "createdAt", "updatedAt") FROM stdin;
cmqr59z77001zfz1mnsk1sayu	tatev-pilgrimage-day	Տաթևում կայացավ թեմական ուխտագնացության օրը	Հարյուրավոր ուխտավորներ միավորվեցին Սուրբ Պատարագի և համայնքային օրվա շուրջ։	Տաթևի վանական համալիրում թեմի համայնքների մասնակցությամբ կայացավ ամենամյա ուխտագնացության օրը։ Օրը սկսվեց Սուրբ Պատարագով և շարունակվեց հոգևոր զրույցներով ու համայնքային հանդիպումներով։	https://images.unsplash.com/photo-1605537964076-3cb0ea2ff329?auto=format&fit=crop&w=1600&q=85	Թեմական կյանք	Սյունյաց թեմի լրատվական ծառայություն	t	PUBLISHED	2026-06-02 00:00:00	2026-06-23 21:16:41.204	2026-06-23 21:16:41.204
cmqr59z790024fz1m70yazlbj	youth-volunteer-program	Մեկնարկեց երիտասարդ կամավորների ամառային ծրագիրը	Սյունիքի երիտասարդները կմասնակցեն սոցիալական և ժառանգության պահպանության ծրագրերին։	Ամառային ծրագրի ընթացքում երիտասարդները կաջակցեն համայնքային կենտրոններին, կկազմակերպեն կրթական հանդիպումներ և կմասնակցեն սրբավայրերի տարածքների խնամքին։	https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=85	Երիտասարդություն	Սյունյաց թեմ	f	PUBLISHED	2026-05-26 00:00:00	2026-06-23 21:16:41.205	2026-06-23 21:16:41.205
cmqr59z790025fz1m4pblfa05	warm-home-progress	«Տաք տուն» ծրագրի աջակցությունը հասավ 32 ընտանիքի	Ծրագրի առաջին փուլում տրամադրվել են ջեռուցման միջոցներ և վառելիք։	Սահմանամերձ համայնքներում ծրագրի առաջին փուլն ավարտվել է։ Աջակցությունը շարունակվելու է տարվա ընթացքում՝ ընդգրկելով նոր ընտանիքներ։	https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=85	Սոցիալական ծառայություն	Սյունյաց թեմ	f	PUBLISHED	2026-05-18 00:00:00	2026-06-23 21:16:41.206	2026-06-23 21:16:41.206
\.


--
-- Data for Name: OfficialDocument; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OfficialDocument" (id, slug, title, description, "documentType", "documentDate", "fileUrl", status, "createdAt", "updatedAt") FROM stdin;
cmqr59z6l0013fz1mhbn8t464	diocese-charter	Սյունյաց թեմի կանոնադրություն	Թեմի առաքելությունը, կառավարման սկզբունքները և ծառայության ուղղությունները։	Կանոնադրություն	2025-02-10 00:00:00	/documents/diocese-charter.pdf	PUBLISHED	2026-06-23 21:16:41.181	2026-06-23 21:16:41.181
cmqr59z6l0014fz1mtl9hiojt	annual-report-2025	2025 թվականի տարեկան հաշվետվություն	Թեմի հոգևոր, սոցիալական և մշակութային գործունեության ամփոփ հաշվետվություն։	Հաշվետվություն	2026-03-01 00:00:00	/documents/annual-report-2025.pdf	PUBLISHED	2026-06-23 21:16:41.182	2026-06-23 21:16:41.182
cmqr59z6m0015fz1ma341dbjy	pilgrimage-guideline	Ուխտագնացությունների կազմակերպման ուղեցույց	Թեմի սրբավայրերում կազմակերպված ուխտագնացությունների պաշտոնական ուղեցույց։	Ուղեցույց	2025-05-18 00:00:00	/documents/pilgrimage-guideline.pdf	PUBLISHED	2026-06-23 21:16:41.182	2026-06-23 21:16:41.182
\.


--
-- Data for Name: PilgrimRoute; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PilgrimRoute" (id, slug, title, summary, duration, "distanceKm", difficulty, "coverUrl", "startLocation", "endLocation", itinerary, "transportOptions", "mapFileUrl", status, "createdAt", "updatedAt") FROM stdin;
cmqr59z72001lfz1mv574ybqk	one-day-in-tatev	Մեկ օր Տաթևում	Գործնական մեկօրյա ուխտագնացություն դեպի Տաթևի վանական համալիր և Որոտանի կիրճ։	1 օր	38.000000000000000000000000000000	Հեշտ	https://images.unsplash.com/photo-1605537964076-3cb0ea2ff329?auto=format&fit=crop&w=1600&q=85	Գորիս	Տաթև	[{"time": "08։30", "title": "Մեկնում Գորիսից", "location": "Գորիս", "description": "Հավաք և ճանապարհային կարճ տեղեկացում։"}, {"time": "10։00", "title": "Ժամանում Տաթև", "location": "Տաթևի վանք", "description": "Վանական համալիրի ճանաչողական շրջայց։"}, {"time": "11։00", "title": "Սուրբ Պատարագ / աղոթք", "location": "Սբ. Պողոս-Պետրոս եկեղեցի", "description": "Ըստ օրվա եկեղեցական կարգի։"}, {"time": "13։00", "title": "Հանգիստ և ճաշ", "location": "Տաթև գյուղ", "description": "Անհատական ժամանակ ուխտավորների համար։"}, {"time": "16։30", "title": "Վերադարձ", "location": "Տաթև", "description": "Մեկնում դեպի Գորիս։"}]	["Մասնավոր մեքենա՝ մոտ 50 րոպե", "Տաքսի Գորիսից", "Կազմակերպված ուխտավորական ավտոբուս"]	/maps/one-day-in-tatev.pdf	PUBLISHED	2026-06-23 21:16:41.199	2026-06-23 21:16:41.199
cmqr59z73001mfz1mb99ro038	monasteries-of-kapan	Կապանի վանական ճանապարհը	Վահանավանք և շրջակա պատմական սրբավայրեր՝ մեկ օրվա ընթացքում։	1 օր	26.000000000000000000000000000000	Միջին	https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&w=1600&q=85	Կապան	Վահանավանք	[{"time": "09։00", "title": "Մեկնում Կապանից", "location": "Կապան", "description": "Ճանապարհ դեպի Վահանավանք։"}, {"time": "10։00", "title": "Վահանավանք", "location": "Վահանավանք", "description": "Աղոթք և պատմական շրջայց։"}, {"time": "14։00", "title": "Բնության արահետ", "location": "Ողջի գետի հովիտ", "description": "Կարճ քայլարշավ շրջակա տարածքում։"}]	["Ամենագնաց մեքենա", "Տեղական ուղեկցորդով երթուղի"]	/maps/kapan-monasteries.pdf	PUBLISHED	2026-06-23 21:16:41.2	2026-06-23 21:16:41.2
\.


--
-- Data for Name: Prayer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Prayer" (id, slug, title, category, content, summary, "audioUrl", status, "createdAt", "updatedAt") FROM stdin;
prayer-1	morning-prayer	Առավոտյան աղոթք	Օրվա աղոթքներ	Տե՛ր, առաջնորդիր իմ քայլերը այս նոր օրվա ընթացքում և շնորհիր խաղաղություն իմ սրտին։	Օրը Աստծո ներկայությամբ սկսելու աղոթք։	\N	PUBLISHED	2026-06-23 21:16:41.188	2026-06-23 21:16:41.188
prayer-2	family-prayer	Աղոթք ընտանիքի համար	Ընտանիք	Օրհնի՛ր, Տե՛ր, մեր տունը, պահպանի՛ր սիրո և ներողամտության մեջ։	Օրհնության և միաբանության աղոթք ընտանիքի համար։	\N	PUBLISHED	2026-06-23 21:16:41.189	2026-06-23 21:16:41.189
prayer-3	healing-prayer	Աղոթք բժշկության համար	Առողջություն	Բժշկի՛ր մեր հոգին և մարմինը, Տե՛ր, և շնորհիր համբերություն ու հույս։	Մխիթարության և զորության խնդրանք հիվանդության ժամանակ։	\N	PUBLISHED	2026-06-23 21:16:41.189	2026-06-23 21:16:41.189
prayer-4	evening-prayer	Երեկոյան աղոթք	Օրվա աղոթքներ	Գոհանում եմ Քեզանից այս օրվա համար. պահպանի՛ր մեզ գիշերվա խաղաղության մեջ։	Շնորհակալություն անցած օրվա և խաղաղ գիշերվա համար։	\N	PUBLISHED	2026-06-23 21:16:41.19	2026-06-23 21:16:41.19
\.


--
-- Data for Name: QnAQuestion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."QnAQuestion" (id, question, answer, "contactEmail", category, "isAnonymous", "isPublic", status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: SacramentGuide; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SacramentGuide" (id, slug, title, summary, content, preparation, status, "createdAt", "updatedAt") FROM stdin;
guide-1	baptism	Մկրտություն	Քրիստոնեական կյանքի սկիզբը և Եկեղեցու անդամ դառնալու խորհուրդը։	Մկրտության խորհրդով մարդը վերածնվում է ջրից և Հոգուց։	["Կապ հաստատել ծխական քահանայի հետ", "Ընտրել կնքահայր", "Մասնակցել նախապատրաստական զրույցին"]	PUBLISHED	2026-06-23 21:16:41.192	2026-06-23 21:16:41.192
guide-2	wedding	Պսակադրություն	Ընտանիքի ստեղծման և ամուսնական միության օրհնության խորհուրդը։	Պսակադրությամբ ամուսինները ստանում են Աստծո օրհնությունը միասնական կյանքի համար։	["Նախապես դիմել եկեղեցի", "Ներկայացնել անհրաժեշտ փաստաթղթերը", "Մասնակցել հոգևոր զրույցին"]	PUBLISHED	2026-06-23 21:16:41.193	2026-06-23 21:16:41.193
guide-3	confession	Խոստովանություն	Ապաշխարության, ներողության և հոգևոր նորոգության ճանապարհ։	Խոստովանությունը անկեղծ վերադարձ է դեպի Աստծո ողորմությունը։	["Քննել սեփական խիղճը", "Աղոթքով պատրաստվել", "Անկեղծորեն զրուցել հոգևորականի հետ"]	PUBLISHED	2026-06-23 21:16:41.193	2026-06-23 21:16:41.193
\.


--
-- Data for Name: Saint; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Saint" (id, slug, name, biography, "feastDate", "patronOf", "imageUrl", status, "createdAt", "updatedAt") FROM stdin;
saint-1	saint-gregory-illuminator	Սուրբ Գրիգոր Լուսավորիչ	Հայոց առաջին Հայրապետը և Հայաստանի լուսավորիչը։	06-27	Հայոց աշխարհի	https://images.unsplash.com/photo-1548625361-58a9b86aa83b?auto=format&fit=crop&w=900&q=85	PUBLISHED	2026-06-23 21:16:41.19	2026-06-23 21:16:41.19
saint-2	saint-mesrop-mashtots	Սուրբ Մեսրոպ Մաշտոց	Հայոց գրերի ստեղծողը, վարդապետ և լուսավորիչ։	02-17	Կրթության և գրերի	https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=85	PUBLISHED	2026-06-23 21:16:41.191	2026-06-23 21:16:41.191
saint-3	saint-tatevos	Սուրբ Թադեոս առաքյալ	Հայաստանում քրիստոնեություն քարոզած առաքյալներից։	12-05	\N	https://images.unsplash.com/photo-1520637836862-4d197d17c93a?auto=format&fit=crop&w=900&q=85	PUBLISHED	2026-06-23 21:16:41.191	2026-06-23 21:16:41.191
\.


--
-- Data for Name: SocialProgram; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SocialProgram" (id, slug, title, summary, description, "coverUrl", location, beneficiaries, "startsAt", "endsAt", "isFeatured", "goalAmount", "raisedAmount", status, "createdAt", "updatedAt") FROM stdin;
cmqr59z6m0016fz1mwoge1wgn	warm-home-border-families	Տաք տուն՝ սահմանամերձ ընտանիքներին	Ջեռուցման և կենցաղային աջակցության ծրագիր Սյունիքի սահմանամերձ ընտանիքների համար։	Ծրագիրը տրամադրում է վառելիք, ջեռուցման անվտանգ սարքեր և անհրաժեշտ կենցաղային աջակցություն՝ ընտանիքների արժանապատիվ ու տաք ձմեռը ապահովելու համար։	https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=85	Սյունիքի սահմանամերձ համայնքներ	48	2026-01-10 00:00:00	2026-12-20 00:00:00	t	12000000.000000000000000000000000000000	7680000.000000000000000000000000000000	PUBLISHED	2026-06-23 21:16:41.182	2026-06-23 21:16:41.182
cmqr59z6n0017fz1m0qqp5snc	children-learning-centers	Կրթական կենտրոններ երեխաների համար	Դասապատրաստման, հոգևոր կրթության և ստեղծագործական խմբակների հասանելի միջավայր։	Թեմի համայնքային կենտրոններում երեխաները ստանում են դասապատրաստման աջակցություն, մասնակցում մշակութային և ստեղծագործական ծրագրերի։	https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=85	Գորիս և Կապան	180	2026-02-01 00:00:00	\N	f	18000000.000000000000000000000000000000	10800000.000000000000000000000000000000	PUBLISHED	2026-06-23 21:16:41.183	2026-06-23 21:16:41.183
cmqr59z6o0018fz1mu2zh6khn	elder-care-visits	Հոգատար այցեր տարեցներին	Կամավորների և հոգևորականների կանոնավոր այցելություններ միայնակ տարեցներին։	Ծրագիրը միավորում է տնային այցելությունները, սննդային աջակցությունը և հոգևոր խնամքը Սյունիքի միայնակ տարեցների համար։	https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=85	Սյունիքի գյուղական համայնքներ	95	2025-09-01 00:00:00	\N	f	9000000.000000000000000000000000000000	6300000.000000000000000000000000000000	PUBLISHED	2026-06-23 21:16:41.184	2026-06-23 21:16:41.184
\.


--
-- Data for Name: SuccessStory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SuccessStory" (id, slug, title, summary, content, "imageUrl", "impactLabel", status, "programId", "createdAt", "updatedAt") FROM stdin;
cmqr59z6o0019fz1mhu6iry9m	a-warm-winter-in-tegh	Ջերմ ձմեռ Տեղ համայնքում	Տասներկու ընտանիք ստացել է անվտանգ ջեռուցման սարք և վառելիքի ամբողջ ձմեռային պաշար։	\N	https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=85	12 ընտանիք	PUBLISHED	cmqr59z6m0016fz1mwoge1wgn	2026-06-23 21:16:41.184	2026-06-23 21:16:41.184
cmqr59z6q001afz1me2ohrjyz	learning-together	Սովորում ենք միասին	Գորիսի կենտրոնի աշակերտները ստեղծեցին իրենց առաջին համայնքային ցուցահանդեսը։	\N	https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85	64 երեխա	PUBLISHED	cmqr59z6n0017fz1m0qqp5snc	2026-06-23 21:16:41.186	2026-06-23 21:16:41.186
cmqr59z6q001bfz1mlxfcuqqt	visits-that-matter	Այցեր, որոնք փոխում են առօրյան	Կամավորների թիմը շաբաթական այցելում է հեռավոր գյուղերի միայնակ տարեցներին։	\N	https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85	95 տարեց	PUBLISHED	cmqr59z6o0018fz1mu2zh6khn	2026-06-23 21:16:41.187	2026-06-23 21:16:41.187
\.


--
-- Data for Name: UsefulContact; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UsefulContact" (id, name, category, description, phone, email, address, website, "isPublic", status, "createdAt", "updatedAt") FROM stdin;
cmqr59z76001qfz1mzu4p63rl	Սյունյաց թեմի ուխտավորների աջակցություն	DIOCESE	Երթուղիների և ժամերգությունների վերաբերյալ տեղեկություն։	+374 00 00 00 00	pilgrim@syunikdiocese.am	Գորիս	\N	t	PUBLISHED	2026-06-23 21:16:41.203	2026-06-23 21:16:41.203
cmqr59z76001rfz1mqjzq0tkk	Տաթև հյուրատուն	GUESTHOUSE	Պարզ ուխտավորական գիշերակաց Տաթև գյուղում։	+374 00 11 22 33	\N	Տաթև գյուղ	\N	t	PUBLISHED	2026-06-23 21:16:41.203	2026-06-23 21:16:41.203
cmqr59z76001sfz1mmv5j3zz3	Սյունիք ուխտավորական տրանսպորտ	TRANSPORT	Փոքր խմբերի տեղափոխում Գորիսից և Կապանից։	+374 00 44 55 66	\N	\N	\N	t	PUBLISHED	2026-06-23 21:16:41.203	2026-06-23 21:16:41.203
cmqr59z76001tfz1mdgzelf74	Արտակարգ ծառայություն	EMERGENCY	Միասնական շտապ օգնության համար։	112	\N	\N	\N	t	PUBLISHED	2026-06-23 21:16:41.203	2026-06-23 21:16:41.203
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, "passwordHash", name, role, "createdAt", "updatedAt") FROM stdin;
cmqr59z5w0000fz1m905afryn	admin@syunikdiocese.am	$2b$12$hRl6dz9S8caNZ6KJuRFVTuWB8M79eILHWagc4e.2wuB5gxwvSUcoC	System Administrator	ADMIN	2026-06-23 21:16:41.156	2026-06-23 21:16:41.156
\.


--
-- Data for Name: VolunteerApplication; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VolunteerApplication" (id, "fullName", email, phone, interests, availability, message, status, "programId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
52e7c8fe-405e-4f97-b9e1-a8673ece3837	b2ac5ced70e8f69f15c02b1e18e9f6dd1b08097dbf85f0f793a2d66531e691a6	2026-06-23 14:09:26.783304-07	20260623210926_init	\N	\N	2026-06-23 14:09:26.755601-07	1
\.


--
-- Name: Announcement Announcement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Announcement"
    ADD CONSTRAINT "Announcement_pkey" PRIMARY KEY (id);


--
-- Name: Choir Choir_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Choir"
    ADD CONSTRAINT "Choir_pkey" PRIMARY KEY (id);


--
-- Name: Church Church_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Church"
    ADD CONSTRAINT "Church_pkey" PRIMARY KEY (id);


--
-- Name: ClergyMember ClergyMember_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ClergyMember"
    ADD CONSTRAINT "ClergyMember_pkey" PRIMARY KEY (id);


--
-- Name: ContactMessage ContactMessage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactMessage"
    ADD CONSTRAINT "ContactMessage_pkey" PRIMARY KEY (id);


--
-- Name: Donation Donation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Donation"
    ADD CONSTRAINT "Donation_pkey" PRIMARY KEY (id);


--
-- Name: DonorHonor DonorHonor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DonorHonor"
    ADD CONSTRAINT "DonorHonor_pkey" PRIMARY KEY (id);


--
-- Name: EtiquetteRule EtiquetteRule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EtiquetteRule"
    ADD CONSTRAINT "EtiquetteRule_pkey" PRIMARY KEY (id);


--
-- Name: Event Event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_pkey" PRIMARY KEY (id);


--
-- Name: FAQ FAQ_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FAQ"
    ADD CONSTRAINT "FAQ_pkey" PRIMARY KEY (id);


--
-- Name: FeastDay FeastDay_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FeastDay"
    ADD CONSTRAINT "FeastDay_pkey" PRIMARY KEY (id);


--
-- Name: GalleryImage GalleryImage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GalleryImage"
    ADD CONSTRAINT "GalleryImage_pkey" PRIMARY KEY (id);


--
-- Name: LibraryItem LibraryItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LibraryItem"
    ADD CONSTRAINT "LibraryItem_pkey" PRIMARY KEY (id);


--
-- Name: LiturgySchedule LiturgySchedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LiturgySchedule"
    ADD CONSTRAINT "LiturgySchedule_pkey" PRIMARY KEY (id);


--
-- Name: MediaItem MediaItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MediaItem"
    ADD CONSTRAINT "MediaItem_pkey" PRIMARY KEY (id);


--
-- Name: NewsArticle NewsArticle_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NewsArticle"
    ADD CONSTRAINT "NewsArticle_pkey" PRIMARY KEY (id);


--
-- Name: OfficialDocument OfficialDocument_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OfficialDocument"
    ADD CONSTRAINT "OfficialDocument_pkey" PRIMARY KEY (id);


--
-- Name: PilgrimRoute PilgrimRoute_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PilgrimRoute"
    ADD CONSTRAINT "PilgrimRoute_pkey" PRIMARY KEY (id);


--
-- Name: Prayer Prayer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Prayer"
    ADD CONSTRAINT "Prayer_pkey" PRIMARY KEY (id);


--
-- Name: QnAQuestion QnAQuestion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."QnAQuestion"
    ADD CONSTRAINT "QnAQuestion_pkey" PRIMARY KEY (id);


--
-- Name: SacramentGuide SacramentGuide_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SacramentGuide"
    ADD CONSTRAINT "SacramentGuide_pkey" PRIMARY KEY (id);


--
-- Name: Saint Saint_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Saint"
    ADD CONSTRAINT "Saint_pkey" PRIMARY KEY (id);


--
-- Name: SocialProgram SocialProgram_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SocialProgram"
    ADD CONSTRAINT "SocialProgram_pkey" PRIMARY KEY (id);


--
-- Name: SuccessStory SuccessStory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SuccessStory"
    ADD CONSTRAINT "SuccessStory_pkey" PRIMARY KEY (id);


--
-- Name: UsefulContact UsefulContact_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsefulContact"
    ADD CONSTRAINT "UsefulContact_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: VolunteerApplication VolunteerApplication_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VolunteerApplication"
    ADD CONSTRAINT "VolunteerApplication_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Announcement_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Announcement_slug_key" ON public."Announcement" USING btree (slug);


--
-- Name: Choir_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Choir_slug_key" ON public."Choir" USING btree (slug);


--
-- Name: Church_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Church_slug_key" ON public."Church" USING btree (slug);


--
-- Name: ClergyMember_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ClergyMember_slug_key" ON public."ClergyMember" USING btree (slug);


--
-- Name: Donation_providerReference_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Donation_providerReference_key" ON public."Donation" USING btree ("providerReference");


--
-- Name: Event_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Event_slug_key" ON public."Event" USING btree (slug);


--
-- Name: FeastDay_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "FeastDay_slug_key" ON public."FeastDay" USING btree (slug);


--
-- Name: LibraryItem_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "LibraryItem_slug_key" ON public."LibraryItem" USING btree (slug);


--
-- Name: MediaItem_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "MediaItem_slug_key" ON public."MediaItem" USING btree (slug);


--
-- Name: NewsArticle_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "NewsArticle_slug_key" ON public."NewsArticle" USING btree (slug);


--
-- Name: OfficialDocument_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "OfficialDocument_slug_key" ON public."OfficialDocument" USING btree (slug);


--
-- Name: PilgrimRoute_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "PilgrimRoute_slug_key" ON public."PilgrimRoute" USING btree (slug);


--
-- Name: Prayer_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Prayer_slug_key" ON public."Prayer" USING btree (slug);


--
-- Name: SacramentGuide_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "SacramentGuide_slug_key" ON public."SacramentGuide" USING btree (slug);


--
-- Name: Saint_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Saint_slug_key" ON public."Saint" USING btree (slug);


--
-- Name: SocialProgram_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "SocialProgram_slug_key" ON public."SocialProgram" USING btree (slug);


--
-- Name: SuccessStory_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "SuccessStory_slug_key" ON public."SuccessStory" USING btree (slug);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: ClergyMember ClergyMember_churchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ClergyMember"
    ADD CONSTRAINT "ClergyMember_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES public."Church"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donation Donation_programId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Donation"
    ADD CONSTRAINT "Donation_programId_fkey" FOREIGN KEY ("programId") REFERENCES public."SocialProgram"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: GalleryImage GalleryImage_articleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GalleryImage"
    ADD CONSTRAINT "GalleryImage_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES public."NewsArticle"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: GalleryImage GalleryImage_churchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GalleryImage"
    ADD CONSTRAINT "GalleryImage_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES public."Church"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: LiturgySchedule LiturgySchedule_churchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LiturgySchedule"
    ADD CONSTRAINT "LiturgySchedule_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES public."Church"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: MediaItem MediaItem_choirId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MediaItem"
    ADD CONSTRAINT "MediaItem_choirId_fkey" FOREIGN KEY ("choirId") REFERENCES public."Choir"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SuccessStory SuccessStory_programId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SuccessStory"
    ADD CONSTRAINT "SuccessStory_programId_fkey" FOREIGN KEY ("programId") REFERENCES public."SocialProgram"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: VolunteerApplication VolunteerApplication_programId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VolunteerApplication"
    ADD CONSTRAINT "VolunteerApplication_programId_fkey" FOREIGN KEY ("programId") REFERENCES public."SocialProgram"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict sFdoOyg8jEW12NnYfqWrswpMiCoalz7ihweyOIcMpWXoqqARUULgMMZAsrgknO8

