import './style.css'

const form = document.querySelector('form');

//add keyboard 'enter' event

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  //define callback that runs when submit event takes place and gives access to event data
  //use async funct to use await keyword
  //e.preventdefault prevents whole page from refreshing when form's submitted 
  
  showSpinner();
  //loading spinner while waiting for server

  const data = new FormData(form);
  //data obj to extract data from form (instantiate form data obj using form as input)

  const response = await fetch('http://localhost:8080/dream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('prompt'),
    }),
  });
  //request to API -> returning a promise
  //OpenAI is a JSON API -> Set header with content type of JSON
  //define body of request w/ form data(wrap in JSON stringify to convert to string
  //-> then definte obj w/ value of 'prompt' -> grab prompt value from the form using GET method
  //-> requesting data from API to give response w/ the data collected (including image URL)

  if (response.ok) {
    //ok = no errors

    const { image } = await response.json();
    //access the image by awaiting reponse.json

    const result = document.querySelector('#result');
    result.innerHTML = `<img src="${image}" width="512" />`;
    //insert image into UI (queryselector grabs the result div and HTML)
    //modify innerHTML w/ image tag -> where src is img URL 
  } else {
    const err = await response.text();
    alert(err);
    console.error(err);
    //if error -> wait for response & log error
  }

  hideSpinner();
  //after returning response -> hide spinner
});

function showSpinner() {
  const button = document.querySelector('button');
  button.disabled = true;
  button.innerHTML = 'Dreaming... <span class="spinner">🧠</span>';
}
//grab button in DOM, set state disabled to prevent user from clicking when loading

function hideSpinner() {
  const button = document.querySelector('button');
  button.disabled = false;
  button.innerHTML = 'Dream'
}
//grabs same button, but sets disabled state false -> resets innerhtml to dream text


