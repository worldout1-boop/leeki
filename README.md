# 관리부 통합 업무일지

안양본사·군포공장·화성공장에서 근무하는 관리부(경영지원) 직원들이 업무를 기록하고, 진행 상황을 실시간으로 공유하며, 일일·주간·월간·연간 보고서를 자동으로 만드는 웹 프로그램입니다. 파일 하나(`index.html`)로 되어 있습니다.

## 주요 기능

- **내 업무**: 한 줄 입력 + Enter로 바로 기록. 상태(완료·진행 중·할 예정), 분야, 건물은 문장 내용으로 자동 선택
- **파일·사진으로 올리기**: 엑셀(xlsx·xls·csv), 워드(docx), 한글(hwp·hwpx), PDF, 텍스트, 사진을 올리면 내용을 읽어 업무 목록으로 변환한 뒤 검토 후 등록
- **팀 현황**: 건물별 직원 카드(오늘 기록, 진행 중·완료·지연 건수, 최근 기록), 실시간 진행 피드, 지연 업무, 이번 주 일정, 분야별 진행률
- **칸반 / 달력 / 목록**: 진행 예정 → 진행 중 → 진행 완료 끌어 옮기기, 달력에서 일정 변경, 목록 엑셀 내려받기
- **보고서**: 일일·주간·월간·연간 보고서를 분야·세부분류·사업장·담당자·업무구분별로 자동 생성(결재란, 차트, 현장 사진, 종합 의견), HTML(인쇄·PDF용)·엑셀·메신저용 텍스트로 내보내기
- **업무 분류**: 재무(회계·경리·자금·세무), 인사·총무(인사평가·급여·근태·물품구매 등), 시설(건물·설비·전기·환경·산업안전보건·소방·경비·미화), 대관, 기타 경영지원
- 반복 업무(매주~매년) 다음 회차 자동 등록, 직원 명단·접속 현황, 사용 안내 화면

## 실행 환경

이 코드는 **claude.ai 아티팩트**로 게시해서 쓰도록 만들어졌습니다. 데이터 저장(`db`), 사진 업로드(`assets`), 직원 확인(`user`), 파일 내려받기(`downloads`), AI 정리(`sample`)는 claude.ai가 페이지에 제공하는 기능(`window.claude.use(...)`)을 사용합니다.

- claude.ai 밖(PC에서 직접 열기, GitHub Pages, 일반 웹서버)에서 열면 **미리보기 모드**로 동작합니다. 화면과 기능은 그대로 볼 수 있지만 입력한 내용은 저장되지 않고 다른 사람과 공유되지 않습니다.
- 다른 곳에서 실제로 운영하려면 `MemoryDB`와 같은 형태(`doc/collection`, `get/set/update/delete`, `onSnapshot`)의 저장소 어댑터를 Firebase·Supabase·자체 서버 등으로 바꿔 끼우면 됩니다.

## 데이터 구조

| 경로 | 내용 |
|---|---|
| `staff/{id}` | 직원 명단(이름, 근무 건물, 직급·담당, 순서, 접속일) |
| `wl/{연도}/tasks/{id}` | 업무 1건(분야, 세부분류, 사업장, 업무 구분, 상태, 일정, 진척률, 담당, 진행 기록, 사진) |
| `wl/{연도}/memos/{날짜}` | 일자별 특이사항·건의 |
| `wl/{연도}/reports/{키}` | 보고서 종합 의견 |
| `app/config` | 부서명, 사업장 목록, 결재란, 세부분류 |

## 사용한 오픈소스

| 라이브러리 | 용도 | 라이선스 |
|---|---|---|
| [SortableJS](https://github.com/SortableJS/Sortable) | 칸반 끌어 옮기기 | MIT |
| [FullCalendar](https://github.com/fullcalendar/fullcalendar) | 달력 | MIT |
| [Chart.js](https://github.com/chartjs/Chart.js) | 보고서 차트 | MIT |
| [SheetJS CE](https://github.com/SheetJS/sheetjs) | 엑셀 읽기·쓰기, 한글(hwp) 복합 파일 읽기 | Apache-2.0 |
| [browser-image-compression](https://github.com/Donaldcwl/browser-image-compression) | 사진 압축 | MIT |
| [pdf.js](https://github.com/mozilla/pdf.js) | PDF 읽기 | Apache-2.0 |
| [mammoth.js](https://github.com/mwilliamson/mammoth.js) | 워드(docx) 읽기 | BSD-2-Clause |
| [JSZip](https://github.com/Stuk/jszip) | 한글(hwpx) 읽기 | MIT |
| [Kanboard](https://github.com/kanboard/kanboard) | 칸반 운영 방식 참고 | MIT |

라이브러리는 jsDelivr CDN에서 불러오며, 이 저장소에 포함되어 있지 않습니다.
