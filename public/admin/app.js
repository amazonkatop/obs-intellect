(function () {
  var loginForm = document.querySelector("[data-admin-login]");
  var setupForm = document.querySelector("[data-admin-setup]");
  var resetForm = document.querySelector("[data-admin-reset]");
  var logoutBtn = document.querySelector("[data-admin-logout]");
  var siteRoot = document.querySelector("[data-admin-site]");
  var filesRoot = document.querySelector("[data-admin-files]");
  var integrationsRoot = document.querySelector("[data-admin-integrations]");
  var dialogsRoot = document.querySelector("[data-admin-dialogs]");

  function api(path, options) {
    options = options || {};
    var headers = Object.assign({ accept: "application/json" }, options.headers || {});
    if (options.body && !(options.body instanceof FormData) && !headers["content-type"]) {
      headers["content-type"] = "application/json";
    }
    return fetch(path, Object.assign({ credentials: "same-origin" }, options, { headers: headers })).then(
      function (res) {
        return res.json().catch(function () {
          return {};
        }).then(function (data) {
          return { res: res, data: data };
        });
      },
    );
  }

  function requireAdmin() {
    return api("/api/cms/me").then(function (result) {
      if (!result.data || !result.data.ok) {
        location.replace("/ru/admin/login");
        throw new Error("auth");
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      api("/api/cms/logout", { method: "POST", body: "{}" }).finally(function () {
        location.href = "/ru/admin/login";
      });
    });
  }

  if (loginForm || setupForm || resetForm) {
    var boot = document.querySelector("[data-auth-boot]");
    var copy = document.querySelector("[data-auth-copy]");

    function showPanel(name) {
      if (setupForm) setupForm.hidden = name !== "setup";
      if (loginForm) loginForm.hidden = name !== "login";
      if (resetForm) resetForm.hidden = name !== "reset";
      if (boot) boot.hidden = true;
      if (copy) {
        copy.textContent =
          name === "setup"
            ? "Придумайте пароль и укажите почту администратора. Эта почта понадобится, если пароль забудете."
            : name === "reset"
              ? "Укажите почту администратора и задайте новый пароль."
              : "Введите пароль. Если забыли — создайте новый по почте администратора.";
      }
    }

    function bindAuthForm(form, path) {
      if (!form) return;
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var status = form.querySelector("[data-login-status]");
        var passwordInput = form.querySelector('[name="password"]');
        var repeatInput = form.querySelector('[name="repeat"]');
        var emailInput = form.querySelector('[name="email"]');
        var password = passwordInput ? passwordInput.value : "";
        var repeat = repeatInput ? repeatInput.value : "";
        if (repeatInput && password !== repeat) {
          status.textContent = "Пароли не совпадают.";
          return;
        }
        var body = { password: password, repeat: repeat };
        if (emailInput) body.email = emailInput.value.trim();
        api(path, { method: "POST", body: JSON.stringify(body) }).then(function (result) {
          if (!result.res.ok) {
            status.textContent = (result.data && result.data.error) || "Не удалось сохранить.";
            return;
          }
          location.href = "/ru/admin";
        });
      });
    }

    var showReset = document.querySelector("[data-show-reset]");
    var showLogin = document.querySelector("[data-show-login]");
    if (showReset) {
      showReset.addEventListener("click", function () {
        showPanel("reset");
      });
    }
    if (showLogin) {
      showLogin.addEventListener("click", function () {
        showPanel("login");
      });
    }

    bindAuthForm(setupForm, "/api/cms/setup");
    bindAuthForm(resetForm, "/api/cms/reset");
    bindAuthForm(loginForm, "/api/cms/login");

    api("/api/cms/me").then(function (result) {
      if (result.data && result.data.ok) {
        location.replace("/ru/admin");
        return;
      }
      showPanel(result.data && result.data.configured ? "login" : "setup");
    });
    return;
  }

  if (siteRoot) {
    requireAdmin().then(function () {
      return api("/api/cms/catalog");
    }).then(function (result) {
      var fields = result.data.fields || [];
      var values = result.data.values || {};
      var list = siteRoot.querySelector("[data-field-list]");
      var locale = "ru";
      var status = siteRoot.querySelector("[data-save-status]");

      function fill() {
        document.querySelectorAll("[data-cms-input]").forEach(function (input) {
          var key = input.getAttribute("data-cms-input");
          input.value = values[key] || "";
          input.placeholder = input.getAttribute("data-placeholder") || "";
        });
        if (!list) return;
        list.innerHTML = "";
        var groups = {};
        fields.forEach(function (field) {
          if (field.locale && field.locale !== locale) return;
          if (field.key.indexOf("home.") === 0 && document.querySelector('[data-cms-input="' + field.key + '"]')) return;
          groups[field.group] = groups[field.group] || [];
          groups[field.group].push(field);
        });
        Object.keys(groups).forEach(function (group) {
          var section = document.createElement("section");
          section.className = "border-t border-line py-10";
          section.innerHTML = '<div class="wrap"><h2 class="page-h2">' + group + "</h2></div>";
          var wrap = section.querySelector(".wrap");
          groups[group].forEach(function (field) {
            var label = document.createElement("label");
            label.className = "mt-6 block text-sm text-muted";
            label.textContent = field.label;
            var input =
              field.kind === "textarea" ? document.createElement("textarea") : document.createElement("input");
            input.className = "cms-field mt-1 w-full border border-line bg-canvas px-3 py-2 text-ink";
            input.setAttribute("data-cms-input", field.key);
            if (field.kind === "textarea") input.rows = 4;
            input.value = values[field.key] || "";
            wrap.appendChild(label);
            wrap.appendChild(input);
          });
          list.appendChild(section);
        });
      }

      siteRoot.addEventListener("click", function (event) {
        var btn = event.target.closest("[data-locale]");
        if (!btn) return;
        locale = btn.getAttribute("data-locale");
        siteRoot.querySelectorAll("[data-locale]").forEach(function (node) {
          node.classList.toggle("text-primary", node.getAttribute("data-locale") === locale);
          node.classList.toggle("text-muted", node.getAttribute("data-locale") !== locale);
        });
        siteRoot.querySelectorAll("[data-locale-pane]").forEach(function (pane) {
          pane.hidden = pane.getAttribute("data-locale-pane") !== locale;
        });
        fill();
      });

      siteRoot.querySelector("[data-save]").addEventListener("click", function () {
        var entries = {};
        document.querySelectorAll("[data-cms-input]").forEach(function (input) {
          var key = input.getAttribute("data-cms-input");
          if (input.value.trim()) entries[key] = input.value;
        });
        Object.keys(values).forEach(function (key) {
          if (!(key in entries) && document.querySelector('[data-cms-input="' + key + '"]') === null) {
            entries[key] = values[key];
          }
        });
        status.textContent = "Сохранение…";
        api("/api/cms/content", { method: "PUT", body: JSON.stringify({ entries: entries }) }).then(function (saved) {
          if (!saved.res.ok) {
            status.textContent = saved.data.error || "Не сохранено. На Netlify диск только для чтения — используйте Timeweb или npm run dev.";
            return;
          }
          values = entries;
          status.textContent = "Сохранено. Откройте сайт — тексты с data-cms обновятся сразу.";
        });
      });

      fill();
    });
  }

  if (filesRoot) {
    requireAdmin().then(function () {
      var list = filesRoot.querySelector("[data-file-list]");
      var status = filesRoot.querySelector("[data-file-status]");
      function render(files) {
        list.innerHTML = "";
        if (!files.length) {
          list.innerHTML = '<p class="text-muted">Файлов пока нет.</p>';
          return;
        }
        files.forEach(function (file) {
          var card = document.createElement("article");
          card.className = "panel";
          card.innerHTML =
            '<p class="font-mono text-sm break-all">' +
            file.url +
            '</p><p class="mt-2 text-sm text-muted">' +
            Math.round(file.size / 1024) +
            ' КБ</p><button type="button" class="btn-secondary mt-4" data-copy="' +
            file.url +
            '">Копировать URL</button>';
          list.appendChild(card);
        });
      }
      function reload() {
        return api("/api/cms/files").then(function (result) {
          render((result.data && result.data.files) || []);
        });
      }
      filesRoot.addEventListener("click", function (event) {
        var copy = event.target.closest("[data-copy]");
        if (!copy) return;
        navigator.clipboard.writeText(copy.getAttribute("data-copy")).then(function () {
          status.textContent = "URL скопирован. Вставьте в текст или в поле картинки.";
        });
      });
      filesRoot.querySelector("[data-upload]").addEventListener("change", function (event) {
        var file = event.target.files && event.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function () {
          var data = String(reader.result || "").split(",")[1] || "";
          status.textContent = "Загрузка…";
          api("/api/cms/files", {
            method: "POST",
            body: JSON.stringify({ name: file.name, type: file.type, data: data }),
          }).then(function (result) {
            if (!result.res.ok) {
              status.textContent = result.data.error || "Не загружено.";
              return;
            }
            status.textContent = "Файл доступен по " + result.data.file.url;
            reload();
          });
        };
        reader.readAsDataURL(file);
      });
      reload();
    });
  }

  if (integrationsRoot) {
    requireAdmin().then(function () {
      return Promise.all([api("/api/cms/ai-assistant"), api("/api/cms/integrations")]);
    }).then(function (results) {
      var aiResult = results[0];
      var result = results[1];
      var ai = (aiResult.res.ok && aiResult.data) || {};
      var aiCard = integrationsRoot.querySelector("[data-ai-card]");
      var root = integrationsRoot.querySelector("[data-integration-list]");
      var status = integrationsRoot.querySelector("[data-int-status]");

      if (aiCard) {
        if (!aiResult.res.ok) {
          aiCard.innerHTML =
            '<div class="mt-10 panel"><h2 class="page-h2">AI-ассистент</h2><p class="mt-4 text-sm leading-6 text-muted">' +
            ((aiResult.data && aiResult.data.error) ||
              "Не удалось загрузить AI-ассистента.") +
            "</p></div>";
        } else {
          aiCard.innerHTML =
            '<section class="mt-10"><h2 class="page-h2">AI-ассистент</h2><div class="mt-8 panel grid gap-6">' +
            '<label class="block text-sm text-muted">Провайдер<select class="mt-1 w-full border border-line bg-canvas px-3 py-2 text-ink" data-ai-provider>' +
            '<option value="deepseek">DeepSeek</option><option value="openai">OpenAI</option></select></label>' +
            '<label class="block text-sm text-muted">API-ключ<input class="mt-1 w-full border border-line bg-canvas px-3 py-2 text-ink" data-ai-key type="password" autocomplete="off" placeholder="' +
            (ai.hasKey ? ai.preview : "не задано") +
            '" /></label>' +
            '<label class="block text-sm text-muted">Модель (необязательно)<input class="mt-1 w-full border border-line bg-canvas px-3 py-2 text-ink" data-ai-model placeholder="deepseek-chat" /></label>' +
            '<label class="flex items-center gap-3 text-sm"><input type="checkbox" data-ai-enabled /> Включено</label>' +
            '<p class="text-xs text-muted">' +
            (ai.storage === "local-files"
              ? "Локальный режим: ключ пишется в data/chat/store.json, не в браузер. PostgreSQL не нужен."
              : "Сохранение пишет JSON в integrations.config. Ключ на фронтенд не отдаётся.") +
            "</p>" +
            "</div></section>";
          var provider = aiCard.querySelector("[data-ai-provider]");
          var model = aiCard.querySelector("[data-ai-model]");
          var enabled = aiCard.querySelector("[data-ai-enabled]");
          if (provider) provider.value = ai.provider === "openai" ? "openai" : "deepseek";
          if (model) model.value = ai.model || "";
          if (enabled) enabled.checked = Boolean(ai.is_enabled);
        }
      }

      var groups = {};
      (result.data.items || []).forEach(function (item) {
        groups[item.group] = groups[item.group] || [];
        groups[item.group].push(item);
      });
      Object.keys(groups).forEach(function (group) {
        var section = document.createElement("section");
        section.className = "mt-12";
        section.innerHTML = '<h2 class="page-h2">' + group + "</h2>";
        groups[group].forEach(function (item) {
          var wrap = document.createElement("div");
          wrap.className = "mt-8 panel";
          wrap.innerHTML =
            '<label class="block text-sm font-medium">' +
            item.label +
            '</label><p class="mt-2 text-sm leading-6 text-muted">' +
            item.help +
            '</p><input class="mt-4 w-full border border-line bg-canvas px-3 py-2 text-ink" data-int-key="' +
            item.key +
            '" placeholder="' +
            (item.hasValue ? item.preview : "не задано") +
            '" autocomplete="off" ' +
            (item.secret ? 'type="password"' : 'type="text"') +
            ' /><p class="mt-2 text-xs text-muted">' +
            (item.hasValue ? "Значение сохранено. Введите новое, чтобы заменить." : "Пусто.") +
            "</p>";
          section.appendChild(wrap);
        });
        root.appendChild(section);
      });
      integrationsRoot.querySelector("[data-int-save]").addEventListener("click", function () {
        var inputs = [].slice.call(document.querySelectorAll("[data-int-key]"));
        var keyInput = integrationsRoot.querySelector("[data-ai-key]");
        status.textContent = "Сохранение…";
        var chain = Promise.resolve();
        if (aiCard && aiCard.querySelector("[data-ai-provider]")) {
          chain = chain.then(function () {
            return api("/api/cms/ai-assistant", {
              method: "PUT",
              body: JSON.stringify({
                provider: integrationsRoot.querySelector("[data-ai-provider]").value,
                api_key: keyInput ? keyInput.value.trim() : "",
                model: integrationsRoot.querySelector("[data-ai-model]").value.trim(),
                is_enabled: integrationsRoot.querySelector("[data-ai-enabled]").checked,
              }),
            });
          });
        }
        inputs.forEach(function (input) {
          if (!input.value.trim()) return;
          chain = chain.then(function () {
            return api("/api/cms/integrations", {
              method: "PUT",
              body: JSON.stringify({ key: input.getAttribute("data-int-key"), value: input.value.trim() }),
            });
          });
        });
        chain.then(function () {
          status.textContent =
            ai.storage === "local-files"
              ? "Сохранено локально (data/chat/store.json). Ключ не уходит в браузер."
              : "Сохранено. Ключ AI-ассистента остаётся в PostgreSQL, не в HTML.";
          inputs.forEach(function (input) {
            input.value = "";
          });
          if (keyInput) keyInput.value = "";
        });
      });
    });
  }

  if (dialogsRoot) {
    requireAdmin().then(function () {
      var view = dialogsRoot.querySelector("[data-dialogs-view]");
      var status = dialogsRoot.querySelector("[data-dialogs-status]");
      var params = new URLSearchParams(location.search);
      var id = params.get("id");

      function escapeHtml(value) {
        return String(value || "")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }

      if (id) {
        return api("/api/cms/dialogs/" + encodeURIComponent(id)).then(function (result) {
          if (!result.res.ok) {
            status.textContent = (result.data && result.data.error) || "Диалог не найден.";
            return;
          }
          var messages = result.data.messages || [];
          var session = result.data.session || {};
          view.innerHTML =
            '<p class="text-sm text-muted"><a class="text-primary" href="/ru/admin/dialogs">← Ко всем диалогам</a></p>' +
            '<p class="mt-4 font-mono text-xs text-muted">' +
            escapeHtml(session.id) +
            " · " +
            escapeHtml(session.status) +
            "</p>" +
            messages
              .map(function (item) {
                return (
                  '<article class="mt-6 panel"><p class="badge">' +
                  (item.role === "user" ? "Клиент" : "Ассистент") +
                  "</p><p class=\"mt-3 whitespace-pre-wrap text-base leading-7\">" +
                  escapeHtml(item.content) +
                  "</p></article>"
                );
              })
              .join("");
        });
      }

      return api("/api/cms/dialogs").then(function (result) {
        if (!result.res.ok) {
          status.textContent = (result.data && result.data.error) || "Не удалось загрузить диалоги.";
          return;
        }
        var sessions = result.data.sessions || [];
        if (!sessions.length) {
          view.innerHTML = '<p class="text-muted">Диалогов пока нет.</p>';
          return;
        }
        view.innerHTML = sessions
          .map(function (item) {
            return (
              '<a class="panel panel-link mt-4 block no-underline" href="/ru/admin/dialogs?id=' +
              encodeURIComponent(item.id) +
              '"><p class="font-mono text-xs text-muted">' +
              escapeHtml(item.id) +
              '</p><p class="mt-2 text-base text-ink">' +
              escapeHtml(item.preview || "Без сообщений клиента") +
              '</p><p class="mt-2 text-sm text-muted">' +
              item.message_count +
              " сообщ. · " +
              escapeHtml(item.created_at) +
              "</p></a>"
            );
          })
          .join("");
      });
    });
  }
})();
