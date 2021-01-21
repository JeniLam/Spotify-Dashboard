import numpy as np
import pandas as pd


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

# bpm2010 = session.query(songs.bpm).filter(songs.year == 2010)

# print(bpm2010)

# close session
session.close()

#################################################
# Flask Setup
#################################################

app = Flask(__name__, static_url_path="", static_folder="static")


@app.route("/")
def welcome():

    return (render_template("index.html")
            )


@app.route("/page03")
def playlist_analysis():

    return (render_template("page03.html")
            )


@app.route("/tableData")
def tableData():

    return (render_template("tabledata.html")
            )

@app.route("/d3Page")
def the_d3_page():
   return (render_template("d3page.html"))


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

    # create a dictionary from the row data and append to a list of all data
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


@app.route("/api/v1.0/bpmVsValence")
def bpm_data():
    # Create our session (link) from Python to DB
    session = Session(engine)

    # Query all Data needed for graphs to jsonify
    # column names: title, artist, top_genre, year, bpm, energy, dancability, dB, live, valence, duration_in_seconds, acousticness, speechiness,popularity
    results = session.query(songs.bpm, songs.valence).all()

    # close session
    session.close()

    # create a dictionary frpom the row data and append to a list of all data
    bpm_valence_data = []
    for bpm, valence in results:
        bpm_val__dict = {}
        bpm_val__dict['bpm'] = bpm
        bpm_val__dict['valence'] = valence
        bpm_valence_data.append(bpm_val__dict)

    return jsonify(bpm_valence_data)


@app.route("/api/v1.0/popularVsValence")
def popular_data():
    # Create our session (link) from Python to DB
    session = Session(engine)

    # Query all Data needed for graphs to jsonify
    # column names: title, artist, top_genre, year, bpm, energy, dancability, dB, live, valence, duration_in_seconds, acousticness, speechiness,popularity
    results = session.query(songs.popularity, songs.valence).all()

    # close session
    session.close()

    # create a dictionary frpom the row data and append to a list of all data
    popularity_valence_data = []
    for popularity, valence in results:
        pop_val__dict = {}
        pop_val__dict['popularity'] = popularity
        pop_val__dict['valence'] = valence
        popularity_valence_data.append(pop_val__dict)

    return jsonify(popularity_valence_data)


@app.route("/api/v1.0/topArtist")
def top_artist():
    # Create our session (link) from Python to DB
    session = Session(engine)

    # Query all Data needed for graphs to jsonify
    # column names: title, artist, top_genre, year, bpm, energy, dancability, dB, live, valence, duration_in_seconds, acousticness, speechiness,popularity
    results = session.query(songs.artist, songs.year).all()

    # close session
    session.close()

    # create a dictionary frpom the row data and append to a list of all data
    top_artist_data = []
    for artist, year in results:
        top_artist__dict = {}
        top_artist__dict['artist'] = artist
        top_artist__dict['year'] = year
        top_artist_data.append(top_artist__dict)
        print(top_artist_data)

    return jsonify(top_artist_data)


@app.route("/api/v1.0/table_analysis")
def table_analysis():

    results = pd.read_sql('''SELECT * FROM kagglesongs''', conn)
    csv_results = results.to_csv()

    return csv_results


if __name__ == '__main__':
    app.run(debug=True)
