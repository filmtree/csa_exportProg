$(function () {
	asidePrint();
});

function asidePrint() {
	if (!document.querySelector('.guideHeader')) return;

	const asideHtml = `<h1>UI</h1>
	<nav>
		<ul class="guideNav">
			<li><a href="standard.html">기본환경</a></li>
			<li><a href="class.html">class name</a></li>
			<li><a href="button.html">Elements</a>
				<ul class="nav-dep2">
					<li><a href="button.html">버튼</a></li>
					<li><a href="text.html">텍스트</a></li>
					<!--<li><a href="labels.html">Labels</a></li>-->
					<li><a href="bullets.html">리스트 타입</a></li>
					<li><a href="images.html">이미지(반응형)</a></li>			
					<li><a href="section.html">단락(예시)</a></li>
					<li><a href="icon.html">아이콘</a></li>
				</ul>
			</li>
			<li><a href="form_elements.html">Forms</a>
				<ul class="nav-dep2">
					<li><a href="form_elements.html">폼 요소</a></li>
					<li><a href="form_patterns.html">폼 패턴</a></li>
				</ul>
			</li>
			<li><a href="text.html">Patterns</a>
				<ul class="nav-dep2">
					<li><a href="table.html">Tables</a></li>
					<li><a href="tab.html">Tab</a></li>
					<!--<li>Tooltip</li>-->
					<li><a href="accordion.html">accordion</a></li>
					<li><a href="modal.html">modal</a></li>
					<li><a href="swiper.html">swiper</a></li>
					<li><a href="board_list.html">Board List</a></li>
					<li><a href="board_view.html">Board view</a></li>
					<li><a href="board_regist.html">Board regist</a></li>					
				</ul>
			</li>
			<li><a href="text.html">Template</a>
				<ul class="nav-dep2">		
					<li><a href="ui_page_template.html">Page Template</a></li>
					<li><a href="ui_layout_pattern.html">Layout Pattern</a></li>
					<li><a href="ui_tab_pattern.html">Tab Pattern</a></li>
					<li><a href="ui_title_pattern.html">Title Pattern</a></li>
					<li><a href="ui_list_pattern.html">List Pattern</a></li>
					<li><a href="ui_form_pattern.html">Form Pattern</a></li>
					<li><a href="ui_button_pattern.html">Button Pattern</a></li>
					<li><a href="ui_grid_pattern.html">Grid Pattern</a></li>
					<li><a href="ui_grid_responsive_pattern.html">Grid Responsive Pattern</a></li>
					<li><a href="ui_component_pattern.html">Component Pattern</a></li>
				</ul>
			</li>
		</ul>
	</nav>`;
	document.querySelector('.guideHeader').innerHTML = asideHtml;
}
