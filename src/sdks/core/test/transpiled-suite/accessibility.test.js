/*
 * Copyright 2021 Comcast Cable Communications Management, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { test, expect } from '@jest/globals';
import { Accessibility } from '../../build/javascript/src/firebolt';
test('listen', () => {
    return Accessibility.listen((event, data) => { }).then((res) => {
        expect(res > 0).toBe(true);
    });
});
test('once', () => {
    return Accessibility.once((event, data) => { }).then((res) => {
        expect(res > 0).toBe(true);
    });
});
test('listen ClosedCaptionsSettings', () => {
    return Accessibility.listen((event, listener) => { }).then((res) => {
        expect(res > 0).toBe(true);
    });
});
test('once ClosedCaptionsSettings', () => {
    return Accessibility.once((event, listener) => { }).then((res) => {
        expect(res > 0).toBe(true);
    });
});
test('listen VoiceGuidanceSettings', () => {
    return Accessibility.listen((event, listener) => { }).then((res) => {
        expect(res > 0).toBe(true);
    });
});
test('once VoiceGuidanceSettings', () => {
    return Accessibility.once((event, listener) => { }).then((res) => {
        expect(res > 0).toBe(true);
    });
});
test('clear()', () => {
    const result = Accessibility.clear(2);
    expect(result).toBeFalsy();
});
