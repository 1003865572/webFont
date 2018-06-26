## 2018-6-27
#
  1.js内存泄漏, 什么情况下回内存泄漏, 如何防止内存泄漏

## 2018-6-26
#
#### 十个问题
    1. flex： 后面的属性都代表着什么意义，都有哪些用法
        flex: (flex-grow, flex-shrink, flex-basis) | auto | none | initial | inherit
            **以下提到的 width 替换为 height  同样有效**
            flex-grow: 如果父级的宽度没有用完的情况下, 怎样分配剩下的空白区域
            flex-shrink: 如果子元素的宽度总和大于父级(需要收缩子元素), 怎样收缩当前的元素
            flex-basis: 元素的初始宽度, 如果为 auot 那么他的值为 width, 如果 为固定的值(%, em, rem, px ..), 那么 width 无效
            auto: 默认为 1 1 auto, 此时 width 是有效的
            none: 默认为 0 0 auto, 此时 width 是有效的
            initial:  0 1 auto, 此时 width 是有效的
            inherit: 继承父元素
            demo
                1. 子元素 width 总和 < 父元素 width, 需要扩张
                2. 子元素 width 总和 > 父元素 width, 需要收缩
                3. basic 顶替了 width
    2. chrome 开发者工具中输出的 JSON 变量，如何能不带格式的拷贝出来

    3. 变量 new 了之后都发生了什么，js 环境中一个对象是如何被创建的
        let obj = new Fn()
        new 创建一个崭新的空对象, 让 obj 的 this 指向 Fn, 并且不会 return 任何内容.
        同时 Fn 成为 obj 的构造函数 (obj.__proto__.constructor === Fn) === true
        之后 obj 的所有操作都会改变自己

        如果 不适用 new 会发生什么?

            Fn(), 的 this 指向window, Fn 中创建的属性则会成为全局变量.

        new 是一元操作符, new Fn(), 代表着执行Fn 并且把 Fn 的 this 指向 obj 并把执行的结果给 obj
    4. 如何判断一个 变量是 json 类型
        typeof instanceof 面对这样的需求是不能满足的
          var d = new Date();
          console.log(d instanceof Object) // true
          console.log(typeof d) // object
        所以方法只有一个, 找到对象的构造函数的 name 因为 JSON 是 Object 对象的实现,所以构造函数的 name 一定是 Object,
        let obj = {name: 'xinglong.shi', Sex: 'man'}
        console.log(obj.__proto__.constructor.name === 'Object') // true

    5. 什么是深拷贝,浅拷贝
      深拷贝: 完全创建新的内存空间, 把原有的对象下所有的节点( 包括嵌套的 )都拷贝到新的内存空间中
      浅拷贝: 创建新的内存空间, 但仅拷贝原对象的一层节点

        let obj = {
          name: 'obj',
          arr: [1,2,3]
        }

      浅拷贝
        对象拷贝一层, 不拷贝构造函数, 其实用 JSON.parse(JSON.stringify(obj)) 的方式即可实现钱拷贝.
        但是这样做是有缺陷的, 不能拷贝对象的函数, 原型链里的属性. 只是拷贝 JSON 还是够用的

        期望:
          let obj2 = shallowCopy(obj, {})
          obj2.arr === obj.arr // true
      深拷贝
        拷贝对象的每一层, 每一层都要创建新的内存空间
        期望:
          let obj2 = shallowCopy(obj, {})
          obj2.arr === obj.arr // false
    6. 实现一个深拷贝, 浅拷贝函数




## 2018-6-24
#

> bootstrap 手记

### 基本概念
> 一套样式 + 布局 + jq 插件的web框架

### 常用标签

> 行内文本样式

标签| 描述
-|-
mark| 提醒
del| 删除,中划线
strong,b|加粗
i,em|斜体
ins,u| 底部下划线

### 常用样式
#### 布局相关
类名|效果
-|-
h1 -> h6| 在不适用 H1 系列标签的情况下展示 h1 的效果
text-center, text-left, text-right|文本的行内居中,左右对其
text-lowercase, text-uppercase, text-capitalize|作用依次为: 单词全小写,单词全大写,首字母大写
#### 表格相关
类名|效果
-|-
table|初始化 boorstrap 表格样式, 默认宽100%
table-bordered| 让表格中的所有单元格都加边框
table-striped|table隔行换色
table-hover|鼠标悬浮换色

#### 表单相关
> form 组件中的每个元素都一定要添加 **label** 标签

类名|效果
-|-
form|表单的最外层
form-inline|让 form-group 都绘制为行内样式
form-group|标记一行表单元素, 比如 左边是标题,右边是输入框
form-control|一行表单元素内可输入的控件(input, radio, select ...)
input-lg|让表单元素稍大一些
input-sm|让表单元素稍小一些
sr-only|隐藏掉label
has-success, has-warning, has-error| 表单验证提示的样式

#### 按钮
> 所有的标签都可用样式来渲染成按钮

类名|效果
-|-
btn|初始化按钮样式
btn-default|带有交互效果的默认样式
btn-primart|无特殊意义的最常用的按钮样式
btn-success|成功
btn-warning|警告
btn-denger|失败
btn-link|链接样式
btn-lg|稍大的按钮
btn-sm|稍小的按钮
active| 默认绘制按下的状态
[disabled]|属性: btn-* 类遇到此属性就绘制为 不可点击的样式

#### 图片样式

类名|效果
-|-
img-thumbnail| 带圆角变宽
img-rounded|圆角
img-circle|圆形,椭圆


#### 栅格布局
> 用法是 col-[终端代码(lg, md,)]

类名|效果
-|-
col-lg|超大屏
lg|超大屏
md|正常屏幕
sm|平板
xs|手机
col-[屏宽代码]-offset-[栅格数]|让元素左边偏移多少栅格
