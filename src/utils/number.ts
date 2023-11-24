export function twoDecimalNumber(nombre: number): number | string {
  if (Number.isInteger(nombre)) {
    return nombre;
  } else {
    return nombre.toFixed(2);
  }
}
