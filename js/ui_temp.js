$(function () {
	skipPrint();
	headerPrint();
	footerPrint();
	satisPrint();
	// 231124 수정
	hashtagPrint();
});

function skipPrint() {
	const html = `<ul class="skip-nav">
		<li><a href="#conatiner">본문 바로가기</a></li>
		<li><a href="#gnav">주메뉴 바로가기</a></li>
		<!-- [수정 202401] 전체메뉴는 현재 display:none 이기 때문에 스크린 리더가 읽을 수 없음. 
				따라서 전체 메뉴 바로가기는 유효하지 않음. 꼭 넣어야 하면 버튼을 바로 가도록 하여 display를 변경해줘야 함. -->
		<li><a href="#allMenuButton">전체메뉴 버튼 바로가기</a></li>
		<li><a href="#footer">푸터 바로가기</a></li>
	</ul>`;
	document.querySelector('body').insertAdjacentHTML('afterbegin', html);
}

function headerPrint() {
	const header = document.querySelector('#header');
	if (!header) return;

	const html = `<div class="header-top"> <!--231124 로그인후 클래스 login-->
	<div class="header-top-inner">
		<div class="header-logo">
			<h1 class="logo"><a href="https://csa.nps.or.kr/main.do">중앙노후준비지원센터,NPS 국민연금 노후준비서비스</a></h1>
		</div>
		<div class="jumplistbox related-site">
			<button type="button" class="jump-btn">업무시스템</button>
			<div class="jump-list">
				<ul>
					<li><a href="#" target="_blank" title="새창으로 열림">민간강사 강의등록</a></li>
					<li><a href="#" target="_blank" title="새창으로 열림">노후준비제공시스템</a></li>
					<li><a href="#" target="_blank" title="새창으로 열림">업무지원센터--3</a></li>
				</ul>
			</div>
		</div>
		<div class="header-util">
			<div class="header-zoom">
				<div class="zoom-control">
					<button type="button" class="zoomin">글자크기 확대</button>
					<button type="button" class="zoomout">글자크기 축소</button>
				</div>
				<span class="zoomtext">100%</span>
			</div>
			<!-- 231124 로그인후 -->
			<button class="login-status"><span>로그아웃</span></button>
			<button class="header-login"><span>로그인 <!-- 로그인후 마이페이지 텍스트 변경--></span></button>
			<!--// 231124 로그인후 -->
			<button class="header-search-open v1">통합검색창 열기</button>
			<a href="#none" class="header-search-open v2">통합검색창 열기</a>
			<!-- 231124 검색위치이동 -->
			<div class="header-searchbox">
				<div class="search-form">
					<fieldset class="form">
						<legend>통합검색</legend>
						<!-- [수정 202401] 접근성 관련 input title 변경, button title  추가. -->
						<input type="text" title="통합검색" placeholder="검색어를 입력하세요." class="search-input" />
						<button type="button" class="search-btn" title="통합검색">검색</button>
					</fieldset>
					<button class="header-searchbox-close btn-close01">통합검색창 닫기</button>
				</div>
			</div>
			<!--// 231124 검색위치이동 -->
			<button class="header-allmenu-btn" id="allMenuButton">전체메뉴 열기</button>
			<div class="header-allmenu-content">
				<div class="allmenu-inner" id="goto-content-top">
					<div class="allmenu-top">
						<div class="jumplistbox related-site">
							<!-- <button type="button" class="jump-btn default">업무시스템</button> -->
							<!-- 231124 검색위치이동 -->
							<div class="search-form">
								<fieldset class="form">
									<legend>통합검색</legend>
									<!-- [수정 202401] 접근성 관련 input title 변경, button title  추가. -->
									<input type="text" title="통합검색" placeholder="검색어를 입력하세요." class="search-input" />
									<button type="button" class="search-btn" title="통합검색">검색</button>
								</fieldset>
							</div>
							<!-- // 231124 검색위치이동 -->
							<div class="jump-list">
								<ul>
									<li><a href="#" target="_blank" title="새창으로 열림">민간강사 강의등록</a></li>
									<li><a href="#" target="_blank" title="새창으로 열림">노후준비제공시스템</a></li>
									<li><a href="#" target="_blank" title="새창으로 열림">업무지원센터--3</a></li>
								</ul>
							</div>
						</div>
					</div>
					<nav class="allmenu">
						<ul class="dep1">
							<li>
								<a href="#1depth" class="menu-dep1"><span>노후준비서비스 소개</span></a>
								<ul class="dep2">
									<li><a href="#2depth">서비스소개</a></li>
									<li><a href="#2depth">노후준비이해</a></li>
									<li><a href="#2depth">서비스이용</a></li>
									<li><a href="#2depth">상담안내</a></li>
									<li><a href="#2depth">상담사례소개</a></li>
								</ul>
							</li>
							<li>
								<a href="#1depth" class="menu-dep1"><span>진단ㆍ상담 서비스</span></a>
								<ul class="dep2">
									<li><a href="#2depth">상담센터 안내</a>
										<ul class="dep3">
											<li><a href="#3depth">국민연금공단 거점 지사 안내</a></li>
											<li><a href="#3depth">지자체 센터 안내</a></li>
										</ul>
									</li>
									<li><a href="#2depth">교육안내</a></li>
									<li><a href="#2depth">노후준비상담 예약</a>
										<ul class="dep3">
											<li><a href="#3depth">노후준비상담 예약</a></li>
											<li><a href="#3depth">상담 예약 목록</a></li>
										</ul>
									</li>
									<li><a href="#2depth">노후준비종합진단</a></li>
									<li><a href="#2depth">교육신청</a>
										<ul class="dep3">
											<li><a href="#3depth">교육신청(개인)</a></li>
											<li><a href="#3depth">교육신청(단체)</a></li>
											<li><a href="#3depth">교육신청현황(단체)</a></li>
										</ul>
									</li>
									<li><a href="#2depth">강사정보</a>
										<ul class="dep3">
											<li><a href="#3depth">서울북부</a></li>
											<li><a href="#3depth">서울남부</a></li>
											<li><a href="#3depth">경인</a></li>
											<li><a href="#3depth">대전</a></li>
											<li><a href="#3depth">광주</a></li>
											<li><a href="#3depth">대구</a></li>
											<li><a href="#3depth">부산</a></li>
										</ul>
									</li>
									<li><a href="#2depth">온라인상담</a></li>
								</ul>
							</li>
							<li>
								<a href="#1depth" class="menu-dep1"><span>재무진단</span></a>
								<ul class="dep2">
									<li><a href="#2depth">간단재무설계</a></li>
									<li><a href="#2depth">노후준비자금설계</a></li>
									<li><a href="#2depth">종합재무설계</a></li>
									<li><a href="#2depth">목적자금설계</a></li>
									<li><a href="#2depth">재무계산기</a>
										<ul class="dep3">
											<li><a href="#3depth">화폐시간가치</a></li>
											<li><a href="#3depth">예적금계산</a></li>
											<li><a href="#3depth">대출할부금</a></li>
											<li><a href="#3depth">퇴직금계산</a></li>
											<li><a href="#3depth">재무건전성분성</a></li>
										</ul>
									</li>
									<li><a href="#2depth">국민연금준비수준</a></li>
									<li><a href="#2depth">내연금알아보기</a></li>
									<li><a href="#2depth">국민연금알아보기</a>
										<ul class="dep3">
											<li><a href="#3depth">예상연금조회</a></li>
											<li><a href="#3depth">가입내역조회</a></li>
											<li><a href="#3depth">장애유족예상연금조회</a></li>
											<li><a href="#3depth">예상연금 모의계산</a></li>
											<li><a href="#3depth">전국 예상연금금액 한눈에 보기</a></li>
										</ul>
									</li>
									<li><a href="#2depth">기초연금모의계산</a></li>
								</ul>
							</li>
							<li>
								<a href="#1depth" class="menu-dep1"><span>노후준비정보</span></a>
								<ul class="dep2">
									<li><a href="#2depth">노후준비소식</a></li>
									<li><a href="#2depth">노후준비정보</a>
										<ul class="dep3">
											<li><a href="#3depth">재무</a></li>
											<li><a href="#3depth">건강</a></li>
											<li><a href="#3depth">여가</a></li>
											<li><a href="#3depth">대인관계</a></li>
											<li><a href="#3depth">관련서비스</a></li>
										</ul>
									</li>
									<li><a href="#2depth">노후준비동영상</a>
										<ul class="dep3">
											<li><a href="#3depth">노후준비강의</a></li>
											<li><a href="#3depth">홍보영상</a></li>
										</ul>
									</li>
									<li><a href="#2depth">콘텐츠</a>
										<ul class="dep3">
											<li><a href="#3depth">카드뉴스</a></li>
											<li><a href="#3depth">간행물</a></li>
										</ul>
									</li>
								</ul>
							</li>
							<li>
								<a href="#1depth" class="menu-dep1"><span>CSA 교육 및 시험</span></a>
								<ul class="dep2">
									<li><a href="#2depth">CSA자격증 소개</a></li>
									<li><a href="#2depth">CSA교육</a>
										<ul class="dep3">
											<li><a href="#3depth">CSA교육안내</a></li>
											<li><a href="#3depth">CSA교육일정</a></li>
											<li><a href="#3depth">CSA교육신청</a></li>
										</ul>
									</li>
									<li><a href="#2depth">CSA자격시험</a>
										<ul class="dep3">
											<li><a href="#3depth">CSA시험안내</a></li>
											<li><a href="#3depth">CSA시험 및 결과 공고</a></li>
											<li><a href="#3depth">CSA응시등 안내</a></li>
											<li><a href="#3depth">CSA자격시험 신청</a></li>
										</ul>
									</li>
									<li><a href="#2depth">CSA역할 및 규정ㆍ서식 자료실</a>
										<ul class="dep3">
											<li><a href="#3depth">CSA자격증제도 운영규칙</a></li>
											<li><a href="#3depth">노후준비상담사(CSA)의 역할</a></li>
											<li><a href="#3depth">노후준비상담사(CSA) 윤리규정등</a></li>
											<li><a href="#3depth">CSA관련 서식 자료실</a></li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
					</nav>
					<div class="allmenu-bottom">
						<div class="related-content-link">
							<a href="#none" target="_blank" title="새창으로 열림">국민연금공단</a>
							<a href="#none" target="_blank" title="새창으로 열림">노후준비 유투브</a>
							<a href="#none" target="_blank" title="새창으로 열림">영상수어상담</a>
						</div>
						<!--여기서부터 배너 그룹-->
						<div class="banner-groups">
							<div class="banner-nps">
								<p class="banner-title">
									<span>국민연금 고객센터</span><strong>국번없이 <i class="color1">1</i><i class="color2">3</i><i class="color3">55</i></strong>
								</p>
							</div>
							<div class="banner-slider-wrap banner-link">
								<div class="swiper-container link-items">
									<div class="swiper-wrapper">
										<div class="swiper-slide item01">
											<a href="#none">
												<p class="item-title">
													<span>측정하GO! 처방하GO! 운동하GO!</span>
													<strong>우리동네 맞춤 트레이너 <span class="point">국민체력 100</span></strong>
												</p>
											</a>
										</div>
										<div class="swiper-slide item02">
											<a href="#none">
												<p class="item-title">
													<span>측정하GO! 처방하GO! 운동하GO!</span>
													<strong>우리동네 맞춤 트레이너 <span class="point">국민체력 100</span></strong>
												</p>
											</a>
										</div>
										<div class="swiper-slide item03">
											<a href="#none">
												<p class="item-title">
													<span>측정하GO! 처방하GO! 운동하GO!</span>
													<strong>우리동네 맞춤 트레이너 <span class="point">국민체력 100</span></strong>
												</p>
											</a>
										</div>
									</div>
								</div>
								<div class="banner-link-nav">
									<div class="slider-controller">
										<button type="button" class="btn-prev">팝업존 이전 배너</button>
										<button type="button" class="btn-stop">팝업존 <span class="toggle">자동움직임 멈춤</span></button>
										<button type="button" class="btn-next">팝업존 다음 배너</button>
									</div>
								</div>
							</div>
						</div>
						<!--//여기서부터 배너 그룹-->
					</div>
					<a href="#goto-content-top" class="fix-cont-top">콘텐츠 상단으로 이동</a>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="header-nav">
	<nav id="gnav">
		<ul class="dep1">
			<li>
				<a href="#1depth" class="menu-dep1"><span>노후준비서비스 소개</span></a>
				<ul class="dep2">
					<li><a href="#2depth">서비스소개</a></li>
					<li><a href="#2depth">노후준비이해</a></li>
					<li><a href="#2depth">서비스이용</a></li>
					<li><a href="#2depth">상담안내</a></li>
					<li><a href="#2depth">상담사례소개</a></li>
				</ul>
			</li>
			<li>
				<a href="#1depth" class="menu-dep1"><span>진단ㆍ상담 서비스</span></a>
				<ul class="dep2">
					<li><a href="#2depth">상담센터 안내</a>
						<ul class="dep3">
							<li><a href="#3depth">국민연금공단 거점 지사 안내</a></li>
							<li><a href="#3depth">지자체 센터 안내</a></li>
						</ul>
					</li>
					<li><a href="#2depth">교육안내</a></li>
					<li><a href="#2depth">노후준비상담 예약</a>
						<ul class="dep3">
							<li><a href="#3depth">노후준비상담 예약</a></li>
							<li><a href="#3depth">상담 예약 목록</a></li>
						</ul>
					</li>
					<li><a href="#2depth">노후준비종합진단</a></li>
					<li><a href="#2depth">교육신청</a>
						<ul class="dep3">
							<li><a href="#3depth">교육신청(개인)</a></li>
							<li><a href="#3depth">교육신청(단체)</a></li>
							<li><a href="#3depth">교육신청현황(단체)</a></li>
						</ul>
					</li>
					<li><a href="#2depth">강사정보</a>
						<ul class="dep3">
							<li><a href="#3depth">서울북부</a></li>
							<li><a href="#3depth">서울남부</a></li>
							<li><a href="#3depth">경인</a></li>
							<li><a href="#3depth">대전</a></li>
							<li><a href="#3depth">광주</a></li>
							<li><a href="#3depth">대구</a></li>
							<li><a href="#3depth">부산</a></li>
						</ul>
					</li>
					<li><a href="#2depth">온라인상담</a></li>
				</ul>
			</li>
			<li>
				<a href="#1depth" class="menu-dep1"><span>재무진단</span></a>
				<ul class="dep2">
					<li><a href="#2depth">간단재무설계</a></li>
					<li><a href="#2depth">노후준비자금설계</a></li>
					<li><a href="#2depth">종합재무설계</a></li>
					<li><a href="#2depth">목적자금설계</a></li>
					<li><a href="#2depth">재무계산기</a>
						<ul class="dep3">
							<li><a href="#3depth">화폐시간가치</a></li>
							<li><a href="#3depth">예적금계산</a></li>
							<li><a href="#3depth">대출할부금</a></li>
							<li><a href="#3depth">퇴직금계산</a></li>
							<li><a href="#3depth">재무건전성분성</a></li>
						</ul>
					</li>
					<li><a href="#2depth">국민연금준비수준</a></li>
					<li><a href="#2depth">내연금알아보기</a></li>
					<li><a href="#2depth">국민연금알아보기</a>
						<ul class="dep3">
							<li><a href="#3depth">예상연금조회</a></li>
							<li><a href="#3depth">가입내역조회</a></li>
							<li><a href="#3depth">장애유족예상연금조회</a></li>
							<li><a href="#3depth">예상연금 모의계산</a></li>
							<li><a href="#3depth">전국 예상연금금액 한눈에 보기</a></li>
						</ul>
					</li>
					<li><a href="#2depth">기초연금모의계산</a></li>
				</ul>
			</li>
			<li>
				<a href="#1depth" class="menu-dep1"><span>노후준비정보</span></a>
				<ul class="dep2">
					<li><a href="#2depth">노후준비소식</a></li>
					<li><a href="#2depth">노후준비정보</a>
						<ul class="dep3">
							<li><a href="#3depth">재무</a></li>
							<li><a href="#3depth">건강</a></li>
							<li><a href="#3depth">여가</a></li>
							<li><a href="#3depth">대인관계</a></li>
							<li><a href="#3depth">관련서비스</a></li>
						</ul>
					</li>
					<li><a href="#2depth">노후준비동영상</a>
						<ul class="dep3">
							<li><a href="#3depth">노후준비강의</a></li>
							<li><a href="#3depth">홍보영상</a></li>
						</ul>
					</li>
					<li><a href="#2depth">콘텐츠</a>
						<ul class="dep3">
							<li><a href="#3depth">카드뉴스</a></li>
							<li><a href="#3depth">간행물</a></li>
						</ul>
					</li>
				</ul>
			</li>
			<li>
				<a href="#1depth" class="menu-dep1"><span>CSA 교육 및 시험</span></a>
				<ul class="dep2">
					<li><a href="#2depth">CSA자격증 소개</a></li>
					<li><a href="#2depth">CSA교육</a>
						<ul class="dep3">
							<li><a href="#3depth">CSA교육안내</a></li>
							<li><a href="#3depth">CSA교육일정</a></li>
							<li><a href="#3depth">CSA교육신청</a></li>
						</ul>
					</li>
					<li><a href="#2depth">CSA자격시험</a>
						<ul class="dep3">
							<li><a href="#3depth">CSA시험안내</a></li>
							<li><a href="#3depth">CSA시험 및 결과 공고</a></li>
							<li><a href="#3depth">CSA응시등 안내</a></li>
							<li><a href="#3depth">CSA자격시험 신청</a></li>
						</ul>
					</li>
					<li><a href="#2depth">CSA역할 및 규정ㆍ서식 자료실</a>
						<ul class="dep3">
							<li><a href="#3depth">CSA자격증제도 운영규칙</a></li>
							<li><a href="#3depth">노후준비상담사(CSA)의 역할</a></li>
							<li><a href="#3depth">노후준비상담사(CSA) 윤리규정등</a></li>
							<li><a href="#3depth">CSA관련 서식 자료실</a></li>
						</ul>
					</li>
				</ul>
			</li>
		</ul>
	</nav>
</div>`;
	header.innerHTML = html;
}

function footerPrint() {
	const footer = document.querySelector('#footer');
	if (!footer) return;

	const html = ` <div class="foot-link-group">
	<div class="inner">
		<ul class="foot-links">
			<li><a href="#none">개인정보처리방침</a></li>
			<li><a href="#none">이용약관</a></li>
			<li class="mo-hide"><a href="#none">이용가이드</a></li>
			<li class="mo-hide"><a href="#none" class="mo-hide">사이트개선의견</a></li>
			<li class="mo-hide"><a href="#none" class="mo-hide">용어해설집</a></li>
			<li class="mo-hide"><a href="#none" class="mo-hide">RSS서비스</a></li>
			<li><a href="#none">찾아오시는길</a></li>
		</ul>
		<div class="video-links">
			<a href="#none" class="item01" target="_blank" title="새창으로 열림">국민연금공단</a>
			<a href="#none" class="item02" target="_blank" title="새창으로 열림">노후준비 유튜브</a>
			<a href="#none" class="item03" target="_blank" title="새창으로 열림">영상수어상담</a>
		</div>
	</div>
</div>
<div class="foot-info-group">
	<div class="foot-addr">
		<address class="address"><span>54870 전라북도 전주시 덕진구 기지로 180 (만성동, 국민연금)</span></address>
		<div class="guide-text mo-hide"><p>매월 마지막 토요일 00:00 ~ 04:00까지는 정기적인 서비스 점검으로 서비스 이용이 일시 중단됩니다.</p><p>본 홈페이지에 게시된 이메일 주소가 자동수집되는 것을 허용하지 않으며, 위반시 정보통신망법에 의해 처벌될 수 있습니다.</p></div>
		<p class="copyright">ⓒ National Pension Service. All rights reserved.</p>
	</div>
	<div class="foot-call"><span>국민연금 고객센터 국번없이 1355(유료)</span></div>
</div>
<a href="#top" class="gototop">콘텐츠 처음으로 바로 가기</a>
`;
	footer.innerHTML = html;
}

function satisPrint() {
	const contents = document.querySelector('.page-satisfaction');
	if (!contents) return;

	const html = `<div class="satisfaction-head">
	<p class="question">현재 페이지의 내용과 사용 편의성에 대해 만족하십니까?</p>
</div>
<div class="satisfaction-survey">
	<fieldset>
		<legend>현재페이지 만족도 조사</legend>
		<div class="survey-form">
			<div class="survey-options">
				<label class="inp-radio opt1"><input type="radio" name="satisfaction"><span>매우만족</span></label>
				<label class="inp-radio opt2"><input type="radio" name="satisfaction"><span>만족</span></label>
				<label class="inp-radio opt3"><input type="radio" name="satisfaction"><span>보통</span></label>
				<label class="inp-radio opt4"><input type="radio" name="satisfaction"><span>불만족</span></label>
				<label class="inp-radio opt5"><input type="radio" name="satisfaction"><span>매우불만족</span></label>
			</div>
			<input type="button" value="확인" class="button-primary">                               
		</div>      
	</fieldset>
</div>`;

	if (document.querySelector('body').classList.contains('main')) return;
	//contents.insertAdjacentHTML('beforeend', html);
	contents.innerHTML = html;
}

// 해시태그 추가 231124
function hashtagPrint() {
	const contents = document.querySelector('.hashtag-wrap');
	if (!contents) return;
	const html = `<ul class="equal-list hashtag">
	<li>
		<a href="#none">
			<span class="color-point">#예상연금조회</span>
			<span>현재소득 대비 예상연금 산정</span>
			<img src="" alt="">
		</a>
	</li>
	<li>
		<a href="#none">
			<span class="color-point">#내연금 알아보기</span>
			<span>국민, 개인, 퇴직, 주택연금</span>
			<img src="" alt="">
		</a>
	</li>
	<li>
		<a href="#none">
			<span class="color-point">#간단재무설계</span>
			<span>나의 노후에 필요한 준비자금</span>
			<img src="" alt="">
		</a>
	</li>
	<li>
		<a href="#none">
			<span class="color-point">#노후준비 상담지사안내</span>
			<span>나와 가까운 상담지사</span>
			<img src="" alt="">
		</a>
	</li>
</ul>`;
	if (document.querySelector('body').classList.contains('main')) return;
	contents.innerHTML = html;
}
