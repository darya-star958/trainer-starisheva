"use strict";

export function parseAnswer(input) {
  if (input === null || input === undefined) return NaN;
  const normalized = String(input).trim().replace(/\s+/g, "").replace(",", ".");
  return Number(normalized);
}

export function checkNumeric(input, expected, tolerance = 0.01) {
  const value = parseAnswer(input);
  if (Number.isNaN(value)) return { ok: false, reason: "not-a-number", value: NaN };
  const limit = expected === 0 ? tolerance : Math.abs(expected) * tolerance;
  const ok = Math.abs(value - expected) <= limit;
  return { ok, reason: ok ? "correct" : "wrong", value };
}

export function checkText(input, expected) {
  const norm = (s) => String(s).trim().toLowerCase().replace(/\s+/g, " ");
  const ok = norm(input) === norm(expected);
  return { ok, reason: ok ? "correct" : "wrong" };
}

export function checkBoolTable(input, expected) {
  const clean = (s) => String(s).trim().replace(/[\s,;\-]/g, "").replace(/[^01]/g, "");
  const got = clean(input);
  const want = clean(expected);
  if (got.length === 0) return { ok: false, reason: "empty" };
  if (got.length !== want.length) return { ok: false, reason: "length" };
  const ok = got === want;
  return { ok, reason: ok ? "correct" : "wrong" };
}

export function checkLogic(input, expected) {
  const TRUE  = ["1", "true", "истина", "да", "yes"];
  const FALSE = ["0", "false", "ложь", "нет", "no"];
  const s = String(input).trim().toLowerCase();
  let value;
  if (TRUE.includes(s)) value = true;
  else if (FALSE.includes(s)) value = false;
  else return { ok: false, reason: "not-a-boolean" };
  const ok = value === expected;
  return { ok, reason: ok ? "correct" : "wrong" };
}