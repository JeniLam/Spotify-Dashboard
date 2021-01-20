CREATE TABLE "kagglesongs" (
"index" int PRIMARY KEY,
    "title" varchar  NOT NULL,
    "artist" varchar   NOT NULL,
    "top_genre" varchar   NOT NULL,
    "year" int   NOT NULL,
    "bpm" int   NOT NULL,
    "energy" int   NOT NULL,
    "dancability" int   NOT NULL,
    "dB" int   NOT NULL,
    "live" int   NOT NULL,
    "valence" int   NOT NULL,
    "duration_in_seconds" int   NOT NULL,
    "acousticness" int   NOT NULL,
    "speechiness" int   NOT NULL,
    "popularity" int   NOT NULL
);
