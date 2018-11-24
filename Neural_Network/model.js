const serverAddress = "http://0s659ttea.preview.infomaniak.website/api";
const getPath = "/data";
const postPath = "/multipleData";


//const testData = tf.tensor2d([5], [1, 1]);
var trainData;
var testData;
const model = tf.sequential();
const LEARNING_RATE = .1;

async function loadUserData(){
    $('#loadDataButton').attr('disabled','true');
    console.log("Preparing Data, please wait a moment");
    var trainingData = [];
    $.get(
        serverAddress + getPath,
        function(data) {
            data = data.sort(shuffle);
            
            //Use 75% of the all dataset to train our model and 25% to test it
            trainingData = data.slice(0, (data.length/4)*3);
            testingData = data.slice((data.length/4)*3,data.length);
            
            //Create 2d tensors with our training set and our testing set
            trainData = getTensor(trainingData);
            testData = getTensor(testingData);      
            
            //Store the data in the local storage
            storeData(trainData, testData);

            //Now the data are prepared, so we can train our model
            $('#loadDataButton').removeAttr('disabled');
            $('#trainButton').removeAttr('disabled');
            console.log('Data loaded successfully', trainData);
        }
    );
}

function getTensor(data) {
    attributes = tf.tensor2d(data.map(item => [
        item.dist_vector_1, item.dist_vector_2, item.dist_vector_3, item.dist_vector_4, item.dist_vector_5
    ]));
    labels = tf.tensor2d(data.map(item => [
        item.dist_label_left,
        item.dist_label_straight, 
        item.dist_label_right
    ]));
    return {"attributes": attributes, "labels": labels};
}

function shuffle(a, b) {
    return Math.random() - 0.5;
}

function buildModel() {
    model.add(tf.layers.dense({
        units: 5, 
        //Input shape of 5 because we have 5 distance input in each line of our data set
        inputShape: [5],
        activation: "relu"
    }));
    model.add(tf.layers.dense({
        units: 8, 
        //Input shape of 5 because we have 5 distance input in each line of our data set
        inputShape: [5],
        activation: "relu"
    }));
    model.add(tf.layers.dense({
        activation: "sigmoid",
        //3 units because we have 3 differents label (0 : do nothing, 1 : go left, 2 : go right)
        units: 3, 
    }));

    // Prepare the model for training: Specify the loss and the optimizer.
    model.compile({
        loss: 'categoricalCrossentropy', 
        optimizer: tf.train.adam(), //tf.train.sgd()
        metrics: ['accuracy']
    });

    $('#testButton').attr('disabled','true');
    $('#trainButton').attr('disabled','true');
}

async function trainModel() {
    // Train the model using the data.
/*     await model.fit(trainData.attributes, trainData.labels, {epochs: 10, verbose:1})
        .then((history) =>{
            console.log(history);
            $('#testButton').removeAttr('disabled')
        }
    );
 */
    //Avoid multiple call of the method by the client
    $('#trainButton').attr('disabled','true');
    for (let i = 1; i < 40 ; ++i) {
        var start = new Date().getTime();
        await model.fit(trainData.attributes, trainData.labels, {epochs: 1})
        .then((h) =>{
            var end = new Date().getTime();
            console.log("Epoch n°"+i+", time : "+(end-start)+", loss : "+h.history.loss[0]);
        });
     }
     //Train is finished so we can retrain the model or test it
     $('#trainButton').attr('disabled','true');
     $('#testButton').removeAttr('disabled')
    console.log('Training finished successfully');
    console.log('Making prediction on test set ...');
    await model.save('downloads://car_simulation_model');
    predict();
}

function predict() {
    // Use the model to do inference on a data point the model hasn't seen before:
    model.predict(testData.attributes).print();
}

function storeData(trainingData, testingData) {
    localStorage.setItem('trainingData', JSON.stringify(trainingData));
    localStorage.setItem('testingData', JSON.stringify(testingData));
}

function getData() {
    trainingData =  JSON.parse( localStorage.getItem('trainingData'));
    testingData = JSON.parse( localStorage.getItem('testingData'));
    return {trainingData, testingData};
}
