-- Table: public.SurveyReports

-- DROP TABLE public."SurveyReports";

CREATE TABLE public."SurveyReports"
(
    id SERIAL NOT NULL,
    code_land character varying(255) COLLATE pg_catalog."default",
    staff_name character varying(255) COLLATE pg_catalog."default",
    staff_rank character varying(255) COLLATE pg_catalog."default",
    staff_signature character varying(255) COLLATE pg_catalog."default",
    beacons_number character varying(255) COLLATE pg_catalog."default",
    cadastral_sign character varying(255) COLLATE pg_catalog."default",
    cadastral_date character varying(255) COLLATE pg_catalog."default",
    commissioner_sign character varying(255) COLLATE pg_catalog."default",
    commissioner_date character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "SurveyReports_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."SurveyReports"
    OWNER to postgres;