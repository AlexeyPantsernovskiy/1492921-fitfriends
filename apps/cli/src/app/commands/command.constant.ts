export const PHOTO_PATH = './uploads';

export const USER_ADMIN = {
  email: 'admin@local.comp',
  name: 'admin',
  password: 'admin',
} as const;

export const CreateDatePeriod = {
  Begin: new Date(2022, 0, 1),
  End: new Date(),
} as const;

export const GUITARS = [
  // Гитары
  {
    name: 'Fender Stratocaster Classic',
    description:
      'Легендарная электрогитара с тремя синглами, подходит для рока, блюза и джаза.',
    price: 1200,
    barcode: 'GT-123456',
    typeCode: 'electric',
    countStrings: 6,
  },
  {
    name: 'Gibson Les Paul Standard',
    description:
      'Электрогитара с хамбакерами, насыщенный звук для рока и металла.',
    price: 2500,
    barcode: 'GT-654321',
    typeCode: 'electric',
    countStrings: 6,
  },
  {
    name: 'Yamaha FG800',
    description: 'Акустическая гитара для начинающих, отличное качество звука.',
    price: 200,
    barcode: 'GT-987654',
    typeCode: 'acoustic',
    countStrings: 6,
  },
  {
    name: 'Ibanez RG550',
    description: 'Электрогитара для металла и тяжелой музыки, быстрый гриф.',
    price: 1000,
    barcode: 'GT-456789',
    typeCode: 'electric',
    countStrings: 7,
  },
  {
    name: 'Martin D-28',
    description:
      'Акустическая гитара премиум-класса, идеальна для фолка и кантри.',
    price: 3000,
    barcode: 'GT-321654',
    typeCode: 'acoustic',
    countStrings: 6,
  },
  {
    name: 'PRS Custom 24',
    description: 'Универсальная электрогитара с уникальным дизайном и звуком.',
    price: 3500,
    barcode: 'GT-789123',
    typeCode: 'electric',
    countStrings: 6,
  },
  {
    name: 'Taylor 314ce',
    description: 'Акустическая гитара с вырезом и встроенным звукоснимателем.',
    price: 1800,
    barcode: 'GT-234567',
    typeCode: 'acoustic',
    countStrings: 6,
  },
  {
    name: 'Epiphone Casino',
    description: 'Полая электрогитара, популярная благодаря The Beatles.',
    price: 600,
    barcode: 'GT-876543',
    typeCode: 'electric',
    countStrings: 6,
  },
  {
    name: 'Gretsch G2622 Streamliner',
    description:
      'Полуакустическая гитара с хамбакерами, стильный ретро-дизайн.',
    price: 700,
    barcode: 'GT-345678',
    typeCode: 'electric',
    countStrings: 6,
  },
  {
    name: 'Fender Telecaster Deluxe',
    description:
      'Электрогитара с двумя хамбакерами, подходит для рока и кантри.',
    price: 1500,
    barcode: 'GT-765432',
    typeCode: 'electric',
    countStrings: 6,
  },
  {
    name: 'Cort Earth 70',
    description:
      'Акустическая гитара с массивной верхней декой, отличный звук.',
    price: 300,
    barcode: 'GT-567890',
    typeCode: 'acoustic',
    countStrings: 6,
  },
  {
    name: 'Jackson Soloist SL2',
    description:
      'Электрогитара для металла, скоростной гриф и агрессивный звук.',
    price: 1200,
    barcode: 'GT-432109',
    typeCode: 'electric',
    countStrings: 7,
  },
  {
    name: 'Seagull S6 Original',
    description: 'Акустическая гитара ручной работы, отличный выбор для фолка.',
    price: 500,
    barcode: 'GT-890123',
    typeCode: 'acoustic',
    countStrings: 6,
  },
  {
    name: 'ESP LTD EC-1000',
    description: 'Электрогитара для металла, стильный дизайн и мощный звук.',
    price: 900,
    barcode: 'GT-678901',
    typeCode: 'electric',
    countStrings: 6,
  },
  {
    name: 'Gibson SG Standard',
    description: 'Легкая электрогитара с агрессивным звучанием.',
    price: 1400,
    barcode: 'GT-210987',
    typeCode: 'electric',
    countStrings: 6,
  },
  {
    name: 'Takamine GN93CE',
    description: 'Акустическая гитара с вырезом и встроенной электроникой.',
    price: 800,
    barcode: 'GT-901234',
    typeCode: 'acoustic',
    countStrings: 6,
  },
  {
    name: 'Rickenbacker 330',
    description:
      'Полуакустическая гитара с уникальным звуком, популярна в роке.',
    price: 2000,
    barcode: 'GT-543210',
    typeCode: 'electric',
    countStrings: 6,
  },
  {
    name: 'Washburn D10S',
    description:
      'Акустическая гитара для начинающих, отличное соотношение цены и качества.',
    price: 250,
    barcode: 'GT-109876',
    typeCode: 'acoustic',
    countStrings: 6,
  },
  {
    name: 'Schecter Hellraiser C-1',
    description: 'Электрогитара для металла, активные звукосниматели.',
    price: 1100,
    barcode: 'GT-876509',
    typeCode: 'electric',
    countStrings: 7,
  },
  {
    name: 'Ovation Celebrity CC24',
    description:
      'Акустическая гитара с круглой задней декой, встроенный тюнер.',
    price: 600,
    barcode: 'GT-654098',
    typeCode: 'acoustic',
    countStrings: 6,
  },

  // Укулеле
  {
    name: 'Kala KA-15S',
    description:
      'Сопрано-укулеле для начинающих, отличный звук и доступная цена.',
    price: 100,
    barcode: 'UK-123456',
    typeCode: 'ukulele',
    countStrings: 4,
  },
  {
    name: 'Lanikai LU-21',
    description:
      'Концертная укулеле с корпусом из красного дерева, теплый звук.',
    price: 150,
    barcode: 'UK-654321',
    typeCode: 'ukulele',
    countStrings: 4,
  },
  {
    name: 'Cordoba 15CM',
    description:
      'Концертная укулеле с корпусом из массива махогани, насыщенный звук.',
    price: 200,
    barcode: 'UK-987654',
    typeCode: 'ukulele',
    countStrings: 4,
  },
  {
    name: 'Mahalo MK1',
    description: 'Сопрано-укулеле для начинающих, яркий дизайн и легкий вес.',
    price: 50,
    barcode: 'UK-456789',
    typeCode: 'ukulele',
    countStrings: 4,
  },
  {
    name: 'Fender Venice',
    description: 'Электроакустическая укулеле с вырезом, встроенный тюнер.',
    price: 250,
    barcode: 'UK-321654',
    typeCode: 'ukulele',
    countStrings: 4,
  },

  // Акустические гитары с 12 струнами
  {
    name: 'Taylor 150e 12-String',
    description:
      'Акустическая гитара с 12 струнами, насыщенный и объемный звук.',
    price: 1500,
    barcode: 'GT-6782112',
    typeCode: 'acoustic',
    countStrings: 12,
  },
  {
    name: 'Martin D12-28',
    description:
      'Акустическая гитара премиум-класса с 12 струнами, идеальна для фолка.',
    price: 3200,
    barcode: 'GT-4356893',
    typeCode: 'acoustic',
    countStrings: 12,
  },
  {
    name: 'Fender CD-60SCE 12-String',
    description:
      'Акустическая гитара с 12 струнами, доступная цена и отличное качество.',
    price: 400,
    barcode: 'GT-4522344',
    typeCode: 'acoustic',
    countStrings: 12,
  },

  // Электрогитары с 4 струнами
  {
    name: 'Fender Bass VI',
    description:
      'Электрогитара с 4 струнами, уникальный звук для басовых партий.',
    price: 1200,
    barcode: 'GT-4967754',
    typeCode: 'electric',
    countStrings: 4,
  },
  {
    name: 'Gibson EB-0',
    description: 'Электрогитара с 4 струнами, компактный дизайн и мощный звук.',
    price: 1800,
    barcode: 'GT-4591573',
    typeCode: 'electric',
    countStrings: 4,
  },
  {
    name: 'Ibanez GSRM20',
    description:
      'Электрогитара с 4 струнами, отличный выбор для начинающих басистов.',
    price: 300,
    barcode: 'GT-668932',
    typeCode: 'electric',
    countStrings: 4,
  },
];
