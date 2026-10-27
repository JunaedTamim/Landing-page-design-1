import { FAQS, KIT_ITEMS, PLANS, TESTIMONIALS, formatTaka, type PlanId } from "@/lib/product";

export type SiteContent = {
  brand: string;
  announcement: string;
  announcementBn: string;
  headline: string;
  description: string;
  cta: string;
  headlineBn: string;
  descriptionBn: string;
  ctaBn: string;
  about: string;
  aboutBn: string;
  kitItems: Array<{ n: string; title: string; desc: string; titleBn: string; descBn: string; formats: string[]; icon: string }>;
  plans: Record<PlanId, { id: PlanId; name: string; tagline: string; price: number; compareAt: number; features: string[]; nameBn: string; taglineBn: string; featuresBn: string[] }>;
  faqs: Array<{ q: string; a: string; qBn: string; aBn: string }>;
  testimonials: Array<{ quote: string; quoteBn: string; name: string; role: string; roleBn: string; initials: string; featured: boolean }>;
  pageCopy: Record<string, { en: string; bn: string }>;
};

export function getContentTranslationMap(content: SiteContent): Record<string, string> {
  const pairs: [string, string][] = [];
  const add = (en?: string, bn?: string) => { if (en && bn) pairs.push([en, bn]); };
  add(content.announcement, content.announcementBn);
  add(content.headline, content.headlineBn); add(content.description, content.descriptionBn); add(content.cta, content.ctaBn);
  add(content.about, content.aboutBn);
  Object.values(content.pageCopy).forEach((copy) => {
    add(copy.en, copy.bn);
    if (copy.en.includes("|")) copy.en.split("|").forEach((en, i) => add(en, copy.bn.split("|")[i]));
  });
  content.kitItems.forEach((item) => { add(item.title, item.titleBn); add(item.desc, item.descBn); });
  Object.values(content.plans).forEach((plan) => {
    add(plan.name, plan.nameBn); add(plan.tagline, plan.taglineBn);
    plan.features.forEach((feature, i) => add(feature, plan.featuresBn[i]));
    const banglaDigits = (value: string) => value.replace(/[0-9]/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
    add(formatTaka(plan.price), `৳${banglaDigits(new Intl.NumberFormat("en-BD", { maximumFractionDigits: 0 }).format(plan.price))}`);
    add(formatTaka(plan.compareAt), `৳${banglaDigits(new Intl.NumberFormat("en-BD", { maximumFractionDigits: 0 }).format(plan.compareAt))}`);
  });
  content.faqs.forEach((faq) => { add(faq.q, faq.qBn); add(faq.a, faq.aBn); });
  content.testimonials.forEach((review) => { add(review.quote, review.quoteBn); add(review.role, review.roleBn); });
  return Object.fromEntries(pairs);
}

export const DEFAULT_CONTENT: SiteContent = {
  brand: "Form & Folio",
  announcement: "v3.2 is live — new retainer agreements & AI clause · free for all owners",
  announcementBn: "নতুন রিটেইনার চুক্তি ও এআই ধারা — সকল গ্রাহকের জন্য বিনামূল্যে",
  headline: "Great design deserves a real business behind it.",
  description: "Contracts that protect you. Proposals that close. Pricing you can defend. Twelve documents, refined over nine years of client work — so you never start from a blank page again.",
  cta: "Get the toolkit — ৳১০,৯০০",
  headlineBn: "দারুণ ডিজাইনের পেছনে থাকা উচিত একটি শক্তিশালী ব্যবসা।",
  descriptionBn: "আপনার সুরক্ষায় চুক্তি। কাজ জেতার প্রস্তাব। আত্মবিশ্বাসের সঙ্গে নির্ধারিত মূল্য। বারোটি নথি, নয় বছরের অভিজ্ঞতায় পরিমার্জিত—যাতে আর কখনো শূন্য থেকে শুরু করতে না হয়।",
  ctaBn: "টুলকিটটি নিন — ৳১০,৯০০",
  about: "The business toolkit for independent designers. Made by designers who got tired of learning the hard way.",
  aboutBn: "স্বাধীন ডিজাইনারদের জন্য ব্যবসায়িক টুলকিট। কঠিন পথে শিখতে শিখতে ক্লান্ত ডিজাইনারদের তৈরি।",
  kitItems: KIT_ITEMS.map((item, index) => ({ ...item, formats: [...item.formats], titleBn: ["ক্লায়েন্ট চুক্তি", "প্রস্তাবনা পদ্ধতি", "মূল্য নির্ধারণ কাঠামো", "অনবোর্ডিং প্রক্রিয়া", "কাজের পরিধি ও পরিবর্তন", "কাজ সমাপ্তি ও রেফারেল"][index], descBn: ["আপনার কাজের পরিধি, পেমেন্ট সময়সূচি ও মানসিক শান্তি রক্ষার সহজ চুক্তি। আইনজীবীর পর্যালোচনায় তৈরি, মানুষের বোঝার মতো ভাষায় লেখা।", "ফলাফলকে সামনে রেখে তৈরি মডুলার প্রস্তাবনা। প্রতিটি প্রকল্পে তিনটি মূল্যস্তর—গড় চুক্তিমূল্য বাড়ানোর জন্য।", "মূল্যভিত্তিক মূল্য নির্ধারণের ওয়ার্কশিট, দৈনিক রেট ক্যালকুলেটর এবং আত্মবিশ্বাসের সঙ্গে মূল্য ব্যাখ্যার ভাষা।", "স্বাগত প্যাকেট, প্রাথমিক প্রশ্নমালা ও ক্লায়েন্ট পোর্টাল। প্রথম দিন থেকেই নতুন ক্লায়েন্টরা যত্নের অনুভূতি পান।", "‘এটা অতিরিক্ত কাজ’—ভদ্র কিন্তু দৃঢ়ভাবে জানানোর টেমপ্লেট। পরিবর্তনের অনুরোধ বিরক্তির বদলে আয়ে পরিণত হয়।", "হস্তান্তর তালিকা, প্রশংসাপত্রের অনুরোধ ও রেফারেল চাওয়ার সহজ উপায়। প্রকল্প শেষ করুন এমনভাবে, যাতে পরেরটি নিজেই আসে।"][index] })),
  plans: {
    standard: { ...PLANS.standard, price: 10900, compareAt: 15900, nameBn: "সম্পূর্ণ টুলকিট", taglineBn: "ক্লায়েন্টের কাজ পরিচালনার জন্য প্রয়োজনীয় সব নথি।", featuresBn: ["১২টি পরীক্ষিত টেমপ্লেট", "ডিজাইনার-বান্ধব, আইনজীবী-পর্যালোচিত চুক্তি", "প্রস্তাবনা ও মূল্য নির্ধারণ কাঠামো", "অনবোর্ডিং ও অফবোর্ডিং প্রক্রিয়া", "Notion, Google Docs ও Word ফরম্যাট", "আজীবন আপডেট অন্তর্ভুক্ত"] },
    complete: { ...PLANS.complete, price: 17900, compareAt: 25900, nameBn: "টুলকিট ও মাস্টারক্লাস", taglineBn: "নথির সঙ্গে সেগুলো কার্যকরভাবে ব্যবহারের নির্দেশনা।", featuresBn: ["সম্পূর্ণ টুলকিটের সবকিছু", "৩.৫ ঘণ্টার ভিডিও মাস্টারক্লাস", "দর-কষাকষির স্ক্রিপ্ট ও ইমেইল নমুনা", "Notion ক্লায়েন্ট পোর্টাল টেমপ্লেট", "রেট ক্যালকুলেটর স্প্রেডশিট", "ব্যক্তিগত কমিউনিটি অ্যাক্সেস"] },
  },
  faqs: FAQS.map((f, i) => ({ ...f, qBn: ["কেনার পর আমি ঠিক কী পাব?", "চুক্তিটি কি আমার দেশে আইনত বৈধ?", "আমি নতুন শুরু করেছি—এটি কি আমার জন্য অতিরিক্ত?", "আমার কি Notion বা পেইড সফটওয়্যার লাগবে?", "এটি আমার জন্য উপযুক্ত না হলে?", "আপডেট কীভাবে পাব?"][i], aBn: ["সঙ্গে সঙ্গে ডাউনলোড লিংক এবং Notion, Google Docs ও Word-এর সব ফাইলসহ স্থায়ী লাইব্রেরি পাবেন। Complete প্যাকে মাস্টারক্লাস, ইমেইল নমুনা ও কমিউনিটি আমন্ত্রণও আছে। সব ফাইল আপনারই থাকবে।", "চুক্তিটি মেধাস্বত্ব আইনজীবীর সঙ্গে তৈরি এবং ৪০টিরও বেশি দেশের ডিজাইনার ব্যবহার করেন। এটি সাধারণ আইনি কাঠামো অনুসরণ করে। উচ্চ-ঝুঁকির কাজে স্থানীয় আইনজীবীর পরামর্শ নিন।", "বরং নতুনদের জন্যই এটি কার্যকর। বেশিরভাগ ডিজাইনার কয়েকটি কঠিন প্রকল্পের পর যে বিষয়গুলো শেখেন, সেগুলো শুরু থেকেই সঠিকভাবে করতে পারবেন।", "না। Google Docs, Word ও বিনামূল্যের Notion অ্যাকাউন্টেই সব টেমপ্লেট ব্যবহার করা যায়। রেট ক্যালকুলেটর Google Sheets বা Excel-এ চলে।", "৩০ দিনের মধ্যে ইমেইল করলে কোনো প্রশ্ন বা ফর্ম ছাড়াই পুরো টাকা ফেরত পাবেন। ফাইলগুলোও আপনার কাছে থাকবে।", "একবার কিনলেই ভবিষ্যতের সব সংস্করণ বিনামূল্যে পাবেন। প্রতি ত্রৈমাসিকে আপডেট প্রকাশিত হয়।"][i] })),
  testimonials: TESTIMONIALS.map((t, i) => ({ ...t, quoteBn: ["প্রস্তাবনা পদ্ধতি ব্যবহার করে আমার প্রকল্পের সর্বনিম্ন মূল্য ৩,৬০,০০০ টাকা থেকে ৯,৬০,০০০ টাকায় তুলেছি। প্রথম ক্লায়েন্টই কোনো আপত্তি ছাড়াই মাঝের প্যাকেজটি নিয়েছেন। এক প্রকল্পেই চল্লিশ গুণ মূল্য উঠে এসেছে।", "পরিবর্তন-অনুরোধের টেমপ্লেটটি দুই বছরের কাজের পরিধি বাড়ার সমস্যা শেষ করেছে। ক্লায়েন্টরা এখন সীমারেখাকে সম্মান করেন।", "অনেক টেমপ্লেট প্যাক কিনেছি। এটিই প্রথম যেখানে প্রতিটি ফাইল এমন কারও লেখা মনে হয়েছে, যিনি সত্যিই কাজটি করেছেন।"][i], roleBn: ["ব্র্যান্ড ডিজাইনার, Lagos / London", "স্বাধীন প্রোডাক্ট ডিজাইনার", "প্রতিষ্ঠাতা, Anand Studio"][i] })),
  pageCopy: {
    previewBullets: { en: "Plain-English contracts clients sign without a lawyer fight|Three-tier proposals that raise your average deal size|Scope language that turns “quick changes” into change orders|Editable everywhere — Docs, Word, Notion and Figma", bn: "সহজ ভাষার চুক্তি, যা ক্লায়েন্টরা সহজেই স্বাক্ষর করেন|তিন-স্তরের প্রস্তাবনা, যা গড় চুক্তিমূল্য বাড়ায়|কাজের সীমা নির্ধারণ, যা ‘ছোট পরিবর্তন’কে অতিরিক্ত কাজে রূপ দেয়|সবখানে সম্পাদনাযোগ্য — Docs, Word, Notion ও Figma" },
    studios: { en: "Pentagram alumni|ex-IDEO|Instrument|Collins|ex-Meta Design|Ueno|Basic/DEPT®|Wolff Olins", bn: "Pentagram alumni|ex-IDEO|Instrument|Collins|ex-Meta Design|Ueno|Basic/DEPT®|Wolff Olins" },
    creator: { en: "Elena Kovač — creator, Form & Folio", bn: "Elena Kovač — Form & Folio-এর প্রতিষ্ঠাতা" },
    creatorBio: { en: "9 years independent · 140+ client projects · previously design lead at two agencies", bn: "৯ বছরের স্বাধীন অভিজ্ঞতা · ১৪০টিরও বেশি ক্লায়েন্ট প্রকল্প · আগে দুটি এজেন্সিতে ডিজাইন লিড" },
    designers: { en: "For independent designers & small studios", bn: "স্বাধীন ডিজাইনার ও ছোট স্টুডিওর জন্য" },
    socialProof: { en: "Used by designers from teams like these", bn: "এমন প্রতিষ্ঠানের ডিজাইনারদের পছন্দ" },
    stats: { en: "toolkits in the wild|templates, zero fluff|saved per project, avg.|money-back guarantee", bn: "ডিজাইনারদের হাতে|টি টেমপ্লেট, বাড়তি কিছু নয়|প্রতি প্রকল্পে গড়ে সাশ্রয়|টাকা ফেরতের নিশ্চয়তা" },
    insideEyebrow: { en: "What's inside", bn: "ভেতরে কী আছে" }, insideTitle: { en: "Every awkward conversation, already written.", bn: "কঠিন কথোপকথনের প্রস্তুত ভাষা—আগেই লেখা।" }, insideDesc: { en: "Six systems, twelve files. Each one exists because a project went sideways without it.", bn: "ছয়টি পদ্ধতি, বারোটি ফাইল। প্রতিটি তৈরি হয়েছে বাস্তব প্রকল্পের অভিজ্ঞতা থেকে।" },
    previewEyebrow: { en: "Not another pretty PDF", bn: "শুধু সুন্দর PDF নয়" }, previewTitle: { en: "Written by someone who's been burned.", bn: "কঠিন অভিজ্ঞতা থেকে তৈরি।" }, previewDesc: { en: "Every clause, question and price anchor in this toolkit comes from a real project — including the ones that ended badly. That's the point.", bn: "এই টুলকিটের প্রতিটি ধারা, প্রশ্ন ও মূল্য নির্ধারণ বাস্তব প্রকল্প থেকে এসেছে—কঠিন অভিজ্ঞতাগুলোও। এটাই এর বিশেষত্ব।" },
    storiesTitle: { en: "The boring documents that make exciting work possible.", bn: "গুরুত্বপূর্ণ নথি, যা সৃজনশীল কাজকে সম্ভব করে।" }, reviewsEyebrow: { en: "From the field", bn: "বাস্তব অভিজ্ঞতা" }, reviewsTitle: { en: "Don't take our word for it.", bn: "শুধু আমাদের কথা নয়—ক্রেতারাই বলছেন।" }, pricingEyebrow: { en: "Pricing", bn: "মূল্য" }, pricingTitle: { en: "Less than one hour of your rate.", bn: "আপনার এক ঘণ্টার আয়েরও কম।" }, pricingDesc: { en: "One payment. Yours forever. Every future update included — no subscriptions, ever.", bn: "একবার পেমেন্ট। চিরদিনের জন্য আপনার। ভবিষ্যতের সব আপডেটসহ—কোনো সাবস্ক্রিপশন নেই।" },
    faqEyebrow: { en: "Questions", bn: "প্রশ্ন" }, faqTitle: { en: "Asked, answered.", bn: "প্রশ্ন ও উত্তর।" }, finalTitle: { en: "Your next proposal could close at twice the price.", bn: "আপনার পরবর্তী প্রস্তাবনায় দ্বিগুণ মূল্য পেতে পারেন।" }, finalDesc: { en: "Join 4,800+ designers who stopped winging the business side.", bn: "ব্যবসায়িক দিকটি আর আন্দাজে চালান না—এমন ৪,৮০০+ ডিজাইনারের সঙ্গে যোগ দিন।" },
  },
};
