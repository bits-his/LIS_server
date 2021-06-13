-- Table: public.Applications

-- DROP TABLE public."Applications";

CREATE TABLE public."Applications"
(
    id integer NOT NULL DEFAULT nextval('"Applications_id_seq"'::regclass),
    ack_id character varying(255) COLLATE pg_catalog."default",
    name character varying(255) COLLATE pg_catalog."default",
    application_date character varying(255) COLLATE pg_catalog."default",
    application_type character varying(255) COLLATE pg_catalog."default",
    amount character varying(255) COLLATE pg_catalog."default",
    address character varying(255) COLLATE pg_catalog."default",
    phone character varying(255) COLLATE pg_catalog."default",
    other_info character varying(255) COLLATE pg_catalog."default",
    info character varying(255) COLLATE pg_catalog."default",
    tp_no character varying(255) COLLATE pg_catalog."default",
    image_id character varying(255) COLLATE pg_catalog."default",
    plot_no character varying(255) COLLATE pg_catalog."default",
    amount_paid character varying(255) COLLATE pg_catalog."default",
    reciept_no character varying(255) COLLATE pg_catalog."default",
    stage integer,
    status character varying(255) COLLATE pg_catalog."default",
    remark character varying(255) COLLATE pg_catalog."default",
    forward_to character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    commissioning character varying(255) COLLATE pg_catalog."default",
    forward_by character varying(255) COLLATE pg_catalog."default",
    recom_id integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Applications_pkey" PRIMARY KEY (id),
    CONSTRAINT "Applications_plot_no_key" UNIQUE (plot_no),
    CONSTRAINT "Applications_tp_no_key" UNIQUE (tp_no)
)

TABLESPACE pg_default;

ALTER TABLE public."Applications"
    OWNER to postgres;