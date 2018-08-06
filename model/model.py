#!bin/bash/python3

import numpy as np
from sklearn import datasets
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier as RF
from sklearn.linear_model import LogisticRegression as LR

import sys

def get_data():
    iris = datasets.load_iris()
    iris_X = iris.data
    iris_y = iris.target
    return iris_X, iris_y

def get_model(test_val, method='knn'):
    X, y = get_data()
    if method == "knn":
        model = KNeighborsClassifier()
        model.fit(X,y)
    elif method == 'rf':
        model = RF()
        model.fit(X, y)
    elif method =="lr":
        model = LR()
    test_val = [float(i) for i in str(test_val).strip('[]').split(',')]
    test_val = np.array(test_val).reshape(1, -1)
    return model, test_val

if __name__=="__main__":
    model, test_val = get_model(method=sys.argv[1], test_val=sys.argv[2])
    prediction_number = model.predict(test_val)
    probabilities = model.predict_proba(test_val)
    pred_label_dict = {0:'Setosa',1:'Versicolor',2:'Virginica'}
    pred_label = pred_label_dict[prediction_number[0]]
    print("Prediction: {}".format(pred_label))
    print("Probabiliites: {}".format(probabilities[0]))
