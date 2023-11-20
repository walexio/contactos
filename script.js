let contacts = [];

function addOrUpdateContact() {
    const apodoInput = document.getElementById('apodo');
    const edadInput = document.getElementById('edad');
    const pesoInput = document.getElementById('peso');
    const alturaInput = document.getElementById('altura');
    const contactIndexInput = document.getElementById('contactIndex');

    const apodo = apodoInput.value;
    const edad = edadInput.value;
    const peso = pesoInput.value;
    const altura = alturaInput.value;
    const contactIndex = parseInt(contactIndexInput.value);

    if (apodo && edad && peso && altura) {
        if (contactIndex === -1) {
           
            const contact = { apodo, edad, peso, altura };
            contacts.push(contact);
        } else {
           
            contacts[contactIndex].apodo = apodo;
            contacts[contactIndex].edad = edad;
            contacts[contactIndex].peso = peso;
            contacts[contactIndex].altura = altura;
        
            contactIndexInput.value = -1;
        }

        saveContactsToLocalStorage();
        displayContacts();

        
        apodoInput.value = '';
        edadInput.value = '';
        pesoInput.value = '';
        alturaInput.value = '';
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

function deleteContact(index) {
    contacts.splice(index, 1);
    saveContactsToLocalStorage();
    displayContacts();
}

function editContact(index) {
    const contact = contacts[index];
    const apodoInput = document.getElementById('apodo');
    const edadInput = document.getElementById('edad');
    const pesoInput = document.getElementById('peso');
    const alturaInput = document.getElementById('altura');
    const contactIndexInput = document.getElementById('contactIndex');

    apodoInput.value = contact.apodo;
    edadInput.value = contact.edad;
    pesoInput.value = contact.peso;
    alturaInput.value = contact.altura;

    
    contactIndexInput.value = index;
}

function displayContacts() {
    const contactListContainer = document.getElementById('contactList');
    contactListContainer.innerHTML = '';

    if (contacts.length === 0) {
        contactListContainer.innerHTML = '<p>No hay contactos.</p>';
    } else {
        contacts.forEach((contact, index) => {
            const contactDiv = document.createElement('div');
            contactDiv.classList.add('contact');

            const apodoPara = document.createElement('p');
            apodoPara.textContent = `Apodo: ${contact.apodo}`;

            const edadPara = document.createElement('p');
            edadPara.textContent = `Edad: ${contact.edad}`;

            const pesoPara = document.createElement('p');
            pesoPara.textContent = `Peso: ${contact.peso} kg`;

            const alturaPara = document.createElement('p');
            alturaPara.textContent = `Altura: ${contact.altura} cm`;

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => editContact(index));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', () => deleteContact(index));

            contactDiv.appendChild(apodoPara);
            contactDiv.appendChild(edadPara);
            contactDiv.appendChild(pesoPara);
            contactDiv.appendChild(alturaPara);
            contactDiv.appendChild(editButton);
            contactDiv.appendChild(deleteButton);

            contactListContainer.appendChild(contactDiv);
        });
    }
}

function saveContactsToLocalStorage() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function loadContactsFromLocalStorage() {
    const storedContacts = localStorage.getItem('contacts');

    if (storedContacts) {
        contacts = JSON.parse(storedContacts);
        displayContacts();
    }
}

window.onload = loadContactsFromLocalStorage;