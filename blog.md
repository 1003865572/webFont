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
