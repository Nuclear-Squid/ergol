import * as params from '@params';

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
      img.setAttribute("alt", `:${emoji.shortcode}:`);
      img.setAttribute("title", `:${emoji.shortcode}:`);
      img.setAttribute("width", "20");
      img.setAttribute("height", "20");

      picture.appendChild(source);
      picture.appendChild(img);

      output = output.replace(`:${emoji.shortcode}:`, picture.outerHTML);
    });

    return output;
  }

  function loadComments() {
    let commentsWrapper = document.getElementById("comments-wrapper");
    document.getElementById("load-comment").innerHTML = "Chargement";
    fetch(`https://${params.host}/api/v1/statuses/${params.id}/context`)
      .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          document.getElementById("load-comment").innerHTML = "Charger les commentaires";
          
          if (data.error) {
            commentsWrapper.innerHTML = "Une erreur est survenue pendant le chargement des commentaires.";
            return;
          }

          let descendants = data['descendants'];
          if (!descendants || !Array.isArray(descendants) || descendants.length <= 0) {
              commentsWrapper.innerHTML = "Pas encore de commentaires.";
              return;
          }

          commentsWrapper.innerHTML = "";

          descendants.forEach(function (status) {
            if (status.account.display_name.length > 0) {
                status.account.display_name = escapeHtml(status.account.display_name);
                status.account.display_name = emojify(status.account.display_name, status.account.emojis);
            } else {
                status.account.display_name = status.account.username;
            };

            let instance = "";
            if (status.account.acct.includes("@")) {
                instance = status.account.acct.split("@")[1];
            } else {
                instance = params.host;
            }

            const isReply = status.in_reply_to_id !== params.id;

            status.content = emojify(status.content, status.emojis);

            let avatarSource = document.createElement("source");
            avatarSource.setAttribute("srcset", escapeHtml(status.account.avatar));
            avatarSource.setAttribute("media", "(prefers-reduced-motion: no-preference)");

            let avatarImg = document.createElement("img");
            avatarImg.className = "avatar";
            avatarImg.setAttribute("src", escapeHtml(status.account.avatar_static));
            avatarImg.setAttribute("alt", `@${status.account.username}@${instance} avatar`);

            let avatarPicture = document.createElement("picture");
            avatarPicture.appendChild(avatarSource);
            avatarPicture.appendChild(avatarImg);

            let avatar = document.createElement("a");
            avatar.className = "avatar-link";
            avatar.setAttribute("href", status.account.url);
            avatar.setAttribute("rel", "external nofollow");
            avatar.setAttribute("title", `Voir le profil sur @${status.account.username}@${instance}`);
            avatar.appendChild(avatarPicture);

            let instanceBadge = document.createElement("a");
            instanceBadge.className = "instance";
            instanceBadge.setAttribute("href", status.account.url);
            instanceBadge.setAttribute("title", `@${status.account.username}@${instance}`);
            instanceBadge.setAttribute("rel", "external nofollow");
            instanceBadge.textContent = instance;

            let display = document.createElement("span");
            display.className = "display";
            display.setAttribute("itemprop", "author");
            display.setAttribute("itemtype", "http://schema.org/Person");
            display.innerHTML = status.account.display_name;

            let header = document.createElement("header");
            header.className = "author";
            header.appendChild(display);
            header.appendChild(instanceBadge);

            let permalink = document.createElement("a");
            permalink.setAttribute("href", status.url);
            permalink.setAttribute("itemprop", "url");
            permalink.setAttribute("title", `Voir le commentaire sur ${instance}`);
            permalink.setAttribute("rel", "external nofollow");
            permalink.textContent = new Date(status.created_at).toLocaleString('fr-FR', {
                dateStyle: "long",
                timeStyle: "short",
            });

            let timestamp = document.createElement("time");
            timestamp.setAttribute("datetime", status.created_at);
            timestamp.appendChild(permalink);

            let main = document.createElement("main");
            main.setAttribute("itemprop", "text");
            main.innerHTML = status.content;

            let interactions = document.createElement("footer");
            if (status.favourites_count > 0) {
                let faves = document.createElement("a");
                faves.className = "faves";
                faves.setAttribute("href", `${status.url}/favourites`);
                faves.setAttribute("title", `Favoris depuis ${instance}`);
                faves.textContent = status.favourites_count;

                interactions.appendChild(faves);
            }

            let comment = document.createElement("article");
            comment.id = `comment-${status.id}`;
            comment.className = isReply ? "comment comment-reply" : "comment";
            comment.setAttribute("itemprop", "comment");
            comment.setAttribute("itemtype", "http://schema.org/Comment");
            comment.appendChild(avatar);
            comment.appendChild(header);
            comment.appendChild(timestamp);
            comment.appendChild(main);
            comment.appendChild(interactions);

            commentsWrapper.innerHTML += DOMPurify.sanitize(comment.outerHTML);
        });
      });
  }

  document.getElementById("load-comment").addEventListener("click", loadComments);