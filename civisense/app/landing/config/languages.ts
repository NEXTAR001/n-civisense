export type LanguageCode = 'en' | 'ha' | 'yo' | 'ig';

export type TranslationKey = 
  // App & Navigation
  | 'app.name'
  | 'app.tagline'
  | 'nav.home'
  | 'nav.services'
  | 'nav.howItWorks'
  | 'nav.about'
  | 'nav.signIn'
  
  // Hero Section
  | 'hero.badge'
  | 'hero.title1'
  | 'hero.titleHighlight1'
  | 'hero.title2'
  | 'hero.titleHighlight2'
  | 'hero.subtitle'
  | 'hero.cta.primary'
  | 'hero.cta.secondary'
  | 'hero.cards.language.title'
  | 'hero.cards.language.subtitle'
  | 'hero.cards.nimc.title'
  | 'hero.cards.nimc.subtitle'
  | 'hero.cards.chat.title'
  | 'hero.cards.chat.subtitle'
  
  // Info Section
  | 'info.features.language.title'
  | 'info.features.language.description'
  | 'info.features.ai.title'
  | 'info.features.ai.description'
  | 'info.features.verified.title'
  | 'info.features.verified.description'
  
  // How It Works Section
  | 'howItWorks.title'
  | 'howItWorks.steps.chooseService.title'
  | 'howItWorks.steps.chooseService.description'
  | 'howItWorks.steps.askInYourLanguage.title'
  | 'howItWorks.steps.askInYourLanguage.description'
  | 'howItWorks.steps.askInYourLanguage.customText'
  | 'howItWorks.steps.getGuidance.title'
  | 'howItWorks.steps.getGuidance.description'
  
  // Government Services Section
  | 'services.title1'
  | 'services.titleHighlight1'
  | 'services.title2'
  | 'services.titleHighlight2'
  | 'services.subtitle'
  | 'services.coreServices.title'
  | 'services.coreServices.description'
  | 'services.nimc.title'
  | 'services.nimc.description'
  | 'services.firs.title'
  | 'services.firs.description'
  | 'services.frsc.title'
  | 'services.frsc.description'
  | 'services.health.title'
  | 'services.health.description'
  | 'services.education.title'
  | 'services.education.description'
  | 'services.agriculture.title'
  | 'services.agriculture.description'
  
  // About Us Section
  | 'about.title'
  | 'about.description1'
  | 'about.description2'
  | 'about.features.nigerianTech.title'
  | 'about.features.nigerianTech.description'
  | 'about.features.coverage.title'
  | 'about.features.coverage.description'
  | 'about.features.madeInNigeria.title'
  | 'about.features.madeInNigeria.description'
  | 'about.developer.title'
  | 'about.developer.name'
  
  // Footer Section
  | 'footer.cta.title1'
  | 'footer.cta.title2'
  | 'footer.cta.button'
  | 'footer.brand.name'
  | 'footer.brand.tagline'
  | 'footer.links.title'
  | 'footer.links.home'
  | 'footer.links.services'
  | 'footer.links.about'
  | 'footer.links.contact'
  | 'footer.initiatives.title'
  | 'footer.initiatives.healthPrograms'
  | 'footer.initiatives.educationSupport'
  | 'footer.initiatives.agricultureSupport'
  | 'footer.contact.title'
  | 'footer.contact.email'
  | 'footer.contact.phone'
  | 'footer.legal.title'
  | 'footer.legal.terms'
  | 'footer.legal.privacy'
  | 'footer.legal.cookies'
  | 'footer.copyright'
  
  // Dashboard
  | 'dashboard.greeting'
  | 'dashboard.subtitle'
  | 'dashboard.placeholder'
  | 'dashboard.suggestions.passport'
  | 'dashboard.suggestions.license'
  | 'dashboard.suggestions.hospitals'

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  translations: Record<TranslationKey, string>;
}

export const languages: Record<LanguageCode, Language> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    translations: {
      // App & Navigation
      'app.name': 'n-CIVISENSE',
      'app.tagline': 'Nigeria\'s Indigenous AI for citizen support',
      'nav.home': 'Home',
      'nav.services': 'Services',
      'nav.howItWorks': 'How it Works',
      'nav.about': 'About',
      'nav.signIn': 'Sign In',
      
      // Hero Section
      'hero.badge': 'Powered by N-ATLas AI',
      'hero.title1': 'Access Government Services',
      'hero.titleHighlight1': 'Easily',
      'hero.title2': 'and in your',
      'hero.titleHighlight2': 'Own Language',
      'hero.subtitle': 'Nigeria\'s Indigenous AI for citizen support.',
      'hero.cta.primary': 'Start Using Services',
      'hero.cta.secondary': 'Learn more',
      'hero.cards.language.title': 'Your Language',
      'hero.cards.language.subtitle': '3 Options',
      'hero.cards.nimc.title': 'NIMC',
      'hero.cards.nimc.subtitle': 'NIN Services',
      'hero.cards.chat.title': 'AI Assistant',
      'hero.cards.chat.subtitle': '24/7 Support',
      
      // Info Section
      'info.features.language.title': 'Speak Your Language',
      'info.features.language.description': 'Hausa, Igbo, Yoruba, Pidgin & Nigerian accented English.',
      'info.features.ai.title': 'AI-Guided Assistance',
      'info.features.ai.description': 'Get step-by-step help for government services.',
      'info.features.verified.title': 'Verified Information',
      'info.features.verified.description': 'Backed by official data from authorized agencies.',
      
      // How It Works Section
      'howItWorks.title': 'How n-CIVISENSE Works',
      'howItWorks.steps.chooseService.title': 'Choose a Service',
      'howItWorks.steps.chooseService.description': 'NIMC, FIRS, FRSC, Health, Education, Agriculture',
      'howItWorks.steps.askInYourLanguage.title': 'Ask in Your Language',
      'howItWorks.steps.askInYourLanguage.description': 'N-ATLaS powered conversational interface',
      'howItWorks.steps.askInYourLanguage.customText': 'leave me alone',
      'howItWorks.steps.getGuidance.title': 'Get Reliable Guidance',
      'howItWorks.steps.getGuidance.description': 'NIMC, FIRS, FRSC, Health, Education, Agriculture',
      
      // Government Services Section
      'services.title1': 'Government',
      'services.titleHighlight1': 'Services',
      'services.title2': 'You Can',
      'services.titleHighlight2': 'Access',
      'services.subtitle': 'Connect with key government agencies and get instant support for your essential services all in one place.',
      'services.coreServices.title': 'Core Government Services',
      'services.coreServices.description': 'Access essential services from key government agencies NIN enrollment, tax filing, and driver\'s license management.',
      'services.nimc.title': 'National Identity Management Commission (NIMC)',
      'services.nimc.description': 'NIN enrollment, verification, replacement support.',
      'services.firs.title': 'Federal Inland Revenue Service (FIRS)',
      'services.firs.description': 'SME tax guidance and automated form assistance.',
      'services.frsc.title': 'Federal Road Safety Corps (FRSC)',
      'services.frsc.description': 'Driver\'s license, vehicle registration, status tracking.',
      'services.health.title': 'Health (Ministry of Health + NPHCDA)',
      'services.health.description': 'Vaccination campaigns, Maternal & child health, Verified clinic information',
      'services.education.title': 'Education (UBEC/SUBEB)',
      'services.education.description': 'School enrollment, Scholarship opportunities, Adult literacy programs, Exam registration support',
      'services.agriculture.title': 'Agriculture (FMARD)',
      'services.agriculture.description': 'Subsidies, Extension services, Market access, Farmer support initiatives',
      
      // About Us Section
      'about.title': 'About Us',
      'about.description1': 'CiviSense is a bespoke all-in-one intelligent app that provides information about core government parastatals, functions, public services and programs.',
      'about.description2': 'Built on top of N-ATLaS 1, Nigeria\'s first indigenous Large Language Model, n-CiviSense bridges the gap between citizens and government services.',
      'about.features.nigerianTech.title': 'Powered by Nigerian Technology:',
      'about.features.nigerianTech.description': 'Built with N-ATLaS 1, ensuring culturally relevant and contextually accurate responses.',
      'about.features.coverage.title': 'Comprehensive Coverage:',
      'about.features.coverage.description': 'Access information on government parastatals, public services, and citizen programs.',
      'about.features.madeInNigeria.title': 'Made in Nigeria, for Nigerians:',
      'about.features.madeInNigeria.description': 'A brainchild of NExtar Quantum Systems Ltd.',
      'about.developer.title': 'Developed by',
      'about.developer.name': 'NExtar Quantum Systems LTD',
      
      // Footer Section
      'footer.cta.title1': 'Ready to Access',
      'footer.cta.title2': 'Government Services?',
      'footer.cta.button': 'Get Started',
      'footer.brand.name': 'n-CIVISENSE',
      'footer.brand.tagline': 'Empowering Nigerian citizens with AI-powered access to government services in their own language.',
      'footer.links.title': 'Quick Links',
      'footer.links.home': 'Home',
      'footer.links.services': 'Services',
      'footer.links.about': 'About',
      'footer.links.contact': 'Contact',
      'footer.initiatives.title': 'Key Initiatives',
      'footer.initiatives.healthPrograms': 'Health Programs',
      'footer.initiatives.educationSupport': 'Education Support',
      'footer.initiatives.agricultureSupport': 'Agriculture Support',
      'footer.contact.title': 'Contact Us',
      'footer.contact.email': 'info@civisense.ng',
      'footer.contact.phone': '+234 800 000 0000',
      'footer.legal.title': 'Legal',
      'footer.legal.terms': 'Terms of Service',
      'footer.legal.privacy': 'Privacy Policy',
      'footer.legal.cookies': 'Cookies Policy',
      'footer.copyright': ' 2025 n-CIVISENSE. All rights reserved.',
      
      // Dashboard (English)
      'dashboard.greeting': 'Good Morning, Praise',
      'dashboard.subtitle': 'Ask questions. Get Services. In your languages',
      'dashboard.placeholder': 'Ask about our pilot govt services: FIRS, NIMC & FRSC',
      'dashboard.suggestions.passport': 'Track my passport application',
      'dashboard.suggestions.license': 'How do I apply for driver\'s license',
      'dashboard.suggestions.hospitals': 'Find nearby government hospitals',
    },
  },
  ha: {
    code: 'ha',
    name: 'Hausa',
    nativeName: 'Hausa',
    direction: 'rtl',
    translations: {
      // App & Navigation (Hausa)
      'app.name': 'n-CIVISENSE',
      'app.tagline': 'AI na asali na Najeriya don tallafin ɗan ƙasa',
      'nav.home': 'Gida',
      'nav.services': 'Ayyuka',
      'nav.howItWorks': 'Yaya Yake Aiki',
      'nav.about': 'Game da',
      'nav.signIn': 'Shiga',

      // Hero Section (Hausa)
      'hero.badge': 'An yi amfani da N-ATLas AI',
      'hero.title1': 'Samun damar ayyukan gwamnati',
      'hero.titleHighlight1': 'Cikin Sauƙi',
      'hero.title2': 'kuma cikin',
      'hero.titleHighlight2': 'Yarenku na asali',
      'hero.subtitle': 'AI na asali na Najeriya don tallafin ɗan ƙasa.',
      'hero.cta.primary': 'Fara Amfani da Ayyuka',
      'hero.cta.secondary': 'Ƙarin sani',
      'hero.cards.language.title': 'Harshenku',
      'hero.cards.language.subtitle': 'Zaɓuɓɓuka 3',
      'hero.cards.nimc.title': 'NIMC',
      'hero.cards.nimc.subtitle': 'Ayyukan NIN',
      'hero.cards.chat.title': 'Mataimakin AI',
      'hero.cards.chat.subtitle': 'Taimako 24/7',

      // Info Section (Hausa)
      'info.features.language.title': 'Yi Magana da Harshenku',
      'info.features.language.description': 'Hausa, Igbo, Yarbanci, Pidgin da Ingilishi na Najeriya.',
      'info.features.ai.title': 'Taimakon Jagorar AI',
      'info.features.ai.description': 'Samu taimako ta matakai-matakai don ayyukan gwamnati.',
      'info.features.verified.title': 'Bayanan da aka Tabbatar',
      'info.features.verified.description': 'An tabbatar da su ta hanyar bayanan hukuma daga hukumomin da suka cancanta.',

      // How It Works Section (Hausa)
      'howItWorks.title': 'Yadda n-CIVISENSE ke Aiki',
      'howItWorks.steps.chooseService.title': 'Zaɓi Sabis',
      'howItWorks.steps.chooseService.description': 'NIMC, FIRS, FRSC, Lafiya, Ilimi, Noma',
      'howItWorks.steps.askInYourLanguage.title': 'Yi Tambaya a Yarenka',
      'howItWorks.steps.askInYourLanguage.description': 'N-ATLaS powered conversational interface',
      'howItWorks.steps.askInYourLanguage.customText': 'hapu m aka',
      'howItWorks.steps.getGuidance.title': 'Samu Jagora Mataki Bayan Mataki',
      'howItWorks.steps.getGuidance.description': 'NIMC, FIRS, FRSC, Lafiya, Ilimi, Noma',
      
      // Government Services Section (Hausa)
      'services.title1': 'Gwamnati',
      'services.titleHighlight1': 'Ayyuka',
      'services.title2': 'Za ka iya',
      'services.titleHighlight2': 'Samu Damar',
      'services.subtitle': 'Haɗa kai da manyan hukumomin gwamnati kuma ka sami taimako nan take don muhimman ayyukanka duka a wuri ɗaya.',
      'services.coreServices.title': 'Babban Ayyukan Gwamnati',
      'services.coreServices.description': 'Samu damar yin amfani da muhimman ayyuka daga manyan hukumomin gwamnati kamar rajista ta NIN, biyan haraji, da kuma sarrafa lasisin tuki.',
      'services.nimc.title': 'Hukumar Kula da Bayanan Shaida ta Ƙasa (NIMC)',
      'services.nimc.description': 'Rajista ta NIN, tabbatarwa, tallafin maye gurbin takardun shaida.',
      'services.firs.title': 'Hukumar Kula da Harajin Cikin Gida ta Tarayya (FIRS)',
      'services.firs.description': 'Jagorar haraji ga ƙananan kasuwanci da taimakon cike fom ɗin ta atomatik.',
      'services.frsc.title': 'Hukumar Kula da Tsaron Hanyoyi ta Tarayya (FRSC)',
      'services.frsc.description': 'Lasisin tuki, rajistar mota, da duba matsayin takardun ku.',
      'services.health.title': 'Lafiya (Ma\'aikatar Lafiya + NPHCDA)',
      'services.health.description': 'Yakinin rigakafi, lafiyar uwa da yara, cikakken bayanin asibitoci da aka tabbatar.',
      'services.education.title': 'Ilimi (UBEC/SUBEB)',
      'services.education.description': 'Rajista a makarantu, damar samun tallafin karatu, shirye-shiryen karatun manya, tallafin rajista jarrabawa.',
      'services.agriculture.title': 'Noma (Ma\'aikatar Noma ta Tarayya)',
      'services.agriculture.description': 'Tallafin noma, ayyukan taimakawa manoma, damar kasuwa, shirye-shiryen tallafawa manoma.',
      
      // About Us Section (Hausa)
      'about.title': 'Game da Mu',
      'about.description1': 'CiviSense wani ingantaccen aikace-aikace ne na wayar hannu wanda ke ba da bayanai game da manyan hukumomin gwamnati, ayyukansu, ayyukan jama\'a da shirye-shirye.',
      'about.description2': 'An gina shi a saman N-ATLaS 1, babban samfurin harshe na farko na asali na Najeriya, n-CiviSense yana kawar da gibin da ke tsakanin ƴan ƙasa da ayyukan gwamnati.',
      'about.features.nigerianTech.title': 'An Ƙirƙira ta Fasahar Nijeriya:',
      'about.features.nigerianTech.description': 'An gina shi tare da N-ATLaS 1, yana tabbatar da ingantattun amsoshi masu dacewa da al\'adu da mahallin.',
      'about.features.coverage.title': 'Cikakken Rufe Kowane Bangare:',
      'about.features.coverage.description': 'Samu damar yin amfani da bayanai kan hukumomin gwamnati, ayyukan jama\'a, da shirye-shiryen ƴan ƙasa.',
      'about.features.madeInNigeria.title': 'An Ƙirƙira a Nijeriya, Don Ƴan Nijeriya:',
      'about.features.madeInNigeria.description': 'Ɗan asalin NExtar Quantum Systems Ltd.',
      'about.developer.title': 'Mai Haɓakawa',
      'about.developer.name': 'NExtar Quantum Systems LTD',
      
      // Footer Section (Hausa)
      'footer.cta.title1': 'Shirya Ka Samu Damar',
      'footer.cta.title2': 'Ayyukan Gwamnati?',
      'footer.cta.button': 'Fara Amfani',
      'footer.brand.name': 'n-CIVISENSE',
      'footer.brand.tagline': 'Ƙarfafa ƴan Nijeriya tare da damar samun damar yin amfani da ayyukan gwamnati ta hanyar AI cikin yarensu na asali.',
      'footer.links.title': 'Hanyoyin Da Sauru',
      'footer.links.home': 'Gida',
      'footer.links.services': 'Ayyuka',
      'footer.links.about': 'Game da Mu',
      'footer.links.contact': 'Tuntuɓi Mu',
      'footer.initiatives.title': 'Manyan Shirye-shirye',
      'footer.initiatives.healthPrograms': 'Shirye-shiryen Lafiya',
      'footer.initiatives.educationSupport': 'Tallafin Ilimi',
      'footer.initiatives.agricultureSupport': 'Tallafin Noma',
      'footer.contact.title': 'Tuntuɓi Mu',
      'footer.contact.email': 'info@civisense.ng',
      'footer.contact.phone': '+234 800 000 0000',
      'footer.legal.title': 'Dokoki',
      'footer.legal.terms': 'Sharuɗɗan Amfani',
      'footer.legal.privacy': 'Manufar Keɓantawa',
      'footer.legal.cookies': 'Manufar Kukis',
      'footer.copyright': ' 2025 n-CIVISENSE. Duk haƙƙoƙin ajiye suke.',
      
      // Dashboard (Hausa)
      'dashboard.greeting': 'Barka da Safiya, Praise',
      'dashboard.subtitle': 'Yi tambayoyi. Samu Ayyuka. A cikin harshenku',
      'dashboard.placeholder': 'Yi tambaya game da ayyukan gwamnati: FIRS, NIMC & FRSC',
      'dashboard.suggestions.passport': 'Duba matsayin takardar shaidar fasinja ta',
      'dashboard.suggestions.license': 'Yaya zan nemi lasisin tuki',
      'dashboard.suggestions.hospitals': 'Nemo asibitocin gwamnati kusa da ku',
    },
  },
  yo: {
    code: 'yo',
    name: 'Yoruba',
    nativeName: 'Yorùbá',
    direction: 'ltr',
    translations: {
      // App & Navigation (Yoruba)
      'app.name': 'n-CIVISENSE',
      'app.tagline': 'AI ti orilẹ-ede Naijiria fun atilẹyin ọmọ ilu',
      'nav.home': 'Ile',
      'nav.services': 'Awọn iṣẹ',
      'nav.howItWorks': 'Bawo Ni O Ṣe Nṣiṣẹ',
      'nav.about': 'Nipa',
      'nav.signIn': 'Wọle',

      // Hero Section (Yoruba)
      'hero.badge': 'Ti N-ATLas AI ṣe',
      'hero.title1': 'Wọ iṣẹ ijọba',
      'hero.titleHighlight1': 'Ni Irọrun',
      'hero.title2': 'ati ni rẹ',
      'hero.titleHighlight2': 'Ede ti Ara Ẹni',
      'hero.subtitle': 'AI ti orilẹ-ede Naijiria fun atilẹyin ọmọ ilu.',
      'hero.cta.primary': 'Bẹrẹ Lilo Awọn Iṣẹ',
      'hero.cta.secondary': 'Kọ ẹkunkun siwaju sii',
      'hero.cards.language.title': 'Ede Rẹ',
      'hero.cards.language.subtitle': 'Aṣayan 3',
      'hero.cards.nimc.title': 'NIMC',
      'hero.cards.nimc.subtitle': 'Awọn iṣẹ NIN',
      'hero.cards.chat.title': 'Alaabojuto AI',
      'hero.cards.chat.subtitle': 'Atilẹyin 24/7',

      // Info Section (Yoruba)
      'info.features.language.title': 'Sọrọ ni Ede Rẹ',
      'info.features.language.description': 'Hausa, Igbo, Yorùbá, Pidgin ati Gẹẹsi ti orilẹ-ede Naijiria.',
      'info.features.ai.title': 'Irawo Ọlọjẹ AI',
      'info.features.ai.description': 'Gba iranlọwọ lọtọọlọtọọ fun awọn iṣẹ ijọba.',
      'info.features.verified.title': 'Alaye Ti A Ṣe Ijẹrisi',
      'info.features.verified.description': 'Ti atilẹyin nipasẹ alaye gbọngbọn lati awọn ẹka iṣẹ ti a fi ẹtọ fun.',

      // How It Works Section (Yoruba)
      'howItWorks.title': 'Bawo ni n-CIVISENSE Ṣe Nṣiṣẹ',
      'howItWorks.steps.chooseService.title': 'Yan Iṣẹ Kan',
      'howItWorks.steps.chooseService.description': 'NIMC, FIRS, FRSC, Ilera, Ẹkọ, Ọgbìn',
      'howItWorks.steps.askInYourLanguage.title': 'Bẹ̀rẹ̀ Láti Bá Ọ Sọ̀rọ̀ Ní Èdè Rẹ',
      'howItWorks.steps.askInYourLanguage.description': 'N-ATLaS powered conversational interface',
      'howItWorks.steps.askInYourLanguage.customText': 'hapu m aka',
      'howItWorks.steps.getGuidance.title': 'Gba Itọsọna Lọtọọlọtọọ',
      'howItWorks.steps.getGuidance.description': 'NIMC, FIRS, FRSC, Ilera, Ẹkọ, Ọgbìn',
      
      // Government Services Section (Yoruba)
      'services.title1': 'Iṣẹ Ijọba',
      'services.titleHighlight1': 'Ti O Wọ',
      'services.title2': 'O Le',
      'services.titleHighlight2': 'Wọ',
      'services.subtitle': 'Ṣopọ mọ́ àwọn àjọ àgbà tí ó ṣe pàtàkì jùlọ tí ń rí sí iṣẹ́ ìjọba, kí o sì gba ìrànlọ́wọ́ lásìkò tó yẹ fún gbogbo àwọn iṣẹ́ rẹ ní ibì kan ṣoṣo.',
      'services.coreServices.title': 'Àwọn Iṣẹ́ Pàtàkì ti Ijọba',
      'services.coreServices.description': 'Wọ àwọn iṣẹ́ pàtàkì láti ọ̀dọ̀ àwọn àjọ àgbà tí ó ṣe pàtàkì jùlọ tí ń rí sí iṣẹ́ ìjọba bíi fọ́rọ̀wọ́rọ́ NIN, iṣẹ́ ìwé-ìròyìn, àti iṣakoso iwé-ẹ̀rí ìjáde lórí ẹ̀rọ ayára.',
      'services.nimc.title': 'Igbimọ Iṣakoso Ọjọgbọn ti Orílẹ̀-èdè (NIMC)',
      'services.nimc.description': 'Ìforúkọsílẹ̀ NIN, ìjẹrìí, àtìlẹ̀yìn fún iwé-ẹ̀rí ìdánimọ̀ tuntun.',
      'services.firs.title': 'Ìjọba Alákòóso Ọ̀rọ̀-ajé àti Ọ̀rọ̀-ọrọ̀ (FIRS)',
      'services.firs.description': 'Ìtọ́sọ́nà ìwọ́n-òwú fún àwọn iṣẹ́ kékèrẹ́ kékeré àti ìrànlọ́wọ́ fọ́ọ̀mù ẹ̀rọ-ìbánisọ̀rọ̀.',
      'services.frsc.title': 'Ẹgbẹ́ Ìdáàbòbò Ònà (FRSC)',
      'services.frsc.description': 'Ìwé-ẹ̀rí ìjáde lórí ẹ̀rọ ayára, ìforúkọsílẹ̀ ọkọ̀, àti àyẹ̀wò ipò rẹ̀.',
      'services.health.title': 'Ìlera (Ìjọba Alákòóso Ìlera + NPHCDA)',
      'services.health.description': 'Ìpolongo ìgbèrù àjèjì, Ìlera ìyá àti ọmọ, Àwọn ìtọ́sọ́nà ẹ̀kọ́ tí a jẹ́rìí sí.',
      'services.education.title': 'Ẹ̀kọ́ (UBEC/SUBEB)',
      'services.education.description': 'Ìforúkọsílẹ̀ ilé-ẹ̀kọ́, Àwọn àǹfààní ẹ̀bùn-ẹ̀kọ́, Àwọn ètò ẹ̀kọ́ àwọn àgbà, Ìrànlọ́wọ́ ìforúkọsílẹ̀ ìdánwò.',
      'services.agriculture.title': 'Àgbẹ̀ (FMARD)',
      'services.agriculture.description': 'Ìrànlọ́wọ́ lórí oúnjẹ, Àwọn iṣẹ́ ìrànlọ́wọ́ àgbẹ̀, Àǹfààní ọjà, Àwọn ìgbésẹ́ ìrànlọ́wọ́ àgbẹ̀.',
      
      // About Us Section (Yoruba)
      'about.title': 'Nipa Wa',
      'about.description1': 'CiviSense jẹ́ ohun èlò aláǹfàní tí ó ní ìmọ̀-ọ̀rọ̀ nípa àwọn ẹ̀ka ìjọba, àwọn iṣẹ́ wọn, àwọn iṣẹ́ ìjọba àti àwọn ètò tí ó wà fún gbogbo ènìyàn.',
      'about.description2': 'A gbé kalẹ̀ lórí N-ATLaS 1, ẹ̀rọ ẹ̀rọ tí ó pọ̀ jùlọ tí a kọ́kọ́ ṣe ní orílẹ̀-èdè Nàìjíríà, n-CiviSense ń ṣe àlàyé àwọn ìyàtọ̀ láàrín àwọn ọmọ orílẹ̀-èdè àti àwọn iṣẹ́ ìjọba.',
      'about.features.nigerianTech.title': 'A Ṣe Pẹ̀lú Ẹ̀rọ Ọjọ́gbọ́n ti Orílẹ̀-èdè Nàìjíríà:',
      'about.features.nigerianTech.description': 'A ṣe pẹ̀lú N-ATLaS 1, ní ìdíléè ṣíṣe ìrànlọ́wọ́ tí ó bá àwọn ìtumọ̀ tí ó bá àwọn ọ̀rọ̀ àti àwọn ìtumọ̀ tí ó wà nínú èdè rẹ.',
      'about.features.coverage.title': 'Ìkópa Gbogbogbò:',
      'about.features.coverage.description': 'Wọ àwọn alaye lórí àwọn ẹ̀ka ìjọba, àwọn iṣẹ́ ìjọba, àti àwọn ètò fún àwọn ọmọ orílẹ̀-èdè.',
      'about.features.madeInNigeria.title': 'A Ṣe Ní Orílẹ̀-èdè Nàìjíríà, Fún Àwọn Ọmọ Orílẹ̀-èdè Nàìjíríà:',
      'about.features.madeInNigeria.description': 'Ọmọ ẹgbẹ́ NExtar Quantum Systems Ltd.',
      'about.developer.title': 'A Ṣe Pẹ̀lú',
      'about.developer.name': 'NExtar Quantum Systems LTD',
      
      // Footer Section (Yoruba)
      'footer.cta.title1': 'Ṣetán Láti Wọ',
      'footer.cta.title2': 'Àwọn Iṣẹ́ Ìjọba?',
      'footer.cta.button': 'Bẹ̀rẹ̀ Ní Bayìí',
      'footer.brand.name': 'n-CIVISENSE',
      'footer.brand.tagline': 'Ṣíṣe àwọn ọmọ orílẹ̀-èdè Nàìjíríà lágbára pẹ̀lú ìrànlọ́wọ́ AI láti wọ àwọn iṣẹ́ ìjọba ní èdè tí wọ́n mọ̀ dáadáa.',
      'footer.links.title': 'Àwọn Ọ̀nà Wẹ́wẹ́',
      'footer.links.home': 'Ilé',
      'footer.links.services': 'Àwọn Iṣẹ́',
      'footer.links.about': 'Nipa Wa',
      'footer.links.contact': 'Bá Wa Sọ̀rọ̀',
      'footer.initiatives.title': 'Àwọn Ìgbésẹ́ Pàtàkì',
      'footer.initiatives.healthPrograms': 'Àwọn Ètò Ìlera',
      'footer.initiatives.educationSupport': 'Ìrànlọ́wọ́ Ẹ̀kọ́',
      'footer.initiatives.agricultureSupport': 'Ìrànlọ́wọ́ Agbẹ̀',
      'footer.contact.title': 'Bá Wa Sọ̀rọ̀',
      'footer.contact.email': 'info@civisense.ng',
      'footer.contact.phone': '+234 800 000 0000',
      'footer.legal.title': 'Òfin',
      'footer.legal.terms': 'Àwọn Òfin Lórí Lílo',
      'footer.legal.privacy': 'Ìpamọ́ Àwọn Àṣírí',
      'footer.legal.cookies': 'Awọn Ilana Kuki',
      'footer.copyright': ' 2025 n-CIVISENSE. Gbogbo ẹtọ wa ni ipamọ.',
      
      // Dashboard (Yoruba)
      'dashboard.greeting': 'E kaaro, Praise',
      'dashboard.subtitle': 'Beere ibeere. Gba Awọn Iṣẹ. Ni awọn ede rẹ',
      'dashboard.placeholder': 'Beere nipa awọn iṣẹ ijoba wa: FIRS, NIMC & FRSC',
      'dashboard.suggestions.passport': 'Ṣayẹwo ipaṣẹ iwọle rẹ',
      'dashboard.suggestions.license': 'Bawo ni mo ṣe le beere iwe-aṣẹ ṣiṣẹ ẹrọ ayọkẹlẹ',
      'dashboard.suggestions.hospitals': 'Wa awọn ile iwosan ijoba nitosi',
    },
  },
  ig: {
    code: 'ig',
    name: 'Igbo',
    nativeName: 'Asụsụ Igbo',
    direction: 'ltr',
    translations: {
      // App & Navigation (Igbo)
      'app.name': 'n-CIVISENSE',
      'app.tagline': 'AI nke ala anyị Naijiria maka nkwado nwa amaala',
      'nav.home': 'Nke Mbụ',
      'nav.services': 'Ọrụ',
      'nav.howItWorks': 'Otu O Si Arụ Ọrụ',
      'nav.about': 'Banyere',
      'nav.signIn': 'Banye',

      // Hero Section (Igbo)
      'hero.badge': 'N-ATLas AI na-arụ ọrụ',
      'hero.title1': 'Nweta Ọrụ Gọọmentị',
      'hero.titleHighlight1': 'N\'ụzọ Dị Mfe',
      'hero.title2': 'ma n\'asụsụ',
      'hero.titleHighlight2': 'Gị Onwe Gị',
      'hero.subtitle': 'AI nke ala anyị Naijiria maka nkwado nwa amaala.',
      'hero.cta.primary': 'Malite Iji Ọrụ',
      'hero.cta.secondary': 'Mụtakwuo',
      'hero.cards.language.title': 'Asụsụ Gị',
      'hero.cards.language.subtitle': 'Nhọrọ 3',
      'hero.cards.nimc.title': 'NIMC',
      'hero.cards.nimc.subtitle': 'Ọrụ NIN',
      'hero.cards.chat.title': 'Onye Enyemaka AI',
      'hero.cards.chat.subtitle': 'Nkwado 24/7',

      // Info Section (Igbo)
      'info.features.language.title': 'Sụọ Asụsụ Gị',
      'info.features.language.description': 'Hausa, Igbo, Yoruba, Pidgin na Bekee nke Naijiria.',
      'info.features.ai.title': 'Enyemaka AI Na-eduzi',
      'info.features.ai.description': 'Nweta enyemaka nke ọma maka ọrụ gọọmentị.',
      'info.features.verified.title': 'Ozi Emechara N\'ezie',
      'info.features.verified.description': 'Akwado ya site na data gọọmentị sitere n\'aka ndị ọrụ ikike.',

      // How It Works Section (Igbo)
      'howItWorks.title': 'Ka n-CIVISENSE si Arụ Ọrụ',
      'howItWorks.steps.chooseService.title': 'Họrọ Ọrụ',
      'howItWorks.steps.chooseService.description': 'NIMC, FIRS, FRSC, Ahụike, Agụmakwụkwọ, Ọrụ Ugbo',
      'howItWorks.steps.askInYourLanguage.title': 'Jụọ n\'asụsụ gị',
      'howItWorks.steps.askInYourLanguage.description': 'N-ATLaS powered conversational interface',
      'howItWorks.steps.askInYourLanguage.customText': 'hapu m aka',
      'howItWorks.steps.getGuidance.title': 'Nweta Ntụzịaka Nke Ọma',
      'howItWorks.steps.getGuidance.description': 'NIMC, FIRS, FRSC, Ahụike, Agụmakwụkwọ, Ọrụ Ugbo',
      
      // Government Services Section (Igbo)
      'services.title1': 'Gọọmentị',
      'services.titleHighlight1': 'Ọrụ',
      'services.title2': 'Ị nwere ike',
      'services.titleHighlight2': 'Nweta',
      'services.subtitle': 'Jikọọ na ndị isi ụlọ ọrụ gọọmentị ma nweta enyemaka ozugbo maka ọrụ gị niile n\'otu ebe.',
      'services.coreServices.title': 'Isi Ọrụ Gọọmentị',
      'services.coreServices.description': 'Nweta ohere ịnweta ọrụ ndị dị mkpa site n\'aka ụlọ ọrụ gọọmentị dị ka ndebanye aha NIN, ịkwụ ụtụ isi, na njikwa akwụkwọ ikike ịnya ụgbọ ala.',
      'services.nimc.title': 'Ụlọ Ọrụ Na-ahụ Maka Ọrụ Ọchịchị n\'Ọha (NIMC)',
      'services.nimc.description': 'Ndebanye aha NIN, nyocha, nkwado maka nnọchi akwụkwọ.',
      'services.firs.title': 'Ụlọ Ọrụ Na-ahụ Maka Ụtụ Isi Na-akpata n\'ime Obodo (FIRS)',
      'services.firs.description': 'Ntụziaka ụtụ isi maka obere ụlọ ọrụ na enyemaka akpaakpọrọ fọm.',
      'services.frsc.title': 'Ndị Ọrụ Nchekwa Okporo Ụzọ Federal (FRSC)',
      'services.frsc.description': 'Akwụkwọ ikike ịnya ụgbọ ala, ndebanye aha ụgbọ ala, na nlele ọnọdụ akwụkwọ ikike gị.',
      'services.health.title': 'Ahụike (Ìjọba Alákòóso Ìlera + NPHCDA)',
      'services.health.description': 'Mgbasa ozi ịgba ọgwụ mgbochi, Ahụike nne na nwa, Ozi ụlọ ọgwụ enwetara nkwenye.',
      'services.education.title': 'Agụmakwụkwọ (UBEC/SUBEB)',
      'services.education.description': 'Ndebanye aha ụlọ akwụkwọ, Ohere inweta agụmakwụkwọ, Mmemme ịgụ na ide nke ndị okenye, Nkwado ndebanye aha ule.',
      'services.agriculture.title': 'Ọrụ Ugbo (FMARD)',
      'services.agriculture.description': 'Enyemaka ego, Ọrụ agụmakwụkwọ, Ịnweta ahịa, Atụmatụ nkwado ndị ọrụ ugbo.',
      
      // About Us Section (Igbo)
      'about.title': 'Banyere Anyị',
      'about.description1': 'CiviSense bụ ngwa ọgụgụ isi zuru oke nke na-enye ozi gbasara isi ụlọ ọrụ gọọmentị, ọrụ ha, ọrụ ọha na eze na mmemme.',
      'about.description2': 'Ewubere ya na N-ATLaS 1, ụdị asụsụ nnukwu nke mbụ nke Naijiria, n-CiviSense na-emejupụta ọdịiche dị n\'etiti ụmụ amaala na ọrụ gọọmentị.',
      'about.features.nigerianTech.title': 'Ejiri Teknụzụ nke Naijiria rụọ ya:',
      'about.features.nigerianTech.description': 'Ewubere ya na N-ATLaS 1, na-ahụ na nzaghachi dabara n\'ọdịbendị na ọnọdụ gburugburu ebe obibi.',
      'about.features.coverage.title': 'Mkpuchi zuru oke:',
      'about.features.coverage.description': 'Nweta ohere ịnweta ozi gbasara ụlọ ọrụ gọọmentị, ọrụ ọha na eze, na mmemme ụmụ amaala.',
      'about.features.madeInNigeria.title': 'Emere ya na Naijiria, Maka Ndị Naijiria:',
      'about.features.madeInNigeria.description': 'Ụmụaka nke NExtar Quantum Systems Ltd.',
      'about.developer.title': 'Mepụtara site na',
      'about.developer.name': 'NExtar Quantum Systems LTD',
      
      // Footer Section (Igbo)
      'footer.cta.title1': 'Dị njikere ịnweta',
      'footer.cta.title2': 'Ọrụ Gọọmentị?',
      'footer.cta.button': 'Bido Ugbu a',
      'footer.brand.name': 'n-CIVISENSE',
      'footer.brand.tagline': 'Na-enye ndị Naijiria ike site na ohere ịnweta ọrụ gọọmentị site na AI n\'asụsụ ha.',
      'footer.links.title': 'Njikọ Ngwa Ngwa',
      'footer.links.home': 'Ụlọ',
      'footer.links.services': 'Ọrụ',
      'footer.links.about': 'Banyere Anyị',
      'footer.links.contact': 'Kpọtụrụ Anyị',
      'footer.initiatives.title': 'Atụmatụ Dị Mkpa',
      'footer.initiatives.healthPrograms': 'Mmemme Ahụike',
      'footer.initiatives.educationSupport': 'Nkwado Agụmakwụkwọ',
      'footer.initiatives.agricultureSupport': 'Nkwado Ọrụ Ugbo',
      'footer.contact.title': 'Kpọtụrụ Anyị',
      'footer.contact.email': 'info@civisense.ng',
      'footer.contact.phone': '+234 800 000 0000',
      'footer.legal.title': 'Iwu',
      'footer.legal.terms': 'Usoro Ọrụ',
      'footer.legal.privacy': 'Amụma Nzuzo',
      'footer.legal.cookies': 'Iwu nke Kuki',
      'footer.copyright': ' 2025 n-CIVISENSE. Ikike niile echekwabara.',
      
      // Dashboard (Igbo)
      'dashboard.greeting': 'Ụtụtụ ọma, Praise',
      'dashboard.subtitle': 'Jụọ ajụjụ. Nweta Ọrụ. N\'asụsụ gị',
      'dashboard.placeholder': 'Jụọ gbasara ọrụ gọọmentị anyị: FIRS, NIMC & FRSC',
      'dashboard.suggestions.passport': 'Soro ngwa paspọtụ m',
      'dashboard.suggestions.license': 'Olee otú m ga-esi tinye akwụkwọ maka akwụkwọ ikike ịnya ụgbọ ala',
      'dashboard.suggestions.hospitals': 'Chọta ụlọ ọgwụ gọọmentị dị nso',
    },
  },
};

export const defaultLanguage: LanguageCode = 'en';

export const languageList = Object.values(languages);
