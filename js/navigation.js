
const seanceNbr = 6;
const body = document.querySelector('.canvasContainer');
let header
let list
let nav
let listItem
let link
let linkText 

head = document.createElement('p');
header = document.createElement("header")
nav = document.createElement("nav")
list = document.createElement("ul")
nav.appendChild(list)
header.appendChild(nav)

for(let i = 1; i <= seanceNbr; i++) {
  listItem = document.createElement("li")

  link = document.createElement("a")
  link.setAttribute("href", '/seance' + i )

  linkText = document.createTextNode('Séance - ' + i ); 


  link.appendChild(linkText)
  listItem.appendChild(link)
  list.appendChild(listItem)
}
document.querySelector('.wrapper').insertBefore(header, body)