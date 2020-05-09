(function () {
  /**
   * UI 方法
   */
  var loadingDOM = null;
  var spinner = null;
  var loadingStyle =
    "z-index:3000;position:fixed;left:0;top:0;height:100%;width:100%;background:rgba(255,255,255,0.3);display:flex;flex-flow:column;justify-content:center;align-items:center;user-select:none;color:rgb(0,0,0,0.8)";
  var hideStyle = "display:none;";
  var spinnerBaseStyle =
    "transition: all 100000s linear; height: 25px; width: 25px; background:url(https://static.yximgs.com/udata/pkg/IS-DOCS/spinner.png); background-size: contain;";
  var spinnerAdd = spinnerBaseStyle + "transform: rotate(14000000deg);";

  if (typeof window !== "undefined") {
    // 说明是在 浏览器中
    loadingDOM = document.createElement("div");
    spinner = document.createElement("div");
    text = document.createElement("div");
    text.innerHTML = "";
    loadingDOM.appendChild(spinner);
    loadingDOM.appendChild(text);
    spinner.setAttribute("style", spinnerBaseStyle);
    loadingDOM.setAttribute("style", hideStyle);
    document.documentElement.appendChild(loadingDOM);
  }

  function showLoading(msg) {
    if (!loadingDOM) return;
    loadingDOM.setAttribute("style", loadingStyle);
    if (msg) text.textContent = msg;
    else text.innerHTML = "";
    setTimeout(() => {
      if (spinner.getAttribute("style") === spinnerBaseStyle) {
        spinner.setAttribute("style", spinnerAdd);
      } else {
        spinner.setAttribute("style", spinnerBaseStyle);
      }
    }, 10);
  }

  function hideLoading() {
    if (!loadingDOM) return;
    loadingDOM.setAttribute("style", hideStyle);
    setTimeout(() => {
      spinner.setAttribute("style", spinnerBaseStyle);
    }, 10);
  }

  // 确认询问
  var confirmDOM = null;
  var confirmStyle =
    "z-index:3002;position:fixed;left:0;top:0;height:100%;width:100%;background:rgba(0,0,0,0.2);display:flex;flex-flow:column;justify-content:center;align-items:center;color:rgb(0,0,0,0.8); font-size: 14px" +
    "";
  var confirmContentDOM = null;
  var confirmContentStyle =
    "width: 450px; max-height: 600px; background-color:white; border:1px solid rgb(0,0,0,0.1); display: flex;flex-flow: column ;padding: 20px; border-radius:10px";
  var btnSuitDOM = null;
  var textDOM = null;
  var textStyle = "padding-bottom:10px;";
  var yesDOM = null;
  var noDOM = null;
  var btnSuitStyle = "display:flex; justify-content: flex-end; cursor: pointer";
  var baseBtnStyle =
    "padding: 0 24px;height: 32px;line-height: 32px;font-size: 14px !important;font-weight: 500; border-radius: 5px; margin-left: 20px; cursor:pointer;";
  var yesStyle = baseBtnStyle + "background-color: #3371ff; color: white; ";
  var noStyle =
    baseBtnStyle + " background-color: rgb(51,113,255,0.06); color: #3371ff;";
  var confirmHideStyle = "display:none;";
  var yesCallback = function () {};
  var noCallback = function () {};

  function initConfirmDOM() {
    if (!confirmDOM) {
      confirmDOM = document.createElement("div");
      confirmDOM.setAttribute("style", confirmStyle);
      confirmContentDOM = document.createElement("div");
      confirmContentDOM.setAttribute("style", confirmContentStyle);
      btnSuitDOM = document.createElement("div");
      yesDOM = document.createElement("div");
      noDOM = document.createElement("div");
      yesDOM.setAttribute("style", yesStyle);
      noDOM.setAttribute("style", noStyle);
      btnSuitDOM.appendChild(yesDOM);
      btnSuitDOM.appendChild(noDOM);
      btnSuitDOM.setAttribute("style", btnSuitStyle);
      textDOM = document.createElement("div");
      textDOM.setAttribute("style", textStyle);
      confirmContentDOM.appendChild(textDOM);
      confirmContentDOM.appendChild(btnSuitDOM);
      confirmDOM.appendChild(confirmContentDOM);
      document.documentElement.appendChild(confirmDOM);
      yesDOM.onclick = function () {
        var args = arguments;
        yesCallback(args);
        confirmDOM.setAttribute("style", confirmHideStyle);
      };
      noDOM.onclick = function () {
        var args = arguments;
        noCallback(args);
        confirmDOM.setAttribute("style", confirmHideStyle);
      };
    }
  }
  function myconfirm(params) {
    if (!params) params = {};
    initConfirmDOM();
    yesDOM.innerHTML = params.confirmBtnText || "确认";
    noDOM.innerHTML = params.refuseBtnText || "取消";
    textDOM.innerHTML = params.text || "是否确认";
    yesCallback = function () {};
    noCallback = function () {};
    if (params.onConfirm) yesCallback = params.onConfirm;
    if (params.onRefuse) noCallback = params.onRefuse;
    confirmDOM.setAttribute("style", confirmStyle);
  }

  window.showConfirm = myconfirm;

  /**
   * 保存到本地
   */
  var link = document.createElement("a");
  link.href = "";
  function saveLocal(content) {
    var blob = new Blob([content || ""]);
    var url = URL.createObjectURL(blob);
    link.href = url;
    link.download =
      "流程图" +
      new Date(Date.now() + 28800000).toISOString().replace(/T/, ' ').replace(/\..+/, '').replace(/ /g, '').replace(/:/g, '').replace(/-/g, '').slice(4) +
      "-复制文字粘贴到流程图编辑界面" +
      ".txt";
    link.click();
  }

  window.saveLocal = saveLocal;

  /**
   * 发送消息基础方法
   */
  function sendMsg(obj) {
    window.parent.postMessage(JSON.stringify(obj), "*");
  }

  function addButton(saveFn, exitFn) {
    setTimeout(() => {
      var save = document.createElement("div");
      save.innerHTML = "保存";
      var exit = document.createElement("div");
      exit.innerHTML = "退出";
      save.onclick = saveFn;
      exit.onclick = exitFn;
      var baseStyle = "position:fixed; top:3px;";
      save.setAttribute(
        "style",
        yesStyle + baseStyle + "right: 100px; z-index:2999;"
      );
      exit.setAttribute(
        "style",
        noStyle +
          baseStyle +
          "right: 10px; background-color: rgb(220,230,240);z-index:3001;"
      );

      document.body.appendChild(exit);
      document.body.appendChild(save);
    }, 10);
  }


  /**
   * 发送消息基础方法
   */
  function sendMsg(obj) {
      window.parent.postMessage(JSON.stringify(obj), "*");
  }
  function inject() {
    window.addEventListener("message", function (e) {
      var data = e.data;
      var msg = {};
      try {
        msg = JSON.parse(data);
      } catch (error) {}
      if (msg.action == "loading") {
        var show = msg.show;
        var message = msg.message;
        var enabled = msg.enabled;
        if (!show) {
          hideLoading();
        } else {
          showLoading(message || "");
        }
      }
      // 扩展消息，保存到本地
      if (msg.action == "savelocal") {
          showConfirm({
            text:
              "网络异常，请先保存到本地，稍后重试",
            onConfirm() {
              saveLocal(msg.content);
              hideLoading();
            },
            onRefuse() {
              hideLoading();
            },
            refuseBtnText: '取消',
            confirmBtnText: '保存到本地'
          });
        }
    });
    function handleClickSave() {
      var dom = document.querySelector('[title="保存 (Cmd+S)"]') || document.querySelector('[title="save"]')
      if (dom) dom.click()
      else sendMsg({ event: "save" });
    }
    function handleClickExit() {

        var dom = document.querySelector('[title="退出"]') || document.querySelector('[title="exit"]')
        dom && dom.click()       
    }
    addButton(handleClickSave, handleClickExit);

    // 增加监听
    document.addEventListener('paste', (evt) => {
      var provider = (evt.dataTransfer != null) ? evt.dataTransfer : evt.clipboardData;
      // console.log(provider)
      // console.log('types',provider.types)
      // console.log('--------text', provider.getData('Text'))
      // console.log('--------html', provider.getData('text/html'))
      // console.log('--------plain', provider.getData('text/plain'))
      var html = ''
      try {
        html = provider.getData('text/html');
      } catch (error) {}
      if (html.indexOf('<img') !== -1) {
        evt.stopPropagation()
        myconfirm({
          text: '粘贴的网络图片可能最终无法保存成功，建议先将图片下载到本地，再推拽到编辑区'
        })
      }
    }, true)
  }

  window.inject = inject;
  window.showLoading = showLoading;
})();
