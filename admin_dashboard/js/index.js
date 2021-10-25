// read all postes from mongodb
function loadAllPost() {
  fetch("http://localhost:3000/postes")
    .then((res) => res.json())
    .then((data) => {
      data.map(post => {
        const postTable = document.getElementById("allPost");
      const postContent = document.createElement("tr");
      postContent.classList.add('alert');

      postContent.innerHTML = `
      <td class="d-flex align-items-center border-bottom-0">
        <div class="img" style="background-image: url(${post.img});"></div>
        <div class="pl-3 email">
          <span>${post.post_title}</span>
          <span>Added: ${post.publishDate}</span>
        </div>
      </td>
      <td class="border-bottom-0">${post.author}</td>
      <td class="action border-bottom-0">
        <button onclick="deletePost('${post._id}')">
           <i class="fas fa-trash"></i>
        </button>
        <button onclick="updatePost('${post._id}')">
          <i class="fas fa-edit"></i>
        </button>
      </td>                   
      `
    postTable.appendChild(postContent)
      })

    });
}

loadAllPost();

// delete a post from mongodb

function deletePost(id) {
  fetch(`http://localhost:3000/delete/${id}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    window.location.reload();
  })
}

// update post 

function updatePost(id){
  fetch(`http://localhost:3000/singledata/${id}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    const modulContainer = document.getElementById('modalContainer');
    modulContainer.classList.remove('hide_module');
  modulContainer.innerHTML = `
  <div class="modal_design">
        <div>
          <div class="card card-body p-4 m-5">
            <button onclick="hideModul()">Close</button>
            <h3 class="text-center">Edit Post</h3>
           <form>
            <input type="text" placeholder="Post Title" name="post_title" id="postTitle" value="${data.post_title}">
            <input type="url" placeholder="Image URL" name="img" id="img" value="${data.img}">
            <br/>
            <input type="text" placeholder="Author" name="author", id="author" value="${data.author}">
            <textarea placeholder="Type your Message" name="post_content" id="postContent" value="">${data.post_content}</textarea>
            <br/>
            <button onclick="updatedPost('${data._id}')">Update Post</button>
          </form>
          </div>
        </div>
      </div>
  `
  })
}

// inset updated data into mongodb

function updatedPost (id) {
  const postTitle = document.getElementById('postTitle').value;
  const img = document.getElementById('img').value;
  const author = document.getElementById('author').value;
  const postContent = document.getElementById('postContent').value;
  const postData = {postTitle, img, author, postContent};

  fetch(`http://localhost:3000/update/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(postData)
  })
  .then(res => res.json())
  .then((data => {
    console.log(data);
  }))
}

// hide modal 

function hideModul() {
  const modulContainer = document.getElementById('modalContainer');
  modulContainer.classList.add('hide_module');
}

// search form codes

const input = document.getElementById('searchInput');
input.addEventListener('change', searchPost)


function searchPost(e) {
  
  
  fetch(`http://localhost:3000/search/${e.target.value}`)
  .then(res => res.json())
  .then(data => {
    data.map(post => {
      const result = document.getElementById('searchResult');
      const resultData = document.createElement('p');
      resultData.innerText = post.post_title
      result.appendChild(resultData)
    })
  })
}




