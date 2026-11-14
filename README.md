# SP නිෂ්පාදන

A responsive static storefront for traditional Sri Lankan sweets. Product data is loaded from `data/products.json`; product images are expected under `assets/images/products/`. The image files are not in this workspace yet, so the storefront displays designed fallbacks until they are added.

## Run locally

Serve the project directory over HTTP so the browser can load the JSON module and product catalogue:

```powershell
python -m http.server 8000
```

Open <http://localhost:8000>. The product cards show a styled fallback until their image files are added.

## Cloudflare Pages deployment

1. Add the product image files listed in `data/products.json` to `assets/images/products/` and optionally add `assets/images/hero/hero-banner.jpg`.
2. Push this project to a GitHub or GitLab repository.
3. In Cloudflare, open **Workers & Pages → Create → Pages → Connect to Git** and select the repository.
4. Choose the production branch. Leave the build command empty and set the build output directory to `.` (the project root).
5. Save and deploy. Cloudflare Pages will publish `index.html` and the static asset folders.

There is no build step or package installation required.
