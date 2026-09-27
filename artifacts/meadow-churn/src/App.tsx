import { useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleDot,
  Leaf,
  Menu,
  Milk,
  MoveDown,
  PackageCheck,
  ShieldCheck,
  Sprout,
  Star,
  X,
} from 'lucide-react';
import { useLocalization, type SupportedLocale } from '@/js/localization';

type ProductKey = 'milk' | 'cheese' | 'yogurt' | 'ghee';
type FormState = {
  name: string;
  email: string;
  phone: string;
  product: ProductKey | '';
  quantity: string;
  message: string;
};

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  product: '',
  quantity: '',
  message: '',
};

const products: Array<{ key: ProductKey; icon: typeof Milk; accent: string }> = [
  { key: 'milk', icon: Milk, accent: 'product-card--cream' },
  { key: 'cheese', icon: CircleDot, accent: 'product-card--clay' },
  { key: 'yogurt', icon: Sprout, accent: 'product-card--sage' },
  { key: 'ghee', icon: Star, accent: 'product-card--gold' },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function BrandMark({ t }: { t: (key: string) => string }) {
  return (
    <a href="#top" className="brand-mark" data-testid="link-brand" data-i18n-attr={`aria-label:brand.markLabel`}>
      <span className="brand-mark__stamp" aria-hidden="true"><Leaf size={18} strokeWidth={1.7} /></span>
      <span className="brand-mark__word">
        <span data-i18n="brand.name">{t('brand.name')}</span>
        <small data-i18n="brand.tagline">{t('brand.tagline')}</small>
      </span>
    </a>
  );
}

function App() {
  const { locale, t, switchLocale } = useLocalization();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const setField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    (['name', 'email', 'phone', 'product'] as const).forEach((field) => {
      if (!form[field].trim()) nextErrors[field] = t('contact.required');
    });
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = t('contact.emailError');
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  };

  const localeButton = (next: SupportedLocale, labelKey: string) => (
    <button
      type="button"
      className={`locale-switch__option ${locale === next ? 'is-active' : ''}`}
      onClick={() => switchLocale(next)}
      data-testid={`button-language-${next}`}
      aria-pressed={locale === next}
    >
      <span data-i18n={labelKey}>{t(labelKey)}</span>
    </button>
  );

  return (
    <div id="top" className="site-shell">
      <header className="site-header">
        <div className="site-header__inner page-wrap">
          <BrandMark t={t} />
          <nav className={`main-nav ${mobileOpen ? 'is-open' : ''}`} data-i18n-attr="aria-label:nav.primaryLabel">
            <a href="#story" onClick={() => setMobileOpen(false)} data-testid="link-story">
              <span data-i18n="nav.story">{t('nav.story')}</span>
            </a>
            <a href="#products" onClick={() => setMobileOpen(false)} data-testid="link-products">
              <span data-i18n="nav.products">{t('nav.products')}</span>
            </a>
            <a href="#practice" onClick={() => setMobileOpen(false)} data-testid="link-practice">
              <span data-i18n="nav.practice">{t('nav.practice')}</span>
            </a>
            <a href="#contact" onClick={() => setMobileOpen(false)} className="main-nav__cta" data-testid="link-contact">
              <span data-i18n="nav.contact">{t('nav.contact')}</span><ArrowUpRight size={15} />
            </a>
          </nav>
          <div className="header-actions">
            <div className="locale-switch" role="group" data-i18n-attr={`aria-label:nav.languageLabel`}>
              {localeButton('en', 'nav.english')}
              {localeButton('ur', 'nav.urdu')}
            </div>
            <button
              type="button"
              className="mobile-menu-button"
              onClick={() => setMobileOpen((open) => !open)}
              data-testid="button-mobile-menu"
              data-i18n-attr={`aria-label:${mobileOpen ? 'nav.closeLabel' : 'nav.menuLabel'}`}
            >
              {mobileOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-section__wash" aria-hidden="true" />
          <div className="page-wrap hero-grid">
            <div className="hero-copy reveal-up">
              <div className="eyebrow"><span className="eyebrow__dot" /><span data-i18n="hero.eyebrow">{t('hero.eyebrow')}</span></div>
              <h1 data-i18n="hero.title">{t('hero.title')}</h1>
              <p className="hero-copy__body" data-i18n="hero.body">{t('hero.body')}</p>
              <div className="hero-actions">
                <button type="button" className="button button--dark" onClick={() => scrollToSection('products')} data-testid="button-shop">
                  <span data-i18n="hero.primary">{t('hero.primary')}</span><ArrowDownRight size={17} />
                </button>
                <button type="button" className="text-link" onClick={() => scrollToSection('story')} data-testid="button-story">
                  <span data-i18n="hero.secondary">{t('hero.secondary')}</span><ChevronRight size={16} />
                </button>
              </div>
              <div className="hero-note">
                <span className="hero-note__line" />
                <span data-i18n="hero.note">{t('hero.note')}</span>
              </div>
            </div>
            <div className="hero-art reveal-up reveal-delay" data-i18n-attr="aria-label:hero.artLabel">
              <div className="hero-art__halo" />
              <div className="hero-art__sun" />
              <div className="hero-art__hill hero-art__hill--far" />
              <div className="hero-art__hill hero-art__hill--near" />
              <div className="hero-art__bottle">
                <div className="hero-art__bottle-cap" />
              <div className="hero-art__bottle-label"><span data-i18n="story.mark">{t('story.mark')}</span><small data-i18n="hero.badge">{t('hero.badge')}</small></div>
              </div>
              <div className="hero-art__flower hero-art__flower--one"><Leaf size={31} /></div>
              <div className="hero-art__flower hero-art__flower--two"><Leaf size={22} /></div>
              <span className="hero-art__badge" data-i18n="hero.badge">{t('hero.badge')}</span>
            </div>
          </div>
        </section>

        <section id="story" className="story-section section-pad">
          <div className="page-wrap story-grid">
            <div className="story-aside">
              <div className="section-index">01 <span /></div>
            <div className="story-aside__seal"><Leaf size={20} /><span data-i18n="story.since">{t('story.since')}</span><strong data-i18n="story.year">{t('story.year')}</strong></div>
            </div>
            <div className="story-copy">
              <div className="eyebrow"><span className="eyebrow__dot" /><span data-i18n="story.eyebrow">{t('story.eyebrow')}</span></div>
              <h2 data-i18n="story.title">{t('story.title')}</h2>
              <p className="lede" data-i18n="story.body">{t('story.body')}</p>
              <div className="story-details">
                {[1, 2, 3].map((item) => (
                  <article className="story-detail" key={item}>
                    <span className="story-detail__number">0{item}</span>
                    <div>
                      <h3 data-i18n={`story.detail${item}Title`}>{t(`story.detail${item}Title`)}</h3>
                      <p data-i18n={`story.detail${item}Body`}>{t(`story.detail${item}Body`)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <blockquote className="story-quote">
              <span className="story-quote__mark">“</span>
              <p data-i18n="story.pullQuote">{t('story.pullQuote')}</p>
              <span className="story-quote__rule" />
            </blockquote>
          </div>
        </section>

        <section id="products" className="products-section section-pad">
          <div className="page-wrap">
            <div className="section-heading section-heading--split">
              <div>
                <div className="section-index">02 <span /></div>
                <div className="eyebrow"><span className="eyebrow__dot" /><span data-i18n="products.eyebrow">{t('products.eyebrow')}</span></div>
                <h2 data-i18n="products.title">{t('products.title')}</h2>
              </div>
              <p data-i18n="products.body">{t('products.body')}</p>
            </div>
            <div className="product-grid">
              {products.map(({ key, icon: Icon, accent }, index) => (
                <article className={`product-card ${accent}`} key={key} data-testid={`card-product-${key}`}>
                  <div className="product-card__top">
                    <span className="product-card__tag" data-i18n={`products.${key}.tag`}>{t(`products.${key}.tag`)}</span>
                    <span className="product-card__index">0{index + 1}</span>
                  </div>
                  <div className="product-card__visual"><Icon size={72} strokeWidth={1.1} /><span className="product-card__grain" /></div>
                  <div className="product-card__content">
                    <h3 data-i18n={`products.${key}.name`}>{t(`products.${key}.name`)}</h3>
                    <p data-i18n={`products.${key}.description`}>{t(`products.${key}.description`)}</p>
                    <div className="product-card__meta">
                      <span data-i18n={`products.${key}.size`}>{t(`products.${key}.size`)}</span>
                      <strong data-i18n={`products.${key}.price`}>{t(`products.${key}.price`)}</strong>
                    </div>
                    <button
                      type="button"
                      className="product-card__button"
                      onClick={() => { setField('product', key); scrollToSection('contact'); }}
                      data-testid={`button-order-${key}`}
                    >
                      <span data-i18n="products.order">{t('products.order')}</span><ArrowUpRight size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <button type="button" className="shelf-link" onClick={() => scrollToSection('contact')} data-testid="button-full-shelf">
              <span data-i18n="products.viewAll">{t('products.viewAll')}</span><ArrowUpRight size={17} />
            </button>
          </div>
        </section>

        <section id="practice" className="practice-section section-pad">
          <div className="page-wrap practice-grid">
            <div className="practice-art" aria-hidden="true">
              <div className="practice-art__oval"><div className="practice-art__moon" /><div className="practice-art__field practice-art__field--one" /><div className="practice-art__field practice-art__field--two" /><span className="practice-art__stem"><Leaf size={38} /></span></div>
            </div>
            <div className="practice-copy">
              <div className="section-index">03 <span /></div>
              <div className="eyebrow"><span className="eyebrow__dot" /><span data-i18n="practice.eyebrow">{t('practice.eyebrow')}</span></div>
              <h2 data-i18n="practice.title">{t('practice.title')}</h2>
              <p className="lede" data-i18n="practice.body">{t('practice.body')}</p>
              <div className="practice-stats">
                {[1, 2, 3].map((item) => (
                  <div className="practice-stat" key={item}>
                    <strong data-i18n={`practice.stat${item}`}>{t(`practice.stat${item}`)}</strong>
                    <span data-i18n={`practice.stat${item}Label`}>{t(`practice.stat${item}Label`)}</span>
                  </div>
                ))}
              </div>
              <ul className="practice-list">
                {[1, 2, 3].map((item) => <li key={item}><Check size={16} /><span data-i18n={`practice.list${item}`}>{t(`practice.list${item}`)}</span></li>)}
              </ul>
              <button type="button" className="text-link" onClick={() => scrollToSection('contact')} data-testid="button-sourcing">
                <span data-i18n="practice.link">{t('practice.link')}</span><ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <section className="testimonials-section section-pad">
          <div className="page-wrap">
            <div className="section-heading section-heading--center">
              <div className="eyebrow"><span className="eyebrow__dot" /><span data-i18n="testimonials.eyebrow">{t('testimonials.eyebrow')}</span></div>
              <h2 data-i18n="testimonials.title">{t('testimonials.title')}</h2>
            </div>
            <div className="testimonial-grid">
              {[1, 2, 3].map((item) => (
                <blockquote className="testimonial-card" key={item}>
                  <div className="testimonial-card__stars" aria-hidden="true"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                  <p data-i18n={`testimonials.quote${item}`}>{t(`testimonials.quote${item}`)}</p>
                  <footer><strong data-i18n={`testimonials.name${item}`}>{t(`testimonials.name${item}`)}</strong><span data-i18n={`testimonials.role${item}`}>{t(`testimonials.role${item}`)}</span></footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section section-pad">
          <div className="page-wrap contact-grid">
            <div className="contact-intro">
              <div className="section-index">04 <span /></div>
              <div className="eyebrow"><span className="eyebrow__dot" /><span data-i18n="contact.eyebrow">{t('contact.eyebrow')}</span></div>
              <h2 data-i18n="contact.title">{t('contact.title')}</h2>
              <p className="lede" data-i18n="contact.body">{t('contact.body')}</p>
              <div className="contact-trust"><ShieldCheck size={18} /><span data-i18n="contact.finePrint">{t('contact.finePrint')}</span></div>
            </div>
            <div className="form-card">
              {!submitted ? (
                <form onSubmit={submitForm} noValidate>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="name" data-i18n="contact.nameLabel">{t('contact.nameLabel')}</label>
                      <input id="name" value={form.name} onChange={(event) => setField('name', event.target.value)} placeholder={t('contact.namePlaceholder')} data-i18n-attr="placeholder:contact.namePlaceholder" data-testid="input-name" aria-invalid={Boolean(errors.name)} />
                      {errors.name && <span className="field-error" data-i18n="contact.required">{errors.name}</span>}
                    </div>
                    <div className="form-field">
                      <label htmlFor="email" data-i18n="contact.emailLabel">{t('contact.emailLabel')}</label>
                      <input id="email" type="email" value={form.email} onChange={(event) => setField('email', event.target.value)} placeholder={t('contact.emailPlaceholder')} data-i18n-attr="placeholder:contact.emailPlaceholder" data-testid="input-email" aria-invalid={Boolean(errors.email)} />
                      {errors.email && <span className="field-error" data-i18n={errors.email === t('contact.emailError') ? 'contact.emailError' : 'contact.required'}>{errors.email}</span>}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="phone" data-i18n="contact.phoneLabel">{t('contact.phoneLabel')}</label>
                      <input id="phone" type="tel" value={form.phone} onChange={(event) => setField('phone', event.target.value)} placeholder={t('contact.phonePlaceholder')} data-i18n-attr="placeholder:contact.phonePlaceholder" data-testid="input-phone" aria-invalid={Boolean(errors.phone)} />
                      {errors.phone && <span className="field-error" data-i18n="contact.required">{errors.phone}</span>}
                    </div>
                    <div className="form-field">
                      <label htmlFor="product" data-i18n="contact.productLabel">{t('contact.productLabel')}</label>
                      <select id="product" value={form.product} onChange={(event) => setField('product', event.target.value)} data-testid="select-product" aria-invalid={Boolean(errors.product)}>
                        <option value="" data-i18n="contact.productPlaceholder">{t('contact.productPlaceholder')}</option>
                        {products.map(({ key }) => <option key={key} value={key} data-i18n={`contact.product${key[0].toUpperCase()}${key.slice(1)}`}>{t(`contact.product${key[0].toUpperCase()}${key.slice(1)}`)}</option>)}
                      </select>
                      {errors.product && <span className="field-error" data-i18n="contact.required">{errors.product}</span>}
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="quantity" data-i18n="contact.quantityLabel">{t('contact.quantityLabel')}</label>
                    <input id="quantity" value={form.quantity} onChange={(event) => setField('quantity', event.target.value)} placeholder={t('contact.quantityPlaceholder')} data-i18n-attr="placeholder:contact.quantityPlaceholder" data-testid="input-quantity" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="message" data-i18n="contact.messageLabel">{t('contact.messageLabel')}</label>
                    <textarea id="message" rows={3} value={form.message} onChange={(event) => setField('message', event.target.value)} placeholder={t('contact.messagePlaceholder')} data-i18n-attr="placeholder:contact.messagePlaceholder" data-testid="textarea-message" />
                  </div>
                  <button className="button button--dark button--full" type="submit" data-testid="button-submit">
                    <span data-i18n="contact.submit">{t('contact.submit')}</span><ArrowUpRight size={17} />
                  </button>
                  <p className="form-fine-print" data-i18n="contact.finePrint">{t('contact.finePrint')}</p>
                </form>
              ) : (
                <div className="success-state">
                  <div className="success-state__icon"><PackageCheck size={26} /></div>
                  <h3 data-i18n="contact.successTitle">{t('contact.successTitle')}</h3>
                  <p data-i18n="contact.successBody">{t('contact.successBody', { name: form.name, product: form.product ? t(`contact.product${form.product[0].toUpperCase()}${form.product.slice(1)}`) : '' })}</p>
                  <button type="button" className="text-link" onClick={() => { setSubmitted(false); setForm(initialForm); }} data-testid="button-new-request">
                    <span data-i18n="contact.newRequest">{t('contact.newRequest')}</span><MoveDown size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="connect-section section-pad">
          <div className="page-wrap connect-grid">
            <div className="connect-copy">
              <div className="section-index">05 <span /></div>
              <div className="eyebrow"><span className="eyebrow__dot" /><span data-i18n="connect.eyebrow">{t('connect.eyebrow')}</span></div>
              <h2 data-i18n="connect.title">{t('connect.title')}</h2>
              <p className="lede" data-i18n="connect.body">{t('connect.body')}</p>
            </div>
            <div className="connect-links">
              <a className="connect-link" href="mailto:daniyal7k6@gmail.com" data-testid="link-daniyal-email">
                <span className="connect-link__label" data-i18n="connect.emailLabel">{t('connect.emailLabel')}</span>
                <strong data-i18n="connect.email">{t('connect.email')}</strong>
                <ArrowUpRight size={17} />
              </a>
              <a className="connect-link" href="https://www.linkedin.com/in/daniyal--khalid" target="_blank" rel="noreferrer" data-testid="link-daniyal-linkedin">
                <span className="connect-link__label" data-i18n="connect.linkedinLabel">{t('connect.linkedinLabel')}</span>
                <strong data-i18n="connect.linkedin">{t('connect.linkedin')}</strong>
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-wrap site-footer__top">
          <BrandMark t={t} />
          <div className="footer-copy">
            <p data-i18n="footer.line">{t('footer.line')}</p>
            <span data-i18n="footer.location">{t('footer.location')}</span>
          </div>
          <div className="footer-links">
            <a href="mailto:hello@meadowandchurn.test" data-testid="link-email"><span data-i18n="footer.email">{t('footer.email')}</span></a>
            <a href="#top" data-testid="link-instagram"><span data-i18n="footer.instagram">{t('footer.instagram')}</span></a>
          </div>
        </div>
        <div className="page-wrap site-footer__bottom">
          <span data-i18n="footer.copyright">{t('footer.copyright')}</span>
          <span data-i18n="footer.hours">{t('footer.hours')}</span>
          <span data-i18n="footer.credit">{t('footer.credit')}</span>
        </div>
      </footer>
    </div>
  );
}

export default App;