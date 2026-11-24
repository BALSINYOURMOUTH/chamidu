# SP නිෂ්පාදන

A responsive static storefront for traditional Sri Lankan sweets. Product data is loaded from `data/products.json`; product photos are stored under `assets/images/products/`. The hero banner is optional and falls back to a CSS illustration, including its plate, when it is unavailable. Noto Sans Sinhala is self-hosted under `assets/fonts/` and licensed under the SIL Open Font License.

## Run locally

Serve the project directory over HTTP so the browser can load the JSON module and product catalogue:

```powershell
python -m http.server 8000
```

Open <http://localhost:8000>. Product cards display their photos and use a styled fallback if an image cannot load.

## Ordering

Selecting a product opens a form that requires a whole-number quantity and delivery or pickup, and shows the calculated total as the quantity changes. The WhatsApp order includes the unit price and total. Delivery is limited to the areas around Kahawatha, Godakawela, and Palmadulla; customers are prompted to confirm their exact location and any delivery charges in WhatsApp. The site does not collect or store addresses.

WhatsApp and phone contact details are configured in `js/whatsapp.js`; links in the page are populated from that configuration.

## Cloudflare Pages deployment

1. Optionally add `assets/images/hero/hero-banner.jpg` for a photo in the hero section.
2. Push this project to a GitHub or GitLab repository.
3. In Cloudflare, open **Workers & Pages → Create → Pages → Connect to Git** and select the repository.
4. Choose the production branch. Leave the build command empty and set the build output directory to `.` (the project root).
5. Save and deploy. Cloudflare Pages will publish `index.html` and the static asset folders.

There is no build step or package installation required.
