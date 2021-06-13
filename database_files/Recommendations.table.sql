-- Table: public.Recommendations

-- DROP TABLE public."Recommendations";

CREATE TABLE public."Recommendations"
(
    id SERIAL NOT NULL,
    app_id integer,
    term character varying(255) COLLATE pg_catalog."default",
    proposed_dev character varying(255) COLLATE pg_catalog."default",
    annual_rent character varying(255) COLLATE pg_catalog."default",
    dev_charges character varying(255) COLLATE pg_catalog."default",
    survey_charges character varying(255) COLLATE pg_catalog."default",
    proposed_dev_time character varying(255) COLLATE pg_catalog."default",
    "submittedBy" character varying(255) COLLATE pg_catalog."default",
    "submittedDate" character varying(255) COLLATE pg_catalog."default",
    status character varying(255) COLLATE pg_catalog."default",
    "approvedBy" character varying(255) COLLATE pg_catalog."default",
    "approvedDate" character varying(255) COLLATE pg_catalog."default",
    "stampedBy" character varying(255) COLLATE pg_catalog."default",
    "stampDate" character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Recommendations_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."Recommendations"
    OWNER to postgres;