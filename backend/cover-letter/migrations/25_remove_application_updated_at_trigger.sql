DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at' AND tgrelid = 'public.application'::regclass) THEN
        DROP TRIGGER set_updated_at ON public.application;
    END IF;
END $$;
