import IdeasApi from "../services/IdeasApi";
class IdeaList {
    constructor() {
        this._ideaListEl = document.querySelector("#idea-list");
        this._ideas = [];
        this.getIdeas();
        //console.log(this._ideas[1]["username"])
    }
    
    async getIdeas() {
        try {
            const res = await IdeasApi.getIdeas();
            this._ideas = res.data.data;
            this.render();
        } catch (error) {
            console.log(error)
            
        }
    }

    addEventListeners() {
        this._ideaListEl.addEventListener("click", (e) => {
            if(e.target.classList.contains("fa-times")) {
                e.stopImmediatePropagation();
                const ideaId = e.target.parentElement.parentElement.dataset.id;
                this.deleteIdea(ideaId);
            }
        })
    }

    async deleteIdea(ideaId) {
        try {
            //Delete from server
          const res = await IdeasApi.deleteIdea(ideaId);
          this._ideas.filter((idea) => idea._id !== ideaId);
          this.getIdeas();
        } catch (error) {
            alert("You can not delete this resource")
        }
    }

    addIdeaToList(idea) {
        this._ideas.push(idea);
        this.render();
    }

    render() {
        this._ideaListEl.innerHTML = this._ideas.map((idea) => {
            const deleteBtn = idea.username === localStorage.getItem("username")
             ? `<button class="delete"><i class="fas fa-times"></i></button>`
             :"";
            return `
            <div class="card" data-id="${idea._id}">
            ${deleteBtn}
          <h3>
          ${idea["text"]}
          </h3>
          <p class="tag tag-${idea["tag"].toLowerCase()}">${idea["tag"].toUpperCase()}</p>
          <p>
            Posted on <span class="date">${idea["date"]}</span> by
            <span class="author">${idea["username"]}</span>
          </p>
        </div>

            `;
        }).join("");
        this.addEventListeners();
    }
}

export default IdeaList;

// this._form.elements.text.value = "";
//      this._form.elements.tag.value = "";
//      this._form.elements.username.value = "";

