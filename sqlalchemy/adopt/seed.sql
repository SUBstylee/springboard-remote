--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)

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

DROP DATABASE adopt;
--
-- Name: adopt; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE adopt WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


\connect adopt

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: pets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pets (
    id integer NOT NULL,
    name text NOT NULL,
    species text NOT NULL,
    photo_url text,
    age integer,
    notes text,
    available boolean DEFAULT true NOT NULL
);


--
-- Name: pets_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pets_id_seq OWNED BY public.pets.id;


--
-- Name: pets id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pets ALTER COLUMN id SET DEFAULT nextval('public.pets_id_seq'::regclass);


--
-- Data for Name: pets; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pets (id, name, species, photo_url, age, notes, available) FROM stdin;
3	Snargle	cat	https://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg	\N	\N	t
5	Doritos	cat	https://www.rd.com/wp-content/uploads/2021/05/GettyImages-1286283054.jpg	6	sleeps a lot	t
6	Bambi	dog		\N		f
2	Porchetta	porcupine	http://kids.sandiegozoo.org/sites/default/files/2017-12/porcupine-incisors.jpg	4	Somewhat spiky!	f
4	Dr. Claw	cat		\N		f
1	Woofly	dog	https://bingvsdevportalprodgbl.blob.core.windows.net/demo-images/c5c7398b-850b-4a7d-b0d9-ef5e10d97bc0.jpg	3	Incredibly adorable.	t
7	12	dog		1	doesn't like cameras	t
8	Mr.Onions	porcupine		2	likes onions and cabbage	t
9	Bob	dog		11	Knocks over garbage cans and blames it on ghosts	f
\.


--
-- Name: pets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.pets_id_seq', 9, true);


--
-- Name: pets pets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pets
    ADD CONSTRAINT pets_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

