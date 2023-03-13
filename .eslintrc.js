module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 关闭名称校验
    'vue/multi-word-component-names': "off",
    "@typescript-eslint/no-namespace": "off",
    'vue/no-template-shadow': 'off',
    // 'no-param-reassign': [
    //   2,
    //   {
    //     "props": true,
    //     "ignorePropertyModificationsFor": [
    //       "e", // for e.returnvalue
    //       "ctx", // for Koa routing
    //       "req", // for Express requests
    //       "request", // for Express requests
    //       "res", // for Express responses
    //       "response", // for Express responses
    //       "state", // for vuex state
    //       "item",
    //     ]
    //   }
    // ],
    "no-param-reassign": [
      "off",
      {
        "props": true,
        "ignorePropertyModificationsFor": [
          "res", // for Express responses
          "item", // for Express responses
          "state" // for vuex state 解决assignment to property of function parameter ‘state‘
        ]
      }
    ],
    'class-methods-use-this': 'off',
    "no-shadow": "off",
  },
};
