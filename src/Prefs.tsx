import { setLang, useLang, useT, type Lang } from './i18n'
import { setTheme, THEMES, useTheme } from './theme'

// Canto inferior esquerdo do Início: quadradinhos de cor e a escolha de língua.
export default function Prefs({ visible }: { visible: boolean }) {
  const lang = useLang()
  const T = useT()
  const theme = useTheme()
  return (
    <div className={`prefs${visible ? '' : ' is-hidden'}`} role="group" aria-label={T.prefsAria} inert={!visible || undefined}>
      <div className="prefs__swatches" role="radiogroup" aria-label={T.prefsColours}>
        {THEMES.map((x) => (
          <button
            key={x.id}
            type="button"
            role="radio"
            aria-checked={theme === x.id}
            aria-label={x[lang]}
            title={x[lang]}
            className={`prefs__swatch${theme === x.id ? ' is-on' : ''}`}
            style={{ ['--sw-bg' as string]: x.bg, ['--sw-ink' as string]: x.ink, ['--sw-accent' as string]: x.accent }}
            onClick={() => setTheme(x.id)}
          />
        ))}
      </div>
      <div className="prefs__lang" role="radiogroup" aria-label={T.prefsLang}>
        {(['pt', 'en'] as Lang[]).map((l) => (
          <button key={l} type="button" role="radio" aria-checked={lang === l} className={`prefs__lang-btn${lang === l ? ' is-on' : ''}`} onClick={() => setLang(l)} lang={l}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}
