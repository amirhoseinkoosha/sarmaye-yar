export default function SymbolInfo({ symbol }: { symbol: string }) {
  return (
    <div className="bg-darkCard rounded-xl p-4">
      <h2 className="text-gray-300 text-sm mb-4">تحلیل سریع {symbol}</h2>

      <ul className="space-y-2 text-gray-400 text-sm">
        <li>• روند کلی: صعودی</li>
        <li>• قدرت خریدار حقیقی: بالا</li>
        <li>• میانگین متحرک 20 روزه: بالای قیمت</li>
        <li>• سیگنال تکنیکال: خرید کوتاه‌مدت</li>
      </ul>
    </div>
  );
}
