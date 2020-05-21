用于 drawio 嵌入模式

微调了一些样式，扩展了几个 message

## 个人 drawio 的部署与微调

我们可以直接 `git clone https://github.com/jgraph/drawio` 并部署 `src/main/webapp` 目录即可

如果部分内容需要微调，可加入 script，或者修改已有的 script 来实现调整，比如我们可以在 url 上新加入配置 `&retina=1`，表导出 2 倍图，而在源码中，我们需要将 `EditorUi.prototype.exportToCanvas` 的相应参数(第八个) 动态调整成 2 倍

我们在修改/新增原有 js 时，需留意，drawio 本身引入了 service-worker，可以对应做改动，其中 service-worker 通过 app.js 引用，不过其静态资源的 url 会有路径问题

#### 扩展新协议

我们可以修改 drawio，使其可以接受新的协议，通常如果你的新协议不涉及改动核心层，而是只是外围的 UI，那么这个很简单，比如我们扩展一个下载到本地的协议

自行扩展的协议名，比如 savelocal，在原有的协议处理过程时不识别，就直接被丢弃了，而被我们自己定义的流程接管

```js
window.addEventListener("message", function(e) {
  var data = e.data;
  var msg = {};
  try {
    msg = JSON.parse(data);
  } catch (error) {}
  // 扩展消息，保存到本地
  if (msg.action == "savelocal") {
    // do something
  }
});
```