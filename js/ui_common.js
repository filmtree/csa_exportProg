// 전역변수
var isMobile;

// 실행
$(document).ready(function () {
  commonUI.init();

  /* header-전체메뉴:배너 swiper */
  commonUI.slider(".banner-slider-wrap", {
    loop: true,
    speed: 700,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    observeParents: true,
  }); // slidesPerView가 있는 경우 매개변수로 넘겨줘야함. 없는 경우 생략가능.
});
//End: $(document).ready -----------------------------*/

const commonUI = {
  init() {
    this.deviceWidthCheck();
    this.deviceCheck();

    this.gnav();
    this.topSearch.init();
    this.sideNav.init();
    this.accordion();

    this.compJumpList.init();
    this.allMenuList();
    this.goToTop();
    this.pageDescToggle();
    this.tableScrollMarking();
    this.useDatepicker();
		this.modalScrollBarCustom();
  },
  deviceCheck: function () {
    var UserAgent = navigator.userAgent;
    if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) {
      isMobile = true;
      document.querySelector("html").classList.add("mobile");
    } else {
      isMobile = false;
      document.querySelector("html").classList.add("pc");
    }
  },
  deviceWidthCheck: function () {
    const $html = document.querySelector("html");
    widthCheck();

    let timer = null;
    window.addEventListener("resize", () => {
      clearTimeout(timer);
      timer = setTimeout(function () {
        widthCheck();
      }, 300);
    });

    function widthCheck() {
      const winWidth = document.querySelector("html").offsetWidth;
      if (winWidth > 1080) {
        $html.classList.remove("w-mobile");
        $html.classList.add("w-pc");
      } else {
        $html.classList.remove("w-pc");
        $html.classList.add("w-mobile");
      }
    }
  },
  /* header-GNB */
  gnav: function () {
    var itemNo;
    $("#gnav > ul > li > a").click(function (e) {
      e.preventDefault();
      $(this).parent().addClass("active").siblings().removeClass("active");
      $(".header-nav").addClass("active");

      if (itemNo === $("#gnav > ul > li > a").index(this)) {
        $(this).parents(".header-nav").removeClass("active");
        $(this).parent().removeClass("active");
        itemNo = "";
      } else itemNo = $("#gnav > ul > li > a").index(this);
    });

    $("#gnav > ul > li > ul > li > a").click(function (e) {
      $(this).parent().parent().parent().addClass("active").siblings().removeClass("active");
    });
    $(".header-nav").on("mouseleave", function () {
      $(this).removeClass("active");
      $("#gnav ul > li").removeClass("active");
    });
  },
  /* header-통합검색 */
  topSearch: {
    init: function () {
      this._initElements();
      this._initEvents();
    },
    _initElements: function () {
      this.form = document.querySelector(".header-searchbox");
      this.btnOpen = document.querySelector(".header-search-open");
      this.btnClose = document.querySelector(".header-searchbox-close");
    },
    _initEvents: function () {
      if (this.btnOpen) {
        this.btnOpen.addEventListener("click", () => {
          this.open();
        });
      }
      if (this.btnClose) {
        this.btnClose.addEventListener("click", () => {
          this.close();
        });
      }
    },
    open: function () {
      this.form.classList.add("active");
    },
    close: function () {
      this.form.classList.remove("active");
    },
  },
  /* 서브-location */
  sideNav: {
    init: function () {
      this._initElements();
      this._initEvents();
    },
    _initElements: function () {
      this.sideNav = document.querySelector(".breadcrumb-nav");
      this.btn = document.querySelectorAll(".breadcrumb-nav .breadcrumb-trigger");
      this.activeName = "active";
    },
    _initEvents: function () {
      if (!this.sideNav) return;

      [...this.btn].forEach((item) => {
        item.addEventListener("click", (e) => {
          item.parentElement.classList.toggle("active");
        });
        item.parentElement.addEventListener("mouseleave", (e) => {
          item.parentElement.classList.remove("active");
        });
      });
    },
  },
  /* 공용 swiper - auto-play navigation이 있는 */
  slider: function (target, opt) {
    const sliderTarget = document.querySelector(target);
    const sliderName = target;
    const sliderOption = opt;

    const siderFun = {
      _init: function () {
        if (!sliderTarget) return;
        this._initElements();
        this._initEvents();
      },
      _initElements: function () {
        this.sliderTarget = `${sliderName} .swiper-container`;

        this.sliderBtnStop = sliderTarget.querySelector(".btn-stop");
        this.sliderBtnStart = sliderTarget.querySelector(".btn-start");
        this.sliderBtnPrev = sliderTarget.querySelector(".btn-prev");
        this.sliderBtnNext = sliderTarget.querySelector(".btn-next");
      },
      _initEvents: function () {
        this.swiperSlider = new Swiper(this.sliderTarget, sliderOption);

        //포커스
        let perView = this.swiperSlider.params.slidesPerView;
        let lastItem = perView;

        //포커스될 아이템
        newSliderChanage();

        this.swiperSlider.on("transitionStart", () => {
          if (perView != this.swiperSlider.params.slidesPerView) {
            perView = this.swiperSlider.params.slidesPerView;
          }
          newSliderChanage();
        });

        function newSliderChanage() {
          let slides = sliderTarget.querySelectorAll(".swiper-slide");
          let activeSlide = sliderTarget.querySelector(".swiper-slide-active");

          slides.forEach((el) => {
            if (el.querySelector("a")) {
              if (el.classList.contains("swiper-slide-active")) {
                el.querySelector("a").setAttribute("tabIndex", "0");
              } else {
                el.querySelector("a").setAttribute("tabIndex", "-1");
              }
            }
          });

          //배너가 여러개일때
          if (1 < perView) {
            for (var i = 1; i <= perView - 1; i++) {
              activeSlide = activeSlide.nextElementSibling;
              activeSlide.querySelector("a").setAttribute("tabIndex", "0");
            }
          }
          if (activeSlide) lastItem = activeSlide.getAttribute("data-swiper-slide-index");
        }

        const focusItems = `${sliderName} .swiper-slide a`;

        $(document).on("focus", focusItems, () => {
          this.sliderStop();
        });

        $(document).on("blur", focusItems, (e) => {
          if ($(e.target).parent().attr("data-swiper-slide-index") == lastItem) {
            this.sliderStart();
          }
        });

        if (this.sliderBtnPrev) {
          this.sliderBtnPrev.addEventListener("click", () => {
            this.sliderPrev();
          });
        }
        if (this.sliderBtnNext) {
          this.sliderBtnNext.addEventListener("click", () => {
            this.sliderNext();
          });
        }
        if (this.sliderBtnStop) {
          this.sliderBtnStop.addEventListener("click", () => {
            if (this.sliderBtnStop.classList.contains("active")) {
              this.sliderStart();
              this.sliderBtnStop.classList.remove("active");
              this.sliderBtnStop.querySelector(".toggle").innerHTML = "자동움직임 멈춤";
            } else {
              this.sliderStop();
              this.sliderBtnStop.classList.add("active");
              this.sliderBtnStop.querySelector(".toggle").innerHTML = "자동움직임 시작";
            }
          });
        }
        if (this.sliderBtnStart) {
          this.sliderBtnStart.addEventListener("click", () => {
            this.sliderStart();
          });
        }
      },
      sliderStart: function () {
        this.swiperSlider.autoplay.start();
      },
      sliderStop: function () {
        this.swiperSlider.autoplay.stop();
      },
      sliderNext: function () {
        this.swiperSlider.slideNext();
      },
      sliderPrev: function () {
        this.swiperSlider.slidePrev();
      },
    };
    siderFun._init();
  },
  /* header-전체메뉴 */
  allMenuList: function () {
    $(".header-allmenu-btn").click(function () {
      if ($(this).hasClass("close") == true) {
        $(this).next(".header-allmenu-content").hide();
        $(this).removeClass("close").text("전체메뉴 열기");
        $("#header").removeClass("allmenu-show");
        $("body").removeClass("scroll-none");
      } else {
        $(this).next(".header-allmenu-content").show();
        $(this).addClass("close").text("전체메뉴 닫기");
        $("#header").addClass("allmenu-show");
        $("body").addClass("scroll-none");
      }
      var replaceEl = $(".allmenu .dep1 > li").find(".menu-dep1");
      if ($("html").hasClass("w-pc")) $(replaceEl).contents().unwrap().wrap('<div class="menu-dep1"></div>');

      refresh();
    });

    $(".allmenu a").click(function () {
      var item = $(this);
      var closest_ul = item.closest("ul");
      var parallel_active_links = closest_ul.find(".active");
      var closest_li = item.closest("li");
      var link_status = closest_li.hasClass("active");
      var count = 0;
      $(".allmenu .dep2")
        .find("li")
        .each(function () {
          $(this).children("ul").hide();
          $(this).removeClass("active");
        });
      closest_ul.find("ul").slideUp(100, function () {
        if (++count == closest_ul.find("ul").length) parallel_active_links.removeClass("active");
      });
      if (!link_status) {
        closest_li.children("ul").slideDown(100);
        closest_li.addClass("active");
      }
    });

    $(".allmenu .dep2")
      .find("li")
      .each(function () {
        var ischeck_ul_cnt = $(this).find("ul").length;
        if (ischeck_ul_cnt > 0) {
          $(this).addClass("has_sub");
        }
      });

    function refresh() {
      var timer = null;
      $(window).on("resize", function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          document.location.reload();
        }, 300);
      });
    }
  },
  goToTop: function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 400) {
        $(".gototop").fadeIn();
      } else {
        $(".gototop").fadeOut();
      }
    });
    $(".gototop").click(function () {
      $("html, body").stop().animate({ scrollTop: 0 }, 300, "easeInOutQuad");
      return false;
    });
  },
  /* header-업무시스템 링크 박스 */
  compJumpList: {
    init: function () {
      this._initElements();
      this._initEvents();
    },
    _initElements: function () {
      this.compJumpMenu = document.querySelector(".jumplistbox");
      this.jumpButton = document.querySelectorAll(".jumplistbox .jump-btn");
      this.jumpList = document.querySelector(".jump-list");
      this.activeName = "active";
    },
    _initEvents: function () {
      if (!this.compJumpMenu) return;

      [...this.jumpButton].forEach((item) => {
        item.addEventListener("click", (e) => {
          item.parentElement.classList.toggle("active");
        });
        item.parentElement.addEventListener("mouseleave", (e) => {
          item.parentElement.classList.remove("active");
        });
      });
    },
  },
  pageDescToggle: function () {
    $("._has-tooltip").click(function () {
      $(this).next().toggleClass("active");
      $(this).toggleClass("active");
    });
    $(document).click(function (e) {
      if (!$(e.target).closest("._tooltipbox,._has-tooltip").length) {
        $("body").find("._tooltipbox,._has-tooltip").removeClass("active");
      }
    });
    $(".box-close").click(function () {
      $(this).parent().closest("._tooltipbox").removeClass("active");
      $(this).parent().closest("._tooltipbox").siblings("._has-tooltip").removeClass("active");
    });
  },
  modal: function (target, backObj) {
    const modal = document.querySelector(target);
    const modalWrap = modal.querySelector(".modalWrap");
    const btns = modal.querySelectorAll(".btn-close");

    function modalOpen() {
      modal.classList.add("active");
      modalWrap.setAttribute("tabindex", "0");
      modalWrap.focus();
      // 페이지 고정
      document.querySelector("body").style.overflow = "hidden";
    }
    function modalClose() {
      modal.classList.remove("active");
      modalWrap.removeAttribute("tabIndex");
      if (backObj) document.querySelector(backObj).focus();
      // 페이지 고정해제
      document.querySelector("body").style.overflow = "visible";
    }

    modalOpen();

    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        modalClose();
      });
    });

    const focusItems = modal.querySelectorAll("input, select, textarea, button, a");
    focusItems[focusItems.length - 1].addEventListener("blur", function () {
      modalWrap.focus();
    });
  },
  accordion: function () {
    const target = document.querySelectorAll(".accWrap");
    if (target.length < 1) return;

    target.forEach((el, index) => {
      const list = el.querySelectorAll(".accItem");
      let selectedItem = el.querySelector(".accItem.active");

      [...list].forEach((item) => {
        const btn = item.querySelector(".accSummary");

        item.querySelector(".accSummary").addEventListener("click", (e) => {
          e.preventDefault();

          if (item.classList.contains("active")) {
            close(item);
            selectedItem = null;
          } else {
            if (selectedItem) {
              close(selectedItem);
            }
            item.classList.add("active");
            btn.setAttribute("title", "선택됨");
            selectedItem = item;
          }
        });
      });
    });
    function close(el) {
      el.classList.remove("active");
      el.querySelector(".accSummary").removeAttribute("title");
    }
  },
  tableScrollMarking: function () {
    const table = document.querySelectorAll(".con-table");
    const handIcon = `<span class="ic-handle"></span>`;

    if (table.length < 1) return;

    handleSet();
    window.addEventListener("resize", () => {
      handleSet();
    });

    //생성
    function handleSet() {
      table.forEach((item) => {
        scrolledCheck(item);
      });
    }
    //스크롤체크
    function scrolledCheck(item) {
      if (item.scrollWidth > item.offsetWidth) {
        if (item.scrollLeft < 1) {
          item.classList.add("table-scrolled");

          if (!item.querySelector(".ic-handle")) {
            item.insertAdjacentHTML("afterbegin", handIcon);
            item.addEventListener("scroll", () => {
              scrolledCheck(item);
            });
          }
        } else {
          item.classList.remove("table-scrolled");
        }
      } else {
        item.classList.remove("table-scrolled");
      }
    }
  },
  // DatePicker
  useDatepicker: function () {
    const input = document.querySelectorAll(".useDatepicker");
    if (input.length < 1) return;

    var holidayData = [
      { mmdd: "1-1", title: "신정" },
      { mmdd: "3-1", title: "3.1절" },
      { mmdd: "5-5", title: "어린이날" },
      { mmdd: "5-10", title: "석가탄신일" },
      { mmdd: "6-6", title: "현충일" },
      { mmdd: "8-15", title: "광복절" },
      { mmdd: "10-3", title: "개천절" },
      { mmdd: "10-9", title: "한글날" },
      { mmdd: "12-25", title: "크리스마스" },
    ];

    $(input).each(function () {
      if (!$(this).hasClass(".hasDatepicker")) {
        var minDate = $(this).attr("data-minDate");
        var maxDate = $(this).attr("data-maxDate");
        var dateFormat = "yy.mm.dd";
        if ($(this).attr("data-format")) {
          dateFormat = $(this).attr("data-format");
        }
        $(this).datepicker({
          prevText: "이전 달",
          nextText: "다음 달",
          monthNames: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
          monthNamesShort: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
          dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
          dayNamesShort: ["sa", "월", "화", "수", "목", "금", "토"],
          dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          dateFormat: dateFormat,
          showMonthAfterYear: true,
          // yearSuffix: '&nbsp;년',
          // monthSuffix: '&nbsp;월',
          minDate: minDate,
          maxDate: maxDate,
          changeMonth: true,
          changeYear: true,
          yearRange: "c-80:c+1",
          beforeShowDay: function (date) {
            var holidayCheck = false;
            var mmdd = date.getMonth() + 1 + "-" + date.getDate();
            for (var i = 0; i < holidayData.length; i++) {
              if (holidayData[i].mmdd == mmdd) {
                holidayCheck = true;
                return [true, "date-holiday", holidayData[i].title];
                break;
              }
            }
            if (holidayCheck == false) {
              return [true, ""];
            }
          },
          onSelect: function (selectedDate) {},
          // onClose: function (selectedDate) {
          //     if ($(this).hasClass('dateFrom')) {
          // 		let dateTo = $(this).parent().find('.dateTo');
          // 		if(dateTo.length < 1){
          // 			dateTo = $($(this).attr('data-to'));
          // 		}
          //         if (selectedDate != '' && dateTo.val() != '') {
          //             if (selectedDate > dateTo.val()) {
          //                 //alert("시작날짜는 종료날짜보다 작아야 합니다.");
          // 				checkVailds.vaildMsg(this, '시작날짜는 종료날짜보다 작아야 합니다.');
          //                 $(this).val('');
          //                 return;
          //             }
          //         }
          //     } else if ($(this).hasClass('dateTo')) {
          // 		let dateFrom = $(this).parent().find('.dateFrom');
          // 		if(dateFrom.length < 1){
          // 			dateFrom = $($(this).attr('data-from'));
          // 		}
          //         if(selectedDate != '' && dateFrom.val() != ''){
          //             if(dateFrom.val() > selectedDate){
          //                 //alert("종료날짜는 시작날짜보다 커야 합니다.");
          // 				checkVailds.vaildMsg(this, '종료날짜는 시작날짜보다 커야 합니다.');
          //                 $(this).val('');
          //                 return;
          //             }
          //         }
          //     }
          // },
        });

        $(window).resize(() => {
          $(this).datepicker("hide");
        });
      }
    });

    input.forEach((el) => {
      el.addEventListener("click", () => {
        $(".ui-datepicker-year").attr("title", "연도 선택");
        $(".ui-datepicker-month").attr("title", "월 선택");
        $(".ui-datepicker-calendar").prepend("<caption>" + $(".ui-datepicker-month [selected]").text() + "월 달력 - 날짜선택</caption>");
      });
    });
  },
  // Tab Menu
  tabNav: function (target, viewNum) {
    const tab = document.querySelector(target);
    const optIndex = viewNum;

    const tabFun = {
      init: function () {
        this._initElements();
        this._initEvents();
      },
      _initElements: function () {
        this.tabNav_a = tab.querySelectorAll(`.tabNav > li > a`);
        this.tabContent = tab.querySelectorAll(`.tabContent`);
        this.activeName = "active";

        if (optIndex != undefined && optIndex <= this.tabNav_a.length && 0 < optIndex) {
          this.optIndex = optIndex - 1;
        } else {
          this.optIndex = 0;
        }
        this.selectedTab = this.tabNav_a[this.optIndex];
      },
      _initEvents: function () {
        this.setSelectItem(this.selectedTab, this.optIndex);
        this.tabNav_a.forEach((el, index) => {
          el.addEventListener("click", (e) => {
            e.preventDefault();
            this.setSelectItem(el, index);
          });
        });
      },
      setSelectTab: function (el) {
        this.selectedTab.classList.remove(this.activeName);
        this.selectedTab = el;
        this.selectedTab.classList.add(this.activeName);
      },
      setSelectContents: function (num) {
        this.tabContent.forEach((el, index) => {
          el.setAttribute("tabindex", "-1");
          if (index == num) {
            el.classList.add(this.activeName);
            if (el.querySelector(".visible-graph")) {
              el.querySelector(".visible-graph").classList.add(this.activeName); // graph
            }
            el.setAttribute("aria-hidden", "false");
          } else {
            el.classList.remove(this.activeName);
            if (el.querySelector(".visible-graph")) {
              el.querySelector(".visible-graph").classList.remove(this.activeName); // graph
            }
            el.removeAttribute("title");
            el.setAttribute("aria-hidden", "true");
          }
        });
      },
      setSelectItem: function (el, index) {
        this.setSelectTab(el);
        this.setSelectContents(index);
      },
    };
    tabFun.init();
  },
  /* Tab in Tab */
  tabInnerNav: function (target, viewNum) {
    const tabs = document.querySelectorAll(target);
    tabs.forEach((tab, tabIndex) => {
      const tabFun = {
        init: function () {
          this._initElements();
          this._initEvents();
        },
        _initElements: function () {
          this.tabNav_a = tab.querySelectorAll(`${target} > ul > li > [role="tab"]`);
          this.tabContent = tab.querySelectorAll(`${target} > [role="tabpanel"]`);
          this.activeName = "active";

          if (viewNum != undefined && viewNum <= this.tabNav_a.length && 0 < viewNum) {
            this.optIndex = viewNum - 1;
          } else {
            this.optIndex = 0;
          }
          this.selectedTab = this.tabNav_a[this.optIndex];
        },
        _initEvents: function () {
          this.setSelectItem(this.selectedTab, this.optIndex);
          this.tabNav_a.forEach((el, index) => {
            el.addEventListener("click", (e) => {
              e.preventDefault();
              this.setSelectItem(el, index);
            });
          });
        },
        setSelectTab: function (el) {
          this.tabNav_a.forEach((tab) => tab.classList.remove(this.activeName));
          el.classList.add(this.activeName);
        },
        setSelectContents: function (num) {
          this.tabContent.forEach((content, index) => {
            content.classList.remove(this.activeName);
            if (index == num) {
              content.classList.add(this.activeName);
            }
          });
        },
        setSelectItem: function (el, index) {
          this.setSelectTab(el);
          this.setSelectContents(index);
        },
      };
      tabFun.init();
    });
  },
  modalScrollBarCustom: function () {
		
		// $modalScrollBox = $(".modal .modal-body");
    // if(!$modalScrollBox) return;
		
		// $modalScrollBox.mCustomScrollbar();
				
		// var $draggerContainer = $(".mCSB_draggerContainer");
		// var $draggerRail = $(".mCSB_draggerRail");
		
		// if ($draggerContainer.length && $draggerRail.length) {
		// 	$draggerRail.detach().appendTo($draggerContainer);
		// }
  }
};

const checkVailds = {
  vaildMsg: function (input, msg) {
    document.querySelector("body").insertAdjacentHTML("beforeend", `<div class="vaildToastPop">${msg}</div>`);

    const msgPop = $(".vaildToastPop");
    msgPop.css({
      top: $(input).offset().top + $(input).height() + 5,
      left: $(input).offset().left,
    });

    clearTimeout(this._vaildMsgTimer);
    this._vaildMsgTimer = setTimeout(() => {
      msgPop.fadeOut(200, function () {
        msgPop.remove();
      });
    }, 1500);
  },
};
