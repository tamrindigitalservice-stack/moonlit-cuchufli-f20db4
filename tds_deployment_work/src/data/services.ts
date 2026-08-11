export interface ServiceItem {
  id: string;
  category: 'central' | 'wb' | 'west_bengal' | 'other';
  titleBengali: string;
  titleEnglish: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  documents: string[];
  turnaroundTime: string;
  isPopular?: boolean;
  isActive?: boolean;
}

export interface BusinessInfo {
  name: string;
  shortName: string;
  taglineEnglish: string;
  taglineBengali: string;
  sloganPoster: string;
  address: string;
  area: string;
  pin: string;
  district: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: string;
  mapQuery: string;
}

export const BUSINESS_INFO: BusinessInfo = {
  name: "Tamrin Digital Service",
  shortName: "TDS",
  taglineEnglish: "Easy Service, Better Life",
  taglineBengali: "সরকারি কাজ এখন অনলাইনে",
  sloganPoster: "আপনার কাজ আমাদের দায়িত্ব",
  address: "NATUN BAZAR, RAMNAGAR, PASCHIM MEDINIPUR, 721305",
  area: "নতুন বাজার, রামনগর",
  district: "পশ্চিম মেদিনীপুর, ৭২১৩০৫",
  pin: "721305",
  phone: "9635191520",
  whatsapp: "919635191520",
  email: "tamrindigitalservice@gmail.com",
  hours: "সোম - শনি: সকাল ৯:০০ - রাত ৮:০০",
  mapQuery: "Natun Bazar, Ramnagar, Paschim Medinipur, 721305"
};

export const CENTRAL_SERVICES: ServiceItem[] = [
  {
    id: "aadhaar",
    category: "central",
    titleBengali: "আধার কার্ড",
    titleEnglish: "Aadhaar Card Services",
    iconName: "Fingerprint",
    shortDesc: "নাম সংশোধন, ঠিকানা পরিবর্তন, মোবাইল নম্বর লিঙ্ক ও বায়োমেট্রিক আপডেট সহায়তা।",
    fullDesc: "আধার কার্ডের নতুন এনরোলমেন্ট স্ট্যাটাস চেক, নাম, ঠিকানা, জন্মতারিখ ও পিতা/স্বামীর নাম সংশোধন এবং মোবাইল নম্বর লিঙ্কিং সম্পর্কিত অনলাইন সহায়তা।",
    documents: [
      "পরিচয়পত্র (ভোটের কার্ড / প্যান কার্ড / ড্রাইভিং লাইসেন্স)",
      "ঠিকানার প্রমাণ (রেশন কার্ড / ব্যাংকের পাসবুক / বিদ্যুৎ বিল)",
      "জন্মতারিখের প্রমাণ (জন্ম সনদ / মাধ্যমিক অ্যাডমিট কার্ড)",
      "লিঙ্ক থাকা সক্রিয় মোবাইল নম্বর"
    ],
    turnaroundTime: "৭ - ১৫ কার্যদিবস",
    isPopular: true
  },
  {
    id: "pan",
    category: "central",
    titleBengali: "প্যান কার্ড",
    titleEnglish: "PAN Card Services",
    iconName: "CreditCard",
    shortDesc: "নতুন PAN কার্ড আবেদন, ভুল সংশোধন ও Instant e-PAN ডাউনলোড।",
    fullDesc: "নতুন প্যান কার্ড তৈরি, বিদ্যমান প্যান কার্ডের নাম, ছবি, স্বাক্ষর বা জন্মতারিখ সংশোধন এবং আধারের মাধ্যমে ৩ মিনিটের মধ্যে e-PAN ডাউনলোডের কাজ।",
    documents: [
      "আধার কার্ড (বাধ্যতামূলক)",
      "২ কপি সম্প্রতি তোলা পাসপোর্ট সাইজ ছবি (ফিজিক্যাল ফর্মের জন্য)",
      "সক্রিয় মোবাইল নম্বর",
      "প্যান কার্ডে ভুলের প্রমাণ নথি (সংশোধনের ক্ষেত্রে)"
    ],
    turnaroundTime: "e-PAN: ১ দিন, Physical Card: ৭-১০ দিন",
    isPopular: true
  },
  {
    id: "passport",
    category: "central",
    titleBengali: "পাসপোর্ট সার্ভিস",
    titleEnglish: "Passport Services",
    iconName: "Globe",
    shortDesc: "নতুন পাসপোর্ট আবেদন, রিনিউয়াল ও অ্যাপয়েন্টমেন্ট বুকিং।",
    fullDesc: "নতুন সাধারণ (Fresh Passport) ও তৎকাল পাসপোর্টের অনলাইন আবেদনপত্র পূরণ ও পাসপোর্ট সেবা কেন্দ্রে অ্যাপয়েন্টমেন্ট স্লট বুকিং সহায়তা।",
    documents: [
      "আধার কার্ড ও ভোটের কার্ড",
      "প্যান কার্ড ও ব্যাংক পাসবুক (১ বছরের লেনদেন সহ)",
      "জন্ম সনদ বা মাধ্যমিক বোর্ড পরীক্ষার অ্যাডমিট কার্ড",
      "অভিভাবকের আধার কার্ড (নাবালকদের ক্ষেত্রে)"
    ],
    turnaroundTime: "পুলিশ ভেরিফিকেশন সাপেক্ষে ১৫-২১ দিন",
    isPopular: true
  },
  {
    id: "income_tax",
    category: "central",
    titleBengali: "আয়কর রিটার্ন",
    titleEnglish: "Income Tax Return (ITR)",
    iconName: "Receipt",
    shortDesc: "ITR Filing, e-PAN, ফর্ম 26AS ও TDS সংক্রান্ত সহায়তা।",
    fullDesc: "ব্যক্তিগত ও ক্ষুদ্র ব্যবসায়ীদের বার্ষিক আয়কর রিটার্ন (ITR 1 / ITR 4) ফাইল করা, TDS রিফান্ড দাবি ও ফর্ম 26AS সম্পর্কিত সহজ নির্দেশনা।",
    documents: [
      "প্যান কার্ড ও আধার কার্ড",
      "সমস্ত ব্যাংক অ্যাকাউন্টের বিবরণ ও স্টেটমেন্ট",
      "ফর্ম 16 (চাকরিজীবীদের জন্য)",
      "বিনিয়োগের রশিদ (LIC, PPF, ইত্যাদি যদি থাকে)"
    ],
    turnaroundTime: "১ - ৩ কার্যদিবস",
    isPopular: false
  },
  {
    id: "pmjdy",
    category: "central",
    titleBengali: "প্রধানমন্ত্রী জনধন যোজনা",
    titleEnglish: "PM Jan Dhan Yojana",
    iconName: "Landmark",
    shortDesc: "জিরো ব্যালেন্স অ্যাকাউন্ট খোলা ও রুপে কার্ড সহায়তা।",
    fullDesc: "প্রধানমন্ত্রী জনধন যোজনার অধীনে জিরো ব্যালেন্স সেভিংস অ্যাকাউন্ট খোলার ফর্ম পূরণ, রুপে ডেবিট কার্ড ও বীমা সুবিধার জন্য অনলাইন আবেদন।",
    documents: [
      "আধার কার্ড",
      "ভোটের কার্ড / পাসপোর্ট সাইজ ছবি",
      "সক্রিয় মোবাইল নম্বর"
    ],
    turnaroundTime: "৩ - ৫ কার্যদিবস",
    isPopular: false
  },
  {
    id: "pmuy",
    category: "central",
    titleBengali: "প্রধানমন্ত্রী উজ্জ্বলা যোজনা",
    titleEnglish: "PM Ujjwala Yojana (PMUY)",
    iconName: "Flame",
    shortDesc: "বিনামূল্যে এলপিজি গ্যাস সংযোগ আবেদন।",
    fullDesc: "উজ্জ্বলা যোজনা ২.০-এর অধীনে গ্রামীণ ও সুবিধাবঞ্চিত পরিবারের মহিলাদের বিনামূল্যে এলপিজি গ্যাস কানেকশনের অনলাইন ফর্ম পূরণ।",
    documents: [
      "আবেদনকারীর (মহিলা) আধার কার্ড ও ফটো",
      "পরিবারের সকল প্রাপ্তবয়স্ক সদস্যের আধার কার্ড",
      "রেশন কার্ড",
      "ব্যাংক পাসবুক (আধার লিঙ্কযুক্ত)"
    ],
    turnaroundTime: "৭ - ১৫ কার্যদিবস",
    isPopular: false
  },
  {
    id: "pmkisan",
    category: "central",
    titleBengali: "পিএম কিষান সম্মান নিধি",
    titleEnglish: "PM Kisan Samman Nidhi",
    iconName: "Sprout",
    shortDesc: "নতুন রেজিস্ট্রেশন, e-KYC ও স্ট্যাটাস চেক।",
    fullDesc: "কৃষকদের জন্য বার্ষিক ৬,০০০ টাকা আর্থিক সহায়তার নতুন নাম নথিভুক্তকরণ, মোবাইল/বায়োমেট্রিক e-KYC সম্পাদন ও কিস্তির টাকা জমার স্ট্যাটাস চেক।",
    documents: [
      "কৃষকের আধার কার্ড",
      "জমির খতিয়ান / পরচা / দাগের তথ্য",
      "আধার লিঙ্কড ব্যাংক পাসবুক",
      "মোবাইল নম্বর"
    ],
    turnaroundTime: "ভেরিফিকেশন সাপেক্ষে",
    isPopular: true
  },
  {
    id: "digilocker",
    category: "central",
    titleBengali: "DigiLocker",
    titleEnglish: "DigiLocker Services",
    iconName: "Lock",
    shortDesc: "ডিজিটাল নথি আপলোড, ভেরিফিকেশন ও ডাউনলোড।",
    fullDesc: "ডিজিলকার অ্যাকাউন্ট তৈরি, ড্রাইভিং লাইসেন্স, মার্কশিট, গাড়ির আরসি ও সরকারি প্রশংসাপত্র ডিজিটালভাবে সুরক্ষিত রাখা ও ডাউনলোড সহায়তা।",
    documents: [
      "আধার কার্ড",
      "আধার লিঙ্কড মোবাইল নম্বর"
    ],
    turnaroundTime: "তাৎক্ষণিক (Same Day)",
    isPopular: false
  },
  {
    id: "epfo",
    category: "central",
    titleBengali: "EPFO / ESIC / UAN",
    titleEnglish: "EPFO PF & UAN Services",
    iconName: "Briefcase",
    shortDesc: "PF ব্যালেন্স, UAN অ্যাক্টিভেশন, আধার লিঙ্ক ও ক্লেম।",
    fullDesc: "প্রভিডেন্ট ফান্ড (PF) ইউনিভার্সাল অ্যাকাউন্ট নম্বর (UAN) অ্যাক্টিভেশন, কেওয়াইসি আপডেট, পাসবুক দেখা ও অনলাইন পিএফ টাকা তোলার আবেদন।",
    documents: [
      "UAN নম্বর বা মেম্বার আইডি",
      "আধার কার্ড ও প্যান কার্ড",
      "ব্যাংক পাসবুক ও বাতিল চেক (Cancelled Cheque)"
    ],
    turnaroundTime: "ক্লেম ভেরিফিকেশন ৭-১০ দিন",
    isPopular: true
  },
  {
    id: "tickets",
    category: "central",
    titleBengali: "রেল / ফ্লাইট / বাস টিকিট বুকিং",
    titleEnglish: "IRCTC Train / Flight / Bus Ticket",
    iconName: "TrainTrack",
    shortDesc: "আইআরসিটিসি ট্রেন, বাস ও বিমান টিকিট অনলাইন বুকিং।",
    fullDesc: "IRCTC অনুমোদিত অনলাইন ব্যবস্থার মাধ্যমে দেশের যেকোনো প্রান্তের ট্রেনের তৎকাল/সাধারণ টিকিট, রাজ্য পরিবহন বাস ও এয়ারলাইন্স টিকিট বুকিং।",
    documents: [
      "যাত্রীর নাম, বয়স ও লিঙ্গ",
      "মোবাইল নম্বর",
      "পরিচয়পত্রের ফটোকপি (ভ্রমণের সময় প্রয়োজন)"
    ],
    turnaroundTime: "তাৎক্ষণিক বুকিং",
    isPopular: true
  }
];

export const WEST_BENGAL_SERVICES: ServiceItem[] = [
  {
    id: "banglarbhumi",
    category: "west_bengal",
    titleBengali: "বাংলারভূমি (Banglarbhumi)",
    titleEnglish: "Land Records & Mutation",
    iconName: "Map",
    shortDesc: "জমির দাগ/খতিয়ান তথ্য, ম্যাপ, মিউটেশন ও কনভার্সন।",
    fullDesc: "পশ্চিমবঙ্গ সরকারের রাজস্ব ও ভূমি সংস্কার দপ্তরের জমি-জমার পরচা (ROR), দাগের তথ্য, মৌজা ম্যাপ ডাউনলোড ও অনলাইন মিউটেশনের আবেদন সহায়তা।",
    documents: [
      "জমির দলিল / দানপত্র / পিঠ দলিল",
      "বর্তমান খতিয়ান নম্বর ও দাগ নম্বর",
      "আবেদনকারীর আধার কার্ড ও মোবাইল নম্বর",
      "পৌরসভা বা পঞ্চায়েতের ট্যাক্স রশিদ"
    ],
    turnaroundTime: "পরচা: ১ দিন, মিউটেশন: ৩০-৪৫ দিন",
    isPopular: true
  },
  {
    id: "birth_death",
    category: "west_bengal",
    titleBengali: "জন্ম ও মৃত্যু শংসাপত্র",
    titleEnglish: "Birth & Death Certificate",
    iconName: "FileText",
    shortDesc: "অনলাইন জন্ম ও মৃত্যু সনদ আবেদন ও ডাউনলোড।",
    fullDesc: "জন্ম-মৃত্যু তথ্যব্যবস্থা পোর্টালে ডিজিটাল বার্থ বা ডেথ সার্টিফিকেটের আবেদন, সংশোধনের ফর্ম তৈরি ও অনুমোদিত সার্টিফেকেট প্রিন্ট।",
    documents: [
      "হাসপাতালের ডিসচার্জ সার্টিফিকেট / স্লিপ",
      "মাতা-পিতার আধার ও ভোটার কার্ড (জন্মের জন্য)",
      "শ্মশান বা কবরস্থানের রশিদ (মৃত্যুর জন্য)",
      "পঞ্চায়েত/পৌরসভার রিপোর্ট"
    ],
    turnaroundTime: "৭ - ১৫ কার্যদিবস",
    isPopular: true
  },
  {
    id: "caste_cert",
    category: "west_bengal",
    titleBengali: "Caste Certificate (কাষ্ট সার্টিফিকেট)",
    titleEnglish: "SC / ST / OBC Certificate",
    iconName: "Award",
    shortDesc: "SC, ST ও OBC সার্টিফিকেটের অনলাইন আবেদন ও ট্র্যাকিং।",
    fullDesc: "অনগ্রসর শ্রেণী কল্যাণ দপ্তরের অনলাইনের মাধ্যমে তপশিলি জাতি, উপজাতি ও অনগ্রসর শ্রেণীর সার্টিফিকেটের অনলাইন আবেদন ও নথিপত্র প্রস্তুতকরণের সাহায্য।",
    documents: [
      "আবেদনকারীর ৩ কপি ছবি",
      "আধার কার্ড ও জন্ম সনদ / মাধ্যমিক অ্যাডমিট",
      "রক্তের সম্পর্কের বংশতালিকা (Blood Relation Chart)",
      "বংশের কারো কাষ্ট সার্টিফিকেট (যদি থাকে)",
      "১৯৭১ সালের পূর্বের বাসিন্দার প্রমাণপত্র"
    ],
    turnaroundTime: "ভেরিফিকেশন সাপেক্ষে ৩০-৬০ দিন",
    isPopular: true
  },
  {
    id: "income_cert",
    category: "west_bengal",
    titleBengali: "Income Certificate (ইনকাম সার্টিফিকেট)",
    titleEnglish: "e-District Income Certificate",
    iconName: "FileSpreadsheet",
    shortDesc: "ই-ডিস্ট্রিক্ট পোর্টালে বাৎসরিক আয়ের সনদ আবেদন।",
    fullDesc: "স্কলারশিপ, ভর্তি বা সরকারি সহায়তার জন্য ই-ডিস্ট্রিক্ট (e-District WB) পোর্টালে মহকুমা শাসক (SDO) বা বিডিও (BDO) অনুমোদিত আয় সনদ আবেদন।",
    documents: [
      "পঞ্চায়েত প্রধান বা কাউন্সিলরের দেওয়া ইনকাম স্লিপ",
      "আবেদনকারীর আধার কার্ড ও ছবি",
      "আয়ের প্রমাণ (বেতন রসিদ / আইটিআর / ব্যাংক পাসবুক)"
    ],
    turnaroundTime: "৩ - ৭ কার্যদিবস",
    isPopular: true
  },
  {
    id: "residence_cert",
    category: "west_bengal",
    titleBengali: "Residence Certificate (বাসিন্দা সনদ)",
    titleEnglish: "Residential & Domicile Certificate",
    iconName: "Home",
    shortDesc: "পশ্চিমবঙ্গের স্থায়ী বাসিন্দার সার্টিফিকেট আবেদন।",
    fullDesc: "চাকরি, উচ্চশিক্ষা বা সরকারি প্রকল্পের জন্য স্থায়ী বাসিন্দা বা ডোমিসাইল সার্টিফিকেটের অনলাইন আবেদনপত্র দাখিল ও সার্টিফিকেট ডাউনলোড।",
    documents: [
      "আধার কার্ড ও ভোটার কার্ড",
      "পঞ্চায়েত বা পৌরসভার বাসিন্দা প্রমাণপত্র",
      "রেশন কার্ড / স্কুলের লিভিং সার্টিফিকেট",
      "পাসপোর্ট সাইজ ফটো"
    ],
    turnaroundTime: "৩ - ৭ কার্যদিবস",
    isPopular: true
  },
  {
    id: "ration_card",
    category: "west_bengal",
    titleBengali: "Ration Card (খাদ্য সাথী)",
    titleEnglish: "Digital Ration Card Services",
    iconName: "ShoppingBag",
    shortDesc: "নতুন ডিজিটাল রেশন কার্ড, স্থান পরিবর্তন ও নাম সংশোধন।",
    fullDesc: "খাদ্য ও সরবরাহ দপ্তরের ফর্ম ৩/৪/৫/৬/৯ পূরণ—নতুন ডিজিটাল কার্ড, নতুন সদস্য যোগ, রেশন দোকান পরিবর্তন, মোবাইল নাম্বার লিঙ্ক ও e-Ration কার্ড ডাউনলোড।",
    documents: [
      "পরিবারের প্রধান ও সদস্যদের আধার কার্ড",
      "সক্রিয় মোবাইল নম্বর (আধার লিঙ্কড)",
      "বিদ্যমান রেশন কার্ডের কপি (যদি থাকে)",
      "শিশুদের ক্ষেত্রে জন্ম সনদ"
    ],
    turnaroundTime: "১৫ - ৩০ কার্যদিবস",
    isPopular: true
  },
  {
    id: "swasthya_sathi",
    category: "west_bengal",
    titleBengali: "Swasthya Sathi (স্বাস্থ্য সাথী)",
    titleEnglish: "Swasthya Sathi Card Services",
    iconName: "HeartPulse",
    shortDesc: "নতুন স্বাস্থ্য সাথী কার্ড, নাম যোগ ও তথ্য সংশোধন।",
    fullDesc: "পরিবারের ৫ লক্ষ টাকা পর্যন্ত বিনামূল্যের চিকিৎসা বীমা প্রকল্পের নতুন কার্ডের ফর্ম পূরণ, পরিবারে নতুন সদস্য যুক্ত করা ও ক্যাটাগরি সংশোধন।",
    documents: [
      "পরিবারের প্রধান মহিলার আধার কার্ড ও ছবি",
      "পরিবারের সমস্ত সদস্যের আধার কার্ড",
      "ডিজিটাল রেশন কার্ডের কপি",
      "সক্রিয় মোবাইল নম্বর"
    ],
    turnaroundTime: "দুয়ারে সরকার / বিডিও ভেরিফিকেশন সাপেক্ষে",
    isPopular: true
  },
  {
    id: "kanyashree",
    category: "west_bengal",
    titleBengali: "Kanyashree (কন্যাশ্রী প্রকল্প)",
    titleEnglish: "Kanyashree K1/K2/K3 Guidance",
    iconName: "GraduationCap",
    shortDesc: "কন্যাশ্রী K1, K2 আবেদনের নথি ও স্ট্যাটাস সহায়তা।",
    fullDesc: "স্কুল ও কলেজের ছাত্রীদের কন্যাশ্রী প্রকল্পের অনলাইন আবেদনপত্রের স্টেটাস চেক, অ্যাকাউন্ট ডিটেইলস সংশোধন ও কেওয়াইসি প্রক্রিয়ার নির্দেশিকা।",
    documents: [
      "ছাত্রীর আধার কার্ড ও আনটাচড ফটো",
      "ছাত্রীর নিজের নামে একক ব্যাংক একাউন্ট পাসবুক",
      "অভিভাবকের আধার কার্ড",
      "স্কুল/কলেজ আইডেন্টিটি কার্ড ও অবিবাহিত ঘোষণার সার্টিফিকেট"
    ],
    turnaroundTime: "শিক্ষা প্রতিষ্ঠান অনুমোদন সাপেক্ষে",
    isPopular: false
  },
  {
    id: "sabuj_sathi_transport",
    category: "west_bengal",
    titleBengali: "সবুজ সাথী / পরিবহন পরিষেবা",
    titleEnglish: "Transport, License & Permit",
    iconName: "Car",
    shortDesc: "গাড়ির রোড ট্যাক্স, লার্নার ও ড্রাইভিং লাইসেন্স, পারমিট।",
    fullDesc: "পরিবহন দপ্তরের অনলাইন লার্নার ড্রাইভিং লাইসেন্স টেস্ট স্লট, রোড ট্যাক্স রসিদ, ট্রেড লাইসেন্স ও ফিটনেস সার্টিফিকেটের অনলাইন আবেদন সহায়তা।",
    documents: [
      "আধার কার্ড ও বয়স প্রমাণের নথি",
      "গাড়ির আরসি (RC) ও ইনসিওরেন্স পেপার",
      "পাসপোর্ট সাইজ ফটো ও ব্লাড গ্রুপ রিপোর্ট"
    ],
    turnaroundTime: "২ - ৫ কার্যদিবস",
    isPopular: false
  },
  {
    id: "other_wb",
    category: "west_bengal",
    titleBengali: "অন্যান্য রাজ্য সরকারি পরিষেবা",
    titleEnglish: "Other State Govt Schemes",
    iconName: "Layers",
    shortDesc: "লক্ষ্মীর ভান্ডার, বার্ধক্য ভাতা, ট্রেড লাইসেন্স ইত্যাদি।",
    fullDesc: "পশ্চিমবঙ্গ সরকারের লক্ষ্মীর ভান্ডার, বিধবা ও বার্ধক্য ভাতা, পঞ্চায়েত ট্রেড লাইসেন্স এবং অন্যান্য নাগরিক অনলাইন সেবার তথ্য ও ফর্ম সহায়তা।",
    documents: [
      "আধার কার্ড ও ব্যাংক পাসবুক",
      "স্বাস্থ্য সাথী কার্ড (লক্ষ্মীর ভান্ডারের জন্য)",
      "পাসপোর্ট সাইজ ছবি ও রেশন কার্ড"
    ],
    turnaroundTime: "প্রকল্পের নিয়ম অনুযায়ী",
    isPopular: false
  }
];

export const WHY_CHOOSE_US_ITEMS = [
  {
    number: "01",
    title: "অভিজ্ঞ ও দক্ষ টিম",
    desc: "দীর্ঘদিনের অভিজ্ঞ অনলাইন অপারেটরদের দ্বারা প্রতিটি কাজ নির্ভুল ও যত্নসহকারে করা হয়।",
    icon: "Users"
  },
  {
    number: "02",
    title: "দ্রুত ও নির্ভরযোগ্য সেবা",
    desc: "অপ্রয়োজনীয় সময় নষ্ট না করে খুব দ্রুততম সময়ে আপনার আবেদনের কাজ সম্পন্ন করা হয়।",
    icon: "Zap"
  },
  {
    number: "03",
    title: "নিরাপদ ও গোপনীয় পরিষেবা",
    desc: "আপনার সমস্ত ব্যক্তিগত নথিপত্র সম্পূর্ণ নিরাপদ ও ১০০% গোপন রাখা হয়।",
    icon: "ShieldCheck"
  },
  {
    number: "04",
    title: "স্বল্প খরচে নিশ্চিত সেবা",
    desc: "কোনো অতিরিক্ত বা অন্যায্য ফি ছাড়াই একদম সরকারি নিয়মে স্বল্প খরচে কাজ করা হয়।",
    icon: "PiggyBank"
  },
  {
    number: "05",
    title: "সঠিক পরামর্শ ও সহযোগিতা",
    desc: "আবেদন করার পূর্বে উপযুক্ত নথি ও সরকারি নিয়মাবলী সম্পর্কিত নিখুঁত পরামর্শ দেওয়া হয়।",
    icon: "Handshake"
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "পরিষেবা নির্বাচন করুন",
    desc: "আমাদের ওয়েবসাইট বা সেন্টারে এসে আপনার প্রয়োজনীয় সরকারি বা অনলাইন কাজটি বেছে নিন।",
    icon: "MousePointerClick"
  },
  {
    step: "02",
    title: "আমাদের সাথে যোগাযোগ করুন",
    desc: "সরাসরি ফোন কল, হোয়াটসঅ্যাপ বা আমাদের দোকানে এসে বিশদে জেনে নিন।",
    icon: "PhoneCall"
  },
  {
    step: "03",
    title: "প্রয়োজনীয় তথ্য/ডকুমেন্ট দিন",
    desc: "প্রয়োজনীয় নথিপত্রের আসল বা জেরক্স জমা দিন অথবা হোয়াটসঅ্যাপে ছবি পাঠান।",
    icon: "FileCheck"
  },
  {
    step: "04",
    title: "কাজ সম্পন্ন করুন",
    desc: "আপনার কাজ সফলভাবে সম্পন্ন করে রসিদ, সার্টিফিকেট বা ডাউনলোড কপি সংগ্রহ করুন।",
    icon: "CheckCircle2"
  }
];

export const DOCUMENT_REQUIREMENTS_FAQ = [
  {
    service: "আধার কার্ড সংশোধন (Aadhaar Correction)",
    bengaliDocs: [
      "নাম/জন্মতারিখ সংশোধনের জন্য: পঞ্চায়েত প্রধান/কাউন্সিলরের প্রমানপত্র বা মাধ্যমিক এডমিট/জন্ম সনদ",
      "ঠিকানা পরিবর্তনের জন্য: পঞ্চায়েত/পৌরসভার সার্টিফিকেট, ভোটার কার্ড বা ব্যাংক পাসবুক",
      "মোবাইল নম্বরের জন্য: শুধুমাত্র সক্রিয় মোবাইল নম্বর সঙ্গে আনতে হবে (কোনো ডকুমেন্টের প্রয়োজন নেই)"
    ],
    note: "প্রতিটি ক্ষেত্রে অরিজিনাল ডকুমেন্ট থাকা বাঞ্ছনীয়।"
  },
  {
    service: "প্যান কার্ড (New / Correction PAN)",
    bengaliDocs: [
      "আধার কার্ড (বাধ্যতামূলক)",
      "২ কপি পাসপোর্ট সাইজ ফটো",
      "সক্রিয় মোবাইল নম্বর",
      "ভুল সংশোধনের ক্ষেত্রে পুরোনো প্যান কার্ড বা সংশোধন প্রমাণের নথি"
    ],
    note: "আধারের সাথে মোবাইল নম্বর যুক্ত থাকলে তাৎক্ষণিক e-PAN সম্ভব।"
  },
  {
    service: "পাসপোর্ট সার্ভিস (Passport Application)",
    bengaliDocs: [
      "আধার কার্ড ও ভোটার আইডি কার্ড",
      "এক বছরের ব্যাংকের আপডেট করা পাসবুক",
      "মাধ্যমিকের অ্যাডমিট কার্ড বা জন্ম শংসাপত্র",
      "প্যান কার্ড (যদি থাকে)"
    ],
    note: "নথিপত্রে নাম ও জন্মতারিখ হুবহু এক থাকা আবশ্যক।"
  },
  {
    service: "ইনকাম সার্টিফিকেট (Income Certificate - e-District)",
    bengaliDocs: [
      "পঞ্চায়েত প্রধান বা পৌরসভার ওয়ার্ড কাউন্সিলর কর্তৃক ইস্যু করা ইনকাম সার্টিফিকেট",
      "আবেদনকারীর আধার কার্ড",
      "১ কপি রঙিন ছবি",
      "সক্রিয় মোবাইল নাম্বার"
    ],
    note: "সাধারণত ৩ থেকে ৭ দিনের মধ্যে সার্টিফিকেট ডাউনলোড করা যায়।"
  },
  {
    service: "কাষ্ট সার্টিফিকেট (Caste Certificate SC/ST/OBC)",
    bengaliDocs: [
      "আবেদনকারীর আধার কার্ড ও ১ কপি ছবি",
      "বংশ তালিকার প্রমাণপত্র (রক্তের সম্পর্কের কারো কাষ্ট সার্টিফিকেট থাকলে)",
      "১৯৭১ সালের আগের বসবাসের প্রমাণ নথি",
      "মাধ্যমিক এডমিট কার্ড বা জন্ম সনদ"
    ],
    note: "কাষ্ট সার্টিফিকেট আবেদনে ব্লাড রিলেশন থাকলে আবেদন দ্রুত অনুমোদিত হয়।"
  },
  {
    service: "বাংলারভূমি পরচা ও দাগ খতিয়ান (Banglarbhumi Land Records)",
    bengaliDocs: [
      "মৌজার নাম, খতিয়ান নম্বর ও দাগ নম্বর",
      "জমির দলিল বা পিঠ দলিলের তথ্য (মিউটেশনের ক্ষেত্রে)",
      "আবেদনকারীর আধার কার্ড ও মোবাইল নাম্বার"
    ],
    note: "অনলাইন পরচা তাৎক্ষণিক ডাউনলোড করে দেওয়া হয়।"
  },
  {
    service: "খাদ্য সাথী / রেশন কার্ড (Ration Card Form 3/4/5/9)",
    bengaliDocs: [
      "পরিবারের প্রধান ও সকল সদস্যের আধার কার্ড",
      "বিদ্যমান রেশন কার্ডের নম্বর",
      "আধার লিঙ্কড মোবাইল ফোন"
    ],
    note: "মোবাইল লিঙ্কিং না থাকলে রেশন কার্ডের বিভিন্ন কাজ আটকে যেতে পারে।"
  }
];
