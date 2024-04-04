async function onClickedRecomendedBooks() {
    console.log("All recommended books are:");
    var input_book_name = document.getElementById("searchInput").value;
    
    var url = "http://127.0.0.1:5000/recommend_books"; 
    
    $.post(url, {
        book_name: input_book_name

    },function(data, status) {

        const bookInfoDiv = document.getElementById('recommed_books');

        var recommendedBooksSection = document.getElementById('recommended_books');
        var popularBooksSection = document.getElementById('popular_books_section');

        // Display recommended books section
        recommendedBooksSection.style.display = 'block';

        // Hide popular books section
        popularBooksSection.style.display = 'none';

        for (let key in data) {

            const bookTitle = data[key][0];
            const bookAuthor = data[key][1];
            const imageURL = data[key][2];


            const bookDiv = document.createElement('div');
            bookDiv.classList.add('col-md-3');
            

            bookDiv.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src=${imageURL} class="card-img-top" alt="Book">
                    <div class="card-body">
                        <h6 class="card-title"><strong>${bookTitle}</strong></h6>
                        <p>Author: ${bookAuthor}</p>
                    </div>
                </div>
            `;
            
            bookInfoDiv.appendChild(bookDiv);
        }  

    });
}

function backClicked(){
    var recommendedBooksSection = document.getElementById('recommended_books');
        var popularBooksSection = document.getElementById('popular_books_section');

        // Display recommended books section
        recommendedBooksSection.style.display = 'none';

        // Hide popular books section
        popularBooksSection.style.display = 'block';
}


function onPageLoad() {
    console.log( "document loaded" );

    var url = "http://127.0.0.1:5000/get_popular_data";
    var book_name_url = "http://127.0.0.1:5000/get_books_name"
    fetch(url)
    .then(response => response.json())
    .then(data => {        
        const bookInfoDiv = document.getElementById('row');
        data = data.data

        // Iterate through each entry in the JSON object
        data = JSON.parse(data)

        for (let key in data['Book-Title']) {

            const bookTitle = data['Book-Title'][key];
            const bookAuthor = data['Book-Author'][key];
            const yearOfPublication = data['Year-Of-Publication'][key];
            const imageURL = data['Image-URL-M'][key];
            const numRatings = data['num_ratings'][key];
            const avgRatings = data['avg_ratings'][key].toFixed(2);


            const bookDiv = document.createElement('div');
            bookDiv.classList.add('col-md-3');
            

            bookDiv.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src=${imageURL} class="card-img-top" alt="Book">
                    <div class="card-body">
                        <h6 class="card-title"><strong>${bookTitle}</strong></h6>
                        <p>Author: ${bookAuthor}</p>
                        <p>Year of Publication: ${yearOfPublication}</p>
                        <p>Number of Ratings: ${numRatings}</p>
                        <p>Average Ratings: ${avgRatings}</p>
                    </div>
                </div>
            `;
            
            bookInfoDiv.appendChild(bookDiv);
        }  
    })
    .catch(error => console.error('Error:', error));

    fetchBooks()
}
window.onload = onPageLoad;

let allBookNames = [];

function fetchBooks() {
    fetch('http://127.0.0.1:5000/get_books_name')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        data = data.data
        allBookNames = data
    })
    .catch(error => {
        console.error('Error fetching books:', error);
    });
}

function getSuggestions() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const suggestionsList = document.getElementById('suggestionsList');
    suggestionsList.innerHTML = ''; // Clear previous suggestions

    if (searchInput.length === 0) {
        return; // No need to filter if search input is empty
    }

    // Filter book names based on search input
    const filteredBookNames = allBookNames.filter(bookName => bookName.toLowerCase().includes(searchInput));

    // Display filtered book names as suggestions
    filteredBookNames.forEach(bookName => {
        const suggestionItem = document.createElement('li');
        suggestionItem.textContent = bookName;
        suggestionItem.addEventListener('click', function() {
            document.getElementById('searchInput').value = bookName;
            suggestionsList.innerHTML = ''; // Clear suggestions after selecting
        });
        suggestionsList.appendChild(suggestionItem);
    });
}
