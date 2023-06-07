import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
	extensionsToTreatAsEsm: ['.ts'],
	verbose: true,
	preset: 'ts-jest/presets/default-esm',
	testEnvironment: 'node',
	transform: {
		'^.+\\.(ts|tsx)?$': ['ts-jest', { useESM: true }],
	},
	moduleFileExtensions: ['ts', 'js', 'json', 'node'],
	fakeTimers: {
		enableGlobally: true,
	},
}

export default config
