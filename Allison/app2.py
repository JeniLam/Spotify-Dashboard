# DEPENDENCIES----------------------------------
import numpy as np
import sqlite3
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func


from flask import Flask

# DATABASE SET-UP--------------------------------
engine = create_engine("../Data/songs2010-2019.csv")


# FLASK SET-UP------------------------------------
app = Flask(__name__)

# FLASK ROUTES------------------------------------
@app.route("/")
def home():
    print("Welcome to GoGoGAGA's Home Page!")
    return "Welcome to GoGoGAGA's Home Page!"

@app.route("/tabledata")
def tabledata():
    print("New Page Request")
    return "Check it Out!"

if __name__ == "__main__":
    app.run(debug=True)