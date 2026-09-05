// Coordinates reference the untouched 1500 × 1000 source image.
// Numbering follows page 2 of the supplied website mockup.
export const destinations = [
  { id: "contact", number: "01", label: "Contact us", object: "the figurine", x: 715, y: 162, w: 73, h: 96,
    path: "M720 220 L726 191 L739 177 L749 163 L762 172 L770 185 L779 199 L783 224 L773 244 L752 252 L733 240 Z" },
  { id: "socials", number: "02", label: "Socials & sign up", object: "the sculpture", x: 512, y: 0, w: 50, h: 116,
    path: "M521 0 L545 0 L549 32 L558 70 L558 114 L545 114 L541 90 L532 89 L528 114 L514 114 L514 77 L523 39 Z" },
  { id: "bio", number: "03", label: "Bio", object: "the books", x: 490, y: 542, w: 100, h: 93,
    path: "M491 545 L589 549 L589 633 L491 633 Z" },
  { id: "music", number: "04", label: "Music", object: "the records", x: 607, y: 138, w: 81, h: 91,
    path: "M608 140 L688 141 L688 226 L608 226 Z" },
  { id: "videos", number: "05", label: "Music videos", object: "the neon light", x: 839, y: 0, w: 230, h: 115,
    path: "M877 0 L1024 0 L1067 113 L849 113 Z" },
  { id: "tour", number: "06", label: "Tour", object: "the speaker", x: 474, y: 252, w: 132, h: 276,
    path: "M476 254 L603 254 L603 380 L575 411 L592 454 L604 481 L604 525 L475 525 Z" },
  { id: "merch", number: "07", label: "Merch", object: "the turntable", x: 819, y: 514, w: 178, h: 60,
    path: "M829 520 L968 515 L991 530 L995 569 L819 569 L819 541 Z" },
] as const;

export const bandsintownUrl = "https://www.bandsintown.com/a/34100-lalah-hathaway";
