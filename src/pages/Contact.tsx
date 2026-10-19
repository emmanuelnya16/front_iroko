import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, Calendar, CheckCircle2, Sparkles, Building } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/src/lib/utils';

export default function Contact() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'quote' | 'group'>('quote');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Quote form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventType: 'Séminaire / Conférence d\'entreprise',
    targetDate: '',
    guestCount: '',
    budget: '2 000 € à 5 000 €',
    needs: [] as string[],
    targetPole: 'IROKO Event',
    subject: '',
    message: ''
  });

  const toggleNeed = (need: string) => {
    setFormData(prev => ({
      ...prev,
      needs: prev.needs.includes(need)
        ? prev.needs.filter(n => n !== need)
        : [...prev.needs, need]
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="pt-24 min-h-screen bg-bg text-fg">
      {/* HEADER SECTION */}
      <section className="py-20 px-6 bg-gradient-to-b from-surface/40 via-bg to-bg relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-accent font-black uppercase tracking-[0.3em] text-xs mb-3 block">
              {t('contact.badge')}
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight mb-6 leading-none">
              Contactez <span className="font-cursive text-gradient-violet-orange normal-case lowercase font-normal text-4xl sm:text-6xl md:text-7xl">IROKO</span>
            </h1>
            <p className="text-fg-muted text-lg md:text-xl font-light leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FORM & COORDS SECTION */}
      <section className="py-12 px-6 bg-bg">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Form */}
          <div className="lg:col-span-8">
            <div className="bg-surface border border-line/12 p-8 md:p-12 rounded-2xl shadow-sm">
              {/* Tab Selector */}
              <div className="flex border-b border-line/12 mb-8">
                <button
                  type="button"
                  onClick={() => { setActiveTab('quote'); setSubmitted(false); }}
                  className={cn(
                    'flex-1 py-4 text-xs font-black uppercase tracking-wider text-center border-b-2 transition-all flex items-center justify-center gap-2',
                    activeTab === 'quote'
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-transparent text-fg-muted hover:text-fg'
                  )}
                >
                  <Sparkles size={16} className={activeTab === 'quote' ? 'text-primary' : ''} />
                  {t('contact.tabQuote')}
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('group'); setSubmitted(false); }}
                  className={cn(
                    'flex-1 py-4 text-xs font-black uppercase tracking-wider text-center border-b-2 transition-all flex items-center justify-center gap-2',
                    activeTab === 'group'
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-transparent text-fg-muted hover:text-fg'
                  )}
                >
                  <Building size={16} className={activeTab === 'group' ? 'text-primary' : ''} />
                  {t('contact.tabGroup')}
                </button>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-3xl font-black uppercase text-white">
                    {t('contact.form.successTitle')}
                  </h3>
                  <p className="text-white/70 text-sm max-w-md mx-auto leading-relaxed">
                    {t('contact.form.successDesc')}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        eventType: 'Séminaire / Conférence d\'entreprise',
                        targetDate: '',
                        guestCount: '',
                        budget: '2 000 € à 5 000 €',
                        needs: [],
                        targetPole: 'IROKO Event',
                        subject: '',
                        message: ''
                      });
                    }}
                    className="bg-primary hover:bg-primary-hover text-primary-on px-6 py-3 text-xs font-black uppercase tracking-wider transition-colors inline-block rounded-sm"
                  >
                    {t('contact.form.anotherMsg')}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Coordonnées de base */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-fg-muted">
                        {t('contact.form.fullName')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder={t('contact.form.fullNamePh')}
                        className="w-full bg-bg border border-line/12 p-3.5 text-xs text-fg focus:outline-none focus:border-primary transition-colors rounded-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-fg-muted">
                        {t('contact.form.email')} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t('contact.form.emailPh')}
                        className="w-full bg-bg border border-line/12 p-3.5 text-xs text-fg focus:outline-none focus:border-primary transition-colors rounded-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-fg-muted">
                        {t('contact.form.phone')} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t('contact.form.phonePh')}
                        className="w-full bg-bg border border-line/12 p-3.5 text-xs text-fg focus:outline-none focus:border-primary transition-colors rounded-sm"
                      />
                    </div>

                    {activeTab === 'quote' ? (
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-fg-muted">
                          {t('contact.form.eventType')}
                        </label>
                        <select
                          value={formData.eventType}
                          onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                          className="w-full bg-bg border border-line/12 p-3.5 text-xs text-fg focus:outline-none focus:border-primary transition-colors rounded-sm"
                        >
                          <option>{t('contact.form.typeSeminar')}</option>
                          <option>{t('contact.form.typeGala')}</option>
                          <option>{t('contact.form.typeLaunch')}</option>
                          <option>{t('contact.form.typePrivate')}</option>
                          <option>{t('contact.form.typeOther')}</option>
                        </select>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-fg-muted">
                          {t('contact.form.poleTarget')}
                        </label>
                        <select
                          value={formData.targetPole}
                          onChange={(e) => setFormData({ ...formData, targetPole: e.target.value })}
                          className="w-full bg-bg border border-line/12 p-3.5 text-xs text-fg focus:outline-none focus:border-primary transition-colors rounded-sm"
                        >
                          <option>Holding IROKO GROUP (Gouvernance & Général)</option>
                          <option>IROKO Event (Communication 360° & Événements)</option>
                          <option>IROKO Academia (Formation continue)</option>
                          <option>IROKO Engineering (Ingénierie technique)</option>
                          <option>IROKO App (Applications mobiles & web)</option>
                          <option>IROKO Gestion & Compta (Logiciels de gestion)</option>
                          <option>IROKO Cloud (Hébergement & DevOps)</option>
                          <option>IROKO Studio (Production audiovisuelle)</option>
                          <option>IROKO Security (Cybersécurité & Données)</option>
                          <option>IROKO Ventures (Incubation & Investissement)</option>
                          <option>Partenariats & Investisseurs</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Champs spécifiques devis événementiel */}
                  {activeTab === 'quote' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-fg-muted">
                            {t('contact.form.date')}
                          </label>
                          <input
                            type="date"
                            value={formData.targetDate}
                            onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                            className="w-full bg-bg border border-line/12 p-3.5 text-xs text-fg focus:outline-none focus:border-primary transition-colors rounded-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-fg-muted">
                            {t('contact.form.guests')}
                          </label>
                          <input
                            type="text"
                            value={formData.guestCount}
                            onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                            placeholder="Ex: 250 personnes"
                            className="w-full bg-bg border border-line/12 p-3.5 text-xs text-fg focus:outline-none focus:border-primary transition-colors rounded-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-fg-muted">
                            {t('contact.form.budget')}
                          </label>
                          <select
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className="w-full bg-bg border border-line/12 p-3.5 text-xs text-fg focus:outline-none focus:border-primary transition-colors rounded-sm"
                          >
                            <option>{t('contact.form.b1')}</option>
                            <option>{t('contact.form.b2')}</option>
                            <option>{t('contact.form.b3')}</option>
                            <option>{t('contact.form.b4')}</option>
                          </select>
                        </div>
                      </div>

                      {/* Besoins techniques */}
                      <div className="space-y-2 pt-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-fg-muted block mb-1">
                          {t('contact.form.needs')} :
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {[
                            t('contact.form.needSound'),
                            t('contact.form.needLight'),
                            t('contact.form.needScreen'),
                            t('contact.form.needFurniture'),
                            t('contact.form.needCoord'),
                            'Scénographie 3D'
                          ].map((nd) => (
                            <button
                              type="button"
                              key={nd}
                              onClick={() => toggleNeed(nd)}
                              className={cn(
                                'p-2 text-left text-[11px] font-semibold border transition-all flex items-center justify-between rounded-sm',
                                formData.needs.includes(nd)
                                  ? 'bg-primary/20 border-primary text-fg'
                                  : 'bg-bg-alt border-line/12 text-fg-muted hover:text-fg'
                              )}
                            >
                              <span>{nd}</span>
                              {formData.needs.includes(nd) && <CheckCircle2 size={12} className="text-primary" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Message / Description */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-fg-muted">
                      {t('contact.form.message')} *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t('contact.form.messagePh')}
                      className="w-full bg-bg border border-line/12 p-3.5 text-xs text-fg focus:outline-none focus:border-primary transition-colors resize-none rounded-sm"
                    />
                  </div>

                  {/* Bouton de soumission */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-blend hover:opacity-95 text-white py-4 font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99] rounded-sm"
                  >
                    {loading ? (
                      t('contact.form.sending')
                    ) : (
                      <>
                        <Send size={16} />
                        {activeTab === 'quote' ? t('contact.form.submitQuote') : t('contact.form.submitContact')}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar Coordonnées */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-surface border border-line/12 p-8 space-y-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-black uppercase tracking-tight text-fg pb-4 border-b border-line/12">
                {t('contact.coordsTitle')}
              </h3>

              <div className="space-y-6 text-xs text-fg-muted">
                <div className="flex gap-4">
                  <MapPin size={20} className="text-primary shrink-0" />
                  <div>
                    <span className="font-black uppercase text-fg block mb-1">
                      {t('contact.addressLabel')}
                    </span>
                    <p className="text-fg-muted leading-relaxed">
                      {t('contact.addressVal')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone size={20} className="text-primary shrink-0" />
                  <div>
                    <span className="font-black uppercase text-fg block mb-1">
                      {t('contact.phoneLabel')}
                    </span>
                    <p className="text-fg-muted font-mono">+20 151 594 8907</p>
                    <p className="text-fg-muted font-mono">+20 237 557 872</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail size={20} className="text-primary shrink-0" />
                  <div>
                    <span className="font-black uppercase text-fg block mb-1">
                      {t('contact.emailLabel')}
                    </span>
                    <p className="text-fg-muted">contact@irokogroup.com</p>
                    <p className="text-fg-muted">event@irokogroup.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock size={20} className="text-primary shrink-0" />
                  <div>
                    <span className="font-black uppercase text-fg block mb-1">
                      {t('contact.hoursLabel')}
                    </span>
                    <p className="text-fg-muted">{t('contact.hoursVal')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 via-surface to-accent/15 p-8 border border-line/12 rounded-2xl shadow-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
                Engagement 48h
              </span>
              <h4 className="text-lg font-black uppercase text-fg mb-2">Devis Rapide & Garanti</h4>
              <p className="text-xs text-fg-muted leading-relaxed">
                Toutes les demandes de devis transmises via ce formulaire sont traitées en priorité sous 48 heures ouvrées par un chargé d'affaires dédié.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
