const API_URL = "https://swapi.py4e.com/api/people/";

const characterImages = {
  "Luke Skywalker": "src/images/luke-skywalker.webp",
  "Anakin Skywalker": "src/images/anakin-skywalker.webp",
  "Darth Vader": "src/images/darth-vader.jpg",
  "Leia Organa": "src/images/princess-leia.jpg",
  "Obi-Wan Kenobi": "src/images/obiwan-kenobi.webp",
  "C-3PO": "src/images/c3po.jpg",
  "R2-D2": "src/images/r2d2.jpg",
  "Yoda": "src/images/yoda.jpeg",
  "Padmé Amidala": "src/images/padme.webp",
  "Qui-Gon Jinn": "src/images/qui-gon.webp",
  "Darth Maul": "src/images/darth-maul.webp",
  "Han Solo": "src/images/hansolo.webp", 
  "Chewbacca": "src/images/chewie.webp",
};

const fetchAllCharacters = async () => {
  try {
    let characters = [];
    let url = API_URL;

    while (url) {
      const response = await fetch(url);
      const data = await response.json();
      characters = characters.concat(data.results); 
      url = data.next; 
    }

    return characters;
  } catch (error) {
    console.error("Erro ao buscar personagens:", error);
  }
};

const customOrder = [
  "Luke Skywalker",
  "Anakin Skywalker",
  "Leia Organa",
  "Padmé Amidala",
  "Obi-Wan Kenobi",
  "Yoda",
  "Qui-Gon Jinn",
  "Sheev Palpatine",
  "Darth Vader",
  "Darth Maul",
  "Count Dooku",
  "Han Solo",
  "Chewbacca",
  "C-3PO",
  "R2-D2"
];

const createCharacterCards = (characters) => {
  const container = document.getElementById("character-container");

  characters.forEach(character => {
    const card = document.createElement("div");
    card.classList.add("card");

    const imageUrl = characterImages[character.name] || "https://via.placeholder.com/150";

    card.innerHTML = `
      <img src="${imageUrl}" alt="${character.name}" class="character-image">
      <h3>${character.name}</h3>
      <p><strong>Height:</strong> ${character.height} cm</p>
      <p><strong>Mass:</strong> ${character.mass} kg</p>
      <p><strong>Gender:</strong> ${character.gender}</p>
    `;

    container.appendChild(card);
  });
};

const initialize = async () => {
  const characters = await fetchAllCharacters();

  const sortedCharacters = customOrder.map(name => {
    return characters.find(character => character.name === name);
  }).filter(character => character !== undefined); 

  createCharacterCards(sortedCharacters);
};

initialize();

const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
  const icon = document.querySelector('.mode-toggle i');
  if (document.body.classList.contains('dark-mode')) {
    icon.classList.replace('fa-sun', 'fa-moon'); 
  } else {
    icon.classList.replace('fa-moon', 'fa-sun'); 
  }
};

