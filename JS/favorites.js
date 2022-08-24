var listDiv = document.getElementById("fav-list");

function showAllFavorites(){
    var favArray = JSON.parse(localStorage.getItem('favArray'));
    console.log(favArray);

    // if favArray is empty, show the message you have no favorites
    if(favArray.length == 0){
        listDiv.innerHTML = '<div class="empty-list">Empty List!</div>';
        return;
    }
    
    // if favArray is not empty, show the list of favorites
    if(favArray){
        for(var i of favArray){
            console.log(i);
            var li = document.createElement("li");
            // add a list with the name and image of the superhero and style it
            li.innerHTML = '<img class="result-img" id="'+i.id+'" src="'+i.imageUrl+'" alt="">'+i.name+" "+'<div class="removeFav" id="'+i.id+'"><i class="fa-solid fa-trash-can deteteBtn"></i></div>';
            
            listDiv.appendChild(li);
        }

         // Add event listener to the list items for show profile page
         var listItems = document.getElementsByClassName("result-img");
         console.log(listItems);
         for(let i of listItems){
           i.addEventListener('click', function(e){
             e.preventDefault();
             console.log(this.id);
             localStorage.setItem('superheroId', this.id);
             window.location.href = "./profile.html";
           });
         }
         
        // Add event listener to the remove favourite button
        var removeFav = document.getElementsByClassName("removeFav");
        console.log(removeFav);
        for(let i of removeFav){
            i.addEventListener('click', function(e){
                e.preventDefault();
                // find the index of this.id in the array
                var index = favArray.indexOf(i.id);
                // remove the index from the array
                favArray.splice(index, 1);
                localStorage.setItem('favArray', JSON.stringify(favArray)); 
                console.log(favArray);
                // remove the list item from the list
                i.parentElement.remove();
            });
        }
    }
}



showAllFavorites();

function home(){
    location.href = '/index.html';
}