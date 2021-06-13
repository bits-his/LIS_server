-- Table: public.Remarks

-- DROP TABLE public."Remarks";

CREATE TABLE public."Remarks"
(
    id SERIAL NOT NULL D,
    remark character varying(255) COLLATE pg_catalog."default",
    remark_to character varying(255) COLLATE pg_catalog."default",
    remark_by character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "ApplicationId" integer,
    CONSTRAINT "Remarks_pkey" PRIMARY KEY (id),
    CONSTRAINT "Remarks_ApplicationId_fkey" FOREIGN KEY ("ApplicationId")
        REFERENCES public."Applications" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)

TABLESPACE pg_default;

ALTER TABLE public."Remarks"
    OWNER to postgres;