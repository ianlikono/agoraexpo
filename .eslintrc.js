
module.exports = {
	extends: ['airbnb', 'prettier', 'prettier/react'],
    parser: 'babel-eslint',
    "parserOptions": {
        "ecmaVersion": 9,
        "ecmaFeatures": {
          "jsx": true
        },
        "sourceType": "module"
      },
	env: {
        jest: true,
        "browser": true,
        "es6": true,
        "commonjs": true

	},
	rules: {
    'no-use-before-define': 'off',
    'jsx-a11y/anchor-is-valid': 0,
		'react/jsx-filename-extension': [
			1,
			{
				extensions: ['.js', '.jsx']
			}
		],
		'prettier/prettier': [
			'error',
			{
				trailingComma: 'es5',
				singleQuote: true,
				printWidth: 100
			}
		],
		'react/prop-types': 'off',
		'comma-dangle': 'off'
	},
	plugins: ['prettier'],
	globals: {
		fetch: false
	}
};
