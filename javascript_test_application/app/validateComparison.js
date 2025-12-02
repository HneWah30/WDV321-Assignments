/*
  Test Plan - Compare two numbers and return the larger

  Value1   Value2     Expected Result
  -----------------------------------------------
  5        6          6
  4        3          4
  3        3          "The amounts are equal"

  a        5          "Please enter a number in Value 1"
  5        a          "Please enter a number in Value 2"

  ""       5          "Please enter a number in Value 1"
  5        ""         "Please enter a number in Value 2"

  -1       5          5
  +34      -30        34
  -5       -6         -5
  5        -1         5

  1.5      2          2
  2        1.5        2

  3/4      1          "Please enter a number in Value 1"
  5b       3          "Please enter a number in Value 1"
  3        5b         "Please enter a number in Value 2"
*/

function validateComparison(v1, v2) {

  // Empty string handling
  if (v1 === "" || v1 === null)
    return "Please enter a number in Value 1";

  if (v2 === "" || v2 === null)
    return "Please enter a number in Value 2";

  // Invalid (NaN) handling including fractions (e.g., "3/4") or 5b
  if (isNaN(v1) || (typeof v1 === "string" && v1.includes("/")))
    return "Please enter a number in Value 1";

  if (isNaN(v2) || (typeof v2 === "string" && v2.includes("/")))
    return "Please enter a number in Value 2";

  // Convert to real numbers
  const num1 = Number(v1);
  const num2 = Number(v2);

  // Equality handling
  if (num1 === num2)
    return "The amounts are equal";

  // Return the larger number
  return num1 > num2 ? num1 : num2;
}

global.validateComparison = validateComparison;  // 👈 REQUIRED
