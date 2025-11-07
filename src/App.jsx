import { useCarouselData } from './hooks/useCarouselData'
import './App.css'

function App() {
  const { items, loading, error } = useCarouselData();

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
        Top 100 Carousel Data Preview
      </h1>

      {loading && <p>Loading data from spreadsheet…</p>}
      {error && (
        <p style={{ color: 'crimson' }}>
          Error: {error.message ?? String(error)}
        </p>
      )}

      {!loading && !error && items.length === 0 && (
        <p>No rows found in the spreadsheet.</p>
      )}

      {!loading && items.length > 0 && (
        <section>
          <p>Loaded {items.length} rows. Showing the first 10 entries.</p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1rem',
              marginTop: '1rem',
            }}
          >
            {items.slice(0, 10).map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '1rem',
                  background: '#fafafa',
                }}
              >
                <h2 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                  {item.title}
                </h2>
                {item.text && (
                  <p style={{ marginBottom: '0.75rem', color: '#555' }}>
                    {item.text}
                  </p>
                )}
                <dl
                  style={{
                    display: 'grid',
                    rowGap: '0.25rem',
                    columnGap: '0.5rem',
                    gridTemplateColumns: 'auto 1fr',
                    fontSize: '0.875rem',
                  }}
                >
                  <dt style={{ fontWeight: 600 }}>URL</dt>
                  <dd>
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noreferrer">
                        {item.url}
                      </a>
                    ) : (
                      <span style={{ color: '#999' }}>—</span>
                    )}
                  </dd>

                  <dt style={{ fontWeight: 600 }}>Image</dt>
                  <dd>
                    {item.image ? (
                      <a href={item.image} target="_blank" rel="noreferrer">
                        {item.image}
                      </a>
                    ) : (
                      <span style={{ color: '#999' }}>—</span>
                    )}
                  </dd>
                </dl>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default App
