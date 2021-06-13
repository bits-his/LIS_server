-- Table: public.Occupants

-- DROP TABLE public."Occupants";

CREATE TABLE public."Occupants"
(
    id SERIAL NOT NULL ,
    occupant_id character varying(255) COLLATE pg_catalog."default",
    floor_area_m2 character varying(255) COLLATE pg_catalog."default",
    name_of_occupant character varying(255) COLLATE pg_catalog."default",
    type_of_occupant character varying(255) COLLATE pg_catalog."default",
    use_type_of_unit character varying(255) COLLATE pg_catalog."default",
    occupier_is_owner character varying(255) COLLATE pg_catalog."default",
    owner_details character varying(255) COLLATE pg_catalog."default",
    tel_mobile character varying(255) COLLATE pg_catalog."default",
    tel_home character varying(255) COLLATE pg_catalog."default",
    parcels_id character varying(255) COLLATE pg_catalog."default",
    structure_id character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Occupants_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."Occupants"
    OWNER to postgres;