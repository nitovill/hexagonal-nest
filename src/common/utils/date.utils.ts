export class DateUtils {
  /**
   * Obtiene la fecha de inicio del último mes
   * @returns Date - Fecha de inicio del último mes
   */
  static getStartOfLastMonth(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  }
}
