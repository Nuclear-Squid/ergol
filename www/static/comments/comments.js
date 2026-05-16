function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function emojify(input, emojis) {
    let output = input;

    emojis.forEach(emoji => {
    let picture = document.createElement("picture");

    let source = document.createElement("source");
    source.setAttribute("srcset", escapeHtml(emoji.url));
    source.setAttribute("media", "(prefers-reduced-motion: no-preference)");

    let img = document.createElement("img");
    img.className = "emoji";
    img.setAttribute("src", escapeHtml(emoji.static_url));
    img.setAttribute("alt", `:${ emoji.shortcode }:`);
    img.setAttribute("title", `:${ emoji.shortcode }:`);
    img.setAttribute("width", "20");
    img.setAttribute("height", "20");

    picture.appendChild(source);
    picture.appendChild(img);

    output = output.replace(`:${ emoji.shortcode }:`, picture.outerHTML);
    });

    return output;
}

function loadComments() {
    // Lazy loading of CSS for comments
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = window.location.origin + '/css/comments.css';
    document.head.appendChild(link); 

    // Adding comments
    let commentsWrapper = document.getElementById("comments-wrapper");
    document.getElementById("load-comment").innerHTML = "(Re)Chargement";
    fetch(`https://${ host }/api/v1/statuses/${ comment_id }/context`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let descendants = data['descendants'];
        if(
        descendants &&
        Array.isArray(descendants) &&
        descendants.length > 0
        ) {
        commentsWrapper.innerHTML = "";

        descendants.forEach(function(status) {
            // console.log(descendants)
            if( status.account.display_name.length > 0 ) {
            status.account.display_name = escapeHtml(status.account.display_name);
            status.account.display_name = emojify(status.account.display_name, status.account.emojis);
            } else {
            status.account.display_name = status.account.username;
            };

            let instance = "";
            if( status.account.acct.includes("@") ) {
            instance = status.account.acct.split("@")[1];
            } else {
            instance = host;
            }

            const isReply = status.in_reply_to_id !== comment_id;

            let op = false;
            if( status.account.acct == username ) {
            op = true;
            }

            status.content = emojify(status.content, status.emojis);

          
          let comment = document.createElement("article");
          comment.className = "comment";
          comment.id = `comment-${ status.id }`;
          comment.className = isReply ? "comment comment-reply" : "comment";
          comment.setAttribute("itemprop", "comment");
          comment.setAttribute("itemtype", "http://schema.org/Comment");

          let avatarDiv = document.createElement("div");
          avatarDiv.className = "avatar";

          let avatarImg = document.createElement("img");
          avatarImg.setAttribute("src", escapeHtml(status.account.avatar_static));
          avatarImg.setAttribute("alt", `@${ status.account.username }@${ instance } avatar`);

          let content = document.createElement("div");
          content.className = "content";

          let header = document.createElement("header");
          header.className = "comment-header";

          let usernameSpan = document.createElement("span");
          usernameSpan.className = "username";
          let userLink = document.createElement("a");
          userLink.setAttribute("href", status.account.url);
          userLink.setAttribute("title", `View profile at @${ status.account.username }@${ instance }`);
          userLink.setAttribute("rel", "external nofollow");
          userLink.textContent = status.account.display_name;

          let timestamp = document.createElement("span");
          timestamp.className = "timestamp";
          timestamp.textContent = new Date( status.created_at ).toLocaleString('fr-FR', {
            dateStyle: "long",
            timeStyle: "short",
            });
          timestamp.setAttribute("datetime", status.created_at);

          let main = document.createElement("main");
          main.setAttribute("itemprop", "text");
          main.innerHTML = status.content;

          let footer = document.createElement("footer");
          footer.className = "comment-header";
          

          let faves = document.createElement("a");
          faves.className = "faves";
          faves.setAttribute("href", `${ status.url }/favourites`);
          faves.setAttribute("title", `Favorites from ${ instance }`);
          if(status.favourites_count >= 1) {
              faves.textContent = `${ status.favourites_count} ⭐`;
          } 
          
          let reply = document.createElement("a");
          reply.className = "reply";
          reply.setAttribute("href", `${ status.url}`);
          reply.setAttribute("title", "Répondre via le Fédiverse");
          reply.textContent = "↩"


          avatarDiv.appendChild(avatarImg);
          usernameSpan.appendChild(userLink);

          header.appendChild(usernameSpan);
          header.appendChild(timestamp);
          footer.appendChild(faves);
          footer.appendChild(reply)

          content.appendChild(header);
          content.appendChild(main);
          content.appendChild(footer);

          comment.appendChild(avatarDiv)
          comment.appendChild(content)

          commentsWrapper.innerHTML += DOMPurify.sanitize(comment.outerHTML);
        });
        }
    });
}

document.getElementById("load-comment").addEventListener("click", loadComments);

