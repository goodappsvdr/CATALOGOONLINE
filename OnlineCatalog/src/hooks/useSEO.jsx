import { useEffect } from "react";

export function useSEO({ title, description, image }) {
  useEffect(() => {
    document.title = title;

    if (description) {
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", description);
      document
        .querySelector('meta[property="og:description"]')
        ?.setAttribute("content", description);
      document
        .querySelector('meta[name="twitter:description"]')
        ?.setAttribute("content", description);
    }
    if (image) {
      document
        .querySelector('meta[property="og:image"]')
        ?.setAttribute("content", image);
      document
        .querySelector('meta[name="twitter:image"]')
        ?.setAttribute("content", image);
    }
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", title);

    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute("content", title);

    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", window.location.href);
  }, [title, description, image]);
}
