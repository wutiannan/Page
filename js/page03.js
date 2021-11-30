function Page(selector) {
  function $(selector) {
    let el = document.querySelectorAll(selector);
    if (el.length == 1) return el[0];
    if (el.length > 1) return el;
    return false;
  }

  let _this = this;
  var newsContent = $(`${selector} .news-content`);
  var pageNumContent = $(selector + " .page-num-content");
  var lastPage = $(selector + " .last-page");
  var nextPage = $(selector + " .next-page");

  window.location.href = "#" + index;

  //渲染四条新闻
  this.showNews = function (index) {
    let html = "";
    pageNews = news.slice(index * 4, (index + 1) * 4);
    console.log(pageNews);
    for (let i = 0; i < pageNews.length; i++) {
      html += `<li class="news-item">
              <a href="" class="title"> ${pageNews[i].title} </a>
              <span>${pageNews[i].updatetime}</span>
            </li>`;
    }
    console.log(newsContent);
    newsContent.innerHTML = html;
  };

  //根据新闻数量渲染分页器个数
  this.showPage = function (index) {
    let html = "";
    pageNum = Math.ceil(news.length / 4);
  
    for (let i = 0; i < pageNum; i++) {
      html += `<a class="page-item" href="">${i + 1}</a>`;
    }
    pageNumContent.innerHTML = html;
  };

  //高亮当前页码序号
  this.highlightPage = function (index) {
    //先清除所有的
    for (let i = 0; i < pageItem.length; i++) {
      pageItem[i].classList.remove("active");
    }
    pageItem[index].classList.add("active");
  };

  function runLastPage(index) {
    index--;
    if (index < 0) index = 0;
    return index;
  }
  function runNextPage(index) {
    index++;
    if (index >= pageItem.length) index = pageItem.length - 1;
    return index;
  }

  //page序号点击事件
  function onPageClick() {
    for (let i = 0; i < pageItem.length; i++) {
      pageItem[i].addEventListener("click", function () {
        event.preventDefault();
        index = i;
        _this.highlightPage(index);
        _this.showNews(index);
        window.location.href = "#" + index;
      });
    }
  }

  //上一页和下一页的点击事件
  lastPage.addEventListener("click", function () {
    event.preventDefault();
    index = runLastPage(index);
    _this.highlightPage(index);
    _this.showNews(index);
    window.location.href = "#" + index;
  });

  nextPage.addEventListener("click", function () {
    event.preventDefault();
    index = runNextPage(index);
    _this.highlightPage(index);
    _this.showNews(index);
    window.location.href = "#" + index;
  });

  this.showPage();
  var pageItem = $(selector + " .page-item");
  this.highlightPage(index);
  onPageClick();
  this.showNews(index);
}
