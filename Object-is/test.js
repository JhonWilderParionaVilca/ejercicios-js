if (!Object.is || true) {
  Object.is = function ObjectIs(value1, value2) {
    const v1IsNegativeZero = isNegativeZero(value1);
    const v2IsNegativeZero = isNegativeZero(value2);
    if (v1IsNegativeZero || v2IsNegativeZero) {
      return v1IsNegativeZero && v2IsNegativeZero;
    }

    if (isNaN(value1)) {
      return isNaN(value2);
    }

    return value1 === value2;
  };

  function isNaN(value) {
    return value !== value;
  }
  function isNegativeZero(value) {
    return value === 0 && 1 / value === -Infinity;
  }
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
