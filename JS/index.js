// Input field
var searchInput = document.getElementById("searchInput");
// Result list
var showResult = document.getElementById('show-superhero-result');
// Favorite Array
var favIdArray = [];
var favListArray = [];


// Function to search for superhero
function superheroSearch(input){

  // XMLHttpRequest object created
  var xhrRequest = new XMLHttpRequest();

  // URL to get data from each input text
  input.addEventListener('input', function(e){
    
    //console.log(this.value);
    xhrRequest.open('GET', 'https://gateway.marvel.com/v1/public/characters?nameStartsWith='+this.value+'&ts=1660807601881&apikey=56cae91c28092cb435cae612287b7a01&hash=2dfb0c7747bd18f4062de050b7b5bdfe', true);
    
    // onload function to get data from API
    xhrRequest.onload = function(){
        //console.log(xhrRequest.response);

        // if status isn't 200, then show error and stop
        if(xhrRequest.status != 200){
            console.log('Error: ' + xhrRequest.status);
            showResult.innerHTML = '<div class="empty-list">No Data available</div>';
            return;
        }
        // if status is 200, then get data from API
        var responceJson = JSON.parse(xhrRequest.response);
        console.log(responceJson);
        showResult.innerHTML = "";
        var length = responceJson.data.results.length;

        // if length is 0, then show empty list
        if(length == 0){
            showResult.innerHTML = '<div class="empty-list">Empty List</div>';
            return;
        }
        // if length is not 0, then show data
        for(let i=0;i<length;i++){
          var list = responceJson.data.results[i];
          console.log(list.name, list.id,list.thumbnail.path+"."+list.thumbnail.extension);
          
          // Create a list item and append to the list
          var li = document.createElement("li");
          // add a list with the name and image of the superhero and style it
          li.innerHTML = '<a href="" class="each-item-list" id="'+list.id+'">'+
          '<img class="result-img" src="'+list.thumbnail.path+"."+list.thumbnail.extension+'" alt=""></a>'+ list.name +
          '<div class ="addFav" id="'+list.id+'" data-name="'+list.name+'" data-image="'+list.thumbnail.path+"."+list.thumbnail.extension+'"><i class="fa-regular fa-heart"></i></div>';
      
          // Append the li element to the result list
          showResult.appendChild(li);
        }

        // Add event listener to the list items
        var listItems = document.getElementsByClassName("each-item-list");
        console.log(listItems);
        for(let i of listItems){
          i.addEventListener('click', function(e){
            // e.preventDefault(); --> prevent the default action of the link
            e.preventDefault();
            console.log(this.id);
            // locale storage to store the superhero id
            localStorage.setItem('superheroId', this.id);
            // redirect to the superhero prifile page
            window.location.href = "./HTML/profile.html";
          });
        }
        
        // Add event listener to the add favourite button
        var addFav = document.getElementsByClassName("addFav");
        console.log(addFav);
        for(let i of addFav){
          i.addEventListener('click', function(e){

          // return true or false if this.id is in the array
          var idAlreadPresent = favIdArray.includes(this.id);
          console.log(idAlreadPresent);
          

          if(idAlreadPresent == false){
            e.preventDefault();
            favIdArray.push(this.id);
            favListArray.push({id: this.id, name: this.dataset.name, imageUrl: this.dataset.image});
            // Json stringify the array to store in local storage
            localStorage.setItem('favArray', JSON.stringify(favListArray));
            console.log(favIdArray, favListArray);
            // change the icon to a filled heart icon into solid heart icon
           this.innerHTML = '<i class="fa-solid fa-heart"></i>';
          }else{
              // find the index of this.id in the array
              var index = favIdArray.indexOf(this.id);
              // remove the index from the array
              favIdArray.splice(index, 1);
              favListArray.splice(index, 1);
              // Json.stringify to store the array in the locale storage
              localStorage.setItem('favArray', JSON.stringify(favListArray)); 
              this.innerHTML = '<i class="fa-regular fa-heart"></i>';
            }
          });
        }
    }
    // Send request to API
    xhrRequest.send();
  });
  
}

// search super hero according to input
superheroSearch(searchInput);
