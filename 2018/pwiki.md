## piwik api
---


#### javascript 用户行为跟踪
[官方文档](https://developer.matomo.org/2.x/guides/tracking-javascript-guide)，
[AllAPI](https://developer.matomo.org/2.x/api-reference/tracking-javascript)
> 获取 Tracking 的基础js代码

```
 1.登陆后点击设置
 2.创建你的 web 应用（这里不描述具体怎么创建）
 3.点击左侧菜单 Websites 下的 Tracking Code
 4.选择你的应用
 5. JavaScript Tracking Code 下就是你需要的代码，把它放在 html 页面的 最下面即可

 例：
 <!-- Piwik -->
 <script type="text/javascript">
   var _paq = _paq || [];
   // tracker methods like "setCustomDimension" should be called before "trackPageView"
   _paq.push(['trackPageView']);
   _paq.push(['enableLinkTracking']);
   (function() {
     var u="//172.16.96.125/";
     _paq.push(['setTrackerUrl', u+'piwik.php']);
     _paq.push(['setSiteId', '1']);
     var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
     g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
   })();
 </script>
 <!-- End Piwik Code -->

```

> 此时就可以调用 piwik 的全局变量_paq

```
// 格式
_paq.push([ 'API_method_name', parameter_list ]);
```
>  例1：**获取当前游客 id**

```
var visitor_id;
_paq.push([ function() { visitor_id = this.getVisitorId(); }]);
```
> 例2：**设置和获取自定义变量**

```
_paq.push(['setCustomVariable','1','VisitorType','Member']);
_paq.push([ function() { var customVariable = this.getCustomVariable(1); }]);
```

> 例3：**自定义页面标题**

```
_paq.push(['setDocumentTitle', '自定义页面标题']);
_paq.push(['trackPageView']);
```

> 例4：**Events 用户行为跟踪**

```
onclick = function () {
  _paq.push(['trackEvent', 'Menu', 'Freedom'])
  // _paq.push(['trackEvent', category, action, [name], [value])
}
```

> 例5：**测量用户在某个页面中停留的时间**
```
// 准确测量用户在页面中停留的时间，默认每15秒发一次心跳
// _paq.push(['enableHeartBeatTimer']);
_paq.push(['enableHeartBeatTimer', 30]);  // 每30秒发一次心跳
```

> 例6：**搜索关键字跟踪**  (需要三个字段： 关键词， 搜索类型，搜索结果数量。官方强烈建议使用 “搜索结果数量”字段， 因为piwik会专门报告无结果关键字)

```
_paq.push(['trackSiteSearch',
    // 关键字
    "兴业银行",
    // 搜索类型
    "机构名称",
    // 搜索结果的数量
    0
]);
```

> 例7：**自定义变量** （统计用户的特殊行为，比如 设置每次访问的访问类型（首次访问，参与访问，客户访问），然后比较访问类型，访问类型，转化率和收入之间的统计信息。）

> setCustomVariable(index, name, value, scope = "visit") scope 字段的值可选为两种  scope = 'visit' | 'page'

> 当scope =“visit”时，自定义变量的名称和值将被存储在数据库的访问中。因此，您可以为每次访问最多存储5个范围“访问”的自定义变量。

> **注意在调用 setCustomVariable 时 index = 1，那么 index 对应的 自定义变量是不可随便改动的，如果之前用的是 Gender 之后又被换成 Age 了。那么之前所有的 Gender 的数据都会被删掉**

```
_paq.push(['setCustomVariable',
    // 只能是1到5之间的数字
    1,
    // 是你自定义的数据类型
    "Gender",
    // Value, for example: "Male", "Female" or "new", "engaged", "customer"
    "Male",
    // Scope of the custom variable, "visit" means the custom variable applies to the current visit
    "visit"
]);
// 必须调用一次 trackPageView 才会提交到 piwik 服务器
_paq.push(['trackPageView']);

// 删除自定义变量
// deleteCustomVariable(index, scope)
_paq.push(['deleteCustomVariable', 1, "visit"]);
_paq.push(['trackPageView']);

```

> 例8：**统计 userId**
```
_paq.push(['setUserId', 'userId']);
_paq.push(['trackPageView']);
```

> 例9： 点击 A 标签

```
<a href='#' class='piwik_download'>piwik 标记为下载</a>
<a href='#' class='piwik_ignore'>piwik 忽略点击行为</a>
<a href='#' class='no-tracking'>piwik 忽略点击行为</a>

```


---
#### 功能解释
> [goals：目标](https://matomo.org/docs/tracking-goals-web-analytics/)

```
  目标：即为我们想要让用户在网站上做什么，支付，下单，观看，点击广告等
  例如：
    联系我们 - 跟踪用户与您联系的
    使用次数 - 看看有多少人对此web产品感兴趣

```
> [Visitors: 游客]()


---


#### npm piwik 插件
> [piwik](https://www.npmjs.com/package/piwik) ,  [react-piwik](https://www.npmjs.com/package/react-piwik)
---
#### 插件开发
> 申请 token_auth

> 调用域名 + 参数
 http://piwik.chenwg.com/index.php?module=API&method=Actions.getPageTitles&idSite=4&period=day&date=2012-11-22&format=JSON&token_auth=*********************   
```
http://piwik.chenwg.com/index.php?module=API
&method=Actions.getPageTitles         method表示的是调用哪个函数; (Api 地址)[https://demo.matomo.org/index.php?module=API&action=listAllAPI&idSite=3&period=day&date=yesterday]
&idSite=4&                           可以设置idSite=1，也可以设置idSite=1,2,3,4,…… ，这样可以显示id为1，2，3，4等网站的相关信息的，也可以设置idSite=all，这样就显示piwik所监控的所有网站。
period=day&date=2012-11-22&          日期描述
format=JSON                          返回的数据类型
&token_auth=*********************    自己申请的 token_auth
```

---

#### piwik 跟踪

参数列表
> 必须的参数

```
idsite 需要监控的网站 id
rec     必传 &rec=1
```

>推荐的参数

```

action_name 正在跟踪此操作的标题：可以用 / 来分出子级。例如: bond/info/offetrInfo
url         当前操作的完整路径
_id         唯一的，能够标识出那一个用户的 id (userId)
rand        每次提交前生成一个随机数，避免浏览器缓存
apiv        api 版本 = 1，目前只能 = 1

```

> 可选的

```
urlref      来源
_cvar       访问范围的自定义变量，跟踪 api 的访问次数等等
_idvc       （例：直播软件的虚假访问量）此变量将重写访客的访问次数，它将改变：Visitors -> Engagement -> Visits by Visit Number
_viewts     此访问者上次访问的时间戳，它将改变 Visitors > Engagement > Visits by days since last visit
_idts       （例：用户注册后记录一次）此访问者首次访问的UNIX时间戳，可以设置用户首次访问的日期，或者他创建账户的日期。它将改变 Goals > Days to Conversion report
_rcn        （例：从活动页进入首页的次数）自己的网站域名 + piwik提供的参数，来统计此 url 的访问次数
_rck        （例：从不同渠道进入首页的用户量，用户首次进来才会计数）自己的网站域名 + piwik提供的参数，来统计此 url 的访问次数
res         
```
