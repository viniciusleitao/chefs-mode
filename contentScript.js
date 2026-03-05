(() => {
  const OVERLAY_ID = "chefs-mode-overlay-root";
  let chefsModeActive = false;
  let previousHtmlOverflow = "";
  let previousBodyOverflow = "";

  const CHEFS_MODE_STYLES = `
      @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,400;0,600;0,700;1,400&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap');

      :host {
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        font-family: "Roboto Mono", SF Mono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      }

      :host .chefs-mode-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(34, 34, 34, 0.98);
      }

      :host .chefs-mode-shell {
        position: relative;
        inset: 0;
        padding: 48px 24px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        color: #ffffff;
        height: 100vh;
        box-sizing: border-box;
        overflow-y: auto;
      }

      :host .chefs-mode-card {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 64px;
      }

      :host .chefs-mode-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
      }

      :host .chefs-mode-title-block {
        display: flex;
        flex-direction: column;
        gap: 16px;
        flex: 1;
      }

      :host .chefs-mode-title {
        margin: 0;
        font-size: clamp(30px, 3.4vw, 40px);
        font-weight: 600;
        line-height: 1.1;
        letter-spacing: 0.02em;
        color: #ffffff;
      }

      :host .chefs-mode-close {
        background: transparent;
        border: none;
        width: 40px;
        height: 40px;
        min-width: 40px;
        min-height: 40px;
        border-radius: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        flex-shrink: 0;
        margin-top: 0;
        position: fixed;
        top: 16px;
        right: 24px;
        transition: background 0.15s ease, transform 0.1s ease;
      }

      :host .chefs-mode-close-icon {
        font-family: 'Google Sans', sans-serif;
        font-size: 32px;
        color: #ffffff;
        font-weight: 300;
      }

      :host .chefs-mode-close:hover {
        background: transparent;
        transform: translateY(-1px);
      }

      :host .chefs-mode-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 48px;
        font-size: 16px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        opacity: 0.86;
      }

      :host .chefs-mode-meta-item {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      :host .chefs-mode-meta-label {
        font-size: 11px;
        opacity: 0.7;
      }

      :host .chefs-mode-meta-value {
        font-size: 13px;
        font-weight: 400;
      }

      :host .chefs-mode-hero {
        display: flex;
        justify-content: center;
      }

      :host .chefs-mode-hero-inner {
        border-radius: 4px;
        overflow: hidden;
        background: #111;
        max-width: 1200x;
        max-height: 400px;
        width: 100%;
      }

      :host .chefs-mode-hero img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      :host .chefs-mode-main {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 80px;
      }

      :host .chefs-mode-ingredients,
      :host .chefs-mode-steps {
        display: flex;
        flex-direction: column;
      }

      :host .chefs-mode-ingredients {
        grid-column: span 2;
      }

      :host .chefs-mode-steps {
        grid-column: span 3;
      }

      :host .chefs-mode-ingredients h2,
      :host .chefs-mode-steps h2 {
        font-size: 13px;
        letter-spacing: 0.2em;
        font-weight: 400;
        text-transform: uppercase;
        margin: 0 0 10px;
        color: rgba(255, 255, 255, 0.7);
      }

      :host .chefs-mode-ingredients ul,
      :host .chefs-mode-steps ol {
        list-style: none;
        margin: 0;
        padding: 0;
        font-size: 18px;
        line-height: 1.5;
        overflow: auto;
        scrollbar-width: thin;
        max-height: 100%;
      }

      :host .chefs-mode-steps ol {
        counter-reset: step-counter;
      }

      :host .chefs-mode-ingredients li {
        padding: 4px 0;
      }

      :host .chefs-mode-steps li {
        counter-increment: step-counter;
        padding: 4px 0 4px 36px;
        position: relative;
      }

      :host .chefs-mode-steps li::before {
        content: counter(step-counter) ".";
        position: absolute;
        left: 0;
        top: 4px;
        width: 32px;
        text-align: right;
        margin-right: 8px;
        font-size: 18px;
        color: #f5f5f5;
        font-weight: 600;
      }

      :host .chefs-mode-ingredient {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        cursor: pointer;
        position: relative;
      }

      :host .chefs-mode-ingredient input[type="checkbox"] {
        position: absolute;
        left: 0;
        top: 2px;
        width: 24px;
        height: 24px;
        margin: 0;
        opacity: 0;
        cursor: pointer;
      }

      :host .chefs-mode-checkbox-icon {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid #e3e3e3;
        background: transparent;
        margin-top: 2px;
        flex-shrink: 0;
        box-sizing: border-box;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }

      :host .chefs-mode-ingredient input[type="checkbox"]:checked + .chefs-mode-checkbox-icon {
        background: #ffffff;
        border-color: #ffffff;
      }

      :host .chefs-mode-checkbox-check {
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: #222222;
      }

      :host .chefs-mode-ingredient input[type="checkbox"]:checked + .chefs-mode-checkbox-icon .chefs-mode-checkbox-check {
        display: flex;
      }

      :host .chefs-mode-ingredient span:last-child {
        flex: 1;
      }

      :host .chefs-mode-empty {
        font-size: 14px;
        opacity: 0.65;
        margin-top: 8px;
      }

      @media (max-width: 900px) {
        :host .chefs-mode-main {
          grid-template-columns: minmax(0, 1fr);
          gap: 24px;
        }
      }

      @media (max-width: 800px) {
        :host .chefs-mode-shell {
          padding: 16px 10px 16px;
        }

        :host .chefs-mode-card {
          padding-inline: 8px;
        }

        :host .chefs-mode-hero-inner {
          max-height: 220px;
        }
      }
  `;

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message && message.type === "TOGGLE_CHEFS_MODE") {
      if (!chefsModeActive) {
        const recipe = extractRecipe();
        showOverlay(recipe);
        chefsModeActive = true;
        sendResponse({ status: "shown" });
      } else {
        removeOverlay();
        chefsModeActive = false;
        sendResponse({ status: "hidden" });
      }
    }
    // Keep the message channel open if we use async in the future
    return true;
  });

  function extractRecipe() {
    const fromSchema = trySchemaOrgRecipe();
    if (fromSchema) {
      fromSchema.title = toTitleCase(fromSchema.title || "Recipe");
      return fromSchema;
    }

    const ingredients = extractIngredientsFallback();
    const steps = extractStepsFallback();
    const image = findMainImageFallback();
    const rawTitle = document.querySelector("h1")?.innerText?.trim() || document.title || "Recipe";

    return {
      title: toTitleCase(rawTitle),
      ingredients,
      steps,
      image,
      meta: extractMetaFallback()
    };
  }

  function trySchemaOrgRecipe() {
    try {
      const scripts = Array.from(
        document.querySelectorAll('script[type="application/ld+json"]')
      );

      for (const script of scripts) {
        let json;
        try {
          json = JSON.parse(script.textContent || "{}");
        } catch {
          continue;
        }

        const candidates = Array.isArray(json) ? json : [json];
        for (const node of candidates) {
          if (!node) continue;
          const type = node["@type"] || node.type;

          if (
            type === "Recipe" ||
            (Array.isArray(type) && type.includes("Recipe"))
          ) {
            const title =
              node.name ||
              document.querySelector("h1")?.innerText?.trim() ||
              document.title ||
              "Recipe";

            let ingredients = [];
            if (Array.isArray(node.recipeIngredient)) {
              ingredients = node.recipeIngredient.map((i) =>
                typeof i === "string" ? i.trim() : ""
              ).filter(Boolean);
            }

            let steps = [];
            if (Array.isArray(node.recipeInstructions)) {
              for (const step of node.recipeInstructions) {
                if (typeof step === "string") {
                  steps.push(step.trim());
                } else if (step && typeof step === "object") {
                  if (typeof step.text === "string") {
                    steps.push(step.text.trim());
                  } else if (Array.isArray(step.itemListElement)) {
                    step.itemListElement.forEach((s) => {
                      if (typeof s === "string") {
                        steps.push(s.trim());
                      } else if (s && typeof s === "object" && typeof s.text === "string") {
                        steps.push(s.text.trim());
                      }
                    });
                  }
                }
              }
            } else if (typeof node.recipeInstructions === "string") {
              steps = node.recipeInstructions
                .split(/\r?\n+/)
                .map((s) => s.trim())
                .filter(Boolean);
            }

            let imageUrl = null;
            if (typeof node.image === "string") {
              imageUrl = node.image;
            } else if (Array.isArray(node.image) && node.image.length > 0) {
              imageUrl =
                typeof node.image[0] === "string"
                  ? node.image[0]
                  : node.image[0].url || null;
            } else if (node.image && typeof node.image === "object") {
              imageUrl = node.image.url || null;
            }

            const meta = extractMetaFromSchema(node);

            return {
              title,
              ingredients,
              steps,
              image: imageUrl,
              meta
            };
          }
        }
      }
    } catch {
      // Ignore schema extraction failures; we'll fall back to heuristics.
    }

    return null;
  }

  function extractIngredientsFallback() {
    const ingredients = new Set();

    // Common microdata / schema usage
    document
      .querySelectorAll("[itemprop='recipeIngredient'], [itemprop='ingredients']")
      .forEach((el) => {
        const text = el.innerText || el.textContent || "";
        if (text.trim()) ingredients.add(text.trim());
      });

    if (ingredients.size > 0) {
      return Array.from(ingredients);
    }

    // Heading-based heuristic: multiple languages
    const ingredientTerms = ["ingredients", "ingredientes", "ingredient", "ingrediente"];
    let heading = null;
    for (const term of ingredientTerms) {
      heading = findHeadingLike(term);
      if (heading) break;
    }
    if (heading) {
      collectIngredientsFromHeading(heading, ingredients);
    }

    // Class-based fallback for ingredients
    if (ingredients.size === 0) {
      const ingSelectors = [
        "[class*='ingredient'] li",
        "[class*='ingrediente'] li",
        ".recipe-ingredients li",
        "[data-testid*='ingredient'] li"
      ];
      for (const sel of ingSelectors) {
        try {
          document.querySelectorAll(sel).forEach((el) => {
            const text = (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim();
            if (text.length > 2) ingredients.add(text);
          });
          if (ingredients.size > 0) break;
        } catch (_) {}
      }
    }

    // Last resort: longest ul in main content (ingredients are often in ul, steps in ol)
    if (ingredients.size === 0) {
      const main = document.querySelector("main, [role='main'], article, .content, #content");
      const root = main || document.body;
      const uls = root.querySelectorAll("ul");
      let best = [];
      for (const ul of uls) {
        if (ul.closest("nav, footer, header, [role='navigation']")) continue;
        const items = Array.from(ul.querySelectorAll(":scope > li"))
          .map((li) => (li.innerText || li.textContent || "").replace(/\s+/g, " ").trim())
          .filter((t) => t.length > 3 && t.length < 300);
        if (items.length >= 2 && items.length > best.length) best = items;
      }
      best.forEach((t) => ingredients.add(t));
    }

    return Array.from(ingredients);
  }

  function collectIngredientsFromHeading(heading, ingredients) {
    let cur = heading.nextElementSibling;
    let seen = 0;
    while (cur && seen < 15) {
      if (cur.matches("ul, ol")) {
        cur.querySelectorAll("li").forEach((li) => {
          const text = (li.innerText || li.textContent || "").replace(/\s+/g, " ").trim();
          if (text) ingredients.add(text);
        });
        return;
      }
      const list = cur.querySelector("ul, ol");
      if (list) {
        list.querySelectorAll("li").forEach((li) => {
          const text = (li.innerText || li.textContent || "").replace(/\s+/g, " ").trim();
          if (text) ingredients.add(text);
        });
        return;
      }
      cur = cur.nextElementSibling;
      seen++;
    }
    // No list in next siblings: look in same section/container (prefer ul for ingredients)
    const container = heading.closest("section, article, div[class]");
    if (container) {
      const list = container.querySelector("ul") || container.querySelector("ol");
      if (list && !list.contains(heading)) {
        list.querySelectorAll("li").forEach((li) => {
          const text = (li.innerText || li.textContent || "").replace(/\s+/g, " ").trim();
          if (text.length > 2) ingredients.add(text);
        });
      }
    }
  }

  function extractStepsFallback() {
    const steps = new Set();

    // Common microdata / schema usage
    document
      .querySelectorAll(
        "[itemprop='recipeInstructions'] li, [itemprop='recipeInstructions'] p"
      )
      .forEach((el) => {
        const text = el.innerText || el.textContent || "";
        const cleaned = text.replace(/\s+/g, " ").trim();
        if (cleaned) steps.add(cleaned);
      });

    if (steps.size === 0) {
      // If container is just [itemprop='recipeInstructions'], split its content
      const container = document.querySelector("[itemprop='recipeInstructions']");
      if (container) {
        const text = container.innerText || container.textContent || "";
        text
          .split(/\r?\n+/)
          .map((t) => t.replace(/\s+/g, " ").trim())
          .filter(Boolean)
          .forEach((line) => steps.add(line));
      }
    }

    if (steps.size === 0) {
      // Heading-based heuristic: multiple languages and labels
      const stepHeadingTerms = [
        "instructions",
        "directions",
        "method",
        "steps",
        "procedure",
        "preparo",
        "preparação",
        "modo de preparo",
        "modo de preparação",
        "como fazer",
        "instruções",
        "pasos",
        "preparación",
        "procedimiento",
        "como preparar",
        "preparation"
      ];
      let heading = null;
      for (const term of stepHeadingTerms) {
        heading = findHeadingLike(term);
        if (heading) break;
      }

      if (heading) {
        collectStepsFromHeading(heading, steps);
      }
    }

    // Fallback: look for common recipe-step containers by class/id
    if (steps.size === 0) {
      const stepSelectors = [
        "[class*='instruction'] ol li, [class*='instruction'] ul li",
        "[class*='instruction'] p",
        "[class*='step'] ol li, [class*='step'] ul li",
        "[class*='preparo'] ol li, [class*='preparo'] ul li, [class*='preparação'] ol li, [class*='preparação'] ul li",
        "[class*='directions'] ol li, [class*='directions'] ul li",
        "[class*='method'] ol li, [class*='method'] ul li",
        "[class*='pasos'] ol li, [class*='pasos'] ul li",
        ".recipe-steps li",
        ".recipe-instructions li",
        "[data-testid*='instruction'] li"
      ];
      for (const sel of stepSelectors) {
        try {
          document.querySelectorAll(sel).forEach((el) => {
            const text = (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim();
            if (text && text.length > 15) steps.add(text);
          });
          if (steps.size > 0) break;
        } catch (_) {}
      }
    }

    // Fallback: numbered lines in a block (e.g. "1. Do this.\n2. Do that.")
    if (steps.size === 0) {
      const blocks = document.querySelectorAll("p, div[class*='content'], div[class*='recipe'], div[class*='step'], section, article");
      for (const block of blocks) {
        const text = (block.innerText || block.textContent || "").trim();
        if (!text || text.length < 80) continue;
        const parts = text.split(/\n\s*\d+[.)]\s+/).filter((p) => p.trim().length > 15);
        if (parts.length >= 2) {
          parts.forEach((p) => {
            const cleaned = p.replace(/\s+/g, " ").trim().replace(/^\d+[.)]\s*/, "");
            if (cleaned.length > 20) steps.add(cleaned);
          });
          if (steps.size >= 2) break;
        }
      }
    }

    // Last resort: longest ordered list on the page (steps are often in an ol)
    if (steps.size === 0) {
      const lists = document.querySelectorAll("ol");
      let best = [];
      for (const ol of lists) {
        const items = Array.from(ol.querySelectorAll(":scope > li"))
          .map((li) => (li.innerText || li.textContent || "").replace(/\s+/g, " ").trim())
          .filter((t) => t.length > 20);
        if (items.length > best.length && items.length >= 2) best = items;
      }
      best.forEach((t) => steps.add(t));
    }

    return Array.from(steps);
  }

  function collectStepsFromHeading(heading, steps) {
    let cur = heading.nextElementSibling;
    const maxSiblings = 20;
    let seen = 0;

    while (cur && seen < maxSiblings) {
      if (cur.matches("ol, ul")) {
        cur.querySelectorAll("li").forEach((li) => {
          const text = (li.innerText || li.textContent || "").replace(/\s+/g, " ").trim();
          if (text) steps.add(text);
        });
        if (steps.size > 0) return;
      }
      // Wrapper div/section: look for first ol/ul inside
      const list = cur.querySelector("ol, ul");
      if (list) {
        list.querySelectorAll("li").forEach((li) => {
          const text = (li.innerText || li.textContent || "").replace(/\s+/g, " ").trim();
          if (text) steps.add(text);
        });
        if (steps.size > 0) return;
      }
      // Collect paragraphs if they look like steps
      if (cur.matches("p")) {
        const text = (cur.innerText || cur.textContent || "").replace(/\s+/g, " ").trim();
        if (text.length > 15) steps.add(text);
      }
      cur = cur.nextElementSibling;
      seen++;
    }

    // Same section: find any list after this heading (e.g. Panelinha structure)
    const container = heading.closest("section, article, div[class]");
    if (container && steps.size === 0) {
      const lists = container.querySelectorAll("ol, ul");
      let bestList = null;
      let bestCount = 0;
      const headingPos = heading.getBoundingClientRect().top;
      for (const list of lists) {
        if (list.contains(heading)) continue;
        const rect = list.getBoundingClientRect();
        if (rect.top < headingPos - 50) continue;
        const items = list.querySelectorAll(":scope > li");
        const valid = Array.from(items).filter((li) => {
          const t = (li.innerText || li.textContent || "").trim();
          return t.length > 15;
        });
        if (valid.length > bestCount && valid.length >= 2) {
          bestCount = valid.length;
          bestList = list;
        }
      }
      if (bestList) {
        bestList.querySelectorAll(":scope > li").forEach((li) => {
          const text = (li.innerText || li.textContent || "").replace(/\s+/g, " ").trim();
          if (text) steps.add(text);
        });
      }
    }
  }

  function findHeadingLike(term) {
    const lowerTerm = term.toLowerCase();
    const headings = Array.from(
      document.querySelectorAll("h1, h2, h3, h4, h5, h6, strong, .section-title, .heading, [class*='title'], [class*='heading']")
    );

    return (
      headings.find((h) => {
        const text = (h.innerText || h.textContent || "").toLowerCase().trim();
        return text === lowerTerm || text.includes(lowerTerm);
      }) || null
    );
  }

  function findMainImageFallback() {
    // Prefer explicitly marked recipe images
    const explicit = document.querySelector(
      "[itemprop='image'] img, [itemprop='image'], .recipe-image img, .recipe-hero img"
    );
    if (explicit && explicit instanceof HTMLImageElement && explicit.src) {
      return explicit.src;
    }
    if (explicit && !(explicit instanceof HTMLImageElement)) {
      const bg = getComputedStyle(explicit).backgroundImage;
      const match = bg && bg.match(/url\(["']?(.*?)["']?\)/);
      if (match && match[1]) return match[1];
    }

    // Heuristic: biggest image near top of page
    const images = Array.from(document.images || []);
    let best = null;
    let bestScore = 0;

    for (const img of images) {
      if (!img.src) continue;
      const rect = img.getBoundingClientRect();
      const area = rect.width * rect.height;
      if (area < 10_000) continue; // skip tiny images/icons

      const topWeight = Math.max(0, 1 - rect.top / window.innerHeight);
      const score = area * (0.5 + topWeight);
      if (score > bestScore) {
        bestScore = score;
        best = img;
      }
    }

    return best?.src || null;
  }

  function showOverlay(recipe) {
    removeOverlay();

    const root = document.createElement("div");
    root.id = OVERLAY_ID;
    root.setAttribute("aria-label", "Chef's Mode");
    root.setAttribute("role", "dialog");

    const shadow = root.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = CHEFS_MODE_STYLES;
    shadow.appendChild(style);

    const meta = recipe.meta || {};

    const innerHTML = `
      <div class="chefs-mode-backdrop"></div>
      <div class="chefs-mode-shell">
        <div class="chefs-mode-card">
          ${
            recipe.image
              ? `<div class="chefs-mode-hero">
                  <div class="chefs-mode-hero-inner">
                    <img src="${encodeURI(recipe.image)}" alt="Recipe image" />
                  </div>
                </div>`
              : ""
          }
          <header class="chefs-mode-header">
            <div class="chefs-mode-title-block">
              <h1 class="chefs-mode-title">${safeText(recipe.title || "Recipe")}</h1>
              ${
                meta && (meta.servings || meta.prepTime || meta.cookTime || meta.totalTime)
                  ? `<div class="chefs-mode-meta">
                      ${
                        meta.servings
                          ? `<div class="chefs-mode-meta-item">
                               <span class="chefs-mode-meta-label">Serves</span>
                               <span class="chefs-mode-meta-value">${safeText(meta.servings)}</span>
                             </div>`
                          : ""
                      }
                      ${
                        meta.prepTime
                          ? `<div class="chefs-mode-meta-item">
                               <span class="chefs-mode-meta-label">Prep</span>
                               <span class="chefs-mode-meta-value">${safeText(meta.prepTime)}</span>
                             </div>`
                          : ""
                      }
                      ${
                        meta.cookTime
                          ? `<div class="chefs-mode-meta-item">
                               <span class="chefs-mode-meta-label">Cook</span>
                               <span class="chefs-mode-meta-value">${safeText(meta.cookTime)}</span>
                             </div>`
                          : ""
                      }
                      ${
                        meta.totalTime
                          ? `<div class="chefs-mode-meta-item">
                               <span class="chefs-mode-meta-label">Total</span>
                               <span class="chefs-mode-meta-value">${safeText(meta.totalTime)}</span>
                             </div>`
                          : ""
                      }
                    </div>`
                  : ""
              }
            </div>
            <button class="chefs-mode-close" aria-label="Close Chef's Mode"><span class="chefs-mode-close-icon" aria-hidden="true">×</span></button>
          </header>
          <main class="chefs-mode-main">
            <section class="chefs-mode-ingredients">
              <h2>INGREDIENTS</h2>
              ${
                recipe.ingredients && recipe.ingredients.length
                  ? `<ul>${recipe.ingredients
                      .map(
                        (i) =>
                          `<li><label class="chefs-mode-ingredient"><input type="checkbox" /><span class="chefs-mode-checkbox-icon" aria-hidden="true"><span class="chefs-mode-checkbox-check">✓</span></span><span>${safeText(
                            i
                          )}</span></label></li>`
                      )
                      .join("")}</ul>`
                  : `<div class="chefs-mode-empty">No ingredients detected.</div>`
              }
            </section>
            <section class="chefs-mode-steps">
              <h2>METHOD</h2>
              ${
                recipe.steps && recipe.steps.length
                  ? `<ol>${recipe.steps
                      .map((s) => `<li>${safeText(s)}</li>`)
                      .join("")}</ol>`
                  : `<div class="chefs-mode-empty">No steps detected.</div>`
              }
            </section>
          </main>
        </div>
      </div>
    `;

    const temp = document.createElement("div");
    temp.innerHTML = innerHTML;
    while (temp.firstChild) {
      shadow.appendChild(temp.firstChild);
    }

    // Lock background scroll
    previousHtmlOverflow = document.documentElement.style.overflow;
    previousBodyOverflow = document.body ? document.body.style.overflow : "";
    document.documentElement.style.overflow = "hidden";
    if (document.body) {
      document.body.style.overflow = "hidden";
    }

    document.documentElement.appendChild(root);

    const close = shadow.querySelector(".chefs-mode-close");
    if (close) {
      close.addEventListener("click", () => {
        removeOverlay();
        chefsModeActive = false;
      });
    }

    const onKey = (event) => {
      if (event.key === "Escape") {
        removeOverlay();
        chefsModeActive = false;
        document.removeEventListener("keydown", onKey, true);
      }
    };
    document.addEventListener("keydown", onKey, true);

    shadow.addEventListener("click", (event) => {
      if (event.target.classList.contains("chefs-mode-backdrop")) {
        removeOverlay();
        chefsModeActive = false;
      }
    });
  }

  function removeOverlay() {
    const root = document.getElementById(OVERLAY_ID);
    if (root && root.parentElement) {
      root.parentElement.removeChild(root);
    }

    // Restore background scroll
    document.documentElement.style.overflow = previousHtmlOverflow;
    if (document.body) {
      document.body.style.overflow = previousBodyOverflow;
    }
  }

  function toTitleCase(str) {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(/\s+/)
      .map((word) => {
        if (!word) return "";
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  function extractMetaFromSchema(node) {
    const meta = {};

    if (node.recipeYield) {
      if (Array.isArray(node.recipeYield)) {
        meta.servings = String(node.recipeYield[0]);
      } else {
        meta.servings = String(node.recipeYield);
      }
    }

    if (node.prepTime) {
      meta.prepTime = formatDuration(node.prepTime);
    }
    if (node.cookTime) {
      meta.cookTime = formatDuration(node.cookTime);
    }
    if (node.totalTime) {
      meta.totalTime = formatDuration(node.totalTime);
    }

    return meta;
  }

  function extractMetaFallback() {
    const meta = {};

    const servingsEl =
      document.querySelector("[itemprop='recipeYield']") ||
      document.querySelector("[itemprop='yield']");
    if (servingsEl) {
      const text = servingsEl.innerText || servingsEl.textContent || "";
      if (text.trim()) meta.servings = text.trim();
    }

    const prepEl = document.querySelector("[itemprop='prepTime']");
    if (prepEl && prepEl.getAttribute("content")) {
      meta.prepTime = formatDuration(prepEl.getAttribute("content"));
    }

    const cookEl = document.querySelector("[itemprop='cookTime']");
    if (cookEl && cookEl.getAttribute("content")) {
      meta.cookTime = formatDuration(cookEl.getAttribute("content"));
    }

    const totalEl = document.querySelector("[itemprop='totalTime']");
    if (totalEl && totalEl.getAttribute("content")) {
      meta.totalTime = formatDuration(totalEl.getAttribute("content"));
    }

    return meta;
  }

  function formatDuration(value) {
    if (!value) return "";
    // Handle ISO8601 duration like PT1H30M
    const isoMatch = String(value).match(/^P(T.*)$/i) || String(value).match(/^PT/i);
    if (isoMatch) {
      const hoursMatch = String(value).match(/(\d+)\s*H/i);
      const minsMatch = String(value).match(/(\d+)\s*M/i);
      const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
      const mins = minsMatch ? parseInt(minsMatch[1], 10) : 0;
      const parts = [];
      if (hours) parts.push(`${hours} hr${hours > 1 ? "s" : ""}`);
      if (mins) parts.push(`${mins} min`);
      if (parts.length) return parts.join(" ");
    }
    return String(value);
  }
  function decodeHtmlEntities(str) {
    if (!str || typeof str !== "string") return str;
    const div = document.createElement("div");
    let decoded = str;
    let prev;
    let iterations = 0;
    const maxIterations = 5;
    do {
      prev = decoded;
      div.innerHTML = decoded
        .replace(/</g, "\uFFFC")
        .replace(/>/g, "\uFFFD");
      decoded = (div.textContent || div.innerText || "")
        .replace(/\uFFFC/g, "<")
        .replace(/\uFFFD/g, ">");
      iterations++;
    } while (decoded !== prev && iterations < maxIterations);
    return decoded;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function safeText(str) {
    return escapeHtml(decodeHtmlEntities(str));
  }
})();

