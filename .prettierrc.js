module.export = {
  singleQuote: true, // js 单引号
  printWidth: 100, // 超过 100 折行,
  trailingComma: 'all', // 最后加一个逗号 none(默)|all
  // 下面是默认值，通常不设置，如使用 prettier 插件且规则与 eslint 冲突，可显示设置，否则无需设置
  tabWidth: 2, // 默认2
  semi: true, // 结尾分号，默认 true
  arrowParens: 'avoid', // 单参箭头函数是否加括号 'avoid(默)|always'
  bracketSpacing: true, // 花括号两边是否加入额外空格，默认 true
  jsxBracketSameLine: false, // jsx 花括号两边额外空格，默认 false
}