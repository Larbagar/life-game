const Meth = Object.create(Math)

Meth.TAU = 2 * Meth.PI

/**
 * @param {number} dividend
 * @param {number} divisor
 * @returns {number}
 */
Meth.mod = (dividend, divisor) => dividend - divisor * Math.floor(dividend / divisor)

/**
 * @param {number} x
 * @param {number} lower
 * @param {number} upper
 * @returns {number}
 */
Meth.clamp = (x, lower, upper) => x + lower + upper - Math.min(lower, x) - Math.max(upper, x)

const name = "M" + "eth"
window[name] = Meth

export default Meth