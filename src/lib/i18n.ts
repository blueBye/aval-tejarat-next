import type { Locale, SectorId } from "./types";

export const sectorIds: SectorId[] = ["natural-stone","food-products","industrial-materials"];
export const sectorArt: Record<SectorId,string> = {
  "natural-stone":"/illustrations/stone.svg",
  "food-products":"/illustrations/food.svg",
  "industrial-materials":"/illustrations/industry.svg",
};

type Copy = {
  brand:string; subtitle:string; nav:string[]; getInTouch:string; eyebrow:string; hero1:string; heroAccent:string; hero2:string; heroText:string;
  primaryCTA:string; secondaryCTA:string; heroSmall:string[]; tradingNote:string;
  introTag:string; introTitle:string; introText:string; introQuote:string;
  sectorsTag:string; sectorsTitle:string; sectorsText:string; explore:string;
  sectors:Record<SectorId,{name:string; description:string; items:{name:string;desc:string}[]}>;
  processTag:string;processTitle:string;processText:string;steps:{title:string;description:string}[];
  journalTag:string;journalTitle:string;journalText:string;viewAll:string;
  ctaTitle:string;ctaText:string;ctaButton:string;footerText:string;footerLegal:string;
  aboutTitle:string;aboutText:string;aboutPoints:{title:string;description:string}[];
  servicesTitle:string;servicesText:string;
  contactTitle:string;contactText:string;form:{name:string;email:string;company:string;product:string;destination:string;quantity:string;message:string;submit:string;success:string;error:string;privacy:string};
  articleEmpty:string;readStory:string;sectorDetailsTitle:string;sectorDetails:string[];
};
export const copy: Record<Locale,Copy> = {
  en: {
    brand:"AVAL",subtitle:"TEJARAT PERSIAN",nav:["Home","About us","Sectors","Our process","Insights","Contact"],getInTouch:"Start an inquiry",
    eyebrow:"INTERNATIONAL SOURCING · IRAN", hero1:"From Iran,",heroAccent:"with possibility.",hero2:"To markets worldwide.",
    heroText:"Thoughtful sourcing and export coordination for international buyers. We help you explore Iranian supply possibilities, clarify the details and move forward with confidence.",
    primaryCTA:"Tell us what you need",secondaryCTA:"Explore our sectors",heroSmall:["Buyer-led sourcing","Clear commercial dialogue","Verified, case by case"],
    tradingNote:"Independent sourcing • Iran to international markets",introTag:"01 — OUR PHILOSOPHY",introTitle:"Better trade starts with better questions.",
    introText:"No one-size-fits-all catalogue. We start with your specifications, destination and priorities, then explore possible supply routes with the right questions and practical care.",
    introQuote:"We believe transparency is the most valuable thing you can ship.",
    sectorsTag:"02 — OUR FOCUS",sectorsTitle:"Rooted in Iran. Relevant to your market.",sectorsText:"Three starting points for a more considered sourcing conversation. Every product, supplier and commercial condition is assessed individually.",explore:"Explore the sector",
    sectors:{
      "natural-stone":{name:"Natural stone",description:"Explore Iranian stone for architectural, interior and commercial projects, with specifications and availability confirmed per inquiry.",items:[{name:"Travertine",desc:"Façades, cladding and architectural surfaces"},{name:"Marble",desc:"Refined interiors and decorative applications"},{name:"Granite",desc:"High-durability surfaces and exterior use"},{name:"Onyx",desc:"Statement pieces and translucent stone"}]},
      "food-products":{name:"Food products",description:"A buyer-first route to Iranian packaged food and confectionery, with attention to shelf life, labeling and destination rules.",items:[{name:"Confectionery & wafers",desc:"Sweet goods subject to producer availability"},{name:"Sesame specialties",desc:"Halva and related sesame products"},{name:"Packaged foods",desc:"Categories based on buyer briefs"},{name:"Private-label opportunities",desc:"Potential solutions after producer assessment"}]},
      "industrial-materials":{name:"Industrial materials",description:"Considered sourcing across selected materials, grounded in specifications, documentation and export eligibility.",items:[{name:"Mineral inputs",desc:"Grades, origin and test documentation"},{name:"Metals & semi-finished",desc:"Standards, dimensions and commercial lots"},{name:"Petrochemical-related",desc:"Technical sheets and export requirements"},{name:"Industrial components",desc:"Case-by-case technical sourcing"}]}
    },
    processTag:"03 — HOW IT WORKS",processTitle:"A clear route from request to possibility.",processText:"Thoughtful coordination from the first specification to the next commercial decision.",
    steps:[{title:"Tell us your needs",description:"Share specifications, quantities, destination and timeline."},{title:"Explore the options",description:"We identify potential suppliers and clarify relevant details."},{title:"Verify the fit",description:"Compare samples, documentation and commercial conditions."},{title:"Coordinate next steps",description:"When feasible, move toward order and export planning."}],
    journalTag:"04 — BUYER GUIDES",journalTitle:"Insights for better sourcing.",journalText:"Practical guides to natural stone, specifications and international trade.",viewAll:"All insights",
    ctaTitle:"The next opportunity starts with a conversation.",ctaText:"Tell us what you are looking for, and we will explore what information is needed to evaluate the opportunity.",ctaButton:"Send a sourcing inquiry",footerText:"Connecting international demand to potential Iranian supply, with clarity at every step.",footerLegal:"A trade name. Supply and commercial terms are subject to independent verification.",
    aboutTitle:"A more thoughtful way to source from Iran.",aboutText:"Aval Tejarat Persian is a trade name introducing independent sourcing and export-coordination services. We help buyers and potential suppliers move from initial questions to informed decisions. We do not promise inventory, manufacturing capacity or shipment eligibility without verification.",
    aboutPoints:[{title:"Clarity before commitment",description:"Technical and commercial requirements are clarified before offers are presented."},{title:"A buyer-led approach",description:"Your product brief, destination and priorities shape the investigation."},{title:"Commercial practicality",description:"We consider logistics, documentation and market rules alongside product fit."}],
    servicesTitle:"The sourcing process, made more navigable.",servicesText:"Our role is to organize requirements, supplier outreach, comparison and follow-through, not to promise unverified supply.",
    contactTitle:"Tell us what you are looking for.",contactText:"Whether your brief is detailed or just beginning, we would be glad to understand your sourcing requirements.",
    form:{name:"Your name",email:"Work email",company:"Company (optional)",product:"Product or category",destination:"Destination country",quantity:"Estimated quantity (optional)",message:"Specifications and requirements",submit:"Send inquiry",success:"Your inquiry has been received. Thank you — we will review the information.",error:"We could not submit your inquiry. Please try again.",privacy:"We use these details only to evaluate and respond to your sourcing inquiry."},
    articleEmpty:"New insights are being prepared. Check back soon.",readStory:"Read article",sectorDetailsTitle:"What helps us assess your request",sectorDetails:["Material or product specifications","Dimensions, quality standards and packaging","Expected quantity and frequency","Destination and preferred delivery terms","Required certificates or test documentation","Sampling and inspection expectations"]
  },
  fa: {
    brand:"اول",subtitle:"تجارت پرشین",nav:["خانه","درباره ما","حوزه‌ها","فرآیند همکاری","راهنماها","تماس با ما"],getInTouch:"ثبت درخواست تأمین",
    eyebrow:"تأمین بین‌المللی · ایران",hero1:"از ایران،",heroAccent:"با فرصت‌های تازه.",hero2:"به بازارهای جهان.",
    heroText:"خدمات بررسی تأمین کالا و هماهنگی صادرات برای خریداران بین‌المللی. کمک می‌کنیم گزینه‌های موجود را بررسی کنید، جزئیات را روشن کنید و با آگاهی بیشتری تصمیم بگیرید.",
    primaryCTA:"نیازتان را مطرح کنید",secondaryCTA:"حوزه‌های فعالیت",heroSmall:["تأمین بر اساس نیاز خریدار","گفت‌وگوی تجاری شفاف","تأیید موردی شرایط"],
    tradingNote:"تأمین مستقل کالا • از ایران به بازارهای جهانی",introTag:"۰۱ — نگاه ما",introTitle:"تجارت بهتر از پرسش‌های بهتر شروع می‌شود.",
    introText:"ما فهرست موجودی قطعی ارائه نمی‌کنیم. ابتدا مشخصات کالا، مقصد و اولویت‌های شما را بررسی می‌کنیم و سپس مسیرهای احتمالی تأمین را با دقت و شفافیت ارزیابی می‌کنیم.",
    introQuote:"باور داریم شفافیت ارزشمندترین بخش هر همکاری تجاری است.",sectorsTag:"۰۲ — حوزه‌های تمرکز",sectorsTitle:"ریشه در ایران، متناسب با بازار شما.",sectorsText:"سه حوزه برای آغاز یک گفت‌وگوی دقیق‌تر درباره تأمین کالا. شرایط هر محصول و تأمین‌کننده به‌صورت جداگانه بررسی می‌شود.",explore:"آشنایی با حوزه",
    sectors:{
      "natural-stone":{name:"سنگ طبیعی",description:"بررسی تأمین سنگ طبیعی ایران برای پروژه‌های ساختمانی و تجاری، پس از تأیید مشخصات و موجودی هر سفارش.",items:[{name:"تراورتن",desc:"نما و سطوح معماری"},{name:"مرمر",desc:"فضاهای داخلی و کاربردهای تزئینی"},{name:"گرانیت",desc:"سطوح مقاوم و کاربردهای بیرونی"},{name:"اونیکس",desc:"سنگ‌های خاص و نیمه‌شفاف"}]},
      "food-products":{name:"محصولات غذایی",description:"بررسی تأمین مواد غذایی بسته‌بندی‌شده و شیرینی‌جات ایران، با توجه به ماندگاری، برچسب‌گذاری و الزامات بازار مقصد.",items:[{name:"شیرینی و ویفر",desc:"محصولات وابسته به ظرفیت تولیدکننده"},{name:"محصولات کنجدی",desc:"حلوا و فرآورده‌های مرتبط"},{name:"مواد غذایی بسته‌بندی",desc:"متناسب با نیاز خریدار"},{name:"تولید با برند اختصاصی",desc:"در صورت تأیید امکان تولید"}]},
      "industrial-materials":{name:"مواد اولیه صنعتی",description:"بررسی تأمین مواد صنعتی بر اساس مشخصات فنی، مدارک موردنیاز و امکان قانونی صادرات.",items:[{name:"مواد معدنی",desc:"گرید، منشأ و مدارک آزمایشگاهی"},{name:"فلزات و مواد نیمه‌ساخته",desc:"استانداردها و ابعاد سفارش"},{name:"مواد پتروشیمی",desc:"برگه‌های فنی و شرایط صادرات"},{name:"نهاده‌های صنعتی",desc:"بررسی بر اساس درخواست تخصصی"}]}
    },
    processTag:"۰۳ — روش همکاری",processTitle:"مسیری روشن از درخواست تا تصمیم.",processText:"هماهنگی دقیق از اولین نیازمندی تا گام تجاری بعدی.",
    steps:[{title:"شرح نیازمندی",description:"مشخصات، حجم، مقصد و زمان موردنظر را بیان کنید."},{title:"بررسی گزینه‌ها",description:"تأمین‌کنندگان احتمالی و شرایط اولیه بررسی می‌شوند."},{title:"ارزیابی تناسب",description:"نمونه‌ها، مدارک و شرایط تجاری مقایسه می‌شوند."},{title:"هماهنگی مراحل بعد",description:"در صورت امکان، سفارش و برنامه‌ریزی صادرات دنبال می‌شود."}],
    journalTag:"۰۴ — راهنمای خریداران",journalTitle:"راهنماهای کاربردی تأمین کالا",journalText:"راهنماهای تخصصی درباره انتخاب سنگ طبیعی، مشخصات فنی و تجارت بین‌المللی.",viewAll:"همه مقالات",
    ctaTitle:"فرصت بعدی با یک گفت‌وگو آغاز می‌شود.",ctaText:"بگویید به دنبال چه کالایی هستید تا بررسی کنیم برای ارزیابی فرصت تأمین چه اطلاعاتی لازم است.",ctaButton:"ثبت درخواست تأمین",footerText:"پیوند نیاز بازارهای جهانی با ظرفیت‌های احتمالی تأمین از ایران، با تأکید بر شفافیت.",footerLegal:"نام تجاری؛ موجودی، امکان صادرات و شرایط تجاری نیازمند بررسی و تأیید است.",
    aboutTitle:"نگاهی دقیق‌تر به تأمین کالا از ایران.",aboutText:"اول تجارت پرشین نام تجاری خدمات مستقل تأمین کالا و هماهنگی صادرات است. ما به خریداران کمک می‌کنیم از پرسش‌های اولیه به تصمیم‌گیری آگاهانه برسند. هیچ موجودی، ظرفیت تولید یا امکان حملی بدون بررسی قطعی اعلام نمی‌شود.",
    aboutPoints:[{title:"شفافیت پیش از تعهد",description:"پیش از ارائه پیشنهاد، نیازهای فنی و تجاری روشن می‌شوند."},{title:"شروع از نیاز خریدار",description:"نوع کالا، مقصد و اولویت‌های شما مسیر بررسی را تعیین می‌کند."},{title:"نگاه واقع‌بینانه",description:"لجستیک، مدارک و مقررات در کنار کیفیت محصول سنجیده می‌شوند."}],
    servicesTitle:"فرآیندی قابل‌پیگیری برای تأمین کالا.",servicesText:"نقش ما تنظیم نیازمندی‌ها، ارتباط با تأمین‌کنندگان و بررسی گزینه‌هاست؛ نه وعده عرضه تأییدنشده.",
    contactTitle:"دنبال چه کالایی هستید؟",contactText:"چه جزئیات سفارش آماده باشد و چه هنوز در مرحله بررسی باشید، مایل هستیم نیاز شما را بهتر بشناسیم.",
    form:{name:"نام و نام خانوادگی",email:"ایمیل کاری",company:"نام شرکت (اختیاری)",product:"کالا یا گروه محصول",destination:"کشور مقصد",quantity:"مقدار تقریبی (اختیاری)",message:"مشخصات و توضیحات درخواست",submit:"ارسال درخواست",success:"درخواست شما ثبت شد. از اعتمادتان سپاسگزاریم.",error:"ارسال درخواست انجام نشد؛ لطفاً دوباره تلاش کنید.",privacy:"اطلاعات صرفاً برای ارزیابی و پاسخ به درخواست شما استفاده می‌شود."},
    articleEmpty:"مقالات جدید به‌زودی منتشر می‌شوند.",readStory:"مطالعه مقاله",sectorDetailsTitle:"اطلاعات مفید برای بررسی درخواست",sectorDetails:["مشخصات دقیق کالا یا مواد","ابعاد، استاندارد کیفیت و بسته‌بندی","حجم و تناوب سفارش","مقصد و شرایط تحویل ترجیحی","گواهی‌ها و مدارک آزمون","انتظارها درباره نمونه و بازرسی"]
  },
  ar: {
    brand:"أول",subtitle:"تجارت پرشين",nav:["الرئيسية","من نحن","القطاعات","آلية العمل","الأدلة","تواصل معنا"],getInTouch:"طلب عرض توريد",
    eyebrow:"التوريد الدولي · إيران",hero1:"من إيران،",heroAccent:"بفرص جديدة.",hero2:"إلى أسواق العالم.",
    heroText:"خدمات تنسيق التوريد والتصدير للمشترين الدوليين. نساعدك في استكشاف خيارات المنتجات الإيرانية وتوضيح المتطلبات واتخاذ قرارات تجارية أكثر ثقة.",
    primaryCTA:"أخبرنا بما تحتاجه",secondaryCTA:"استكشف القطاعات",heroSmall:["التوريد وفق احتياجات المشتري","تواصل تجاري واضح","التحقق لكل طلب"],
    tradingNote:"توريد مستقل • من إيران إلى الأسواق العالمية",introTag:"٠١ — فلسفتنا",introTitle:"التجارة الأفضل تبدأ بالأسئلة الصحيحة.",
    introText:"لا نقدم كتالوجاً بمخزون مضمون. ننطلق من مواصفاتك والوجهة والأولويات التجارية، ثم نستكشف خيارات التوريد الممكنة بشفافية وعناية.",
    introQuote:"نؤمن بأن الشفافية هي أثمن ما في كل شراكة تجارية.",sectorsTag:"٠٢ — مجالات التركيز",sectorsTitle:"جذورنا في إيران، واهتمامنا بسوقك.",sectorsText:"ثلاثة قطاعات لبدء حوار أكثر دقة حول احتياجاتك. يتم تقييم توفر المنتجات والشروط لكل طلب بصورة مستقلة.",explore:"استكشف القطاع",
    sectors:{
      "natural-stone":{name:"الحجر الطبيعي",description:"استكشاف توريد الحجر الإيراني للمشاريع المعمارية والتجارية بعد التحقق من المواصفات والتوفر.",items:[{name:"الترافرتين",desc:"الواجهات والأسطح المعمارية"},{name:"الرخام",desc:"المساحات الداخلية والزينة"},{name:"الجرانيت",desc:"الأسطح المتينة والاستخدام الخارجي"},{name:"الأونيكس",desc:"الأحجار المميزة وشبه الشفافة"}]},
      "food-products":{name:"المنتجات الغذائية",description:"استكشاف خيارات الأغذية الإيرانية المعبأة والحلويات، مع مراعاة الصلاحية والملصقات ومتطلبات بلد الاستيراد.",items:[{name:"الحلويات والويفر",desc:"حسب قدرة المنتجين"},{name:"منتجات السمسم",desc:"الحلاوة ومنتجات السمسم"},{name:"الأغذية المعبأة",desc:"وفق متطلبات المشتري"},{name:"العلامة التجارية الخاصة",desc:"حسب جدوى الإنتاج"}]},
      "industrial-materials":{name:"المواد الصناعية",description:"استكشاف توريد المواد الصناعية وفق المواصفات الفنية والتوثيق والأهلية القانونية للتصدير.",items:[{name:"المواد المعدنية",desc:"الدرجة والمنشأ والفحوصات"},{name:"المعادن والمواد نصف المصنعة",desc:"المقاسات والمعايير والكميات"},{name:"المواد البتروكيماوية",desc:"النشرات الفنية وشروط التصدير"},{name:"مدخلات صناعية",desc:"توريد فني حسب كل حالة"}]}
    },
    processTag:"٠٣ — كيف نعمل",processTitle:"مسار واضح من الطلب إلى القرار.",processText:"تنسيق مدروس من المواصفات الأولى إلى الخطوة التجارية التالية.",
    steps:[{title:"شارك متطلباتك",description:"أرسل المواصفات والكميات والوجهة والوقت المتوقع."},{title:"استكشف الخيارات",description:"نحدد موردين محتملين ونوضح التفاصيل الضرورية."},{title:"تحقق من الملاءمة",description:"نقارن العينات والوثائق والشروط التجارية."},{title:"نسّق الخطوات التالية",description:"عند الإمكان، ننتقل إلى التخطيط للطلب والتصدير."}],
    journalTag:"٠٤ — أدلة المشترين",journalTitle:"أدلة عملية للتوريد",journalText:"مقالات متخصصة حول الحجر الطبيعي والمواصفات الفنية والتجارة الدولية.",viewAll:"جميع المقالات",
    ctaTitle:"تبدأ الفرصة القادمة بمحادثة.",ctaText:"أخبرنا بما تبحث عنه لنحدد المعلومات المطلوبة لتقييم فرص التوريد.",ctaButton:"إرسال استفسار توريد",footerText:"ربط الطلب الدولي بفرص التوريد المحتملة في إيران بوضوح في كل خطوة.",footerLegal:"اسم تجاري. يخضع التوفر والشحن والشروط التجارية للتحقق المستقل.",
    aboutTitle:"نهج أكثر وعياً للتوريد من إيران.",aboutText:"أول تجارت پرشين اسم تجاري لخدمات التوريد المستقل وتنسيق الصادرات. نساعد المشترين في الانتقال من الأسئلة الأولية إلى القرارات المدروسة. لا نضمن المخزون أو القدرة الإنتاجية أو أهلية الشحن قبل التحقق.",
    aboutPoints:[{title:"وضوح قبل الالتزام",description:"نوضح المتطلبات الفنية والتجارية قبل تقديم العروض."},{title:"المشتري أولاً",description:"تحدد مواصفاتك ووجهتك أولويات البحث."},{title:"واقع تجاري مدروس",description:"نوازن بين المنتج والخدمات اللوجستية والوثائق والقوانين."}],
    servicesTitle:"عملية توريد واضحة ومتابعة منظمة.",servicesText:"ننسق المتطلبات والتواصل والمقارنات والمتابعة، دون تقديم وعود توريد غير مؤكدة.",
    contactTitle:"ما المنتجات التي تبحث عنها؟",contactText:"سواء كانت مواصفاتك جاهزة أو لا تزال في مرحلة البحث، يسعدنا التعرف على متطلباتك.",
    form:{name:"الاسم الكامل",email:"البريد الإلكتروني للعمل",company:"اسم الشركة (اختياري)",product:"المنتج أو الفئة",destination:"بلد الوجهة",quantity:"الكمية المتوقعة (اختياري)",message:"المواصفات والمتطلبات",submit:"إرسال الطلب",success:"تم استلام طلبك. شكراً لتواصلك معنا.",error:"تعذر إرسال الطلب؛ يرجى المحاولة مجدداً.",privacy:"نستخدم هذه المعلومات فقط لتقييم طلب التوريد والرد عليه."},
    articleEmpty:"مقالات جديدة قيد الإعداد. تابعنا قريباً.",readStory:"اقرأ المقال",sectorDetailsTitle:"معلومات تساعدنا على تقييم طلبك",sectorDetails:["مواصفات المنتج أو المادة","الأبعاد والجودة والتعبئة","الكمية وتكرار الطلب","الوجهة وشروط التسليم","الشهادات والاختبارات المطلوبة","توقعات العينات والتفتيش"]
  }
};
