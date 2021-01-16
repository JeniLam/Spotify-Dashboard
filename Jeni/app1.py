import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template, redirect
from config import dbname, username, password, server

#################################################
# Database Setup
#################################################
engine = create_engine(f'postgresql://{username}:{password}@{server}/{dbname}')
conn = engine.connect()

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# save reference to the table
songs = Base.classes.kagglesongs

# create our session (link) from Python to DB
session = Session(engine)

# Query Data
results = session.query(songs.title, songs.artist, songs.top_genre, songs.year, songs.energy, songs.dancability,
                        songs.bpm, songs.dB, songs.duration_in_seconds, songs.acousticness, songs.popularity).all()

# close session
session.close()

# # create a list of dictionaries from the row data and append to a list of all data
all_data = []

for title, artist, top_genre, year, energy, dancability, bpm, dB, duration_in_seconds, acousticness, popularity in results:
        music_dict = {}
        music_dict['title'] = title
        music_dict['artist'] = artist
        music_dict['top_genre'] = top_genre
        music_dict['year'] = year
        music_dict['energy'] = energy
        music_dict['dancability'] = dancability
        music_dict['bpm'] = bpm
        music_dict['dB'] = dB
        music_dict['duration_in_seconds'] = duration_in_seconds
        music_dict['acousticness'] = acousticness
        music_dict['popularity'] = popularity
        all_data.append(music_dict)
print(all_data[0])
print(all_data[1])



#################################################
# Flask Setup
#################################################

app = Flask(__name__, static_url_path="",static_folder="static")


@app.route("/")
def welcome():

    return (render_template("index.html")
            )

# @app.route("/table1")
# def table_1_assembly():
#     genre = 

@app.route("/api/v1.0/data")
def all_data():
    # Create our session (link) from Python to DB
    session = Session(engine)

    # Query all Data needed for graphs to jsonify
    # column names: title, artist, top_genre, year, bpm, energy, dancability, dB, live, valence, duration_in_seconds, acousticness, speechiness,popularity
    results = session.query(songs.title, songs.artist, songs.top_genre, songs.year, songs.energy, songs.dancability,
                            songs.bpm, songs.dB, songs.duration_in_seconds, songs.acousticness, songs.popularity).all()

    # close session
    session.close()

    # create a dictionary frpom the row data and append to a list of all data
    all_data = []
    for title, artist, top_genre, year, energy, dancability, bpm, dB, duration_in_seconds, acousticness, popularity in results:
        music_dict = {}
        music_dict['title'] = title
        music_dict['artist'] = artist
        music_dict['top_genre'] = top_genre
        music_dict['year'] = year
        music_dict['energy'] = energy
        music_dict['dancability'] = dancability
        music_dict['bpm'] = bpm
        music_dict['dB'] = dB
        music_dict['duration_in_seconds'] = duration_in_seconds
        music_dict['acousticness'] = acousticness
        music_dict['popularity'] = popularity
        all_data.append(music_dict)

    return jsonify(all_data)


# @app.route("/api/v1.0/genrebyyear")
# def genre_data():
#     # Create our session (link) from Python to DB
#     session = Session(engine)

#     # Query all Data needed for graphs to jsonify
#     # column names: title, artist, top_genre, year, bpm, energy, dancability, dB, live, valence, duration_in_seconds, acousticness, speechiness,popularity
#     results = session.query(songs.top_genre, songs.year).all()
#     print(results)

#     # close session
#     session.close()

#     # create a dictionary frpom the row data and append to a list of all data
#     genre_data = []
#     for top_genre, year in results:
#         genre_dict = {}
#         genre_dict['top_genre'] = top_genre
#         genre_dict['year'] = year
#         genre_data.append(genre_dict)

#     return jsonify(genre_data)


if __name__ == '__main__':
    app.run(debug=True)
