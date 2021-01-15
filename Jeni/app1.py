import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import MetaData
from sqlalchemy import create_engine, func
from flask import Flask, jsonify
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

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f'Available Routes: <br/>'
        f'/api/v1.0/title<br/>'
        f'/api/v1.0/artists'
    )

if __name__ == '__main__':
    app.run(debug=True)