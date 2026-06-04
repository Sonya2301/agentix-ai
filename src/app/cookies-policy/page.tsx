export default function CookiesPolicy() {
  return (
    <div style={{
      background: '#0a0a0f',
      minHeight: '100vh',
      padding: '80px 24px',
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        <a href="/" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#3b82f6',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: 48,
        }}>
          ← Back to AISOW
        </a>

        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 400,
          color: '#e8e8f0',
          marginBottom: 12,
          lineHeight: 1.1,
        }}>
          Cookies Policy
        </h1>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.1em',
          color: '#6b6b8a',
          textTransform: 'uppercase',
          marginBottom: 48,
        }}>
          Last updated: June 2026
        </p>

        {[
          {
            title: 'What Are Cookies',
            body: 'Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences and understand how you use it. We use cookies to improve your experience and to understand how visitors interact with our site.',
          },
          {
            title: 'Cookies We Use',
            body: 'We use the following types of cookies on this website:',
            list: [
              'Essential cookies — required for the site to function. These cannot be disabled.',
              'Analytics cookies — we use Google Analytics (GA4) to understand visitor behaviour, traffic sources, and how people interact with our content. This data is anonymous and aggregated.',
              'Preference cookies — we store your cookie consent choice so we do not ask you again on future visits.',
            ],
          },
          {
            title: 'Third-Party Cookies',
            body: 'We use Google Analytics provided by Google LLC. Google may use the data collected to contextualise and personalise ads on its own advertising network. You can opt out of Google Analytics tracking at any time by visiting: https://tools.google.com/dlpage/gaoptout',
          },
          {
            title: 'Your Choices',
            body: 'When you first visit our site, you are asked to accept or decline non-essential cookies. You can change your preference at any time by clearing your browser cookies and revisiting the site. If you decline, only essential cookies will be used and Google Analytics will not be loaded.',
          },
          {
            title: 'Data Retention',
            body: 'Your cookie consent preference is stored locally in your browser for the duration of your browsing session and subsequent visits. Google Analytics data is retained for 14 months by default.',
          },
          {
            title: 'Contact',
            body: 'If you have any questions about our use of cookies, please contact us at sona.masova23@gmail.com.',
          },
        ].map(({ title, body, list }) => (
          <div key={title} style={{ marginBottom: 40 }}>
            <h2 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 16,
              fontWeight: 600,
              color: '#e8e8f0',
              marginBottom: 12,
            }}>
              {title}
            </h2>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              color: '#9898b4',
              lineHeight: 1.75,
              margin: 0,
            }}>
              {body}
            </p>
            {list && (
              <ul style={{ marginTop: 12, paddingLeft: 0, listStyle: 'none' }}>
                {list.map(item => (
                  <li key={item} style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 14,
                    color: '#9898b4',
                    lineHeight: 1.75,
                    paddingLeft: 16,
                    marginBottom: 8,
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: '#3b82f6',
                    }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

      </div>
    </div>
  )
}
