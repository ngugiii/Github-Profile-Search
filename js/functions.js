import * as v from "./variables.js";

// Get User
export async function getUser(username){
    const response = await fetch(v.apiURL + username);
    const data= await response.json();

    if(!response.ok){
        errorMessage("User Not Found");
    }
    else{
        displayData(data);
        getRepos(username);
    }
}
// error message function
export function errorMessage(msg){
    // v.profile.innerHTML="";
    document.querySelector(".hide").style.display="none";
    return v.repos.innerHTML = ` <p class="alert">${msg}</p>`;

}

function displayData(user){
    const html =
     `
    <div class="myImage">
    <img
    src="${user.avatar_url}"
    alt="${user.name}"
    class="image-thumbnail"/>
    </div>
    <h2>${user.name}</h2>
    <p>${user.login}</p>
    <a href="https://github.com/${user.login} target="_blank" rel="noopener"><button class="viewProfile">View Profile</button></a>
    <p class="fol">
      <span>${user.followers} followers</span>
      <span>${user.following} following</span>
    </p>
    <p id="repos">${user.public_repos}</p>
    <p>
      <i class="fas fa-marker-alt"></i>
      ${user.location}
    </p>
  </div>
  `;

  v.profile.innerHTML=html;
}

// Get Repos
async function getRepos(username){
    const response = await fetch(v.apiURL + username + "/repos");
    const data= await response.json();

    displayRepo(data);
}

// display repo

function displayRepo(repoData){
    let repo_data = repoData.map((repo)=>{
        return (
        `
        <span class="repo">
            <a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a>
            <p>
              <strong>Stars: ${repo.stargazers_count}|</strong>
              <strong>Watchers: ${repo.watchers_count}|</strong>
              <strong>Forks: ${repo.forks_count}</strong>
            </p>
          </span>
        
        `
        );

    })
    // v.repos.innerHTML=repo_data;
    v.repos.innerHTML=repo_data.slice(0,8).join("");

    document.querySelector(".hide").style.display="block";
}
