/**
 * Pantalla de carga mostrada mientras se descargan las texturas.
 */
import { useT } from '../i18n'

export default function Loading() {
  const { t } = useT()
  return (
    <div id="loading">
      <div className="sk-chase">
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
      </div>
      <div>{t.loading}</div>
    </div>
  )
}
