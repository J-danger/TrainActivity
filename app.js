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

//   var trainName = "";
//   var destination = "";
//   var frequency = "";
  var time = "";


$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

   var trainName =$("#train-name-input").val().trim();
   var destination = $("#destination-input").val().trim();
   var frequency = $("#frequency-input").val().trim();
//    time = $("#time-input").val().trim();
  
  // this needs to be calculated
//   var time = $("#time-input").val().trim();


//   console.log(trainName)
//   console.log(destination)
//   console.log(time)
//   console.log(frequency)

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
        
  
       
        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val().nameDb);
        console.log(childSnapshot.val().destinationDb);
        console.log(childSnapshot.val().frequencyDb);
        // console.log(childSnapshot.val().time);
        // console.log(childSnapshot.val())
        
         
        var newRow = $("<tr>").append(
            $("<td>").text(nameDb),
            $("<td>").text(destinationDb),
            $("<td>").text(frequencyDb),
            $("<td>").text(time),
            
              
          $("#train-table > tbody").append(newRow))

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

   


