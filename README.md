# View iris predictions using React
---
This repo will generate a machine-learning prediction model on the iris dataset, and will allow a user to change the feature values to enable different predictions based on new inputs.
- Ideally, these inputs will be using a bounded number line slider for each
- The machine learning algorithm used to build the model could be swapped out.
- Might also be nice to be able to plot arbitrarily many points using those three on a graph to demonstrate how the features overlay on a graphic. 
  - Or use PCA to select features

To view it, run `npm start` after cloning the repo.

## Current Status
-[x] Create python script that classifies using iris dataset
-[x] Create react app framework
-[x] Create outline for graphs that change based on estimated value inputs
-[] Create react components that take in `predict_proba` estimates
-[] Create react components that feed in petal/sepal width/length values
-[] Create state for data callbacks

