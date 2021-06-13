-- Table: public.Parcels

-- DROP TABLE public."Parcels";

CREATE TABLE public."Parcels"
(
    id SERIAL NOT NULL ,
    name character varying(255) COLLATE pg_catalog."default",
    state character varying(255) COLLATE pg_catalog."default",
    district character varying(255) COLLATE pg_catalog."default",
    lga character varying(255) COLLATE pg_catalog."default",
    ward character varying(255) COLLATE pg_catalog."default",
    address character varying(255) COLLATE pg_catalog."default",
    property_id_no character varying(255) COLLATE pg_catalog."default",
    block_no character varying(255) COLLATE pg_catalog."default",
    plot_no character varying(255) COLLATE pg_catalog."default",
    street_name character varying(255) COLLATE pg_catalog."default",
    owner_name character varying(255) COLLATE pg_catalog."default",
    owner_type character varying(255) COLLATE pg_catalog."default",
    owner_geder character varying(255) COLLATE pg_catalog."default",
    telephone1 character varying(255) COLLATE pg_catalog."default",
    telephone2 character varying(255) COLLATE pg_catalog."default",
    occupancy_type character varying(255) COLLATE pg_catalog."default",
    any_buildings character varying(255) COLLATE pg_catalog."default",
    main_use character varying(255) COLLATE pg_catalog."default",
    parcel_fenced character varying(255) COLLATE pg_catalog."default",
    size_in_m2 character varying(255) COLLATE pg_catalog."default",
    formal_document character varying(255) COLLATE pg_catalog."default",
    informal_document character varying(255) COLLATE pg_catalog."default",
    water character varying(255) COLLATE pg_catalog."default",
    sewerage character varying(255) COLLATE pg_catalog."default",
    electricity character varying(255) COLLATE pg_catalog."default",
    street_lights character varying(255) COLLATE pg_catalog."default",
    waste_disposal character varying(255) COLLATE pg_catalog."default",
    shape_length character varying(255) COLLATE pg_catalog."default",
    shape_area character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Parcels_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."Parcels"
    OWNER to postgres;