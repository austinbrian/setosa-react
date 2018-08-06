#!bin/bash/python3

from flask import Flask
import json
import os.path
import sys
sys.path.append(
    os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))
from model.model import get_model
app = Flask(__name__)

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


@app.route('/api')
def get_val():
    pred_label, probabilities, model_used = do_calculation()
    # prediction = 'setosa'
    # vals = [.5, .2, .3]
    flowers = ["setosa","versicolor","virginica"]
    json_out = dict(zip(flowers,list(probabilities[0])))
    json_out['model_used'] = model_used
    return json.dumps(json_out)

if __name__ == '__main__':
    app.run(debug=True)
