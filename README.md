# FoEGBalt

[Cobalt](https://cobalt-org.github.io)-powered static website for FoEG.

## Usage

Ensure cobalt is installed. Clone this repo and run `cobalt serve`.

### Troubleshooting

If something seems off, interrupt `cobalt serve` with Ctrl+C, run `cobalt clean`
and try again.

## Editing data

### Adding new artists

Simply copy one of the md files in `src/artists/`. Artists will be added to the
lineup automatically based on the relevant event.

Artists can also be added with `cobalt new -f src/artists "Artist name"`, in which case
`src/_defaults/posts.md` is used as the template.

### Adding new pages

Run `cobalt new -f src/ "Page Title"` to add a new page or copy `index.liquid` to a new file.
Add a link to it in `src/_includes/header.liquid`.

### Event data

See `src/_data/events.yml`.

### Partner logos

See `src/_data/partners.yml` and `src/_includes/partners.liquid`.

## Layouts

Top-level pages use `src/_layouts/default.liquid` as their layout. Artist pages use `src/_layouts/artists.liquid`.

## Assets

See `src/assets/`.

### Styling

See `src/assets/css/style.scss`. Sass is automatically compiled by cobalt.
