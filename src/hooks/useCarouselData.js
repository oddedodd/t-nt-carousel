import { useEffect, useState } from "react";
import Papa from "papaparse";

export function useCarouselData() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = import.meta.env.VITE_SHEET_URL;

        if(!url) {
            setError(new Error('Google Sheet URL is not set'));
            setLoading(false);
            return;
        }

        Papa.parse(url, {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: (result) => {
              const mapped = result.data
                .map((row) => {
                  const normalized = Object.entries(row ?? {}).reduce(
                    (acc, [key, value]) => {
                      if (!key) return acc;
                      acc[key.trim().toLowerCase()] = typeof value === 'string' ? value.trim() : value;
                      return acc;
                    },
                    {}
                  );

                  if (import.meta.env.DEV) {
                    console.debug('Parsed sheet row', normalized);
                  }

                  return {
                    title: normalized.title ?? '',
                    text: normalized.text ?? normalized.description ?? '',
                    url: normalized.url ?? normalized.link ?? '',
                    image: normalized.image ?? normalized.imageurl ?? '',
                  };
                })
                .filter((item) => item.title);

              setItems(mapped);
              setLoading(false);
            },
            error: (err) => {
              console.error(err);
              setError('Kunne ikke hente data fra Google Sheets');
              setLoading(false);
            },
          });
        }, []);

    return { items, loading, error };
}