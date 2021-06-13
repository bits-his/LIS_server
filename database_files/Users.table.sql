-- Table: public.Users

-- DROP TABLE public."Users";

CREATE TABLE public."Users"
(
    id SERIAL NOT NULL,
    name character varying(255) COLLATE pg_catalog."default",
    username character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    role character varying(255) COLLATE pg_catalog."default",
    "accessTo" character varying(255) COLLATE pg_catalog."default",
    "position" character varying(255) COLLATE pg_catalog."default",
    department character varying(255) COLLATE pg_catalog."default",
    "accessToDept" character varying(255) COLLATE pg_catalog."default",
    "accessToFiles" character varying(255) COLLATE pg_catalog."default",
    signature character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."Users"
    OWNER to postgres;