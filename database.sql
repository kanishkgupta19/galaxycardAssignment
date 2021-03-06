PGDMP         +                x         
   galaxycard    13.1    13.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16394 
   galaxycard    DATABASE     f   CREATE DATABASE galaxycard WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_India.1252';
    DROP DATABASE galaxycard;
                postgres    false            �            1259    16413    files    TABLE     �   CREATE TABLE public.files (
    id integer NOT NULL,
    filename character varying(50),
    userid integer,
    filepath character varying(100),
    createdat date,
    updatedat date
);
    DROP TABLE public.files;
       public         heap    postgres    false            �            1259    16411    files_fileid_seq    SEQUENCE     �   CREATE SEQUENCE public.files_fileid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.files_fileid_seq;
       public          postgres    false    203            �           0    0    files_fileid_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.files_fileid_seq OWNED BY public.files.id;
          public          postgres    false    202            �            1259    16397    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(25),
    contact bigint,
    email character varying(50),
    createdat date,
    updatedat date
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16395    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    201            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    200            )           2604    16416    files id    DEFAULT     h   ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_fileid_seq'::regclass);
 7   ALTER TABLE public.files ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    203    203            (           2604    16400    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    200    201            �          0    16413    files 
   TABLE DATA           U   COPY public.files (id, filename, userid, filepath, createdat, updatedat) FROM stdin;
    public          postgres    false    203   k       �          0    16397    users 
   TABLE DATA           S   COPY public.users (id, username, contact, email, createdat, updatedat) FROM stdin;
    public          postgres    false    201   �       �           0    0    files_fileid_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.files_fileid_seq', 9, true);
          public          postgres    false    202            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 27, true);
          public          postgres    false    200            -           2606    16418    files files_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.files DROP CONSTRAINT files_pkey;
       public            postgres    false    203            +           2606    16402    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    201            .           2606    16419    files files_userid_fkey    FK CONSTRAINT     u   ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);
 A   ALTER TABLE ONLY public.files DROP CONSTRAINT files_userid_fkey;
       public          postgres    false    201    2859    203            �   O   x���,JML�M��M�42�L,.N-)��)-��OL2�2sRu�,�MMM�MM-��
�9��t�t���\1z\\\ 5�      �   U   x�32��N��,��洴�07�073����$ZZ:��&f��%��r�� 1���8�!&X u���P�!������ M~$     