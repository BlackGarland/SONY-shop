# i5scroll

## 基本使用

```html
<script src="./js/jquery.min.js"></script>
<script src="./js/i5scroll.min.js"></script>
<script>
// 选择需要运动的元素，直接调用 i5Scroll() 即可
$(".scroll").i5Scroll();
</script>
```

## 一个参数

```javascript
$(".scroll").i5Scroll({
    mode: 'CSS', // 默认通过 CSS 的方式移动
    cssSpeed: 5, // 时间默认 5s
});
```

```javascript
$(".scroll").i5Scroll({
    mode: 'JS',  // 也可以通过 JS 的方式移动
    jsSpeed: 'normal', // 默认 normal
});
```

## 我的特点

支持隐藏元素滚动

## 效果预览

[点我预览](https://zhihur.com/resource/demos/demo06/index.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <ul>
        <li>hello</li>
    </ul>
    <script src="./js/jquery.min.js"></script>
    <script src="./js/i5scroll.js"></script>
    <script>
    $('ul').i5Scroll({
        cssSpeed: 1
    });
    </script>
</body>
</html>
```