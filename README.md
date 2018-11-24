# driving-car-by-neural-net
We create this project because of a seminar about Artificial Neural Network. As we had make our presentation as collaborative as possible, we had the idea to develop a game and use the user data to train a Model. 

The aim was to make it fun for the public in our presentation and at the same time get back their actions in the game to create a dataset to train our model. So we created a 2D simulation car game with differents circuits generated randomly at each time a user hits a square. As the final goal is to train a model to finish this circuits alone, the users must perform in this game without touching the wall (represented by white squares). 

The project contains five differents parts : 

  - Back
  - FrontMapMaker
  - Front
  - Neural network
  - Front_IA
  
 The "Back" part is the laravel backend part to store the user data in a mysql database. 
 
 The "FrontMapMaker" part is a graphical interface developped with some Javascript code and p5.js in order to let you create some circuits. Each circuit you create and would like to use after must be saved in the "Front" directory. The path has to be : "Front/circuits" and each name of each circuit must follow this pattern "circuit_1.json".
 
 The "Front" par is the GUI which some users use to try to finish some circuits and when this happen, the data stored will be send to the "Back" part with an AJAX request.
 
 The "Neural Network" part is a Javascript project which was made with TensorflowJS. In this part, we build a simple Multi Layer Perceptron. This Model will use the data stored in the "Back" part before. To make it functionnal, please verify that the "Front" part send successfully the data to the backend and then verify in the "Neural Network" part that the connection to the backend is okay. To Build the model and train it, we make a simple HTML file called "index.html" which contains three buttons : 
 
 - Load Data --> It will try to connect to the backend part and get back the user data created
 - Train model --> It will pass the training set which represents 75% of all the data and train the MLP
               --> At the end of the training, it will stored the model and the weights.
 - Test model --> It will pass the test set which represents 25% of all the data and test the MLP
 
 The "Front_IA" part is a graphical replication of the "Front" part except that it will not respond to any user interaction. It will use TensorflowJs to load a pre trained model and the weights associated to make some prediction at each frame of the game. In order words, the vehicle go through the current circuit and ask the Neural network every frame to know what kind of action to do.
 
 With our Model implementation, the Neural network succeed to finish some simple circuit with not so much corner. We could see that much the neural network has some variated data to train on variated circuits, much it performed well int the "Front_IA" part.
 
 To have some best result than us, we could give you this advices : 
 
 - Make more circuits and as different as possible
 - Give to the Neural network as much data as you can 
 - Try to change the MLP structure
 
 Hope you'll enjoy to try this game and share it with others.
