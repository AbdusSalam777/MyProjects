import { useEffect } from "react";

/**
 * Sets the document title and meta description for a page.
 *
 * Replaces react-helmet, which is unmaintained and doesn't support React 19.
 * For a client-rendered site this is all that's needed — crawlers that matter
 * execute JS, and the static tags in index.html cover the rest.
 */
export default function usePageMeta(title, description) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;

    let meta = null;
    let previousDescription = null;

    if (description) {
      meta = document.querySelector('meta[name="description"]');
      if (meta) {
        previousDescription = meta.getAttribute("content");
        meta.setAttribute("content", description);
      }
    }

    return () => {
      document.title = previous;
      if (meta && previousDescription !== null) {
        meta.setAttribute("content", previousDescription);
      }
    };
  }, [title, description]);
}
