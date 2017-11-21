# MTB-FLEXIBLE

模仿手淘rem移动端自适应方案

根据m.taobao.com的移动端rem自适应方案， 将页面宽度分为10等分， `1rem = html.style.fontSize = pageWidth / 10`

## USAGE:

在html的`head`标签， 添加script引用

```html
<script src="//ss.yidejia.com/lib/flexible/{version}/flexible.js"></script>
```

然后页面会自动添加移动端的meta标签,声明`viewport`属性(默认开启高清方案， 无需手动声明viewport)

并且自动设置html的一些必要属性,例如`data-dpr`,`font-size`等等

例如：
```html
<html lang="en" data-dpr="1" style="font-size: 54px;">
```

脚本运行成功后， 会产生对象： `window.lib.flexible`

自行查看window.lib.flexible中提供的属性和方法


## PS:

脚本默认开启高清dpr方案， 例如在iphone6高清屏上， `dpr`会设置为2， `initial-scale`, `minimum-scale`, `maximum-scale`都会变成0.5， 那么对应页宽是`750px`, 这种情况下无法使用大部分移动端UI框架（px布局），
如果需要兼容使用UI框架，需要添加以下标签到`head`标签里面

```html
 <meta name="flexible" content="initial-dpr=1, maximum-dpr=1">
```

或者，强制声明`viewport`

```html
<meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-sacle=1, user-scalable=no">
```


样式处理：
- `less` 和 `scss` 可以自己编写function进行换算， 也可以通过`postcss`后续处理

- `css` 自己通过编辑器插件工具换算活着通过 `postcss` 处理

- postcss插件： [https://github.com/cuth/postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)

## 开发说明：

### npm scripts

- npm run build

  开发构建， 自动监听变化

- npm run qn

  部署cdn
