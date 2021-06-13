-- Table: public.Comments

-- DROP TABLE public."Comments";

CREATE TABLE public."Comments"
(
    id SERIAL NOT NULL ,
    "ApplicationId" integer,
    tag_no character varying(255) COLLATE pg_catalog."default",
    remark character varying(255) COLLATE pg_catalog."default",
    comment character varying(255) COLLATE pg_catalog."default",
    forward_to character varying(255) COLLATE pg_catalog."default",
    forward_by character varying(255) COLLATE pg_catalog."default",
    status boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Comments_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."Comments"
    OWNER to postgres;