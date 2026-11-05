# My Portfolio

Prasiddha Mainali’s cinematic, scroll-driven portfolio: AI, computer vision, research, practical engineering, and the people behind the work.

## The journey

A rainy workspace leads through a digital tunnel into Earth, projects, skills, experience, awards, education, and contact. The finale returns to the beginning. Three.js supplies the 3D scenes; image-space rain and coffee steam bring the opening photograph to life.

- Seven project chapters with individual animated borders
- Skills presented through an evolving AI world
- Nine experience chapters and a dimensional awards gallery
- Grade 12: St. Xavier’s College — 3.86 GPA
- Grade 10: Kadambari Academy — 3.84 GPA
- Email, LinkedIn, GitHub, and replay controls
- Pause-motion control and reduced-motion preference support

## Run locally

No package installation or build step is required. With Python installed:

```sh
python -m http.server 8080 --directory dist
```

Open http://localhost:8080. Serve through HTTP rather than opening index.html directly because the site uses JavaScript modules.

## Structure

- `dist/index.html`: entry document and metadata
- `dist/style.css`: responsive styling
- `dist/app.js`: opening journey and shared motion state
- `dist/workspace-weather.js`: window rain and coffee steam
- `dist/projects.js`: projects
- `dist/skills-journey.js`: journey coordination
- `dist/cinematic-world.js`: experience and awards 3D environment
- `dist/journey-finale.js`: education, contact, and replay
- `dist/assets/`: imagery, custom spiral identity, favicon exports, social preview
- `dist/vendor/`: locally served Three.js dependencies

## Deployment

Publish `dist/` as a static site. For Vercel, import this repository, choose Other as the framework, leave the build command empty, and set the output directory to `dist`. No environment variables are required.

GitHub stores the source; uploading a repository alone does not enable GitHub Pages or Vercel hosting.

## SEO and identity

Includes a custom spiral mark, SVG/ICO favicons, PNG icons, web manifest, description, social preview metadata, and Person structured data. Once the final public domain is chosen, set an absolute canonical URL, absolute social-image URLs, and a sitemap for that domain. The existing owner-private preview is not a public search destination.

## Content and attribution

Portfolio text and personal photographs belong to their respective owners. Reference artwork supplied for the portfolio must not be assumed to have an open-source license. Confirm redistribution permissions before making the repository public. Retain the bundled Three.js license. No blanket license is granted to these assets.

## Contact

- Email: prasiddha.mainali2@gmail.com
- LinkedIn: https://www.linkedin.com/in/prasiddha-mainali-105bb0352/
- GitHub: https://github.com/DeV-PrasiddhA
