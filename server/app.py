from flask import Flask, jsonify, request
import util
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return "This is home page"

@app.route('/get_popular_data', methods=['GET'])
def get_popular_data():
    response = jsonify({
        'data': util.get_popular_books_data()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/get_books_name', methods=['GET'])
def get_books_name():
    response = jsonify({
        'data': util.get_books_name()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/recommend_books', methods=['GET', 'POST'])
def predict_home_price():
    user_input = request.form['book_name']

    index = np.where(util.__pt.index == user_input)[0][0]
    distance = util.__similarity_score[index]
    similar_items = sorted(list(enumerate(util.__similarity_score[index])), key=lambda x: x[1], reverse=True)[0:20]

    data = []
    for i in similar_items:
        item = []
        temp_df = util.__books_dataset[util.__books_dataset['Book-Title'] == util.__pt.index[i[0]]]
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Title'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Author'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Image-URL-M'].values))

        data.append(item)

    return data

if __name__ == "__main__":
    print("Server is started")
    util.load_saved_artifacts()
    app.run(use_reloader=True)