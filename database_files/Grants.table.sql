-- Table: public.Grants

-- DROP TABLE public."Grants";

CREATE TABLE public."Grants"
(
    id SERIAL NOT NULL,
    r_of_o_no character varying(255) COLLATE pg_catalog."default",
    plot_no character varying(255) COLLATE pg_catalog."default",
    plan_no character varying(255) COLLATE pg_catalog."default",
    ground_rent character varying(255) COLLATE pg_catalog."default",
    purpose character varying(255) COLLATE pg_catalog."default",
    improvement_value character varying(255) COLLATE pg_catalog."default",
    improvement_term character varying(255) COLLATE pg_catalog."default",
    signed_by character varying(255) COLLATE pg_catalog."default",
    signed_on character varying(255) COLLATE pg_catalog."default",
    date_of_issue character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Grants_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."Grants"
    OWNER to postgres;