/* In order to insert your styles into your Material UI components,
 you need to create a custom cache to override Emotion's default settings.*/

import createCache from "@emotion/cache";

export default function createEmotionCache() {
  return createCache({ key: "css", prepend: true });
}
