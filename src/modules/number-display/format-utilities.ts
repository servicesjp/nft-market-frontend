export function asUSD(value: number, useRounding: boolean = true) {
  const magnitude = Math.abs(value);
  const fractions = useRounding && magnitude >= 100 && magnitude < 1000 ? 0 : 2;
  const currencyFormat = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: fractions,
  });
  if (useRounding && magnitude > 1000) {
    return currencyFormat.format(value / 1000) + "k";
  }
  return currencyFormat.format(value);
}

interface NumberFormatOptions {
  roundThousands: boolean;
}

/* export function formatNumber(value: number, options: NumberFormatOptions = { roundThousands: true }) {
    const magnitude = Math.abs(value)
    const fractions = (magnitude >= 100 && magnitude < 1000) ? 0 : 2
    const currencyFormat = Intl.NumberFormat('en-US', { maximumFractionDigits: fractions })

    if (magnitude > 1000 && options.roundThousands) {
        return currencyFormat.format(value / 1000) + "k"
    }

    return currencyFormat.format(value)
} */

export function formatNumber(value: number) {
  const formattedNumber = value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
    minimumIntegerDigits: 1,
    useGrouping: true,
  });

  return formattedNumber;
}

export function asPercent(value: number | undefined) {
  if (value === undefined) {
    return;
  }
  const fractions = value < 1 ? 2 : 0;
  return Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: fractions,
  }).format(value);
}
export function formatWithPrecision(value: any, precision: string): string {

  let precision1 = precision.split('.');
  if(precision1.length > 1){
     return value.toFixedFloor(precision1[1].length)
  } else {
     return value.toFixedFloor(0)
  };
  // switch (precision) {
  //   case "0.0001":
  //     return value.toFixedFloor(4);
  //   case "0.001":
  //     return value.toFixedFloor(3);
  //   case "0.01":
  //     return value.toFixedFloor(2);
  //   case "0.1":
  //     return value.toFixedFloor(1);
  //   case "0":
  //     return value.toFixedFloor(0);
  //   case "1":
  //     return value.toFixedFloor(0);
  //   case "10":
  //     return (Math.round(value / 10) * 10).toFixedFloor(0);
  //   case "100":
  //     return (Math.round(value / 100) * 100).toFixedFloor(0);
  //   default:
  //     console.error("Unknown precision: " + precision);
  //     return value.toString();
  // }
}
export function formatWithPrecision1(value: number, precision: string): string {
  switch (precision) {
    case "0.0001":
      return value.toFixed(4);
    case "0.001":
      return value.toFixed(3);
    case "0.01":
      return value.toFixed(2);
    case "0.1":
      return value.toFixed(1);
    case "1":
      return value.toFixed(0);
    case "10":
      return (Math.round(value / 10) * 10).toFixed(0);
    case "100":
      return (Math.round(value / 100) * 100).toFixed(0);
    default:
      console.error("Unknown precision: " + precision);
      return value.toString();
  }
}
