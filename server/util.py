import pickle
import json
import numpy as np

__popular_df = None
__books_name = None
__books_dataset = None
__pt = None
__similarity_score = None


def get_popular_books_data():
    return __popular_df.to_json()

def get_books_name():
    return __books_name

def load_saved_artifacts():
    print("loading saved artifacts...start")

    global __popular_df
    global __books_name
    global __books_dataset
    global __pt
    global __similarity_score

    with open('../model/popular.pkl', 'rb') as f:
        __popular_df = pickle.load(f)

    with open("../model/books_name.json", "r") as f:
        __books_name = json.load(f)['data_columns']

    with open('../model/books.pkl', 'rb') as f:
        __books_dataset = pickle.load(f)

    with open('../model/pt.pkl', 'rb') as f:
        __pt = pickle.load(f)

    with open('../model/similarity_score.pkl', 'rb') as f:
        __similarity_score = pickle.load(f)

    print("loading saved artifacts...end")

if __name__ == "__main__":
    load_saved_artifacts()
    get_popular_books_data()
    print(get_books_name())