// read datw from mongodb

function readDate() {
  fetch("http://localhost:3000/postes")
    .then((res) => res.json())
    .then((data) => {
      const postData = data.slice(0, 3)
      postData.map(post => {
        const postContainer = document.getElementById('postContainer');
        const content = document.createElement('div');
        content.classList.add('col-lg-4');
        content.classList.add('mb-4');
        content.classList.add('mb-lg-0')
        content.setAttribute('data-aos:fade-up', 'data-aos-delay:0');
        content.innerHTML = `
        <div class="service grayscale">
        <div class="service-img">
          <a href="#"
            ><img src="${post.img}" alt="Image" class="" width="100%" !importent
            height="250px"
          /></a>
        </div>
        <div class="service-inner">
          <span></span>
          <h3>${post.post_title.substring(0, 20)+"..."}</h3>
          <p>
            Far far away, behind the word mountains, far from the
            countries Vokalia and Consonantia, there live the blind texts.
          </p>
          <p class="mb-0"><a href="#" class="more">Learn more</a></p>
        </div>
      </div>
        `

        postContainer.appendChild(content)
      })
    });
}

readDate()
