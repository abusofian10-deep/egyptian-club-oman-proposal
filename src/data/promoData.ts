export interface OfferItem {
  id: string;
  name: string;
  category: string;
  price: string; // Strictly 3 decimal places e.g. "0.990"
  currency: string; // "ر.ع"
  subLabel?: string; // e.g. "990 بيسة فقط"
  unit: string;
  badge?: string;
  accentColor: string;
}

export const promoConfig = {
  brand: {
    name: "الحميضي هايبرماركت",
    englishName: "Al Humaidhi Hypermarket",
    headline: "عروض نهاية الأسبوع من الحميضي هايبرماركت",
    locations: "فرعي الجرداء وإبراء",
    currency: "ر.ع",
    inspectorStamp: "مفحوص من المفتش فطين ✓",
    footerDisclaimer: "العرض ساري حتى نفاذ الكمية",
  },
  colors: {
    emeraldGreen: "#007A3D",
    emeraldDark: "#004724",
    royalBlue: "#004B93",
    royalBlueDark: "#002B54",
    gold: "#FFB703",
    goldLight: "#FFE28A",
    goldDark: "#C68A00",
    pureWhite: "#FFFFFF",
    bgDark: "#051329",
  },
  offers: [
    {
      id: "apple-box",
      name: "كرتون تفاح طازج",
      category: "فواكه طازجة ممتازة",
      price: "0.990",
      currency: "ر.ع",
      subLabel: "990 بيسة فقط",
      unit: "كرتون كامل",
      badge: "توفير مذهل",
      accentColor: "#E63946",
    },
    {
      id: "yemeni-pomegranate",
      name: "رمان يمني فاخر",
      category: "ثمار الموسم المختارة",
      price: "1.490",
      currency: "ر.ع",
      subLabel: "حلاوة وجودة مضمونة",
      unit: "للكيلو",
      badge: "طازج يومياً",
      accentColor: "#C1121F",
    },
  ] as OfferItem[],
  cta: {
    headline: "لا تفوّت العروض!",
    actionText: "زورونا اليوم في أقرب فرع واستمتعوا بالتوفير",
  },
};
