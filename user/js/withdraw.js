const isLoggedIn = localStorage.getItem("gtraders");
const username = localStorage.getItem("gtraders_id");
//const btc = localStorage.getItem("btc")
//const eth = localStorage.getItem("eth")

const loginEndpoint = 'http://127.0.0.1:8000';



fetch(`${loginEndpoint}/dashboard/${username}`) // Replace URL with your API endpoint
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      //return response.json();
      return response.json();

    })
    .then(data => {
      // Once data is fetched, handle and display it
      displayUserData(data);
      console.log("log is",data)

    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });

  function displayUserData(res) {
      if (isLoggedIn === "true" && username) {
        const data = JSON.parse(res.data)
        document.getElementById("pending").innerText = `$${data.pending}.00`;
        document.getElementById("balance").innerText = `$${data.balance}.00`;
        document.getElementById("btc").innerText = `${data.bitcoin_wallet}.00`;
        document.getElementById("usdt").innerText = `${data.ether_wallet}.00`;
        document.getElementById("trx").innerText = `${data.trx_wallet}.00`;

        if(data.balance > 0){
            document.getElementById("no_bal").style.display = "none";
        }

      } else {
        // Redirect to the login.html page if the user is not logged in
        window.location.href = "login.html";
      }
  
    }





    fetch(`${loginEndpoint}/user/${username}`) // Replace URL with your API endpoint
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();

    })
    .then(res => {
      // Once data is fetched, handle and display it
      const data = JSON.parse(res.data)
      document.getElementById("reg_on").innerHTML = data.register_date

    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });