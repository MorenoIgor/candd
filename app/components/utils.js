export function changeNumber(nmb,change,min,max) {
    if (nmb+change < min) {
      return min
    }
    if (nmb+change > max) {
      return max
    }
    return nmb+change
  }