const init = () => {
  if(!localStorage.getItem('data')){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
      return response.json();
    })
    .then(obj => {
      localStorage.setItem('data', JSON.stringify(obj));
      show(obj);
    });
  
    return;
  }
  
  show(JSON.parse(localStorage.data));
}

function show(data) {
  const tbody = document.getElementById('tbody');
  let tr = '';

  data.forEach(value => {
    tr += `
    <tr>
        <th scope="row">${value.id}</th>
        <td>${value.title}</td>
        <td>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Ações
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button type="button" onclick="showEditModal(${value.id})" class="dropdown-item" data-toggle="modal" data-target="#exampleModal2" data-whatever="@mdo">
              Editar
              </button>
              <button type="button" onclick="showRemoveModal(${value.id})" class="dropdown-item" style="color: red;" data-toggle="modal" data-target="#exampleModal"
              data-whatever="@getbootstrap">
              Remover
              </button>
            </div>
          </div>
        </td>
    </tr>`
  });

  tbody.innerHTML = tr;
};

function showEditModal(id) {
  const post = findPost(id);
  const header = document.getElementById('exampleModalLabel2');
  const title = document.getElementById('title-name');
  const description = document.getElementById('description-text');

  document.getElementById('saveEdit').setAttribute('onclick', `editPost(${id})`)
  document.getElementById('exampleModal2').style.display = 'flex';

  header.innerHTML = `Editar POST ${post.id}`;
  title.value = post.title;
  description.value = post.body;
};

function editPost(id) {
  const data = JSON.parse(localStorage.data);
  
  const title = document.getElementById('title-name');
  const description = document.getElementById('description-text');

  if (!title.value && !description.value) {
    alert('Nenhum campo pode ficar vazio!')
    return;
  };

  if(!title.value) {
    alert('O campo título não pode ficar vazio!');
    return;
  };

  if(!description.value) {
    alert('O campo descrição não pode ficar vazio!');
    return;
  };

  data.forEach(data => {
    if (data.id === id) {
      data.title = title.value;
      data.body = description.value;
    }
  });

  $('#exampleModal2').modal('hide')
  localStorage.setItem('data', JSON.stringify(data));
  filter();
};

function findPost(id) {
  const data = JSON.parse(localStorage.data);
  return data.find(value => value.id === id);
}

function showRemoveModal(id) {
  document.getElementById('deletePost').setAttribute('onclick', `removePost(${id})`);
};

function removePost(id) {
  const data = JSON.parse(localStorage.data);

  data.forEach((value, index) => {
    if (value.id === id) {
      data.splice(index, 1);
    }
  });

  localStorage.setItem('data', JSON.stringify(data));
  filter();
};

function filter() {
  const obj = localStorage.data;
  const data = JSON.parse(obj);
  const input = document.getElementById('find');

  const dataFiltered = data.filter(value => {
    if (value.title.includes(input.value.toLowerCase())) {
      return true;
    }

    return false;
  });
  show(dataFiltered);
};

function refresh() {
  localStorage.clear();
  init();
};

init();