export const BREED_KO = {
  akita: '아키타',
  beagle: '비글',
  boxer: '복서',
  chihuahua: '치와와',
  chow: '차우차우',
  dachshund: '닥스훈트',
  dalmatian: '달마시안',
  doberman: '도베르만',
  germanshepherd: '저먼 셰퍼드',
  husky: '허스키',
  labrador: '래브라도 리트리버',
  malamute: '말라뮤트',
  maltese: '말티즈',
  newfoundland: '뉴펀들랜드',
  papillon: '파피용',
  pekinese: '페키니즈',
  pembroke: '웰시 코기',
  pitbull: '핏불',
  pomeranian: '포메라니안',
  pug: '퍼그',
  rottweiler: '로트와일러',
  samoyed: '사모예드',
  sharpei: '샤페이',
  shiba: '시바견',
  shihtzu: '시츄',
  stbernard: '세인트 버나드',
};

export const BREED_ALIASES = {
  래브라도: 'labrador',
  리트리버: 'labrador',
  코기: 'pembroke',
  웰시코기: 'pembroke',
  저먼셰퍼드: 'germanshepherd',
  셰퍼드: 'germanshepherd',
  시바: 'shiba',
  시바이누: 'shiba',
  세인트버나드: 'stbernard',
};

export const KO_TO_BREED = Object.entries(BREED_KO).reduce(
  (acc, [code, name]) => {
    acc[name.replace(/\s/g, '').toLowerCase()] = code;
    acc[code.toLowerCase()] = code;
    return acc;
  },
  { ...BREED_ALIASES }
);
