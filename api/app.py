#!bin/bash/python3

from flask import Flask, jsonify, request
import json
import os.path
import sys
sys.path.append(
    os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))
from model.model import get_model
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
# app = Flask(__name__)

####################
# This allows CORS #
####################

from datetime import timedelta
from flask import make_response, request, current_app
from functools import update_wrapper


def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    # if headers is not None and not isinstance(headers, basestring):
    #     headers = ', '.join(x.upper() for x in headers)
    # if not isinstance(origin, basestring):
    #     origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator

####################
# End of HTTP stuff #
####################

def do_calculation():
    model_used = 'rf'
    model, test_val = get_model([.2,1,.1,1],model_used)
    prediction_number = model.predict(test_val)
    probabilities = model.predict_proba(test_val)
    pred_label_dict = {0:'Setosa',1:'Versicolor',2:'Virginica'}
    pred_label = pred_label_dict[prediction_number[0]]
    return pred_label, probabilities, model_used


@app.route('/')
def hello_world():
    pred_label, probabilities, model_used = do_calculation()
    header ="<h1>Estimates...</h1><br>"
    model = f"<h2>{(model_used).upper()}</h2>"
    body = f"<h3>{pred_label}</h3><p>{probabilities[0]}<p>"
    return header+model+body


@app.route('/api', methods=['POST'])
def get_val():
    data_json = request.get_json()
    print(data_json)
    model_used = data_json['model_used']
    sepal_test = data_json['sepal']
    petal_test = data_json['petal']

    model, test_val = get_model([
        sepal_test['length'],
        sepal_test['width'],
        petal_test['length'],
        petal_test['width']
        ], model_used
    )

    # prediction = 'setosa'
    # vals = [.5, .2, .3]
    flowers = ["setosa","versicolor","virginica"]
    #
    probabilities = model.predict_proba(test_val)
    json_out = dict(zip(flowers,list(probabilities[0])))
    # return json.dumps(json_out)
    print(json_out)
    return jsonify(json_out)

if __name__ == '__main__':
    app.run(debug=True)
