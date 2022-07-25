module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  /* 指定如何解析语法。*/
  parser: 'vue-eslint-parser',
  // recommended 用来启用推荐的规则
  // 将 prettier 加到 extends 数组的最后，出现冲突时会优先prettier的规则，就不会出现兼容性问题
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  // 配置解析器 https://eslint.bootcss.com/docs/user-guide/configuring
  // https://eslint.vuejs.org/user-guide/#usage
  parserOptions: {
    ecmaVersion: 12, // 指定想要使用的 ECMAScript 版本
    parser: '@typescript-eslint/parser', // 指定解析器
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // 启用 JSX
    },
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    // 取消类型检查提示
    '@typescript-eslint/ban-ts-ignore': 'off',
    // 禁止未使用过的变量
    '@typescript-eslint/no-unused-vars': 'off',
    // 在函数和类方法上需要显式的返回类型
    '@typescript-eslint/explicit-function-return-type': 'off',
    // 禁止使用any类型
    '@typescript-eslint/no-explicit-any': 'off',
    // 除导入语句外，禁止使用require语句
    '@typescript-eslint/no-var-requires': 'off',
    // 禁止使用空函数
    '@typescript-eslint/no-empty-function': 'off',
    // typescript中的interface以及type不存在变量提升的问题，因此针对它们特别的加了两行规则，保证eslint见到interface或者type在声明前使用时不会报错
    '@typescript-eslint/no-use-before-define': ['error', { ignoreTypeReferences: true }],
    // 禁止使用@ts-注解
    '@typescript-eslint/ban-ts-comment': ['warn', {
      'ts-expect-error': 'allow-with-description',
      'ts-ignore': 'allow-with-description',
      'ts-nocheck': 'allow-with-description',
      'ts-check':  'allow-with-description'
    }],
    // 禁用特定类型
    '@typescript-eslint/ban-types': 'off',
    // 禁止使用!后缀运算符进行非null断言
    '@typescript-eslint/no-non-null-assertion': 'off',
    // 在导出的函数和类的公共类方法上需要显式的返回值和参数类型
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 导入其他文件时，是否要求写后缀
    'import/extensions': 'off',
    // 禁用var
    'no-var': 'error',
    'prettier/prettier': 'error',
    // 禁止出现console
    'no-console': 'warn',
    // 禁止出现空语句块
    'no-empty': 'warn',
    // 禁止不必要的括号
    'no-extra-parens': 'off',
    // 强制所有控制语句使用一致的括号风格
    'curly': 'warn',
    // 要求 switch 语句中有 default 分支
    'default-case': 'warn',
    // 强制尽可能地使用点号
    'dot-notation': 'warn',
    // 要求使用 === 和 !==
    'eqeqeq': 'warn',
    // 禁止 if 语句中 return 语句之后有 else 块
    'no-else-return': 'warn',
    // 禁止出现空函数
    'no-empty-function': 'warn',
    // 禁用不必要的嵌套块
    'no-lone-blocks': 'warn',
    // 禁止使用多个空格
    'no-multi-spaces': 'warn',
    // 禁止在 return 语句中使用赋值语句
    'no-return-assign': 'warn',
    // 禁用不必要的 return await
    'no-return-await': 'warn',
    // 禁止自身比较
    'no-self-compare': 'warn',
    // 禁止多余的 return 语句
    'no-useless-return': 'warn',
    // 禁止变量声明覆盖外层作用域的变量
    'no-shadow': 'off',
    // 强制数组方括号中使用一致的空格
    'array-bracket-spacing': 'warn',
    // 强制在代码块中使用一致的大括号风格
    'brace-style': 'warn',
    // 强制使用驼峰拼写法命名约定
    'camelcase': 'warn',
    // 强制使用一致的缩进
    'indent': 'off',
    // 强制在 JSX 属性中一致地使用双引号或单引号
    'jsx-quotes': 'warn',
    // 强制可嵌套的块的最大深度4
    'max-depth':  ["warn", { "max": 4 }],
    // 强制文件最大行数，不建议写超大文件
    "max-lines": ["warn", { "max": 1200 }],
    // 强制函数最大代码行数
    'max-lines-per-function': ['warn', { max: 100 }],
    // 强制函数块最多允许的的语句数量
    'max-statements': ['warn', 100],
    // 强制回调函数最大嵌套深度
    'max-nested-callbacks': ['warn', 3],
    // 强制函数定义中最多允许的参数数量
    'max-params': ['warn', 5],
    // 强制每一行中所允许的最大语句数量
    'max-statements-per-line': ['warn', { max: 1 }],
    // 要求方法链中每个调用都有一个换行符。ignoreChainWithDepth允许在同一行成链的深度
    'newline-per-chained-call': ['warn', { ignoreChainWithDepth: 3 }],
    // 禁止 if 作为唯一的语句出现在 else 语句中
    'no-lonely-if': 'warn',
    // 禁止空格和 tab 的混合缩进
    'no-mixed-spaces-and-tabs': 'warn',
    // 禁止出现多行空行
    'no-multiple-empty-lines': 'warn',
    // 禁止出现;
    'semi': ['warn', 'never'],
    // 强制在块之前使用一致的空格
    'space-before-blocks': 'warn',
    // 强制在 function的左括号之前使用一致的空格
    'space-before-function-paren': ['warn', 'never'],
    // 强制在圆括号内使用一致的空格
    'space-in-parens': 'warn',
    // 要求操作符周围有空格
    'space-infix-ops': 'warn',
    // 强制在一元操作符前后使用一致的空格
    'space-unary-ops': 'warn',
    // 强制在注释中 // 或 /* 使用一致的空格
    "spaced-comment": "warn",
    // 强制在 switch 的冒号左右有空格
    'switch-colon-spacing': 'warn',
    // 强制箭头函数的箭头前后使用一致的空格
    'arrow-spacing': 'warn',
    // 建议使用const
    'prefer-const': 'warn',
    // 建议使用剩余参数代替 arguments 
    'prefer-rest-params': 'warn',
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
}
