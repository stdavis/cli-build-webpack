import { describe, it } from 'intern!bdd';
import * as assert from 'intern/chai!assert';
import { getBasePath, hasExtension, isRelative, mergeUnique } from '../../../../src/plugins/util/main';

describe('plugins/util/main', () => {
	describe('getBasePath', () => {
		it('should strip the module name and return the parent path', () => {
			assert.strictEqual(getBasePath('/module'), '/');
			assert.strictEqual(getBasePath('/module.ts'), '/');
			assert.strictEqual(getBasePath('./parent/module'), './parent');
			assert.strictEqual(getBasePath('./parent/module.ts'), './parent');
			assert.strictEqual(getBasePath('/parent/module'), '/parent');
			assert.strictEqual(getBasePath('/parent/module.ts'), '/parent');
		});
	});

	describe('hasExtension', () => {
		it('should return false if there is no extension', () => {
			assert.isFalse(hasExtension('/module'));
			assert.isFalse(hasExtension('/module.'));
			assert.isFalse(hasExtension('/module.@@'));
		});

		it('should return true if there is an extension', () => {
			assert.isTrue(hasExtension('/module.ts'));
			assert.isTrue(hasExtension('/module.js'));
			assert.isTrue(hasExtension('/module.jsx'));
			assert.isTrue(hasExtension('/module.c'));
			assert.isTrue(hasExtension('/module.c2'));
			assert.isTrue(hasExtension('/module.C2cAx99'));
		});
	});

	describe('isRelative', () => {
		it('return true for relative paths', () => {
			assert.isTrue(isRelative('./path/to/module'));
		});

		it('should return false for absolute paths', () => {
			assert.isFalse(isRelative('path/to/module'));
			assert.isFalse(isRelative('@path/to/module'));
			assert.isFalse(isRelative('/path/to/module'));
		});
	});

	describe('mergeUnique', () => {
		it('should merge two arrays into a single containing the unique values in each', () => {
			const first = [
				'/path/to/first.json',
				'/path/to/second.json',
				'/path/to/fifth.json',
				'/path/to/sixth.json'
			];
			const second = [
				'/path/to/first.json',
				'/path/to/third.json',
				'/path/to/fourth.json',
				'/path/to/sixth.json',
				'/path/to/seventh.json'
			];
			assert.sameMembers(mergeUnique(first, second), [
				'/path/to/first.json',
				'/path/to/second.json',
				'/path/to/third.json',
				'/path/to/fourth.json',
				'/path/to/fifth.json',
				'/path/to/sixth.json',
				'/path/to/seventh.json'
			]);
		});
	});
});
