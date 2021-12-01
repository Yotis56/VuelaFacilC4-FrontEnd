const getPriceFormat = (price: number): string => {
  const options = { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }
  return new Intl.NumberFormat('es-CO', options).format(price)
}

export default getPriceFormat