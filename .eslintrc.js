module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: [
		'airbnb',
		'plugin:@typescript-eslint/recommended',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2018,
	},
	rules: {
		'func-names': 'off',
		'linebreak-style': 'off',
		indent: [
			'error',
			'tab',
		],
		'jsx-a11y/control-has-associated-label': 'off',
		'max-len': 'off',
		'no-console': 'off',
		'no-plusplus': 'off',
		'no-param-reassign': 'off',
		'no-restricted-syntax': [
			'error',
			'WithStatement',
		],
		'no-shadow': 'off',
		'no-tabs': 'off',
		'prefer-arrow-callback': 'off',
		'react/jsx-filename-extension': [
			'error',
			{
				extensions: [
					'.js',
					'.jsx',
				],
			},
		],
		'react/jsx-indent': [
			'error',
			'tab',
		],
		'react/jsx-indent-props': [
			'error',
			'tab',
		],
		'react/prop-types': 'off',
	},
};
