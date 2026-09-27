/**
 * School Violence Web Presentation Data
 * Toàn bộ dữ liệu 12 slide với cấu trúc chuẩn cho Morph Storytelling
 */

export const PRESENTATION_META = {
  title: "BẠO LỰC HỌC ĐƯỜNG",
  subtitle: "Hiểu đúng – Ngăn chặn – Cùng xây dựng trường học an toàn",
  totalSlides: 17,
  themeColor: "#0b1329",
  author: "Creative Motion & Presentation Designer"
};

export const SLIDE_IMAGE_URLS = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80", // 01: School campus / students
  "https://images.unsplash.com/photo-1581726707445-75cbe4efc586?auto=format&fit=crop&w=1600&q=80", // 02: Conflict & physical bullying
  "https://images.unsplash.com/photo-1495433923968-85c6751d2df6?auto=format&fit=crop&w=1600&q=80", // 03: School hallway / lockers
  "https://images.unsplash.com/photo-1511297968426-a869b61af3da?auto=format&fit=crop&w=1600&q=80", // 04: Mental pressure & causes
  "https://images.unsplash.com/photo-1514355315815-2b64b0216b14?auto=format&fit=crop&w=1600&q=80", // 05: Isolated student
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=80", // 06: Justice scale & law
  "https://images.unsplash.com/photo-1597933471507-1ca5765185d8?auto=format&fit=crop&w=1600&q=80", // 07: Cyberbullying & smartphone
  "https://images.unsplash.com/photo-1586726370832-3440a511e479?auto=format&fit=crop&w=1600&q=80", // 08: Helping hands / DO vs DON'T
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1600&q=80", // 09: Action pathway / Counseling
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80", // 10: 3 Pillars alliance / Teacher & students
  "https://images.unsplash.com/photo-1599659593072-10de2e109486?auto=format&fit=crop&w=1600&q=80", // 11: Protective hands / Golden rules
  "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?auto=format&fit=crop&w=1600&q=80", // 12: Happy dawn / Celebration
  "https://images.unsplash.com/photo-1597933471507-1ca5765185d8?auto=format&fit=crop&w=1600&q=80", // 13: Quiz 2 (Cyber)
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1600&q=80", // 14: Quiz 3 (Self-defense)
  "https://images.unsplash.com/photo-1586726370832-3440a511e479?auto=format&fit=crop&w=1600&q=80", // 15: Quiz 4 (Upstander)
  "https://images.unsplash.com/photo-1599659593072-10de2e109486?auto=format&fit=crop&w=1600&q=80", // 16: Quiz 5 (Shield)
  "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?auto=format&fit=crop&w=1600&q=80"  // 17: Finale
];

export const SLIDES_DATA = [
  {
    id: 1,
    slug: "slide-01",
    chapter: "01 / KHÁI NIỆM & TỔNG QUAN",
    title: "BẠO LỰC HỌC ĐƯỜNG",
    subtitle: "Hiểu đúng – Ngăn chặn – Cùng xây dựng trường học an toàn",
    quote: "“Một hành động có thể để lại một vết thương rất lâu.”",
    badge: "AN TOÀN HỌC ĐƯỜNG",
    transitionType: "morph-zoom",
    accent: "crimson"
  },
  {
    id: 2,
    slug: "slide-02",
    chapter: "01 / KHÁI NIỆM & TỔNG QUAN",
    title: "BẠO LỰC HỌC ĐƯỜNG LÀ GÌ?",
    definition: "Là những hành vi cố ý gây tổn thương cho người khác trong môi trường học tập hoặc có liên quan đến trường học.",
    categories: [
      {
        id: "physical",
        title: "THỂ CHẤT",
        desc: "Đánh – đá – xô đẩy – gây thương tích vật lý",
        icon: "punch",
        badge: "01"
      },
      {
        id: "verbal",
        title: "TINH THẦN",
        desc: "Xúc phạm – đe dọa – cô lập – tẩy chay xã hội",
        icon: "heart-crack",
        badge: "02"
      },
      {
        id: "cyber",
        title: "TRÊN MẠNG",
        desc: "Công kích – bôi nhọ – lan truyền thông tin xấu",
        icon: "network",
        badge: "03"
      },
      {
        id: "property",
        title: "VẬT CHẤT",
        desc: "Phá đồ – lấy đồ – làm hư hỏng tư trang cá nhân",
        icon: "broken-box",
        badge: "04"
      }
    ],
    transitionType: "morph-split",
    accent: "crimson"
  },
  {
    id: 3,
    slug: "slide-03",
    chapter: "02 / THỰC TRẠNG & KHÔNG GIAN",
    title: "BẠO LỰC CÓ THỂ XẢY RA Ở ĐÂU?",
    mainMessage: "Bạo lực không chỉ xảy ra trong lớp học.",
    secondaryMessage: "Một sự việc bắt đầu ở trường có thể tiếp tục và khuếch đại không ngừng trên Internet.",
    flowSteps: [
      { label: "LỚP HỌC", desc: "Giờ giải lao, góc khuất bảng tin", icon: "school" },
      { label: "SÂN TRƯỜNG", desc: "Sau dãy phòng học, bãi xe", icon: "trees" },
      { label: "NHÀ VỆ SINH", desc: "Khu vực thiếu sự giám sát", icon: "door-closed" },
      { label: "ĐƯỜNG ĐI HỌC", desc: "Đoạn đường vắng, cổng sau", icon: "navigation" },
      { label: "MẠNG XÃ HỘI", desc: "Nhóm chat ẩn danh, diễn đàn 24/7", icon: "smartphone" }
    ],
    transitionType: "morph-depth",
    accent: "cyan"
  },
  {
    id: 4,
    slug: "slide-04",
    chapter: "02 / NGUYÊN NHÂN CỐT LÕI",
    title: "VÌ SAO BẠO LỰC XẢY RA?",
    centerMessage: "KHÔNG CÓ CHỈ MỘT NGUYÊN NHÂN",
    subMessage: "Đó là sự giao thoa phức tạp giữa tâm lý phát triển, môi trường nuôi dưỡng và áp lực xã hội.",
    groups: [
      {
        id: "personal",
        name: "CÁ NHÂN",
        items: [
          "Khó kiểm soát cảm xúc bộc phát",
          "Nhu cầu khẳng định sức mạnh sai lệch",
          "Thiếu kỹ năng giải quyết mâu thuẫn ôn hòa"
        ],
        icon: "user"
      },
      {
        id: "family",
        name: "GIA ĐÌNH",
        items: [
          "Thiếu sự quan tâm, lắng nghe chia sẻ",
          "Môi trường gia đình căng thẳng, bạo lực",
          "Cách ứng xử và kỷ luật chưa phù hợp"
        ],
        icon: "home"
      },
      {
        id: "environment",
        name: "MÔI TRƯỜNG",
        items: [
          "Áp lực đồng trang lứa và địa vị nhóm",
          "Ảnh hưởng bởi nội dung độc hại trên Internet",
          "Tâm lý hùa theo đám đông, sợ bị cô lập"
        ],
        icon: "globe"
      }
    ],
    transitionType: "morph",
    accent: "amber"
  },
  {
    id: 5,
    slug: "slide-05",
    chapter: "03 / DẤU HIỆU CẢNH BÁO",
    title: "CÓ THỂ BẠN ĐANG KHÔNG NHẬN RA",
    headline: "Không phải nạn nhân nào cũng nói ra điều mình đang chịu đựng.",
    subtext: "Những tổn thương thầm lặng thường được che giấu sau những thay đổi hành vi nhỏ nhất.",
    signs: [
      { label: "NGẠI ĐẾN TRƯỜNG", desc: "Thường xuyên tìm cớ nghỉ học hoặc trễ giờ" },
      { label: "THU MÌNH", desc: "Ngừng giao tiếp, tách biệt khỏi bạn bè thân quen" },
      { label: "LO LẮNG", desc: "Bồn chồn, giật mình khi chuông điện thoại reo" },
      { label: "HỌC TẬP THAY ĐỔI", desc: "Điểm số sụt giảm bất thường, mất tập trung" },
      { label: "MẤT ĐỒ", desc: "Đồ dùng học tập, cặp sách hay bị rách hoặc mất" },
      { label: "NÉ TRÁNH", desc: "Đổi đường đi, từ chối tham gia hoạt động chung" }
    ],
    transitionType: "morph-zoom",
    accent: "amber"
  },
  {
    id: 6,
    slug: "slide-06",
    chapter: "03 / TÁC ĐỘNG & HỆ LỤY",
    title: "BẠO LỰC ĐỂ LẠI HẬU QUẢ",
    mainMessage: "Hậu quả không kết thúc ngay khi sự việc kết thúc.",
    subMessage: "Một vết sẹo tâm lý có thể kéo dài nhiều năm nếu không được thấu hiểu và can thiệp kịp thời.",
    columns: [
      {
        role: "NẠN NHÂN",
        type: "victim",
        points: [
          "Thể chất: Tổn thương, chấn thương kéo dài",
          "Tinh thần: Trầm cảm, hoảng loạn, giảm tự tin",
          "Học tập: Sa sút nghiêm trọng, ám ảnh sợ trường"
        ]
      },
      {
        role: "NGƯỜI GÂY BẠO LỰC",
        type: "bully",
        points: [
          "Kỷ luật: Đình chỉ, ghi học bạ, vi phạm pháp luật",
          "Quan hệ: Mất đi tình bạn chân thành, bị xa lánh",
          "Nhận thức: Lệch lạc trong giải quyết mâu thuẫn"
        ]
      },
      {
        role: "TẬP THỂ & XÃ HỘI",
        type: "community",
        points: [
          "Mất cảm giác an toàn trong môi trường giáo dục",
          "Không khí học đường ngột ngạt, căng thẳng",
          "Gieo mầm văn hóa bàng quan, thờ ơ với cái xấu"
        ]
      }
    ],
    transitionType: "morph-split",
    accent: "crimson"
  },
  {
    id: 7,
    slug: "slide-07",
    chapter: "04 / BẠO LỰC KHÔNG GIAN MẠNG",
    title: "“KHÔNG NHÌN THẤY” KHÔNG CÓ NGHĨA LÀ KHÔNG NGUY HIỂM",
    toxicTypes: [
      "BÌNH LUẬN XÚC PHẠM",
      "ẢNH BỊ ĐĂNG KHÔNG PHÉP",
      "TIN ĐỒN THẤT THIỆT",
      "CÔNG KÍCH TẬP THỂ",
      "TIN NHẮN ĐE DỌA"
    ],
    message: "Một bài đăng có thể lan truyền tới hàng nghìn người chỉ sau vài phút.",
    endQuote: "Tổn thương trên màn hình vẫn là tổn thương thật.",
    transitionType: "morph-depth",
    accent: "crimson"
  },
  {
    id: 8,
    slug: "slide-08",
    chapter: "04 / PHẢN ỨNG TỨC THỜI",
    title: "NẾU CHỨNG KIẾN BẠO LỰC?",
    message: "Đừng trở thành khán giả của bạo lực.",
    subtext: "Sự im lặng của người ngoài cuộc chính là mảnh đất màu mỡ cho hành vi bạo lực tiếp diễn.",
    split: {
      dont: {
        title: "KHÔNG NÊN",
        items: [
          "Cổ vũ, reo hò kích động",
          "Hùa theo đám đông chê cười",
          "Quay video đăng lên mạng xã hội",
          "Im lặng làm ngơ khi có nguy cơ thương tích"
        ]
      },
      do: {
        title: "NÊN LÀM",
        items: [
          "Báo ngay giáo viên hoặc bảo vệ, phụ huynh",
          "Hỗ trợ, đưa nạn nhân đến nơi an toàn",
          "Lưu bằng chứng chính xác khi cần can thiệp",
          "Ở bên cạnh bạn, thể hiện sự đồng cảm"
        ]
      }
    },
    transitionType: "morph-split",
    accent: "amber"
  },
  {
    id: 9,
    slug: "slide-09",
    chapter: "05 / KỸ NĂNG TỰ VỆ",
    title: "NẾU BẠN ĐANG BỊ BẠO LỰC?",
    message: "Nhờ giúp đỡ không phải là yếu đuối. Đó là hành động dũng cảm và sáng suốt.",
    steps: [
      {
        step: "01",
        title: "GIỮ AN TOÀN",
        detail: "Bình tĩnh tìm cách rút lui về phía đông người, tránh đôi co ở nơi vắng vẻ."
      },
      {
        step: "02",
        title: "NÓI RA",
        detail: "Chia sẻ ngay với bố mẹ, thầy cô, bạn tin cậy hoặc chuyên gia tâm lý học đường."
      },
      {
        step: "03",
        title: "LƯU BẰNG CHỨNG",
        detail: "Chụp màn hình tin nhắn, ghi lại thời gian, địa điểm và danh tính người liên quan."
      },
      {
        step: "04",
        title: "KHÔNG TRẢ ĐŨA",
        detail: "Không giải quyết bằng bạo lực ngược lại khiến tình hình phức tạp và nguy hiểm hơn."
      }
    ],
    transitionType: "morph",
    accent: "cyan"
  },
  {
    id: 10,
    slug: "slide-10",
    chapter: "05 / TRÁCH NHIỆM CHUNG",
    title: "AI CŨNG CÓ PHẦN TRONG VIỆC NGĂN BẠO LỰC",
    subtext: "Một ngôi trường an toàn chỉ có thể hình thành khi có sự phối hợp đồng bộ của cả ba trụ cột.",
    pillars: [
      {
        id: "school",
        title: "NHÀ TRƯỜNG",
        role: "Trụ cột Kỷ cương & Môi trường",
        actions: [
          "Xây dựng nội quy rõ ràng, xử lý công minh",
          "Hộp thư góp ý & kênh báo cáo an toàn bí mật",
          "Can thiệp sớm trước khi bùng phát",
          "Giáo dục kỹ năng sống & phòng ngừa"
        ]
      },
      {
        id: "family",
        title: "GIA ĐÌNH",
        role: "Trụ cột Yêu thương & Điểm tựa",
        actions: [
          "Lắng nghe không phán xét mỗi ngày",
          "Quan tâm đến sự thay đổi tâm sinh lý",
          "Làm bạn đồng hành, làm gương ứng xử",
          "Phối hợp chặt chẽ cùng nhà trường"
        ]
      },
      {
        id: "students",
        title: "HỌC SINH",
        role: "Trụ cột Lan tỏa & Đoàn kết",
        actions: [
          "Tôn trọng sự khác biệt của bạn bè",
          "Tuyệt đối không cổ vũ, tham gia bắt nạt",
          "Dũng cảm lên tiếng khi thấy bất công",
          "Chủ động giúp đỡ bạn gặp khó khăn"
        ]
      }
    ],
    transitionType: "morph-depth",
    accent: "green"
  },
  {
    id: 11,
    slug: "slide-11",
    chapter: "06 / BỘ NGUYÊN TẮC HÀNH ĐỘNG",
    title: "3 KHÔNG — 3 NÊN",
    rules: {
      dont: [
        "KHÔNG BẮT NẠT",
        "KHÔNG CỔ VŨ",
        "KHÔNG IM LẶNG"
      ],
      do: [
        "NÊN TÔN TRỌNG",
        "NÊN LẮNG NGHE",
        "NÊN GIÚP ĐỠ"
      ]
    },
    shieldMotto: "LÁ CHẮN AN TOÀN",
    bottomTagline: "AN TOÀN – TÔN TRỌNG – ĐOÀN KẾT",
    transitionType: "morph-zoom",
    accent: "green"
  },
  {
    id: 12,
    slug: "slide-12",
    chapter: "07 / THỬ THÁCH NHANH (01/05)",
    title: "CÂU HỎI 1: NHẬN DIỆN BẠO LỰC",
    question: "Hành vi nào dưới đây được coi là bạo lực học đường tinh thần?",
    image: SLIDE_IMAGE_URLS[1],
    badge: "THỬ THÁCH 01/05",
    transitionType: "morph-split",
    accent: "crimson"
  },
  {
    id: 13,
    slug: "slide-13",
    chapter: "07 / THỬ THÁCH NHANH (02/05)",
    title: "CÂU HỎI 2: ỨNG XỬ VỚI BẠO LỰC MẠNG",
    question: "Khi thấy bài viết hoặc nhóm chat công kích bạn cùng trường, bạn nên làm gì?",
    image: SLIDE_IMAGE_URLS[6],
    badge: "THỬ THÁCH 02/05",
    transitionType: "morph-depth",
    accent: "cyan"
  },
  {
    id: 14,
    slug: "slide-14",
    chapter: "07 / THỬ THÁCH NHANH (03/05)",
    title: "CÂU HỎI 3: KỸ NĂNG TỰ BẢO VỆ",
    question: "Nếu không may bị bắt nạt hoặc đe dọa, bước đầu tiên bạn nên làm là gì?",
    image: SLIDE_IMAGE_URLS[8],
    badge: "THỬ THÁCH 03/05",
    transitionType: "morph-zoom",
    accent: "amber"
  },
  {
    id: 15,
    slug: "slide-15",
    chapter: "07 / THỬ THÁCH NHANH (04/05)",
    title: "CÂU HỎI 4: NGƯỜI CHỨNG KIẾN CAN ĐẢM",
    question: "Chứng kiến bạn yếu thế bị bắt nạt ở hành lang vắng, bạn nên hành động thế nào?",
    image: SLIDE_IMAGE_URLS[7],
    badge: "THỬ THÁCH 04/05",
    transitionType: "morph-split",
    accent: "blue"
  },
  {
    id: 16,
    slug: "slide-16",
    chapter: "07 / THỬ THÁCH NHANH (05/05)",
    title: "CÂU HỎI 5: TRƯỜNG HỌC HẠNH PHÚC",
    question: "Yếu tố quan trọng nhất để xây dựng trường học an toàn, không còn bạo lực?",
    image: SLIDE_IMAGE_URLS[10],
    badge: "THỬ THÁCH 05/05",
    transitionType: "morph-zoom",
    accent: "green"
  },
  {
    id: 17,
    slug: "slide-17",
    chapter: "08 / THÔNG ĐIỆP KẾT THÚC",
    title: "MỘT NGÔI TRƯỜNG AN TOÀN BẮT ĐẦU TỪ MỖI CHÚNG TA",
    smallLines: [
      "Không ai đáng bị xúc phạm.",
      "Không ai đáng bị cô lập.",
      "Không ai đáng phải sợ hãi khi bước chân đến trường."
    ],
    finalStatements: [
      "HÃY DỪNG BẠO LỰC",
      "HÃY LÊN TIẾNG",
      "HÃY BẢO VỆ NHAU"
    ],
    closingQuote: "Mỗi hành động tử tế hôm nay là một lá chắn bảo vệ tương lai ngày mai.",
    image: SLIDE_IMAGE_URLS[11],
    badge: "TRƯỜNG HỌC HẠNH PHÚC",
    transitionType: "morph-zoom",
    accent: "green"
  }
];
