// Get the form element with the ID "myform"
var form = document.getElementById("myform");

// Add a submit event listener to the form
form.addEventListener("submit", function (e) {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Get the value of the search input field
  var search = document.getElementById("search").value;

  // Fetch data from the GitHub API based on the entered username
  fetch("https://api.github.com/users/" + search)
    .then((result) => {
      // Check if the response is not successful
      if (!result.ok) {
        // Throw an error message indicating user not found
        throw new Error(`<br><br><br><p style=" text-align: center;
        color: white;
        text-transform: uppercase;
        font-family: 'Courier New', Courier, monospace;
        font-weight: bold;">User not found!!</p>`);
      }
      // Parse the response as JSON and return the result
      return result.json();
    })
    .then((data) => {
      // Log the fetched data to the console
      console.log(data);

      // Update the HTML content of the "result" element with user data
      document.getElementById("result").innerHTML = `
      <link rel="stylesheet" href="style.css" />
      <br><br>
      <div class="java">
        <img src="${data.avatar_url}" alt="${data.login}" class="avatar">
        <h2>${data.login}</h2>
        <p>Name: ${data.name}</p>
        <p>Location: ${data.location || "Not specified"}</p>
        <p>Followers: ${data.followers}</p>
        <p>Following: ${data.following}</p>
        <p>Public Repositories: ${data.public_repos}</p>
        </div>
      `;
    })
    .catch(error => {
      // Handle errors by updating the HTML content with an error message
      document.getElementById("result").innerHTML = `<p class="error">${error.message}</p>`;
    });
});
