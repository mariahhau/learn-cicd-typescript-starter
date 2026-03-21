import { describe, expect, test, assert } from "vitest";
import { getAPIKey } from '../api/auth.ts'
import { IncomingHttpHeaders } from "http";


describe("auth.getAPIkey", () => {
  test("returns null if authorization header is missing", () => {
    const headers : IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null if authorization header is empty", () => {
    const headers : IncomingHttpHeaders = {authorization : ""};
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null if authorization header has less than 2 parts", () => {
    const headers : IncomingHttpHeaders = {authorization : "ApiKey"};
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null if header's first part is not ApiKey", () => {
    const headers : IncomingHttpHeaders = {authorization : "ApiKeyy 12345"};
    expect(getAPIKey(headers)).toBeNull();
  });

  test("is case-sensitive for ApiKey", () => {
    const headers : IncomingHttpHeaders = {authorization : "APIKEY 12345"};
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns the API key when authorization header is valid", () => {
    const headers : IncomingHttpHeaders = {authorization : "ApiKey 1234567890qwerty"};
    assert(getAPIKey(headers) === "1234567890qwerty");
  });

});