-- Table: public.Structures

-- DROP TABLE public."Structures";

CREATE TABLE public."Structures"
(
    id SERIAL NOT NULL ,
    finished character varying(255) COLLATE pg_catalog."default",
    level_of_completion character varying(255) COLLATE pg_catalog."default",
    main_use character varying(255) COLLATE pg_catalog."default",
    residential_type character varying(255) COLLATE pg_catalog."default",
    wall_material character varying(255) COLLATE pg_catalog."default",
    roof_covering character varying(255) COLLATE pg_catalog."default",
    roof_type character varying(255) COLLATE pg_catalog."default",
    no_floors integer,
    no_of_occupants integer,
    property_id_no character varying(255) COLLATE pg_catalog."default",
    parcel_id integer,
    shape_length character varying(255) COLLATE pg_catalog."default",
    shape_area character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    year_completed character varying COLLATE pg_catalog."default",
    structure_id character varying COLLATE pg_catalog."default",
    CONSTRAINT "Structures_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."Structures"
    OWNER to postgres;