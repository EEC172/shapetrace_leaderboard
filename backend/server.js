const express = require("express");
const mongoose = require("mongoose");
const awsIot = require('aws-iot-device-sdk');
require("dotenv").config();

const app = express();
const port = 5001;
const uri = process.env.ATLAS_URI; 

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const shadowRouter = require("./routes/shadow");
// const Shadow = require("./models/shadow.model.js");
app.use("/shadow", shadowRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

mongoose.set("strictQuery", false);
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully.");
});

var thingShadows = awsIot.thingShadow({
    keyPath: process.env.AWS_PRIVATE_KEY,
    certPath: process.env.AWS_CERT,
    caPath: process.env.AWS_ROOT_CA,
    clientId: 'aws_express_client',
    host: process.env.HOST,
    port: 8883,
    region: 'us-east-1',
    resubscribe: true,
});

var clientTokenUpdate;

thingShadows.on('connect', function() {
    thingShadows.register( 'gb_mr_CC3200', {}, function() {
    //    var newState = {"state":{"desired":{"rows":"00000000000000000000000000000000","cols":"00000000000000000000000000000000"}}};
    //    clientTokenUpdate = thingShadows.update('gb_mr_CC3200', newState  );
       if (clientTokenUpdate === null)
       {
          console.log('update shadow failed, operation still in progress');
       }
    });
});
thingShadows.on('status',
    function(thingName, stat, clientToken, stateObject) {
       console.log('received '+stat+' on '+thingName+': '+
                   JSON.stringify(stateObject));
    });

thingShadows.on('delta',
    function(thingName, stateObject) {
        console.log('received delta on '+thingName+': '+
                   JSON.stringify(stateObject));

        console.log(typeof stateObject);

        // const newShadow = new Shadow({
        //     stateObject.board, 
        //     stateObject.score, 
        //     stateObject.shape
        // })
    });

thingShadows.on('timeout',
    function(thingName, clientToken) {
       console.log('received timeout on '+thingName+
                   ' with token: '+ clientToken);
    });