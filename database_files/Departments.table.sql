-- Table: public.Departments

-- DROP TABLE public."Departments";

CREATE TABLE public."Departments"
(
    id SERIAL NOT NULL ,
    department_date character varying(255) COLLATE pg_catalog."default",
    department_code character varying(255) COLLATE pg_catalog."default",
    description character varying(255) COLLATE pg_catalog."default",
    location character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Departments_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."Departments"
    OWNER to postgres;