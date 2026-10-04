# Birthday Website Assets Directory

This folder is organized for easy customization of all images, GIFs, and stickers:

* `src/assets/gifs/`: Place your custom Dudu / Chibi GIFs here (e.g. `mascot-happy.gif`, `mascot-hug.gif`).
* `src/assets/images/`: Place your personal photos and memories here.
* `src/assets/doodles/`: Custom SVG or PNG doodles.
* `src/assets/stickers/`: Custom sticker badges.

## How to use in `src/data/birthdayContent.js`

To use a custom GIF or photo, import it or reference its path:

```js
import myGif from '../assets/gifs/my-cute-dudu.gif';

export const LOCK_SCREEN_DATA = {
  // ...
  characterGif: myGif,
};
```
