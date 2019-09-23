 var firebaseConfig = {
    apiKey: "AIzaSyDKpoVXzIdG9nr_23XQmuP5WCIAj9wcgN8",
    authDomain: "test-639f9.firebaseapp.com",
    databaseURL: "https://test-639f9.firebaseio.com",
    projectId: "test-639f9",
    storageBucket: "",
    messagingSenderId: "801212532046",
    appId: "1:801212532046:web:3fab9687e77d5cd950ca1f"
  };

  firebase.initializeApp(firebaseConfig);

        var database = firebase.database();

        var time = "";
        var trainName = "";
        var destination = "";
        var frequency = "";
        var time = "";
        var tRemainder = 0;
        var tMinutesTillTrain = 0;
        var tFrequency = 0;
        var diffTime = 0;

// inputs for firebase
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
         trainName =$("#train-name-input").val().trim();
         destination = $("#destination-input").val().trim();
         frequency = $("#frequency-input").val().trim();
         time = $("#time-input").val().trim();

    database.ref().push({
        name: trainName,
        destination: destination,
        frequency: frequency,
        date: firebase.database.ServerValue.TIMESTAMP,
        time: time,
      })

    })

    // firebase watcher + initial loader 
    database.ref().on("child_added", function(childSnapshot) {
      
      var nameDb = childSnapshot.val().name;
      var destinationDb = childSnapshot.val().destination;
      var frequencyDb = childSnapshot.val().frequency;
      var timeDb = childSnapshot.val().time;
      
      // Log everything that's coming out of snapshot
      // console.log(nameDb);
      // console.log(destinationDb);
      // console.log(frequencyDb);
      
      tFrequency = frequencyDb;
  
      // Time is 3:30 AM
      var firstTime = timeDb;
  
      // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
      // console.log(firstTimeConverted);
  
      // Current Time
      var currentTime = moment();
      // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
      // Difference between the times
      diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      // console.log("DIFFERENCE IN TIME: " + diffTime);
  
      // Time apart (remainder)
      tRemainder = diffTime % tFrequency;
      // console.log(tRemainder);
  
      // Minute Until Train
      tMinutesTillTrain = tFrequency - tRemainder;
      // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes").format('LT');
      // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
      
      //  creates new rows with fb data
        var newRow = $("<tr>").append(
            $("<td>").text(nameDb),
            $("<td>").text(destinationDb),
            $("<td>").text(frequencyDb),
            $("<td>").text(nextTrain),
            $("<td>").text(tMinutesTillTrain),
            // $("<td>").text(empBilled)
          );
        
          // Appends the new row to the HTML table
          $("#train-table > tbody").append(newRow);
        });

   
   


