// TODO: define polyfill for `Object.is(..)`

function isNaN(v) {
  return v?.toString() === "NaN";
}

function isNegativeZero(v) {
  if (1 / v === -Infinity) {
    return true;
  }
  return false;
}

if (!Object.is || true) {
  Object.is = function ObjectIs(value1, value2) {
    if (isNaN(value1)) {
      return isNaN(value2);
    }

    if (isNegativeZero(value1)) {
      return isNegativeZero(value2);
    }
    if (isNegativeZero(value2)) {
      return false;
    }

    return value1 === value2;
  };
}

// tests:
console.log(Object.is(42, 42) === true);
console.log(Object.is("foo", "foo") === true);
console.log(Object.is(false, false) === true);
console.log(Object.is(null, null) === true);
console.log(Object.is(undefined, undefined) === true);
console.log(Object.is(NaN, NaN) === true);
console.log(Object.is(-0, -0) === true);
console.log(Object.is(0, 0) === true);

console.log(Object.is(-0, 0) === false);
console.log(Object.is(0, -0) === false);
console.log(Object.is(0, NaN) === false);
console.log(Object.is(NaN, 0) === false);
console.log(Object.is(42, "42") === false);
console.log(Object.is("42", 42) === false);
console.log(Object.is("foo", "bar") === false);
console.log(Object.is(false, true) === false);
console.log(Object.is(null, undefined) === false);
console.log(Object.is(undefined, null) === false);
