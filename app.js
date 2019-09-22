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

// inputs for firebase
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
        var trainName =$("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var frequency = $("#frequency-input").val().trim();
        var time = $("#time-input").val().trim();

// this needs to be calculated

  console.log(trainName)
  console.log(destination)
//   console.log(time)
  console.log(frequency)

    database.ref().push({
        name: trainName,
        destination: destination,
        frequency: frequency,
        date: firebase.database.ServerValue.TIMESTAMP,
        time: time,
      })

    })

    // time calulation
        var firsTime = time
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "weeks");
        console.log(firstTimeConverted)
    
    // firebase watcher + initial loader 
    database.ref().on("child_added", function(childSnapshot) {
        
        var nameDb = childSnapshot.val().name;
        var destinationDb = childSnapshot.val().destination;
        var frequencyDb = childSnapshot.val().frequency;
        
        // Log everything that's coming out of snapshot
        console.log(nameDb);
        console.log(destinationDb);
        console.log(frequencyDb);

        //  creates new rows with fb data
        var newRow = $("<tr>").append(
            $("<td>").text(nameDb),
            $("<td>").text(destinationDb),
            $("<td>").text(frequencyDb),
            // $("<td>").text(empMonths),
            // $("<td>").text(empRate),
            // $("<td>").text(empBilled)
          );
        
          // Appends the new row to the HTML table
          $("#train-table > tbody").append(newRow);
        });

      // Handle the errors
    //  function(errorObject) {
    //   console.log("Errors handled: " + errorObject.code);
    // };

   


