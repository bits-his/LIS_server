-- Table: public.Images

-- DROP TABLE public."Images";

CREATE TABLE public."Images"
(
    id SERIAL NOT NULL DEFAULT,
    image_url character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Images_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."Images"
    OWNER to postgres;