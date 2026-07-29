const currencyFormatters = new Map<string, Intl.NumberFormat>();

function getCurrencyFormatter(currency: string, locale = "en-US") {
  const key = `${locale}:${currency}`;
  if (!currencyFormatters.has(key)) {
    currencyFormatters.set(
      key,
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    );
  }
  return currencyFormatters.get(key)!;
}

export function formatCurrency(
  amount: number | string,
  currency = "USD",
  locale = "en-US",
) {
  const value = typeof amount === "string" ? Number(amount) : amount;
  return getCurrencyFormatter(currency, locale).format(value);
}

export function formatDate(
  date: Date | string | number,
  locale = "en-US",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
) {
  const value = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat(locale, options).format(value);
}

export function formatDateTime(
  date: Date | string | number,
  locale = "en-US",
) {
  return formatDate(date, locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
