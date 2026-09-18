/* =========================================================
   MÔ ĐI PHÊ HOUSE — dữ liệu các nhà
   Sửa thông tin ở ĐÂY, không cần đụng vào HTML.
   - Giá: tạm để "Liên hệ". Khi có link Airbnb, điền vào `airbnb`
     của từng căn → web tự hiện nút "Xem giá trên Airbnb".
   - Ảnh: assets/img/<mã nhà>/<mã nhà>-NN.jpg (danh sách gốc trong _nguon.txt)
   ========================================================= */

const CONTACT = {
  phone: '+84 787 273 949',
  phoneDisplay: '(+84) 787 273 949',
  zalo: 'https://zalo.me/0787273949',
  whatsapp: '84787273949',
  instagram: 'https://www.instagram.com/modiphe/',
  facebook: 'https://www.facebook.com/profile.php?id=61578992859418',
  bedding: 'https://duykennguyen.github.io/mo-bedding/',
};

/* Gửi yêu cầu đặt phòng vào Google Sheet (tuỳ chọn).
   Dán link Web App của Google Apps Script vào đây; để trống thì bỏ qua. */
const LEAD_ENDPOINT = '';

/* Đánh giá mẫu: true = hiện nhãn "Nội dung mẫu" trên khối đánh giá.
   Khi đã thay bằng đánh giá thật của khách, đổi thành false. */
const SAMPLE_REVIEWS = true;

const img = (h, n) => `assets/img/${h}/${h}-${String(n).padStart(2, '0')}.jpg`;
const range = n => Array.from({ length: n }, (_, i) => i + 1);
const order = (first, total) => [...first, ...range(total).filter(n => !first.includes(n))];

const HOUSES = [
  {
    id: 'camf', page: 'camf.html',
    name: 'CamF — CamFusion House', short: 'CamF',
    area: { vi: 'Cẩm Châu · view đồng lúa', en: 'Cẩm Châu · rice-field views' },
    addr: { vi: 'Lê Thánh Tông, Cẩm Châu, Hội An', en: 'Le Thanh Tong, Cam Chau, Hoi An' },
    type: { vi: 'Tòa 4 tầng · 6 căn hộ', en: '4 storeys · 6 apartments' },
    tags: ['rice', 'long', 'couple'],
    cover: img('camf', 18), coverPos: '50% 60%',
    photos: order([4, 18, 19, 22, 11, 2, 28, 30, 20, 15, 13, 17, 3, 5, 8, 32], 32).map(n => img('camf', n)),
    stats: { guests: '2 – 4', beds: '1 – 2', pool: false },
    lead: {
      vi: 'Một tòa nhà bốn tầng giữa đồng lúa Cẩm Châu, sáu căn hộ đặt tên theo cây gia vị Hội An. Yên như ở quê, nhưng đạp xe mười phút là ra phố cổ, ra biển.',
      en: 'A four-storey house in the Cẩm Châu rice fields, with six apartments named after Hội An’s kitchen herbs. Country-quiet, yet a ten-minute bike ride to the Ancient Town and the beach.',
    },
    highlights: [
      { vi: 'Thiết kế và hoàn thiện vượt mặt bằng cùng tầm giá ở Hội An — khách thường khen kiến trúc và chất lượng công trình.', en: 'Design and finish above the local standard — guests often praise the architecture and build quality.' },
      { vi: 'Đồng lúa ở cả mặt trước lẫn mặt sau nhà. Xe đạp miễn phí, 10 phút ra phố cổ và biển.', en: 'Rice fields at the front and the back. Free bicycles — 10 minutes to the Ancient Town and the beach.' },
      { vi: 'Khu chung: sảnh tiếp khách, vườn có chỗ ngồi, góc làm việc chung, bể sục nóng – lạnh, cà phê và đồ ăn nhẹ miễn phí.', en: 'Shared spaces: lounge, garden seating, co-working corner, hot & cold jacuzzi, free coffee and light snacks.' },
      { vi: 'Bếp, bàn ăn, máy giặt và máy sấy riêng trong từng căn — rất hợp khách ở dài 1–3 tháng.', en: 'Private kitchen, dining table, washer and dryer in every apartment — made for 1–3 month stays.' },
    ],
    units: [
      { name: { vi: 'Gừng', en: 'Ginger' }, img: img('camf', 21), meta: { vi: 'Tầng trệt · 1 phòng ngủ giường king · 2 khách', en: 'Ground floor · 1 king bedroom · 2 guests' },
        desc: { vi: 'Không phải leo cầu thang. Bếp và phòng khách riêng, ban công riêng, bồn tắm nhìn ra đồng lúa.', en: 'No stairs. Separate kitchen and living room, private balcony, a bathtub facing the rice fields.' }, airbnb: '' },
      { name: { vi: 'Ớt Xanh', en: 'Green Chilli' }, img: img('camf', 32), meta: { vi: 'Tầng 2 · 1 phòng ngủ · 2 khách', en: '2nd floor · 1 bedroom · 2 guests' },
        desc: { vi: 'View lúa cao và thoáng. Bồn tắm nhìn ra ruộng, ban công riêng có sẵn bàn ghế.', en: 'High, open rice-field views. Bathtub facing the fields, a furnished private balcony.' }, airbnb: '' },
      { name: { vi: 'Củ Sả', en: 'Lemongrass' }, img: img('camf', 23), meta: { vi: 'Tầng 2 · 1 phòng ngủ · 2 khách', en: '2nd floor · 1 bedroom · 2 guests' },
        desc: { vi: 'Căn một phòng ngủ đủ bếp, máy giặt sấy; bồn tắm và ban công hướng đồng lúa.', en: 'A one-bedroom with full kitchen and laundry; bathtub and balcony looking over the fields.' }, airbnb: '' },
      { name: { vi: 'Tía Tô', en: 'Perilla' }, img: img('camf', 22), meta: { vi: 'Tầng 3 · 1 phòng ngủ · 2 khách', en: '3rd floor · 1 bedroom · 2 guests' },
        desc: { vi: 'Một trong những căn cao nhất nhóm một phòng ngủ — sáng mở rèm là thấy cả cánh đồng.', en: 'One of the highest one-bedrooms — open the curtains and the whole field is there.' }, airbnb: '' },
      { name: { vi: 'Củ Nghệ', en: 'Turmeric' }, img: img('camf', 20), meta: { vi: 'Tầng 3 · 75 m² · 2 phòng ngủ · 4 khách', en: '3rd floor · 75 m² · 2 bedrooms · 4 guests' },
        desc: { vi: 'Nguyên căn 2 phòng ngủ, 2 phòng tắm, phòng khách có thêm giường sofa. Bếp riêng, ban công nhìn ra vườn, cách âm tốt.', en: 'Whole unit with 2 bedrooms, 2 bathrooms and a sofa bed in the living room. Private kitchen, garden-facing balcony, good sound insulation.' }, airbnb: '' },
      { name: { vi: 'Thơm', en: 'Pineapple' }, img: img('camf', 28), meta: { vi: 'Penthouse · 150 m² · 2 phòng ngủ king · 4 khách', en: 'Penthouse · 150 m² · 2 king bedrooms · 4 guests' },
        desc: { vi: 'Căn rộng và cao cấp nhất: 2 phòng tắm, phòng khách có máy chiếu, hai sân thượng ở mặt trước và mặt sau.', en: 'The largest, most premium unit: 2 bathrooms, a living room with a projector, and two rooftop terraces front and back.' }, airbnb: '' },
    ],
    amenities: ['wifi', 'kitchen', 'washer', 'bath', 'work', 'bike', 'jacuzzi', 'parking', 'ac', 'silk'],
    distances: [
      ['Phố cổ Hội An', 'Hội An Ancient Town', '2 km'],
      ['Biển An Bàng & Cửa Đại', 'An Bang & Cua Dai beaches', '2,5 km'],
      ['Rừng dừa Bảy Mẫu', 'Bay Mau coconut forest', '3 km'],
      ['Chợ địa phương', 'Local market', '700 m'],
      ['Sân bay Đà Nẵng', 'Da Nang airport', '30 km'],
    ],
    minNights: 2, kidsFree: false,
    extraRules: [],
    map: 'https://maps.app.goo.gl/AJ9CMSGRmUeabS7P9',
    album: 'https://drive.google.com/drive/folders/1RBvgR5BOI4A4SdsJ7MlxQeoY9VoEy3gw',
  },
  {
    id: 'trau', page: 'nha-trau.html',
    name: 'Nhà Trầu', short: 'Nhà Trầu', nameEn: 'Trau House',
    area: { vi: 'An Mỹ · tường đất nung', en: 'An Mỹ · terracotta walls' },
    addr: { vi: 'An Mỹ, Cẩm Châu, Hội An', en: 'An My, Cam Chau, Hoi An' },
    type: { vi: 'Tòa 2 tầng · 2 căn hộ độc lập', en: '2 storeys · 2 independent apartments' },
    tags: ['rice', 'long', 'family', 'couple', 'group'],
    cover: img('trau', 15), coverPos: '50% 50%',
    photos: order([10, 29, 17, 8, 7, 23, 3, 12, 18, 28, 30, 31, 15], 35).map(n => img('trau', n)),
    stats: { guests: '2 – 9', beds: '1 – 3', pool: false },
    lead: {
      vi: 'Tường đất nung, sân trong xanh mát và lối vào riêng cho từng căn. Hai căn hộ nhỏ giữa đồng An Mỹ — gần như ở riêng, đủ yên để nghe tiếng lá.',
      en: 'Terracotta walls, a leafy inner courtyard and a private entrance for each apartment. Two small homes in the An Mỹ fields — almost your own, quiet enough to hear the leaves.',
    },
    highlights: [
      { vi: 'Chất liệu mộc, lên ảnh đẹp — hợp khách thích không gian bản địa.', en: 'Raw, natural materials and very photogenic — for guests who want a local feel.' },
      { vi: 'Chỉ 2 căn trong tòa, mỗi căn một lối vào riêng — riêng tư như nhà mình.', en: 'Just two apartments, each with its own entrance — private like home.' },
      { vi: 'Bếp, bàn ăn, máy giặt và máy sấy riêng trong mỗi căn; có bồn tắm, lò vi sóng, máy pha cà phê.', en: 'Private kitchen, dining table, washer and dryer in each apartment; bathtub, microwave and coffee machine.' },
      { vi: 'Thuê trọn tòa cho nhóm bạn hoặc hai gia đình: riêng tư mà vẫn gần nhau, tối đa 9 khách.', en: 'Take the whole building for friends or two families: private yet close, up to 9 guests.' },
    ],
    units: [
      { name: { vi: 'Tầng 2 — 1 phòng ngủ', en: '2nd floor — 1 bedroom' }, img: img('trau', 8), meta: { vi: '70 m² · 1 giường king · 2 khách (tối đa 3)', en: '70 m² · 1 king bed · 2 guests (up to 3)' },
        desc: { vi: 'Phòng tắm khép kín, phòng khách và bếp riêng, ban công nhìn thẳng ra cánh đồng để ngắm hoàng hôn. Khách thứ 3 ở miễn phí.', en: 'En-suite bathroom, private living room and kitchen, a balcony straight over the fields for sunsets. A third guest stays free.' }, airbnb: '' },
      { name: { vi: 'Tầng 1 — 2 phòng ngủ', en: '1st floor — 2 bedrooms' }, img: img('trau', 18), meta: { vi: '120 m² · 2 giường king · 4 khách (tối đa 6)', en: '120 m² · 2 king beds · 4 guests (up to 6)' },
        desc: { vi: '2 phòng tắm, phòng khách, bếp và khu giặt sấy riêng. Một phòng nhìn ra đồng lúa, một phòng hướng vườn. Khách thứ 5–6 ở miễn phí.', en: '2 bathrooms, private living room, kitchen and laundry. One bedroom faces the rice fields, one the garden. Guests 5–6 stay free.' }, airbnb: '' },
      { name: { vi: 'Trọn tòa', en: 'Whole building' }, img: img('trau', 29), meta: { vi: 'Cả 2 căn · 3 phòng ngủ · tối đa 9 khách', en: 'Both apartments · 3 bedrooms · up to 9 guests' },
        desc: { vi: 'Phương án tốt cho nhóm bạn hoặc hai gia đình đi chung, muốn riêng tư mà vẫn ở gần nhau.', en: 'A good fit for friends or two families travelling together who want privacy while staying close.' }, airbnb: '' },
    ],
    amenities: ['wifi', 'kitchen', 'washer', 'bath', 'work', 'ac', 'moto', 'silk', 'safety'],
    distances: [
      ['Phố cổ Hội An', 'Hội An Ancient Town', '2 km'],
      ['Biển An Bàng & Cửa Đại', 'An Bang & Cua Dai beaches', '2,5 km'],
      ['Rừng dừa Bảy Mẫu', 'Bay Mau coconut forest', '3 km'],
      ['Chợ địa phương', 'Local market', '700 m'],
      ['Sân bay Đà Nẵng', 'Da Nang airport', '30 km'],
    ],
    minNights: 2, kidsFree: true,
    extraRules: [],
    map: 'https://maps.app.goo.gl/Vw1QwVYmKnifMXcF7',
    album: 'https://drive.google.com/drive/folders/1-VJMLkvs9DgTDXPe4dBHD4eTsyq2c27m',
  },
  {
    id: 'sen', page: 'nha-sen.html',
    name: 'Nhà Sen', short: 'Nhà Sen', nameEn: 'Sen House',
    area: { vi: 'Trà Quế · hồ bơi riêng', en: 'Trà Quế · private pool' },
    addr: { vi: 'Trà Quế, Hội An', en: 'Tra Que, Hoi An' },
    type: { vi: 'Villa 2 tầng · nguyên căn · 120 m²', en: '2-storey villa · whole house · 120 m²' },
    tags: ['pool', 'family', 'group', 'long'],
    cover: img('sen', 22), coverPos: '50% 60%',
    photos: order([20, 22, 4, 1, 25, 26, 19, 3, 5, 12, 13, 29, 16, 17, 18, 21], 29).map(n => img('sen', n)),
    stats: { guests: '4 – 5', beds: '2', pool: true },
    lead: {
      vi: 'Villa nhỏ cạnh làng rau Trà Quế, trước nhà là hồ sen và đồng lúa. Hồ bơi riêng, sân thượng, sân vườn — cả căn nhà chỉ dành cho nhóm của bạn.',
      en: 'A small villa beside Trà Quế herb village, with a lotus pond and rice fields out front. Private pool, rooftop and garden — the whole house is just for your group.',
    },
    highlights: [
      { vi: 'Ngay cạnh làng rau Trà Quế — đi bộ ra ruộng rau, có lớp học nấu ăn và tour làm nông dân một ngày.', en: 'Right by Trà Quế herb village — walk to the gardens, join a cooking class or a farmer-for-a-day tour.' },
      { vi: 'Phía trước nhà là hồ sen và cánh đồng lúa thơ mộng.', en: 'A lotus pond and rice fields lie in front of the house.' },
      { vi: 'Hồ bơi riêng 4 × 4 m, sâu trên 1,3 m, nước được thay nhiều lần trong ngày.', en: 'Private 4 × 4 m pool, over 1.3 m deep, water refreshed several times a day.' },
      { vi: 'Bếp mở nối liền phòng khách: tủ lạnh, lò vi sóng, bếp điện, máy pha cà phê, ly rượu vang, bàn ăn.', en: 'Open kitchen joined to the living room: fridge, microwave, hob, coffee machine, wine glasses, dining table.' },
    ],
    units: [
      { name: { vi: 'Nguyên căn villa', en: 'Whole villa' }, img: img('sen', 1), meta: { vi: '2 phòng ngủ king · 2 phòng tắm có bồn · 4 khách (tối đa 5)', en: '2 king bedrooms · 2 bathrooms with tubs · 4 guests (up to 5)' },
        desc: { vi: 'Phòng một nhìn ra vườn, phòng hai có ban công. Phòng khách rộng nên nhận thêm 1 khách miễn phí.', en: 'One bedroom faces the garden, the other has a balcony. The living room is spacious, so a fifth guest stays free.' }, airbnb: '' },
    ],
    amenities: ['pool', 'wifi', 'kitchen', 'washer', 'bath', 'work', 'ac', 'rooftop', 'parking', 'silk', 'safety'],
    distances: [
      ['Làng rau Trà Quế', 'Tra Que herb village', { vi: 'ngay cạnh', en: 'next door' }],
      ['Phố cổ Hội An', 'Hội An Ancient Town', '2 km'],
      ['Biển An Bàng', 'An Bang beach', '2,5 km'],
      ['Sân bay Đà Nẵng', 'Da Nang airport', '30 km'],
    ],
    minNights: 1, kidsFree: true,
    extraRules: [{ vi: 'Hồ bơi dùng từ 6:00 đến 21:00, không có nhân viên cứu hộ; trẻ em xuống hồ phải có người lớn đi kèm.', en: 'Pool hours 6:00–21:00, no lifeguard on duty; children must be accompanied by an adult.' }],
    map: 'https://maps.app.goo.gl/nPrqHKZq9ptCj3ix6',
    album: 'https://drive.google.com/drive/folders/1i4Lt442jJh_u90XVfnHn0yDEnPvgZ6_x',
  },
  {
    id: 'bien', page: 'nha-bien.html',
    name: 'Nhà Biển', short: 'Nhà Biển', nameEn: 'Beach House',
    area: { vi: 'An Bàng · cách biển 100 m', en: 'An Bàng · 100 m to the beach' },
    addr: { vi: 'An Bàng, Hội An', en: 'An Bang, Hoi An' },
    type: { vi: 'Villa 1 tầng · nguyên căn · 269 m²', en: 'Single-storey villa · whole house · 269 m²' },
    tags: ['pool', 'beach', 'family'],
    cover: img('bien', 36), coverPos: '50% 55%',
    photos: order([29, 30, 2, 5, 11, 12, 33, 3, 6, 37, 38, 10, 18, 35, 36], 42).map(n => img('bien', n)),
    stats: { guests: '4', beds: '2', pool: true },
    lead: {
      vi: 'Villa một tầng rộng 269 m², đi bộ 100 m là tới biển An Bàng. Hồ bơi dài 20 m chạy dọc khu vườn, nhà mở nhiều nắng và gió biển.',
      en: 'A 269 m² single-storey villa, a 100 m walk from An Bàng beach. A 20-metre pool runs along the garden; the house opens to sunlight and sea breeze.',
    },
    highlights: [
      { vi: 'Cách biển An Bàng 100 m — đi bộ ra bãi tắm và các quán ăn ven biển.', en: '100 m from An Bàng beach — walk to the sand and the beachfront restaurants.' },
      { vi: 'Nhà một tầng, không cầu thang — hợp gia đình có trẻ nhỏ và người lớn tuổi.', en: 'Single storey, no stairs — easy for families with small children and older guests.' },
      { vi: 'Hồ bơi riêng 4 × 20 m, sân vườn rộng và bộ bàn ghế ngoài trời cho những bữa tối dưới trời.', en: 'Private 4 × 20 m pool, a large garden and outdoor furniture for dinners under the sky.' },
      { vi: 'Bếp hiện đại, phòng ăn rộng — hợp tụ tập nhóm nhỏ.', en: 'A modern kitchen and a large dining room — good for small gatherings.' },
    ],
    units: [
      { name: { vi: 'Nguyên căn villa', en: 'Whole villa' }, img: img('bien', 12), meta: { vi: '2 phòng ngủ king · 2 phòng tắm · 4 khách', en: '2 king bedrooms · 2 bathrooms · 4 guests' },
        desc: { vi: 'Thiết kế mở nhiều ánh sáng, lối vào riêng, sân vườn rộng. Có sân để xe máy và chỗ đậu ô tô gần nhà.', en: 'Open, light-filled design, private entrance, a large garden. Motorbike yard on site and car parking nearby.' }, airbnb: '' },
    ],
    amenities: ['pool', 'beach', 'wifi', 'kitchen', 'washer', 'work', 'ac', 'garden', 'parking', 'silk'],
    distances: [
      ['Biển An Bàng', 'An Bang beach', '100 m'],
      ['Phố cổ Hội An', 'Hội An Ancient Town', '3 km'],
      ['Sân bay Đà Nẵng', 'Da Nang airport', '30 km'],
    ],
    minNights: 1, kidsFree: true,
    extraRules: [{ vi: 'Trẻ em xuống hồ bơi phải có người lớn đi kèm.', en: 'Children must be accompanied by an adult in the pool.' }],
    map: 'https://maps.app.goo.gl/rSnKZxgCbJSgaL9A9',
    album: 'https://drive.google.com/drive/folders/1o6zGD7FLxo5ekEuJpzHG5yxhEp5rSO0l',
  },
];

/* Tiện nghi: [tiếng Việt, English, icon] */
const AMENITIES = {
  pool:    ['Hồ bơi riêng', 'Private pool', 'pool'],
  beach:   ['Gần biển 100 m', '100 m to the beach', 'wave'],
  wifi:    ['Wi-Fi', 'Wi-Fi', 'wifi'],
  kitchen: ['Bếp đầy đủ', 'Full kitchen', 'kitchen'],
  washer:  ['Máy giặt & sấy riêng', 'Private washer & dryer', 'washer'],
  bath:    ['Bồn tắm', 'Bathtub', 'bath'],
  work:    ['Góc làm việc', 'Work space', 'desk'],
  bike:    ['Xe đạp miễn phí', 'Free bicycles', 'bike'],
  jacuzzi: ['Bể sục nóng – lạnh', 'Hot & cold jacuzzi', 'spa'],
  parking: ['Chỗ đỗ xe', 'Parking', 'car'],
  moto:    ['Sân để xe máy', 'Motorbike yard', 'car'],
  ac:      ['Điều hòa', 'Air conditioning', 'snow'],
  rooftop: ['Sân thượng', 'Rooftop terrace', 'sun'],
  garden:  ['Sân vườn rộng', 'Large garden', 'leaf'],
  silk:    ['Ga gối lụa tre Mô', 'Mô bamboo-silk bedding', 'bed'],
  safety:  ['Báo khói, báo CO, bình chữa cháy', 'Smoke & CO alarms, extinguisher', 'shield'],
};

/* Đánh giá MẪU — thay bằng đánh giá thật của khách, rồi đặt SAMPLE_REVIEWS = false */
const REVIEWS = [
  { house: 'camf', who: 'Hannah', from: { vi: 'Đức · ở 2 tháng', en: 'Germany · stayed 2 months' },
    text: { vi: 'Mỗi sáng mở rèm là thấy cả cánh đồng. Bếp đủ đồ, máy giặt ngay trong căn, bàn làm việc nhìn ra lúa — tôi đã định ở hai tuần mà thành hai tháng.', en: 'Every morning I opened the curtains to the whole rice field. A well-stocked kitchen, a washer in the flat, a desk facing the paddies — I planned two weeks and stayed two months.' } },
  { house: 'sen', who: 'Minh Anh', from: { vi: 'Hà Nội · gia đình 4 người', en: 'Hanoi · family of 4' },
    text: { vi: 'Bọn trẻ bơi cả ngày, bố mẹ thì đi bộ sang làng rau Trà Quế học nấu ăn. Nhà sạch, ga gối mềm mát, chủ nhà trả lời Zalo rất nhanh.', en: 'The kids swam all day while we walked over to Trà Quế for a cooking class. Spotless house, soft cool bedding, and the host replied on Zalo in minutes.' } },
  { house: 'bien', who: 'Tom & Lucy', from: { vi: 'Úc · kỳ nghỉ 1 tuần', en: 'Australia · one-week holiday' },
    text: { vi: 'Buổi sáng ra biển, buổi chiều về nằm bên hồ bơi dài. Nhà một tầng nên bố mẹ lớn tuổi đi lại rất thoải mái.', en: 'Beach in the morning, the long pool in the afternoon. Being single-storey, it was easy for our parents to get around.' } },
  { house: 'trau', who: 'Thảo', from: { vi: 'TP.HCM · ở 1 tháng', en: 'Ho Chi Minh City · stayed 1 month' },
    text: { vi: 'Tường đất nung, sân trong đầy cây, ban công ngắm hoàng hôn trên đồng. Cảm giác như có một ngôi nhà nhỏ của riêng mình ở Hội An.', en: 'Terracotta walls, a courtyard full of plants, sunsets over the fields from the balcony. It felt like having my own little home in Hội An.' } },
  { house: 'camf', who: 'Daniel', from: { vi: 'Canada · làm việc từ xa', en: 'Canada · remote worker' },
    text: { vi: 'Wi-Fi ổn định, góc làm việc chung yên tĩnh, chiều tối ngâm bể sục trong vườn. Đạp xe mười phút là ra phố cổ.', en: 'Stable Wi-Fi, a quiet co-working corner, and the garden jacuzzi in the evening. The Ancient Town is a ten-minute ride away.' } },
  { house: 'sen', who: 'Julia', from: { vi: 'Pháp · cặp đôi', en: 'France · couple' },
    text: { vi: 'Sân thượng nhìn ra cây xanh, bữa sáng ăn cạnh hồ bơi. Chúng tôi ngủ ngon nhất chuyến đi trên bộ ga lụa tre ở đây.', en: 'A rooftop over the trees, breakfast by the pool. We slept better here than anywhere else on the trip, on those bamboo-silk sheets.' } },
];

/* Chính sách chung (theo chủ nhà, 18/09/2026) */
const POLICY = {
  cancel: [
    { vi: 'Hủy trước 30 ngày so với ngày nhận phòng: hoàn 100% tiền cọc.', en: 'Cancel 30+ days before check-in: 100% of the deposit refunded.' },
    { vi: 'Hủy trước 14 ngày: hoàn 50% tiền cọc.', en: 'Cancel 14+ days before check-in: 50% of the deposit refunded.' },
    { vi: 'Hủy trong vòng 14 ngày trước ngày nhận phòng hoặc không đến: không hoàn cọc.', en: 'Cancel within 14 days of check-in, or no-show: the deposit is not refunded.' },
  ],
  rules: [
    { vi: 'Không mang theo thú cưng.', en: 'No pets.' },
    { vi: 'Không hút thuốc trong nhà.', en: 'No smoking indoors.' },
    { vi: 'Giữ yên tĩnh sau 22:00, không tổ chức tiệc lớn.', en: 'Quiet after 22:00; no large parties.' },
    { vi: 'Không vượt quá số khách đã đăng ký.', en: 'No more guests than registered.' },
    { vi: 'Hư hỏng tài sản phát sinh trong kỳ lưu trú được ghi nhận bằng hình ảnh và bồi thường theo giá trị thực tế.', en: 'Any damage during the stay is recorded with photos and compensated at actual value.' },
  ],
};
