(function () {
  fetch("/cms/content.json", { cache: "no-store" })
    .then(function (response) {
      return response.ok ? response.json() : {};
    })
    .then(function (data) {
      if (!data || typeof data !== "object") return;
      document.querySelectorAll("[data-cms]").forEach(function (node) {
        var key = node.getAttribute("data-cms");
        if (key && typeof data[key] === "string" && data[key] !== "") {
          node.textContent = data[key];
        }
      });
      var titleKey = document.documentElement.getAttribute("data-cms-title");
      var descKey = document.documentElement.getAttribute("data-cms-description");
      if (titleKey && typeof data[titleKey] === "string" && data[titleKey]) {
        var brand = document.documentElement.lang === "ru" ? "ОБС Интеллект" : "OBS Intellect";
        var full = data[titleKey].indexOf(brand) >= 0 ? data[titleKey] : data[titleKey] + " — " + brand;
        document.title = full;
        var ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute("content", full);
        var twTitle = document.querySelector('meta[name="twitter:title"]');
        if (twTitle) twTitle.setAttribute("content", full);
      }
      if (descKey && typeof data[descKey] === "string" && data[descKey]) {
        var desc = data[descKey];
        var meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute("content", desc);
        var ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute("content", desc);
        var twDesc = document.querySelector('meta[name="twitter:description"]');
        if (twDesc) twDesc.setAttribute("content", desc);
      }
    })
    .catch(function () {});
})();
