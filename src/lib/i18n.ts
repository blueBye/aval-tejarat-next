import type { Locale, SectorId } from "./types";

export const sectorIds: SectorId[] = ["natural-stone","travertine","marble","granite"];
export const sectorArt: Record<SectorId,string> = {
  "natural-stone":"/illustrations/stone.svg",
  "travertine":"/illustrations/travertine.svg",
  "marble":"/illustrations/marble.svg",
  "granite":"/illustrations/granite.svg",
};

type Copy = {
  brand:string; subtitle:string; nav:string[]; getInTouch:string; eyebrow:string; hero1:string; heroAccent:string; hero2:string; heroText:string;
  primaryCTA:string; secondaryCTA:string; heroSmall:string[]; tradingNote:string;
  introTag:string; introTitle:string; introText:string; introQuote:string;
  sectorsTag:string; sectorsTitle:string; sectorsText:string; explore:string;
  sectors:Record<SectorId,{name:string; description:string; items:{name:string;desc:string}[]}>;
  processTag:string;processTitle:string;processText:string;steps:{title:string;description:string}[];
  blogTag:string;blogTitle:string;blogText:string;viewAll:string;
  ctaTitle:string;ctaText:string;ctaButton:string;footerText:string;footerLegal:string;
  aboutTitle:string;aboutText:string;aboutPoints:{title:string;description:string}[];
  servicesTitle:string;servicesText:string;
  contactTitle:string;contactText:string;form:{name:string;email:string;company:string;product:string;destination:string;quantity:string;message:string;submit:string;success:string;error:string;privacy:string};
  articleEmpty:string;readStory:string;sectorDetailsTitle:string;sectorDetails:string[];
};
export const copy: Record<Locale,Copy> = {
  en: {
    brand:"AVAL",subtitle:"TEJARAT PERSIAN",nav:["Home","About us","Stone collection","Our process","Blog","Contact"],getInTouch:"Start an inquiry",
    eyebrow:"INTERNATIONAL SOURCING · IRAN", hero1:"From Iran,",heroAccent:"with possibility.",hero2:"To markets worldwide.",
    heroText:"Sourcing and export coordination for Iranian natural stone. Tell us the stone type, finish, dimensions and destination; we help assess the possibilities.",
    primaryCTA:"Tell us what you need",secondaryCTA:"Explore natural stone",heroSmall:["Buyer-led sourcing","Clear commercial dialogue","Verified, case by case"],
    tradingNote:"Independent sourcing • Iran to international markets",introTag:"01 — OUR PHILOSOPHY",introTitle:"Better trade starts with better questions.",
    introText:"Natural stone varies by quarry block and production lot. We start with your reference samples, sizes, finish, quantity and destination, then help assess sourcing and shipping options.",
    introQuote:"We believe transparency is the most valuable thing you can ship.",
    sectorsTag:"02 — OUR FOCUS",sectorsTitle:"Natural stone from Iran, chosen with care.",sectorsText:"Explore natural stone, travertine, marble and granite. Every order is assessed against its requested finish, size, quality and destination.",explore:"Explore stone",
    sectors:{
      "natural-stone":{name:"Natural stone",description:"Explore Iranian stone for architectural, interior and commercial projects, with specifications and availability confirmed per inquiry.",items:[{name:"Travertine",desc:"Façades, cladding and architectural surfaces"},{name:"Marble",desc:"Refined interiors and decorative applications"},{name:"Granite",desc:"High-durability surfaces and exterior use"},{name:"Onyx",desc:"Statement pieces and translucent stone"}]},
      "travertine":{name:"Travertine",description:"Iranian travertine for architectural cladding, exterior facades and detailed stonework; inspect pores, cut and finish before ordering.",items:[{name:"Filled or unfilled",desc:"Review appearance, open pores and surface treatment"},{name:"Vein cut / cross cut",desc:"Select a consistent cut and matching sample"},{name:"Thickness and sizes",desc:"Confirm tolerances, slab or tile dimensions"},{name:"Facade performance",desc:"Specify anchoring, testing and exposure requirements"}]},
      "marble":{name:"Marble",description:"Explore natural marble for interior flooring, walls and feature pieces, with batch selection and finish confirmed for each project.",items:[{name:"Honed and polished",desc:"Agree on reflectivity and traffic suitability"},{name:"Vein continuity",desc:"Discuss slab layouts and bookmatching"},{name:"Sealing and care",desc:"Review acid sensitivity and maintenance"},{name:"Samples and grading",desc:"Compare actual project lots, not photographs alone"}]},
      "granite":{name:"Granite",description:"Durable granite options for demanding architectural uses, subject to agreed testing, dimensions and production capacity.",items:[{name:"Surface finish",desc:"Flamed, honed or polished depending on use"},{name:"Slip resistance",desc:"Specify verified values where required"},{name:"Fabrication",desc:"Define edges, cutouts and dimensional tolerances"},{name:"Shipment preparation",desc:"Agree on crates, protection and inspection"}]}
    },
    processTag:"03 — HOW IT WORKS",processTitle:"A clear route from request to possibility.",processText:"Thoughtful coordination from the first specification to the next commercial decision.",
    steps:[{title:"Tell us your needs",description:"Share specifications, quantities, destination and timeline."},{title:"Explore the options",description:"We identify potential suppliers and clarify relevant details."},{title:"Verify the fit",description:"Compare samples, documentation and commercial conditions."},{title:"Coordinate next steps",description:"When feasible, move toward order and export planning."}],
    blogTag:"04 — STONE BLOG",blogTitle:"Natural stone blog",blogText:"Practical articles on natural stone selection, finishes, tests, and exporting.",viewAll:"All posts",
    ctaTitle:"Your next stone project starts with a clear specification.",ctaText:"Tell us the stone type, finish, dimensions and delivery country, and we can discuss the requirements for a possible quote.",ctaButton:"Send a sourcing inquiry",footerText:"Connecting global architectural projects with natural stone sourcing possibilities in Iran.",footerLegal:"A trade name. Supply and commercial terms are subject to independent verification.",
    aboutTitle:"An informed approach to Iranian natural stone.",aboutText:"Aval Tejarat Persian focuses on sourcing and export coordination for Iranian natural stone. We help buyers clarify stone type, colour, finish, dimensions, volumes, inspection and shipping requirements before approaching potential suppliers. Availability and shipment conditions must be verified for each inquiry.",
    aboutPoints:[{title:"Clarity before commitment",description:"Technical and commercial requirements are clarified before offers are presented."},{title:"A buyer-led approach",description:"Your product brief, destination and priorities shape the investigation."},{title:"Commercial practicality",description:"We consider logistics, documentation and market rules alongside product fit."}],
    servicesTitle:"The sourcing process, made more navigable.",servicesText:"Our role is to organize requirements, supplier outreach, comparison and follow-through, not to promise unverified supply.",
    contactTitle:"What stone are you looking for?",contactText:"Whether your brief is detailed or just beginning, we would be glad to understand your sourcing requirements.",
    form:{name:"Your name",email:"Work email",company:"Company (optional)",product:"Stone type / finish",destination:"Destination country",quantity:"Estimated quantity (optional)",message:"Specifications and requirements",submit:"Send inquiry",success:"Your inquiry has been received. Thank you — we will review the information.",error:"We could not submit your inquiry. Please try again.",privacy:"We use these details only to evaluate and respond to your sourcing inquiry."},
    articleEmpty:"New stone articles are on the way.",readStory:"Read article",sectorDetailsTitle:"What helps us assess your request",sectorDetails:["Material or product specifications","Dimensions, quality standards and packaging","Expected quantity and frequency","Destination and preferred delivery terms","Required certificates or test documentation","Sampling and inspection expectations"]
  },
  fa: {
    brand:"اول",subtitle:"تجارت پرشین",nav:["خانه","درباره ما","انواع سنگ","فرآیند همکاری","وبلاگ","تماس با ما"],getInTouch:"ثبت درخواست تأمین",
    eyebrow:"تأمین بین‌المللی · ایران",hero1:"از ایران،",heroAccent:"با فرصت‌های تازه.",hero2:"به بازارهای جهان.",
    heroText:"بررسی تأمین سنگ طبیعی ایران و هماهنگی صادرات برای خریداران بین‌المللی؛ از انتخاب نوع سنگ و سورت تا ابعاد، پرداخت و مقصد.",
    primaryCTA:"نیازتان را مطرح کنید",secondaryCTA:"انواع سنگ طبیعی",heroSmall:["تأمین بر اساس نیاز خریدار","گفت‌وگوی تجاری شفاف","تأیید موردی شرایط"],
    tradingNote:"تأمین سنگ طبیعی • از ایران به بازارهای جهانی",introTag:"۰۱ — نگاه ما",introTitle:"تجارت بهتر از پرسش‌های بهتر شروع می‌شود.",
    introText:"سنگ طبیعی در هر سورت و کوپ ویژگی‌های متفاوتی دارد. ابتدا نوع سنگ، نمونه مرجع، ابعاد، پرداخت، حجم و مقصد را مشخص می‌کنیم و سپس امکان تأمین را بررسی می‌کنیم.",
    introQuote:"باور داریم شفافیت ارزشمندترین بخش هر همکاری تجاری است.",sectorsTag:"۰۲ — حوزه‌های تمرکز",sectorsTitle:"سنگ ایرانی، متناسب با پروژه شما.",sectorsText:"سنگ طبیعی، تراورتن، مرمریت و گرانیت را بشناسید. مشخصات، سورت، ابعاد و امکان تأمین برای هر سفارش جداگانه بررسی می‌شود.",explore:"آشنایی با سنگ",
    sectors:{
      "natural-stone":{name:"سنگ طبیعی",description:"بررسی تأمین سنگ طبیعی ایران برای پروژه‌های ساختمانی و تجاری، پس از تأیید مشخصات و موجودی هر سفارش.",items:[{name:"تراورتن",desc:"نما و سطوح معماری"},{name:"مرمر",desc:"فضاهای داخلی و کاربردهای تزئینی"},{name:"گرانیت",desc:"سطوح مقاوم و کاربردهای بیرونی"},{name:"اونیکس",desc:"سنگ‌های خاص و نیمه‌شفاف"}]},
      "travertine":{name:"تراورتن",description:"بررسی گزینه‌های تراورتن ایران برای نمای ساختمان و پوشش‌های معماری، با تأیید برش، پرداخت، ابعاد و کیفیت هر سفارش.",items:[{name:"پرشده یا بدون پرکننده",desc:"بررسی تخلخل، ظاهر و فرآوری سطح"},{name:"بی‌موج یا موج‌دار",desc:"تطبیق جهت برش و نمونه مرجع"},{name:"ضخامت و ابعاد",desc:"تعیین تلرانس‌های قابل قبول"},{name:"کاربرد نما",desc:"بررسی الزامات نصب، آزمایش و شرایط محیطی"}]},
      "marble":{name:"سنگ مرمریت",description:"سنگ مرمریت طبیعی برای کف، دیوار و فضاهای داخلی؛ هماهنگی طرح و رنگ هر بچ تولید با نمونه تأییدشده.",items:[{name:"پرداخت مات یا براق",desc:"انتخاب بر اساس کاربرد و رفت‌وآمد"},{name:"رگه‌بندی",desc:"تطبیق چیدمان اسلب و بوک‌مچ"},{name:"نگهداری",desc:"آگاهی از حساسیت به اسید و لک"},{name:"نمونه و سورت",desc:"مقایسه محموله واقعی با نمونه مرجع"}]},
      "granite":{name:"گرانیت",description:"بررسی گرانیت برای سطوح پرتردد و پروژه‌های معماری، با توجه به نتایج آزمون، ابعاد و ظرفیت تأمین.",items:[{name:"نوع پرداخت",desc:"فلیم، مات یا براق متناسب با محیط"},{name:"مقاومت لغزش",desc:"تعیین شاخص‌های لازم برای پروژه"},{name:"فرآوری",desc:"دقت ابعاد، برش و لبه‌ها"},{name:"آماده‌سازی حمل",desc:"بسته‌بندی، حفاظت و بازرسی"}]}
    },
    processTag:"۰۳ — روش همکاری",processTitle:"مسیری روشن از درخواست تا تصمیم.",processText:"هماهنگی دقیق از اولین نیازمندی تا گام تجاری بعدی.",
    steps:[{title:"شرح نیازمندی",description:"مشخصات، حجم، مقصد و زمان موردنظر را بیان کنید."},{title:"بررسی گزینه‌ها",description:"تأمین‌کنندگان احتمالی و شرایط اولیه بررسی می‌شوند."},{title:"ارزیابی تناسب",description:"نمونه‌ها، مدارک و شرایط تجاری مقایسه می‌شوند."},{title:"هماهنگی مراحل بعد",description:"در صورت امکان، سفارش و برنامه‌ریزی صادرات دنبال می‌شود."}],
    blogTag:"۰۴ — وبلاگ سنگ",blogTitle:"وبلاگ سنگ طبیعی",blogText:"مقاله‌های کاربردی درباره سنگ ایرانی، سورت، پرداخت، استانداردها و صادرات.",viewAll:"همه پست‌ها",
    ctaTitle:"پروژه سنگ بعدی شما از یک درخواست دقیق آغاز می‌شود.",ctaText:"نوع سنگ، ابعاد، پرداخت و مقصد را بگویید تا امکان تأمین و گام‌های بعدی را بررسی کنیم.",ctaButton:"ثبت درخواست تأمین",footerText:"ارتباط خریداران بین‌المللی با فرصت‌های تأمین سنگ طبیعی ایران، با تأکید بر شفافیت و مشخصات قابل بررسی.",footerLegal:"نام تجاری؛ موجودی، امکان صادرات و شرایط تجاری نیازمند بررسی و تأیید است.",
    aboutTitle:"نگاهی دقیق‌تر به تأمین سنگ طبیعی ایران.",aboutText:"اول تجارت پرشین بر بررسی تأمین سنگ طبیعی ایران و هماهنگی صادرات تمرکز دارد. نوع سنگ، رنگ، پرداخت، ابعاد و سورت هر سفارش را با خریدار روشن می‌کنیم. موجودی، کیفیت و امکان ارسال برای هر درخواست باید جداگانه تأیید شود.",
    aboutPoints:[{title:"شفافیت پیش از تعهد",description:"پیش از ارائه پیشنهاد، نیازهای فنی و تجاری روشن می‌شوند."},{title:"شروع از نیاز خریدار",description:"نوع کالا، مقصد و اولویت‌های شما مسیر بررسی را تعیین می‌کند."},{title:"نگاه واقع‌بینانه",description:"لجستیک، مدارک و مقررات در کنار کیفیت محصول سنجیده می‌شوند."}],
    servicesTitle:"فرآیندی روشن برای تأمین سنگ طبیعی.",servicesText:"نقش ما تنظیم نیازمندی‌ها، ارتباط با تأمین‌کنندگان و بررسی گزینه‌هاست؛ نه وعده عرضه تأییدنشده.",
    contactTitle:"به دنبال چه سنگی هستید؟",contactText:"چه جزئیات سفارش آماده باشد و چه هنوز در مرحله بررسی باشید، مایل هستیم نیاز شما را بهتر بشناسیم.",
    form:{name:"نام و نام خانوادگی",email:"ایمیل کاری",company:"نام شرکت (اختیاری)",product:"نوع سنگ و پرداخت",destination:"کشور مقصد",quantity:"مقدار تقریبی (اختیاری)",message:"مشخصات و توضیحات درخواست",submit:"ارسال درخواست",success:"درخواست شما ثبت شد. از اعتمادتان سپاسگزاریم.",error:"ارسال درخواست انجام نشد؛ لطفاً دوباره تلاش کنید.",privacy:"اطلاعات صرفاً برای ارزیابی و پاسخ به درخواست شما استفاده می‌شود."},
    articleEmpty:"مطالب جدید درباره سنگ طبیعی به‌زودی منتشر می‌شوند.",readStory:"مطالعه مقاله",sectorDetailsTitle:"اطلاعات مفید برای بررسی درخواست",sectorDetails:["مشخصات دقیق کالا یا مواد","ابعاد، استاندارد کیفیت و بسته‌بندی","حجم و تناوب سفارش","مقصد و شرایط تحویل ترجیحی","گواهی‌ها و مدارک آزمون","انتظارها درباره نمونه و بازرسی"]
  },
  ar: {
    brand:"أول",subtitle:"تجارت پرشين",nav:["الرئيسية","من نحن","أنواع الحجر","آلية العمل","المدونة","تواصل معنا"],getInTouch:"طلب عرض توريد",
    eyebrow:"التوريد الدولي · إيران",hero1:"من إيران،",heroAccent:"بفرص جديدة.",hero2:"إلى أسواق العالم.",
    heroText:"نساعد المشترين الدوليين على تقييم فرص توريد الحجر الطبيعي الإيراني وتنسيق التصدير، من النوع والتشطيب إلى الأبعاد والوجهة.",
    primaryCTA:"أخبرنا بما تحتاجه",secondaryCTA:"استكشف الحجر الطبيعي",heroSmall:["التوريد وفق احتياجات المشتري","تواصل تجاري واضح","التحقق لكل طلب"],
    tradingNote:"توريد مستقل • من إيران إلى الأسواق العالمية",introTag:"٠١ — فلسفتنا",introTitle:"التجارة الأفضل تبدأ بالأسئلة الصحيحة.",
    introText:"تختلف الأحجار الطبيعية بين الدفعات. نبدأ بعينة مرجعية ومقاسات وتشطيب وكمية ووجهة واضحة، ثم نراجع إمكانات التوريد والشحن.",
    introQuote:"نؤمن بأن الشفافية هي أثمن ما في كل شراكة تجارية.",sectorsTag:"٠٢ — مجالات التركيز",sectorsTitle:"حجر طبيعي من إيران، باختيار مدروس.",sectorsText:"استكشف الحجر الطبيعي والترافرتين والرخام والجرانيت. تُراجع المواصفات والتشطيبات والكميات لكل طلب بصورة مستقلة.",explore:"استكشف الحجر",
    sectors:{
      "natural-stone":{name:"الحجر الطبيعي",description:"استكشاف توريد الحجر الإيراني للمشاريع المعمارية والتجارية بعد التحقق من المواصفات والتوفر.",items:[{name:"الترافرتين",desc:"الواجهات والأسطح المعمارية"},{name:"الرخام",desc:"المساحات الداخلية والزينة"},{name:"الجرانيت",desc:"الأسطح المتينة والاستخدام الخارجي"},{name:"الأونيكس",desc:"الأحجار المميزة وشبه الشفافة"}]},
      "travertine":{name:"الترافرتين",description:"خيارات الترافرتين الإيراني للواجهات والتكسية المعمارية، بعد التحقق من المقاسات والتشطيب وعينة الطلب.",items:[{name:"مع ملء المسام أو بدونه",desc:"فحص المسام والملمس والمعالجة"},{name:"اتجاه القطع",desc:"اختيار توافق العروق مع العينة"},{name:"الأبعاد والسماكة",desc:"تحديد التفاوتات المقبولة"},{name:"استخدام الواجهات",desc:"مراجعة المتطلبات البيئية والاختبارات"}]},
      "marble":{name:"الرخام",description:"استكشاف الرخام الطبيعي للأرضيات والجدران والعناصر الداخلية، مع توثيق اختيار الدفعات والتشطيب.",items:[{name:"مصقول أو مطفي",desc:"اختيار التشطيب حسب الاستخدام"},{name:"تناسق العروق",desc:"تنسيق الألواح والأنماط"},{name:"العناية والصيانة",desc:"مراجعة حساسية الأحماض والبقع"},{name:"العينات والفرز",desc:"مطابقة دفعات المشروع مع العينة المرجعية"}]},
      "granite":{name:"الجرانيت",description:"خيارات الجرانيت للواجهات والأسطح التي تتطلب المتانة، وفق القياسات والاختبارات وقدرة التوريد المؤكدة.",items:[{name:"السطح النهائي",desc:"ملتهب أو مصقول أو مطفي"},{name:"مقاومة الانزلاق",desc:"طلب قيم الاختبارات عند الحاجة"},{name:"التصنيع",desc:"القص والحواف وحدود التفاوت"},{name:"تجهيز الشحن",desc:"صناديق الحماية والفحص"}]}
    },
    processTag:"٠٣ — كيف نعمل",processTitle:"مسار واضح من الطلب إلى القرار.",processText:"تنسيق مدروس من المواصفات الأولى إلى الخطوة التجارية التالية.",
    steps:[{title:"شارك متطلباتك",description:"أرسل المواصفات والكميات والوجهة والوقت المتوقع."},{title:"استكشف الخيارات",description:"نحدد موردين محتملين ونوضح التفاصيل الضرورية."},{title:"تحقق من الملاءمة",description:"نقارن العينات والوثائق والشروط التجارية."},{title:"نسّق الخطوات التالية",description:"عند الإمكان، ننتقل إلى التخطيط للطلب والتصدير."}],
    blogTag:"٠٤ — مدونة الحجر",blogTitle:"مدونة الحجر الطبيعي",blogText:"مقالات عملية عن اختيار الحجر الإيراني والتشطيبات والمعايير وتجهيز التصدير.",viewAll:"جميع المنشورات",
    ctaTitle:"مشروع الحجر القادم يبدأ بمواصفات واضحة.",ctaText:"أخبرنا بنوع الحجر والمقاسات والتشطيب والوجهة لنراجع متطلبات التوريد.",ctaButton:"إرسال استفسار توريد",footerText:"ربط المشاريع الدولية بخيارات توريد الحجر الطبيعي الإيراني بمواصفات واضحة.",footerLegal:"اسم تجاري. يخضع التوفر والشحن والشروط التجارية للتحقق المستقل.",
    aboutTitle:"نهج مدروس لتوريد الحجر الطبيعي الإيراني.",aboutText:"تركز أول تجارت پرشين على تنسيق توريد الحجر الطبيعي الإيراني وتصديره. نوضح مع المشترين نوع الحجر واللون والتشطيب والأبعاد والفرز؛ ويخضع التوفر والشحن للتحقق لكل طلب.",
    aboutPoints:[{title:"وضوح قبل الالتزام",description:"نوضح المتطلبات الفنية والتجارية قبل تقديم العروض."},{title:"المشتري أولاً",description:"تحدد مواصفاتك ووجهتك أولويات البحث."},{title:"واقع تجاري مدروس",description:"نوازن بين المنتج والخدمات اللوجستية والوثائق والقوانين."}],
    servicesTitle:"عملية توريد واضحة ومتابعة منظمة.",servicesText:"ننسق المتطلبات والتواصل والمقارنات والمتابعة، دون تقديم وعود توريد غير مؤكدة.",
    contactTitle:"ما نوع الحجر الذي تبحث عنه؟",contactText:"سواء كانت مواصفاتك جاهزة أو لا تزال في مرحلة البحث، يسعدنا التعرف على متطلباتك.",
    form:{name:"الاسم الكامل",email:"البريد الإلكتروني للعمل",company:"اسم الشركة (اختياري)",product:"نوع الحجر والتشطيب",destination:"بلد الوجهة",quantity:"الكمية المتوقعة (اختياري)",message:"المواصفات والمتطلبات",submit:"إرسال الطلب",success:"تم استلام طلبك. شكراً لتواصلك معنا.",error:"تعذر إرسال الطلب؛ يرجى المحاولة مجدداً.",privacy:"نستخدم هذه المعلومات فقط لتقييم طلب التوريد والرد عليه."},
    articleEmpty:"مقالات جديدة عن الحجر الطبيعي قيد الإعداد.",readStory:"اقرأ المقال",sectorDetailsTitle:"معلومات تساعدنا على تقييم طلبك",sectorDetails:["مواصفات المنتج أو المادة","الأبعاد والجودة والتعبئة","الكمية وتكرار الطلب","الوجهة وشروط التسليم","الشهادات والاختبارات المطلوبة","توقعات العينات والتفتيش"]
  }
};
