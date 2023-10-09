const searchingForm = document.getElementById("search");
const button = document.getElementById("submit");
const formSearch = document.getElementById("formSearch");
const searchingType = "users";
searchingForm.addEventListener("submit", async(event)=> {
    event.preventDefault()
    const querySearch = searchingForm.querySelector("input[name = 'search']").value
    formSearch.innerHTML = "";
    const getResponse = await fetch("https://api.github.com/");
    if(getResponse.status === 200){
        const jsonResponse = await getResponse.json();
        for(const item of jsonResponse.items){
            const elementList = document.createElement("list");
            const image = document.createElement("image");
            image.src = item.imageUrl
            elementList.appendChild(image)

            const profileNameLink = document.createElement("a");
            profileNameLink.href = item.html_url;
            profileNameLink.textContent = item.login;
            elementList.appendChild(profileNameLink);

            searchingForm.appendChild(elementList);

        }
        
    }
    else {
        const errorMessage = document.createElement("li");
        errorMessage.textContent = "Something went wrong";
        searchingForm.appendChild(errorMessage);
    }
    console.error("Something went wrong");
} );

button.addEventListener("click", () =>{
    if (searchingType ==="users")
{
    searchingType = "repositories";
    button.textContent = "Search users";

}
});

searchingForm.dispatchEvent(new Event("submit"));