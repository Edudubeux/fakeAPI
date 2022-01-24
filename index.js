fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => {
    return response.json();
  })
  .then(data1 => {
    const data = localStorage.data;

    if (!data) {
      localStorage.setItem('data', JSON.stringify(data1));
      show(data1);
      return;
    };

    show(JSON.parse(data));
  });

let dataFiltered

function show(data) {
  const tbody = document.getElementById('tbody');
  let tr = '';

  data.forEach(value => {
    if (!value) return;

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

  data.map(data => {
    if (data.id === id) {
      data.title = title.value;
      data.body = description.value;
    }
  });

  localStorage.setItem('data', JSON.stringify(data));
  show(data);
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

  data.find((value, index) => {
    if (value.id === id) {
      data.splice(index, 1)
      return value;
    }
  });

  localStorage.setItem('data', JSON.stringify(data));
  show(data);
};

function filter() {
  const raw = `${localStorage.data}`;
  const data = JSON.parse(raw);
  const input = document.getElementById('find');

  dataFiltered = data.filter(value => {
    if (value.title.includes(input.value)) {
      return true;
    }

    return false;
  });
  show(dataFiltered);
};

function refresh() {
  location.reload(true);
};