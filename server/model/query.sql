COPY "Words" (word) FROM 'C:\Program Files\PostgreSQL\15\data\WordleGame\words.txt';

SELECT * FROM "Words";

SELECT COUNT(*) FROM "Words";

TRUNCATE TABLE "Words" RESTART IDENTITY CASCADE;

DROP TABLE "Words" CASCADE;

------------------------------------------------------------------

SELECT * FROM "Users";

SELECT COUNT (*) FROM "Users";

TRUNCATE TABLE "Users" CASCADE;

DROP TABLE "Users" CASCADE;

------------------------------------------------------------------

SELECT * FROM "Guests";

SELECT COUNT (*) FROM "Guests";

TRUNCATE TABLE "Guests" RESTART IDENTITY CASCADE;

DROP TABLE "Guests" CASCADE;

--------------------------------------------------------------------

SELECT * FROM "_Friends";

SELECT * FROM "_DiscoveredWords";


