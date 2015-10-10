CREATE Table layout(
    id           SERIAL PRIMARY KEY,
    layout       TEXT
);

CREATE Table path(
    id           SERIAL PRIMARY KEY,
    layout_id    INTEGER REFERENCES layout,
    path_coords	 TEXT,
    distance	 REAL,
    area		 REAL
);