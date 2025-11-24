const lines: Record<string, {
    title: string
    act: number
    actName: string
    designers: string[]
    sound: string
    motion: string
    photo: string[]
    description: string
    images: string[]
}> = {
  '1': {
    title: 'Immensity',
    act: 1,
    actName: 'Emergence',
    designers: ['Erika Egliskis', 'Sunny Guo'],
    sound: 'Ryan Zhang',
    motion: 'Isabel Fleck',
    photo: ['Yiwen Jiang', 'Lauren Cho'],
    description: "Our ideal states of complete happiness are rooted in the places we call home: Japan and California. Our line, Immensity, transforms this vision of a physical paradise into wearable forms inspired by the sea, a vital aspect of these places. Having encountered the world's pitfalls and flaws, we recognize that there is no definitive end to our life journey—only the embrace of its continuous evolution.",
    images: Array.from(
      { length: 9 },
      (_, i) => `/lineshots/1/line1_${i + 1}.jpg`
    )
  },
  '2': {
    title: 'Ka',
    act: 1,
    actName: 'Emergence',
    designers: ['Sueah Kim'],
    sound: 'Nick Barreto',
    motion: 'Emily Lau',
    photo: ['Lauren Cho', 'Annie Zhang'],
    description: "I spent two months living in Bali this summer, and 'Ka' was the word I heard most often. My friends always used it before addressing another friend's name to express respect and warmth. Ka symbolizes the harmony between nature, loved ones, and self-understanding—the true foundation of happiness. This line is dedicated to four friends I laughed with every day in Bali: Ka Felita, Ka Rahel, Ka Namira, and Ka Emmily.",
    images: Array.from(
      { length: 7 },
      (_, i) => `/lineshots/2/line2_${i + 1}.jpg`
    )
  },
  '3': {
    title: 'East Meets West',
    act: 1,
    actName: 'Emergence',
    designers: ['Aziza Norkulova'],
    sound: 'Evan Neely',
    motion: 'Silvia Shin',
    photo: ['Erin Hsu', 'Yiwen Jiang'],
    description: "Inspired by the renowned and historical city of Samarqand, Uzbekistan, where Eastern and Western cultures intertwined on the Silk Road, 'East Meets West' embodies the convergence of cultural and personal evolution. Growing up in America with immigrant Uzbek parents, my childhood encompassed traditional Uzbek fabrics such as Atlas and Suzani, textiles woven into my line through modern silhouettes that celebrate tradition, uniqueness, and the beauty of identity and growth.",
    images: Array.from(
      { length: 9 },
      (_, i) => `/lineshots/3/line3_${i + 1}.jpg`
    )
  },
  '4': {
    title: 'Pado',
    act: 2,
    actName: 'Blossom',
    designers: ['Josephine Kim', 'Clarine Lee'],
    sound: 'Kaloyan Stefanov',
    motion: 'Jeff Ye',
    photo: ['Annie Zhang', 'Eunice Lai'],
    description: "Pado is the romanization of the Korean word for wave (\uD30C\uB3C4). This line draws parallels to the journey of life to the phases of an ocean wave; our line embodies the hues and motions that it takes on by visualizing the depths, the crest, and the crashing of the waves—all which are part of an endless cycle, and in constant motion.",
    images: Array.from(
      { length: 9 },
      (_, i) => `/lineshots/4/line4_${i + 1}.jpg`
    )
  },
  '5': {
    title: 'Eve',
    act: 2,
    actName: 'Blossom',
    designers: ['Anika Bhagavatula'],
    sound: 'Katherine Wang',
    motion: 'Isabel Fleck',
    photo: ['Eunice Lai'],
    description: "Eve draws upon the symbolism of the peacock, which, across cultures and religions, represents benevolence, beauty, rebirth, and pride. The peacock has an elegant and regal persona but also hides an inherent fragility, which parallels a sense of overconfidence that masks deeper vulnerabilities. This line reflects the navigation of our values, morals, and sense of self to explore shifting identities.",
    images: Array.from(
      { length: 10 },
      (_, i) => `/lineshots/5/line5_${i + 1}.jpg`
    )
  },
  '6': {
    title: 'Recupera-Se',
    act: 2,
    actName: 'Blossom',
    designers: ['Jason Asiedu', 'Nataniella Essang', 'Mikayla Gee'],
    sound: 'Samyuktha Athreya',
    motion: 'Deeptika Mandha',
    photo: ['Yujin Lee', 'Erin Hsu'],
    description: "This collection artistically embodies the emotional path from trauma to healing, using symbolic design elements. The first half reflects raw pain and numbness: torn chiffon, skeletal corsets, and trailing bandages signify lingering wounds and detachment. The second half portrays renewal, with cracks that let in light, black linen entwined with white threads of healing, and flowers that shift from representing pain to growth. The final look, adorned with watches, powerfully symbolizes time’s healing effect.",
    images: Array.from(
      { length: 6 },
      (_, i) => `/lineshots/6/line6_${i + 1}.jpg`
    )
  },
  '7': {
    title: 'Follow Me Through it All',
    act: 2,
    actName: 'Blossom',
    designers: ['Sadie Han', 'Ashley Park'],
    sound: 'Rowan Sullivan',
    motion: 'Garrett Lee',
    photo: ['Annie Zhang', 'Yujin Lee'],
    description: "Follow Me Through it All represents the journey of embracing both life's struggles and joys. The challenges we face are not to be forgotten but seen as part of our growth. While reminders of the past, they also illuminate our strength and resilience, finding peace in our imperfections. Embracing both the light and the dark allows us to forge ahead, illuminating the way to our personal paradise.",
    images: Array.from(
      { length: 8 },
      (_, i) => `/lineshots/7/line7_${i + 1}.jpg`
    )
  },
  '8': {
    title: 'Unearthed',
    act: 3,
    actName: 'Blossom',
    designers: ['Amy Hu'],
    sound: 'Blaine Black',
    motion: 'Silvia Shin',
    photo: ['Chieri Nnadozie', 'Yujin Lee'],
    description: "TBD",
    images: [],
  },
  '9': {
    title: 'Avarice',
    act: 3,
    actName: 'Hubris',
    designers: ['R\u00e4yya Gracy', 'Jackson Underwood'],
    sound: 'Felix Gabriel',
    motion: 'Silvia Shin',
    photo: ['Chieri Nnadozie', 'Yujin Lee'],
    description: "Avarice depicts a journey through birth, blood, greed, and intemperance. Only after experiencing and succumbing to Earth's great temptations, a state of enlightenment can be reached. Exploring different faiths and philosophies, our collection questions the value of materialism and the line between the physical, emotional, and spiritual. Our designs focus on movement, pattern, and texture to embody the constant flow of time juxtaposed with the chaos of human desire.",
    images: [],
  },
  '10': {
    title: 'Eaclipse',
    act: 3,
    actName: 'Hubris',
    designers: ['Abby Chen', 'Eugene Kim'],
    sound: 'Harry Schneider',
    motion: 'Garrett Lee',
    photo: ['Tarina Amarlikit', 'Yiwen Jiang'],
    description: "Eaclipse embodies the delicate dance of yin and yang, which reflects the transformative power of eclipses. With bold contrasts and fluid designs, each piece tells a story of disruption, healing, and the journey toward personal Elysium—turning darkness into light and challenges into hopeful strength.",
    images: [],
  },
  '11': {
    title: 'Reverie',
    act: 3,
    actName: 'Hubris',
    designers: ['Brooke Schwartz'],
    sound: 'Nick Barreto',
    motion: 'Isable Fleck',
    photo: ['Chieri Nnadozie', 'Yujin Lee'],
    description: "Reverie is a place where identity disintegrates—a delusional paradise uncovered by those who hope to escape reality. Individuals who ascend into this dreamlike realm will almost always return, forced to acknowledge the demands of our undeniably flawed world.",
    images: Array.from(
      { length: 9 },
      (_, i) => `/lineshots/11/line11_${i + 1}.jpg`
    )
  },
  '12': {
    title: 'Balance',
    act: 3,
    actName: 'Hubris',
    designers: ['Amy Cha'],
    sound: 'Felix Gabriel',
    motion: 'Karis Choe',
    photo: ['Yiwen Jiang', 'Yujin Lee'],
    description: "Balance portrays the id, ego, and superego, reflecting the internal struggles of the human experience. It showcases the raw energy of the id through avant-garde designs, the structured ideals of the superego through minimalist tailoring, and the ego’s harmony through hybrid, asymmetrical pieces. Celebrating imperfections, Balance tells a story of self-discovery, acceptance, and beauty in the ongoing negotiation between innate desires, morality, and societal expectations.",
    images: [],
  },
  '13': {
    title: 'Self Love',
    act: 4,
    actName: 'Embrace',
    designers: ['Nate Neira'],
    sound: 'Evan Neely',
    motion: 'motion',
    photo: ['photo'],
    description: "Self Love is the form of structural features of clothing that are representative of aspects of love itself, both internal and external, that build towards a fully formed visual experience. We are relating the concept of 'path to paradise' to the process of growth that allows one to find themselves and deal with existing as themselves through progression of expressionism related to positive and negative emotional experiences.",
    images: [],
  },
  '14': {
    title: 'Celestial Vanity',
    act: 4,
    actName: 'Embrace',
    designers: ['Anais Yoon', 'Lili Fishman'],
    sound: 'Rowan Sullivan',
    motion: 'Jeff Ye',
    photo: ['Chieri Nnadozie', 'Yujin Lee'],
    description: "Celestial Vanity is a collection that reflects the beauty in embracing flaws and imperfections. As you grow, you realize obsession over one’s pitfalls and the unattainable pursuit of perfection is futile, guiding you toward a more balanced and enlightened state of being. Accepting and embracing our flaws in the continuous journey of life can lead us on the path journey to true fulfillment, happiness, and Elysium.",
    images: [],
  },
  '15': {
    title: 'Shattered Silk',
    act: 4,
    actName: 'Embrace',
    designers: ['Nicole Si Yao Huang'],
    sound: 'Nick Barreto',
    motion: 'Emily Lau',
    photo: ['Tarina Amarlikit'],
    description: "How does silk shatter? Hanging ghost of a crystal chandelier, Fault lines and bubbles and circles of glass. A theater in pink moon; Fragile ribbons for wispen hair dance, Delicate—did you catch it? In its gentle fragmentation of lovers' tears.",
    images: [],
  },
  '16': {
    title: 'Aporia',
    act: 4,
    actName: 'Embrace',
    designers: ['Julia Kasper'],
    sound: 'Katherine Wang',
    motion: 'motion',
    photo: ['Matthew Akuamoah-Boateng', 'Erin Hsu'],
    description: "'Aporia' is a Greek term of contradiction and opposing truths. In this line, it reflects the paradox of aspiration and transcendence through mortal figures Icarus and Psyche. Icarus evokes ambition and fragility with a nod to his craftsman father and wing maker’s hands. The wings, rigid and melting, betray his aspirations, limited by mortal reach. Beside him, Psyche radiates ethereal grace, floating in the delicate iridescent wings of transformation—an ode to the luminous rebirth of the soul.",
    images: [],
  },
}

export default lines;