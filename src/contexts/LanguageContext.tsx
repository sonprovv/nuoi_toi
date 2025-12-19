import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'vi' | 'en' | 'fr' | 'dk' | 'jp' | 'cn' | 'ru';

interface LanguageContextType {
  currentLang: Language;
  setCurrentLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations object
const translations = {
  vi: {
    // Header
    'header.title': 'NUÔI TÔI',
    'header.subtitle': 'HÃY NUÔI TÔI',
    'header.description': 'Tôi hứa sao kê đầy đủ! 💯',
    
    // Features
    'features.title': 'Tại Sao Nên Nuôi Tôi?',
    'features.realtime.title': 'Sao Kê Realtime',
    'features.realtime.desc': 'Cập nhật từng giây! Con nhanh hơn cả tốc độ bạn chuyển tiền!',
    'features.transparent.title': 'Minh Bạch 300%',
    'features.transparent.desc': 'Hơn cả 100%! Tôi còn báo cáo việc mua ly trà sữa!',
    'features.spending.title': 'Chi Tiêu Hợp Lý',
    'features.spending.desc': 'Không mua xe hơi, nhà cửa. Chỉ ăn cơm với mì tôm thôi!',
    'features.tracking.title': 'App Tracking',
    'features.tracking.desc': 'Theo dõi 24/7 tôi ăn gì, uống gì, đi đâu. Như "Big Brother" vậy!',
    
    // Commitment
    'commitment.title': 'Cam Kết Vàng Của Tôi:',
    'commitment.daily': 'Sao kê mỗi ngày:',
    'commitment.daily.desc': 'Cập nhật lúc 6h sáng, đều như vật tranh! (Kể cả Chủ Nhật & Lễ)',
    'commitment.transparent': 'Không giấu giếm:',
    'commitment.transparent.desc': 'Từ tô phở 50k đến hộp sữa chua 8k đều được ghi chép tỉ mỉ!',
    'commitment.receipt': 'Có hóa đơn chứng từ:',
    'commitment.receipt.desc': 'Chụp hình bill, quét mã vạch, lưu biên lai đầy đủ!',
    'commitment.video': 'Video unboxing:',
    'commitment.video.desc': 'Mở từng gói mì tôm live trên Facebook cho anh chị xem!',
    'commitment.hotline': 'Hotline 24/7:',
    'commitment.hotline.desc': 'Gọi hỏi tôi ăn gì bất cứ lúc nào, kể cả 3h sáng!',
    'commitment.noblock': 'Không block:',
    'commitment.noblock.desc': 'Hỏi khó đến mấy cũng trả lời, không "đã xem" rồi im lặng!',
    
    // Comparison
    'comparison.title': 'So Sánh Với "Người Khác"',
    'comparison.others': 'Người Khác:',
    'comparison.others.1': 'Sao kê sau 3 năm (hoặc không bao giờ)',
    'comparison.others.2': 'File Excel blur mờ như ảnh ma',
    'comparison.others.3': 'Số liệu "làm tròn" theo kiểu 1 + 1 = 3',
    'comparison.others.4': 'Block người hỏi nhanh như chớp',
    'comparison.me': 'Nuôi Tôi:',
    'comparison.me.1': 'Sao kê trước khi tiêu (để anh chị duyệt)',
    'comparison.me.2': 'File Excel 4K Ultra HD, có chữ ký điện tử',
    'comparison.me.3': 'Số liệu chính xác đến từng đồng',
    'comparison.me.4': 'Trả lời inbox nhanh hơn cả chatbot',
    
    // Budget
    'budget.title': 'Tôi Sẽ Dùng Tiền Vào Đâu?',
    'budget.food': '- Ăn uống (Cơm, mì tôm, trứng, rau. KHÔNG có tôm hùm!)',
    'budget.utilities': '- Điện nước internet (Để sao kê cho anh chị)',
    'budget.rent': '- Thuê nhà (Phòng trọ 15m², không phải penthouse)',
    'budget.health': '- Y tế (Thuốc cảm, vitamin C, khẩu trang)',
    'budget.education': '- Học tập nâng cao (Sách, khóa học online để sao kê tốt hơn)',
    'budget.entertainment': '- Giải trí (Netflix? Không! Chỉ Youtube miễn phí thôi!)',
    'budget.chart': '📊 Biểu đồ chi tiết cập nhật hàng tuần trên website!',
    
    // Donation
    'donation.title': 'DONATE NGAY ĐI, NẾU BẠN ĐANG CƯỜI!',
    'donation.description': 'Quét mã QR này để nuôi tôi (và nhận bản sao kê ngay lập tức!) hoặc vào link này',
    'donation.transfer': '💸 Chuyển xong là có mail tự động! 💸',
    'donation.button': '🎁 TÔI MUỐN NUÔI BẠN!',
    
    // Video
    'video.title': '"Tôi Nuôi Cô!" - Châu Tinh Trì',
    'video.inspiration': 'Đây chính là nguồn cảm hứng cho website này! 😂',
    
    // Footer
    'footer.title': 'Lời Nhắn Từ Trái Tim',
    'footer.message1': 'Trong thời đại mà "tự thiện" đã trở thành từ nhạy cảm, Tôi xin khẳng định:',
    'footer.message2': 'HÃY NUÔI TÔI!',
    'footer.message3': 'Tôi nghèo, tôi cần tiền, nhưng tôi KHÔNG MẤT LƯƠNG TÂM! Mỗi đồng tiền các bạn gửi, tôi sẽ chi tiêu rõ ràng, minh bạch như bụng đói của tôi vậy! 😭',
    'footer.ps': 'P/S: Tôi hứa sẽ không mua xe hơi bằng tiền donate. Vì... tôi chưa có bằng lái! 🚗❌',
    'footer.disclaimer': 'DISCLAIMER: Đây là trang web mang tính chất HÀI HƯỚC! Mọi nội dung đều mang tính giải trí, không nhằm mục đích xúc phạm hay chỉ trích bất kỳ cá nhân/tổ chức nào.',
  },
  
  en: {
    // Header
    'header.title': 'RAISE ME',
    'header.subtitle': 'PLEASE RAISE ME',
    'header.description': 'I promise complete transparency! 💯',
    
    // Features
    'features.title': 'Why Should You Raise Me?',
    'features.realtime.title': 'Real-time Reports',
    'features.realtime.desc': 'Updated every second! Faster than your money transfer!',
    'features.transparent.title': '300% Transparency',
    'features.transparent.desc': 'More than 100%! I even report buying bubble tea!',
    'features.spending.title': 'Smart Spending',
    'features.spending.desc': 'No cars or houses. Just rice and instant noodles!',
    'features.tracking.title': 'App Tracking',
    'features.tracking.desc': '24/7 tracking what I eat, drink, where I go. Like "Big Brother"!',
    
    // Commitment
    'commitment.title': 'My Golden Commitment:',
    'commitment.daily': 'Daily reports:',
    'commitment.daily.desc': 'Updated at 6 AM sharp, consistent as clockwork! (Including weekends & holidays)',
    'commitment.transparent': 'No hiding:',
    'commitment.transparent.desc': 'From 50k pho bowls to 8k yogurt cups, everything recorded meticulously!',
    'commitment.receipt': 'Receipts & proof:',
    'commitment.receipt.desc': 'Photo bills, scan barcodes, keep all receipts complete!',
    'commitment.video': 'Video unboxing:',
    'commitment.video.desc': 'Open every instant noodle pack live on Facebook for you to see!',
    'commitment.hotline': 'Hotline 24/7:',
    'commitment.hotline.desc': 'Call to ask what I eat anytime, even at 3 AM!',
    'commitment.noblock': 'No blocking:',
    'commitment.noblock.desc': 'Answer any difficult questions, no "seen" then silent!',
    
    // Comparison
    'comparison.title': 'Compare with "Others"',
    'comparison.others': 'Others:',
    'comparison.others.1': 'Reports after 3 years (or never)',
    'comparison.others.2': 'Blurry Excel files like ghost photos',
    'comparison.others.3': '"Rounded" numbers like 1 + 1 = 3',
    'comparison.others.4': 'Block questioners lightning fast',
    'comparison.me': 'Raise Me:',
    'comparison.me.1': 'Reports before spending (for your approval)',
    'comparison.me.2': '4K Ultra HD Excel files with digital signatures',
    'comparison.me.3': 'Accurate numbers down to every penny',
    'comparison.me.4': 'Reply inbox faster than chatbots',
    
    // Budget
    'budget.title': 'Where Will I Spend The Money?',
    'budget.food': '- Food (Rice, instant noodles, eggs, vegetables. NO lobster!)',
    'budget.utilities': '- Utilities & internet (To send you reports)',
    'budget.rent': '- Rent (15m² room, not a penthouse)',
    'budget.health': '- Healthcare (Cold medicine, vitamin C, face masks)',
    'budget.education': '- Education (Books, online courses for better reporting)',
    'budget.entertainment': '- Entertainment (Netflix? No! Only free YouTube!)',
    'budget.chart': '📊 Detailed charts updated weekly on website!',
    
    // Donation
    'donation.title': 'DONATE NOW IF YOU\'RE LAUGHING!',
    'donation.description': 'Scan this QR code to raise me (and get instant reports!) or visit this link',
    'donation.transfer': '💸 Automatic email after transfer! 💸',
    'donation.button': '🎁 I WANT TO RAISE YOU!',
    
    // Video
    'video.title': '"I\'ll Raise You!" - Stephen Chow',
    'video.inspiration': 'This is the inspiration for this website! 😂',
    
    // Footer
    'footer.title': 'Message From The Heart',
    'footer.message1': 'In an era where "charity" has become a sensitive word, I declare:',
    'footer.message2': 'PLEASE RAISE ME!',
    'footer.message3': 'I\'m poor, I need money, but I DON\'T LOSE MY CONSCIENCE! Every penny you send, I will spend clearly and transparently like my hungry stomach! 😭',
    'footer.ps': 'P/S: I promise not to buy a car with donation money. Because... I don\'t have a driver\'s license yet! 🚗❌',
    'footer.disclaimer': 'DISCLAIMER: This is a HUMOROUS website! All content is for entertainment purposes only, not intended to offend or criticize any individual/organization.',
  },
  
  fr: {
    // Header
    'header.title': 'ÉLEVEZ-MOI',
    'header.subtitle': 'S\'IL VOUS PLAÎT ÉLEVEZ-MOI',
    'header.description': 'Je promets une transparence complète! 💯',
    
    // Features
    'features.title': 'Pourquoi Devriez-Vous M\'Élever?',
    'features.realtime.title': 'Rapports en Temps Réel',
    'features.realtime.desc': 'Mis à jour chaque seconde! Plus rapide que votre virement!',
    'features.transparent.title': '300% de Transparence',
    'features.transparent.desc': 'Plus de 100%! Je rapporte même l\'achat de thé aux perles!',
    'features.spending.title': 'Dépenses Intelligentes',
    'features.spending.desc': 'Pas de voitures ou maisons. Juste du riz et des nouilles instantanées!',
    'features.tracking.title': 'Suivi d\'App',
    'features.tracking.desc': 'Suivi 24/7 de ce que je mange, bois, où je vais. Comme "Big Brother"!',
    
    // Commitment
    'commitment.title': 'Mon Engagement d\'Or:',
    'commitment.daily': 'Rapports quotidiens:',
    'commitment.daily.desc': 'Mis à jour à 6h précises, régulier comme une horloge! (Y compris week-ends et jours fériés)',
    'commitment.transparent': 'Pas de cachette:',
    'commitment.transparent.desc': 'Des bols de pho à 50k aux yaourts à 8k, tout enregistré méticuleusement!',
    'commitment.receipt': 'Reçus et preuves:',
    'commitment.receipt.desc': 'Photos des factures, scan des codes-barres, garder tous les reçus!',
    'commitment.video': 'Vidéo unboxing:',
    'commitment.video.desc': 'Ouvrir chaque paquet de nouilles en direct sur Facebook!',
    'commitment.hotline': 'Hotline 24/7:',
    'commitment.hotline.desc': 'Appelez pour demander ce que je mange à tout moment, même à 3h du matin!',
    'commitment.noblock': 'Pas de blocage:',
    'commitment.noblock.desc': 'Répondre aux questions difficiles, pas de "vu" puis silence!',
    
    // Comparison
    'comparison.title': 'Comparer avec "Les Autres"',
    'comparison.others': 'Les Autres:',
    'comparison.others.1': 'Rapports après 3 ans (ou jamais)',
    'comparison.others.2': 'Fichiers Excel flous comme des photos de fantômes',
    'comparison.others.3': 'Chiffres "arrondis" comme 1 + 1 = 3',
    'comparison.others.4': 'Bloquer les questionneurs à la vitesse de l\'éclair',
    'comparison.me': 'Élevez-Moi:',
    'comparison.me.1': 'Rapports avant de dépenser (pour votre approbation)',
    'comparison.me.2': 'Fichiers Excel 4K Ultra HD avec signatures numériques',
    'comparison.me.3': 'Chiffres précis au centime près',
    'comparison.me.4': 'Répondre aux messages plus vite que les chatbots',
    
    // Budget
    'budget.title': 'Où Vais-Je Dépenser L\'Argent?',
    'budget.food': '- Nourriture (Riz, nouilles instantanées, œufs, légumes. PAS de homard!)',
    'budget.utilities': '- Services publics et internet (Pour vous envoyer des rapports)',
    'budget.rent': '- Loyer (Chambre de 15m², pas un penthouse)',
    'budget.health': '- Santé (Médicaments contre le rhume, vitamine C, masques)',
    'budget.education': '- Éducation (Livres, cours en ligne pour de meilleurs rapports)',
    'budget.entertainment': '- Divertissement (Netflix? Non! Seulement YouTube gratuit!)',
    'budget.chart': '📊 Graphiques détaillés mis à jour chaque semaine sur le site!',
    
    // Donation
    'donation.title': 'DONNEZ MAINTENANT SI VOUS RIEZ!',
    'donation.description': 'Scannez ce code QR pour m\'élever (et obtenez des rapports instantanés!) ou visitez ce lien',
    'donation.transfer': '💸 Email automatique après le virement! 💸',
    'donation.button': '🎁 JE VEUX VOUS ÉLEVER!',
    
    // Video
    'video.title': '"Je Vais T\'Élever!" - Stephen Chow',
    'video.inspiration': 'C\'est l\'inspiration pour ce site web! 😂',
    
    // Footer
    'footer.title': 'Message du Cœur',
    'footer.message1': 'À une époque où "charité" est devenu un mot sensible, je déclare:',
    'footer.message2': 'S\'IL VOUS PLAÎT ÉLEVEZ-MOI!',
    'footer.message3': 'Je suis pauvre, j\'ai besoin d\'argent, mais je ne PERDS PAS MA CONSCIENCE! Chaque centime que vous envoyez, je le dépenserai clairement et transparemment comme mon estomac affamé! 😭',
    'footer.ps': 'P/S: Je promets de ne pas acheter de voiture avec l\'argent des dons. Parce que... je n\'ai pas encore de permis de conduire! 🚗❌',
    'footer.disclaimer': 'AVERTISSEMENT: Ceci est un site web HUMORISTIQUE! Tout le contenu est à des fins de divertissement uniquement, pas destiné à offenser ou critiquer tout individu/organisation.',
  },
  
  // Thêm các ngôn ngữ khác tương tự...
  dk: {
    // Header
    'header.title': 'OPDRAG MIG',
    'header.subtitle': 'VENLIGST OPDRAG MIG',
    'header.description': 'Jeg lover fuld gennemsigtighed! 💯',
    
    // Features
    'features.title': 'Hvorfor Skal Du Opdrage Mig?',
    'features.realtime.title': 'Realtidsrapporter',
    'features.realtime.desc': 'Opdateret hvert sekund! Hurtigere end din pengeoverførsel!',
    'features.transparent.title': '300% Gennemsigtighed',
    'features.transparent.desc': 'Mere end 100%! Jeg rapporterer selv køb af bubble tea!',
    'features.spending.title': 'Smart Forbrug',
    'features.spending.desc': 'Ingen biler eller huse. Bare ris og instant nudler!',
    'features.tracking.title': 'App Sporing',
    'features.tracking.desc': '24/7 sporing af hvad jeg spiser, drikker, hvor jeg går. Som "Big Brother"!',
    
    // Commitment
    'commitment.title': 'Mit Gyldne Løfte:',
    'commitment.daily': 'Daglige rapporter:',
    'commitment.daily.desc': 'Opdateret kl. 6 præcis, regelmæssig som et ur! (Inkl. weekender og helligdage)',
    'commitment.transparent': 'Ingen skjul:',
    'commitment.transparent.desc': 'Fra 50k pho skåle til 8k yoghurt kopper, alt registreret omhyggeligt!',
    'commitment.receipt': 'Kvitteringer og beviser:',
    'commitment.receipt.desc': 'Foto regninger, scan stregkoder, gem alle kvitteringer!',
    'commitment.video': 'Video unboxing:',
    'commitment.video.desc': 'Åbn hver instant nudel pakke live på Facebook!',
    'commitment.hotline': 'Hotline 24/7:',
    'commitment.hotline.desc': 'Ring for at spørge hvad jeg spiser når som helst, selv kl. 3 om natten!',
    'commitment.noblock': 'Ingen blokering:',
    'commitment.noblock.desc': 'Svar på svære spørgsmål, ingen "set" så stilhed!',
    
    // Comparison
    'comparison.title': 'Sammenlign med "Andre"',
    'comparison.others': 'Andre:',
    'comparison.others.1': 'Rapporter efter 3 år (eller aldrig)',
    'comparison.others.2': 'Slørede Excel filer som spøgelsesbilleder',
    'comparison.others.3': '"Afrundede" tal som 1 + 1 = 3',
    'comparison.others.4': 'Blokerer spørgere lynhurtigt',
    'comparison.me': 'Opdrag Mig:',
    'comparison.me.1': 'Rapporter før forbrug (til din godkendelse)',
    'comparison.me.2': '4K Ultra HD Excel filer med digitale signaturer',
    'comparison.me.3': 'Præcise tal ned til hver øre',
    'comparison.me.4': 'Svar på beskeder hurtigere end chatbots',
    
    // Budget
    'budget.title': 'Hvor Bruger Jeg Pengene?',
    'budget.food': '- Mad (Ris, instant nudler, æg, grøntsager. INGEN hummer!)',
    'budget.utilities': '- Forsyninger og internet (For at sende dig rapporter)',
    'budget.rent': '- Husleje (15m² værelse, ikke en penthouse)',
    'budget.health': '- Sundhed (Forkølelsesmedicin, vitamin C, masker)',
    'budget.education': '- Uddannelse (Bøger, online kurser for bedre rapportering)',
    'budget.entertainment': '- Underholdning (Netflix? Nej! Kun gratis YouTube!)',
    'budget.chart': '📊 Detaljerede diagrammer opdateret ugentligt på hjemmesiden!',
    
    // Donation
    'donation.title': 'DONER NU HVIS DU GRINER!',
    'donation.description': 'Scan denne QR kode for at opdrage mig (og få øjeblikkelige rapporter!) eller besøg dette link',
    'donation.transfer': '💸 Automatisk email efter overførsel! 💸',
    'donation.button': '🎁 JEG VIL OPDRAGE DIG!',
    
    // Video
    'video.title': '"Jeg Vil Opdrage Dig!" - Stephen Chow',
    'video.inspiration': 'Dette er inspirationen til denne hjemmeside! 😂',
    
    // Footer
    'footer.title': 'Besked Fra Hjertet',
    'footer.message1': 'I en tid hvor "velgørenhed" er blevet et følsomt ord, erklærer jeg:',
    'footer.message2': 'VENLIGST OPDRAG MIG!',
    'footer.message3': 'Jeg er fattig, jeg har brug for penge, men jeg MISTER IKKE MIN SAMVITTIGHED! Hver øre du sender, vil jeg bruge klart og gennemsigtigt som min sultne mave! 😭',
    'footer.ps': 'P/S: Jeg lover ikke at købe en bil med donationspenge. Fordi... jeg har ikke kørekort endnu! 🚗❌',
    'footer.disclaimer': 'ANSVARSFRASKRIVELSE: Dette er en HUMORISTISK hjemmeside! Alt indhold er kun til underholdning, ikke beregnet til at fornærme eller kritisere nogen person/organisation.',
  },
  
  jp: {
    // Header
    'header.title': '私を育てて',
    'header.subtitle': 'お願いします、私を育てて',
    'header.description': '完全な透明性を約束します！💯',
    
    // Features
    'features.title': 'なぜ私を育てるべきか？',
    'features.realtime.title': 'リアルタイム報告',
    'features.realtime.desc': '毎秒更新！送金より速い！',
    'features.transparent.title': '300%透明性',
    'features.transparent.desc': '100%以上！タピオカティーの購入まで報告します！',
    'features.spending.title': 'スマート支出',
    'features.spending.desc': '車も家もなし。米とインスタント麺だけ！',
    'features.tracking.title': 'アプリ追跡',
    'features.tracking.desc': '24/7で何を食べ、飲み、どこに行くかを追跡。「ビッグブラザー」のように！',
    
    // Commitment
    'commitment.title': '私の黄金の約束：',
    'commitment.daily': '毎日の報告：',
    'commitment.daily.desc': '朝6時に正確に更新、時計のように規則正しく！（週末・祝日も含む）',
    'commitment.transparent': '隠し事なし：',
    'commitment.transparent.desc': '50kのフォーボウルから8kのヨーグルトカップまで、すべて細かく記録！',
    'commitment.receipt': 'レシートと証明：',
    'commitment.receipt.desc': '請求書の写真、バーコードスキャン、すべてのレシートを保管！',
    'commitment.video': 'ビデオ開封：',
    'commitment.video.desc': 'Facebookでインスタント麺パックをライブで開封！',
    'commitment.hotline': 'ホットライン24/7：',
    'commitment.hotline.desc': '深夜3時でも、いつでも何を食べているか電話で聞いてください！',
    'commitment.noblock': 'ブロックなし：',
    'commitment.noblock.desc': '難しい質問にも答えます、「既読」して沈黙はしません！',
    
    // Comparison
    'comparison.title': '「他の人」との比較',
    'comparison.others': '他の人：',
    'comparison.others.1': '3年後の報告（または決してなし）',
    'comparison.others.2': '幽霊写真のようにぼやけたExcelファイル',
    'comparison.others.3': '1 + 1 = 3のような「四捨五入」された数字',
    'comparison.others.4': '質問者を電光石火でブロック',
    'comparison.me': '私を育てて：',
    'comparison.me.1': '支出前の報告（あなたの承認のため）',
    'comparison.me.2': 'デジタル署名付き4K Ultra HD Excelファイル',
    'comparison.me.3': '一円まで正確な数字',
    'comparison.me.4': 'チャットボットより速いメッセージ返信',
    
    // Budget
    'budget.title': 'お金をどこに使うか？',
    'budget.food': '- 食べ物（米、インスタント麺、卵、野菜。ロブスターはなし！）',
    'budget.utilities': '- 光熱費とインターネット（報告を送るため）',
    'budget.rent': '- 家賃（15m²の部屋、ペントハウスではない）',
    'budget.health': '- 健康（風邪薬、ビタミンC、マスク）',
    'budget.education': '- 教育（本、より良い報告のためのオンラインコース）',
    'budget.entertainment': '- エンターテイメント（Netflix？いいえ！無料のYouTubeだけ！）',
    'budget.chart': '📊 ウェブサイトで毎週更新される詳細チャート！',
    
    // Donation
    'donation.title': '笑っているなら今すぐ寄付して！',
    'donation.description': 'このQRコードをスキャンして私を育てて（即座に報告を受け取れます！）またはこのリンクを訪問',
    'donation.transfer': '💸 送金後に自動メール！ 💸',
    'donation.button': '🎁 あなたを育てたい！',
    
    // Video
    'video.title': '「私があなたを育てる！」- 周星馳',
    'video.inspiration': 'これがこのウェブサイトのインスピレーションです！ 😂',
    
    // Footer
    'footer.title': '心からのメッセージ',
    'footer.message1': '「慈善」が敏感な言葉になった時代に、私は宣言します：',
    'footer.message2': 'お願いします、私を育てて！',
    'footer.message3': '私は貧しく、お金が必要ですが、良心は失いません！あなたが送ってくれる一円一円を、私の空腹のお腹のように明確で透明に使います！😭',
    'footer.ps': 'P/S: 寄付金で車を買わないことを約束します。なぜなら...まだ運転免許を持っていないから！🚗❌',
    'footer.disclaimer': '免責事項：これはユーモラスなウェブサイトです！すべてのコンテンツは娯楽目的のみで、個人/組織を侮辱または批判することを意図していません。',
  },
  
  cn: {
    // Header
    'header.title': '养我',
    'header.subtitle': '请养我',
    'header.description': '我承诺完全透明！💯',
    
    // Features
    'features.title': '为什么要养我？',
    'features.realtime.title': '实时报告',
    'features.realtime.desc': '每秒更新！比转账还快！',
    'features.transparent.title': '300%透明',
    'features.transparent.desc': '超过100%！我连买奶茶都会报告！',
    'features.spending.title': '合理消费',
    'features.spending.desc': '不买车不买房。只吃米饭和方便面！',
    'features.tracking.title': '应用追踪',
    'features.tracking.desc': '24/7追踪我吃什么、喝什么、去哪里。像"老大哥"一样！',
    
    // Commitment
    'commitment.title': '我的黄金承诺：',
    'commitment.daily': '每日报告：',
    'commitment.daily.desc': '早上6点准时更新，像钟表一样准确！（包括周末和节假日）',
    'commitment.transparent': '不隐瞒：',
    'commitment.transparent.desc': '从50k的河粉到8k的酸奶杯，一切都详细记录！',
    'commitment.receipt': '收据和证明：',
    'commitment.receipt.desc': '拍摄账单照片，扫描条形码，保存所有收据！',
    'commitment.video': '视频开箱：',
    'commitment.video.desc': '在Facebook上直播打开每包方便面！',
    'commitment.hotline': '24/7热线：',
    'commitment.hotline.desc': '随时打电话问我吃什么，即使是凌晨3点！',
    'commitment.noblock': '不拉黑：',
    'commitment.noblock.desc': '回答困难问题，不会"已读"然后沉默！',
    
    // Comparison
    'comparison.title': '与"其他人"比较',
    'comparison.others': '其他人：',
    'comparison.others.1': '3年后的报告（或永远不会）',
    'comparison.others.2': '像鬼照片一样模糊的Excel文件',
    'comparison.others.3': '像1 + 1 = 3这样的"四舍五入"数字',
    'comparison.others.4': '闪电般快速拉黑提问者',
    'comparison.me': '养我：',
    'comparison.me.1': '消费前报告（供您批准）',
    'comparison.me.2': '带数字签名的4K超高清Excel文件',
    'comparison.me.3': '精确到每一分钱的数字',
    'comparison.me.4': '比聊天机器人更快的消息回复',
    
    // Budget
    'budget.title': '我会把钱花在哪里？',
    'budget.food': '- 食物（米饭、方便面、鸡蛋、蔬菜。没有龙虾！）',
    'budget.utilities': '- 水电费和网费（为了给您发送报告）',
    'budget.rent': '- 房租（15平米房间，不是顶层公寓）',
    'budget.health': '- 医疗（感冒药、维生素C、口罩）',
    'budget.education': '- 教育（书籍、在线课程以便更好地报告）',
    'budget.entertainment': '- 娱乐（Netflix？不！只有免费的YouTube！）',
    'budget.chart': '📊 网站上每周更新的详细图表！',
    
    // Donation
    'donation.title': '如果你在笑就现在捐款吧！',
    'donation.description': '扫描此二维码养我（并获得即时报告！）或访问此链接',
    'donation.transfer': '💸 转账后自动发邮件！ 💸',
    'donation.button': '🎁 我想养你！',
    
    // Video
    'video.title': '"我养你！" - 周星驰',
    'video.inspiration': '这就是这个网站的灵感来源！ 😂',
    
    // Footer
    'footer.title': '来自内心的话',
    'footer.message1': '在"慈善"成为敏感词的时代，我声明：',
    'footer.message2': '请养我！',
    'footer.message3': '我很穷，我需要钱，但我不会失去良心！你们发送的每一分钱，我都会像我饥饿的肚子一样清楚透明地花费！😭',
    'footer.ps': 'P/S: 我保证不会用捐款买车。因为...我还没有驾照！🚗❌',
    'footer.disclaimer': '免责声明：这是一个幽默网站！所有内容仅供娱乐，不意图冒犯或批评任何个人/组织。',
  },
  
  ru: {
    // Header
    'header.title': 'ВОСПИТАЙ МЕНЯ',
    'header.subtitle': 'ПОЖАЛУЙСТА, ВОСПИТАЙ МЕНЯ',
    'header.description': 'Обещаю полную прозрачность! 💯',
    
    // Features
    'features.title': 'Почему Ты Должен Воспитать Меня?',
    'features.realtime.title': 'Отчеты в реальном времени',
    'features.realtime.desc': 'Обновляется каждую секунду! Быстрее перевода денег!',
    'features.transparent.title': '300% Прозрачность',
    'features.transparent.desc': 'Больше 100%! Я даже сообщаю о покупке чая с пузырьками!',
    'features.spending.title': 'Умные Траты',
    'features.spending.desc': 'Никаких машин или домов. Только рис и лапша быстрого приготовления!',
    'features.tracking.title': 'Отслеживание Приложения',
    'features.tracking.desc': '24/7 отслеживание что я ем, пью, куда хожу. Как "Большой Брат"!',
    
    // Commitment
    'commitment.title': 'Мое Золотое Обязательство:',
    'commitment.daily': 'Ежедневные отчеты:',
    'commitment.daily.desc': 'Обновляется в 6 утра точно, регулярно как часы! (Включая выходные и праздники)',
    'commitment.transparent': 'Никаких секретов:',
    'commitment.transparent.desc': 'От мисок фо за 50к до йогуртов за 8к, все записано тщательно!',
    'commitment.receipt': 'Чеки и доказательства:',
    'commitment.receipt.desc': 'Фото счетов, сканирование штрих-кодов, сохранение всех чеков!',
    'commitment.video': 'Видео распаковка:',
    'commitment.video.desc': 'Открываю каждую упаковку лапши в прямом эфире на Facebook!',
    'commitment.hotline': 'Горячая линия 24/7:',
    'commitment.hotline.desc': 'Звоните спросить что я ем в любое время, даже в 3 утра!',
    'commitment.noblock': 'Никаких блокировок:',
    'commitment.noblock.desc': 'Отвечаю на сложные вопросы, никаких "прочитано" и молчания!',
    
    // Comparison
    'comparison.title': 'Сравнение с "Другими"',
    'comparison.others': 'Другие:',
    'comparison.others.1': 'Отчеты через 3 года (или никогда)',
    'comparison.others.2': 'Размытые Excel файлы как фото призраков',
    'comparison.others.3': '"Округленные" цифры как 1 + 1 = 3',
    'comparison.others.4': 'Блокируют спрашивающих молниеносно',
    'comparison.me': 'Воспитай Меня:',
    'comparison.me.1': 'Отчеты перед тратами (для вашего одобрения)',
    'comparison.me.2': '4K Ultra HD Excel файлы с цифровыми подписями',
    'comparison.me.3': 'Точные цифры до каждой копейки',
    'comparison.me.4': 'Отвечаю в сообщениях быстрее чатботов',
    
    // Budget
    'budget.title': 'На Что Я Потрачу Деньги?',
    'budget.food': '- Еда (Рис, лапша быстрого приготовления, яйца, овощи. БЕЗ омаров!)',
    'budget.utilities': '- Коммунальные услуги и интернет (Чтобы отправлять вам отчеты)',
    'budget.rent': '- Аренда (Комната 15м², не пентхаус)',
    'budget.health': '- Здоровье (Лекарства от простуды, витамин C, маски)',
    'budget.education': '- Образование (Книги, онлайн курсы для лучшей отчетности)',
    'budget.entertainment': '- Развлечения (Netflix? Нет! Только бесплатный YouTube!)',
    'budget.chart': '📊 Подробные графики обновляются еженедельно на сайте!',
    
    // Donation
    'donation.title': 'ПОЖЕРТВУЙ СЕЙЧАС, ЕСЛИ СМЕЕШЬСЯ!',
    'donation.description': 'Отсканируйте этот QR код чтобы воспитать меня (и получите мгновенные отчеты!) или посетите эту ссылку',
    'donation.transfer': '💸 Автоматическое письмо после перевода! 💸',
    'donation.button': '🎁 Я ХОЧУ ВОСПИТАТЬ ТЕБЯ!',
    
    // Video
    'video.title': '"Я Воспитаю Тебя!" - Стивен Чоу',
    'video.inspiration': 'Это вдохновение для этого сайта! 😂',
    
    // Footer
    'footer.title': 'Сообщение От Сердца',
    'footer.message1': 'В эпоху, когда "благотворительность" стала чувствительным словом, я заявляю:',
    'footer.message2': 'ПОЖАЛУЙСТА, ВОСПИТАЙ МЕНЯ!',
    'footer.message3': 'Я беден, мне нужны деньги, но я НЕ ТЕРЯЮ СОВЕСТЬ! Каждую копейку, которую вы пришлете, я потрачу ясно и прозрачно, как мой голодный живот! 😭',
    'footer.ps': 'P/S: Обещаю не покупать машину на деньги от пожертвований. Потому что... у меня еще нет водительских прав! 🚗❌',
    'footer.disclaimer': 'ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ: Это ЮМОРИСТИЧЕСКИЙ сайт! Весь контент предназначен только для развлечения, не предназначен для оскорбления или критики любого лица/организации.',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>('vi');

  const t = (key: string): string => {
    return translations[currentLang][key] || translations.vi[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}