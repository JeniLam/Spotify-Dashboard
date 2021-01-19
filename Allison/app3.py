# DEPENDENCIES----------------------------------
import numpy as np
import pandas as pd 
import os
import sqlite3
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Table,Column,Integer,String


from flask import Flask, jsonify
from path import Path
Path('my_data.db').touch()

conn = sqlite3.connect('my_data.db')
c = conn.cursor()

c.execute('''CREATE TABLE Song_Data (title text, artist text, top_genre text, year int, bpm int, energy int, dancability int, dB int, live int, valance int, duration_in_seconds int, acousticness int, spechiness int, popularity int)''')

users = pd.read_csv('../Data/Top_Songs_2010-2019.csv')

users.to_sql ('users', conn, if_exists='append', index = True)

c.execute('''SELECT * FROM users''').fetchall()
c.fetchall()
