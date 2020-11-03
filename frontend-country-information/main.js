//Make a event listener for when searched is pressed;
const searchButton = document.getElementById("search-country");
searchButton.addEventListener("click", () => {
    getCountryData(document.getElementById("search-bar").value)
});

//Make a event when for using ENTER in input
document.getElementById("search-bar")
    .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.key === 'Enter') {
            getCountryData(document.getElementById("search-bar").value)
        }
    });


//Make a API request for the given keyword;
async function getCountryData(countryName) {
    let contentContainer = document.getElementById("content-container");
    contentContainer.innerHTML = "";
    try {
        const result = await axios.get(`https://restcountries.eu/rest/v2/name/${countryName}?fullText=true`);
        fillCountryBlock(result.data[0]);
    } catch (e) {
        let noResultBlock = document.createElement("div");
        noResultBlock.setAttribute("class", "no-result-block");
        noResultBlock.textContent = "The country you searched for was not found.";
        contentContainer.appendChild(noResultBlock);
    }
}

//Fill the page with the information received;
function fillCountryBlock(data) {
    try {
        const fact1 = `${data.name} is situated in ${data.region}. It has a population of ${data.population} people.`;
        const fact2 = `The capital is ${data.capital}`;
        const fact3 = generateStringList(data.currencies, 'and you can pay with ', ',', 'and', true);
        const fact4 = generateStringList(data.languages, 'They speak ', ',', 'and', false);

        let countryBlock = document.createElement("div");
        countryBlock.setAttribute("id", "country-block");
        let headerBlock = document.createElement("div");
        headerBlock.setAttribute("id", "header-block");

        const img = document.createElement("img");
        img.src = data.flag;
        img.style.width = "120px";
        let headerFlag = document.createElement("div");
        headerFlag.setAttribute("id", "header-block-flag");
        headerFlag.appendChild(img);
        let headerBlockTitle = document.createElement("div");
        headerBlockTitle.setAttribute("id", "header-block-title");

        let headerBlockTitleInner = document.createElement("div");
        headerBlockTitleInner.setAttribute("class", "country-title");
        headerBlockTitleInner.textContent = data.name;
        headerBlockTitle.appendChild(headerBlockTitleInner);

        headerBlock.appendChild(headerFlag);
        headerBlock.appendChild(headerBlockTitle);
        countryBlock.appendChild(headerBlock);

        let fact1Element = document.createElement("p");
        let fact2Element = document.createElement("p");
        let fact3Element = document.createElement("p");
        let fact4Element = document.createElement("p");
        fact1Element.textContent = fact1;
        fact2Element.textContent = fact2;
        fact3Element.textContent = fact3;
        fact4Element.textContent = fact4;


        let bodyBlock = document.createElement("div");
        bodyBlock.setAttribute("id", "body-block");
        bodyBlock.append(fact1Element);
        bodyBlock.append(fact2Element);
        bodyBlock.append(fact3Element);
        bodyBlock.append(fact4Element);
        countryBlock.append(bodyBlock);


        let contentContainer = document.getElementById("content-container");
        contentContainer.appendChild(countryBlock);
    } catch (e) {
        console.log(e)
    }
}

//A function to make easy sentences with lists given.
function generateStringList(data, initialString, separator, separatorFinal, isPlural) {
    let text = initialString;
    for (let i = 0; i < data.length; i++) {
        let name = data[i].name;
        if (isPlural) {
            name = `${name}'s`;
        }
        text += name;
        if (i + 1 === data.length - 1) {
            text += ` ${separatorFinal} `;
        } else if (i + 1 < data.length) {
            text += separator + " ";
        }
    }
    return text;
}