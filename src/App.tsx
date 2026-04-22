import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, MessageCircle, MapPin, Mail, Clock, ShieldCheck, 
  Leaf, Truck, Award, Menu, X, ChevronRight, Calculator, Info,
  CheckCircle, Star, Play, ChevronDown, ChevronUp, Droplets, Wind
} from 'lucide-react';

// ==========================================
// AŞAMA 1: MERKEZİ YAPILANDIRMA (site-config.js)
// ==========================================
const siteConfig = {
  logo: "",
  ilce: "Bakırköy",
  firmaAdi: "Bakırköy Halı Yıkama",
  telefon: "0212 487 00 11",
  telefonLink: "+902124870011",
  whatsapp: "905424870011",
  whatsappMesaj: "Merhaba, halı yıkama fiyatları hakkında bilgi almak istiyorum.",
  adres: "Kartaltepe, Bakırköy / İstanbul",
  mail: "bakirkoy@bakirkoyhaliyikama.com.tr",
  calismaSaatleri: "09:00 - 20:00 (Her Gün)",
  haritaIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48188.25752392723!2d28.83546731652433!3d40.98708170810776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa319b9de121d%3A0xc31faef63567d264!2sBak%C4%B1rk%C3%B6y%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str",
  gtmId: "GTM-XXXXXXX",
  sheetsUrl: "https://docs.google.com/spreadsheets/d/100d1o3JCXkGzkAV73PyyJ-qw3gk5jDbohOmR78Bw8JE/export?format=csv",
  siteUrl: "https://www.rekorhaliyikama.com"
};

// ==========================================
// AŞAMA 2: SEO SILO VERİ MİMARİSİ
// ==========================================
const servicesList = [
  { name: "Halı Yıkama", img: "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=800" },
  { name: "Koltuk Yıkama", img: "https://images.unsplash.com/photo-1583847268964-b28e50bc14f8?auto=format&fit=crop&q=80&w=800" },
  { name: "Stor Perde Yıkama", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800" },
  { name: "Yatak Yıkama", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800" },
  { name: "Yorgan Yıkama", img: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&q=80&w=800" },
  { name: "Yastık Yıkama", img: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&q=80&w=800" }
];
const carpetTypesList = ["Kaymaz Halı", "Makine Halısı", "Makine Yün Halı", "Shaggy Halı", "Floş Halı", "Bambu Halı", "Milas Halı", "Yörük Halısı", "Hereke Halı", "Hint Kilimi", "İpekçe Halı", "Peluş Halı", "Saf Yün Halı", "Isparta Halısı", "Patchwork Halı", "Shaggy El Dokuma", "Çin Halısı", "Nepal Halı", "Step Halı", "İpek Halı", "İran Halısı", "Viskon Halı", "Jüt Halı", "Sisal Halı", "Polyester Halı", "Polipropilen Halı", "Naylon Halı", "Akrilik Halı", "Uşak Halısı", "Yağcıbedir Halısı", "Afgan Halısı", "Antika Halı", "Ladik Halısı"];
const areasList = ["Bağcılar", "Bahçelievler", "Bakırköy", "Başakşehir", "Güngören", "Küçükçekmece", "Halkalı", "Atakent", "İkitelli", "Sefaköy", "Florya", "Şenlikköy", "Yeşilköy", "Bahçeşehir", "Kayaşehir", "Altınşehir", "Kayabaşı", "Ispartakule", "Esenkent", "Zeytinburnu"];

const subAreas = ["Zuhuratbaba", "Kartaltepe", "Ataköy 1. Kısım", "Ataköy 2. Kısım", "Yeşilköy", "Yeşilyurt", "Florya", "Şenlikköy", "Osmaniye", "Cevizlik", "Yenimahalle", "Sakızağacı"];

const faqs = [
  { q: "Halılar kaç günde teslim ediliyor?", a: "Tesisimize gelen halılarınız türüne göre özel işlemlere tabi tutulduktan sonra, kurutma odalarımızda tamamen kurutulur ve ortalama 3-4 iş günü içerisinde ambalajlı olarak teslim edilir." },
  { q: "Hangi temizlik maddelerini kullanıyorsunuz?", a: "Tamamen organik, anti-bakteriyel ve insan/evcil hayvan sağlığına zararsız, TSE onaylı profesyonel Era111 gibi bitkisel şampuanlar kullanmaktayız." },
  { q: "Servis ücretiniz var mı?", a: `${siteConfig.ilce} ve çevre ilçelere ücretsiz servis hizmetimiz bulunmaktadır. Belirli bir metrekare altındaki siparişler için minimum servis tutarı uygulanabilir.` },
  { q: "Lekelerin çıkma garantisi var mı?", a: "Halı dokusuna zarar vermeden çıkarılabilecek tüm lekelere profesyonel leke sökücülerle müdahale ediyoruz. Ancak kumaşın yapısını bozmuş veya yanık izi bırakmış asidik lekeler için %100 garanti verilememektedir." },
  { q: "Kapalı odada halı kurutma işlemi nasıl yapılıyor?", a: "Toz ve egzoz dumanına maruz kalmaması için halılarınız özel izolasyonlu, nem alma cihazlarıyla donatılmış kapalı kurutma odalarımızda hijyenik bir şekilde kurutulur." }
];

const reviews = [
  { name: "Ahmet Yılmaz", date: "2 hafta önce", rating: 5, text: "Yıllardır çıkmayan çay lekesini tamamen temizlemişler. Bakırköy'de halı yıkama arayanlara kesinlikle tavsiye ederim, servisleri de çok hızlıydı." },
  { name: "Ayşe Demir", date: "1 ay önce", rating: 5, text: "Koltuklarımı yerinde yıkattım. Makinenin vakum gücü harikaydı, koltuklarım ilk günkü rengine kavuştu. Çalışanlar çok kibar ve profesyonel." },
  { name: "Mehmet Kaya", date: "3 gün önce", rating: 5, text: "Stor perdelerimi mekanizmasına hiç zarar vermeden söküp pırıl pırıl getirip taktılar. Fiyatlar gayet makul." }
];

const injectSchema = (schema) => {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

// ==========================================
// BİLEŞENLER (COMPONENTS)
// ==========================================

const Header = ({ navigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-blue-900 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('home')}>
            {siteConfig.logo ? (
              <img src={siteConfig.logo} alt={`${siteConfig.firmaAdi} Logosu`} className="h-12 w-auto object-contain" />
            ) : (
              <span className="font-extrabold text-2xl text-blue-900 tracking-tight">
                {siteConfig.firmaAdi.toUpperCase()}
              </span>
            )}
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => navigate('home')} className="text-gray-700 hover:text-blue-900 font-semibold transition-colors">Anasayfa</button>
            <button onClick={() => navigate('about')} className="text-gray-700 hover:text-blue-900 font-semibold transition-colors">Hakkımızda</button>
            <button onClick={() => navigate('prices')} className="text-gray-700 hover:text-blue-900 font-semibold transition-colors">Fiyatlar</button>
            <button onClick={() => navigate('faq')} className="text-gray-700 hover:text-blue-900 font-semibold transition-colors">S.S.S</button>
            <button onClick={() => navigate('contact')} className="text-gray-700 hover:text-blue-900 font-semibold transition-colors">İletişim</button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a href={`tel:${siteConfig.telefonLink}`} className="flex items-center text-blue-900 font-bold text-lg hover:opacity-80">
              <PhoneCall className="w-5 h-5 mr-2" />
              {siteConfig.telefon}
            </a>
            <a href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMesaj)}`} target="_blank" rel="noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-green-500/30 transition-all flex items-center">
              Hemen Ara
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-blue-900">
              {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {['home', 'about', 'prices', 'faq', 'contact'].map((item) => (
              <button key={item} onClick={() => { navigate(item); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-900 capitalize">
                {item === 'home' ? 'Anasayfa' : item === 'about' ? 'Hakkımızda' : item === 'prices' ? 'Fiyatlar' : item === 'faq' ? 'S.S.S' : 'İletişim'}
              </button>
            ))}
             <a href={`tel:${siteConfig.telefonLink}`} className="mt-4 w-full bg-blue-900 text-white flex justify-center py-3 rounded-lg font-bold">
              <PhoneCall className="w-5 h-5 mr-2" /> Ara: {siteConfig.telefon}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = ({ navigate }) => {
  return (
    <footer className="bg-slate-900 text-gray-300 pt-16 pb-8 border-t-4 border-blue-600 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h3 className="text-white text-xl font-bold mb-6">{siteConfig.firmaAdi}</h3>
            <p className="mb-6 text-sm leading-relaxed pr-4">Profesyonel, anti-bakteriyel ve garantili yıkama hizmetleri. Tesisimizde en gelişmiş otomatik makinelerle derinlemesine temizlik sağlanmaktadır.</p>
            <div className="space-y-3 text-sm">
              <p className="flex items-center"><MapPin className="w-5 h-5 mr-3 text-blue-500" /> {siteConfig.adres}</p>
              <p className="flex items-center"><PhoneCall className="w-5 h-5 mr-3 text-blue-500" /> {siteConfig.telefon}</p>
              <p className="flex items-center"><Mail className="w-5 h-5 mr-3 text-blue-500" /> {siteConfig.mail}</p>
            </div>
          </div>

          <div>
            <h4 className="text-white text-lg font-bold mb-6">Hizmetlerimiz</h4>
            <ul className="space-y-2 text-sm">
              {servicesList.map(service => (
                <li key={service.name}>
                  <button onClick={() => navigate('service', service.name)} className="hover:text-blue-400 flex items-center">
                    <ChevronRight className="w-4 h-4 mr-1" /> {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div>
            <h4 className="text-white text-lg font-bold mb-6">Halı Yıkama Çeşitleri</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              {carpetTypesList.map(type => (
                <li key={type}>
                  <button onClick={() => navigate('carpet', type)} className="hover:text-blue-400 text-left truncate w-full flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1 flex-shrink-0" /> {type}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-bold mb-6">Hizmet Bölgelerimiz</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              {areasList.map(area => (
                <li key={area}>
                  <button onClick={() => navigate('area', area)} className="hover:text-blue-400 text-left truncate w-full flex items-center">
                     <MapPin className="w-3 h-3 mr-1 flex-shrink-0" /> {area}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-bold mb-6">{siteConfig.ilce} Mahalleleri</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              {subAreas.map(area => (
                <li key={area}>
                  <button onClick={() => navigate('area', area)} className="hover:text-blue-400 text-left truncate w-full flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1 flex-shrink-0" /> {area}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center text-xs text-center lg:text-left">
          <p className="mb-4 lg:mb-0">&copy; {new Date().getFullYear()} {siteConfig.firmaAdi}. Tüm Hakları Saklıdır.</p>
          
          <div className="mb-4 lg:mb-0 flex items-center text-slate-500 justify-center">
            <span>Altyapı & Tasarım: </span>
            <a 
              href="https://wa.me/905424575150?text=Halı%20yıkama%20web%20sitesi%20tasarımı%20hakkında%20bilgi%20almak%20istiyorum." 
              target="_blank" 
              rel="noreferrer" 
              className="ml-1 text-blue-500 hover:text-blue-400 font-bold transition-colors flex items-center"
            >
              Halı Yıkama Web Siteleri <ChevronRight className="w-3 h-3 ml-0.5" />
            </a>
          </div>

          <div className="flex space-x-4 items-center justify-center">
            <button onClick={() => navigate('legal', 'Gizlilik Politikası')} className="hover:text-white transition-colors">Gizlilik Politikası</button>
            <span className="text-slate-600">|</span>
            <button onClick={() => navigate('legal', 'KVKK Aydınlatma Metni')} className="hover:text-white transition-colors">KVKK</button>
            <span className="text-slate-600">|</span>
            <a href="/sitemap.xml" target="_blank" className="hover:text-white transition-colors flex items-center">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FloatingWhatsApp = () => (
  <a
    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMesaj)}`}
    target="_blank"
    rel="noreferrer"
    className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-transform hover:scale-110 z-50 flex items-center justify-center animate-bounce"
    aria-label="WhatsApp ile İletişime Geç"
  >
    <MessageCircle className="w-8 h-8" />
  </a>
);

const PricingCalculator = ({ pricingData }) => {
  const [itemCount, setItemCount] = useState(1);
  const [items, setItems] = useState([{ id: 1, serviceId: '', width: '', length: '' }]);

  const handleItemCountChange = (e) => {
    const count = parseInt(e.target.value);
    setItemCount(count);
    setItems(prev => {
      const newItems = [...prev];
      if (count > newItems.length) {
        for (let i = newItems.length; i < count; i++) {
          newItems.push({ id: i + 1, serviceId: '', width: '', length: '' });
        }
      } else {
        newItems.length = count; 
      }
      return newItems;
    });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const isM2Service = (serviceId) => {
    if (!serviceId) return false;
    const service = pricingData.find(s => s.id === parseInt(serviceId));
    if (!service) return false;
    
    const unit = (service.unit || '').toLowerCase().trim();
    if (unit === 'adet' || unit === 'takım' || unit === 'takim') {
      return false;
    }
    return true; 
  };

  const calculateItemPrice = (item) => {
    if (!item.serviceId) return 0;
    const service = pricingData.find(s => s.id === parseInt(item.serviceId));
    if (!service) return 0;

    if (isM2Service(item.serviceId)) {
      const w = parseFloat(item.width) || 0;
      const l = parseFloat(item.length) || 0;
      if (w > 0 && l > 0) {
        return (w * l / 10000) * service.price;
      }
      return 0;
    } else {
      return service.price;
    }
  };

  const totalPrice = items.reduce((sum, item) => sum + calculateItemPrice(item), 0);

  const getWhatsAppLink = () => {
    let text = ``;
    items.forEach((item, index) => {
      if (item.serviceId) {
        const service = pricingData.find(s => s.id === parseInt(item.serviceId));
        if (service) {
          const price = calculateItemPrice(item);
          if (price > 0) {
            const isM2 = isM2Service(item.serviceId);
            let dimText = '';
            if (isM2) {
               const w = item.width || 0;
               const l = item.length || 0;
               const m2 = ((w * l) / 10000).toFixed(2);
               dimText = ` (${w}x${l} cm = ${m2} m²)`;
            }
            text += `${index + 1}. ${service.name}${dimText} - ${price.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} TL\n`;
          }
        }
      }
    });

    if (totalPrice === 0) return `https://wa.me/${siteConfig.whatsapp}`;

    const finalMessage = `Hesaplama yaptığım site: ${siteConfig.siteUrl}\n\n${text}\nGenel Toplam: ${totalPrice.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} TL`;
    return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(finalMessage)}`;
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl text-white border border-slate-800 w-full max-w-lg mx-auto">
      <div className="flex items-center mb-6">
        <Calculator className="w-8 h-8 text-blue-400 mr-3" />
        <h3 className="text-2xl font-bold">Anında Fiyat Hesapla</h3>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Kaç Adet Halı / Ürün Var?</label>
        <select 
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          value={itemCount}
          onChange={handleItemCountChange}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1} Adet Seç</option>
          ))}
        </select>
      </div>

      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
        {items.map((item, index) => {
          const itemPrice = calculateItemPrice(item);
          return (
            <div key={item.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <label className="block text-xs text-blue-400 font-bold mb-2">{index + 1}. Ürün Detayı</label>
              <div className="space-y-3">
                <select 
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none"
                  value={item.serviceId}
                  onChange={(e) => updateItem(index, 'serviceId', e.target.value)}
                >
                  <option value="">Halı/Ürün Türü Seçiniz...</option>
                  {pricingData.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.unit})</option>
                  ))}
                </select>
                
                {isM2Service(item.serviceId) ? (
                  <div className="flex space-x-3">
                    <div className="flex-1">
                      <input 
                        type="number" 
                        min="0"
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none placeholder-gray-500"
                        placeholder="En (cm)"
                        value={item.width}
                        onChange={(e) => updateItem(index, 'width', e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <input 
                        type="number" 
                        min="0"
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none placeholder-gray-500"
                        placeholder="Boy (cm)"
                        value={item.length}
                        onChange={(e) => updateItem(index, 'length', e.target.value)}
                      />
                    </div>
                  </div>
                ) : item.serviceId ? (
                  <div className="text-xs text-gray-400 mt-2 px-1">Bu hizmet adet/takım fiyatlıdır. Ebat girilmez.</div>
                ) : null}

                {item.serviceId && itemPrice > 0 && (
                  <div className="text-right text-sm font-bold text-green-400">
                    Ara Toplam: {itemPrice.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} TL
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-700">
        <div className="flex justify-between items-end mb-6">
          <div>
            <p className="text-sm text-gray-400 mb-1">Genel Toplam</p>
            <p className="text-3xl font-extrabold text-white">{totalPrice.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} <span className="text-lg text-blue-400 font-medium">TL</span></p>
          </div>
        </div>
        
        <a 
          href={getWhatsAppLink()}
          target="_blank" 
          rel="noreferrer"
          className="w-full flex justify-center items-center bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-green-500/30"
        >
          <MessageCircle className="w-6 h-6 mr-2" />
          WhatsApp ile Başvur
        </a>
      </div>
    </div>
  );
};

// ==========================================
// ANASAYFA (SEO OPTİMİZASYONLU)
// ==========================================
const Home = ({ navigate, pricingData }) => {
  const [openFaq, setOpenFaq] = useState(null);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.firmaAdi,
    "image": siteConfig.logo || "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80",
    "telephone": siteConfig.telefon,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.adres.split(',')[0],
      "addressLocality": siteConfig.ilce,
      "addressRegion": "İstanbul",
      "addressCountry": "TR"
    },
    "url": siteConfig.siteUrl,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128"
    }
  };

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": `${siteConfig.ilce} Halı Yıkama Tesisimiz`,
    "description": `Modern makinelerimizle ${siteConfig.ilce} bölgesindeki halı yıkama süreçlerimiz.`,
    "thumbnailUrl": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80",
    "uploadDate": "2023-01-01T08:00:00+08:00",
    "contentUrl": `${siteConfig.siteUrl}/tanitim.mp4`
  };

  const homeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.slice(0, 4).map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="animate-fadeIn w-full overflow-x-hidden">
      {injectSchema(localBusinessSchema)}
      {injectSchema(videoSchema)}
      {injectSchema(homeFaqSchema)}
      
      <section className="relative bg-slate-900 py-16 lg:py-24 overflow-hidden w-full">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                {siteConfig.ilce} <span className="text-blue-400">Halı Yıkama</span> Fabrikası
              </h1>
              <p className="mt-4 text-xl text-gray-200 max-w-2xl mb-10 font-light leading-relaxed">
                Organik şampuanlar ve tam otomatik makinelerle halılarınızın hav diplerine inen derinlemesine temizlik. {siteConfig.ilce} bölgesinde aynı gün ücretsiz servis imkanı.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a href={`tel:${siteConfig.telefonLink}`} className="flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full text-blue-900 bg-white hover:bg-gray-50 shadow-xl transition-all">
                  <PhoneCall className="w-6 h-6 mr-3" />
                  {siteConfig.telefon}
                </a>
                <a href={`https://wa.me/${siteConfig.whatsapp}`} className="flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full text-white bg-green-500 hover:bg-green-600 shadow-xl shadow-green-500/40 transition-all">
                  <MessageCircle className="w-6 h-6 mr-3" />
                  WhatsApp
                </a>
              </div>
            </div>
            
            <div className="lg:pl-10 w-full">
              <PricingCalculator pricingData={pricingData} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-800 py-6 border-b-4 border-blue-600 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-gray-400 font-semibold text-sm uppercase tracking-wider">
            <span className="flex items-center"><Award className="w-5 h-5 mr-2 text-blue-500" /> TSE Standartları</span>
            <span className="flex items-center"><Leaf className="w-5 h-5 mr-2 text-green-500" /> %100 Organik Şampuan</span>
            <span className="flex items-center"><CheckCircle className="w-5 h-5 mr-2 text-blue-500" /> Era111 & Wieberr</span>
            <span className="flex items-center"><ShieldCheck className="w-5 h-5 mr-2 text-green-500" /> Garantili Yıkama</span>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-gray-100 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
              <Truck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900">Ücretsiz Servis</h3>
              <p className="text-sm text-gray-500 mt-2">Aynı gün alım ve teslimat</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
              <Leaf className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900">Anti-Bakteriyel</h3>
              <p className="text-sm text-gray-500 mt-2">Bakanlık onaylı şampuanlar</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900">Hızlı Teslimat</h3>
              <p className="text-sm text-gray-500 mt-2">3-4 iş gününde teslim</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
              <ShieldCheck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900">Garantili Yıkama</h3>
              <p className="text-sm text-gray-500 mt-2">%100 Müşteri memnuniyeti</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Halılarınız Nasıl Yıkanıyor?</h2>
            <p className="mt-4 text-lg text-gray-500">Toz alma işleminden kapalı odada halı kurutmaya kadar profesyonel aşamalar.</p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center relative">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xl absolute -top-6 left-1/2 transform -translate-x-1/2 border-4 border-gray-50">1</div>
              <Wind className="w-12 h-12 text-blue-500 mx-auto mt-6 mb-4" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">Toz Alma</h3>
              <p className="text-sm text-gray-600">Yıkama öncesi yüksek titreşimli makinelerle hav aralarındaki toz ve maytlar tamamen arındırılır.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center relative">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xl absolute -top-6 left-1/2 transform -translate-x-1/2 border-4 border-gray-50">2</div>
              <Droplets className="w-12 h-12 text-blue-500 mx-auto mt-6 mb-4" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">Otomatik Yıkama</h3>
              <p className="text-sm text-gray-600">Fırçalı tam otomatik bant sisteminde organik leke çıkarıcılar ile derinlemesine yıkanır.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center relative">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xl absolute -top-6 left-1/2 transform -translate-x-1/2 border-4 border-gray-50">3</div>
              <Calculator className="w-12 h-12 text-blue-500 mx-auto mt-6 mb-4" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">Sıkma & Kurutma</h3>
              <p className="text-sm text-gray-600">Kazan tipi santrifüj makineleriyle %95 suyu alınır, kapalı izolasyonlu odalarda kurutulur.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center relative">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xl absolute -top-6 left-1/2 transform -translate-x-1/2 border-4 border-gray-50">4</div>
              <Truck className="w-12 h-12 text-blue-500 mx-auto mt-6 mb-4" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">Kontrol & Teslimat</h3>
              <p className="text-sm text-gray-600">Son kalite kontrolden geçirilip parfümlenir, ambalajlanarak adresinize ücretsiz teslim edilir.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                Profesyonel <span className="text-blue-600">{siteConfig.ilce} Halı Yıkama</span> Tesisleri
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Sıradan yüzey temizliği değil, derinlemesine hijyen sunuyoruz. <strong>{siteConfig.firmaAdi}</strong> olarak, gelişmiş tam otomatik makine parkurumuz ve tecrübeli ekibimizle halılarınızın en ince dokularına işleyen toz, mite, akar ve bakterileri %99.9 oranında arındırıyoruz.
                </p>
                <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Neden Profesyonel Koltuk Yıkama?</h3>
                <p>
                  Evde yapılan silme işlemleri kirleri kumaşın altına itmekten başka bir işe yaramaz. <strong>Yerinde koltuk yıkama {siteConfig.ilce}</strong> hizmetimizle, sanayi tipi yüksek vakum gücüne sahip makineler kullanarak kirli suyu anında çekiyor, koltuklarınızı ilk günkü parlaklığına kavuşturuyoruz.
                </p>
              </div>
              <button onClick={() => navigate('about')} className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-600 transition-colors">
                Hakkımızda Daha Fazla
              </button>
            </div>
            
            <div className="space-y-8 w-full">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer bg-slate-900 h-64">
                <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80" alt="Tesisimiz Video" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white pl-1 shadow-lg transform group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-white font-bold text-lg drop-shadow-md">Tesis Tanıtım Videosunu İzle</div>
              </div>

              <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden shadow-lg border-4 border-white h-48">
                <div className="relative h-full">
                  <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80" alt="Kirli Halı Yıkama Öncesi" className="w-full h-full object-cover filter contrast-75 brightness-75" />
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">ÖNCESİ</span>
                </div>
                <div className="relative h-full">
                  <img src="https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80" alt="Temiz Halı Yıkama Sonrası" className="w-full h-full object-cover filter contrast-125 brightness-110" />
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">SONRASI</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 border-t border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Temizlikte Premium Hizmetler</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Tesisimizde halı, koltuk, yatak ve stor perdeleriniz için en uygun yıkama protokolleri uygulanmaktadır.</p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, index) => (
              <div key={index} onClick={() => navigate('service', service.name)} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group">
                <div className="h-56 overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={service.img} alt={`${service.name} ${siteConfig.ilce}`} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8 text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{service.name}</h3>
                  <p className="text-gray-500 mb-6 line-clamp-2">Tesisimizde {service.name.toLowerCase()} işlemleri en güncel teknolojik makinelerle ve derinlemesine dezenfeksiyon sağlanarak profesyonelce yapılmaktadır.</p>
                  <div className="flex items-center text-blue-600 font-bold text-sm uppercase tracking-wide">
                    Hizmeti İncele <ChevronRight className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Müşterilerimiz Ne Diyor?</h2>
            <div className="flex justify-center items-center mt-4">
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <span className="ml-3 text-lg font-bold text-slate-900">4.9/5 (128+ Google Yorumu)</span>
            </div>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-left">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">{review.name.charAt(0)}</div>
                  <div className="ml-3">
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
                </div>
                <p className="text-gray-600 italic">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 text-left">
            <div>
              <h2 className="text-3xl font-extrabold mb-6 flex items-center"><MapPin className="w-8 h-8 text-blue-400 mr-3" /> Hizmet Ağımız</h2>
              <p className="text-gray-400 mb-6">Merkezimiz {siteConfig.ilce}'de olup, aşağıdaki mahallelere ve çevre ilçelere aynı gün ücretsiz servisimiz vardır.</p>
              
              <h3 className="text-lg font-bold text-white mb-3 border-b border-slate-700 pb-2">{siteConfig.ilce} Mahalleleri</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {subAreas.map(area => (
                  <button 
                    key={area} 
                    onClick={() => navigate('area', area)}
                    className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-center text-xs font-medium hover:bg-blue-600 hover:border-blue-500 transition-colors w-full truncate"
                  >
                    {area} Halı Yıkama
                  </button>
                ))}
              </div>

              <h3 className="text-lg font-bold text-white mb-3 border-b border-slate-700 pb-2">Çevre İlçeler</h3>
              <div className="flex flex-wrap gap-2">
                {areasList.filter(a => a !== siteConfig.ilce).map(area => (
                  <button 
                    key={area} 
                    onClick={() => navigate('area', area)}
                    className="bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-xs font-medium hover:bg-blue-600 hover:border-blue-500 transition-colors"
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-extrabold mb-6 flex items-center"><Info className="w-8 h-8 text-blue-400 mr-3" /> Sıkça Sorulanlar</h2>
              <div className="space-y-4">
                {faqs.slice(0, 4).map((faq, i) => (
                  <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                    <button 
                      className="w-full px-6 py-4 text-left font-bold flex justify-between items-center focus:outline-none"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      {faq.q}
                      {openFaq === i ? <ChevronUp className="w-5 h-5 text-blue-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-4 text-gray-300 text-sm leading-relaxed border-t border-slate-700 pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                 <button onClick={() => navigate('faq')} className="text-blue-400 hover:text-white font-bold underline">Tüm Soruları Gör</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900">Yıkama Yaptığımız Halı Türleri</h2>
            <p className="mt-4 text-gray-500">Her halının dokusuna ve iplik yapısına özel şampuan ve yıkama tekniği kullanıyoruz.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {carpetTypesList.map(type => (
              <button 
                key={type} 
                onClick={() => navigate('carpet', type)}
                className="bg-gray-50 border border-gray-200 text-gray-700 rounded-full px-4 py-2 text-sm font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const LegalPage = ({ title, type }) => {
  useEffect(() => {
    document.title = `${title} | ${siteConfig.firmaAdi}`;
    const meta = document.createElement('meta');
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    
    return () => {
      document.head.removeChild(meta);
    };
  }, [title]);

  const gizlilikText = `
    Gizlilik Politikası: ${siteConfig.firmaAdi} olarak müşteri gizliliğine ve kişisel verilerin korunmasına büyük önem vermekteyiz.
    Web sitemiz üzerinden toplanan isim, telefon ve adres gibi iletişim bilgileri, sadece size hizmet verebilmek,
    siparişlerinizi teslim etmek ve kampanya bilgilendirmeleri yapmak amacıyla kullanılmaktadır. Bu bilgiler üçüncü şahıs 
    veya kurumlarla kesinlikle paylaşılmamaktadır. Verileriniz, yüksek güvenlik standartlarına sahip sunucularımızda saklanmaktadır.
  `;

  const kvkkText = `
    KVKK Aydınlatma Metni: 6698 Sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, ${siteConfig.firmaAdi} olarak,
    veri sorumlusu sıfatıyla, kişisel verileriniz aşağıda açıklanan amaçlar kapsamında işlenebilecektir. 
    İşlenen verileriniz; adınız, soyadınız, telefon numaranız, teslimat adresinizdir. Bu veriler hizmet sözleşmesinin kurulması 
    ve ifası, müşteri ilişkileri yönetimi amaçlarıyla toplanmakta ve işlenmektedir. Kanunun 11. maddesi uyarınca haklarınızı kullanmak 
    için bizimle iletişime geçebilirsiniz.
  `;

  return (
    <div className="min-h-screen bg-gray-50 py-16 w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 text-left">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">{title}</h1>
        <div className="prose prose-lg prose-blue text-gray-600 max-w-none">
          <p className="whitespace-pre-line">{type === 'KVKK Aydınlatma Metni' ? kvkkText : gizlilikText}</p>
          <p className="mt-8 text-sm text-gray-500">Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
        </div>
      </div>
    </div>
  );
};

const ContentPage = ({ title, type, itemName, navigate }) => {
  useEffect(() => {
    document.title = `${itemName} | ${siteConfig.firmaAdi}`;
  }, [itemName]);

  return (
    <div className="min-h-screen bg-gray-50 py-16 w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 text-left">
        <div className="text-blue-600 font-semibold mb-4 tracking-wider uppercase text-sm">
          {type === 'service' ? 'Hizmetlerimiz' : type === 'carpet' ? 'Halı Türleri' : 'Hizmet Bölgelerimiz'}
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8">{title}</h1>
        
        <div className="prose prose-lg prose-blue text-gray-600 max-w-none">
          <p className="lead text-xl text-gray-800 font-medium mb-6">
            {siteConfig.firmaAdi} olarak, {type === 'area' ? `${itemName} bölgesindeki müşterilerimize` : `${itemName} konusunda`} en yüksek standartlarda profesyonel temizlik hizmeti sunuyoruz.
          </p>
          <p className="mb-6">
            Sektördeki tecrübemiz ve gelişmiş tam otomatik makine parkurumuz sayesinde, işlemlerimiz standart yüzey temizliğinin çok ötesine geçer. Halının/Eşyanın en alt hav diplerine inerek kir, toz, akar ve bakterileri %99.9 oranında yok ediyoruz.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Neden Bizi Tercih Etmelisiniz?</h2>
          <ul className="space-y-4 mb-8 list-none pl-0">
            <li className="flex items-start"><ShieldCheck className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" /> Garantili ve sigortalı işlem yapıyoruz.</li>
            <li className="flex items-start"><Leaf className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" /> Çevre ve insan dostu, bakanlık onaylı şampuanlar kullanıyoruz.</li>
            <li className="flex items-start"><Truck className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" /> Randevu saatine sadık, ücretsiz servis ağımızla hizmet veriyoruz.</li>
          </ul>
        </div>

        <div className="mt-12 bg-blue-50 rounded-2xl p-8 text-center border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Hemen Randevu Alın</h3>
          <p className="mb-6 text-blue-800">Müşteri temsilcimizle görüşerek anında fiyat ve gün bilgisi alabilirsiniz.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={`tel:${siteConfig.telefonLink}`} className="bg-white text-blue-900 border-2 border-blue-900 font-bold py-3 px-8 rounded-full hover:bg-blue-900 hover:text-white transition-colors flex justify-center items-center">
              <PhoneCall className="w-5 h-5 mr-2" /> Ara
            </a>
            <a href={`https://wa.me/${siteConfig.whatsapp}`} className="bg-green-500 text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition-colors flex justify-center items-center shadow-lg shadow-green-500/30">
              <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQPage = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 w-full">
      {injectSchema(faqSchema)}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Sıkça Sorulan Sorular</h1>
          <p className="text-gray-600 text-lg">Merak ettiğiniz tüm detaylar burada.</p>
        </div>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-start">
                <Info className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                {faq.q}
              </h3>
              <p className="text-gray-600 leading-relaxed ml-9">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PricesPage = ({ pricingData }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Güncel Fiyat Listesi</h1>
          <p className="text-gray-600 text-lg">Şeffaf fiyatlandırma, sürpriz maliyet yok.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-slate-900 uppercase tracking-wider">Hizmet Türü</th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-slate-900 uppercase tracking-wider">Birim</th>
                  <th scope="col" className="px-6 py-4 text-right text-sm font-bold text-slate-900 uppercase tracking-wider">Fiyat</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {pricingData.length > 0 ? pricingData.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-left">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{item.unit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-blue-600">{item.price} TL</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-8 text-center text-gray-500">Fiyatlar yükleniyor...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="h-fit sticky top-28 w-full">
            <PricingCalculator pricingData={pricingData} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">İletişim</h1>
          <p className="text-gray-600 text-lg">Servis talebi veya sorularınız için bize ulaşın.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Mesaj Gönderin</h2>
            <form name="iletisim" method="POST" data-netlify="true" className="space-y-6">
              <input type="hidden" name="form-name" value="iletisim" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adınız Soyadınız</label>
                <input type="text" name="name" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefon Numaranız</label>
                <input type="tel" name="phone" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adres veya Mesajınız</label>
                <textarea name="message" rows="4" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-colors">
                Gönder
              </button>
            </form>
          </div>

          <div className="space-y-8 w-full">
            <div className="bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl text-white">
              <h2 className="text-2xl font-bold mb-8">İletişim Bilgileri</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-blue-400 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">Merkez Fabrika</h4>
                    <p className="text-gray-300 mt-1">{siteConfig.adres}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <PhoneCall className="w-6 h-6 text-blue-400 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">Telefon</h4>
                    <p className="text-gray-300 mt-1">{siteConfig.telefon}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-blue-400 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">Çalışma Saatleri</h4>
                    <p className="text-gray-300 mt-1">{siteConfig.calismaSaatleri}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-sm border border-gray-100 h-64 bg-gray-200 w-full">
              <iframe 
                srcDoc={`<html style="height:100%;"><body style="margin:0;padding:0;height:100%;display:flex;align-items:center;justify-content:center;background:#e2e8f0;font-family:sans-serif;color:#475569;"><h2>Harita Modülü: ${siteConfig.ilce}</h2></body></html>`}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Konum Haritası"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [route, setRoute] = useState({ page: 'home', param: null });
  const [pricingData, setPricingData] = useState([]);

  const navigate = (page, param = null) => {
    setRoute({ page, param });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    let title = `${siteConfig.firmaAdi} | ${siteConfig.ilce} Profesyonel Halı Yıkama`;
    if (route.page === 'about') title = `Hakkımızda | ${siteConfig.firmaAdi}`;
    if (route.page === 'faq') title = `S.S.S | ${siteConfig.firmaAdi}`;
    if (route.page === 'prices') title = `Fiyatlar | ${siteConfig.firmaAdi}`;
    if (route.page === 'contact') title = `İletişim | ${siteConfig.firmaAdi}`;
    if (route.page === 'legal') title = `${route.param} | ${siteConfig.firmaAdi}`;
    document.title = title;
  }, [route]);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const response = await fetch(siteConfig.sheetsUrl);
        if (!response.ok) throw new Error("Ağ hatası");
        const csvText = await response.text();
        
        const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
        const rows = csvText.split(/\r?\n/).filter(row => row.trim().length > 0).map(row => {
          return row.split(regex).map(item => item.replace(/^"|"$/g, '').trim());
        });
        
        let startIndex = 0;
        if (rows.length > 0) {
            const testPriceCol = rows[0].length >= 3 ? rows[0][2] : rows[0][1];
            if (testPriceCol && isNaN(parseFloat(testPriceCol.replace(/[^0-9.,]/g, '').replace(',', '.')))) {
                startIndex = 1; 
            }
        }

        const data = rows.slice(startIndex).map((row, index) => {
          let name = row[0] || 'Bilinmeyen Hizmet';
          let unit = 'm²';
          let rawPrice = '0';

          if (row.length >= 3) {
              unit = row[1] || 'm²';
              rawPrice = row[2];
          } else if (row.length === 2) {
              rawPrice = row[1];
          }

          let cleanPrice = rawPrice.replace(/[^0-9.,]/g, '');
          if (cleanPrice.includes(',') && cleanPrice.includes('.')) {
              cleanPrice = cleanPrice.replace(/\./g, '').replace(',', '.');
          } else if (cleanPrice.includes(',')) {
              cleanPrice = cleanPrice.replace(',', '.');
          }
          
          return {
            id: index + 1,
            name: name,
            unit: unit,
            price: parseFloat(cleanPrice) || 0
          };
        }).filter(item => item.price > 0 && item.name !== 'Bilinmeyen Hizmet'); 
        
        if (data.length > 0) setPricingData(data);
      } catch (error) {
        setPricingData([
          { id: 1, name: "Makine Halısı Yıkama", unit: "m²", price: 50 },
          { id: 2, name: "Koltuk Takımı Yıkama", unit: "Takım", price: 800 }
        ]);
      }
    };
    fetchPricing();
  }, []);

  const renderPage = () => {
    switch (route.page) {
      case 'home': return <Home navigate={navigate} pricingData={pricingData} />;
      case 'about': return <ContentPage title="Hakkımızda" type="about" itemName={siteConfig.firmaAdi} navigate={navigate} />;
      case 'service': return <ContentPage title={`${route.param} Hizmeti`} type="service" itemName={route.param} navigate={navigate} />;
      case 'carpet': return <ContentPage title={`${route.param} Yıkama`} type="carpet" itemName={route.param} navigate={navigate} />;
      case 'area': return <ContentPage title={`${route.param} Halı Yıkama Servisi`} type="area" itemName={route.param} navigate={navigate} />;
      case 'faq': return <FAQPage />;
      case 'prices': return <PricesPage pricingData={pricingData} />;
      case 'contact': return <ContactPage />;
      case 'legal': return <LegalPage title={route.param} type={route.param} />;
      default: return <Home navigate={navigate} pricingData={pricingData} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white w-full overflow-x-hidden">
      {/* GLOBAL RESET STYLE: 
          Vite varsayılan CSS'indeki kutu görünümünü zorla iptal eder 
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        #root { 
          max-width: 100% !important; 
          margin: 0 !important; 
          padding: 0 !important; 
          text-align: left !important;
          width: 100% !important;
          display: block !important;
        }
        body {
          margin: 0 !important;
          padding: 0 !important;
          display: block !important;
          place-items: initial !important;
          overflow-x: hidden !important;
          width: 100% !important;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #1e293b; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
      `}} />

      <script dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${siteConfig.gtmId}');`
      }} />

      <Header navigate={navigate} />
      
      <main className="flex-grow w-full">
        {renderPage()}
      </main>
      
      <Footer navigate={navigate} />
      <FloatingWhatsApp />
    </div>
  );
}