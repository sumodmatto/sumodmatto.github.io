class EmojiSelector extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <div class="emoji-container">
          <h1>Emoji Selector</h1>
          <div class="controls">
            <button id="random-button" class="random-button">Random Emoji</button>
            <div class="tag-buttons">
              <button class="tag-button" data-tag="all">All</button>
              <button class="tag-button" data-tag="happy">Happy</button>
              <button class="tag-button" data-tag="sad">Sad</button>
              <button class="tag-button" data-tag="angry">Angry</button>
              <button class="tag-button" data-tag="love">Love</button>
              <button class="tag-button" data-tag="surprised">Surprised</button>
              <button class="tag-button" data-tag="cool">Cool</button>
              <button class="tag-button" data-tag="sick">Sick</button>
              <button class="tag-button" data-tag="party">Party</button>
              <button class="tag-button" data-tag="animal">Animal</button>
              <button class="tag-button" data-tag="object">Object</button>
            </div>
          </div>
          <div class="emoji-list"></div>
          <div class="emoji-display"></div>
        </div>
        <style>
          ${this.getStyle()}
        </style>
      `;

    this.emojis = [
      { emoji: "😀", tags: ["happy", "smile"] },
      { emoji: "😃", tags: ["happy", "smile"] },
      { emoji: "😄", tags: ["happy", "smile"] },
      { emoji: "😁", tags: ["happy", "smile"] },
      { emoji: "😆", tags: ["happy", "smile"] },
      { emoji: "😅", tags: ["happy", "sweat"] },
      { emoji: "😂", tags: ["happy", "laugh", "cry"] },
      { emoji: "🤣", tags: ["happy", "laugh"] },
      { emoji: "😊", tags: ["happy", "smile"] },
      { emoji: "😇", tags: ["happy", "angel"] },
      { emoji: "🙂", tags: ["happy", "smile"] },
      { emoji: "🙃", tags: ["happy", "upside-down"] },
      { emoji: "😉", tags: ["happy", "wink"] },
      { emoji: "😌", tags: ["happy", "relieved"] },
      { emoji: "😍", tags: ["happy", "heart", "love"] },
      { emoji: "🥰", tags: ["happy", "heart", "love"] },
      { emoji: "😘", tags: ["happy", "kiss", "love"] },
      { emoji: "😗", tags: ["happy", "kiss"] },
      { emoji: "😙", tags: ["happy", "kiss"] },
      { emoji: "😚", tags: ["happy", "kiss"] },
      { emoji: "😋", tags: ["happy", "yum"] },
      { emoji: "😛", tags: ["happy", "tongue"] },
      { emoji: "😜", tags: ["happy", "tongue"] },
      { emoji: "🤪", tags: ["happy", "crazy"] },
      { emoji: "😝", tags: ["happy", "tongue"] },
      { emoji: "🤑", tags: ["happy", "money"] },
      { emoji: "🤗", tags: ["happy", "hug"] },
      { emoji: "🤭", tags: ["happy", "oops"] },
      { emoji: "🤫", tags: ["quiet", "shush"] },
      { emoji: "🤔", tags: ["thinking"] },
      { emoji: "🤐", tags: ["quiet", "zipper"] },
      { emoji: "🤨", tags: ["suspicious"] },
      { emoji: "😐", tags: ["neutral"] },
      { emoji: "😑", tags: ["neutral"] },
      { emoji: "😶", tags: ["neutral", "quiet"] },
      { emoji: "😏", tags: ["smirk"] },
      { emoji: "😒", tags: ["unamused"] },
      { emoji: "🙄", tags: ["eyeroll"] },
      { emoji: "😬", tags: ["grimace"] },
      { emoji: "🤥", tags: ["lying", "nose"] },
      { emoji: "😌", tags: ["relieved"] },
      { emoji: "😔", tags: ["sad"] },
      { emoji: "😪", tags: ["sleepy", "sad"] },
      { emoji: "🤤", tags: ["drooling"] },
      { emoji: "😴", tags: ["sleeping"] },
      { emoji: "😷", tags: ["sick", "mask"] },
      { emoji: "🤒", tags: ["sick", "thermometer"] },
      { emoji: "🤕", tags: ["sick", "bandage"] },
      { emoji: "🤢", tags: ["sick", "nauseated"] },
      { emoji: "🤮", tags: ["sick", "vomit"] },
      { emoji: "🤧", tags: ["sick", "sneeze"] },
      { emoji: "🥵", tags: ["hot", "sweating"] },
      { emoji: "🥶", tags: ["cold", "freezing"] },
      { emoji: "🥴", tags: ["woozy"] },
      { emoji: "😵", tags: ["dizzy"] },
      { emoji: "🤯", tags: ["mind-blown"] },
      { emoji: "🤠", tags: ["cowboy"] },
      { emoji: "🥳", tags: ["party", "celebration"] },
      { emoji: "😎", tags: ["cool", "sunglasses"] },
      { emoji: "🤓", tags: ["nerd"] },
      { emoji: "🧐", tags: ["thinking", "monocle"] },
      { emoji: "😕", tags: ["confused"] },
      { emoji: "😟", tags: ["worried"] },
      { emoji: "🙁", tags: ["frown"] },
      { emoji: "☹️", tags: ["frown"] },
      { emoji: "😮", tags: ["surprised"] },
      { emoji: "😯", tags: ["hushed"] },
      { emoji: "😲", tags: ["astonished"] },
      { emoji: "😳", tags: ["flushed"] },
      { emoji: "🥺", tags: ["pleading"] },
      { emoji: "😦", tags: ["frown"] },
      { emoji: "😧", tags: ["anguished"] },
      { emoji: "😨", tags: ["fearful"] },
      { emoji: "😰", tags: ["anxious", "sweat"] },
      { emoji: "😥", tags: ["sad", "relieved"] },
      { emoji: "😢", tags: ["sad", "cry"] },
      { emoji: "😭", tags: ["cry", "sad"] },
      { emoji: "😱", tags: ["scream", "fear"] },
      { emoji: "😖", tags: ["confounded"] },
      { emoji: "😣", tags: ["persevere"] },
      { emoji: "😞", tags: ["disappointed"] },
      { emoji: "😓", tags: ["sad", "sweat"] },
      { emoji: "😩", tags: ["weary"] },
      { emoji: "😫", tags: ["tired"] },
      { emoji: "🥱", tags: ["yawn"] },
      { emoji: "😤", tags: ["triumph"] },
      { emoji: "😡", tags: ["angry"] },
      { emoji: "😠", tags: ["mad"] },
      { emoji: "🤬", tags: ["cursing", "angry"] },
      { emoji: "😈", tags: ["smiling", "devil"] },
      { emoji: "👿", tags: ["angry", "devil"] },
      { emoji: "💀", tags: ["skull"] },
      { emoji: "☠️", tags: ["skull", "bones"] },
      { emoji: "💩", tags: ["poop"] },
      { emoji: "🤡", tags: ["clown"] },
      { emoji: "👹", tags: ["ogre"] },
      { emoji: "👺", tags: ["goblin"] },
      { emoji: "👻", tags: ["ghost"] },
      { emoji: "👽", tags: ["alien"] },
      { emoji: "👾", tags: ["alien", "monster"] },
      { emoji: "🤖", tags: ["robot"] },
      { emoji: "😺", tags: ["cat", "smile", "animal"] },
      { emoji: "😸", tags: ["cat", "happy", "animal"] },
      { emoji: "😹", tags: ["cat", "cry", "animal"] },
      { emoji: "😻", tags: ["cat", "heart", "animal"] },
      { emoji: "😼", tags: ["cat", "smirk", "animal"] },
      { emoji: "😽", tags: ["cat", "kiss", "animal"] },
      { emoji: "🙀", tags: ["cat", "surprised", "animal"] },
      { emoji: "😿", tags: ["cat", "cry", "animal"] },
      { emoji: "😾", tags: ["cat", "angry", "animal"] },
      { emoji: "🙈", tags: ["monkey", "see-no-evil", "animal"] },
      { emoji: "🙉", tags: ["monkey", "hear-no-evil", "animal"] },
      { emoji: "🙊", tags: ["monkey", "speak-no-evil", "animal"] },
      { emoji: "💋", tags: ["kiss"] },
      { emoji: "💌", tags: ["love", "letter"] },
      { emoji: "💘", tags: ["love", "heart", "arrow"] },
      { emoji: "💝", tags: ["love", "heart", "ribbon"] },
      { emoji: "💖", tags: ["love", "heart", "sparkle"] },
      { emoji: "💗", tags: ["love", "heart", "growing"] },
      { emoji: "💓", tags: ["love", "heart", "beating"] },
      { emoji: "💞", tags: ["love", "heart", "revolving"] },
      { emoji: "💕", tags: ["love", "heart"] },
      { emoji: "💟", tags: ["love", "heart"] },
      { emoji: "❣️", tags: ["love", "heart", "exclamation"] },
      { emoji: "💔", tags: ["love", "heart", "broken"] },
      { emoji: "❤️", tags: ["love", "heart"] },
      { emoji: "🧡", tags: ["love", "heart"] },
      { emoji: "💛", tags: ["love", "heart"] },
      { emoji: "💚", tags: ["love", "heart"] },
      { emoji: "💙", tags: ["love", "heart"] },
      { emoji: "💜", tags: ["love", "heart"] },
      { emoji: "🖤", tags: ["love", "heart"] },
      { emoji: "🤍", tags: ["love", "heart"] },
      { emoji: "🤎", tags: ["love", "heart"] },
      { emoji: "💯", tags: ["100", "score"] },
      { emoji: "💢", tags: ["anger"] },
      { emoji: "💥", tags: ["boom"] },
      { emoji: "💫", tags: ["dizzy"] },
      { emoji: "💦", tags: ["sweat"] },
      { emoji: "💨", tags: ["dash"] },
      { emoji: "🕳️", tags: ["hole"] },
      { emoji: "💣", tags: ["bomb", "object"] },
      { emoji: "💬", tags: ["speech"] },
      { emoji: "👁️‍🗨️", tags: ["eye", "speech"] },
      { emoji: "🗨️", tags: ["speech"] },
      { emoji: "🗯️", tags: ["angry", "speech"] },
      { emoji: "💭", tags: ["thought", "bubble"] },
      { emoji: "🧠", tags: ["brain", "object"] },
    ];

    this.randomButton = this.shadowRoot.querySelector("#random-button");
    this.tagButtons = this.shadowRoot.querySelectorAll(".tag-button");
    this.emojiList = this.shadowRoot.querySelector(".emoji-list");
    this.emojiDisplay = this.shadowRoot.querySelector(".emoji-display");

    this.randomButton.addEventListener("click", () => this.showRandomEmoji());
    this.tagButtons.forEach((button) =>
      button.addEventListener("click", (e) => this.filterEmojis(e))
    );

    this.displayAllEmojis();
  }

  getStyle() {
    return `
        .emoji-container {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
          text-align: center;
          width: 60vw;
          margin: auto;
        }
  
        .controls {
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
  
        .tag-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 10px;
        }
  
        .emoji-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 20px;
        }
  
        .emoji-item {
          font-size: 2em;
          margin: 10px;
          cursor: pointer;
        }
  
        .emoji-display {
          font-size: 4em;
          margin-top: 20px;
        }
  
        .random-button {
          background-color: #4a90e2;
          color: white;
          margin-bottom: 10px;
        }
  
        .tag-button {
          background-color: #f0f0f0;
          color: black;
          margin: 5px;
        }
  
        .random-button:hover {
          background-color: #357ab8;
        }
  
        .tag-button:hover {
          background-color: #e0e0e0;
        }
  
        button {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
      `;
  }

  displayAllEmojis() {
    this.emojiList.innerHTML = "";
    this.emojis.forEach((emojiData) => {
      const emojiItem = document.createElement("span");
      emojiItem.classList.add("emoji-item");
      emojiItem.textContent = emojiData.emoji;
      this.emojiList.appendChild(emojiItem);
    });
  }

  showRandomEmoji() {
    const randomEmoji =
      this.emojis[Math.floor(Math.random() * this.emojis.length)].emoji;
    this.emojiDisplay.textContent = randomEmoji;
  }

  filterEmojis(e) {
    const tag = e.target.getAttribute("data-tag");
    let filteredEmojis;
    if (tag === "all") {
      filteredEmojis = this.emojis;
    } else {
      filteredEmojis = this.emojis.filter((emojiData) =>
        emojiData.tags.includes(tag)
      );
    }

    this.emojiList.innerHTML = "";
    filteredEmojis.forEach((emojiData) => {
      const emojiItem = document.createElement("span");
      emojiItem.classList.add("emoji-item");
      emojiItem.textContent = emojiData.emoji;
      this.emojiList.appendChild(emojiItem);
    });
  }
}

customElements.define("emoji-selector", EmojiSelector);
